import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IDENTITY } from '../data/portfolio'
import { heroVariants, DURATION, EASE_OUT } from '../lib/motion'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [imageError, setImageError] = useState(false)

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-bg"
    >
      <div className="absolute inset-0 pointer-events-none dot-grid opacity-[0.45] dark:opacity-[0.35]" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-24 w-[min(520px,90vw)] h-[520px] rounded-full bg-primary/[0.07] blur-[100px]" />
        <div className="absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full bg-secondary/[0.06] blur-[90px]" />
        <div className="absolute top-12 left-[12%] h-px w-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent hidden lg:block" />
      </div>

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
              Freelancing · AI Engineer · Data / ML Engineer
            </span>
          </motion.div>

          <motion.div variants={heroVariants.item} className="space-y-4">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted">
              {IDENTITY.location}
            </p>
            <h1 className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-[1.08] text-txt tracking-[-0.02em]">
              {IDENTITY.name}
            </h1>
            <p className="text-xl sm:text-2xl text-primary font-medium font-display italic">
              AI Engineer &amp; Agent Builder
            </p>
          </motion.div>

          <motion.p
            variants={heroVariants.item}
            className="text-lg text-muted leading-relaxed max-w-xl border-l-2 border-primary/35 pl-5"
          >
            Building end-to-end AI systems, autonomous agents, and intelligent automation workflows that solve real
            business problems.
          </motion.p>

          <motion.div variants={heroVariants.item} className="flex flex-wrap gap-2">
            {IDENTITY.focus.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-md bg-surface border border-border text-sm text-muted font-medium"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div variants={heroVariants.item} className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary text-white font-bold text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              View My Projects
              <ArrowRight className="w-5 h-5" aria-hidden />
            </Link>
            <div className="flex gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border text-txt font-semibold text-sm hover:bg-surfaceHighlight transition-colors"
              >
                Let's Talk
              </Link>
              <Link
                to="/labs"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border text-txt font-semibold text-sm hover:bg-surfaceHighlight transition-colors sm:flex"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                Labs
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div
            variants={heroVariants.photo}
            initial="hidden"
            animate="show"
            className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[min(100%,420px)] lg:h-[420px] lg:aspect-square"
          >
            <div
              className="absolute -inset-3 rounded-[1.35rem] bg-gradient-to-br from-primary/20 via-transparent to-secondary/15 opacity-80 blur-sm"
              aria-hidden
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5" />

            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border shadow-2xl shadow-black/10 dark:shadow-black/40">
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
              className="absolute -bottom-3 -left-2 sm:-left-4 glass-panel rounded-xl px-4 py-3 shadow-lg max-w-[200px]"
            >
              <div className="text-[10px] text-muted font-semibold uppercase tracking-wider mb-0.5">Status</div>
              <div className="text-sm font-semibold text-txt">Freelancing &amp; open roles</div>
            </motion.div>

            <div
              className="absolute -top-3 right-4 sm:right-8 px-3 py-1 rounded-md border border-border bg-surface/90 text-[10px] txt-mono text-muted uppercase tracking-widest hidden sm:block"
              aria-hidden
            >
              v.2026
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: DURATION.normal, ease: EASE_OUT }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 max-[380px]:hidden"
        aria-hidden
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
