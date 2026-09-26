import type { Metadata } from 'next'
import Link from 'next/link'

import { PageHeader } from '@/components/ui/Primitives'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd, pageMeta } from '@/lib/seo'
import { getNow } from '@/lib/content'
import { EDUCATION, HACKATHONS, IDENTITY, OSS_STATS, SOCIALS } from '@/lib/site'
import s from './contact.module.css'

export const metadata: Metadata = pageMeta({
  title: 'Contact',
  description:
    'Contact Kunj Shah — AI engineer in Ahmedabad, India, open to AI engineer and agent-builder roles. Email, GitHub, LinkedIn and a downloadable résumé.',
  path: '/contact',
})

const FAQ = [
  {
    q: 'What are you looking for?',
    a: 'AI engineer and agent-builder roles. Backend-heavy work where the retrieval layer, the model calls and the operational concerns all matter — not a research seat and not a pure prompt role.',
  },
  {
    q: 'Do you take freelance work?',
    a: 'Yes, scoped projects. I work in short cycles with a defined brief and a real deadline, and I would rather decline than take something I cannot finish properly.',
  },
  {
    q: 'What is your stack?',
    a: 'Python and TypeScript. FastAPI, Next.js, Postgres with pgvector, LangGraph for orchestration, TensorRT and CUDA for edge inference. The full evidence-linked map is on the stack page.',
  },
  {
    q: 'Where are you based?',
    a: 'Ahmedabad, India, UTC+5:30. I work with distributed teams and expect overlap with European and North American hours.',
  },
] as const

export default function ContactPage() {
  const now = getNow()

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]}
      />

      <div className="shell">
        <PageHeader
          index="08"
          title="Contact"
          lede={now.availability}
          meta={[
            { k: 'Email', v: IDENTITY.email },
            { k: 'Location', v: IDENTITY.location },
            { k: 'Timezone', v: 'UTC+05:30' },
            { k: 'Résumé', v: 'PDF, two versions' },
          ]}
        />

        <div className={s.grid}>
          <div className={s.primary}>
            <p className="mono-sm faint">The fastest route</p>
            <a href={`mailto:${IDENTITY.email}`} className={s.email}>
              {IDENTITY.email}
            </a>
            <p className={s.emailNote}>
              If you are writing about a specific system, a link to the thing you
              want to discuss is worth more than a paragraph of context. I will
              have read the case study.
            </p>

            <div className={s.ctas}>
              <a href={IDENTITY.resume} className={s.ctaPrimary} target="_blank" rel="noreferrer noopener">
                Résumé — CV (PDF)
              </a>
              <a href={IDENTITY.resumeAlt} className={s.ctaGhost} target="_blank" rel="noreferrer noopener">
                Résumé — AI/ML variant (PDF)
              </a>
            </div>

            <dl className={s.facts}>
              <div>
                <dt className="mono-sm">Degree</dt>
                <dd>
                  {EDUCATION.degree}, {EDUCATION.school}
                  <br />
                  <span className="faint">{EDUCATION.period}</span>
                </dd>
              </div>
              <div>
                <dt className="mono-sm">Open source</dt>
                <dd>
                  {OSS_STATS.mergedPRs} merged PRs across {OSS_STATS.projects} external
                  repositories
                  <br />
                  <span className="faint">Including {OSS_STATS.orgs.join(', ')}</span>
                </dd>
              </div>
              <div>
                <dt className="mono-sm">Hackathons</dt>
                <dd>
                  {HACKATHONS.filter((h) => h.placement === 'Finalist').length} finals
                  across {HACKATHONS.length} entries
                  <br />
                  <span className="faint">Autonomous Hacks 2026, Odoo x Adani 2026</span>
                </dd>
              </div>
            </dl>
          </div>

          <div className={s.side}>
            <section className={s.block}>
              <h2 className="mono-sm faint">Elsewhere</h2>
              <ul className={s.socials}>
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={s.social}
                    >
                      <span className={s.socialLabel}>{social.label}</span>
                      <span className={s.socialHandle}>{social.handle}</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2 10 10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.2" fill="none" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className={s.block}>
              <h2 className="mono-sm faint">Before you write</h2>
              <dl className={s.faq}>
                {FAQ.map((f) => (
                  <div key={f.q} className={s.faqItem}>
                    <dt>{f.q}</dt>
                    <dd>{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>

        <p className={s.foot}>
          Looking for the systems first?{' '}
          <Link href="/work">Thirteen case studies</Link> and{' '}
          <Link href="/lab">ten lab entries</Link> are the fastest way to judge
          whether this is the kind of work I do.
        </p>
      </div>
    </>
  )
}
