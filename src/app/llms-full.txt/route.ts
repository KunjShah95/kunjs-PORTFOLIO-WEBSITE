import {
  getLab,
  getLabEntry,
  getNote,
  getNotes,
  getNow,
  getProject,
  getProjects,
} from '@/lib/content'
import { buildLlmsTxt } from '@/lib/llms'
import {
  CONTRIBUTIONS,
  EDUCATION,
  EXPERIENCE,
  HACKATHONS,
  IDENTITY,
  SITE_URL,
} from '@/lib/site'

export const dynamic = 'force-static'
export const revalidate = 3600

/** Strips MDX components so the raw corpus reads as plain markdown. */
const clean = (md: string) =>
  md
    .replace(/<[^>]+>/g, '')
    .replace(/^\s*---\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

/** /llms-full.txt — the entire corpus as one markdown document. */
function buildLlmsFull(): string {
  const now = getNow()
  const L: string[] = []

  L.push(buildLlmsTxt())
  L.push('')
  L.push('---')
  L.push('')
  L.push('# Full text')
  L.push('')

  L.push('## Work — case studies')
  L.push('')
  for (const p of getProjects()) {
    const entry = getProject(p.slug)
    L.push(`### ${p.title} — ${SITE_URL}/work/${p.slug}`)
    L.push('')
    if (entry) L.push(clean(entry.body))
    L.push('')
    L.push(`Source: ${p.github}`)
    if (p.demo) L.push(`Demo: ${p.demo}`)
    L.push('')
  }

  L.push('## Lab — experiment entries')
  L.push('')
  for (const l of getLab()) {
    const entry = getLabEntry(l.slug)
    L.push(`### LAB ${l.number} — ${l.title} — ${SITE_URL}/lab/${l.slug}`)
    L.push('')
    if (entry) L.push(clean(entry.body))
    L.push('')
  }

  L.push('## Writing — Field Notes')
  L.push('')
  for (const n of getNotes()) {
    const entry = getNote(n.slug)
    L.push(`### ${n.title}`)
    L.push('')
    L.push(`${n.dateLabel} · ${n.category} · ${n.readTime} min · ${SITE_URL}/writing/${n.slug}`)
    L.push('')
    if (entry) L.push(clean(entry.body))
    L.push('')
  }

  L.push('## Experience')
  L.push('')
  for (const e of EXPERIENCE) {
    L.push(`- ${e.role}, ${e.org} (${e.period}) — ${e.body}`)
  }
  L.push('')

  L.push('## Education')
  L.push('')
  L.push(
    `- ${EDUCATION.degree}, ${EDUCATION.school}, ${EDUCATION.period}, ${EDUCATION.location}. ${EDUCATION.focus}`,
  )
  L.push('')

  L.push('## Hackathons')
  L.push('')
  for (const h of HACKATHONS) {
    L.push(`- ${h.event} (${h.year}) — ${h.placement}, team of ${h.team}. ${h.note}`)
  }
  L.push('')

  L.push('## Open source contributions')
  L.push('')
  for (const c of CONTRIBUTIONS) {
    L.push(`- ${c.org} — ${c.title} (${c.kind}) — ${c.url}`)
  }
  L.push('')

  L.push('## Status')
  L.push('')
  L.push(`Last updated ${now.updated}. ${now.availability}. Contact ${IDENTITY.email}.`)

  return L.join('\n')
}

export function GET() {
  return new Response(buildLlmsFull(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Robots-Tag': 'index, follow, max-snippet:-1',
    },
  })
}
