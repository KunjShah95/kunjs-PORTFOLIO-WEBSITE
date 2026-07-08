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
    <section id="process" className="py-24 md:py-32 border-b border-rule/12">
      <div className="max-w-manifest mx-auto px-6">
        <div className="mb-16">
          <span className="kicker">How I work</span>
          <h2 className="display text-4xl md:text-5xl mt-4 max-w-3xl leading-[1.05]">
            Fast, direct, no bullshit.
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-[4rem_1fr] md:grid-cols-[8rem_1fr] gap-6 md:gap-10 py-10 border-t border-rule/12 group"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-tertiary pt-1">{s.step}</span>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">{s.title}</h3>
                <p className="text-sm md:text-base text-ink-secondary leading-relaxed max-w-[60ch] font-body">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
