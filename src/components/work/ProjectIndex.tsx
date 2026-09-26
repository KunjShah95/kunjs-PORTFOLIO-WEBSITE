'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

import type { ProjectMeta } from '@/lib/types'
import { ProjectMark } from './ProjectMark'
import s from './ProjectIndex.module.css'

/** The work index, set as an editorial table of contents rather than a card
 *  grid. Each row is a link; the row reveals the rest of the metadata on
 *  hover and on keyboard focus, and the procedural mark shifts state. */
export function ProjectIndex({
  projects,
  limit,
  showHeader = true,
}: {
  projects: ProjectMeta[]
  limit?: number
  showHeader?: boolean
}) {
  const rows = typeof limit === 'number' ? projects.slice(0, limit) : projects

  return (
    <ol className={s.index}>
      {rows.map((p) => (
        <ProjectRow
          key={p.slug}
          project={p}
          total={projects.length}
          showHeader={showHeader}
        />
      ))}
    </ol>
  )
}

function ProjectRow({
  project,
  total,
  showHeader,
}: {
  project: ProjectMeta
  total: number
  showHeader: boolean
}) {
  const ref = useRef<HTMLLIElement>(null)
  const [hover, setHover] = useState(false)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPointer({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    })
  }

  return (
    <li
      ref={ref}
      className={s.row}
      data-open={hover || undefined}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onPointerMove={onMove}
    >
      {/* The wash follows the pointer at very low contrast — depth without
          a background image. */}
      <span
        className={s.wash}
        aria-hidden="true"
        style={{
          transform: `translate3d(${pointer.x}%, ${pointer.y}%, 0)`,
        }}
      />

      <Link
        href={`/work/${project.slug}`}
        className={s.link}
        data-cursor="view"
        data-cursor-label="Case study"
        aria-describedby={`${project.slug}-summary`}
      >
        <span className={s.num}>
          <span className={s.numInner}>
            <span className={s.numA}>{project.number}</span>
            <span className={s.numB} aria-hidden="true">
              {String(total).padStart(2, '0')}
            </span>
          </span>
        </span>

        <span className={s.main}>
          <span className={s.titleRow}>
            <h3 className={s.title}>{project.title}</h3>
            <span className={s.status} data-state={project.status}>
              {project.status}
            </span>
          </span>
          <span className={s.summary} id={`${project.slug}-summary`}>
            {project.summary}
          </span>
          {showHeader ? (
            <span className={s.reveal}>
              <span className={s.revealInner}>
                <span className={s.revealTech}>
                  {project.tech.slice(0, 6).map((t) => (
                    <span key={t} className={s.chip}>
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 6 ? (
                    <span className={s.chipMore}>+{project.tech.length - 6}</span>
                  ) : null}
                </span>
                <span className={s.revealLinks}>
                  {project.demo ? 'Live demo' : 'Case study'}
                  <span className={s.revealYear}>· {project.year}</span>
                </span>
              </span>
            </span>
          ) : null}
        </span>

        <span className={s.aside}>
          <span className={s.category}>{project.category}</span>
          <span className={s.year}>{project.year}</span>
        </span>

        <span className={s.mark} aria-hidden="true">
          <ProjectMark seed={project.slug} className={s.markSvg} />
        </span>

        <span className={s.arrow} aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 14 14">
            <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" fill="none" />
          </svg>
        </span>
      </Link>
    </li>
  )
}
