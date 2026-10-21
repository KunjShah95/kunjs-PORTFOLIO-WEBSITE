"use server";

import { headers } from "next/headers";
import { site } from "@/lib/site-data";
import {
  blockEmail,
  classifyMessage,
  isBlockedEmail,
  isDisposableEmail,
} from "@/lib/spam-guard";
import type { ContactErrors, ContactState } from "./contact-state";

/* ==========================================================================
   Contact form delivery.

   The form posts to this Server Action, which validates server-side, runs the
   spam guards, and hands the message to Resend. Nothing is persisted here —
   Resend is the system of record and the inbox is the archive.

   Required environment:
     RESEND_API_KEY     re_...            from resend.com/api-keys
   Optional environment:
     CONTACT_FROM       verified Resend sender, defaults to the onboarding sandbox
     CONTACT_TO         delivery address, defaults to site.email
     CONTACT_BLOCKED_EMAILS
                        comma-separated addresses to refuse outright
     TURNSTILE_SECRET_KEY
     TURNSTILE_HOSTNAMES
                        when both are set, a Cloudflare Turnstile token is
                        required. TURNSTILE_SITE_KEY is the public half and
                        lives on the client.

   Types and `initialContactState` live in ./contact-state because a
   "use server" module may only export async functions.
   ========================================================================== */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Anything longer is spam or a paste accident; the textarea is far shorter. */
const MAX_DETAILS = 5000;
const MAX_NAME = 120;
const MAX_COMPANY = 160;
/** A human cannot fill this in and submit in under three seconds. */
const MIN_FILL_MS = 3000;
/** Submissions allowed per IP per window. */
const RATE_LIMIT_MAX_HITS = 3;
/** One inquiry per IP per this window. */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
/** Cap on tracked IPs, so a burst can't grow the map without bound. */
const RATE_LIMIT_MAX_IPS = 5000;
/** Submissions allowed per email address per window. */
const RATE_LIMIT_MAX_PER_EMAIL = 2;
/** Follow-ups from the same address are allowed within this window. */
const RATE_LIMIT_EMAIL_WINDOW_MS = 60 * 60 * 1000;
/** Turnstile action name, matched against the token returned by siteverify. */
const TURNSTILE_ACTION = "contact";

/* ------------------------------------------------------------- rate limiting */

/**
 * In-memory per-IP throttle.
 *
 * This is per-instance state: on serverless it protects a single warm lambda,
 * which is enough to blunt a script but not to enforce a hard global limit.
 * The honeypot, the minimum fill time and the content filter are the real
 * defences — this is only a second line so a repeated script cannot flood the
 * inbox. Swap in a durable store (Upstash, Vercel KV) if the form ever needs
 * a strict quota.
 */
const hits = new Map<string, number[]>();
/** The same throttle keyed by sender address, so one person cannot rotate IPs. */
const emailHits = new Map<string, number[]>();

function exceeded(timestamps: number[], max: number, window: number, now: number): boolean {
  const recent = timestamps.filter((at) => now - at < window);
  timestamps.length = 0;
  timestamps.push(...recent);
  return recent.length >= max;
}

function rateLimited(ip: string, now: number): boolean {
  const timestamps = hits.get(ip) ?? [];
  const limited = exceeded(timestamps, RATE_LIMIT_MAX_HITS, RATE_LIMIT_WINDOW_MS, now);
  if (timestamps.length === 0) {
    hits.delete(ip);
  } else {
    hits.set(ip, timestamps);
  }
  if (hits.size > RATE_LIMIT_MAX_IPS) hits.clear();
  return limited;
}

function emailRateLimited(email: string, now: number): boolean {
  const key = email.trim().toLowerCase();
  if (!key) return false;
  const timestamps = emailHits.get(key) ?? [];
  const limited = exceeded(timestamps, RATE_LIMIT_MAX_PER_EMAIL, RATE_LIMIT_EMAIL_WINDOW_MS, now);
  if (timestamps.length === 0) {
    emailHits.delete(key);
  } else {
    emailHits.set(key, timestamps);
  }
  return limited;
}

