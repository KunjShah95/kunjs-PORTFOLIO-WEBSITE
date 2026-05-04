import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github, ArrowUpRight, Activity, AlertCircle, CheckCircle2, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FEATURED_PROJECTS, PROJECTS } from '../data/portfolio'

function ProjectFeatureCard({ project, index }: { project: typeof FEATURED_PROJECTS[0], index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative rounded-xl bg-surface border border-border overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6 sm:p-8 flex flex-col h-full">
        <h3 className="text-2xl font-display font-bold text-txt mb-4 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <div className="mb-4 p-3 rounded-lg bg-bg border border-border">
          <div className="flex items-center justify-center h-20 text-muted text-sm">
            <span className="text-center">📊 Visual proof: screenshots, dashboards,<br/>or architecture diagrams</span>
          </div>
        </div>

        <div className="space-y-4 mb-6 flex-1">
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1.5 text-xs font-mono font-semibold text-orange-400 uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" /> Problem
            </span>
            <p className="text-sm text-muted">{project.problem}</p>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1.5 text-xs font-mono font-semibold text-primary uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" /> Solution
            </span>
            <p className="text-sm text-muted">{project.solution}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1.5 text-xs font-mono font-semibold text-green-400 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" /> Impact
            </span>
            <p className="text-sm font-medium text-txt">{project.result}</p>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded bg-bg border border-border text-[11px] font-mono text-txtDim uppercase"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-5 border-t border-border/50 mt-auto">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-bg border border-border text-txt text-sm font-medium hover:bg-surfaceHighlight transition-colors shadow-sm"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}
        </div>
      </div>

      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surfaceHighlight flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="w-4 h-4 text-primary" />
      </div>
    </motion.article>
  )
}

export function FeaturedProjects() {
  return (
    <section id="featured-projects" aria-label="Featured projects" className="section-padding bg-bg relative">
      <div className="absolute inset-0 tech-grid-layer opacity-30" />
      
      <div className="container-aligned relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <span className="text-sm font-mono text-muted uppercase tracking-[0.2em] font-semibold">Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-txt mb-4">
            Real-World <span className="text-primary">Implementations</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mb-6">
            A selection of production-grade AI systems built to solve complex business problems.
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{PROJECTS.length}</span>
              <span className="text-muted">Projects Deployed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">1.2M+</span>
              <span className="text-muted">API Calls</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">99.9%</span>
              <span className="text-muted">Uptime</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {FEATURED_PROJECTS.map((project, i) => (
            <ProjectFeatureCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-surface border border-border text-txt font-semibold hover:bg-surfaceHighlight transition-colors shadow-sm"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}