"use server";

import { headers } from "next/headers";
import { site } from "@/lib/site-data";
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

/* ------------------------------------------------------------- rate limiting */

/**
 * In-memory per-IP throttle.
 *
 * This is per-instance state: on serverless it protects a single warm lambda,
 * which is enough to blunt a script but not to enforce a hard global limit.
 * The honeypot and the minimum fill time are the real defences — this is only
 * a second line so a repeated script cannot flood the inbox. Swap in a durable
 * store (Upstash, Vercel KV) if the form ever needs a strict quota.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  if (hits.size > RATE_LIMIT_MAX_IPS) hits.clear();
  hits.set(ip, recent);
  return false;
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
          subject: `Portfolio inquiry — ${inquiry.name}${inquiry.company ? ` (${inquiry.company})` : ""}`,
          text: [
            `Name:     ${inquiry.name}`,
            `Email:    ${inquiry.email}`,
            `Company:  ${inquiry.company || "—"}`,
            `Focus:    ${inquiry.focus || "—"}`,
            `Timeline: ${inquiry.timeline || "—"}`,
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

export async function submitInquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const inquiry: Inquiry = {
    name: field(formData, "name", MAX_NAME),
    email: field(formData, "email", MAX_NAME),
    company: field(formData, "company", MAX_COMPANY),
    focus: field(formData, "focus", 80),
    timeline: field(formData, "timeline", 80),
    details: field(formData, "details", MAX_DETAILS),
  };

  /* -- spam guard 1: honeypot ------------------------------------------- */
  // A real person never sees this field, so it must arrive empty. Answering it
  // is reported as success so a bot gets no signal that it was detected.
  if (field(formData, "company_website", 200)) {
    return { status: "success", errors: {}, message: "" };
  }

  /* -- spam guard 2: time to fill ---------------------------------------- */
  const renderedAt = Number(field(formData, "rendered_at", 20));
  if (Number.isFinite(renderedAt) && Date.now() - renderedAt < MIN_FILL_MS) {
    return {
      status: "error",
      errors: {},
      message: "That was submitted a little too fast — please try again.",
    };
  }

  /* -- spam guard 3: per-IP throttle ------------------------------------ */
  if (rateLimited(await clientIp(), Date.now())) {
    return {
      status: "error",
      errors: {},
      message: "You've sent a few messages already. Please email me directly so nothing gets lost.",
    };
  }

  /* -- validation -------------------------------------------------------- */
  const errors: ContactErrors = {};
  if (!inquiry.name) errors.name = "Add your name so I know who to reply to.";
  if (!inquiry.email) errors.email = "Add an email address for the reply.";
  else if (!EMAIL.test(inquiry.email)) {
    errors.email = "That email address looks incomplete.";
  }
  if (inquiry.details.length < 20) {
    errors.details = "A sentence or two about the project helps (20+ characters).";
  }
  if (Object.keys(errors).length > 0) {
    return { status: "idle", errors, message: "" };
  }

  /* -- send -------------------------------------------------------------- */
  const result = await sendEmail(inquiry);
  if (!result.ok) {
    return { status: "error", errors: {}, message: result.error };
  }

  return { status: "success", errors: {}, message: "" };
}
