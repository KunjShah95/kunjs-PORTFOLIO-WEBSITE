import type { Metadata } from 'next'

import { LabList } from '@/components/lab/LabList'
import { PageHeader, Marker } from '@/components/ui/Primitives'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd, itemListLd, pageMeta } from '@/lib/seo'
import { getLab, getProjects } from '@/lib/content'
import s from './lab.module.css'

export const metadata: Metadata = pageMeta({
  title: 'Lab',
  description:
    'Experiments and unfinished research by Kunj Shah: local inference, retrieval precision, model routing, vector databases, transformers, quantisation, agent orchestration and MCP.',
  path: '/lab',
})

export default function LabPage() {
  const lab = getLab()
  const projects = getProjects()
  const shipped = lab.filter((l) => l.state === 'shipped')
  const open = lab.filter((l) => l.state === 'active' || l.state === 'paused')

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Lab', path: '/lab' },
          ]),
          itemListLd('Lab experiments', lab.map((l) => ({
            name: l.title,
            path: `/lab/${l.slug}`,
            description: l.hypothesis,
          }))),
        ]}
      />

      <div className="shell">
        <PageHeader
          index="02"
          title="Lab"
          lede="Where the work is not finished. Each entry states a hypothesis, the technologies involved, and what actually happened — including the experiments that changed my mind."
          meta={[
            { k: 'Entries', v: `${lab.length}` },
            { k: 'Currently active', v: `${lab.filter((l) => l.state === 'active').length}` },
            { k: 'Shipped into work', v: `${shipped.length}` },
            { k: 'Research log', v: 'Since 2025' },
          ]}
        />
      </div>

      <div className={`shell ${s.body}`}>
        <section className={s.manifesto} aria-label="What belongs in the lab">
          <div className={s.manifestoCol}>
            <Marker index="A" label="Shipped" />
            <p>
              A system that runs, that people use, and that has a case study with
              the numbers in it. That is <strong>Work</strong> — and it has its
              own section.
            </p>
          </div>
          <div className={s.manifestoCol} data-kind="lab">
            <Marker index="B" label="Exploring" />
            <p>
              A question with a stated hypothesis and no guarantee of an answer.
              If it works it graduates to Work. If it does not, it stays here
              with the result written down.
            </p>
          </div>
          <p className={s.honesty}>
            Every lab entry links to the artefact it produced. An experiment
            without a repository, a paper or a shipped feature is not listed.
          </p>
        </section>

        <LabList entries={lab} />

        <section className={s.open} aria-labelledby="open-heading">
          <h2 className="mono-sm faint" id="open-heading">
            Still open — {open.length} entries
          </h2>
          <ul className={s.openList}>
            {open.map((l) => (
              <li key={l.slug} className={s.openItem}>
                <span className={s.openNum}>LAB {l.number}</span>
                <span className={s.openTitle}>{l.title}</span>
                <span className={s.openResult}>{l.result}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.graduate} aria-labelledby="graduate-heading">
          <h2 className="mono-sm faint" id="graduate-heading">
            Graduated into shipped work
          </h2>
          <ul className={s.graduateList}>
            {shipped.flatMap((l) =>
              (l.graduatedInto ?? []).map((slug) => {
                const project = projects.find((x) => x.slug === slug)
                if (!project) return null
                return (
                  <li key={`${l.slug}-${slug}`} className={s.graduateItem}>
                    <span className={s.graduateLab}>
                      LAB {l.number} · {l.title}
                    </span>
                    <span className={s.graduateArrow} aria-hidden="true">
                      →
                    </span>
                    <span className={s.graduateProject}>
                      <a href={`/work/${slug}`}>{project.title}</a>
                      <span className="faint"> — {project.category}</span>
                    </span>
                  </li>
                )
              }),
            )}
          </ul>
        </section>
      </div>
    </>
  )
}
