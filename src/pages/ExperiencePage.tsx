import { Experience } from '../components/Experience'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'

export function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <SEO 
        title="Experience"
        description="Kunj Shah's professional experience in AI/ML engineering, software development, and research roles."
        url="https://kunjshah.vercel.app/experience"
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Experience />
      </motion.div>
    </div>
  )
}
