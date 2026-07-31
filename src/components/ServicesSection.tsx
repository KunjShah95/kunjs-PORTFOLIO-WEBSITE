import { motion } from 'framer-motion'
import { Cpu, Globe, Lightbulb, Server, ArrowUpRight } from 'lucide-react'
import { SpotlightCard } from './effects/SpotlightCard'

interface Capability {
  icon: typeof Cpu
  title: string
  desc: string
  stack: string[]
  span: string
  /** feature cells get a tinted field so the bento is not white-on-white */
  feature?: boolean
}

const CAPABILITIES: Capability[] = [
  {
    icon: Cpu,
    title: 'AI agents & automation',
    desc: 'LLM orchestration, retrieval pipelines, and autonomous multi-agent workflows that run in production, not in a notebook.',
    stack: ['LangGraph', 'CrewAI', 'RAG', 'Guardrails'],
    span: 'md:col-span-4',
    feature: true,
  },
  {
    icon: Globe,
    title: 'Web apps & APIs',
    desc: 'Full-stack products shipped in weeks.',
    stack: ['React', 'FastAPI'],
    span: 'md:col-span-2',
  },
  {
    icon: Lightbulb,
    title: 'Prototypes & MVPs',
    desc: 'Whiteboard to working demo in days.',
    stack: ['Next.js', 'Supabase'],
    span: 'md:col-span-2',
  },
  {
    icon: Server,
    title: 'Infrastructure & backend',
    desc: 'The unglamorous systems that keep everything up: databases, containers, queues, CI/CD, and multi-provider LLM fallback.',
    stack: ['Postgres', 'Docker', 'Redis', 'CI/CD'],
    span: 'md:col-span-4',
    feature: true,
  },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } },
}

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 md:py-32 border-t border-rule/10">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="mb-14 max-w-2xl"
        >
          <h2 className="display text-4xl md:text-5xl leading-[1.05] font-semibold">
            What I build.
          </h2>
          <p className="mt-3 text-base text-ink-secondary leading-relaxed">
            You describe the problem. I ship the system. From autonomous agents to the
            deployment infrastructure that keeps them alive.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-6 gap-4"
        >
          {CAPABILITIES.map((c) => {
            const Icon = c.icon
            return (
              <motion.div key={c.title} variants={fadeUp} className={c.span}>
                <SpotlightCard className="group h-full rounded-2xl border border-rule/10 bg-elevated hover:border-accent/25 transition-colors">
                  {c.feature && (
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-accent/[0.07] via-transparent to-transparent"
                    />
                  )}
                  <div className="relative flex h-full flex-col p-6 md:p-8">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink-primary">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{c.desc}</p>
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                      {c.stack.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] text-ink-tertiary px-2 py-0.5 rounded-md bg-sunken/60 border border-rule/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.a
          href="/contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          Have something in mind? Let’s scope it
          <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.a>
      </div>
    </section>
  )
}
