import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { PROJECTS } from '../data/portfolio'
import { trackEvent, ANALYTICS_EVENTS } from '../lib/analytics'
import type { Project } from '../types'

function metricEntries(project: Project) {
  return Object.entries(project.benchmarks ?? project.metrics ?? {}).slice(0, 3)
}

function ProjectRow({ project, lead = false }: { project: Project; lead?: boolean }) {
  const metrics = metricEntries(project)

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`group overflow-hidden rounded-2xl border border-rule/10 bg-elevated transition-all hover:-translate-y-0.5 hover:border-accent/30 ${lead ? 'grid lg:col-span-2 lg:grid-cols-[0.9fr_1.1fr]' : ''}`}
    >
      {lead && (
        <div className="relative min-h-64 overflow-hidden border-b border-rule/10 bg-sunken lg:min-h-full lg:border-b-0 lg:border-r">
          <img
            src="/images/engineeros-preview.png"
            width="1200"
            height="900"
            alt="EngineerOS AI workspace preview"
            className="h-full w-full object-cover object-top grayscale transition-all duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
      )}

      <div className="flex flex-col items-center p-5 text-center sm:p-7">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-tertiary">
            0{project.id} / {project.category}
          </span>
          <h3 className={`mt-2 font-display font-semibold tracking-[-0.035em] text-ink-primary ${lead ? 'text-3xl sm:text-4xl' : 'text-xl'}`}>
            <Link
              to={`/projects/${project.slug}`}
              onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_PROJECT_CARD, { project: project.slug, source: 'home_featured' })}
              className="transition-colors hover:text-accent"
            >
              {project.title}
            </Link>
          </h3>
        </div>

        <p className="mx-auto mt-4 max-w-[66ch] text-sm leading-6 text-ink-secondary">{project.outcome || project.desc}</p>

        {metrics.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-3 border-y border-rule/10 py-4">
            {metrics.map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="font-display text-base font-semibold tabular-nums text-ink-primary">{value}</div>
                <div className="mt-1 font-mono text-[8px] uppercase leading-3 tracking-[0.06em] text-ink-tertiary">{label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.08em] text-ink-tertiary">
          {project.tech.slice(0, 5).join(' · ')}
        </div>

        <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-3 border-t border-rule/10 pt-4">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-ink-primary px-3 text-xs font-semibold text-paper transition-colors hover:bg-accent"
          >
            Read the case study <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_PROJECT_DEMO, { project: project.slug, source: 'home_featured' })}
              className="inline-flex min-h-9 items-center gap-1.5 px-2 text-xs text-ink-secondary hover:text-accent"
            >
              Open app <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-1.5 px-2 text-xs text-ink-tertiary hover:text-accent">
              Source <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function FeaturedProjects() {
  const [lead, ...supporting] = PROJECTS.slice(0, 3)

  return (
    <section id="work" className="relative overflow-hidden border-t border-rule/10 py-20 md:py-28" aria-labelledby="work-heading">
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 id="work-heading" className="max-w-3xl font-display text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-ink-primary sm:text-5xl">
            The work is the proof.
          </h2>
          <p className="mx-auto mt-5 max-w-[60ch] text-base leading-7 text-ink-secondary">
            Each project is a record of a problem, a trade-off, and a result. I include the constraints because that&apos;s where the engineering judgment lives.
          </p>
          <Link to="/projects" className="group mx-auto mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-secondary transition-colors hover:text-accent">
            See the full trail <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {lead && <ProjectRow project={lead} lead />}
          {supporting.map((project) => <ProjectRow key={project.slug} project={project} />)}
        </div>
      </div>
    </section>
  )
}
