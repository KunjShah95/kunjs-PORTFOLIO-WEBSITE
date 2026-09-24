import { motion } from 'framer-motion'
import { ArrowUpRight, Github, MapPin, Sparkles } from 'lucide-react'
import { SEO } from '../components/SEO'
import { SITE_URL } from '../lib/site'
import { PageHeader } from '../components/ui/PageHeader'
import { SKILL_GROUPS, EXPERIENCE, IDENTITY } from '../data/portfolio'
import { useGitHubPRs } from '../hooks/useGitHubPRs'
import { CountUp } from '../components/effects'
import { PORTFOLIO_FAQ } from '../data/seo-faq'

const PRINCIPLES = [
  { num: '01', title: 'Ship to learn.', desc: 'A prototype in a notebook is a hypothesis. A deployed system with real users is a fact.' },
  { num: '02', title: 'Workflows > prompts.', desc: 'The right system architecture is most of the work. Prompt tuning is the last mile.' },
  { num: '03', title: 'Show the work.', desc: 'Code, traces, costs, and latency. If you cannot trace it, you do not understand it.' },
  { num: '04', title: 'Boring tech where it counts.', desc: 'Postgres over a new vector database. Clear boundaries over clever abstractions.' },
]

const REVEAL = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } }

function initials(company: string) {
  if (company === 'PHAZE_AI') return 'PA'
  if (company === 'Ideaboat') return 'IB'
  return 'OS'
}

