import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../data/portfolio'
import { SEO } from '../components/SEO'
import { SITE_URL } from '../lib/site'
import { PageHeader } from '../components/ui/PageHeader'
import { useReveal } from '../hooks/useReveal'

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
        <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-rule/10 items-center">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-3.5 h-8 rounded-lg text-xs font-mono font-bold transition-all duration-200 ${
                active === f
                  ? 'bg-accent text-accent-ink shadow-[0_4px_12px_rgba(124,118,255,0.25)]'
                  : 'border border-rule/10 text-ink-secondary hover:border-accent/40 hover:text-ink-primary bg-paper'
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
              <div
                key={p.slug}
                className="group relative flex flex-col justify-between h-full min-h-[320px] rounded-xl border border-rule/10 bg-paper hover:border-accent/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(var(--accent)/0.06)]"
              >
                <div className="p-6 md:p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <span className="kicker">{p.category}</span>
                      <div className="flex flex-col gap-1 items-end">
                        {getRolesForProject(p.slug).map((role) => (
                          <span
                            key={role}
                            className="text-[9px] font-mono text-ink-tertiary bg-paper px-1.5 py-0.5 rounded border border-rule/10 font-semibold transition-colors group-hover:border-accent/20 group-hover:text-ink-secondary"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    {p.slug === 'offerguard-ai' && (
                      <a href={p.demo || 'https://offerchecker-pi.vercel.app/'} target="_blank" rel="noopener noreferrer" className="block mb-4 rounded-lg border border-rule/10 overflow-hidden hover:border-accent/30 transition-colors">
                        <img src="/download.png" alt={`${p.title} demo`} className="w-full h-auto" />
                      </a>
                    )}

                    <h3 className="display text-xl font-bold tracking-tight mb-3">
                      <Link to={`/projects/${p.slug}`} className="hover:text-accent transition-colors">
                        {p.title}
                      </Link>
                    </h3>

                    <p className="text-sm text-ink-secondary leading-relaxed line-clamp-4">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-rule/10 flex items-center justify-between">
                    <span className="font-mono text-xs text-ink-tertiary uppercase font-bold tracking-wider">{p.impact}</span>
                    <Link
                      to={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors shrink-0 group/link"
                    >
                      Case study
                      <span className="w-4 h-4 rounded-full bg-accent/15 flex items-center justify-center group-hover/link:bg-accent/25 transition-colors">
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
