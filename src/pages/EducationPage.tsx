import { Education } from '../components/Education'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'

export function EducationPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <SEO 
        title="Education"
        description="Kunj Shah's academic background and educational achievements in Computer Science and Engineering."
        url="https://kunjshah.vercel.app/education"
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Education />
      </motion.div>
    </div>
  )
}
