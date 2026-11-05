/**
 * Deployment freshness.
 *
 * Prerendered pages have no meaningful "now": reading the clock at render time
 * would claim every page changed on every request. The honest signal is the
 * build, so `next.config.ts` stamps `NEXT_PUBLIC_BUILD_TIME` once per deploy.
 *
 * Before this existed the site published a hardcoded `2026-10-11` as its
 * `dateModified`, which is worse than publishing nothing: it told answer
 * engines the content was older than it was.
 */

const stamp = Number(process.env.NEXT_PUBLIC_BUILD_TIME);

const built = Number.isFinite(stamp) && stamp > 0 ? new Date(stamp) : null;

/** `YYYY-MM-DD`, the precision schema.org dates and sitemaps expect. */
export function contentUpdated(): string {
  return (built ?? new Date()).toISOString().slice(0, 10);
}

/** Full ISO timestamp, for consumers that want the exact deploy time. */
export function contentUpdatedAt(): string {
  return (built ?? new Date()).toISOString();
}
