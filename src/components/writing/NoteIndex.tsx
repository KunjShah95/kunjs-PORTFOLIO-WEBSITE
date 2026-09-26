import Link from 'next/link'

import type { NoteMeta } from '@/lib/types'
import s from './NoteIndex.module.css'

/** Field Notes. An editorial list, not a card grid: date and reading time
 *  in the margin, the title set large, the category as a small tag. */
export function NoteIndex({ notes }: { notes: NoteMeta[] }) {
  return (
    <ol className={s.index}>
      {notes.map((n, i) => (
        <li key={n.slug} className={s.row}>
          <Link href={`/writing/${n.slug}`} className={s.link}>
            <span className={s.date}>
              <time dateTime={n.date}>{n.dateLabel}</time>
            </span>

            <span className={s.body}>
              <span className={s.catRow}>
                <span className={s.cat}>{n.category}</span>
                {n.projectSlug ? <span className={s.flag}>Case study</span> : null}
                {n.tags.includes('CASE STUDY') && !n.projectSlug ? (
                  <span className={s.flag}>Case study</span>
                ) : null}
              </span>
              <span className={s.title}>{n.title}</span>
              <span className={s.excerpt}>{n.excerpt}</span>
            </span>

            <span className={s.meta}>
              <span className={s.read}>{n.readTime} min</span>
              <span className={s.idx} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  )
}