export function AboutPage() {
  const { contributions, stats: liveStats } = useGitHubPRs()

  return (
    <>
      <SEO title="About Kunj Shah | AI Engineer & ML Specialist" description="A short biography, background context, and technical toolkit of Kunj Shah, an AI engineer shipping agents and ML pipelines." url={`${SITE_URL}/about`} faqItems={PORTFOLIO_FAQ} />
      <PageHeader kicker="About" title="A builder who keeps the system honest." lede="I work between model behavior and product reality — making AI systems useful, observable, and ready for someone else to operate." center />

      <section className="relative overflow-hidden border-b border-rule/10">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
          <motion.section {...REVEAL} className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="gradient-border dark-card overflow-hidden rounded-2xl p-2"><div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-sunken"><img src={IDENTITY.profile_photo} width="560" height="700" alt={`${IDENTITY.name}, AI engineer`} className="h-full w-full object-cover object-[center_18%] grayscale transition-all duration-700 hover:scale-[1.03] hover:grayscale-0" /><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" /><div className="absolute bottom-4 left-4 right-4"><span className="font-mono text-[9px] uppercase tracking-[0.1em] text-paper/70">Profile / 2026</span><p className="mt-1 font-display text-xl font-semibold text-paper">Kunj Shah</p><p className="font-mono text-[10px] text-accent">AI engineer · Ahmedabad</p></div></div></div>
            <div className="flex flex-col justify-between rounded-2xl border border-rule/10 bg-elevated p-6 sm:p-8"><div><span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">Currently open to focused work</span><h2 className="mt-7 max-w-[15ch] font-display text-3xl font-semibold leading-[0.98] tracking-[-0.05em] text-ink-primary sm:text-5xl">The best AI product is the one that survives its first real user.</h2><p className="mt-6 max-w-[60ch] text-base leading-7 text-ink-secondary">I&apos;m a fourth-year Computer Science student at Indus University. I build AI agents, web apps, APIs, and prototypes for founders and small teams who want to move from a rough idea to something they can actually use.</p><p className="mt-4 max-w-[60ch] text-sm leading-6 text-ink-tertiary">Four hackathon finals, two production systems, and a long list of things that broke before they worked. I write down the useful parts.</p></div><div className="mt-10 grid grid-cols-3 gap-3 border-t border-rule/10 pt-5"><div><MapPin className="mb-2 h-4 w-4 text-accent" /><span className="block font-mono text-[9px] uppercase tracking-[0.08em] text-ink-tertiary">Base</span><span className="mt-1 block text-xs text-ink-secondary">Ahmedabad, IN</span></div><div><Sparkles className="mb-2 h-4 w-4 text-accent" /><span className="block font-mono text-[9px] uppercase tracking-[0.08em] text-ink-tertiary">Focus</span><span className="mt-1 block text-xs text-ink-secondary">Agents &amp; edge AI</span></div><div><Github className="mb-2 h-4 w-4 text-accent" /><span className="block font-mono text-[9px] uppercase tracking-[0.08em] text-ink-tertiary">Open source</span><span className="mt-1 block text-xs text-ink-secondary">OWASP · Ollama</span></div></div></div>
          </motion.section>

          <motion.section {...REVEAL} className="mt-24" aria-labelledby="principles-heading">
            <div className="text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">operating principles</span>
              <h2 id="principles-heading" className="mt-6 font-display text-4xl font-semibold tracking-[-0.05em] text-ink-primary sm:text-5xl">
                Good systems leave a trail.
              </h2>
              <p className="mx-auto mt-4 max-w-[48ch] text-sm leading-6 text-ink-secondary">
                A few rules I use to keep the work honest when the model gets interesting.
              </p>
            </div>
            <ol className="mt-10 grid gap-3 sm:grid-cols-2">
              {PRINCIPLES.map((principle) => (
                <li key={principle.num} className="group rounded-2xl border border-rule/10 bg-elevated p-6 text-center transition-colors hover:border-accent/30 sm:p-7">
                  <span className="font-mono text-[10px] text-accent">{principle.num}</span>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-ink-primary">{principle.title}</h3>
                  <p className="mx-auto mt-3 max-w-[38ch] text-sm leading-6 text-ink-secondary">{principle.desc}</p>
                </li>
              ))}
            </ol>
          </motion.section>

          <motion.section {...REVEAL} className="mt-24 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]" aria-labelledby="now-heading"><div className="rounded-2xl border border-rule/10 bg-elevated p-6 sm:p-8"><span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">right now</span><h2 id="now-heading" className="mt-7 font-display text-3xl font-semibold tracking-[-0.05em] text-ink-primary">Building the thing that makes the next build easier.</h2></div><div className="rounded-2xl border border-accent/20 bg-accent/[0.06] p-6 sm:p-8"><p className="font-display text-2xl font-medium leading-[1.1] tracking-[-0.03em] text-ink-primary">A multi-agent research workflow I keep rewriting. Essays about the parts that broke. <em className="font-serif font-normal text-accent">Designing Data-Intensive Applications</em> for the third time.</p><p className="mt-8 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">Agent workflows · RAG systems · Edge vision · Evaluation harnesses</p></div></motion.section>

          <motion.section {...REVEAL} className="mt-24" aria-labelledby="stack-heading">
            <div className="text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">the toolkit</span>
              <h2 id="stack-heading" className="mt-6 font-display text-4xl font-semibold tracking-[-0.05em] text-ink-primary sm:text-5xl">
                Tools I reach for.
              </h2>
              <p className="mx-auto mt-5 max-w-[60ch] text-base leading-7 text-ink-secondary">
                The tools I use when shipping a system end to end — from the first model call to the production deploy.
              </p>
              <a href="/skills" className="group mx-auto mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-secondary transition-colors hover:text-accent">
                See the full stack <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {SKILL_GROUPS.map((group, index) => {
                const Icon = group.icon
                return (
                  <article key={group.category} className="group rounded-2xl border border-rule/10 bg-elevated p-6 text-center transition-colors hover:border-accent/30 sm:p-7">
                    <div className="flex items-center justify-center gap-3">
                      <span className="font-mono text-[10px] text-ink-tertiary">0{index + 1}</span>
                      {Icon && <Icon className="h-4 w-4 text-ink-tertiary transition-colors group-hover:text-accent" strokeWidth={1.5} aria-hidden="true" />}
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-ink-primary">{group.category}</h3>
                    <p className="mx-auto mt-3 max-w-[42ch] text-sm leading-6 text-ink-secondary">{group.description}</p>
                    <p className="mt-5 border-t border-rule/10 pt-5 font-mono text-[10px] uppercase leading-5 tracking-[0.08em] text-ink-tertiary">
                      {group.skills.join(' · ')}
                    </p>
                  </article>
                )
              })}
            </div>
          </motion.section>

          <motion.section {...REVEAL} className="mt-24" aria-labelledby="opensource-heading">
            <div className="text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">open source</span>
              <h2 id="opensource-heading" className="mt-6 font-display text-4xl font-semibold tracking-[-0.05em] text-ink-primary sm:text-5xl">
                Work that travels.
              </h2>
              <p className="mx-auto mt-5 max-w-[62ch] text-base leading-7 text-ink-secondary">
                {liveStats.mergedPRs} merged pull requests and {liveStats.openedIssues} issues across {liveStats.projects}+ external projects, including {liveStats.orgs.join(', ')}. Verified on{' '}
                <a href="https://github.com/KunjShah95" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">GitHub</a>.
              </p>
              <a href="https://github.com/KunjShah95" target="_blank" rel="noopener noreferrer" className="group mx-auto mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-secondary transition-colors hover:text-accent">
                View profile <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[[liveStats.mergedPRs, 'merged PRs'], [liveStats.openedIssues, 'issues opened'], [liveStats.totalPRs, 'total PRs'], [`${liveStats.projects}+`, 'projects']].map(([value, label]) => (
                <div key={String(label)} className="rounded-2xl border border-rule/10 bg-elevated p-5 text-center">
                  <div className="font-display text-3xl font-semibold tabular-nums text-accent">
                    {typeof value === 'number' ? <CountUp value={value} duration={1} /> : value}
                  </div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-tertiary">{label}</div>
                </div>
              ))}
            </div>
            <ul className="mt-5 divide-y divide-rule/10 overflow-hidden rounded-2xl border border-rule/10 bg-paper">
              {contributions.map((contribution) => (
                <li key={contribution.url}>
                  <a href={contribution.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-2 px-5 py-5 transition-colors hover:bg-sunken sm:flex-row sm:items-center sm:gap-6">
                    <div className="flex items-center gap-2 sm:w-44 sm:shrink-0">
                      <span className="font-display text-sm font-semibold text-ink-primary transition-colors group-hover:text-accent">{contribution.label}</span>
                      {contribution.notable && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                    </div>
                    <p className="flex-1 text-sm leading-5 text-ink-secondary transition-colors group-hover:text-ink-primary/75">{contribution.title}</p>
                    <span className="font-mono text-[10px] text-ink-tertiary">{contribution.tag}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section {...REVEAL} className="mt-24" aria-labelledby="experience-heading">
            <div className="text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">experience</span>
              <h2 id="experience-heading" className="mt-6 font-display text-4xl font-semibold tracking-[-0.05em] text-ink-primary sm:text-5xl">
                Where I&apos;ve shipped.
              </h2>
              <p className="mx-auto mt-4 max-w-[48ch] text-sm leading-6 text-ink-secondary">
                Code, systems, and lessons that survived contact with production.
              </p>
            </div>
            <div className="mt-10 divide-y divide-rule/10 border-y border-rule/10">
              {EXPERIENCE.map((experience, index) => (
                <article key={`${experience.company}-${experience.period}`} className="grid gap-4 py-7 sm:grid-cols-[4rem_1fr_auto] sm:gap-6">
                  <div className={`grid h-10 w-10 place-items-center rounded-xl font-mono text-[10px] ${index === 0 ? 'bg-accent text-accent-ink' : 'border border-rule/10 bg-sunken text-ink-secondary'}`}>
                    {initials(experience.company)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="font-display text-lg font-semibold text-ink-primary">{experience.role.replace(/_/g, ' ')}</h3>
                      <span className="font-mono text-xs text-accent">@ {experience.company.replace(/_/g, ' ')}</span>
                    </div>
                    <p className="mt-3 max-w-[62ch] text-sm leading-6 text-ink-secondary">{experience.description}</p>
                    {experience.skills && (
                      <p className="mt-4 font-mono text-[9px] uppercase leading-5 tracking-[0.08em] text-ink-tertiary">
                        {experience.skills.map((skill) => skill.replace(/_/g, ' ')).join(' · ')}
                      </p>
                    )}
                  </div>
                  <span className="whitespace-nowrap font-mono text-[10px] text-ink-tertiary">{experience.period}</span>
                </article>
              ))}
            </div>
          </motion.section>
        </div>
      </section>
    </>
  )
}
