import { motion } from 'framer-motion'
import { Github, Code2, ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/portfolio'

export function Projects() {
  return (
    <section id="projects" className="section-padding bg-bg relative">
      <div className="container-aligned space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted text-sm font-medium">
              <Code2 className="w-4 h-4" />
              Featured Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-txt">
              Projects
            </h2>
          </div>
          <span className="text-sm text-muted font-medium">{PROJECTS.length} projects</span>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6">
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative rounded-xl border border-border bg-surface hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0">
                {/* Main Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  {/* Category & ID */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                      <Code2 className="w-3 h-3" />
                      {proj.category}
                    </span>
                    <span className="text-xs text-muted/50 font-mono">{proj.id}</span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-txt group-hover:text-primary transition-colors duration-200">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed max-w-2xl">
                      {proj.desc}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.tech.map(t => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-medium text-muted bg-bg border border-border rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t lg:border-t-0 lg:border-l border-border bg-bg/50 p-6 flex flex-row lg:flex-col justify-start lg:justify-center gap-3 min-w-[160px]">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface hover:border-primary/40 hover:text-primary text-sm font-medium text-muted transition-all"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  {proj.demo && (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface hover:border-primary/40 hover:text-primary text-sm font-medium text-muted transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                  <Link
                    to={`/projects/${proj.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary text-sm font-semibold transition-all"
                  >
                    Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}