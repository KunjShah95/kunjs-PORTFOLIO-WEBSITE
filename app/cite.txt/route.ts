import { renderHumansTxt } from "@/lib/cite";

/** Plain-text mirror of /humans.txt for tools that expect cite.txt. */
export const revalidate = 86400;

export async function GET() {
  return new Response(renderHumansTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Robots-Tag": "index, follow",
    },
  });
}
