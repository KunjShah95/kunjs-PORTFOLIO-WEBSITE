import { motion } from 'framer-motion'
import { Microscope, Plus, ArrowUpRight } from 'lucide-react'

export function ResearchLabs() {
  const experiments = [
    {
      id: 'L01',
      title: 'Synthetic Memory',
      status: 'Stable',
      desc: 'Architecture for recursive state persistence in non-deterministic agent clusters.',
      stack: ['Redis', 'Vector DB'],
    },
    {
      id: 'L02',
      title: 'Neural Protocol',
      status: 'Beta',
      desc: 'Standardized handshake logic for multi-modal cross-agent task synchronization.',
      stack: ['gRPC', 'Protobuf'],
    }
  ]

  return (
    <section id="labs" className="section-padding bg-bg relative overflow-hidden">
      <div className="container-aligned space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted text-sm font-medium">
              <Microscope className="w-4 h-4" />
              Research
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-txt">
              Research Labs
            </h2>
          </div>
          <span className="text-sm text-muted font-medium">{experiments.length} experiments</span>
        </div>

        {/* Experiments */}
        <div className="grid grid-cols-1 gap-4">
          {experiments.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group rounded-xl border border-border bg-surface hover:border-primary/30 hover:bg-surfaceHighlight transition-all duration-200 overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-0">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted/50">{exp.id}</span>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${
                      exp.status === 'Stable'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-primary/10 text-primary border-primary/20'
                    }`}>
                      {exp.status}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-semibold text-txt group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">{exp.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map(s => (
                      <span key={s} className="text-xs font-medium text-muted bg-bg border border-border px-2.5 py-1 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t sm:border-t-0 sm:border-l border-border p-6 flex items-center justify-center">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary text-sm font-medium transition-all"
                  >
                    Explore
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* New Experiment Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-dashed border-border hover:border-primary/30 p-8 flex flex-col items-center justify-center text-center space-y-2 transition-all cursor-pointer group"
        >
          <div className="p-2 rounded-full bg-surfaceHighlight group-hover:bg-primary/10 transition-colors">
            <Plus className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm font-medium text-muted group-hover:text-txt transition-colors">
            New experiment in progress
          </p>
          <p className="text-xs text-muted/60">Check back soon</p>
        </motion.div>
      </div>
    </section>
  )
}
