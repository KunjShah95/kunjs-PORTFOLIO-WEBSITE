import Link from 'next/link'
import type { ReactNode } from 'react'

import { Flow } from '@/components/diagrams/Flow'
import type { DiagramKey } from '@/lib/types'
import s from './Mdx.module.css'

/* ------------------------------------------------------------------ *
 * Case-study section frame. The five-section structure is part of the
 * page template rather than the prose, so every case study reads the same
 * way and the section navigation can be generated rather than authored.
 * ------------------------------------------------------------------ */
export function Section({
  n,
  id,
  title,
  kicker,
  children,
}: {
  n: string
  id: string
  title: string
  kicker?: string
  children: ReactNode
}) {
  return (
    <section className={s.section} id={id} aria-labelledby={`${id}-heading`}>
      <header className={s.sectionHead}>
        <span className={s.sectionN}>{n}</span>
        <div className={s.sectionTitles}>
          <h2 className={s.sectionTitle} id={`${id}-heading`}>
            {title}
          </h2>
          {kicker ? <p className={s.sectionKicker}>{kicker}</p> : null}
        </div>
      </header>
      <div className="prose">{children}</div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Cross-references
 * ------------------------------------------------------------------ */
export function ProjectLink({
  slug,
  label,
  note,
}: {
  slug: string
  label: string
  note: string
}) {
  return (
    <Link href={`/work/${slug}`} className={s.ref}>
      <span className={s.refKind}>Full case study</span>
      <span className={s.refLabel}>{label}</span>
      <span className={s.refNote}>{note}</span>
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path d="M2 12 12 2M5 2h7v7" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
    </Link>
  )
}

export function LabLink({
  slug,
  label,
  note,
}: {
  slug: string
  label: string
  note: string
}) {
  return (
    <Link href={`/lab/${slug}`} className={s.ref} data-kind="lab">
      <span className={s.refKind}>Lab entry</span>
      <span className={s.refLabel}>{label}</span>
      <span className={s.refNote}>{note}</span>
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path d="M2 12 12 2M5 2h7v7" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
    </Link>
  )
}

/* ------------------------------------------------------------------ *
 * Editorial asides. Not decoration — these carry the "why", which is
 * usually the only part of a case study that is actually interesting.
 * ------------------------------------------------------------------ */
export function Aside({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className={s.aside}>
      <p className={s.asideTitle}>{title}</p>
      <div className={s.asideBody}>{children}</div>
    </aside>
  )
}

export function Pull({ children }: { children: ReactNode }) {
  return <blockquote className={s.pull}>{children}</blockquote>
}

export function Figures({
  items,
}: {
  items: Array<{ value: string; label: string; note?: string }>
}) {
  return (
    <dl className={s.figures}>
      {items.map((f) => (
        <div className={s.figureCell} key={f.label}>
          <dt className={s.figureLabel}>{f.label}</dt>
          <dd className={s.figureValue}>{f.value}</dd>
          {f.note ? <dd className={s.figureNote}>{f.note}</dd> : null}
        </div>
      ))}
    </dl>
  )
}

/* ------------------------------------------------------------------ *
 * Diagram wrappers. MDX authors name the diagram; the flow data lives in
 * one place so the same diagram can be reused across case studies.
 * ------------------------------------------------------------------ */
function Diagram({ flow, caption }: { flow: DiagramKey; caption?: string }) {
  return <Flow flowKey={flow} caption={caption} />
}

export const AgentLoopDiagram = (p: { caption?: string }) => (
  <Diagram flow="agent-loop" {...p} />
)
export const RagPipelineDiagram = (p: { caption?: string }) => (
  <Diagram flow="rag-pipeline" {...p} />
)
export const TransformerDiagram = (p: { caption?: string }) => (
  <Diagram flow="transformer" {...p} />
)
export const EdgeVisionDiagram = (p: { caption?: string }) => (
  <Diagram flow="edged-vision" {...p} />
)
export const RouterDiagram = (p: { caption?: string }) => (
  <Diagram flow="router" {...p} />
)
export const WorkspaceDiagram = (p: { caption?: string }) => (
  <Diagram flow="workspace" {...p} />
)
export const ResearchPipelineDiagram = (p: { caption?: string }) => (
  <Diagram flow="research-pipeline" {...p} />
)
export const FairnessAuditDiagram = (p: { caption?: string }) => (
  <Diagram flow="fairness-audit" {...p} />
)
export const FraudScoringDiagram = (p: { caption?: string }) => (
  <Diagram flow="fraud-scoring" {...p} />
)
export const AnalyzersDiagram = (p: { caption?: string }) => (
  <Diagram flow="analyzers" {...p} />
)
export const SkillGraphDiagram = (p: { caption?: string }) => (
  <Diagram flow="skill-graph" {...p} />
)
export const TutorLoopDiagram = (p: { caption?: string }) => (
  <Diagram flow="tutor-loop" {...p} />
)

/** The component map handed to every MDX compile. */
export const mdxComponents = {
  Section,
  ProjectLink,
  LabLink,
  Aside,
  Pull,
  Figures,
  AgentLoopDiagram,
  RagPipelineDiagram,
  TransformerDiagram,
  EdgeVisionDiagram,
  RouterDiagram,
  WorkspaceDiagram,
  ResearchPipelineDiagram,
  FairnessAuditDiagram,
  FraudScoringDiagram,
  AnalyzersDiagram,
  SkillGraphDiagram,
  TutorLoopDiagram,
  a: ({ href = '', children, ...rest }: any) => {
    const external = /^https?:/.test(href)
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer noopener" {...rest}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  },
}
