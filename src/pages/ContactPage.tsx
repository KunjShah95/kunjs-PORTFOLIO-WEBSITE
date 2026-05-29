import { Contact } from '../components/Contact'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
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
        className="space-y-12"
      >
        <h1 className="sr-only">Contact Kunj Shah — AI Engineering & Consulting</h1>
        <Contact />

        {/* Page Navigation */}
        <nav className="flex items-center justify-between pt-12 border-t border-border/50">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-border text-txt text-sm font-semibold hover:bg-surfaceHighlight hover:border-primary/40 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Projects
          </Link>
          <div />
        </nav>
      </motion.div>
    </div>
  )
}
