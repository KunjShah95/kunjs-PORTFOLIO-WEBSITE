import { motion } from 'framer-motion'
import { Users, Eye, MousePointerClick, BarChart3, ArrowUpRight, Smartphone, Monitor } from 'lucide-react'

export function MetricsSection() {
  return (
    <section className="section-padding bg-paper relative">
      <div className="absolute inset-0 tech-grid-layer opacity-20" />
      
      <div className="container-aligned relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-5 h-5 text-accent" />
            <span className="text-sm font-mono text-ink-secondary uppercase tracking-[0.2em] font-semibold">Analytics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink-primary mb-4">
            Platform <span className="text-accent">Impact</span>
          </h2>
          <p className="text-lg text-ink-secondary max-w-2xl">
            Real-time usage metrics and performance data of my deployed ecosystem.
          </p>
        </motion.div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Top KPI Cards */}
          <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Visitors", value: "104+", trend: "+45%", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
              { label: "Page Views", value: "244+", trend: "+52%", icon: Eye, color: "text-purple-400", bg: "bg-purple-500/10" },
              { label: "Exploration", value: "2.3 p/u", trend: "+15%", icon: BarChart3, color: "text-green-400", bg: "bg-green-500/10" },
              { label: "Retention", value: "38%", trend: "+5.2%", icon: MousePointerClick, color: "text-cyan-400", bg: "bg-cyan-500/10" }
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl bg-elevated border border-rule/12 shadow-sm flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${kpi.bg}`}>
                    <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                  <span className="flex items-center text-xs font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    {kpi.trend}
                  </span>
                </div>
                <div className="mt-auto">
                  <h4 className="text-3xl font-display font-bold text-ink-primary mb-1">{kpi.value}</h4>
                  <p className="text-sm font-medium text-ink-secondary uppercase tracking-wide">{kpi.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Device Split & Traffic Sources */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traffic Sources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-xl bg-elevated border border-rule/12 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-ink-primary mb-6 uppercase tracking-wider">Traffic Sources</h3>
              <div className="space-y-5">
                {[
                  { source: "LinkedIn", percent: 58, value: "58", color: "bg-accent" },
                  { source: "Direct", percent: 25, value: "26", color: "bg-blue-400" },
                  { source: "GitHub", percent: 12, value: "12", color: "bg-purple-400" },
                  { source: "Others", percent: 5, value: "5", color: "bg-cyan-400" }
                ].map((item) => (
                  <div key={item.source}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-ink-primary">{item.source}</span>
                      <span className="text-ink-secondary font-mono">{item.percent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-paper border border-rule/50 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full rounded-full ${item.color}`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Device Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-xl bg-elevated border border-rule/12 shadow-sm flex flex-col"
            >
              <h3 className="text-sm font-semibold text-ink-primary mb-6 uppercase tracking-wider">Device Breakdown</h3>
              <div className="flex-1 flex flex-col justify-center gap-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-lg font-semibold text-ink-primary">Mobile</span>
                      <span className="text-2xl font-bold font-mono text-ink-primary">63%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-paper border border-rule/50">
                      <div className="h-full w-[63%] rounded-full bg-blue-400" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-accent/10 text-accent">
                    <Monitor className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-lg font-semibold text-ink-primary">Desktop</span>
                      <span className="text-2xl font-bold font-mono text-ink-primary">37%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-paper border border-rule/50">
                      <div className="h-full w-[37%] rounded-full bg-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}
