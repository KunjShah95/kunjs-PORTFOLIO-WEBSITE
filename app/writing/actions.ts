"use server";

import { headers } from "next/headers";
import { site } from "@/lib/site-data";
import { isDisposableEmail } from "@/lib/spam-guard";
import type { SubscribeState } from "./subscribe-state";

/* ==========================================================================
   "Field notes" signup.

   One field, one purpose: keep the reader who is not ready to hire yet.

   Two delivery paths, in order:

   1. RESEND_AUDIENCE_ID set  -> the address becomes a contact in that Resend
      audience, so it is a real list with a real unsubscribe.
   2. No audience             -> the address is emailed to the inbox, so a
      signup is never silently dropped before the list exists.

   No database. Resend is the system of record for the contact form already,
   and adding a second store for a few dozen addresses would be more surface
   than the feature is worth.

   Required environment: RESEND_API_KEY (the same key the contact form uses).
   Optional: RESEND_AUDIENCE_ID, SUBSCRIBE_TO.
   ========================================================================== */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** A person cannot read the page and subscribe in under two seconds. */
const MIN_FILL_MS = 2000;
/** Signups allowed per IP per window. */
const MAX_HITS = 3;
const WINDOW_MS = 10 * 60 * 1000;
/** Cap on tracked IPs, so a burst cannot grow the map without bound. */
const MAX_IPS = 5000;

/**
 * In-memory per-IP throttle, same trade-off as the contact form: it protects
 * a warm lambda, not the world. The honeypot and minimum fill time are the
 * real defences.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);
  const limited = recent.length >= MAX_HITS;
  if (recent.length === 0) {
    hits.delete(ip);
  } else {
    hits.set(ip, recent);
  }
  if (hits.size > MAX_IPS) hits.clear();
  return limited;
}

async function clientIp(): Promise<string> {
  const store = await headers();
  const forwarded = store.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || store.get("x-real-ip") || "unknown";
}

/* ------------------------------------------------------------------ delivery */

type Delivery = { ok: true } | { ok: false; error: string };

/**
 * Add the address to the Resend audience. A 409 or 422 means the contact is
 * already there, which is a success from the reader's point of view: they
 * asked to be on the list and they are on it.
 */
async function addToAudience(apiKey: string, audienceId: string, email: string): Promise<Delivery> {
  try {
    const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({ email, unsubscribed: false }),
    });
    if (res.ok || res.status === 409 || res.status === 422) return { ok: true };
    const detail = await res.text().catch(() => "");
    console.error(`[subscribe] audience add failed: ${res.status} ${detail.slice(0, 300)}`);
    return { ok: false, error: "That didn't save. Email me directly and I'll add you." };
  } catch (error) {
    console.error("[subscribe] audience error", error);
    return { ok: false, error: "That didn't save. Email me directly and I'll add you." };
  }
}

/** Fallback while no audience exists: put the address in the inbox. */
async function emailTheOwner(apiKey: string, email: string): Promise<Delivery> {
  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";
  const to = process.env.SUBSCRIBE_TO ?? process.env.CONTACT_TO ?? site.email;

  try {
    const res = await fetch(process.env.CONTACT_RESEND_URL ?? "https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Field notes signup: ${email}`,
        text: [
          "Someone asked to be notified when a new essay ships.",
          "",
          `Email: ${email}`,
          `When:  ${new Date().toISOString()}`,
          "",
          "Add them to the list, or set RESEND_AUDIENCE_ID so signups land there automatically.",
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[subscribe] email fallback failed: ${res.status} ${detail.slice(0, 300)}`);
      return { ok: false, error: "That didn't go through. Email me directly and I'll add you." };
    }
    return { ok: true };
  } catch (error) {
    console.error("[subscribe] email fallback error", error);
    return { ok: false, error: "That didn't go through. Email me directly and I'll add you." };
  }
}

async function record(email: string): Promise<Delivery> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[subscribe] RESEND_API_KEY is not set — signup not recorded");
    return { ok: false, error: "Signup isn't wired up yet. Email me directly and I'll add you." };
  }
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  return audienceId
    ? addToAudience(apiKey, audienceId, email)
    : emailTheOwner(apiKey, email);
}

/* -------------------------------------------------------------------- action */

function field(formData: FormData, key: string, max: number): string {
  return String(formData.get(key) ?? "")
    .trim()
    .slice(0, max);
}

export async function subscribeToNotes(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = field(formData, "email", 254);

  /* -- honeypot --------------------------------------------------------- */
  // Reuses the username-autofill trap name, and reports success so a bot
  // learns nothing about being caught.
  if (field(formData, "website", 200)) {
    return { status: "success", message: "You're on the list." };
  }

  /* -- minimum fill time ------------------------------------------------- */
  const renderedAt = Number(field(formData, "rendered_at", 20));
  if (Number.isFinite(renderedAt) && Date.now() - renderedAt < MIN_FILL_MS) {
    return { status: "error", message: "That was a little fast. Try once more.", email };
  }

  /* -- validation -------------------------------------------------------- */
  if (!email) return { status: "error", message: "Add an email address.", email };
  if (!EMAIL.test(email)) {
    return { status: "error", message: "That address looks incomplete.", email };
  }
  if (isDisposableEmail(email)) {
    return {
      status: "error",
      message: "Please use a permanent address — that one can't receive the emails.",
      email,
    };
  }

  /* -- throttle ---------------------------------------------------------- */
  const ip = await clientIp();
  if (rateLimited(ip, Date.now())) {
    return {
      status: "error",
      message: "That's a few attempts already. Email me directly and I'll add you.",
      email,
    };
  }

  /* -- record ------------------------------------------------------------ */
  const result = await record(email);
  if (!result.ok) return { status: "error", message: result.error, email };

  return {
    status: "success",
    message: "You're on the list. One email when something worth reading ships.",
  };
}
