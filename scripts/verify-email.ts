/**
 * Email delivery check.
 *
 * Answers one question: if someone submits the contact form right now, does
 * the message reach the inbox? It reads the same variables the server action
 * reads, asks Resend what it is allowed to do, and (unless --dry-run) sends
 * one real test email and prints Resend's exact response.
 *
 *   npx tsx scripts/verify-email.ts --dry-run
 *   npx tsx scripts/verify-email.ts
 *
 * Nothing secret is printed: the key is reported as present or absent, never
 * echoed.
 */

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

/* ------------------------------------------------------------ env loading */

/** Minimal .env reader: KEY=value, optional quotes, # comments ignored. */
function readEnvFile(file: string): Record<string, string> {
  const path = join(ROOT, file);
  if (!existsSync(path)) return {};
  const out: Record<string, string> = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

const fileEnv = {
  ...readEnvFile(".env"),
  ...readEnvFile(".env.local"),
};
const env = (key: string) => process.env[key] ?? fileEnv[key] ?? "";

/* ---------------------------------------------------------------- report */

const dryRun = process.argv.includes("--dry-run");
const apiKey = env("RESEND_API_KEY").trim();
const from = env("CONTACT_FROM").trim() || "Portfolio <onboarding@resend.dev>";
const to = env("CONTACT_TO").trim() || "kkshah2005@gmail.com";
const audienceId = env("RESEND_AUDIENCE_ID").trim();

async function main(): Promise<number> {
  const lines: string[] = [];
  const say = (line = "") => lines.push(line);

  say("Email delivery check");
  say("====================");
  say(`RESEND_API_KEY      ${apiKey ? `set (${apiKey.length} chars, ${apiKey.slice(0, 3)}…)` : "MISSING"}`);
  say(`CONTACT_FROM        ${from}${from.includes("resend.dev") ? "   [sandbox sender]" : ""}`);
  say(`CONTACT_TO          ${to}`);
  say(`RESEND_AUDIENCE_ID  ${audienceId ? `set (${audienceId})` : "not set (signups go to the inbox)"}`);
  say();

  if (!apiKey) {
    say("RESULT: FAIL — no API key, so nothing can be sent.");
    console.log(lines.join("\n"));
    return 1;
  }

  /* ----------------------------------------------------------- who am I? */

  type ResendDomain = { id: string; name: string; status: string; region?: string };

  async function listDomains(): Promise<ResendDomain[] | { error: string }> {
    const res = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(15_000),
    });
    const body = (await res.json().catch(() => ({}))) as {
      data?: ResendDomain[];
      message?: string;
      name?: string;
    };
    if (!res.ok) {
      return { error: `${res.status} ${body.name ?? ""} ${body.message ?? ""}`.trim() };
    }
    return body.data ?? [];
  }

  const domains = await listDomains();
  if ("error" in domains) {
    say(`Domains lookup: refused — ${domains.error}`);
  } else if (domains.length === 0) {
    say("Domains: none. This account cannot send from its own domain yet.");
  } else {
    say("Domains:");
    for (const domain of domains) say(`  - ${domain.name}  [${domain.status}]`);
  }
  say();

  /* -------------------------------------------------------------- the send */

  const fromAddress = from.match(/<([^>]+)>/)?.[1] ?? from;
  const sandboxSender = fromAddress.endsWith("@resend.dev");

  if (sandboxSender) {
    say("Sandbox sender in use. Resend allows onboarding@resend.dev to deliver");
    say("ONLY to the address registered on the Resend account. If CONTACT_TO is");
    say("not that address, every submission is rejected with a 403 and the");
    say("visitor sees 'the message didn't go through'.");
    say();
  }

  if (dryRun) {
    say("Dry run: no email sent. Re-run without --dry-run to test delivery.");
    console.log(lines.join("\n"));
    return 0;
  }

  const res = await fetch(env("CONTACT_RESEND_URL").trim() || "https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(20_000),
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Delivery check: contact form",
      text: [
        "This is a delivery test from scripts/verify-email.ts.",
        "",
        `Sent at ${new Date().toISOString()}.`,
        "If you are reading this, the contact form can reach this inbox.",
      ].join("\n"),
    }),
  });

  const body = await res.json().catch(async () => ({ raw: await res.text().catch(() => "") }));

  say(`Test send: HTTP ${res.status}`);
  say(JSON.stringify(body, null, 2));
  say();

  if (res.ok) {
    say("RESULT: PASS — Resend accepted the message. If it is not in the inbox,");
    say("check spam and the Resend dashboard's delivery log for a bounce.");
    console.log(lines.join("\n"));
    return 0;
  }

  say("RESULT: FAIL — Resend refused the message. The reason is above.");
  if (res.status === 403) {
    say();
    say("Most likely causes, in order:");
    say("  1. Sandbox sender + CONTACT_TO is not the Resend account address.");
    say("     Fix: set CONTACT_TO to that address, or verify kunjshah.in.");
    say("  2. The key is scoped to sending only and cannot read /domains.");
    say("  3. The account is not verified for the sender domain.");
  }
  console.log(lines.join("\n"));
  return 1;
}

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
