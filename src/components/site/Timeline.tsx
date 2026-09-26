'use client'

import { useState } from 'react'

import { EXPERIENCE } from '@/lib/site'
import s from './Timeline.module.css'

/** Career and building timeline. Sorted by start date, rendered as a
 *  measured rail rather than a list of jobs — the point is progression,
 *  not a CV. */
export function Timeline({ items = EXPERIENCE }: { items?: readonly (typeof EXPERIENCE)[number][] }) {
  const sorted = [...items].sort((a, b) => b.from.localeCompare(a.from))
  const [active, setActive] = useState<string>(sorted[0]?.id ?? '')

  return (
    <div className={s.wrap}>
      <ol className={s.rail}>
        {sorted.map((e) => {
          const on = e.id === active
          return (
            <li key={e.id} className={s.entry} data-kind={e.kind}>
              <button
                type="button"
                className={s.button}
                data-on={on || undefined}
                aria-expanded={on}
                onClick={() => setActive(on ? '' : e.id)}
                onMouseEnter={() => setActive(e.id)}
              >
                <span className={s.marker} aria-hidden="true">
                  <i />
                </span>
                <span className={s.period}>
                  <time>{e.period}</time>
                </span>
                <span className={s.headings}>
                  <span className={s.org}>{e.org}</span>
                  <span className={s.role}>{e.role}</span>
                </span>
                <span className={s.kind}>{e.kind === 'role' ? 'Role' : 'Track'}</span>
              </button>

              <div className={s.detail} data-open={on || undefined}>
                <div className={s.detailInner}>
                  <p className={s.body}>{e.body}</p>
                  <ul className={s.tags}>
                    {e.tags.map((t) => (
                      <li key={t} className={s.tag}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
