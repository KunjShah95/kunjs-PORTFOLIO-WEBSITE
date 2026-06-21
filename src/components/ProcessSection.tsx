import { motion } from 'framer-motion'
import { MessageSquare, Rocket, CheckCircle } from 'lucide-react'
import { BentoCard } from './bento'

const STEPS = [
  { icon: MessageSquare, step: '01', title: 'You tell me what you need', desc: 'Brief, scope, timeline. A day, not a week.' },
  { icon: Rocket, step: '02', title: 'I build it', desc: 'No overhead, no meetings. Just ship.' },
  { icon: CheckCircle, step: '03', title: 'You get a working system', desc: 'Deployed, documented, handed off.' },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 border-b border-rule/12">
      <div className="max-w-manifest mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="kicker">How I Work</div>
          <h2 className="display text-4xl md:text-5xl mt-3 max-w-3xl">
            Fast, direct, no bullshit.
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                className="relative"
              >
                <BentoCard variant="elevated" className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-2xl text-accent">{s.step}</span>
                    <Icon className="w-5 h-5 text-ink-tertiary" strokeWidth={1.5} />
                  </div>
                  <h3 className="display text-xl mb-3">{s.title}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{s.desc}</p>
                </BentoCard>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-rule/32" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
