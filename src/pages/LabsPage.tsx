import { ResearchLabs } from '../components/ResearchLabs'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'

export function LabsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <SEO 
        title="Research Labs"
        description="Explore Kunj Shah's experimental research labs and cutting-edge AI prototypes."
        url="https://kunjshah.vercel.app/labs"
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ResearchLabs />
      </motion.div>
    </div>
  )
}
