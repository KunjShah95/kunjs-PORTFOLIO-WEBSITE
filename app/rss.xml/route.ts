import { ORIGIN } from "@/lib/routes";
import { articles, site } from "@/lib/site-data";

/**
 * RSS 2.0 feed for the writing archive.
 *
 * Built from the static `articles` array rather than the live Medium feed, so
 * the feed is a pure function of the build: it cannot be empty because a
 * third-party request failed, and it needs no revalidation window.
 *
 * The essays themselves live on Medium — `/writing/:slug` redirects there — so
 * each item links out to the canonical post rather than to a route on this
 * site.
 */

export const revalidate = 3600;

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

/**
 * `"Jun 2026"` -> `2026-06-01T00:00:00Z`.
 *
 * The archive stores human-readable month strings, which carry no day. Any
 * parse failure falls back to the build date so an item is never dropped from
 * the feed for a formatting reason.
 */
function toIsoDate(value: string): string {
  const match = /^([A-Za-z]{3,})\s+(\d{4})$/.exec(value.trim());
  if (match) {
    const month = MONTHS[match[1].slice(0, 3).toLowerCase()];
    if (month !== undefined) {
      return new Date(Date.UTC(Number(match[2]), month, 1)).toISOString();
    }
  }
  const parsed = Date.parse(value);
  return Number.isNaN(parsed)
    ? new Date().toISOString()
    : new Date(parsed).toISOString();
}

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
  const items = [...articles]
    .sort((a, b) => toIsoDate(b.date).localeCompare(toIsoDate(a.date)))
    .map((article) => {
      const link = `${ORIGIN}/writing`;
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="false">${ORIGIN}/writing#${escapeXml(article.slug)}</guid>
      <pubDate>${toRfc822(toIsoDate(article.date))}</pubDate>
      <category>${escapeXml(article.categoryLabel)}</category>
      <description>${escapeXml(article.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const lastBuildDate = items
    ? toRfc822(toIsoDate([...articles].sort((a, b) => toIsoDate(b.date).localeCompare(toIsoDate(a.date)))[0].date))
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} — Writing</title>
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
