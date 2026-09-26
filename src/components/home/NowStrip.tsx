import Link from 'next/link'

import type { NowState } from '@/lib/content'
import s from './NowStrip.module.css'

/** The NOW strip. Everything in it comes from content/now.json, so updating
 *  what I am doing is a one-file edit with no component changes. */
export function NowStrip({ now }: { now: NowState }) {
  const items = [now.building, now.exploring, now.learning, now.writing]

  return (
    <div className={s.strip}>
      <div className={s.head}>
        <span className={s.lamp} aria-hidden="true">
          <i />
        </span>
        <h2 className={s.title}>Now</h2>
        <p className={s.availability}>{now.availability}</p>
      </div>

      <dl className={s.grid}>
        {items.map((item) => {
          const body = (
            <>
              <dt className={s.term}>{item.label}</dt>
              <dd className={s.value}>
                {item.value}
                {item.href ? (
                  <span className={s.go} aria-hidden="true">
                    ↗
                  </span>
                ) : null}
              </dd>
            </>
          )
          return item.href ? (
            <Link key={item.label} href={item.href} className={s.cell}>
              {body}
            </Link>
          ) : (
            <div key={item.label} className={s.cell}>
              {body}
            </div>
          )
        })}
      </dl>

      <p className={s.stamp}>
        <span className="mono-sm faint">Updated {now.updated}</span>
      </p>
    </div>
  )
}
