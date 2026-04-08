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
      <p className="text-[10px] txt-mono uppercase tracking-[0.2em] text-muted mb-3">Capabilities</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {ITEMS.map(({ icon: Icon, title, caption }) => (
          <div
            key={title}
            role="listitem"
            className="rounded-lg border border-border/90 bg-surface/60 backdrop-blur-sm px-2.5 py-2.5 sm:px-3 sm:py-3 flex gap-2.5 items-start transition-colors duration-200 hover:border-primary/25 hover:bg-surfaceHighlight/80"
          >
            <span className="shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary border border-primary/20">
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold text-txt leading-snug">{title}</span>
              <span className="block text-[10px] text-muted leading-tight mt-0.5 line-clamp-2">{caption}</span>
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
