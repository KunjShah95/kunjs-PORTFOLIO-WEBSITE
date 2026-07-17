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
      className={`group relative flex flex-col gap-6 p-8 rounded-sm border border-rule/12 bg-elevated hover:border-accent/50 transition-all duration-500 ${
        isFlagship ? 'border-accent/30 bg-gradient-to-br from-surface to-accent/[0.03]' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-[0.2em]">
            {project.category}
          </span>
          <h3 className={`font-bold text-ink-primary group-hover:text-accent transition-colors leading-tight ${
            isFlagship ? 'text-3xl md:text-5xl font-display uppercase tracking-tight' : 'text-2xl uppercase tracking-wide'
          }`}>
            {project.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-sm bg-paper border border-rule/12 hover:border-accent/50 text-ink-secondary hover:text-accent transition-all" aria-label={`View ${project.title} source code on GitHub`}>
              <Github className="w-4 h-4" aria-hidden />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-3 rounded-sm bg-paper border border-rule/12 hover:border-accent/50 text-ink-secondary hover:text-accent transition-all" aria-label={`View ${project.title} live demo`}>
              <ExternalLink className="w-4 h-4" aria-hidden />
            </a>
          )}
        </div>
      </div>

      <p className="text-ink-secondary text-base leading-relaxed max-w-3xl">
        {project.desc}
      </p>

      {hasProblem && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 p-5 rounded-sm bg-paper border border-rule/60">
            <span className="flex items-center gap-2 text-[10px] font-mono font-bold text-ink-secondary uppercase tracking-[0.2em]">
               Source Problem
            </span>
            <p className="text-sm text-ink-primary/80 italic leading-relaxed">"{project.problem}"</p>
          </div>
          <div className="flex flex-col gap-2 p-5 rounded-sm bg-accent/[0.03] border border-accent/20">
            <span className="flex items-center gap-2 text-[10px] font-mono font-bold text-accent uppercase tracking-[0.2em]">
               System Outcome
            </span>
            <p className="text-sm font-bold text-ink-primary leading-relaxed">{project.outcome}</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-sm bg-paper border border-rule/12 text-[10px] font-mono font-bold text-ink-secondary/80 uppercase tracking-tighter group-hover:border-accent/30 transition-colors">
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
  const otherProjects = (variant === 'page'
    ? allProjects.filter(p => p.title !== 'EquityLens')
    : allProjects.filter(p => p.title !== 'EquityLens').slice(0, 4)
  ).sort((a, b) => {
    if (a.demo && !b.demo) return -1
    if (!a.demo && b.demo) return 1
    return 0
  })

  return (
    <section id="projects" className={`${variant === 'page' ? 'pt-32 pb-20' : 'py-32'} bg-paper relative overflow-hidden`}>
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
            <div className="h-px w-full bg-rule/40" />
          )}
          
          <div className="grid grid-cols-1 gap-px bg-rule border border-rule/12">
            {otherProjects.map((proj, i) => (
              <div key={proj.id} className="bg-paper">
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
              className="group relative flex items-center gap-4 px-10 py-5 bg-elevated border border-rule/12 text-ink-primary font-bold font-mono text-xs uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-all overflow-hidden rounded-sm"
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