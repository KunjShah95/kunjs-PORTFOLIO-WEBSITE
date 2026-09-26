'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

import type { StackEntry } from '@/lib/content'
import s from './TechMap.module.css'

export interface TechMapItem extends StackEntry {
  projectTitles: Record<string, string>
  labTitles: Record<string, string>
  /** Total evidence count: shipped projects weigh more than lab notes. */
  weight: number
}

export interface TechMapGroup {
  category: string
  blurb: string
  items: TechMapItem[]
}

/** An evidence-linked technology map.
 *
 *  Every node exists because a shipped project or a lab entry declares it.
 *  Selecting a node reveals what it was used for, not a self-assessment.
 *  Nothing here is a claim about skill level. */
export function TechMap({
  groups,
  compact = false,
}: {
  groups: TechMapGroup[]
  compact?: boolean
}) {
  const [selected, setSelected] = useState<string | null>(
    compact ? null : groups[0]?.items[0]?.tech ?? null,
  )
  const [hover, setHover] = useState<string | null>(null)

  const active = useMemo(
    () => groups.flatMap((g) => g.items).find((i) => i.tech === (hover ?? selected)),
    [groups, hover, selected],
  )

  return (
    <div className={s.wrap} data-compact={compact || undefined}>
      <div className={s.rails}>
        {groups.map((group) => {
          const maxWeight = Math.max(1, ...group.items.map((i) => i.weight))
          return (
            <section className={s.group} key={group.category}>
              <header className={s.groupHead}>
                <h3 className={s.groupName}>{group.category}</h3>
                <p className={s.groupBlurb}>{group.blurb}</p>
              </header>
              <ul className={s.items}>
                {group.items.map((item) => {
                  const on = (hover ?? selected) === item.tech
                  return (
                    <li key={item.tech}>
                      <button
                        type="button"
                        className={s.item}
                        data-on={on || undefined}
                        style={{ '--fill': item.weight / maxWeight } as React.CSSProperties}
                        onMouseEnter={() => setHover(item.tech)}
                        onMouseLeave={() => setHover(null)}
                        onFocus={() => setHover(item.tech)}
                        onBlur={() => setHover(null)}
                        onClick={() =>
                          setSelected((cur) => (cur === item.tech ? null : item.tech))
                        }
                        aria-pressed={selected === item.tech}
                      >
                        <span className={s.itemBar} aria-hidden="true" />
                        <span className={s.itemName}>{item.tech}</span>
                        <span className={s.itemCount}>
                          {item.projects.length > 0 ? (
                            <abbr title={`${item.projects.length} shipped project(s)`}>
                              {item.projects.length}P
                            </abbr>
                          ) : null}
                          {item.lab && item.lab.length > 0 ? (
                            <abbr title={`${item.lab.length} lab entr(y/ies)`}>
                              {item.lab.length}L
                            </abbr>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>

      <div className={s.detail} aria-live="polite">
        {active ? (
          <div className={s.detailInner} key={active.tech}>
            <p className="mono-sm accent">{active.category}</p>
            <h4 className={s.detailName}>{active.tech}</h4>

            {active.projects.length > 0 ? (
              <div className={s.detailBlock}>
                <p className="mono-sm faint">Shipped in</p>
                <ul className={s.detailProjects}>
                  {active.projects.map((slug) => (
                    <li key={slug}>
                      <Link href={`/work/${slug}`} className={s.detailProject}>
                        <span>{active.projectTitles[slug] ?? slug}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                          <path d="M2 10 10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.2" fill="none" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {active.lab && active.lab.length > 0 ? (
              <div className={s.detailBlock}>
                <p className="mono-sm faint">Also in lab</p>
                <ul className={s.detailProjects}>
                  {active.lab.map((slug) => (
                    <li key={slug}>
                      <Link href={`/lab/${slug}`} className={s.detailProject} data-kind="lab">
                        <span>{active.labTitles[slug] ?? slug}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                          <path d="M2 10 10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.2" fill="none" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {active.projects.length === 0 && (!active.lab || active.lab.length === 0) ? (
              <p className={s.detailEmpty}>
                Declared in the record but not yet attached to a shipped system.
              </p>
            ) : null}
          </div>
        ) : (
          <div className={s.detailInner}>
            <p className={s.detailPrompt}>
              Select a technology to see where it was actually used.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
