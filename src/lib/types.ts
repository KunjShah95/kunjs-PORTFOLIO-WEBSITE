/** Shapes for the MDX-driven content layer.
 *  Frontmatter is the only place portfolio content is declared. */

export type ShipState =
  | 'Live'
  | 'Production'
  | 'Deployed'
  | 'Stable'
  | 'Open Source'
  | 'Beta'
  | 'Architecture'
  | 'Research'

export interface ProjectMeta {
  slug: string
  /** Two-digit index used as the editorial entry number. */
  number: string
  title: string
  category: string
  /** One line. Used on the index and in the command palette. */
  summary: string
  year: string
  status: ShipState
  tech: string[]
  github: string
  demo?: string
  peerlist?: string
  /** Order in the index. Lower sorts first. */
  order: number
  featured: boolean
  /** Diagram key rendered in the case-study SYSTEM section. */
  diagram?: DiagramKey
  /** Key claims. Only values present in the source record — nothing invented. */
  claims: Array<{ label: string; value: string; note?: string }>
  /** Short related-project slugs for the LINKS section. */
  related: string[]
}

export type LabState = 'active' | 'paused' | 'archived' | 'shipped'

export interface LabMeta {
  slug: string
  number: string
  title: string
  /** One sentence. The thing being tested. */
  hypothesis: string
  state: LabState
  stateNote: string
  tech: string[]
  /** What actually happened. Short and honest. */
  result: string
  repo?: string
  paper?: string
  year: string
  /** Link into shipped work, when the experiment graduated. */
  graduatedInto?: string[]
}

export type NoteCategory =
  | 'SYSTEMS'
  | 'AI'
  | 'ENGINEERING'
  | 'EXPERIMENTS'
  | 'PRODUCT'

export interface NoteMeta {
  slug: string
  title: string
  /** ISO year-month. Source dates were month-precision, so this stays
   *  month-precision. No day is invented. */
  date: string
  /** Human label exactly as recorded, e.g. "AUG 2026". */
  dateLabel: string
  category: NoteCategory
  readTime: number
  excerpt: string
  tags: string[]
  featured: boolean
  /** Case-study notes are also published as project write-ups. */
  projectSlug?: string
}

export type DiagramKey =
  | 'agent-loop'
  | 'rag-pipeline'
  | 'transformer'
  | 'edged-vision'
  | 'router'
  | 'workspace'
  | 'research-pipeline'
  | 'fairness-audit'
  | 'fraud-scoring'
  | 'analyzers'
  | 'skill-graph'
  | 'tutor-loop'

export interface Doc {
  meta: Record<string, any>
  content: string
}
