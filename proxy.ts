import { NextResponse, type NextRequest } from "next/server";

/**
 * Markdown content negotiation.
 *
 * An agent that sends `Accept: text/markdown` gets the Markdown twin of the
 * page (app/markdown) instead of HTML. The matcher only fires when the header
 * mentions text/markdown at all, so ordinary browser traffic never runs this.
 */
export function proxy(request: NextRequest) {
  if (!prefersMarkdown(request.headers.get("accept") ?? "")) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/markdown${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

/** True when text/markdown is ranked at least as high as text/html. */
function prefersMarkdown(accept: string): boolean {
  const q = (type: string) => {
    for (const part of accept.split(",")) {
      const [media, ...params] = part.trim().split(";");
      if (media.trim().toLowerCase() !== type) continue;
      const qParam = params.find((p) => p.trim().startsWith("q="));
      return qParam ? Number.parseFloat(qParam.trim().slice(2)) || 0 : 1;
    }
    return -1;
  };
  const markdown = q("text/markdown");
  return markdown > 0 && markdown >= q("text/html");
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/|api/|markdown|videos/|images/|.*\\.[a-z0-9]+$).*)",
      has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }],
    },
  ],
};
