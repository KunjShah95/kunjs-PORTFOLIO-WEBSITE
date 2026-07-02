import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS, HACKATHONS, IDENTITY } from '../data/portfolio'
import { SectionLabel } from './ui/SectionLabel'
import { Kicker } from './ui/Kicker'
import { useReveal } from '../hooks/useReveal'
import { LiquidGlass, TiltCard, SpotlightCard, Magnetic, TextReveal } from './effects'

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
    case 'cinepulse':
      return ['AI Engineer', 'Full Stack Dev']
    default:
      return ['AI Engineer', 'Software Developer']
  }
}

export function FeaturedProjects() {
  const list = PROJECTS.slice(0, 3)
  const [hero, ...supporting] = list
  const { ref, inView } = useReveal({ amount: 0.1 })

  return (
    <section ref={ref} id="work" className="py-24 md:py-32 border-b border-rule/12 overflow-hidden bg-sunken/5">
      <div className="max-w-manifest mx-auto px-6">
        <SectionLabel number="03" label="Selected work" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          <h2 className="md:col-span-8 display text-4xl md:text-5xl leading-[1.05]">
            <TextReveal text="Things I've shipped." />
          </h2>
          <div className="md:col-span-4 flex md:justify-end items-end">
            <Magnetic strength={0.2}>
              <Link to="/projects" className="group inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover font-semibold transition-colors">
                All projects ({PROJECTS.length})
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pb-8 mb-8 border-b border-rule/12 font-mono text-sm">
          <span className="inline-flex items-center gap-2 text-ink-secondary bg-paper/40 px-3.5 py-1.5 rounded-full border border-rule/8">
            <span className="text-accent font-bold">{PROJECTS.length}</span> things shipped
          </span>
          <span className="text-ink-quaternary">/</span>
          <span className="inline-flex items-center gap-2 text-ink-secondary bg-paper/40 px-3.5 py-1.5 rounded-full border border-rule/8">
            <span className="text-accent font-bold">{HACKATHONS.filter(h => h.placement === 'Finalist').length}</span> hackathon finals
          </span>
          <span className="text-ink-quaternary">/</span>
          <span className="inline-flex items-center gap-2 text-ink-secondary bg-paper/40 px-3.5 py-1.5 rounded-full border border-rule/8">
            Open source on{' '}
            <a
              href={`https://github.com/${IDENTITY.github_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-primary underline decoration-accent/30 underline-offset-4 hover:decoration-accent/65"
            >
              GitHub
            </a>
          </span>
        </div>

        {inView && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* HERO PROJECT CARD — spans 2 columns */}
            {hero && (
              <div className="md:col-span-2 md:row-span-2">
                <TiltCard scale={1.01} maxRotation={4}>
                  <SpotlightCard className="h-full rounded-3xl">
                    <LiquidGlass
                      intensity="strong"
                      tint="rgba(124, 118, 255, 0.15)"
                      className="p-8 md:p-10 flex flex-col justify-between h-full min-h-[480px] border border-rule/12 hover:border-accent/40 group transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex flex-col gap-1">
                            <Kicker accent>
                              01 &middot; {hero.category ?? 'Project'}
                            </Kicker>
                            <div className="flex gap-1.5 mt-1">
                              {getRolesForProject(hero.slug).map(role => (
                                <span key={role} className="text-[10px] font-mono text-ink-secondary bg-paper/60 px-2 py-0.5 rounded border border-rule/8">
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>
                          {hero.impact && (
                            <span className="font-mono text-xs text-accent px-2.5 py-1 rounded-full bg-accent/8 border border-accent/20 font-bold uppercase tracking-wider self-start">
                              {hero.impact}
                            </span>
                          )}
                        </div>

                        <h3 className="display text-3xl md:text-5xl leading-[1.05] max-w-xl font-extrabold tracking-tight">
                          <Link to={`/projects/${hero.slug}`} className="hover:text-accent transition-colors">
                            {hero.title}
                          </Link>
                        </h3>

                        <p className="mt-6 text-ink-secondary text-base md:text-lg leading-relaxed max-w-prose">
                          {hero.desc}
                        </p>
                      </div>

                      <div>
                        {hero.tech && (
                          <div className="mt-8 pt-6 border-t border-rule/8">
                            <Kicker className="block mb-3">Stack</Kicker>
                            <ul className="flex flex-wrap gap-2">
                              {hero.tech.map((t) => (
                                <li
                                  key={t}
                                  className="font-mono text-xs text-ink-primary px-3 py-1 border border-rule/8 rounded-full bg-paper/60 hover:bg-accent/15 hover:border-accent/40 group-hover:scale-105 transition-all duration-300"
                                >
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-8 flex justify-between items-center">
                          <Link
                            to={`/projects/${hero.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors group/btn"
                          >
                            Read case study
                            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1.5 group-hover/btn:-translate-y-1.5 transition-transform duration-300" />
                          </Link>
                        </div>
                      </div>
                    </LiquidGlass>
                  </SpotlightCard>
                </TiltCard>
              </div>
            )}

            {/* SUPPORTING PROJECT CARDS */}
            {supporting.map((p, i) => (
              <div key={p.slug} className="md:col-span-1">
                <TiltCard scale={1.015} maxRotation={5}>
                  <LiquidGlass
                    intensity="subtle"
                    tint="rgba(6, 182, 212, 0.1)"
                    className="p-6 md:p-8 flex flex-col justify-between h-full min-h-[300px] border border-rule/12 hover:border-accent/40 group transition-all rounded-3xl"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <Kicker>
                          {String(i + 2).padStart(2, '0')} &middot; {p.category ?? 'Project'}
                        </Kicker>
                        <div className="flex flex-col gap-1 items-end">
                          {getRolesForProject(p.slug).map(role => (
                            <span key={role} className="text-[9px] font-mono text-ink-tertiary bg-paper/30 px-1.5 py-0.5 rounded border border-rule/8 font-semibold">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h3 className="display text-2xl leading-tight font-bold tracking-tight mb-4">
                        <Link to={`/projects/${p.slug}`} className="hover:text-accent transition-colors">
                          {p.title}
                        </Link>
                      </h3>
                      {p.desc && (
                        <p className="text-sm text-ink-secondary leading-relaxed line-clamp-4">
                          {p.desc}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-rule/8 flex items-center justify-between">
                      {p.impact && (
                        <span className="font-mono text-xs text-ink-tertiary font-bold uppercase tracking-wider">{p.impact}</span>
                      )}
                      <Link
                        to={`/projects/${p.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover"
                      >
                        Read Case
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </LiquidGlass>
                </TiltCard>
              </div>
            ))}
          </div>
        )}

        {/* Hackathons glass pill bar */}
        <div className="mt-16 pt-8 border-t border-rule/12">
          <LiquidGlass intensity="subtle" tint="rgba(124, 118, 255, 0.05)" className="p-6 rounded-2xl border border-rule/8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="font-mono text-xs text-ink-secondary uppercase tracking-wider leading-relaxed">
              <span className="text-accent font-bold">{HACKATHONS.filter(h => h.placement === 'Finalist').length} hackathon finals</span>
              <span className="mx-3 text-ink-quaternary">/</span>
              <span className="text-ink-primary font-medium">Autonomous Hacks · Odoo Adani · Odoo Gandhinagar · SIH</span>
            </div>
            <Link
              to="/hackathons"
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover self-start md:self-auto"
            >
              All hackathons
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </LiquidGlass>
        </div>
      </div>
    </section>
  )
}
