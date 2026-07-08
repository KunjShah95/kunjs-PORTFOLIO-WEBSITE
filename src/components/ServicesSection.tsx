import { motion } from 'framer-motion'
import { Cpu, Globe, Lightbulb, Server } from 'lucide-react'

const SERVICES = [
  {
    icon: Cpu,
    title: 'AI Agents & Automations',
    desc: 'LangChain, LLM orchestration, retrieval pipelines, autonomous workflows — production-ready.',
    span: 'md:col-span-2',
  },
  {
    icon: Globe,
    title: 'Web Apps & APIs',
    desc: 'React, Next.js, FastAPI, Tailwind. Full-stack apps shipped in weeks, not months.',
    span: 'md:col-span-1',
  },
  {
    icon: Lightbulb,
    title: 'Prototypes & MVPs',
    desc: 'From whiteboard to working demo in days. Test your idea before committing to production.',
    span: 'md:col-span-1',
  },
  {
    icon: Server,
    title: 'Infra & Backend',
    desc: 'Postgres, Docker, cloud deployment, CI/CD. The boring tech that keeps things running.',
    span: 'md:col-span-2',
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 md:py-32 border-b border-rule/12 overflow-hidden bg-sunken/20">

      <div className="relative z-10 max-w-manifest mx-auto px-6">
        <div className="mb-16">
          <span className="kicker">What I ship</span>
          <h2 className="display text-4xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
            You describe it, I build it.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule/10 rounded-2xl overflow-hidden border border-rule/12">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className={`${s.span} bg-paper`}
              >
                <div className="h-full p-8 md:p-10 flex flex-col gap-5 group hover:bg-elevated transition-colors duration-300">
                  <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight mb-2">{s.title}</h3>
                    <p className="text-sm text-ink-secondary leading-relaxed font-body">{s.desc}</p>
                  </div>
                  <div className="mt-auto w-8 h-px bg-accent/30 group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
