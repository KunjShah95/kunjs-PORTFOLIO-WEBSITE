import { EXPERIENCE } from '../data/portfolio'
import { SEO } from '../components/SEO'
import { SITE_URL } from '../lib/site'
import { PageHeader } from '../components/ui/PageHeader'

export function ExperiencePage() {
  return (
    <>
      <SEO title="Experience — Kunj Shah" description="Work history of Kunj Shah — AI automation, open-source contributions, and product engineering." url={`${SITE_URL}/experience`} />
      <PageHeader kicker="Experience" title="Work history, newest to oldest." lede="Roles, open-source work, and the occasional focused freelance sprint." center />
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 md:py-24">
        <div className="relative border-l border-rule/15 pl-8 sm:pl-12">
          {EXPERIENCE.map((experience, index) => <article key={`${experience.company}-${experience.period}`} className="relative pb-12 last:pb-0"><span className={`absolute -left-[2.65rem] top-1 h-3 w-3 rounded-full border-2 border-paper sm:-left-[3.35rem] ${index === 0 ? 'bg-accent shadow-[0_0_0_5px_rgb(var(--accent)/0.12)]' : 'bg-ink-quaternary'}`} /><div className="flex flex-wrap items-start justify-between gap-3"><div><span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">{experience.period}</span><h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink-primary">{experience.role.replace(/_/g, ' ')}</h2><p className="mt-1 font-mono text-sm text-ink-secondary">@ {experience.company.replace(/_/g, ' ')}</p></div></div><p className="mt-5 max-w-[62ch] text-sm leading-6 text-ink-secondary">{experience.description}</p>{experience.skills?.length > 0 && <p className="mt-4 font-mono text-[10px] uppercase leading-5 tracking-[0.08em] text-ink-tertiary">{experience.skills.map((skill) => skill.replace(/_/g, ' ')).join(' · ')}</p>}</article>)}
        </div>
      </section>
    </>
  )
}
