import { getOpenSourceClaims, resolveClaims } from "@/lib/github";
import { buildPortfolioDocument } from "@/lib/portfolio-export";

/**
 * Machine-readable portfolio export for AI agents and answer engines.
 *
 * Explicitly allowed in robots.txt (the rest of /api/ stays disallowed).
 *
 * GitHub counts are resolved per render instead of being baked into the
 * document at build time, so an answer engine quoting this file quotes the
 * same numbers the site shows.
 */
export const revalidate = 900;

export async function GET() {
  const claims = resolveClaims(await getOpenSourceClaims());
  const body = JSON.stringify(buildPortfolioDocument(claims), null, 2);

  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // Give the CDN a quarter-hour of freshness, then let it serve stale
      // while it regenerates. A day-long s-maxage meant a morning fix was
      // invisible to crawlers until the next day.
      "Cache-Control": "public, max-age=300, s-maxage=900, stale-while-revalidate=3600",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
