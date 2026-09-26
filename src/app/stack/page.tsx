import type { Metadata } from 'next'
import Link from 'next/link'

import { TechMap } from '@/components/stack/TechMap'
import { PageHeader, Marker } from '@/components/ui/Primitives'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd, pageMeta } from '@/lib/seo'
import { buildStackGroups, stackStats } from '@/lib/stack'
import s from './stack.module.css'

export const metadata: Metadata = pageMeta({
  title: 'Stack — the technology map',
  description:
    'An evidence-linked technology map. Every technology Kunj Shah lists is connected to the shipped system or lab experiment it was used in.',
  path: '/stack',
})

export default function StackPage() {
  const groups = buildStackGroups()
  const stats = stackStats()

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Stack', path: '/stack' },
        ])}
      />

      <div className="shell">
        <PageHeader
          index="05"
          title="Stack"
          lede="Not a skill grid. Every node below exists because a shipped project or a lab entry declares it — select one and it tells you which system it was used in."
          meta={[
            { k: 'Technologies in shipped work', v: `${stats.technologies}` },
            { k: 'Including lab-only', v: `${stats.all}` },
            { k: 'Systems', v: `${stats.projects}` },
            { k: 'Proficiency claims', v: 'None' },
          ]}
        />

        <section className={s.manifesto}>
          <Marker index="A" label="How to read this" />
          <p className={s.manifestoBody}>
            The map is generated from the project record. A technology appears
            because it is in a shipped system's stack, or in a lab experiment
            that produced something. There is no proficiency rating, no
            percentage, and no self-assessment — because I have no honest way to
            measure those, and a number that cannot be checked is worse than no
            number.
          </p>
        </section>

        <div className={s.map}>
          <TechMap groups={groups} />
        </div>

        <section className={s.foot}>
          <p className="mono-sm faint">Adjacent</p>
          <ul className={s.footList}>
            <li>
              <Link href="/work">The systems these technologies ship in →</Link>
            </li>
            <li>
              <Link href="/lab">The experiments they came from →</Link>
            </li>
            <li>
              <Link href="/open-source">Where the code is →</Link>
            </li>
          </ul>
        </section>
      </div>
    </>
  )
}
