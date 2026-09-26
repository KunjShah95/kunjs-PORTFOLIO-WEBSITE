import type { Metadata } from 'next'

import { ProjectIndex } from '@/components/work/ProjectIndex'
import { PageHeader, Marker } from '@/components/ui/Primitives'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd, itemListLd, pageMeta } from '@/lib/seo'
import { getProjects } from '@/lib/content'
import s from './work.module.css'

export const metadata: Metadata = pageMeta({
  title: 'Work',
  description:
    'Shipped AI systems by Kunj Shah, with full case studies: retrieval pipelines, agent orchestration, edge computer vision, model routing and AI fairness auditing.',
  path: '/work',
})

export default function WorkPage() {
  const projects = getProjects()
  const byCategory = projects.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1
    return acc
  }, {})

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
          ]),
          itemListLd('Work — shipped systems', projects.map((p) => ({
            name: p.title,
            path: `/work/${p.slug}`,
            description: p.summary,
          }))),
        ]}
      />

      <div className="shell">
        <PageHeader
          index="01"
          title="Work"
          lede="Shipped systems, written up properly. Each entry is a full case study — the problem, the architecture, the tradeoffs, and what actually broke on the way."
          meta={[
            { k: 'Systems', v: `${projects.length}` },
            { k: 'Categories', v: `${Object.keys(byCategory).length}` },
            { k: 'Case studies', v: `${projects.length}` },
            { k: 'Live deployments', v: `${projects.filter((p) => p.demo).length}` },
          ]}
        />
      </div>

      <div className={`shell ${s.index}`}>
        <ProjectIndex projects={projects} />

        <section className={s.legend} aria-label="Technology coverage">
          <h2 className="mono-sm faint">Categories</h2>
          <ul className={s.legendList}>
            {Object.entries(byCategory)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, count]) => (
                <li key={cat}>
                  <span className={s.legendCat}>{cat}</span>
                  <span className={s.legendCount}>{count}</span>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </>
  )
}