/**
 * Leftmost public IP. Vercel sets `x-forwarded-for`; the first entry is the
 * original client. Spoofable in theory, but sufficient to throttle casual
 * abuse and it never throws on a missing header.
 */
async function clientIp(): Promise<string> {
  const store = await headers();
  const forwarded = store.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || store.get("x-real-ip") || "unknown";
}

/* ----------------------------------------------------------------- turnstile */

/** True when Turnstile is configured and therefore required. */
function turnstileEnabled(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.TURNSTILE_HOSTNAMES);
}

/**
 * Verify a Cloudflare Turnstile token.
 *
 * Fails closed when Turnstile is enabled but the check cannot be completed:
 * if the provider is unreachable, an unverified submission is not a
 * submission. `action` and `hostname` are both checked, so a token minted
 * for another surface or another domain cannot be replayed here.
 */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean),
  );
  if (!secret || expectedHostnames.size === 0) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    if (!res.ok) return false;
    const result = (await res.json()) as { success?: boolean; action?: string; hostname?: string };
    return (
      result.success === true &&
      result.action === TURNSTILE_ACTION &&
      typeof result.hostname === "string" &&
      expectedHostnames.has(result.hostname)
    );
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ delivery */

type Inquiry = {
  name: string;
  email: string;
  company: string;
  focus: string;
  timeline: string;
  details: string;
};

