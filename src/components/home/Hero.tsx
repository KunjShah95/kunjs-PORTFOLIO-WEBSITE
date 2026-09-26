'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { SystemsField } from '@/components/viz/SystemsField'
import { MaskedLines } from '@/components/motion/Motion'
import type { NowState } from '@/lib/content'
import { IDENTITY } from '@/lib/site'
import s from './Hero.module.css'

/** The hero. Name, role, one statement, and four facts. No badges, no
 *  skill pills, no paragraph of positioning copy. The systems field sits
 *  beside it rather than behind it, so the type stays readable. */
export function Hero({ now }: { now: NowState }) {
  // Drives a small local-time readout. Static server render, hydrated here.
  const [clock, setClock] = useState<string | null>(null)

  useEffect(() => {
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        }).format(new Date()),
      )
    }
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  const current = now.building

  return (
    <section className={`surface-field ${s.hero}`} aria-labelledby="hero-name">
      <div className={`shell ${s.grid}`}>
        <div className={s.copy}>
          <p className={s.eyebrow}>
            <span className={s.eyebrowIndex}>00</span>
            <span className={s.eyebrowRule} aria-hidden="true" />
            <span>{IDENTITY.role}</span>
          </p>

          <MaskedLines
            as="h1"
            className={s.name}
            lines={['Kunj Shah']}
            delay={0.06}
          />

          <MaskedLines
            as="p"
            className={s.statement}
            lines={['I build systems that', 'think, retrieve, reason', 'and ship.']}
            delay={0.16}
            stagger={0.075}
          />

          <dl className={s.facts}>
            <div className={s.fact}>
              <dt className="mono-sm">Based</dt>
              <dd>
                {IDENTITY.location}
                {clock ? <span className={s.clock}> · {clock} IST</span> : null}
              </dd>
            </div>
            <div className={s.fact}>
              <dt className="mono-sm">Status</dt>
              <dd>{now.availability}</dd>
            </div>
            <div className={s.fact}>
              <dt className="mono-sm">Building</dt>
              <dd>
                <Link href={current.href ?? '/work'} className={s.factLink}>
                  {current.value}
                </Link>
              </dd>
            </div>
          </dl>

          <div className={s.ctas}>
            <Link href="/work" className={s.ctaPrimary}>
              See the work
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" fill="none" />
              </svg>
            </Link>
            <Link href="/lab" className={s.ctaSecondary}>
              Read the lab
            </Link>
            <a
              href={`mailto:${IDENTITY.email}`}
              className={s.ctaGhost}
            >
              {IDENTITY.email}
            </a>
          </div>
        </div>

        <div className={s.fieldWrap}>
          <p className={s.fieldCaption}>
            <span className="mono-sm faint">A system, roughly</span>
          </p>
          <SystemsField />
        </div>
      </div>

      <div className={`shell ${s.foot}`}>
        <span className="mono-sm faint">
          13 shipped systems · 10 lab entries · 21 notes
        </span>
        <span className={s.scrollCue} aria-hidden="true">
          <i />
        </span>
      </div>
    </section>
  )
}
