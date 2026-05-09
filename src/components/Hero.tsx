import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/portfolio'
import { trackEvent, ANALYTICS_EVENTS } from '../lib/analytics'

const TECH_TAGS = [
  'Python', 'TypeScript', 'React', 'LangChain', 'PyTorch', 'FastAPI',
  'PostgreSQL', 'Docker', 'LLM', 'Node.js', 'CrewAI', 'OpenCV'
]

export function Hero() {
  // Top 3 projects for the fold
  const topProjects = PROJECTS.slice(0, 3)

  return (
    <section className="relative min-h-[94vh] bg-bg overflow-hidden flex items-center pt-8">
      <div className="absolute inset-0 tech-grid-layer" />
      <div className="absolute inset-0 grain-overlay" />
      
      <div className="relative z-10 container-aligned w-full">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
          {/* LEFT: Who you are + CTA */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-muted">Available for hire</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-txt leading-tight tracking-tight mb-3"
            >
              Kunj Shah
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="text-lg sm:text-xl text-primary font-semibold mb-3"
            >
              AI Engineer · Autonomous Systems
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="text-base text-muted max-w-xl mb-5 leading-relaxed"
            >
              I build production-grade AI agents and intelligent systems that replace manual workflows and deliver measurable ROI. 
              Python, LangChain, FastAPI, and agentic reasoning are my stack.
            </motion.p>

            {/* Skills as compact tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="flex flex-wrap gap-1.5 mb-6"
            >
              {TECH_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-surface border border-border rounded text-[11px] font-mono text-muted"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <Link
                to="/contact"
                onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_HERO_PRIMARY)}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] active:scale-[0.98]"
              >
                Hire Me
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-surface border border-border text-txt font-semibold text-sm hover:bg-surfaceHighlight transition-colors shadow-sm active:scale-[0.98]"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            </motion.div>
          </div>

          {/* RIGHT: 3 Project Cards visible without scrolling */}
          <div className="w-full lg:w-[480px] shrink-0 space-y-3">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] font-mono text-muted uppercase tracking-widest mb-1"
            >
              Featured Projects
            </motion.p>
            {topProjects.map((project, i) => (
              <motion.a
                key={project.id}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.35 }}
                className="group block p-4 rounded-xl bg-surface border border-border hover:border-primary/40 hover:bg-surfaceHighlight transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-txt group-hover:text-primary transition-colors truncate">
                        {project.title}
                      </h3>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg border border-border text-muted font-mono shrink-0">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 bg-bg border border-border rounded text-[9px] font-mono text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {project.outcome && (
                      <p className="text-[11px] text-green-400 font-medium mt-2 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-green-400" />
                        {project.outcome}
                      </p>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Github className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors font-medium mt-1"
              >
                View all projects
                <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}