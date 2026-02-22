import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { IDENTITY } from '../data/portfolio'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [imageError, setImageError] = useState(false)
  const [isLoaded] = useState(true)

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-bg"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="relative z-10 container-aligned w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 lg:py-24">
        {/* Left: Content */}
        <div className="flex flex-col space-y-8 order-2 lg:order-1">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              Available for new projects
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-txt leading-[1.1]">
              Kunj Shah
            </h1>
            <p className="text-xl sm:text-2xl text-primary font-semibold">
              AI Engineer & Agent Builder
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted leading-relaxed max-w-lg"
          >
            Building end-to-end AI systems, autonomous agents, and intelligent automation workflows that solve real business problems.
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-2"
          >
            {['Full Stack AI', 'LLM Agents', 'Automation', 'React & TypeScript'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-md bg-surfaceHighlight border border-border text-sm text-muted font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm shadow-primary/30"
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-border text-txt font-semibold text-sm hover:bg-surfaceHighlight transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Right: Photo */}
        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px]"
          >
            {/* Card background */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20" />

            {/* Photo */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border shadow-xl">
              {IDENTITY.profile_photo && !imageError ? (
                <img
                  src={IDENTITY.profile_photo}
                  alt={IDENTITY.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surfaceHighlight text-5xl font-bold text-primary/30">
                  KS
                </div>
              )}
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 bg-surface border border-border rounded-xl px-4 py-3 shadow-lg hidden sm:block"
            >
              <div className="text-[10px] text-muted font-medium mb-0.5">Currently</div>
              <div className="text-sm font-semibold text-txt">Open to Work</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-border flex items-center justify-center"
        >
          <div className="w-1 h-2 bg-muted rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

