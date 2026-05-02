import { motion } from 'framer-motion'
import { Github, Code2, ArrowRight, ExternalLink, Zap, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/portfolio'
import { cardRevealTransition, VIEWPORT_SECTION } from '../lib/motion'

function ProjectCard({ project, isFlagship = false }: { project: any, isFlagship?: boolean }) {
  const hasProblem = project.problem && project.outcome
  
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_SECTION}
      transition={cardRevealTransition(parseInt(project.id) - 1)}
      className={`group relative rounded-xl border border-border bg-surface hover:border-primary/30 hover:shadow-md hover:shadow-primary/[0.06] transition-[border-color,box-shadow,background-color] duration-300 overflow-hidden ${isFlagship ? 'lg:col-span-2 ring-2 ring-primary/20' : ''}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0">
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
              <Code2 className="w-3 h-3" />
              {project.category}
            </span>
            {isFlagship && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-tighter">
                <Zap className="w-3 h-3" />
                Flagship
              </span>
            )}
            {['EquityLens', 'GAP Miner', 'SENTINEL CLI'].includes(project.title) && project.outcome && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-tighter">
                <Zap className="w-3 h-3" />
                Impact
              </span>
            )}
            <span className="text-xs text-muted/50 font-mono">#{project.id}</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-txt group-hover:text-primary transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed max-w-2xl">
              {project.desc}
            </p>
          </div>

          {hasProblem && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-bg border border-border">
                <div className="text-[10px] text-primary uppercase tracking-wider font-semibold mb-1">Problem</div>
                <p className="text-xs text-muted leading-relaxed">{project.problem}</p>
              </div>
              <div className="p-3 rounded-lg bg-bg border border-border">
                <div className="text-[10px] text-primary uppercase tracking-wider font-semibold mb-1">Result</div>
                <p className="text-xs text-muted leading-relaxed">{project.outcome}</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t: string) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-medium text-muted bg-bg border border-border rounded-md"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t lg:border-t-0 lg:border-l border-border bg-bg/50 p-6 flex flex-row lg:flex-col justify-start lg:justify-center gap-3 min-w-[160px]">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface hover:border-primary/40 hover:text-primary text-sm font-medium text-muted transition-all"
          >
            <Github className="w-4 h-4" />
            Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface hover:border-primary/40 hover:text-primary text-sm font-medium text-muted transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          )}
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary text-sm font-semibold transition-all"
          >
            Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const flagshipProject = PROJECTS.find(p => p.title === 'EquityLens')
  const otherProjects = PROJECTS.filter(p => p.title !== 'EquityLens').slice(0, 4)
  
  return (
    <section id="projects" className="section-padding bg-bg relative">
      <div className="container-aligned space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted text-sm font-medium">
              <Code2 className="w-4 h-4" />
              Featured Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-txt font-display">
              Projects
            </h2>
          </div>
          <span className="text-sm text-muted font-medium">{PROJECTS.length} projects</span>
        </div>

        {flagshipProject && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary text-sm font-semibold">
              <Zap className="w-4 h-4" />
              Flagship Project
            </div>
            <ProjectCard project={flagshipProject} isFlagship={true} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center gap-2 text-muted text-sm font-semibold pt-4">
            <Activity className="w-4 h-4" />
            Other Projects
          </div>
          {otherProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-surface border border-border text-txt font-bold text-base hover:border-primary/40 transition-all shadow-sm hover:shadow-md hover:shadow-primary/[0.05]"
          >
            Explore All Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-border p-4 md:hidden flex justify-around gap-4 z-50">
          <Link
            to="/projects"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold text-base"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border text-txt font-bold text-base"
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </section>
  )
}