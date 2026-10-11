import { buildPortfolioDocument } from "@/lib/portfolio-export";

/**
 * Machine-readable portfolio export for AI agents and answer engines.
 *
 * Explicitly allowed in robots.txt (the rest of /api/ stays disallowed).
 */
export const revalidate = 3600;

export async function GET() {
  const body = JSON.stringify(buildPortfolioDocument(), null, 2);

  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Robots-Tag": "index, follow",
    },
  });
}
