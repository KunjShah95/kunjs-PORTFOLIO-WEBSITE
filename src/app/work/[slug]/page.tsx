import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

import { mdxComponents } from '@/components/mdx/Mdx'
import { ProjectMark } from '@/components/work/ProjectMark'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbLd, pageMeta, projectLd } from '@/lib/seo'
import { getProject, getProjectSlugs, getProjects } from '@/lib/content'
import { IDENTITY } from '@/lib/site'
import s from './case.module.css'

const SECTIONS = [
  { n: '01', id: 'overview', title: 'Overview' },
  { n: '02', id: 'system', title: 'System' },
  { n: '03', id: 'engineering', title: 'Engineering' },
  { n: '04', id: 'result', title: 'Result' },
  { n: '05', id: 'links', title: 'Links' },
]

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = getProject(slug)
  if (!entry) return {}
  const p = entry.meta
  return pageMeta({
    title: `${p.title} — case study`,
    description: p.summary,
    path: `/work/${p.slug}`,
    type: 'article',
    publishedTime: `${p.year}-01-01`,
    tags: p.tech,
  })
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = getProject(slug)
  if (!entry) notFound()

  const p = entry.meta
  const projects = getProjects()
  const related = p.related
    .map((r) => projects.find((x) => x.slug === r))
    .filter((x): x is (typeof projects)[number] => Boolean(x))

  const prev = projects[p.order - 2]
  const next = projects[p.order]

  return (
    <>
      <JsonLd
        data={[
          projectLd({
            slug: p.slug,
            title: p.title,
            summary: p.summary,
            year: p.year,
            tech: p.tech,
            github: p.github,
            demo: p.demo,
            category: p.category,
          }),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
            { name: p.title, path: `/work/${p.slug}` },
          ]),
        ]}
      />

      {/* ------------------------------------------------------------- head */}
      <header className={s.head}>
        <div className={`shell ${s.headGrid}`}>
          <div className={s.headMark} aria-hidden="true">
            <ProjectMark seed={p.slug} className={s.headMarkSvg} accent={0.5} />
          </div>

          <div className={s.headMain}>
            <nav className={s.crumbs} aria-label="Breadcrumb">
              <Link href="/work">Work</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{p.title}</span>
            </nav>

            <p className={s.headMeta}>
              <span className={s.headNum}>{p.number}</span>
              <span>{p.category}</span>
              <span aria-hidden="true">·</span>
              <span>{p.year}</span>
              <span aria-hidden="true">·</span>
              <span className={s.headStatus}>{p.status}</span>
            </p>

            <h1 className={s.title}>{p.title}</h1>
            <p className={s.summary}>{p.summary}</p>

            <ul className={s.tech} aria-label="Technologies used">
              {p.tech.map((t) => (
                <li key={t} className={s.techItem}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {p.claims.length ? (
          <div className={s.claimsWrap}>
            <div className={`shell ${s.claims}`}>
              {p.claims.map((c) => (
                <div className={s.claim} key={c.label}>
                  <span className={s.claimLabel}>{c.label}</span>
                  <span className={s.claimValue}>{c.value}</span>
                  {c.note ? <span className={s.claimNote}>{c.note}</span> : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      {/* ------------------------------------------------------------- body */}
      <div className={`shell ${s.layout}`}>
        <aside className={s.rail}>
          <nav className={s.sections} aria-label="Case study sections">
            <p className="mono-sm faint">Sections</p>
            <ol>
              {SECTIONS.map((sec) => (
                <li key={sec.id}>
                  <a href={`#${sec.id}`} className={s.sectionLink}>
                    <span className={s.sectionN}>{sec.n}</span>
                    <span>{sec.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className={s.body}>
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

          {/* -------------------------------------------------------- 05 */}
          <section className={s.section} id="links" aria-labelledby="links-heading">
            <header className={s.sectionHead}>
              <span className={s.sectionIndex}>05</span>
              <div className={s.sectionTitles}>
                <h2 className={s.sectionTitle} id="links-heading">
                  Links
                </h2>
                <p className={s.sectionKicker}>GitHub · Demo · Related work</p>
              </div>
            </header>

            <div className={s.linkGrid}>
              <a
                href={p.github}
                className={s.linkCard}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span className="mono-sm faint">Source</span>
                <span className={s.linkTitle}>GitHub</span>
                <span className={s.linkNote}>{p.github.replace('https://', '')}</span>
              </a>

              {p.demo ? (
                <a
                  href={p.demo}
                  className={s.linkCard}
                  data-accent="true"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className="mono-sm faint">Deployment</span>
                  <span className={s.linkTitle}>Live demo</span>
                  <span className={s.linkNote}>{p.demo.replace('https://', '')}</span>
                </a>
              ) : null}

              {p.peerlist ? (
                <a
                  href={p.peerlist}
                  className={s.linkCard}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className="mono-sm faint">Write-up</span>
                  <span className={s.linkTitle}>Peerlist</span>
                  <span className={s.linkNote}>Product notes</span>
                </a>
              ) : null}

              <a href={`mailto:${IDENTITY.email}`} className={s.linkCard}>
                <span className="mono-sm faint">Question</span>
                <span className={s.linkTitle}>Ask about this</span>
                <span className={s.linkNote}>{IDENTITY.email}</span>
              </a>
            </div>

            {related.length ? (
              <div className={s.related}>
                <p className="mono-sm faint">Related work</p>
                <ul className={s.relatedList}>
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/work/${r.slug}`} className={s.relatedLink}>
                        <span className={s.relatedNum}>{r.number}</span>
                        <span className={s.relatedTitle}>{r.title}</span>
                        <span className={s.relatedCat}>{r.category}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>

          <nav className={s.pager} aria-label="Case study navigation">
            {prev ? (
              <Link href={`/work/${prev.slug}`} className={s.pagerLink} data-dir="prev">
                <span className="mono-sm faint">Previous</span>
                <span className={s.pagerTitle}>{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/work/${next.slug}`} className={s.pagerLink} data-dir="next">
                <span className="mono-sm faint">Next</span>
                <span className={s.pagerTitle}>{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </article>
      </div>
    </>
  )
}
