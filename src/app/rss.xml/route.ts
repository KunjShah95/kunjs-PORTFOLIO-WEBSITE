import { getNotes } from '@/lib/content'
import { IDENTITY, SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'
export const revalidate = 3600

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

export function GET() {
  const notes = getNotes()
  const latest = notes[0]?.date ?? '2026-01'

  const items = notes
    .map(
      (n) => `    <item>
      <title>${esc(n.title)}</title>
      <link>${SITE_URL}/writing/${n.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/writing/${n.slug}</guid>
      <pubDate>${new Date(`${n.date}-01T09:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(n.category)}</category>
      <description>${esc(n.excerpt)}</description>
    </item>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(IDENTITY.name)} — Field Notes</title>
    <link>${SITE_URL}/writing</link>
    <description>Notes on systems, AI engineering and the decisions behind shipped work.</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${latest}-01T09:00:00Z`).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
