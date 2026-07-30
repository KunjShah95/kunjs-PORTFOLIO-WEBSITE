import { motion } from 'framer-motion'

const STEPS = [
  {
    step: '01',
    title: 'You tell me what you need',
    desc: 'Brief, scope, timeline. A day, not a week. We align on a doc and define the MVP parameters.',
  },
  {
    step: '02',
    title: 'I build it',
    desc: 'No overhead, no pointless meetings. Direct comms on Slack/Discord and daily updates. Speed over bureaucracy.',
  },
  {
    step: '03',
    title: 'You get a working system',
    desc: 'Deployed to Vercel/Fly/AWS, documented codebase, clean handoff. Ready for real users from day one.',
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 border-b border-rule/10">
      <div className="max-w-manifest mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-14"
        >
          <h2 className="display text-4xl md:text-5xl leading-[1.05] max-w-3xl font-semibold">
            How I work.
          </h2>
          <p className="mt-3 text-base text-ink-secondary max-w-2xl leading-relaxed">
            Fast, direct, no bullshit. Whiteboard to production in weeks, not quarters.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-[4rem_1fr] gap-6 md:gap-10 py-8 border-t border-rule/10 group"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-tertiary pt-1">{s.step}</span>
              <div>
                <h3 className="font-display text-lg md:text-xl font-semibold tracking-tight mb-2 group-hover:text-accent transition-colors duration-300">{s.title}</h3>
                <p className="text-sm md:text-base text-ink-secondary leading-relaxed max-w-[60ch]">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
