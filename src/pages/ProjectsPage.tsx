import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../data/portfolio'
import { SEO } from '../components/SEO'
import { SITE_URL } from '../lib/site'
import { PageHeader } from '../components/ui/PageHeader'
import { Kicker } from '../components/ui/Kicker'
import { useReveal } from '../hooks/useReveal'
import { LiquidGlass, TiltCard } from '../components/effects'

const FILTERS = ['All', 'AI Agents', 'RAG', 'Voice', 'Infra', 'Open Source']

function getRolesForProject(slug: string): string[] {
  switch (slug) {
    case 'offerguard-ai':
      return ['AI Engineer', 'Full Stack Dev']
    case 'equitylens':
      return ['AI/ML Specialist', 'Backend Engineer']
    case 'learnai':
      return ['Full Stack Dev', 'AI Engineer']
    case 'smart-flow-ai':
      return ['Cloud & DevOps', 'Backend Systems']
    case 'resumemaster-ai':
      return ['AI Systems Architect', 'Cloud / Python']
    case 'sentinel-cli':
      return ['Backend Systems', 'Security / DevOps']
    case 'railway-inspection':
      return ['AI/ML (Vision)', 'C++ Developer']
    case 'archmind-ai':
      return ['AI Engineer', 'Agent Builder']
    case 'archmind-research-agent':
      return ['AI Systems', 'Agent Builder']
    default:
      return ['AI Engineer', 'Software Developer']
  }
}

export function ProjectsPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active)
  const { ref, inView } = useReveal({ amount: 0.1 })

  return (
    <>
      <SEO
        title="Projects — Kunj Shah"
        description={`${PROJECTS.length} projects I've built — production AI agents, web apps, APIs, and ML systems. Case studies with architecture, challenges, and results.`}
        url={`${SITE_URL}/projects`}
      />
      <PageHeader
        kicker="Projects"
        title={`${PROJECTS.length} things I've built, broken down by year.`}
        lede="Production systems, prototypes, and the occasional weekend experiment. Click any project for the full case study."
        center
      />

      <section ref={ref} className="max-w-manifest mx-auto px-6 py-16">
        {/* Dynamic Filter options with hover highlight */}
        <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-rule/12 items-center">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-3.5 h-8 rounded-lg text-xs font-mono font-bold transition-all duration-200 ${
                active === f
                  ? 'bg-accent text-accent-ink shadow-[0_4px_12px_rgba(124,118,255,0.25)]'
                  : 'border border-rule/12 text-ink-secondary hover:border-accent/40 hover:text-ink-primary bg-paper/20'
              }`}
            >
              {f}
            </button>
          ))}
          <div className="ml-auto kicker text-ink-tertiary self-center font-bold">{filtered.length} of {PROJECTS.length}</div>
        </div>

        {inView && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((p) => (
              <div key={p.slug}>
                <TiltCard scale={1.02} maxRotation={5}>
                  <LiquidGlass
                    intensity="subtle"
                    tint="rgba(124, 118, 255, 0.08)"
                    className="p-6 md:p-8 flex flex-col justify-between h-full min-h-[320px] border border-rule/12 hover:border-accent/40 group transition-all rounded-3xl"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <Kicker>{p.category}</Kicker>
                        <div className="flex flex-col gap-1 items-end">
                          {getRolesForProject(p.slug).map((role) => (
                            <span
                              key={role}
                              className="text-[9px] font-mono text-ink-tertiary bg-paper/40 px-1.5 py-0.5 rounded border border-rule/8 font-semibold transition-colors group-hover:border-accent/20 group-hover:text-ink-secondary"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="display text-xl font-bold tracking-tight mb-3">
                        <Link to={`/projects/${p.slug}`} className="hover:text-accent transition-colors">
                          {p.title}
                        </Link>
                      </h3>

                      <p className="text-sm text-ink-secondary leading-relaxed line-clamp-4">
                        {p.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-rule/8 flex items-center justify-between">
                      <span className="font-mono text-xs text-ink-tertiary uppercase font-bold tracking-wider">{p.impact}</span>
                      <Link
                        to={`/projects/${p.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors"
                      >
                        Case study
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </LiquidGlass>
                </TiltCard>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
