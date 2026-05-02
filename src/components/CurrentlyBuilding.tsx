import { motion } from 'framer-motion'
import { Rocket, Bot, Sparkles, Workflow } from 'lucide-react'

const currentFocus = [
  {
    title: "Multi-Agent Systems",
    desc: "Building autonomous systems where multiple specialized LLM agents collaborate to solve complex, multi-step goals.",
    icon: Bot,
    color: "text-primary"
  },
  {
    title: "Real-World LLM Apps",
    desc: "Moving beyond basic chat interfaces to build production-grade applications with RAG, function calling, and structured outputs.",
    icon: Sparkles,
    color: "text-blue-400"
  },
  {
    title: "AI Automation Tools",
    desc: "Developing scripts, CLIs, and background workers that use AI to automate repetitive workflows and data processing.",
    icon: Workflow,
    color: "text-green-400"
  }
]

export function CurrentlyBuilding() {
  return (
    <section className="section-padding bg-bg relative border-y border-border">
      <div className="container-aligned">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-mono font-semibold uppercase tracking-wider mb-6">
              <Rocket className="w-3.5 h-3.5" /> Active Focus
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-txt mb-6">
              Currently <span className="text-primary">Building</span>
            </h2>
            <p className="text-lg text-muted mb-8">
              I am constantly experimenting and pushing the boundaries of what is possible with applied AI. Right now, my core focus is on moving from single-prompt interactions to fully autonomous systems.
            </p>
          </motion.div>

          <div className="lg:col-span-7 grid gap-4">
            {currentFocus.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-surface border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-3 rounded-xl bg-bg border border-border mt-1">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-txt mb-2">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}