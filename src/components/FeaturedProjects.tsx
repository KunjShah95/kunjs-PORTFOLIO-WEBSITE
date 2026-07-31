import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { PROJECTS, IDENTITY } from '../data/portfolio'
import { SpotlightCard } from './effects/SpotlightCard'

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
    <section id="work" className="py-24 md:py-32 border-t border-rule/10">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <h2 className="display text-4xl md:text-5xl leading-[1.05] max-w-3xl font-semibold tracking-tight">
              Shipped work.
            </h2>
            <p className="mt-3 text-base text-ink-secondary max-w-2xl leading-relaxed">
              Production AI systems with real metrics. Open source on{' '}
              <a
                href={`https://github.com/${IDENTITY.github_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover underline underline-offset-4 decoration-accent/30"
              >
                GitHub
              </a>
              .
            </p>
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover font-medium shrink-0 transition-colors"
          >
            All projects
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        <div className="flex flex-col gap-6">
          {/* HERO PROJECT — large spotlight showcase */}
          {hero && (
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SpotlightCard className="rounded-2xl border border-rule/10 bg-elevated hover:border-accent/25 transition-colors hover-lift">
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10 p-6 md:p-8">
                  {/* Preview */}
                  <div className="w-full md:w-[280px] shrink-0 rounded-lg overflow-hidden border border-accent/10 aspect-video md:aspect-[4/3] bg-sunken">
                    <img
                      src="/images/offerguard-preview.png"
                      alt="OfferGuard AI preview"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-tertiary/70">
                          {hero.category}
                        </span>
                        <div className="flex gap-2 mt-1">
                          {getRolesForProject(hero.slug).slice(0, 2).map((role) => (
                            <span key={role} className="text-[10px] font-mono text-ink-quaternary">
                              /{role}
                            </span>
                          ))}
                        </div>
                      </div>
                      {hero.impact && (
                        <span className="font-mono text-[10px] text-accent px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 font-semibold shrink-0">
                          {hero.impact}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-2xl md:text-3xl leading-tight font-semibold text-ink-primary tracking-tight mb-4">
                      <Link to={`/projects/${hero.slug}`} className="hover:text-accent transition-colors duration-300">
                        {hero.title}
                      </Link>
                    </h3>

                    {hero.problem && <p className="text-sm text-ink-secondary leading-relaxed mb-2">{hero.problem}</p>}
                    {hero.outcome && <p className="text-sm text-accent font-medium leading-relaxed">{hero.outcome}</p>}

                    {hero.metrics && (
                      <div className="mt-5 flex flex-wrap gap-6">
                        {Object.entries(hero.metrics).slice(0, 3).map(([key, val]) => (
                          <div key={key} className="flex flex-col">
                            <span className="display text-lg text-accent font-semibold">{val}</span>
                            <span className="text-[10px] text-ink-tertiary/70 font-mono">{key}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 pt-4 border-t border-rule/10 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {hero.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] text-ink-tertiary px-2 py-0.5 rounded-md bg-sunken/50 border border-rule/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        {hero.demo && (
                          <a
                            href={hero.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover font-medium transition-colors"
                          >
                            <span>Live demo</span>
                            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        )}
                        <Link
                          to={`/projects/${hero.slug}`}
                          className="group inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover font-medium transition-colors"
                        >
                          <span>Case study</span>
                          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          )}

          {/* SUPPORTING PROJECTS — compact spotlight cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {supporting.map((p, i) => (
              <motion.div
                key={p.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.06}
              >
                <SpotlightCard className="group h-full rounded-2xl border border-rule/10 bg-elevated hover:border-accent/25 transition-colors hover-lift">
                  <div className="flex flex-col justify-between h-full p-5 md:p-6">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-tertiary/70">
                          {p.category}
                        </span>
                        {p.impact && (
                          <span className="font-mono text-[10px] text-accent px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 font-semibold">
                            {p.impact}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-xl leading-snug font-semibold tracking-tight text-ink-primary mb-2">
                        <Link to={`/projects/${p.slug}`} className="hover:text-accent transition-colors duration-300">
                          {p.title}
                        </Link>
                      </h3>
                      {p.problem && (
                        <p className="text-sm text-ink-secondary leading-relaxed line-clamp-2 mb-1">{p.problem}</p>
                      )}
                      {p.outcome && (
                        <p className="text-sm text-accent/80 leading-relaxed line-clamp-2 font-medium">{p.outcome}</p>
                      )}
                    </div>
                    <div className="mt-4 pt-3 border-t border-rule/10 flex items-center justify-between">
                      <div className="flex gap-1.5 flex-wrap">
                        {p.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[9px] text-ink-quaternary px-1.5 py-0.5 rounded bg-sunken/50 border border-rule/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/projects/${p.slug}`}
                        className="group inline-flex items-center gap-1 text-xs text-accent hover:text-accent-hover font-medium transition-colors shrink-0"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hackathons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="mt-8"
        >
          <SpotlightCard className="rounded-2xl border border-rule/10 bg-elevated">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5">
              <div className="font-mono text-xs text-ink-secondary">
                <span className="text-ink-primary font-medium">Hackathon highlights: </span>
                Autonomous Hacks / Odoo Adani / Odoo Gandhinagar / SIH
              </div>
              <Link
                to="/hackathons"
                className="group inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-hover shrink-0 transition-colors"
              >
                <span>View all</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  )
}
