import type { Metadata } from 'next'

import { PageHeader, Marker } from '@/components/ui/Primitives'
import { Timeline } from '@/components/site/Timeline'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd, pageMeta } from '@/lib/seo'
import { EXPERIENCE, HACKATHONS, OSS_STATS } from '@/lib/site'
import s from './timeline.module.css'

export const metadata: Metadata = pageMeta({
  title: 'Timeline',
  description:
    'The progression of Kunj Shah’s work: B.Tech in Computer Science at Indus University, hackathon finals, an automation internship at PHAZE_AI, a full-stack AI/ML internship at Ideaboat, and continuous open-source contribution.',
  path: '/timeline',
})

export default function TimelinePage() {
  const hackathonYears = Array.from(new Set(HACKATHONS.map((h) => h.year))).sort()

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Timeline', path: '/timeline' },
        ])}
      />

      <div className="shell">
        <PageHeader
          index="06"
          title="Timeline"
          lede="Not a list of jobs. This is the order things happened in, including the years where most of the work was shipping systems nobody had asked for yet."
          meta={[
            { k: 'Degree', v: 'B.Tech CS, 2023 — 2027' },
            { k: 'Roles', v: '2' },
            { k: 'Hackathon years', v: `${hackathonYears[0]} — ${hackathonYears[hackathonYears.length - 1]}` },
            { k: 'Merged PRs', v: `${OSS_STATS.mergedPRs}` },
          ]}
        />

        <section className={s.timeline}>
          <Marker index="A" label="Progression" aside="Select an entry" />
          <Timeline />
        </section>

        <section className={s.hacks} aria-labelledby="hacks-heading">
          <h2 className="mono-sm faint" id="hacks-heading">
            Hackathons — {HACKATHONS.length} entries
          </h2>
          <ul className={s.hackList}>
            {HACKATHONS.map((h) => (
              <li key={h.event} className={s.hack}>
                <span className={s.hackYear}>{h.year}</span>
                <span className={s.hackEvent}>{h.event}</span>
                <span className={s.hackPlace} data-finalist={h.placement === 'Finalist' || undefined}>
                  {h.placement}
                </span>
                <span className={s.hackNote}>{h.note}</span>
                <span className={s.hackTeam}>Team of {h.team}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  )
}
