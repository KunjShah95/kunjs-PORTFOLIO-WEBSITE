import {
  getLab,
  getLabEntry,
  getNote,
  getNotes,
  getNow,
  getProject,
  getProjects,
} from '@/lib/content'
import { CONTRIBUTIONS, EDUCATION, EXPERIENCE, HACKATHONS, IDENTITY, SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'
export const revalidate = 3600

/** The machine-readable portfolio record. Everything here is derived from the
 *  same content layer the pages render from, so the two cannot disagree. */
export function GET() {
  const now = getNow()
  const projects = getProjects()
  const notes = getNotes()
  const lab = getLab()

  const body = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    version: '2.0',
    updated: now.updated,
    site: SITE_URL,
    person: {
      name: IDENTITY.name,
      role: IDENTITY.role,
      location: IDENTITY.location,
      email: IDENTITY.email,
      links: {
        github: IDENTITY.github,
        githubAlt: IDENTITY.githubAlt,
        linkedin: IDENTITY.linkedin,
        x: IDENTITY.x,
        huggingface: IDENTITY.huggingface,
        peerlist: IDENTITY.peerlist,
        medium: IDENTITY.medium,
      },
      resume: `${SITE_URL}${IDENTITY.resume}`,
      resumeAlt: `${SITE_URL}${IDENTITY.resumeAlt}`,
      focus: [...IDENTITY.focus],
    },
    status: {
      availability: now.availability,
      building: now.building.value,
      exploring: now.exploring.value,
      learning: now.learning.value,
      writing: now.writing.value,
    },
    openSource: {
      mergedPRs: 44,
      externalRepos: 13,
      issuesOpened: 45,
      prsReviewed: 18,
      notableOrgs: ['OWASP', 'Microsoft', 'Ollama'],
      contributions: CONTRIBUTIONS.map((c) => ({
        repo: c.org,
        summary: c.title,
        kind: c.kind,
        tag: c.tag,
        url: c.url,
      })),
    },
    experience: EXPERIENCE.map((e) => ({
      org: e.org,
      role: e.role,
      period: e.period,
      from: e.from,
      to: e.to,
      body: e.body,
      tags: [...e.tags],
    })),
    education: EDUCATION,
    hackathons: HACKATHONS.map((h) => ({
      event: h.event,
      year: h.year,
      placement: h.placement,
      teamSize: h.team,
      note: h.note,
    })),
    work: projects.map((p) => {
      const entry = getProject(p.slug)
      return {
        slug: p.slug,
        number: p.number,
        title: p.title,
        category: p.category,
        status: p.status,
        year: p.year,
        summary: p.summary,
        tech: p.tech,
        links: { github: p.github, ...(p.demo ? { demo: p.demo } : {}), ...(p.peerlist ? { peerlist: p.peerlist } : {}) },
        claims: p.claims,
        url: `${SITE_URL}/work/${p.slug}`,
        ...(entry ? { text: entry.body } : {}),
      }
    }),
    lab: lab.map((l) => {
      const entry = getLabEntry(l.slug)
      return {
        slug: l.slug,
        number: l.number,
        title: l.title,
        hypothesis: l.hypothesis,
        state: l.state,
        stateNote: l.stateNote,
        result: l.result,
        tech: l.tech,
        year: l.year,
        url: `${SITE_URL}/lab/${l.slug}`,
        ...(l.repo ? { repo: l.repo } : {}),
        ...(entry ? { text: entry.body } : {}),
      }
    }),
    writing: notes.map((n) => {
      const entry = getNote(n.slug)
      return {
        slug: n.slug,
        title: n.title,
        date: n.date,
        dateLabel: n.dateLabel,
        category: n.category,
        readTimeMinutes: n.readTime,
        excerpt: n.excerpt,
        tags: n.tags,
        ...(n.projectSlug ? { project: `${SITE_URL}/work/${n.projectSlug}` } : {}),
        url: `${SITE_URL}/writing/${n.slug}`,
        ...(entry ? { text: entry.body } : {}),
      }
    }),
  }

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
