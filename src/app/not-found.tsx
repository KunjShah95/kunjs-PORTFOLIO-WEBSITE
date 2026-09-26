import Link from 'next/link'

import { NAV } from '@/lib/site'
import s from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={`surface-field ${s.wrap}`}>
      <div className={`shell ${s.inner}`}>
        <p className={s.code}>404</p>
        <h1 className={s.title}>
          No such node
          <br />
          in the graph.
        </h1>
        <p className={s.body}>
          That URL does not resolve to anything here. The systems, experiments and
          notes are all reachable from the four sections below.
        </p>
        <nav className={s.nav} aria-label="Site sections">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={s.navLink}>
              <span className="mono-sm">{n.index}</span>
              <span className={s.navLabel}>{n.label}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M2 12 12 2M5 2h7v7" stroke="currentColor" strokeWidth="1.2" fill="none" />
              </svg>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
