import { motion } from 'framer-motion'
import { FlaskConical, Lightbulb, TrendingUp, BookOpen } from 'lucide-react'

const RESEARCH_INTERESTS = [
  'Autonomous Agents',
  'Computer Vision',
  'LLM Orchestration',
  'MLOps',
]

const RESEARCH_UPDATES = [
  {
    title: 'New agent framework',
    description: 'Exploring multi-agent coordination patterns',
    date: 'This week',
  },
  {
    title: 'CV pipeline optimization',
    description: 'Reduced inference latency by 40%',
    date: 'Last week',
  },
]

export function ResearcherLive() {
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
              <FlaskConical className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-txt">Research & Experiments</h2>
              <p className="text-sm text-muted/60">Things I'm exploring and building</p>
            </div>
          </div>

          {/* Research Interests */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {RESEARCH_INTERESTS.map((interest, idx) => (
              <motion.div
                key={interest}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-xl bg-surface border border-border hover:border-primary/30 transition-colors"
              >
                <Lightbulb className="w-4 h-4 text-primary mb-2" />
                <div className="text-sm font-medium text-txt">{interest}</div>
              </motion.div>
            ))}
          </div>

          {/* Recent Updates */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">Recent Updates</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {RESEARCH_UPDATES.map((update, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="p-4 rounded-xl bg-surfaceHighlight/30 border border-border/50"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-primary font-medium">{update.date}</span>
                  </div>
                  <div className="text-sm font-semibold text-txt mb-1">{update.title}</div>
                  <div className="text-xs text-muted">{update.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}