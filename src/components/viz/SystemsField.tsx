'use client'

import { useEffect, useRef } from 'react'

import s from './SystemsField.module.css'

/** The six layers of a system this site is about, in dependency order.
 *  Positions are percentages of the field box so the layout is fluid. */
const NODES = [
  { id: 'data', label: 'Data', x: 11, y: 76, depth: 0.5 },
  { id: 'retrieval', label: 'Retrieval', x: 33, y: 57, depth: 0.72 },
  { id: 'model', label: 'Model', x: 55, y: 39, depth: 0.9 },
  { id: 'agents', label: 'Agents', x: 73, y: 21, depth: 1 },
  { id: 'tools', label: 'Tools', x: 89, y: 53, depth: 0.78 },
  { id: 'application', label: 'Application', x: 44, y: 12, depth: 0.6 },
] as const

const EDGES: Array<[string, string, 'solid' | 'dashed']> = [
  ['data', 'retrieval', 'solid'],
  ['retrieval', 'model', 'solid'],
  ['model', 'agents', 'solid'],
  ['agents', 'tools', 'solid'],
  ['tools', 'data', 'dashed'],
  ['agents', 'application', 'solid'],
  ['application', 'agents', 'dashed'],
]

const byId = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<
  string,
  (typeof NODES)[number]
>

/** A field, not a chart. Pointer movement shifts the plane in parallax; when
 *  the pointer leaves, everything settles back. No rAF loop is kept running
 *  while idle — the transform is written on pointermove and the browser
 *  interpolates with CSS. */
export function SystemsField() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0

    const loop = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      root.style.setProperty('--px', cx.toFixed(4))
      root.style.setProperty('--py', cy.toFixed(4))
      if (Math.abs(tx - cx) > 0.0008 || Math.abs(ty - cy) > 0.0008) {
        frame = requestAnimationFrame(loop)
      } else {
        frame = 0
      }
    }

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width) * 2 - 1
      ty = ((e.clientY - r.top) / r.height) * 2 - 1
      if (!frame) frame = requestAnimationFrame(loop)
    }

    const onLeave = () => {
      tx = 0
      ty = 0
      if (!frame) frame = requestAnimationFrame(loop)
    }

    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave, { passive: true })
    return () => {
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className={s.field} ref={rootRef} data-cursor="view" data-cursor-label="System">
      {/* Desktop / tablet: the constellation */}
      <div className={s.map} aria-hidden="true">
        <svg className={s.wires} viewBox="0 0 100 100" preserveAspectRatio="none">
          {EDGES.map(([a, b, kind]) => (
            <line
              key={`${a}-${b}`}
              className={s.wire}
              data-kind={kind}
              x1={byId[a].x}
              y1={byId[a].y}
              x2={byId[b].x}
              y2={byId[b].y}
            />
          ))}
          <line
            className={s.pulse}
            x1={byId.retrieval.x}
            y1={byId.retrieval.y}
            x2={byId.model.x}
            y2={byId.model.y}
          />
        </svg>

        <ul className={s.nodes}>
          {NODES.map((n) => (
            <li
              key={n.id}
              className={s.node}
              style={
                {
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  '--depth': n.depth,
                } as React.CSSProperties
              }
            >
              <span className={s.nodeDot} />
              <span className={s.nodeLabel}>{n.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* The same system, stated once for assistive tech and for crawlers. */}
      <p className="visually-hidden">
        An interactive diagram of a retrieval-augmented agent system: data feeds
        retrieval, retrieval feeds the model, the model drives agents, agents call
        tools, tools return to data, and agents serve the application in a loop.
      </p>

      {/* Mobile: the same hierarchy, reduced to a legible column. */}
      <ol className={s.column} aria-hidden="true">
        {NODES.map((n) => (
          <li key={n.id} className={s.columnItem}>
            <span className={s.columnLabel}>{n.label}</span>
            <span className={s.columnRule} />
          </li>
        ))}
      </ol>
    </div>
  )
}
