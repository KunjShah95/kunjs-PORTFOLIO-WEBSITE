/**
 * NarrativeStory.tsx
 *
 * A full-page storytelling wrapper. Each chapter appears as the user scrolls,
 * giving the portfolio a cinematic, magazine-spread feeling.
 *
 * Usage: wrap any section content in <Chapter label="01" title="...">…</Chapter>
 */
import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface ChapterProps {
  label: string   // e.g. "01"
  title: string
  subtitle?: string
  accent?: 'primary' | 'secondary'
  children: ReactNode
  id?: string
  className?: string
}

/** Section number / label that animates in from the left margin */
function SectionLabel({ label, accent = 'primary' }: { label: string; accent?: 'primary' | 'secondary' }) {
  return (
    <div
      className="hidden lg:flex flex-col items-center gap-2 pt-1 select-none"
      aria-hidden
    >
      <span
        className="txt-mono text-[10px] uppercase tracking-[0.28em] font-bold"
        style={{ color: `rgb(var(--${accent === 'primary' ? 'primary' : 'secondary'}-rgb) / 0.55)` }}
      >
        {label}
      </span>
      <div
        className="w-px flex-1 min-h-[3rem] opacity-20"
        style={{ background: `linear-gradient(to bottom, rgb(var(--${accent === 'primary' ? 'primary' : 'secondary'}-rgb)), transparent)` }}
      />
    </div>
  )
}

export function Chapter({ label, title, subtitle, accent = 'primary', children, id, className = '' }: ChapterProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id={id}
      className={`section-padding bg-bg relative overflow-hidden ${className}`}
    >
      <div className="container-aligned">
        {/* Chapter header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-6 mb-12"
        >
          <SectionLabel label={label} accent={accent} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="origin-left h-px w-8 block"
                style={{ background: `rgb(var(--${accent === 'primary' ? 'primary' : 'secondary'}-rgb) / 0.7)` }}
              />
              <span className="txt-mono text-[10px] text-muted uppercase tracking-[0.22em]">
                {label} — {title}
              </span>
            </div>

            <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-txt tracking-[-0.025em] leading-[1.12]">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-muted text-lg leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </motion.div>

        {/* Chapter content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

/** A horizontal divider between chapters with a subtle narrative pulse */
export function ChapterDivider({ label }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="relative py-4 overflow-hidden bg-bg" aria-hidden>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="origin-left h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"
      />
      {label && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 txt-mono text-[9px] text-muted uppercase tracking-[0.3em] bg-bg px-4"
        >
          {label}
        </motion.span>
      )}
    </div>
  )
}
