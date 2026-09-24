import { SEO } from '../components/SEO'
import { SITE_URL } from '../lib/site'
import { PageHeader } from '../components/ui/PageHeader'
import { SKILL_GROUPS } from '../data/portfolio'

export function SkillsPage() {
  return (
    <>
      <SEO title="Skills — Kunj Shah" description="The tools Kunj Shah ships with — React, FastAPI, LangChain, PyTorch, Docker, and cloud infrastructure." url={`${SITE_URL}/skills`} />
      <PageHeader kicker="Skills" title="Tools I reach for, grouped by what they do." lede="Not a comprehensive list — just the tools I use often enough to have opinions about." center />
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 md:py-24">
        <div className="grid gap-4 sm:grid-cols-2">
          {SKILL_GROUPS.map((group, index) => {
            const Icon = group.icon
            return <article key={group.category} className="flex min-h-64 flex-col justify-between border border-rule/10 bg-elevated p-6 transition-colors hover:border-accent/30 sm:p-8"><div><div className="flex items-center justify-between"><span className="font-mono text-[10px] text-ink-tertiary">0{index + 1}</span>{Icon && <Icon className="h-4 w-4 text-ink-tertiary" strokeWidth={1.5} aria-hidden="true" />}</div><h2 className="mt-7 font-display text-xl font-semibold text-ink-primary">{group.category}</h2><p className="mt-3 max-w-[42ch] text-sm leading-6 text-ink-secondary">{group.description}</p></div><div className="mt-8 border-t border-rule/10 pt-5"><span className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-tertiary">Stack</span><p className="mt-2 font-mono text-[10px] leading-5 text-ink-secondary">{group.skills.join(' · ')}</p></div></article>
          })}
        </div>
      </section>
    </>
  )
}
