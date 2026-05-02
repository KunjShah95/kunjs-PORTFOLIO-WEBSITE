import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, FileText } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="py-24 bg-bg relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 tech-grid-layer opacity-40" />
      
      <div className="container-aligned relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-12 md:p-16 rounded-3xl bg-surface border border-border text-center shadow-lg shadow-primary/5 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

          <h2 className="text-4xl md:text-5xl font-display font-bold text-txt mb-6 relative z-10">
            Let's build something <span className="text-primary">impactful</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-10 relative z-10">
            Whether you need a custom AI agent, a resilient ML pipeline, or an intelligent full-stack application, I'm ready to turn your concept into reality.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-bg border border-border text-txt font-semibold text-sm hover:bg-surfaceHighlight transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4" />
              View Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}