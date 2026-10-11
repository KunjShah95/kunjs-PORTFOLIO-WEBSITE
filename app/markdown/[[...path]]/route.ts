import { notFoundMarkdown, renderMarkdown } from "@/lib/markdown";
import { ORIGIN } from "@/lib/routes";

/**
 * Markdown representation of any public page.
 *
 * Not linked anywhere: proxy.ts rewrites here when a client asks for
 * `Accept: text/markdown`, and next.config.ts maps `/<page>.md` here. Missing
 * pages answer 404 in Markdown too, so an agent never has to parse HTML to
 * learn that a URL is wrong.
 */
export const dynamic = "force-static";
export const dynamicParams = true;

export async function GET(_request: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await ctx.params;
  const pagePath = path.length ? `/${path.join("/")}` : "/";
  const body = renderMarkdown(pagePath);
  const canonical = `${ORIGIN}${pagePath === "/" ? "/" : pagePath}`;

  return new Response(body ?? notFoundMarkdown(pagePath), {
    status: body ? 200 : 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      // The HTML page is the citable original; this is an alternate form.
      Link: `<${canonical}>; rel="canonical"`,
      "X-Robots-Tag": "noindex, follow",
      Vary: "Accept",
    },
  });
}
