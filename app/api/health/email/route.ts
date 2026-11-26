import { site } from "@/lib/site-data";

/**
 * Production email configuration, without sending anything.
 *
 * The failure this exists for: the form works locally and silently delivers
 * to the wrong inbox (or nowhere) in production, because the deploy has a
 * different CONTACT_TO than the machine the developer tested on. Vercel hides
 * environment values behind the dashboard, so this reports the *shape* of the
 * configuration — booleans and the recipient — never the key.
 *
 * Guarded by CRON_SECRET and 404s otherwise, so the endpoint is invisible
 * without the secret and reveals nothing to a crawler.
 *
 *   curl -H "Authorization: Bearer $CRON_SECRET" \
 *        https://kunjshah.in/api/health/email
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return new Response("Not found", { status: 404 });
  }

  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO ?? site.email;

  return Response.json({
    /** The action refuses to send without this. */
    apiKey: Boolean(process.env.RESEND_API_KEY),
    /** Sandbox senders may only deliver to the Resend account address. */
    sandboxSender: from.includes("@resend.dev"),
    from,
    to,
    /** Where the public page tells people to write. Divergence is the bug. */
    publishedEmail: site.email,
    addressesMatch: to.toLowerCase() === site.email.toLowerCase(),
    audience: Boolean(process.env.RESEND_AUDIENCE_ID),
    turnstile: Boolean(
      process.env.TURNSTILE_SECRET_KEY && process.env.TURNSTILE_HOSTNAMES,
    ),
    turnstileHosts: (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((host) => host.trim())
      .filter(Boolean),
  });
}
