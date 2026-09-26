import Link from 'next/link'

import { IDENTITY, SOCIALS, NAV, SECONDARY_NAV } from '@/lib/site'
import s from './SiteFooter.module.css'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className={s.footer}>
      <div className={`shell ${s.inner}`}>
        <div className={s.top}>
          <div className={s.statement}>
            <p className={s.statementLead}>
              I build systems that <em>think</em>, retrieve, reason and ship.
            </p>
            <p className={s.statementNote}>
              Available for AI engineer and agent-builder work.
            </p>
            <div className={s.ctas}>
              <Link href="/work" className={s.ctaPrimary}>
                See the work
              </Link>
              <a href={`mailto:${IDENTITY.email}`} className={s.ctaSecondary}>
                {IDENTITY.email}
              </a>
            </div>
          </div>

          <nav className={s.columns} aria-label="Footer">
            <div className={s.col}>
              <h2 className="mono-sm faint">Index</h2>
              <ul>
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href}>{n.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.col}>
              <h2 className="mono-sm faint">More</h2>
              <ul>
                {SECONDARY_NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href}>{n.label}</Link>
                  </li>
                ))}
                <li>
                  <a href={IDENTITY.resume} target="_blank" rel="noreferrer noopener">
                    Résumé (PDF)
                  </a>
                </li>
              </ul>
            </div>
            <div className={s.col}>
              <h2 className="mono-sm faint">Elsewhere</h2>
              <ul>
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noreferrer noopener">
                      {social.label}
                      <span className="faint"> · {social.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className={s.base}>
          <p className="mono-sm faint">
            © {year} {IDENTITY.name} — {IDENTITY.location}
          </p>
          <p className="mono-sm faint">
            <a href="/llms.txt" className={s.baseLink}>
              llms.txt
            </a>
            <span aria-hidden="true"> · </span>
            <a href="/api/portfolio.json" className={s.baseLink}>
              portfolio.json
            </a>
            <span aria-hidden="true"> · </span>
            <Link href="/contact" className={s.baseLink}>
              Contact
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
