'use client'

import { useState } from 'react'

import { FLOWS } from './flows'
import s from './Flow.module.css'

/** An architecture diagram drawn as a process block: a rail, numbered
 *  stages, and explicit return paths. Hovering or focusing a stage reveals
 *  what it does and highlights the paths that touch it.
 *
 *  It is a list, not a canvas — so it is crawlable, keyboard-navigable and
 *  costs no JavaScript until interaction. */
export function Flow({
  flowKey,
  caption,
}: {
  flowKey: keyof typeof FLOWS
  caption?: string
}) {
  const flow = FLOWS[flowKey]
  const [active, setActive] = useState<string | null>(null)

  const touching = (id: string) =>
    flow.returns?.some((r) => (r.from === id || r.to === id) && (active === r.from || active === r.to))

  return (
    <figure className={s.figure} data-cursor="view" data-cursor-label="Diagram">
      <figcaption className={s.caption}>
        <span className={s.captionIndex}>FIG</span>
        <span className={s.captionTitle}>{flow.title}</span>
        <span className={s.captionNote}>{caption ?? flow.caption}</span>
      </figcaption>

      <ol className={s.rail} onMouseLeave={() => setActive(null)}>
        {flow.stages.map((stage, i) => (
          <li
            key={stage.id}
            className={s.stage}
            data-active={active === stage.id || undefined}
            data-touched={active && touching(stage.id) ? '' : undefined}
            onMouseEnter={() => setActive(stage.id)}
            onFocus={() => setActive(stage.id)}
            onBlur={() => setActive(null)}
            tabIndex={0}
            aria-describedby={`${flow.key}-${stage.id}-note`}
          >
            <span className={s.tick} aria-hidden="true">
              <i />
            </span>
            <span className={s.body}>
              <span className={s.head}>
                <span className={s.idx}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.label}>{stage.label}</span>
                {stage.tag ? <span className={s.tag}>{stage.tag}</span> : null}
              </span>
              <span className={s.note} id={`${flow.key}-${stage.id}-note`}>
                {stage.note}
              </span>
            </span>
          </li>
        ))}
      </ol>

      {flow.returns?.length ? (
        <div className={s.returns}>
          <span className="mono-sm faint">Return paths</span>
          <ul className={s.returnList}>
            {flow.returns.map((r) => (
              <li
                key={`${r.from}-${r.to}-${r.label}`}
                className={s.return}
                data-active={
                  active === r.from || active === r.to ? '' : undefined
                }
                data-kind={r.kind}
              >
                <span className={s.returnEdge}>
                  {flow.stages.find((x) => x.id === r.from)?.label}
                  <span className={s.returnArrow} aria-hidden="true">
                    ↩
                  </span>
                  {flow.stages.find((x) => x.id === r.to)?.label}
                </span>
                <span className={s.returnLabel}>{r.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </figure>
  )
}
