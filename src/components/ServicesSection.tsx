import { motion } from 'framer-motion'
import { BentoGrid, BentoCard } from './bento'
import { Cpu, Globe, Lightbulb, Server } from 'lucide-react'

const SERVICES = [
  {
    icon: Cpu,
    title: 'AI Agents & Automations',
    desc: 'LangChain, LLM orchestration, retrieval pipelines, autonomous workflows — production-ready.',
  },
  {
    icon: Globe,
    title: 'Web Apps & APIs',
    desc: 'React, Next.js, FastAPI, Tailwind. Full-stack apps shipped in weeks, not months.',
  },
  {
    icon: Lightbulb,
    title: 'Prototypes & MVPs',
    desc: 'From whiteboard to working demo in days. Test your idea before committing to production.',
  },
  {
    icon: Server,
    title: 'Infra & Backend',
    desc: 'Postgres, Docker, cloud deployment, CI/CD. The boring tech that keeps things running.',
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 border-b border-rule/12">
      <div className="max-w-manifest mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="kicker">What I Ship</div>
          <h2 className="display text-4xl md:text-5xl mt-3 max-w-3xl">
            You describe it, I build it.
          </h2>
        </motion.div>
        <BentoGrid cols={4}>
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <BentoCard variant="elevated" className="p-6 md:p-8">
                  <Icon className="w-6 h-6 text-accent mb-4" strokeWidth={1.5} />
                  <h3 className="display text-xl mb-2">{s.title}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{s.desc}</p>
                </BentoCard>
              </motion.div>
            )
          })}
        </BentoGrid>
      </div>
    </section>
  )
}
