import { SEO } from '../components/SEO'
import { SITE_URL } from '../lib/site'
import { PageHeader } from '../components/ui/PageHeader'
import { Rule } from '../components/ui/Rule'
import { SKILL_GROUPS, EXPERIENCE } from '../data/portfolio'
import { ArrowUpRight } from 'lucide-react'
import { useGitHubPRs } from '../hooks/useGitHubPRs'
import {
  CountUp,
} from '../components/effects'

export function AboutPage() {
  const { contributions, stats: liveStats } = useGitHubPRs()
  return (
    <>
      <SEO
        title="About Kunj Shah | AI Engineer & ML Specialist"
        description="A short biography, background context, and technical toolkit of Kunj Shah, an AI engineer shipping agents and ML pipelines."
        url={`${SITE_URL}/about`}
      />
      <PageHeader
        kicker="About"
        title="A short biography, written in first person."
        lede="I build things that ship, break, get fixed, and ship again. The short version: AI agents, web apps, APIs — and the backend to make them real."
        center
      />

      <article className="relative max-w-manifest mx-auto px-6 py-24 overflow-hidden bg-sunken/5">
        <div className="max-w-prose mx-auto relative z-10">
          {/* Bio Section */}
          <section id="bio" className="pl-6 md:pl-10">
            <h2 className="display text-3xl mb-6 font-bold tracking-tight">Bio</h2>
            <p className="text-lg leading-relaxed text-ink-primary">
              I&rsquo;m 22, fourth-year CS at Indus University in Ahmedabad. I ship things for founders and small teams — AI agents, web apps, APIs, prototypes. You describe it, I build it. Whiteboard to production in weeks, not quarters.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
              Four hackathon finals, two production systems, one chatbot I still apologize for. I build agents in the hours I should be studying and write about the parts that broke. My work has covered research workflows, voice interfaces, and the parts of retrieval that break when you push past the demo.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-ink-secondary">
              If you write to me, I write back. Most weeks I&rsquo;m working with founders and small teams who need someone to take a system from whiteboard to production in a few weeks. The best conversations start with &ldquo;I have an idea&rdquo; — the rest we figure out along the way.
            </p>
          </section>

          {/* Principles Section */}
          <Rule label="Principles" />
          <section id="principles" className="pl-6 md:pl-10">
            <h2 className="display text-3xl mb-6 font-bold tracking-tight">Principles</h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-px bg-rule/10 rounded-2xl overflow-hidden border border-rule/12">
              {[
                { num: '01', title: 'Ship to learn.', desc: 'A prototype in a notebook is a hypothesis. A deployed system with real users is a fact.' },
                { num: '02', title: 'Workflows > Prompts.', desc: 'The right system architecture is 80% of the work. Prompt engineering is the last 20%.' },
                { num: '03', title: 'Show the work.', desc: 'Code, traces, costs, latency. If you cannot trace it, you do not understand it.' },
                { num: '04', title: 'Boring tech where it counts.', desc: 'Postgres over a new vector DB. Cron over a complex queue. Boring is reliable.' },
              ].map((p) => (
                <li key={p.num} className="bg-paper p-6 flex flex-col hover:bg-elevated transition-colors duration-300">
                  <span className="font-mono text-[10px] text-ink-tertiary tracking-wider">{p.num}</span>
                  <h3 className="font-display text-lg font-bold mt-3 text-ink-primary">{p.title}</h3>
                  <p className="mt-2 text-sm text-ink-secondary leading-relaxed flex-1">{p.desc}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Now Section */}
          <Rule label="Now" />
          <section id="now" className="pl-6 md:pl-10">
            <h2 className="display text-3xl mb-6 font-bold tracking-tight">What I&rsquo;m doing now</h2>
            <p className="text-lg leading-relaxed text-ink-primary border-l-2 border-accent/30 pl-6">
              Building a multi-agent research workflow that I keep rewriting. Writing essays about the parts that broke. Reading <em>Designing Data-Intensive Applications</em> for the third time, and finally understanding chapters I skimmed twice.
            </p>
          </section>

          {/* Stack Section */}
          <Rule label="Stack" />
          <section id="stack" className="pl-6 md:pl-10">
            <h2 className="display text-3xl mb-4 font-bold tracking-tight">What I work with</h2>
            <p className="text-ink-secondary leading-relaxed mb-10 max-w-prose text-sm md:text-base">
              The tools I reach for when shipping a system end-to-end — from the first prompt to the production deploy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILL_GROUPS.map((group, i) => {
                const Icon = group.icon
                return (
                  <div key={group.category} className="rounded-2xl border border-rule/12 bg-elevated p-6 md:p-8 flex flex-col justify-between group hover:border-accent/20 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-mono text-[10px] text-ink-tertiary">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {Icon && (
                          <Icon
                            className="w-4 h-4 text-ink-quaternary group-hover:text-accent transition-colors duration-300"
                            strokeWidth={1.5}
                            aria-hidden
                          />
                        )}
                      </div>
                      <h3 className="font-display text-xl font-bold tracking-tight mb-2">{group.category}</h3>
                      <p className="text-sm text-ink-secondary leading-relaxed mb-6">{group.description}</p>
                    </div>
                    <div className="mt-auto pt-5 border-t border-rule/8">
                      <span className="font-mono text-[10px] uppercase text-ink-tertiary tracking-wider block mb-2.5">Stack</span>
                      <ul className="flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => (
                          <li key={skill} className="font-mono text-[11px] text-ink-secondary px-2.5 py-1 border border-rule/8 rounded-full hover:border-accent/30 hover:text-ink-primary transition-colors">
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Open Source Section */}
          <Rule label="Open Source" />
          <section id="open-source" className="pl-6 md:pl-10">
            <h2 className="display text-3xl mb-2 font-bold tracking-tight">Open source</h2>
            <p className="text-ink-secondary leading-relaxed mb-8 max-w-prose text-sm md:text-base">
              {liveStats.mergedPRs} merged pull requests and {liveStats.openedIssues} issues
              across {liveStats.projects}+ external projects — including {liveStats.orgs.join(', ')}.
              Verified on{' '}
              <a
                href="https://github.com/KunjShah95"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent/65 font-semibold"
              >
                GitHub
              </a>.
            </p>

            {/* Liquid Glass Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {([
                [liveStats.mergedPRs, 'merged PRs'],
                [liveStats.openedIssues, 'issues opened'],
                [liveStats.totalPRs, 'total PRs'],
                [`${liveStats.projects}+`, 'projects'],
              ] as [string | number, string][]).map(([n, l]) => {
                const isNumeric = typeof n === 'number'
                return (
                  <div key={l} className="p-4 md:p-5 rounded-2xl border border-rule/12 bg-elevated text-center">
                    <div className="font-display text-2xl md:text-3xl text-accent font-extrabold tabular-nums">
                      {isNumeric ? <CountUp value={n as number} duration={1} /> : n}
                    </div>
                    <div className="kicker mt-1 text-ink-secondary">{l}</div>
                  </div>
                )
              })}
            </div>

            <ul className="divide-y divide-rule/8 rounded-2xl border border-rule/12 overflow-hidden bg-paper/20 backdrop-blur-sm">
              {contributions.map((c) => (
                <li key={c.url}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-2 py-5 px-6 md:flex-row md:items-center md:gap-6 hover:bg-accent/5 transition-colors relative"
                  >
                    <span className="absolute left-0 inset-y-0 w-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center gap-3 md:w-44 md:shrink-0">
                      {c.notable && (
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
                      )}
                      <span className="display text-base font-bold text-ink-primary group-hover:text-accent transition-colors">
                        {c.label}
                      </span>
                    </div>
                    <p className="flex-1 text-sm text-ink-secondary leading-relaxed group-hover:text-ink-primary transition-colors">
                      {c.title}
                    </p>
                    <div className="flex items-center gap-2 font-mono text-xs text-ink-tertiary md:w-36 md:justify-end shrink-0">
                      <span className="px-2 py-0.5 rounded bg-paper/60 border border-rule/8 text-[10px]">
                        {c.kind === 'merged' ? 'merged' : 'proposed'}
                      </span>
                      <span>&middot;</span>
                      <span className="text-accent">{c.tag}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-accent ml-1" />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* CV/Experience Section */}
          <Rule label="CV" />
          <section id="cv" className="pl-6 md:pl-10">
            <h2 className="display text-3xl mb-6 font-bold tracking-tight">Experience</h2>
            <div className="divide-y divide-rule/8 border border-rule/12 rounded-2xl overflow-hidden">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 p-6 md:p-8 bg-paper hover:bg-elevated transition-colors">
                  <div className="md:w-1/4 shrink-0">
                    <span className="font-mono text-[11px] text-ink-tertiary">{exp.period}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-ink-primary">{exp.role.replace(/_/g, ' ')}</h3>
                    <div className="font-mono text-sm text-accent mt-1">{exp.company.replace(/_/g, ' ')}</div>
                    <p className="mt-3 text-sm text-ink-secondary leading-relaxed">{exp.description}</p>
                    {exp.skills && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {exp.skills.map(skill => (
                          <span key={skill} className="px-2 py-0.5 rounded border border-rule/8 text-[10px] font-mono text-ink-tertiary">
                            {skill.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  )
}
