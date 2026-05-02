import { motion } from 'framer-motion'
import { GitPullRequest, Code2, RefreshCw } from 'lucide-react'

const steps = [
  {
    icon: GitPullRequest,
    title: "1. Plan & Architect",
    desc: "Every system starts with a problem breakdown. I map out the data flows, identify bottlenecks, and design the AI architecture before writing a single line of code.",
    color: "text-blue-400",
    bg: "bg-blue-500/10"
  },
  {
    icon: Code2,
    title: "2. Build & Integrate",
    desc: "I assemble the building blocks—LLMs, RAG pipelines, API gateways, and agentic workflows—into a cohesive, production-ready full-stack application.",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: RefreshCw,
    title: "3. Optimize & Scale",
    desc: "Deployment is just the beginning. I implement observability, fine-tune models, and create continuous feedback loops to handle edge cases and scale.",
    color: "text-green-400",
    bg: "bg-green-500/10"
  }
]

export function HowIBuild() {
  return (
    <section className="section-padding bg-surface/30 relative border-y border-border">
      <div className="container-aligned">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-txt mb-4">
            How I Build <span className="text-primary">AI Systems</span>
          </h2>
          <p className="text-lg text-muted">
            A systematic engineering approach from initial problem definition to a reliable production deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className={`w-24 h-24 rounded-2xl ${step.bg} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-sm border border-border`}>
                <step.icon className={`w-10 h-10 ${step.color}`} />
              </div>
              <h3 className="text-xl font-bold text-txt mb-3">{step.title}</h3>
              <p className="text-muted leading-relaxed max-w-sm">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}