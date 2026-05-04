import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Bot, Globe, Shield } from 'lucide-react'

export function AboutShort() {
  return (
    <section className="py-20 bg-surface">
      <div className="container-aligned max-w-2xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-display font-semibold text-txt mb-6 text-center"
        >
          About
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-muted leading-relaxed text-center mb-8"
        >
          I build autonomous systems that bridge the gap between AI research and production reality. 
          My work spans from auditing healthcare models for multi-million dollar liability risks 
          to orchestrating multi-agent swarms that automate thousands of manual tasks. 
          I don't build demos; I build infrastructure.
        </motion.p>

        {/* Quick stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { icon: Bot, label: 'AI Systems' },
            { icon: Globe, label: 'Production' },
            { icon: Shield, label: 'Reliable' },
          ].map((item) => (
            <motion.div 
              key={item.label}
              whileHover={{ y: -2 }}
              className="flex flex-col items-center gap-2 p-4 bg-bg border border-border rounded-lg hover:border-primary/30 transition-colors"
            >
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-xs text-muted">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            Read Full Story <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}