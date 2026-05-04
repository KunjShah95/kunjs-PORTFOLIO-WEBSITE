import { motion } from 'framer-motion'
import { ArrowRight, Github, ExternalLink, Zap, Activity, Info, Trophy } from 'lucide-react'
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
  const highImpactTitles = ['EquityLens', 'GAP Miner', 'SENTINEL CLI', 'SmartFlow AI']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={cardRevealTransition(index)}
      className={`group relative flex flex-col gap-5 p-6 rounded-xl border border-border bg-surface hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md ${
        isFlagship ? 'md:p-8 border-primary/20 bg-gradient-to-br from-surface to-primary/[0.02]' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1.5">
          <span className="flex items-center gap-1.5 text-[10px] text-primary uppercase font-bold tracking-widest">
            <Zap className="w-3 h-3" />
            {project.category}
            {highImpactTitles.includes(project.title) && (
              <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-1 border border-primary/20 text-[9px]">HIGH IMPACT</span>
            )}
          </span>
          <h3 className={`font-display font-bold text-txt group-hover:text-primary transition-colors ${
            isFlagship ? 'text-2xl sm:text-3xl' : 'text-xl'
          }`}>
            {project.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-bg border border-border hover:border-primary/50 text-muted hover:text-primary transition-all">
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-bg border border-border hover:border-primary/50 text-muted hover:text-primary transition-all">
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <p className="text-muted text-sm leading-relaxed max-w-2xl">
        {project.desc}
      </p>

      {hasProblem && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="flex flex-col gap-1 p-3 rounded-lg bg-bg/50 border border-border/50">
            <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-orange-400/80 uppercase">
              <Info className="w-3 h-3" /> Problem
            </span>
            <p className="text-xs text-muted/90 italic leading-snug">"{project.problem}"</p>
          </div>
          <div className="flex flex-col gap-1 p-3 rounded-lg bg-primary/[0.03] border border-primary/10">
            <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-primary uppercase">
              <Trophy className="w-3 h-3" /> Impact
            </span>
            <p className="text-xs font-medium text-txt/90 leading-snug">{project.outcome}</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded bg-bg border border-border text-[10px] font-mono text-muted uppercase tracking-wider group-hover:border-primary/20 transition-colors">
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
  const otherProjects = variant === 'page' && !projects
    ? allProjects.filter(p => p.title !== 'EquityLens')
    : allProjects.filter(p => p.title !== 'EquityLens').slice(0, 4)

  return (
    <section id="projects" className={`${variant === 'page' ? 'pt-32 pb-20' : 'py-24'} bg-bg relative overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-border/30 hidden lg:block" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-border/30 hidden lg:block" />
      
      <div className="container-aligned relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="px-2 py-1 bg-primary/10 border border-primary/20 rounded text-[10px] font-mono text-primary font-bold uppercase tracking-widest">
                02 / PROJECTS
              </div>
              <div className="h-px w-8 bg-border" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-txt">
              Engineered <span className="text-primary">Impact</span>
            </h2>
            <p className="text-muted text-lg max-w-xl">
              From automated skill gap analysis to healthcare fairness auditing.
            </p>
          </div>
          <span className="text-[11px] font-mono text-muted/60 uppercase tracking-[0.3em] font-bold">
            [{allProjects.length} RECORDS TOTAL]
          </span>
        </div>

        {flagshipProject && (
          <div className="mb-12">
            <div className="flex items-center gap-2 text-primary text-[10px] font-mono font-bold uppercase tracking-widest mb-4">
              <Zap className="w-3.5 h-3.5" />
              Primary Focus
            </div>
            <ProjectCard project={flagshipProject} isFlagship={true} index={0} />
          </div>
        )}

        <div className="space-y-6">
          {variant !== 'page' && (
            <div className="flex items-center gap-3 text-muted text-[10px] font-mono font-bold uppercase tracking-widest pt-4">
              <Activity className="w-3.5 h-3.5" />
              Extended Portfolio
              <div className="h-px flex-1 bg-border/40" />
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-6">
            {otherProjects.map((proj, i) => (
              <ProjectCard 
                key={proj.id} 
                project={proj} 
                index={flagshipProject ? i + 1 : i} 
              />
            ))}
          </div>
        </div>

        {variant === 'section' && (
          <div className="mt-12 flex justify-center">
            <Link
              to="/projects"
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-surface border border-border text-txt font-bold hover:border-primary/50 hover:bg-surfaceHighlight transition-all shadow-sm"
            >
              View Full Archive
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}