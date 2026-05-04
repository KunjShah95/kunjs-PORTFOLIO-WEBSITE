import { motion } from 'framer-motion'
import { Target, Zap, Code2, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const DIFFERENTIATORS = [
  {
    icon: Target,
    title: "Ship-First Mentality",
    description: "I transform experimental AI concepts into production-grade deployments. My focus is on scalability, security, and real-world utility."
  },
  {
    icon: Zap,
    title: "Agentic Orchestration",
    description: "AI is more than a prompt. I architect systems with long-term memory, self-correction, and multi-agent coordination to handle high-entropy business logic."
  },
  {
    icon: Code2,
    title: "Production-Ready Architecture",
    description: "Intelligence requires infrastructure. I build using modern stacks (React, FastAPI, Docker) that are audit-ready, documented, and performance-optimized."
  },
  {
    icon: TrendingUp,
    title: "ROI-Driven Development",
    description: "I don't just write code; I solve bottlenecks. Whether it's reducing 40+ hours of manual work or optimizing API costs by 65%, impact is my primary metric."
  }
]

export function WhyMe() {
  return (
    <section className="section-padding bg-bg relative">
      <div className="absolute inset-0 tech-grid-layer opacity-20" />
      
      <div className="container-aligned relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-txt mb-4">
            Why <span className="text-primary">Me</span>?
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Why choose to work with me? Here's my approach to building intelligent software.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIATORS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-xl bg-surface border border-border hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-txt mb-2">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-6 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-txt mb-1">Let's turn your idea into a working product.</h3>
              <p className="text-sm text-muted">Let's discuss your next big project</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
              Get In Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}