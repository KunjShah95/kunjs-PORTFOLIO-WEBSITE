import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

import type { LabMeta, NoteMeta, ProjectMeta } from './types'

const ROOT = path.join(process.cwd(), 'content')

function readDir(dir: string): string[] {
  const abs = path.join(ROOT, dir)
  if (!fs.existsSync(abs)) return []
  return fs
    .readdirSync(abs)
    .filter((f) => f.endsWith('.mdx'))
    .sort()
}

/* ------------------------------------------------------------------ *
 * Generic reader
 * ------------------------------------------------------------------ */

function readAll<T>(dir: string): Array<{ slug: string; meta: T; content: string }> {
  return readDir(dir).map((file) => {
    const raw = fs.readFileSync(path.join(ROOT, dir, file), 'utf8')
    const { data, content } = matter(raw)
    return {
      slug: (data.slug as string) ?? file.replace(/\.mdx$/, ''),
      meta: data as T,
      content,
    }
  })
}

/* ------------------------------------------------------------------ *
 * Projects — the primary record of shipped work
 * ------------------------------------------------------------------ */

export const getProjects = (): ProjectMeta[] =>
  readAll<ProjectMeta>('projects')
    .map((d) => d.meta)
    .sort((a, b) => a.order - b.order)

export const getProject = (slug: string) => {
  const entry = readAll<ProjectMeta>('projects').find((d) => d.slug === slug)
  if (!entry) return null
  return { meta: entry.meta, body: entry.content }
}

export const getProjectSlugs = () => getProjects().map((p) => p.slug)

/* ------------------------------------------------------------------ *
 * Lab — unfinished, experimental, research-oriented
 * ------------------------------------------------------------------ */

export const getLab = (): LabMeta[] =>
  readAll<LabMeta>('lab')
    .map((d) => d.meta)
    .sort((a, b) => a.number.localeCompare(b.number))

export const getLabEntry = (slug: string) => {
  const entry = readAll<LabMeta>('lab').find((d) => d.slug === slug)
  if (!entry) return null
  return { meta: entry.meta, body: entry.content }
}

export const getLabSlugs = () => getLab().map((l) => l.slug)

/* ------------------------------------------------------------------ *
 * Writing — Field Notes
 * ------------------------------------------------------------------ */

export const getNotes = (): NoteMeta[] =>
  readAll<NoteMeta>('writing')
    .map((d) => d.meta)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))

export const getNote = (slug: string) => {
  const entry = readAll<NoteMeta>('writing').find((d) => d.slug === slug)
  if (!entry) return null
  return { meta: entry.meta, body: entry.content }
}

export const getNoteSlugs = () => getNotes().map((n) => n.slug)

/* ------------------------------------------------------------------ *
 * NOW — the live status strip. Data driven: edit content/now.json.
 * ------------------------------------------------------------------ */

export interface NowState {
  updated: string
  availability: string
  building: { label: string; value: string; href?: string }
  exploring: { label: string; value: string; href?: string }
  learning: { label: string; value: string; href?: string }
  writing: { label: string; value: string; href?: string }
}

export const getNow = (): NowState => {
  const file = path.join(ROOT, 'now.json')
  return JSON.parse(fs.readFileSync(file, 'utf8')) as NowState
}

/* ------------------------------------------------------------------ *
 * Cross-cutting indexes used by the command palette and the tech map
 * ------------------------------------------------------------------ */

export interface PaletteRecord {
  id: string
  kind: 'project' | 'note' | 'lab' | 'page'
  label: string
  sub: string
  href: string
  keywords: string
}

export const getSearchIndex = (): PaletteRecord[] => {
  const records: PaletteRecord[] = []

  for (const p of getProjects()) {
    records.push({
      id: `project:${p.slug}`,
      kind: 'project',
      label: p.title,
      sub: `${p.category} · ${p.year} · ${p.status}`,
      href: `/work/${p.slug}`,
      keywords: [p.title, p.category, p.summary, p.tech.join(' '), 'project work case study']
        .join(' '),
    })
  }

  for (const n of getNotes()) {
    records.push({
      id: `note:${n.slug}`,
      kind: 'note',
      label: n.title,
      sub: `${n.category} · ${n.dateLabel} · ${n.readTime} min`,
      href: `/writing/${n.slug}`,
      keywords: [n.title, n.category, n.excerpt, n.tags.join(' '), 'writing field notes article']
        .join(' '),
    })
  }

  for (const l of getLab()) {
    records.push({
      id: `lab:${l.slug}`,
      kind: 'lab',
      label: l.title,
      sub: `LAB ${l.number} · ${l.state} · ${l.year}`,
      href: `/lab/${l.slug}`,
      keywords: [l.title, l.hypothesis, l.tech.join(' '), 'lab experiment research']
        .join(' '),
    })
  }

  return records
}