async function sendEmail(inquiry: Inquiry): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — message not delivered");
    return {
      ok: false,
      error: "Email delivery isn't configured yet. Please email me directly.",
    };
  }

  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";
  /**
   * Where inquiries are delivered. This is the Resend account address rather
   * than `site.email` (the public contact address shown on the page): the
   * `onboarding@resend.dev` sandbox sender may only deliver to the address on
   * the Resend account. Once a domain is verified and CONTACT_FROM is set,
   * these converge and the override can be dropped.
   */
  const to = process.env.CONTACT_TO ?? site.email;

  try {
    const res = await fetch(
      process.env.CONTACT_RESEND_URL ?? "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: inquiry.email,
          subject: `Portfolio inquiry: ${inquiry.name}${inquiry.company ? ` (${inquiry.company})` : ""}`,
          text: [
            `Name:     ${inquiry.name}`,
            `Email:    ${inquiry.email}`,
            `Company:  ${inquiry.company || "Not provided"}`,
            `Focus:    ${inquiry.focus || "Not specified"}`,
            `Timeline: ${inquiry.timeline || "Not specified"}`,
            "",
            "---",
            inquiry.details,
          ].join("\n"),
        }),
      },
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[contact] resend failed: ${res.status} ${detail.slice(0, 400)}`);
      return { ok: false, error: "The message didn't go through. Please email me directly." };
    }
    return { ok: true };
  } catch (error) {
    console.error("[contact] resend error", error);
    return { ok: false, error: "The message didn't go through. Please email me directly." };
  }
}

/* ---------------------------------------------------------------- the action */

function field(formData: FormData, key: string, max: number): string {
  return String(formData.get(key) ?? "")
    .trim()
    .slice(0, max);
}

/**
 * A submission that was refused but should look successful to the sender.
 *
 * Abusive and spammy messages are dropped silently: the sender gets the
 * same "received" confirmation a genuine inquiry gets, so the form gives no
 * signal about what tripped the filter. Nothing is emailed and nothing is
 * written down beyond a server-side log line.
 */
function silentlyAccepted(): ContactState {
  return { status: "success", errors: {}, message: "" };
}

export async function submitInquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const inquiry: Inquiry = {
    name: field(formData, "name", MAX_NAME),
    email: field(formData, "email", MAX_NAME),
    company: field(formData, "company", MAX_COMPANY),
    focus: field(formData, "focus", 80),
    timeline: field(formData, "timeline", 80),
    details: field(formData, "details", MAX_DETAILS),
  };

  const ip = await clientIp();

  /* -- spam guard 1: honeypot ------------------------------------------- */
  // A real person never sees this field, so it must arrive empty. Answering it
  // is reported as success so a bot gets no signal that it was detected.
  if (field(formData, "company_website", 200)) {
    return silentlyAccepted();
  }

  /* -- spam guard 2: time to fill ---------------------------------------- */
  const renderedAt = Number(field(formData, "rendered_at", 20));
  if (Number.isFinite(renderedAt) && Date.now() - renderedAt < MIN_FILL_MS) {
    return {
      status: "error",
      errors: {},
      message: "That was submitted a little too fast. Please try again.",
    };
  }

  /* -- validation -------------------------------------------------------- */
  // Runs before the Turnstile check on purpose. A Turnstile token is
  // single-use: redeeming it costs the visitor a fresh one, and a form that
  // fails validation should not force them through a challenge they have
  // already passed. Field checks are cheap and local, so they go first.
  //
  // Everything the visitor can fix returns "idle" here, before the token is
  // spent, so the client never has to reset a widget it did not consume.
  const errors: ContactErrors = {};
  if (!inquiry.name) errors.name = "Add your name so I know who to reply to.";
  if (!inquiry.email) errors.email = "Add an email address for the reply.";
  else if (!EMAIL.test(inquiry.email)) {
    errors.email = "That email address looks incomplete.";
  }
  if (inquiry.details.length < 20) {
    errors.details = "A sentence or two about the project helps (20+ characters).";
  }
  // Not abuse, just an address that cannot receive the reply. This one gets
  // a visible error, because a real person might have mistyped their address
  // or used a burner one by accident.
  if (inquiry.email && !errors.email && isDisposableEmail(inquiry.email)) {
    errors.email = "Please use a permanent address. That one can't receive a reply.";
  }
  if (Object.keys(errors).length > 0) {
    return { status: "idle", errors, message: "" };
  }

  /* -- spam guard 3: bot verification ------------------------------------ */
  // Only enforced when Turnstile is configured. Without it the form works
  // exactly as before, so this is safe to ship before the widget exists.
  //
  // Everything below this point redeems the token, so each of those paths
  // must return a status other than "idle" — the client resets the widget
  // on exactly those responses.
  if (turnstileEnabled()) {
    const token = field(formData, "cf-turnstile-response", 2048);
    if (!token || !(await verifyTurnstile(token, ip))) {
      console.warn("[contact] turnstile rejected a submission");
      return {
        status: "error",
        errors: {},
        message: "That didn't pass the bot check. Please refresh the page and try again.",
      };
    }
  }

  /* -- spam guard 4: per-IP throttle ------------------------------------- */
  if (rateLimited(ip, Date.now())) {
    return {
      status: "error",
      errors: {},
      message: "You've sent a few messages already. Please email me directly so nothing gets lost.",
    };
  }

  /* -- spam guard 5: known offenders ------------------------------------- */
  // An address that has already been refused for abuse stays refused, even
  // if it rewrites the message to look clean.
  if (isBlockedEmail(inquiry.email)) {
    console.warn(`[contact] blocked a repeat offender from ${ip}`);
    return silentlyAccepted();
  }

  /* -- spam guard 6: content --------------------------------------------- */
  // The message itself decides. Abuse and sales pitches are dropped before
  // delivery, so an abusive message never reaches the inbox and never
  // produces a validation error that would tell the sender what was wrong.
  const verdict = classifyMessage(inquiry);
  if (verdict.verdict !== "ok") {
    console.warn(`[contact] dropped a submission (${verdict.reason}) from ${ip}`);
    blockEmail(inquiry.email);
    return silentlyAccepted();
  }

  /* -- spam guard 7: per-address throttle -------------------------------- */
  // Last, so that a mistyped or empty address cannot consume a real
  // person's quota, and so a rejected message does not count against it.
  if (emailRateLimited(inquiry.email, Date.now())) {
    return {
      status: "error",
      errors: {},
      message: "You've sent a few messages already. Please email me directly so nothing gets lost.",
    };
  }

  /* -- send -------------------------------------------------------------- */
  const result = await sendEmail(inquiry);
  if (!result.ok) {
    return { status: "error", errors: {}, message: result.error };
  }

  return { status: "success", errors: {}, message: "" };
}
