import type { Metadata } from 'next'

import { PageHeader, Marker } from '@/components/ui/Primitives'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd, pageMeta } from '@/lib/seo'
import { CONTRIBUTIONS, OSS_STATS } from '@/lib/site'
import s from './open-source.module.css'

export const metadata: Metadata = pageMeta({
  title: 'Open Source',
  description:
    'Kunj Shah’s open-source record: 44 merged pull requests across 13 external repositories, including OWASP’s agent-security regression harness, Microsoft’s AI-Engineering-Coach and Ollama.',
  path: '/open-source',
})

export default function OpenSourcePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Open Source', path: '/open-source' },
        ])}
      />

      <div className="shell">
        <PageHeader
          index="07"
          title="Open Source"
          lede="Mostly maintenance and test work, mostly on other people's projects. Counts are what the public GitHub activity shows — merged, reviewed, or filed."
          meta={[
            { k: 'Merged PRs (external)', v: `${OSS_STATS.mergedPRs}` },
            { k: 'External repos', v: `${OSS_STATS.projects}` },
            { k: 'Issues opened', v: `${OSS_STATS.openedIssues}` },
            { k: 'PRs reviewed', v: `${OSS_STATS.codeReviews}` },
          ]}
        />

        <section className={s.stats}>
          {[
            { value: OSS_STATS.mergedPRs, label: 'Merged PRs', note: 'In repositories I do not own' },
            { value: OSS_STATS.projects, label: 'External repos', note: 'Distinct projects contributed to' },
            { value: OSS_STATS.openedIssues, label: 'Issues opened', note: 'Including reports and proposals' },
            { value: OSS_STATS.codeReviews, label: 'PRs reviewed', note: 'For other contributors' },
          ].map((stat) => (
            <div className={s.stat} key={stat.label}>
              <span className={s.statValue}>{stat.value}</span>
              <span className={s.statLabel}>{stat.label}</span>
              <span className={s.statNote}>{stat.note}</span>
            </div>
          ))}
        </section>

        <section className={s.list} aria-labelledby="contrib-heading">
          <Marker index="A" label="Selected contributions" aside="One highlight per repository" />
          <h2 className="visually-hidden" id="contrib-heading">
            Selected contributions
          </h2>
          <ul className={s.items}>
            {CONTRIBUTIONS.map((c) => (
              <li key={c.url} className={s.item}>
                <a
                  href={c.url}
                  className={s.itemLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-notable={c.notable || undefined}
                >
                  <span className={s.itemOrg}>{c.label}</span>
                  <span className={s.itemTitle}>{c.title}</span>
                  <span className={s.itemMeta}>
                    <span className={s.itemKind} data-kind={c.kind}>
                      {c.kind}
                    </span>
                    <span className={s.itemTag}>{c.tag}</span>
                  </span>
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M2 12 12 2M5 2h7v7" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.own}>
          <Marker index="B" label="Projects I maintain" />
          <p className={s.ownBody}>
            Beyond the contributions above, several of my own projects are open
            source and documented enough that someone else could pick them up.
            Each one has a case study with the architecture written out.
          </p>
        </section>
      </div>
    </>
  )
}