export interface StackEntry {
  tech: string
  category: string
  /** Project slugs this technology is evidenced in. */
  projects: string[]
  /** Lab slugs. */
  lab?: string[]
}

const STACK_GROUPS: Record<string, string[]> = {
  AI: ['LLM ORCHESTRATION', 'MULTI-PROVIDER LLM', 'CHAIN-OF-THOUGHT'],
  ML: ['YOLOV8', 'TENSORFLOW', 'SCIKIT-LEARN', 'XGBOOST', 'NUMPY', 'PYTORCH', 'CUDA', 'OPENCV'],
  RETRIEVAL: ['PGVECTOR', 'SUPABASE', 'CHROMADB', 'VECTOR DB', 'HYBRID SEARCH', 'RAG'],
  AGENTS: ['LANGGRAPH', 'MCP', 'AGENT ORCHESTRATION', 'TOOL INTEGRATION', 'CREWAI'],
  SYSTEMS: ['PYTHON', 'TYPESCRIPT', 'FASTAPI', 'NODE.JS', 'REACT', 'NEXT.JS', 'TANSTACK START'],
  BACKEND: ['FLASK', 'POSTGRESQL', 'REST API', 'FIREBASE', 'SUPABASE REALTIME', 'GRAPHQL'],
  FRONTEND: ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND', 'CANVAS / WEBGL'],
  INFRASTRUCTURE: ['DOCKER', 'VERCEL', 'GITHUB ACTIONS', 'CLOUDFLARE', 'RENDER', 'JETSON ORIN', 'TENSORRT', 'OLLAMA'],
}

/** The technology map is derived from the project record, so every node in
 *  the map is evidence of a real system. No hand-written skill list. */
export function getStack(): StackEntry[] {
  const map = new Map<string, StackEntry>()

  const ensure = (tech: string, category: string): StackEntry => {
    const key = tech.toUpperCase()
    const existing = map.get(key)
    if (existing) {
      if (!existing.projects.includes('')) {
        // category wins on first assignment; keep it stable
      }
      return existing
    }
    const entry: StackEntry = { tech: key, category, projects: [], lab: [] }
    map.set(key, entry)
    return entry
  }

  for (const p of getProjects()) {
    for (const raw of p.tech) {
      const tech = raw.toUpperCase()
      let category = 'SYSTEMS'
      for (const [group, list] of Object.entries(STACK_GROUPS)) {
        if (list.includes(tech)) {
          category = group
          break
        }
      }
      const entry = ensure(tech, category)
      if (!entry.projects.includes(p.slug)) entry.projects.push(p.slug)
    }
  }

  // Technologies that are evidenced in the lab record but not yet in a
  // shipped project still belong on the map.
  for (const l of getLab()) {
    for (const raw of l.tech) {
      const tech = raw.toUpperCase()
      let category = 'SYSTEMS'
      for (const [group, list] of Object.entries(STACK_GROUPS)) {
        if (list.includes(tech)) {
          category = group
          break
        }
      }
      const entry = ensure(tech, category)
      if (!entry.lab) entry.lab = []
      if (!entry.lab.includes(l.slug)) entry.lab.push(l.slug)
    }
  }

  return [...map.values()].sort((a, b) => {
    const g = Object.keys(STACK_GROUPS).indexOf(a.category)
    const h = Object.keys(STACK_GROUPS).indexOf(b.category)
    return g - h || a.tech.localeCompare(b.tech)
  })
}

export const STACK_CATEGORY_ORDER = Object.keys(STACK_GROUPS)

export const STACK_CATEGORY_BLURB: Record<string, string> = {
  AI: 'Model application patterns — routing, reasoning, provider strategy.',
  ML: 'Trained models, feature pipelines, and the numerics underneath them.',
  RETRIEVAL: 'Everything that puts the right chunk in front of the model.',
  AGENTS: 'Planning, tool use, memory, and the loops that hold them together.',
  SYSTEMS: 'Application layer: types, services, and the interfaces between them.',
  BACKEND: 'Data stores, transports, and the services behind the interface.',
  FRONTEND: 'What the user actually touches, and how little of it there should be.',
  INFRASTRUCTURE: 'Where it runs, how it ships, and what it costs to keep running.',
}
