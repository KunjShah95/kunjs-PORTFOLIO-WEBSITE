import { motion } from 'framer-motion'
import { MessageSquare, Rocket, CheckCircle } from 'lucide-react'
import { LiquidGlass, HoverExpand, TracingBeam, TextReveal, CountUp } from './effects'

const STEPS = [
  {
    icon: MessageSquare,
    step: 1,
    title: 'You tell me what you need',
    desc: 'Brief, scope, timeline. A day, not a week. We align on a Google Doc and define the MVP parameters.',
    bgTint: 'rgba(124, 118, 255, 0.12)',
  },
  {
    icon: Rocket,
    step: 2,
    title: 'I build it',
    desc: 'No overhead, no pointless meetings. Just direct communication on Slack/Discord and daily updates. Speed over bureaucracy.',
    bgTint: 'rgba(6, 182, 212, 0.12)',
  },
  {
    icon: CheckCircle,
    step: 3,
    title: 'You get a working system',
    desc: 'Fully deployed to Vercel/Fly/AWS, fully documented codebase with clean handoff. Ready to serve real users.',
    bgTint: 'rgba(34, 197, 94, 0.12)',
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 border-b border-rule/12">
      <div className="max-w-manifest mx-auto px-6">
        <div className="mb-16">
          <span className="kicker text-accent font-semibold">02 · How I Work</span>
          <h2 className="display text-4xl md:text-5xl mt-4 max-w-3xl leading-[1.05]">
            <TextReveal text="Fast, direct, no bullshit." />
          </h2>
        </div>

        <TracingBeam className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-8 md:gap-12 pl-6 md:pl-10">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  {/* Glowing vertical marker point */}
                  <div className="absolute -left-[31px] md:-left-[43px] top-7 z-20 flex items-center justify-center">
                    <span className="relative flex h-4.5 w-4.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/40 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-accent border-2 border-paper"></span>
                    </span>
                  </div>

                  <LiquidGlass
                    intensity="medium"
                    tint={s.bgTint}
                    className="p-6 md:p-8 rounded-2xl border border-rule/12 hover:border-accent/30 transition-all shadow-lg"
                  >
                    <HoverExpand
                      header={
                        <div className="flex items-center justify-between cursor-pointer w-full select-none">
                          <div className="flex items-center gap-5">
                            <span className="font-mono text-3xl font-extrabold text-accent/90 tabular-nums">
                              0<CountUp value={s.step} duration={0.6} />
                            </span>
                            <h3 className="display text-xl md:text-2xl font-bold text-ink-primary tracking-tight">
                              {s.title}
                            </h3>
                          </div>
                          <div className="w-10 h-10 rounded-lg bg-paper/60 border border-rule/8 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                            <Icon className="w-5 h-5 text-ink-secondary group-hover:text-accent transition-colors" strokeWidth={1.5} />
                          </div>
                        </div>
                      }
                    >
                      <div className="border-t border-rule/8 pt-4 mt-2">
                        <p className="text-sm md:text-base text-ink-secondary leading-relaxed max-w-[65ch]">
                          {s.desc}
                        </p>
                      </div>
                    </HoverExpand>
                  </LiquidGlass>
                </motion.div>
              )
            })}
          </div>
        </TracingBeam>
      </div>
    </section>
  )
}
