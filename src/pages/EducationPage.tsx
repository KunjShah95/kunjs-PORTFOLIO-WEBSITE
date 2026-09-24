import { EDUCATION } from '../data/portfolio'
import { SEO } from '../components/SEO'
import { SITE_URL } from '../lib/site'
import { PageHeader } from '../components/ui/PageHeader'

export function EducationPage() {
  return (
    <>
      <SEO title="Education — Kunj Shah" description="Educational background of Kunj Shah — B.Tech Computer Science at Indus University, Ahmedabad." url={`${SITE_URL}/education`} />
      <PageHeader kicker="Education" title="Where I studied." lede="The formal foundation behind the way I approach engineering, AI, and product work." center />
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 md:py-24">
        <div className="grid gap-8">{EDUCATION.map((education) => <article key={education.id} className="grid gap-6 border border-rule/10 bg-elevated p-6 sm:grid-cols-[1fr_auto] sm:p-8"><div><span className="kicker">{education.period}</span><h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-primary">{education.degree}</h2><p className="mt-2 font-mono text-sm text-ink-secondary">{education.school}</p><p className="mt-6 max-w-[58ch] text-sm leading-6 text-ink-secondary">{education.summary}</p></div><dl className="grid content-start gap-5 border-t border-rule/10 pt-5 text-sm sm:min-w-48 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0"><div><dt className="kicker">Specialization</dt><dd className="mt-1 text-ink-primary">{education.specialization}</dd></div><div><dt className="kicker">Location</dt><dd className="mt-1 text-ink-primary">{education.location}</dd></div></dl></article>)}</div>
      </section>
    </>
  )
}
