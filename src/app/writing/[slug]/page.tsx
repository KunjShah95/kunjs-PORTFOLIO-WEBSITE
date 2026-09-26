import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

import { mdxComponents } from '@/components/mdx/Mdx'
import { JsonLd } from '@/components/seo/JsonLd'
import { articleLd, breadcrumbLd, pageMeta } from '@/lib/seo'
import { getNote, getNoteSlugs, getNotes, getProjects } from '@/lib/content'
import s from './note.module.css'

export function generateStaticParams() {
  return getNoteSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) return {}
  const n = note.meta
  return pageMeta({
    title: n.title,
    description: n.excerpt,
    path: `/writing/${n.slug}`,
    type: 'article',
    publishedTime: n.date,
    tags: n.tags,
  })
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const note = getNote(slug)
  if (!note) notFound()

  const n = note.meta
  const all = getNotes()
  const idx = all.findIndex((x) => x.slug === n.slug)
  const newer = all[idx - 1]
  const older = all[idx + 1]

  const project = n.projectSlug
    ? getProjects().find((p) => p.slug === n.projectSlug)
    : undefined

  const wordCount = note.body.split(/\s+/).filter(Boolean).length

  return (
    <div data-surface="paper" className={s.paper}>
      <JsonLd
        data={[
          articleLd({
            slug: n.slug,
            title: n.title,
            excerpt: n.excerpt,
            date: n.date,
            category: n.category,
            tags: n.tags,
            wordCount,
          }),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Writing', path: '/writing' },
            { name: n.title, path: `/writing/${n.slug}` },
          ]),
        ]}
      />

      <article className={s.article}>
        <header className={s.head}>
          <nav className={s.crumbs} aria-label="Breadcrumb">
            <Link href="/writing">Writing</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{n.category}</span>
          </nav>

          <p className={s.meta}>
            <span className={s.cat}>{n.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={n.date}>{n.dateLabel}</time>
            <span aria-hidden="true">·</span>
            <span>{n.readTime} min read</span>
          </p>

          <h1 className={s.title}>{n.title}</h1>
          <p className={s.standfirst}>{n.excerpt}</p>

          <ul className={s.tags} aria-label="Tags">
            {n.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className={s.headRule} aria-hidden="true" />
        </header>

        <div className={s.layout}>
          <aside className={s.margin}>
            <p className="mono-sm faint">Filed under</p>
            <p className={s.marginCat}>{n.category}</p>
            <p className={s.marginDate}>
              <time dateTime={n.date}>{n.dateLabel}</time>
            </p>
            <p className={s.marginMeta}>
              {wordCount.toLocaleString('en-GB')} words
              <br />
              {n.readTime} min
            </p>
          </aside>

          <div className={s.proseWrap}>
            <div className="prose">
              <MDXRemote
                source={note.body}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </div>

            {project ? (
              <aside className={s.caseRef}>
                <p className="mono-sm faint">The full system breakdown</p>
                <Link href={`/work/${project.slug}`} className={s.caseLink}>
                  <span className={s.caseNum}>{project.number}</span>
                  <span className={s.caseTitle}>{project.title}</span>
                  <span className={s.caseMeta}>
                    {project.category} · {project.year}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M2 12 12 2M5 2h7v7" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  </svg>
                </Link>
              </aside>
            ) : null}

            <footer className={s.foot}>
              <p>
                If this was useful and you want to argue with it,{' '}
                <Link href="/contact">get in touch</Link>.
              </p>
            </footer>
          </div>
        </div>

        <nav className={s.pager} aria-label="More notes">
          {newer ? (
            <Link href={`/writing/${newer.slug}`} className={s.pagerLink} data-dir="prev">
              <span className="mono-sm faint">Newer</span>
              <span className={s.pagerTitle}>{newer.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {older ? (
            <Link href={`/writing/${older.slug}`} className={s.pagerLink} data-dir="next">
              <span className="mono-sm faint">Older</span>
              <span className={s.pagerTitle}>{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </div>
  )
}
