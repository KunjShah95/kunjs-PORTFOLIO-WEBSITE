import { motion } from 'framer-motion'
import { Users, Eye, TrendingUp } from 'lucide-react'
import { AnimatedCounter } from './AnimatedCounter'

const metrics = [
  {
    icon: Users,
    value: 74,
    suffix: '+',
    label: 'Users',
    sublabel: 'active users',
  },
  {
    icon: Eye,
    value: 169,
    suffix: '+',
    label: 'Page Views',
    sublabel: 'monthly visits',
  },
  {
    icon: TrendingUp,
    value: 3,
    label: 'Traffic Sources',
    sublabel: 'organic · direct · referral',
  },
]

export function MetricsDashboard() {
  return (
    <section className="py-20 bg-bg">
      <div className="container-aligned">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-display font-semibold text-txt mb-12 text-center"
        >
          Impact
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <metric.icon className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted">{metric.label}</span>
              </div>
              <p className="text-4xl font-bold text-txt mb-1">
                <AnimatedCounter value={metric.value} suffix={metric.suffix || ''} />
              </p>
              <p className="text-sm text-muted">{metric.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}