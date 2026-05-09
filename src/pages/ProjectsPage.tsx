import { useState, useMemo } from 'react'
import { Projects } from '../components/Projects'
import { ProjectFilters } from '../components/ProjectFilters'
import { PROJECTS } from '../data/portfolio'
import { SEO } from '../components/SEO'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Cpu, Trophy } from 'lucide-react'

export function ProjectsPage() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesFilter = filter === 'all' || project.category?.includes(filter) || 
        (filter === 'AI_ML' && (project.category?.includes('ML') || project.category?.includes('INTELLIGENCE'))) ||
        (filter === 'Agents' && project.category?.includes('AGENT')) ||
        (filter === 'Computer Vision' && project.category?.includes('VISION')) ||
        (filter === 'Full Stack' && project.category?.includes('FULL STACK')) ||
        (filter === 'Automation' && project.category?.includes('AUTOMATION'))
      
      if (!matchesFilter) return false
      
      if (search) {
        const searchLower = search.toLowerCase()
        const matchesTitle = project.title.toLowerCase().includes(searchLower)
        const matchesDesc = project.desc.toLowerCase().includes(searchLower)
        const matchesTech = project.tech?.some((t) => t.toLowerCase().includes(searchLower))
        return matchesTitle || matchesDesc || matchesTech
      }
      return true
    })
  }, [filter, search])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <SEO 
        title="AI Engineering Projects & Case Studies"
        description="Deep dive into production-grade AI systems, autonomous agents, and computer vision pipelines engineered by Kunj Shah. View source code and architecture."
        url="https://kunjshah.vercel.app/projects"
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-txt">Projects</h1>
          <p className="text-muted">{filteredProjects.length} projects</p>
        </div>

        <ProjectFilters 
          onFilterChange={setFilter}
          onSearchChange={setSearch}
        />

        <Projects variant="page" projects={filteredProjects} />

        {/* Hackathons & Labs Subsections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-border/50">
          <Link
            to="/hackathons"
            className="group p-5 rounded-xl bg-surface border border-border hover:border-primary/40 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Trophy className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-txt group-hover:text-primary transition-colors">Hackathons</h3>
                <p className="text-[11px] text-muted">Competitions & wins</p>
              </div>
            </div>
            <p className="text-xs text-muted">View hackathon projects, challenges tackled, and awards earned in timed AI/ML competitions.</p>
          </Link>
          <Link
            to="/labs"
            className="group p-5 rounded-xl bg-surface border border-border hover:border-primary/40 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-txt group-hover:text-primary transition-colors">Research Labs</h3>
                <p className="text-[11px] text-muted">Experimental projects</p>
              </div>
            </div>
            <p className="text-xs text-muted">Explore experimental AI research, side projects, and ongoing laboratory work.</p>
          </Link>
        </div>

        {/* Page Navigation */}
        <nav className="flex items-center justify-between pt-8 border-t border-border/50">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-border text-txt text-sm font-semibold hover:bg-surfaceHighlight hover:border-primary/40 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            About
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-border text-txt text-sm font-semibold hover:bg-surfaceHighlight hover:border-primary/40 transition-all group"
          >
            Contact
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </nav>
      </motion.div>
    </div>
  )
}
