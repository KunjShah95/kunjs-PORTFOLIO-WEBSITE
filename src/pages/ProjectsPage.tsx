import { useState, useMemo } from 'react'
import { Projects } from '../components/Projects'
import { ProjectFilters } from '../components/ProjectFilters'
import { PROJECTS } from '../data/portfolio'
import { SEO } from '../components/SEO'
import { motion } from 'framer-motion'

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
        className="space-y-8"
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
      </motion.div>
    </div>
  )
}
