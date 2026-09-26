import type { Metadata } from 'next'

import { NoteIndex } from '@/components/writing/NoteIndex'
import { PageHeader, Marker } from '@/components/ui/Primitives'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd, itemListLd, pageMeta } from '@/lib/seo'
import { getNotes } from '@/lib/content'
import { IDENTITY } from '@/lib/site'
import s from './writing.module.css'

export const metadata: Metadata = pageMeta({
  title: 'Writing — Field Notes',
  description:
    'Field Notes by Kunj Shah on agentic systems, retrieval, edge computer vision, AI fairness, and the engineering decisions behind shipped work.',
  path: '/writing',
})

const CATEGORY_ORDER = ['SYSTEMS', 'AI', 'ENGINEERING', 'EXPERIMENTS', 'PRODUCT'] as const

export default function WritingPage() {
  const notes = getNotes()
  const byCategory = CATEGORY_ORDER.map((c) => ({
    category: c,
    count: notes.filter((n) => n.category === c).length,
  })).filter((c) => c.count > 0)

  return (
    <div data-surface="paper" className={s.paper}>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Writing', path: '/writing' },
          ]),
          itemListLd('Field Notes', notes.map((n) => ({
            name: n.title,
            path: `/writing/${n.slug}`,
            description: n.excerpt,
          }))),
        ]}
      />

      <div className="shell">
        <PageHeader
          index="03"
          title="Writing"
          lede="Field Notes. Written down while the decision is still fresh, which mostly means: while I still remember being wrong."
          meta={[
            { k: 'Notes', v: `${notes.length}` },
            { k: 'Categories', v: `${byCategory.length}` },
            { k: 'Also on', v: 'Peerlist and Medium' },
            { k: 'Feed', v: 'RSS' },
          ]}
        />

        <div className={s.toolbar}>
          <ul className={s.cats}>
            {byCategory.map((c) => (
              <li key={c.category}>
                <span className={s.cat}>{c.category}</span>
                <span className={s.catCount}>{c.count}</span>
              </li>
            ))}
          </ul>
          <a href="/rss.xml" className={s.feed}>
            RSS ↗
          </a>
        </div>

        <div className={s.list}>
          <NoteIndex notes={notes} />
        </div>

        <footer className={s.colophon}>
          <p className="mono-sm faint">Colophon</p>
          <p>
            These notes are also published on{' '}
            <a href={IDENTITY.peerlist} target="_blank" rel="noreferrer noopener">
              Peerlist
            </a>{' '}
            and{' '}
            <a href={IDENTITY.medium} target="_blank" rel="noreferrer noopener">
              Medium
            </a>
            . Corrections are welcome and appreciated —{' '}
            <a href={`mailto:${IDENTITY.email}`}>email me</a>.
          </p>
        </footer>
      </div>
    </div>
  )
}
