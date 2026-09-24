import { Link } from 'react-router-dom'
import { BLOGS } from '../data/portfolio'
import { SEO } from '../components/SEO'
import { SITE_URL } from '../lib/site'
import { PageHeader } from '../components/ui/PageHeader'
import { Kicker } from '../components/ui/Kicker'

export function BlogsPage() {
  const sortedBlogs = [...BLOGS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const byYear = sortedBlogs.reduce((acc, blog) => {
    const year = blog.date?.match(/\d{4}/)?.[0] ?? 'Undated'
    ;(acc[year] ||= []).push(blog)
    return acc
  }, {} as Record<string, typeof BLOGS>)
  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a))

  return (
    <>
      <SEO title="Writing — Kunj Shah" description={`${BLOGS.length} essays on AI, agents, and shipping. Long-form notes from building production AI systems.`} url={`${SITE_URL}/blogs`} />
      <PageHeader kicker="Writing" title={`${BLOGS.length} essays on AI, agents, and shipping.`} lede="Long-form notes from building production systems. No newsletter and no schedule — published when there is something worth saying." center />
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 md:py-24">
        {years.map((year) => <section key={year} className="mb-16 last:mb-0"><div className="mb-5 flex items-center gap-4 border-b border-rule/10 pb-4"><span className="kicker">{year}</span><span className="font-mono text-sm text-ink-tertiary">{byYear[year].length} notes</span></div><div className="divide-y divide-rule/10 border-y border-rule/10">{byYear[year].map((blog) => <Link key={blog.id} to={`/blogs/${blog.slug}`} className="group grid gap-4 py-6 transition-colors hover:bg-sunken/40 sm:grid-cols-[9rem_1fr_4rem] sm:items-start sm:gap-6 sm:px-4"><div><Kicker>{blog.category}</Kicker><div className="mt-1 font-mono text-[10px] text-ink-tertiary">{blog.date}</div></div><div><h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary transition-colors group-hover:text-accent sm:text-2xl">{blog.title}</h2><p className="mt-2 max-w-[62ch] text-sm leading-6 text-ink-secondary">{blog.excerpt}</p></div><span className="font-mono text-[10px] text-ink-tertiary sm:text-right">{blog.readTime ?? 5} min</span></Link>)}</div></section>)}
      </section>
    </>
  )
}
