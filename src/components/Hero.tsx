import { motion } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { trackEvent, ANALYTICS_EVENTS } from '../lib/analytics'

const TECH_TAGS = [
  'Python', 'TypeScript', 'React', 'LangChain', 'PyTorch', 'FastAPI',
  'PostgreSQL', 'Docker', 'LLM', 'Node.js', 'CrewAI', 'OpenCV'
]

export function Hero() {
  return (
    <section className="relative min-h-[94vh] bg-bg overflow-hidden flex items-center pt-8">
      <div className="absolute inset-0 tech-grid-layer" />
      <div className="absolute inset-0 grain-overlay" />
      
      <div className="relative z-10 container-aligned w-full">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
          {/* LEFT: Who you are + CTA */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-muted">Available for hire</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-txt leading-tight tracking-tight mb-3"
            >
              Kunj Shah
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="text-lg sm:text-xl text-primary font-semibold mb-3"
            >
              AI Engineer · Autonomous Systems
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="text-base text-muted max-w-xl mb-5 leading-relaxed"
            >
              I build production-grade AI agents and intelligent systems that replace manual workflows and deliver measurable ROI. 
              Python, LangChain, FastAPI, and agentic reasoning are my stack.
            </motion.p>

            {/* Skills as compact tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="flex flex-wrap gap-1.5 mb-6"
            >
              {TECH_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-surface border border-border rounded text-[11px] font-mono text-muted"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <Link
                to="/contact"
                onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_HERO_PRIMARY)}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] active:scale-[0.98]"
              >
                Hire Me
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-surface border border-border text-txt font-semibold text-sm hover:bg-surfaceHighlight transition-colors shadow-sm active:scale-[0.98]"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Profile Image */}
          <div className="w-full lg:w-[400px] shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-xl opacity-60" />
              <img
                src="/image.png"
                alt="Kunj Shah"
                className="relative w-full h-auto rounded-xl border border-border/50 shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}