import { commands } from "@/lib/commands";

/**
 * The ⌘K palette's search corpus as a static file, built once per deploy.
 *
 * The palette fetches this when it loads, instead of bundling the command
 * list, which dragged every essay body and case study into its JavaScript.
 * Titles, details and keywords only: a few KB gzipped.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json(commands, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "X-Robots-Tag": "noindex",
    },
  });
}
