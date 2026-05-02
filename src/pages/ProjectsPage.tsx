import { Projects } from '../components/Projects'
import { SEO } from '../components/SEO'
import { motion } from 'framer-motion'

export function ProjectsPage() {
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
      >
        <Projects />
      </motion.div>
    </div>
  )
}
