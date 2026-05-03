import { motion } from 'framer-motion'
import { Linkedin, Quote } from 'lucide-react'
import { TESTIMONIALS } from '../data/portfolio'

export function Testimonials() {
  const t = TESTIMONIALS[0]
  
  return (
    <section className="section-padding bg-bg relative">
      <div className="absolute inset-0 tech-grid-layer opacity-15" />
      
      <div className="container-aligned relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-wider mb-4">
            <Quote className="w-3.5 h-3.5" />
            What People Say
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-txt">
            Trusted by <span className="text-primary">Teammates</span> & <span className="text-primary">Clients</span>
          </h2>
        </motion.div>

        <motion.a
          href={t.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="group relative max-w-2xl mx-auto p-8 rounded-2xl bg-surface border border-border hover:border-primary/40 transition-all duration-300"
        >
          <Quote className="w-12 h-12 text-primary/20 absolute top-6 right-6" />
          <p className="text-base text-muted mb-6 relative z-10 italic">
            "{t.text}"
          </p>
          <div className="flex items-center gap-3 pt-4 border-t border-border/50">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">
                {t.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-txt">{t.name}</p>
              <p className="text-sm text-muted">{t.role} at {t.company}</p>
            </div>
            <Linkedin className="w-5 h-5 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.a>
      </div>
    </section>
  )
}