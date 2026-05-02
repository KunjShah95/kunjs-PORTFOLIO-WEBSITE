import { Contact } from '../components/Contact'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'

export function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <SEO 
        title="Hire & Consult | AI Systems Engineering"
        description="Initiate contact for high-stakes AI engineering projects, autonomous agent development, and technical consulting with Kunj Shah."
        url="https://kunjshah.vercel.app/contact"
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Contact />
      </motion.div>
    </div>
  )
}
