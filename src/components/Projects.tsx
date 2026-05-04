import { motion } from 'framer-motion'
import { ArrowRight, Github, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/portfolio'
import { Project } from '../types'

interface ProjectCardProps {
  project: Project
  isFlagship?: boolean
  index: number
}

const cardRevealTransition = (index: number) => ({
  duration: 0.5,
  delay: index * 0.1,
  ease: [0.215, 0.61, 0.355, 1],
})

function ProjectCard({ project, isFlagship = false, index }: ProjectCardProps) {
  const hasProblem = project.problem && project.outcome

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={cardRevealTransition(index)}
      className={`group relative flex flex-col gap-6 p-8 rounded-sm border border-border bg-surface hover:border-primary/50 transition-all duration-500 ${
        isFlagship ? 'border-primary/30 bg-gradient-to-br from-surface to-primary/[0.03]' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] txt-mono font-bold text-primary uppercase tracking-[0.2em]">
            {project.category}
          </span>
          <h3 className={`font-bold text-txt group-hover:text-primary transition-colors leading-tight ${
            isFlagship ? 'text-3xl md:text-5xl font-display uppercase tracking-tight' : 'text-2xl uppercase tracking-wide'
          }`}>
            {project.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-sm bg-bg border border-border hover:border-primary/50 text-muted hover:text-primary transition-all">
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-3 rounded-sm bg-bg border border-border hover:border-primary/50 text-muted hover:text-primary transition-all">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <p className="text-muted text-base leading-relaxed max-w-3xl">
        {project.desc}
      </p>

      {hasProblem && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 p-5 rounded-sm bg-bg border border-border/60">
            <span className="flex items-center gap-2 text-[10px] txt-mono font-bold text-muted uppercase tracking-[0.2em]">
               Source Problem
            </span>
            <p className="text-sm text-txt/80 italic leading-relaxed">"{project.problem}"</p>
          </div>
          <div className="flex flex-col gap-2 p-5 rounded-sm bg-primary/[0.03] border border-primary/20">
            <span className="flex items-center gap-2 text-[10px] txt-mono font-bold text-primary uppercase tracking-[0.2em]">
               System Outcome
            </span>
            <p className="text-sm font-bold text-txt leading-relaxed">{project.outcome}</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-sm bg-bg border border-border text-[10px] txt-mono font-bold text-muted/80 uppercase tracking-tighter group-hover:border-primary/30 transition-colors">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function Projects({ variant = 'section', projects }: { variant?: 'section' | 'page'; projects?: Project[] }) {
  const allProjects = projects || PROJECTS
  const flagshipProject = allProjects.find(p => p.title === 'EquityLens')
  const otherProjects = variant === 'page'
    ? allProjects.filter(p => p.title !== 'EquityLens')
    : allProjects.filter(p => p.title !== 'EquityLens').slice(0, 4)

  return (
    <section id="projects" className={`${variant === 'page' ? 'pt-32 pb-20' : 'py-32'} bg-bg relative overflow-hidden`}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container-aligned relative">
        {flagshipProject && (
          <div className="mb-20">
            <ProjectCard project={flagshipProject} isFlagship={true} index={0} />
          </div>
        )}

        <div className="space-y-12">
          {variant !== 'page' && (
            <div className="h-px w-full bg-border/40" />
          )}
          
          <div className="grid grid-cols-1 gap-px bg-border border border-border">
            {otherProjects.map((proj, i) => (
              <div key={proj.id} className="bg-bg">
                <ProjectCard 
                  project={proj} 
                  index={flagshipProject ? i + 1 : i} 
                />
              </div>
            ))}
          </div>
        </div>

        {variant === 'section' && (
          <div className="mt-20 flex justify-center">
            <Link
              to="/projects"
              className="group relative flex items-center gap-4 px-10 py-5 bg-surface border border-border text-txt font-bold txt-mono text-xs uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-all overflow-hidden rounded-sm"
            >
              <span className="relative z-10">Access Full Repository</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform relative z-10" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}