import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { PROJECTS, IDENTITY } from '../data/portfolio'
import { SpotlightCard } from './effects/SpotlightCard'
import { trackEvent, ANALYTICS_EVENTS } from '../lib/analytics'

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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } },
}

export function FeaturedProjects() {
  const list = PROJECTS.slice(0, 3)
  const [hero, ...supporting] = list

  return (
    <section id="work" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10"
        >
          <div>
            <span className="kicker kicker-accent">Selected work — 12 shipped</span>
            <h2 className="display text-[2rem] md:text-[2.75rem] leading-[0.96] mt-3 tracking-tight">
              Shipped work.
            </h2>
            <p className="mt-3 text-[15px] text-ink-secondary max-w-xl leading-relaxed text-pretty">
              Production AI systems with measured outcomes. Open source on{' '}
              <a
                href={`https://github.com/${IDENTITY.github_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-primary underline underline-offset-4 decoration-rule/30 hover:decoration-accent/40"
              >
                GitHub
              </a>
              .
            </p>
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm text-ink-tertiary hover:text-accent font-medium shrink-0"
          >
            All projects
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>

        <div className="flex flex-col gap-5">
          {/* HERO PROJECT — editorial, image + story */}
          {hero && (
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SpotlightCard className="rounded-2xl border border-rule/10 bg-elevated overflow-hidden">
                <div className="flex flex-col md:flex-row gap-0">
                  {/* Preview — Mux video thumb with play affordance */}
                  <a
                    href="https://peerlist.io/kunjshah/project/engineeros"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/media w-full md:w-[360px] shrink-0 bg-sunken relative overflow-hidden block"
                    aria-label="Watch EngineerOS demo on Peerlist"
                  >
                    <img
                      src="https://image.mux.com/ExmEys8mlg00IxE5QlR3lpfcv7gQkYnoEzJRKL2DIBXo/thumbnail.webp?width=720"
                      alt="EngineerOS demo preview"
                      className="w-full h-full object-cover object-top aspect-[16/10] md:aspect-[4/3] group-hover/media:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* play chip */}
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="w-11 h-11 rounded-full bg-ink-primary/90 backdrop-blur text-white grid place-items-center shadow-lg group-hover/media:bg-accent group-hover/media:scale-105 transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M8 5.14v14l11-7z"/></svg>
                      </span>
                    </span>
                    <span className="absolute bottom-2 left-2 font-mono text-[9px] tracking-wide px-1.5 py-0.5 rounded bg-ink-primary text-white/90">Peerlist · 1:12 demo</span>
                  </a>

                  <div className="flex-1 min-w-0 p-6 md:p-7 flex flex-col">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">Featured</span>
                      <span className="w-px h-3 bg-rule/20 hidden sm:inline" aria-hidden />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-tertiary">{hero.category}</span>
                      <a href="https://peerlist.io/kunjshah/project/engineeros" target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent hover:bg-accent hover:text-white transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" /> Peerlist 11↑
                      </a>
                      {hero.impact && (
                        <span className="font-mono text-[10px] text-ink-tertiary border border-rule/15 px-2 py-0.5 rounded-full">
                          {hero.impact}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-[22px] md:text-[26px] leading-[1.05] font-semibold tracking-tight text-ink-primary">
                      <Link to={`/projects/${hero.slug}`} className="hover:text-accent transition-colors">
                        {hero.title}
                      </Link>
                    </h3>
                    <span className="mt-1 font-mono text-[10px] text-ink-quaternary">{getRolesForProject(hero.slug).join('  ·  ')}</span>

                    {hero.problem && <p className="mt-3 text-[13.5px] text-ink-secondary leading-relaxed text-pretty">{hero.problem}</p>}
                    {hero.outcome && <p className="mt-2 text-[13.5px] text-ink-primary leading-relaxed">{hero.outcome}</p>}

                    {hero.metrics && (
                      <div className="mt-4 flex flex-wrap gap-5">
                        {Object.entries(hero.metrics).slice(0, 3).map(([key, val]) => (
                          <div key={key} className="flex flex-col">
                            <span className="font-display text-[17px] font-semibold tracking-tight text-ink-primary tabular-nums">{val}</span>
                            <span className="text-[10px] text-ink-tertiary font-mono">{key}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {hero.tech.slice(0, 4).map((t) => (
                          <span key={t} className="font-mono text-[10px] text-ink-tertiary px-2 py-1 rounded-full bg-sunken border border-rule/10">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {hero.demo && (
                          <a href={hero.demo} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_PROJECT_DEMO, { project: hero.slug, source: 'home_featured_hero' })} className="group inline-flex items-center gap-1.5 text-xs font-medium h-7 px-3 rounded-full border border-rule/15 text-ink-secondary hover:border-accent/30 hover:text-accent transition-colors">
                            Live demo <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                          </a>
                        )}
                        <a href="https://peerlist.io/kunjshah/project/engineeros" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium h-7 px-3 rounded-full border border-accent/20 bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors">
                          Peerlist <ArrowUpRight className="w-3 h-3" />
                        </a>
                        {hero.github && (
                          <a href={hero.github} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_PROJECT_GITHUB, { project: hero.slug, source: 'home_featured_hero' })} className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-tertiary hover:text-accent">
                            GitHub <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                        <Link
                          to={`/projects/${hero.slug}`}
                          onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_PROJECT_CARD, { project: hero.slug, source: 'home_featured_hero' })}
                          className="inline-flex items-center gap-1.5 text-xs font-medium h-7 px-3 rounded-full bg-ink-primary text-paper hover:bg-accent hover:text-white transition-colors"
                        >
                          Case study <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          )}

          {/* SUPPORTING — allow natural height, not forced equal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supporting.map((p, i) => (
              <motion.div key={p.slug} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.06}>
                <SpotlightCard className="group rounded-2xl border border-rule/10 bg-elevated p-5 md:p-6 flex flex-col gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-tertiary">{p.category}</span>
                      {p.impact && <span className="ml-auto font-mono text-[10px] text-ink-tertiary border border-rule/12 px-2 py-0.5 rounded-full">{p.impact}</span>}
                    </div>
                    <h3 className="font-display text-[18px] leading-tight font-semibold tracking-tight text-ink-primary">
                      <Link to={`/projects/${p.slug}`} className="hover:text-accent transition-colors">
                        {p.title}
                      </Link>
                    </h3>
                    <span className="mt-1 block font-mono text-[10px] text-ink-quaternary">{getRolesForProject(p.slug).join('  ·  ')}</span>
                    {p.problem && <p className="mt-3 text-sm text-ink-secondary leading-relaxed line-clamp-2 text-pretty">{p.problem}</p>}
                  </div>
                  <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-rule/8">
                    <div className="flex gap-1.5 flex-wrap">
                      {p.tech.slice(0, 3).map((t) => (
                        <span key={t} className="font-mono text-[9px] text-ink-tertiary px-1.5 py-0.5 rounded-full bg-sunken border border-rule/10">
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/projects/${p.slug}`}
                      onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_PROJECT_CARD, { project: p.slug, source: 'home_featured_supporting' })}
                      className="inline-flex items-center gap-1 text-xs font-medium text-ink-tertiary group-hover:text-accent shrink-0"
                    >
                      Details <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </Link>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hackathons — quiet inline, not card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 text-xs font-mono"
        >
          <span className="text-ink-tertiary">Hackathons — Autonomous Hacks · Odoo Adani · Odoo Gandhinagar · SIH</span>
          <Link to="/hackathons" className="group inline-flex items-center gap-1 text-ink-secondary hover:text-accent shrink-0">
            View all <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
