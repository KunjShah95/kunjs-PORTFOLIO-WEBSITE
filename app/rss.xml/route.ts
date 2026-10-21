import { ORIGIN } from "@/lib/routes";
import { essayCategoryLabel, essaysByDate } from "@/lib/essays";
import { site } from "@/lib/site-data";

/**
 * RSS 2.0 feed for the writing archive.
 *
 * Items point at the article pages on this site, not at the original posts:
 * the essays are served here in full, so this is the URL a reader can open
 * and a crawler can quote. The original post stays reachable from each
 * article page.
 *
 * Built from the committed archive rather than a live feed request, so the
 * feed cannot come back empty because a third party was slow.
 */

export const revalidate = 3600;

/** Escape the five characters that are not legal in XML character data. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS requires RFC-822 dates, not ISO 8601. */
function toRfc822(iso: string): string {
  return new Date(iso).toUTCString();
}

export async function GET() {
  const items = essaysByDate
    .map(
      (essay) => `    <item>
      <title>${escapeXml(essay.title)}</title>
      <link>${ORIGIN}/writing/${essay.slug}</link>
      <guid isPermaLink="true">${ORIGIN}/writing/${essay.slug}</guid>
      <pubDate>${toRfc822(essay.date)}</pubDate>
      <category>${escapeXml(essayCategoryLabel(essay.category))}</category>
      <description>${escapeXml(essay.excerpt)}</description>
      <dc:creator>${escapeXml(site.name)}</dc:creator>
    </item>`,
    )
    .join("\n");

  const lastBuildDate = essaysByDate.length ? toRfc822(essaysByDate[0].date) : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(site.name)}: Writing</title>
    <link>${ORIGIN}/writing</link>
    <description>Essays on AI engineering, agent systems, and shipping machine learning that survives production.</description>
    <language>en-in</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${ORIGIN}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
