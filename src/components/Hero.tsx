import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowRight, Sparkles, Activity, Zap, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IDENTITY, PROJECTS } from '../data/portfolio'
import { heroVariants, DURATION, EASE_OUT } from '../lib/motion'

function MetricBadge({ icon: Icon, value, label }: { icon: any, value: string, label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg border border-border">
      <Icon className="w-4 h-4 text-primary" />
      <div>
        <span className="text-sm font-bold text-txt">{value}</span>
        <span className="text-xs text-muted ml-1">{label}</span>
      </div>
    </div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [imageError, setImageError] = useState(false)

  const projectCount = PROJECTS.length

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-bg"
    >
      <div className="absolute inset-0 pointer-events-none dot-grid opacity-[0.35] dark:opacity-[0.25]" />

      <div className="relative z-10 container-aligned w-full grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-16 items-center py-20 lg:py-28">
        <motion.div
          className="flex flex-col space-y-8 order-2 lg:order-1 lg:pr-4"
          variants={heroVariants.container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={heroVariants.item}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden />
              Freelancing · AI Engineer · Agent Builder
            </span>
          </motion.div>

          <motion.div variants={heroVariants.item} className="space-y-4">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted">
              {IDENTITY.location}
            </p>
            <h1 className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-[1.08] text-txt tracking-[-0.02em]">
              {IDENTITY.name}
            </h1>
            <p className="text-xl sm:text-2xl text-primary font-medium font-display">
              I don't just build AI. I build AI that actually works in the real world.
            </p>
          </motion.div>

          <motion.p
            variants={heroVariants.item}
            className="text-base text-muted leading-relaxed max-w-xl"
          >
            Most AI systems fail in production. I've spent the last 3 years building ones that don't — from bias detection in healthcare AI to real-time crowd analytics. Every project solves a real problem.
          </motion.p>

          <motion.div variants={heroVariants.item} className="flex flex-wrap gap-3">
            <MetricBadge icon={Activity} value="11" label="projects" />
            <MetricBadge icon={Zap} value="23%" label="bias detected" />
            <MetricBadge icon={TrendingUp} value="99.9%" label="uptime" />
          </motion.div>

          <motion.div variants={heroVariants.item} className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary text-white font-bold text-base hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              See My Work
              <ArrowRight className="w-5 h-5" aria-hidden />
            </Link>
            <Link
              to="/labs"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border text-txt font-semibold text-sm hover:bg-surfaceHighlight transition-colors"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              Try Live Demos
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border text-txt font-semibold text-sm hover:bg-surfaceHighlight transition-colors"
            >
              Let's Talk
            </Link>
          </motion.div>

          <motion.div variants={heroVariants.item} className="pt-4">
            <Link to="/projects" className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-1">
              Explore all {projectCount} projects → <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div
            variants={heroVariants.photo}
            initial="hidden"
            animate="show"
            className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[min(100%,420px)] lg:h-[420px] lg:aspect-square"
          >
            <div className="absolute inset-0 rounded-2xl ring-1 ring-border bg-surface" />

            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border shadow-xl">
              {IDENTITY.profile_photo && !imageError ? (
                <img
                  src={IDENTITY.profile_photo}
                  alt={IDENTITY.name}
                  width={420}
                  height={420}
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surfaceHighlight font-display text-6xl font-semibold text-primary/25">
                  KS
                </div>
              )}
            </div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-3 -left-2 sm:-left-4 glass-panel rounded-xl px-4 py-3 shadow-lg"
            >
              <div className="text-[10px] text-muted font-semibold uppercase tracking-wider mb-0.5">Status</div>
              <div className="text-sm font-semibold text-txt">Freelancing &amp; open roles</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: DURATION.normal, ease: EASE_OUT }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-border flex items-center justify-center"
        >
          <div className="w-1 h-2 bg-muted rounded-full" />
        </motion.div>
        <span className="text-xs text-muted">See what I built ↓</span>
      </motion.div>
    </section>
  )
}
