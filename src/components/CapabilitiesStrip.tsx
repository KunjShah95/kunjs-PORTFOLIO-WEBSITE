import { motion } from 'framer-motion'
import { Brain, Database, FlaskConical, Rocket } from 'lucide-react'
import { heroVariants } from '../lib/motion'

const ITEMS = [
  {
    icon: Brain,
    title: 'LLM & agents',
    caption: 'RAG · tool use · orchestration',
  },
  {
    icon: Database,
    title: 'Data & ML',
    caption: 'Pipelines · features · training',
  },
  {
    icon: FlaskConical,
    title: 'Eval & quality',
    caption: 'Benchmarks · guardrails',
  },
  {
    icon: Rocket,
    title: 'Ship & scale',
    caption: 'APIs · deploy · observability',
  },
] as const

export function CapabilitiesStrip() {
  return (
    <motion.div
      variants={heroVariants.item}
      className="w-full max-w-2xl"
      role="list"
      aria-label="Core capabilities"
    >
      <div className="glass-panel rounded-2xl px-3 py-3 sm:px-4 sm:py-4 shadow-sm shadow-black/[0.08] dark:shadow-black/30">
        <div className="flex items-center justify-between gap-4 mb-3">
          <p className="text-[10px] txt-mono uppercase tracking-[0.24em] text-muted">Capabilities</p>
          <span className="h-px flex-1 bg-gradient-to-r from-border/80 via-border/40 to-transparent" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {ITEMS.map(({ icon: Icon, title, caption }) => (
            <div
              key={title}
              role="listitem"
              className="group rounded-xl border border-border bg-bg/40 hover:bg-surfaceHighlight/70 hover:border-primary/25 transition-[border-color,background-color,transform] duration-300 p-3 sm:p-3.5 flex flex-col gap-2 min-h-[96px]"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-txt leading-snug tracking-[-0.01em]">
                  {title}
                </div>
                <div className="text-[11px] text-muted leading-snug mt-1 break-words">
                  {caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
