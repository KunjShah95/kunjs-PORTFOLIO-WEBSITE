import { motion, useInView } from 'framer-motion'
import { ArrowRight, ExternalLink, Github, TrendingUp, Zap } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/portfolio'

const featured = PROJECTS.filter((p) => p.featured).slice(0, 2)

const ACCENT_PAIRS = [
  { from: 'from-primary/20', via: 'via-primary/5', to: 'to-transparent', glow: 'bg-primary/10' },
  { from: 'from-secondary/20', via: 'via-secondary/5', to: 'to-transparent', glow: 'bg-secondary/10' },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export function FeaturedProjects() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  if (featured.length === 0) return null

  return (
    <section ref={ref} id="featured-projects" aria-label="Featured projects" className="section-padding bg-bg">
      <div className="container-aligned">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary/60" aria-hidden />
            <span className="txt-mono text-xs text-muted uppercase tracking-[0.2em]">02 — Featured Work</span>
          </div>
          <h2 className="font-display text-[clamp(1.9rem,4vw,2.75rem)] font-semibold text-txt tracking-[-0.02em] leading-[1.12]">
            Two projects. Real outcomes.
          </h2>
          <p className="text-muted text-lg max-w-xl leading-relaxed">
            Shipped products with measurable impact — from bias detection in healthcare AI to real-time crowd intelligence.
          </p>
        </motion.div>

        {/* ── Card grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {featured.map((project, i) => {
            const accent = ACCENT_PAIRS[i % ACCENT_PAIRS.length]
            return (
              <motion.article
                key={project.id}
                variants={cardVariants}
                className="group relative flex flex-col rounded-2xl bg-surface border border-border overflow-hidden hover:border-primary/40 transition-colors duration-300"
              >
                {/* Glow stripe */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${accent.from} ${accent.via} ${accent.to} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  aria-hidden
                />

                {/* Top bar */}
                <div className="relative px-6 pt-6 pb-0 flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="txt-mono text-[10px] text-muted uppercase tracking-[0.18em]">
                      {project.category}
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-txt leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 txt-mono text-[10px] text-primary uppercase tracking-wide mt-1">
                    {project.impact.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* Problem statement */}
                {project.problem && (
                  <div className="relative px-6 pt-5 flex items-start gap-3">
                    <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden />
                    <p className="text-muted text-sm leading-relaxed">
                      <span className="text-txt font-medium">Problem: </span>
                      {project.problem}
                    </p>
                  </div>
                )}

                {/* Description */}
                <p className="relative px-6 pt-3 text-muted text-sm leading-relaxed">
                  {project.desc}
                </p>

                {/* Outcome metric */}
                {project.outcome && (
                  <div className="relative mx-6 mt-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-surfaceHighlight border border-border">
                    <TrendingUp className="w-4 h-4 text-primary shrink-0" aria-hidden />
                    <p className="text-sm text-txt font-medium leading-snug">{project.outcome}</p>
                  </div>
                )}

                {/* Tech pills */}
                <div className="relative px-6 pt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-bg border border-border txt-mono text-[10px] text-muted uppercase tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="relative px-6 pt-5 pb-6 mt-auto flex flex-wrap items-center gap-3">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Live Demo
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border text-txt font-medium text-sm hover:bg-surfaceHighlight transition-colors"
                  >
                    <Github className="w-4 h-4" aria-hidden />
                    Source
                  </a>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="ml-auto inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors group/link"
                  >
                    Case study
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" aria-hidden />
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        {/* ── "See all" footer ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.45 }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors group/all"
          >
            <span>See all {PROJECTS.length} projects</span>
            <ArrowRight className="w-4 h-4 group-hover/all:translate-x-0.5 transition-transform" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
