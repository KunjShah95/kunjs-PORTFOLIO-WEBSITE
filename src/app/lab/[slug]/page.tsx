import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

import { mdxComponents } from '@/components/mdx/Mdx'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd, pageMeta } from '@/lib/seo'
import { getLabEntry, getLabSlugs, getProjects } from '@/lib/content'
import s from './entry.module.css'

const STATE_LABEL = {
  active: 'Active',
  paused: 'Paused',
  archived: 'Archived',
  shipped: 'Shipped',
} as const

export function generateStaticParams() {
  return getLabSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = getLabEntry(slug)
  if (!entry) return {}
  return pageMeta({
    title: `LAB ${entry.meta.number} — ${entry.meta.title}`,
    description: entry.meta.hypothesis,
    path: `/lab/${entry.meta.slug}`,
  })
}

export default async function LabEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getLabEntry(slug)
  if (!entry) notFound()

  const l = entry.meta
  const projects = getProjects()
  const graduated = (l.graduatedInto ?? [])
    .map((g) => projects.find((x) => x.slug === g))
    .filter((x): x is (typeof projects)[number] => Boolean(x))

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Lab', path: '/lab' },
          { name: l.title, path: `/lab/${l.slug}` },
        ])}
      />

      <div className="surface-blueprint">
        <header className={`shell ${s.head}`}>
          <nav className={s.crumbs} aria-label="Breadcrumb">
            <Link href="/lab">Lab</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{l.number}</span>
          </nav>

          <p className={s.eyebrow}>
            <span className={s.lamp} data-state={l.state} aria-hidden="true">
              <i />
            </span>
            <span>LAB {l.number}</span>
            <span aria-hidden="true">·</span>
            <span>{STATE_LABEL[l.state]}</span>
            <span aria-hidden="true">·</span>
            <span>{l.year}</span>
          </p>

          <h1 className={s.title}>{l.title}</h1>

          <p className={s.hypothesis}>
            <span className="mono-sm faint">Hypothesis</span>
            {l.hypothesis}
          </p>

          <dl className={s.meta}>
            <div>
              <dt className="mono-sm">Status note</dt>
              <dd>{l.stateNote}</dd>
            </div>
            <div>
              <dt className="mono-sm">Result</dt>
              <dd>{l.result}</dd>
            </div>
          </dl>

          <div className={s.tech}>
            {l.tech.map((t) => (
              <span key={t} className={s.techItem}>
                {t}
              </span>
            ))}
          </div>

          <div className={s.actions}>
            {l.repo ? (
              <a
                href={l.repo}
                className={s.actionPrimary}
                target="_blank"
                rel="noreferrer noopener"
              >
                Open the artefact ↗
              </a>
            ) : null}
            <Link href="/lab" className={s.actionGhost}>
              ← All lab entries
            </Link>
          </div>
        </header>
      </div>

      <div className={`shell ${s.body}`}>
        <article className="prose">
          <MDXRemote
            source={entry.body}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </article>

        {graduated.length ? (
          <aside className={s.graduate} aria-label="Graduated into shipped work">
            <p className="mono-sm faint">This experiment shipped</p>
            <ul className={s.graduateList}>
              {graduated.map((g) => (
                <li key={g.slug}>
                  <Link href={`/work/${g.slug}`} className={s.graduateLink}>
                    <span className={s.graduateNum}>{g.number}</span>
                    <span className={s.graduateTitle}>{g.title}</span>
                    <span className={s.graduateCat}>{g.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </>
  )
}
