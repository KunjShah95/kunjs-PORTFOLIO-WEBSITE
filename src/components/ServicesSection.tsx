import { motion } from 'framer-motion'
import { Cpu, Globe, Lightbulb, Server } from 'lucide-react'
import { LiquidGlass, TiltCard, TextReveal, BackgroundBeams } from './effects'

const SERVICES = [
  {
    icon: Cpu,
    title: 'AI Agents & Automations',
    desc: 'LangChain, LLM orchestration, retrieval pipelines, autonomous workflows — production-ready.',
    span: 'md:col-span-2',
    bgTint: 'rgba(124, 118, 255, 0.12)',
    gradient: 'from-accent/20 via-purple-500/15 to-cyan-400/10',
  },
  {
    icon: Globe,
    title: 'Web Apps & APIs',
    desc: 'React, Next.js, FastAPI, Tailwind. Full-stack apps shipped in weeks, not months.',
    span: 'md:col-span-1',
    bgTint: 'rgba(6, 182, 212, 0.12)',
    gradient: 'from-cyan-400/20 via-blue-500/15 to-accent/10',
  },
  {
    icon: Lightbulb,
    title: 'Prototypes & MVPs',
    desc: 'From whiteboard to working demo in days. Test your idea before committing to production.',
    span: 'md:col-span-1',
    bgTint: 'rgba(234, 179, 8, 0.12)',
    gradient: 'from-yellow-400/20 via-orange-400/15 to-accent/10',
  },
  {
    icon: Server,
    title: 'Infra & Backend',
    desc: 'Postgres, Docker, cloud deployment, CI/CD. The boring tech that keeps things running.',
    span: 'md:col-span-2',
    bgTint: 'rgba(168, 85, 247, 0.12)',
    gradient: 'from-purple-500/20 via-accent/15 to-pink-400/10',
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 md:py-32 border-b border-rule/12 overflow-hidden bg-sunken/20">
      {/* Background elements */}
      <BackgroundBeams count={4} className="opacity-40" />

      <div className="relative z-10 max-w-manifest mx-auto px-6">
        <div className="mb-16">
          <span className="kicker text-accent font-semibold">01 · What I Ship</span>
          <h2 className="display text-4xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
            <TextReveal text="You describe it, I build it." />
          </h2>
        </div>

        {/* Staggered non-linear bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={s.span}
              >
                <TiltCard scale={1.015} maxRotation={5}>
                  <LiquidGlass intensity="medium" tint={s.bgTint} className="h-full p-8 md:p-10 rounded-2xl flex flex-col justify-between min-h-[260px] group border border-rule/12 hover:border-accent/30 transition-all noise-texture relative overflow-hidden">
                    {/* Animated top-border wipe on hover */}
                    <span className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-accent via-cyan-400 to-purple-500 group-hover:w-full transition-all duration-slow ease-out-soft" />

                    <div>
                      {/* Gradient icon container */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-rule/8`}>
                        <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                      </div>
                      <h3 className="display text-2xl mb-3 text-ink-primary font-bold tracking-tight">{s.title}</h3>
                      <p className="text-sm md:text-base text-ink-secondary leading-relaxed max-w-[45ch] font-body">{s.desc}</p>
                    </div>

                    {/* Subtle micro-glow bar at bottom */}
                    <div className="mt-8 h-1 w-12 rounded bg-accent/20 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-cyan-400 transition-all duration-500" />
                  </LiquidGlass>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
