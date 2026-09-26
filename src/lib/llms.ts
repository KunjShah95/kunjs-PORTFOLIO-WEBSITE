import { getLab, getNotes, getNow, getProjects } from '@/lib/content'
import { CONTRIBUTIONS, IDENTITY, OSS_STATS, SITE_URL } from '@/lib/site'

/** /llms.txt — a flat, readable index for agents and crawlers.
 *  Same content layer as the pages, so it can never drift. */
export function buildLlmsTxt(): string {
  const now = getNow()
  const projects = getProjects()
  const lab = getLab()
  const notes = getNotes()
  const L: string[] = []

  L.push(`# ${IDENTITY.name}`)
  L.push('')
  L.push(`> ${IDENTITY.role} in ${IDENTITY.location}. Builds retrieval pipelines, agent systems,`)
  L.push('> edge inference and the backend services that make them production-ready. This site is an')
  L.push('> engineering laboratory, an editorial portfolio and a systems journal.')
  L.push('')
  L.push(`Canonical: ${SITE_URL}`)
  L.push(`Last updated: ${now.updated}`)
  L.push('')

  L.push('## Currently')
  L.push('')
  L.push(`- Building: ${now.building.value}`)
  L.push(`- Exploring: ${now.exploring.value}`)
  L.push(`- Learning: ${now.learning.value}`)
  L.push(`- Status: ${now.availability}`)
  L.push('')

  L.push('## Shipped work')
  L.push('')
  for (const p of projects) {
    L.push(`### ${p.title} (${p.year}, ${p.status}) — ${p.category}`)
    L.push(p.summary)
    L.push(`- Case study: ${SITE_URL}/work/${p.slug}`)
    L.push(`- Tech: ${p.tech.join(', ')}`)
    if (p.demo) L.push(`- Demo: ${p.demo}`)
    L.push(`- Source: ${p.github}`)
    if (p.claims.length) {
      L.push(`- Claims: ${p.claims.map((c) => `${c.label}: ${c.value}`).join('; ')}`)
    }
    L.push('')
  }

  L.push('## Lab — experiments and unfinished research')
  L.push('')
  for (const l of lab) {
    L.push(`### LAB ${l.number} — ${l.title} [${l.state}]`)
    L.push(`Hypothesis: ${l.hypothesis}`)
    L.push(`Result: ${l.result}`)
    L.push(`- Entry: ${SITE_URL}/lab/${l.slug}`)
    L.push(`- Tech: ${l.tech.join(', ')}`)
    L.push('')
  }

  L.push('## Writing — Field Notes')
  L.push('')
  for (const n of notes) {
    L.push(`- [${n.title}](${SITE_URL}/writing/${n.slug}) — ${n.dateLabel} · ${n.category} · ${n.readTime} min`)
  }
  L.push('')

  L.push('## Open source')
  L.push('')
  L.push(
    `${OSS_STATS.mergedPRs} merged pull requests across ${OSS_STATS.projects} external repositories, including ${OSS_STATS.orgs.join(', ')}. ${OSS_STATS.openedIssues} issues opened, ${OSS_STATS.codeReviews} PRs reviewed.`,
  )
  for (const c of CONTRIBUTIONS.filter((x) => x.notable)) {
    L.push(`- ${c.org}: ${c.title} (${c.kind}) — ${c.url}`)
  }
  L.push('')

  L.push('## Pages')
  L.push('')
  L.push(`- Work index: ${SITE_URL}/work`)
  L.push(`- Lab index: ${SITE_URL}/lab`)
  L.push(`- Writing index: ${SITE_URL}/writing`)
  L.push(`- Technology map: ${SITE_URL}/stack`)
  L.push(`- Timeline: ${SITE_URL}/timeline`)
  L.push(`- Open source: ${SITE_URL}/open-source`)
  L.push(`- About: ${SITE_URL}/about`)
  L.push(`- Contact: ${SITE_URL}/contact`)
  L.push('')

  L.push('## Contact')
  L.push('')
  L.push(`- Email: ${IDENTITY.email}`)
  L.push(`- GitHub: ${IDENTITY.github}`)
  L.push(`- LinkedIn: ${IDENTITY.linkedin}`)
  L.push(`- Résumé: ${SITE_URL}${IDENTITY.resume}`)
  L.push('')
  L.push('---')
  L.push('')
  L.push('Every figure on this site traces to a benchmark, a measurement or a linked artefact.')
  L.push('There are no skill percentages and no estimated metrics.')

  return L.join('\n')
}
