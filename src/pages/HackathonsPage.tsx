import { HACKATHONS } from '../data/portfolio'
import { SEO } from '../components/SEO'
import { SITE_URL } from '../lib/site'
import { PageHeader } from '../components/ui/PageHeader'

export function HackathonsPage() {
  return (
    <>
      <SEO title="Hackathons — Kunj Shah" description={`${HACKATHONS.length} hackathons by Kunj Shah — finalist at Autonomous Hacks, Odoo Adani, and SIH.`} url={`${SITE_URL}/hackathons`} />
      <PageHeader kicker="Hackathons" title={`${HACKATHONS.length} sprints, built under a deadline.`} lede="Short bursts of building with small teams. Not every sprint wins, but every one teaches me something." center />
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
        <div className="grid gap-4 md:grid-cols-2">
          {HACKATHONS.map((hackathon, index) => <article key={`${hackathon.year}-${hackathon.name}`} className="flex min-h-64 flex-col justify-between border border-rule/10 bg-elevated p-6 transition-colors hover:border-accent/30 sm:p-8"><div><div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.1em] text-ink-tertiary"><span>{hackathon.year}</span><span>0{index + 1}</span></div><h2 className="mt-7 font-display text-2xl font-semibold tracking-tight text-ink-primary">{hackathon.title ?? hackathon.name}</h2><div className="mt-2 flex flex-wrap gap-3 font-mono text-xs text-ink-secondary">{hackathon.event && <span>{hackathon.event}</span>}{hackathon.placement && <span className="text-accent">{hackathon.placement}</span>}{hackathon.team && <span>Team of {hackathon.team}</span>}</div></div><p className="mt-8 max-w-[52ch] text-sm leading-6 text-ink-secondary">{hackathon.description ?? hackathon.summary}</p></article>)}
        </div>
      </section>
    </>
  )
}
