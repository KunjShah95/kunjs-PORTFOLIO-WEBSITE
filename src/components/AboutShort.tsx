import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Code2, Trophy } from 'lucide-react'

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
          About Me
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-muted leading-relaxed text-center mb-4"
        >
          I'm a self-taught AI engineer who fell in love with the idea of machines that can think. 
          What started as curiosity about ChatGPT turned into a deep dive into LangChain, CrewAI, and building autonomous systems.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-muted leading-relaxed text-center mb-8"
        >
          I don't build demos—I build production systems that actually work. Currently learning multi-agent orchestration and obsessed with making AI useful for real businesses.
        </motion.p>

        {/* Quick stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { icon: Code2, label: '15+ Projects' },
            { icon: Trophy, label: '2x Hackathon' },
            { icon: Globe, label: 'Production' },
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