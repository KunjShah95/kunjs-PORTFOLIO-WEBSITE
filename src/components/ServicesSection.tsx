import { motion } from 'framer-motion'
import { Cpu, Globe, Lightbulb, Server } from 'lucide-react'

const SERVICES = [
  {
    icon: Cpu,
    title: 'AI Agents & Automations',
    desc: 'LangChain, LLM orchestration, retrieval pipelines, autonomous workflows production-ready.',
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

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } }
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
          className="mb-14"
        >
          <h2 className="display text-4xl md:text-5xl leading-[1.05] max-w-3xl font-semibold">
            What I build.
          </h2>
          <p className="mt-3 text-base text-ink-secondary max-w-2xl leading-relaxed">
            You describe the problem. I ship the solution. From autonomous agents to deployment infrastructure.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className={`${s.span}`}
              >
                <div className="card-premium h-full p-6 md:p-8 flex flex-col gap-4 group">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 text-accent">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-tight mb-1.5">{s.title}</h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
