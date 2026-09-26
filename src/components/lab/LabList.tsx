'use client'

import { useState } from 'react'
import Link from 'next/link'

import type { LabMeta } from '@/lib/types'
import s from './LabList.module.css'

const STATE_LABEL: Record<LabMeta['state'], string> = {
  active: 'Active',
  paused: 'Paused',
  archived: 'Archived',
  shipped: 'Shipped',
}

/** Lab entries. Visually distinct from work on purpose: a darker plane, a
 *  denser grid, dashed rules and a state lamp instead of a status chip.
 *  The list is interactive — selecting an entry swaps the detail panel, so
 *  the whole lab is legible without leaving the index. */
export function LabList({ entries }: { entries: LabMeta[] }) {
  const [active, setActive] = useState(entries[0]?.slug ?? '')
  const current = entries.find((e) => e.slug === active) ?? entries[0]

  return (
    <div className={s.wrap}>
      <ol className={s.list}>
        {entries.map((entry) => {
          const on = entry.slug === active
          return (
            <li key={entry.slug}>
              <Link
                href={`/lab/${entry.slug}`}
                className={s.row}
                data-active={on || undefined}
                data-cursor="view"
                data-cursor-label="Experiment"
                onMouseEnter={() => setActive(entry.slug)}
                onFocus={() => setActive(entry.slug)}
              >
                <span className={s.rowHead}>
                  <span className={s.rowNum}>LAB {entry.number}</span>
                  <span className={s.lamp} data-state={entry.state}>
                    <i />
                    {STATE_LABEL[entry.state]}
                  </span>
                </span>
                <span className={s.rowTitle}>{entry.title}</span>
                <span className={s.rowHypothesis}>{entry.hypothesis}</span>
              </Link>
            </li>
          )
        })}
      </ol>

      {current ? (
        <aside className={s.panel} aria-live="polite">
          <div className={s.panelInner} key={current.slug}>
            <p className="mono-sm accent">LAB {current.number} — {STATE_LABEL[current.state]}</p>
            <h3 className={s.panelTitle}>{current.title}</h3>

            <dl className={s.panelMeta}>
              <dt className="mono-sm faint">Hypothesis</dt>
              <dd>{current.hypothesis}</dd>

              <dt className="mono-sm faint">Result</dt>
              <dd>{current.result}</dd>

              {current.stateNote ? (
                <>
                  <dt className="mono-sm faint">Status note</dt>
                  <dd>{current.stateNote}</dd>
                </>
              ) : null}
            </dl>

            <div className={s.panelTech}>
              {current.tech.map((t) => (
                <span className={s.tech} key={t}>
                  {t}
                </span>
              ))}
            </div>

            <div className={s.panelLinks}>
              <Link href={`/lab/${current.slug}`} className={s.panelCta}>
                Read the entry
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 10 10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.2" fill="none" />
                </svg>
              </Link>
              {current.repo ? (
                <a
                  href={current.repo}
                  className={s.panelGhost}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Repository ↗
                </a>
              ) : null}
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  )
}
