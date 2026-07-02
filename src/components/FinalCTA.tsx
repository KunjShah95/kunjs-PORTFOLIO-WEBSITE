import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from 'lucide-react'
import {
  LiquidGlass,
  TiltCard,
  Magnetic,
  TextScramble,
  BackgroundBeams,
  GradientOrb,
} from './effects'

const SOCIALS = [
  { label: 'GitHub Main', icon: Github, href: 'https://github.com/KunjShah95', tint: 'rgba(124, 118, 255, 0.12)' },
  { label: 'GitHub Side', icon: Github, href: 'https://github.com/KunjShah01', tint: 'rgba(6, 182, 212, 0.12)' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/kunjshah05', tint: 'rgba(168, 85, 247, 0.12)' },
  { label: 'Twitter', icon: Twitter, href: 'https://twitter.com/kunjshah_dev', tint: 'rgba(234, 179, 8, 0.12)' },
]

export function FinalCTA() {
  return (
    <section className="relative bg-ink-primary text-paper overflow-hidden py-24 md:py-32">
      {/* Background beams and orbs */}
      <BackgroundBeams count={4} className="opacity-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[420px] w-[820px] rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgb(var(--accent) / 0.55), transparent 70%)' }}
      />
      <GradientOrb size={460} className="bottom-[-140px] left-[-100px] opacity-20" />

      <div className="relative z-10 max-w-manifest mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <span className="font-mono text-xs uppercase tracking-kicker text-paper/60 font-semibold px-3 py-1 rounded-full border border-paper/10 bg-paper/5">
            Let's connect
          </span>
          <h2 className="display text-5xl md:text-7xl mt-6 leading-[0.98] tracking-tightest max-w-4xl text-paper font-extrabold">
            Looking for an AI Engineer?{' '}
            <span className="text-accent">
              <TextScramble words={["Let's build.", "Let's deploy.", "Let's innovate."]} className="min-w-[12ch] text-accent inline-block" />
            </span>
          </h2>
          <p className="mt-8 text-paper/70 text-lg md:text-xl leading-relaxed max-w-2xl font-body">
            I design production agentic systems, implement reliable machine learning models, and build robust software
            architectures. Open to full-time engineering roles, research labs, and strategic developer collaborations.
          </p>

          {/* Liquid glass buttons */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.15}>
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 h-14 px-8 rounded-xl bg-accent text-accent-ink font-semibold text-base overflow-hidden hover:scale-[1.02] hover:-translate-y-0.5 active:scale-95 transition-all shadow-[0_10px_28px_rgb(var(--accent)/0.34)]"
              >
                Start a conversation
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Magnetic>

            <Magnetic strength={0.15}>
              <a
                href="mailto:kkshah2005@gmail.com"
                className="group relative inline-flex items-center gap-2 h-14 px-8 rounded-xl border border-paper/15 text-paper font-semibold text-base bg-paper/5 hover:bg-paper/10 hover:border-paper/25 hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                <Mail className="w-5 h-5 text-paper/70" />
                kkshah2005@gmail.com
              </a>
            </Magnetic>
          </div>

          {/* Social liquid glass grid */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
            {SOCIALS.map(({ label, icon: Icon, href, tint }) => (
              <div key={label} className="w-full">
                <TiltCard scale={1.03} maxRotation={6}>
                  <Magnetic strength={0.2} className="w-full">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block"
                    >
                      <LiquidGlass
                        tint={tint}
                        intensity="subtle"
                        className="w-full flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border border-paper/10 bg-paper/5 hover:bg-paper/10 hover:border-paper/20 hover:-translate-y-1 transition-all shadow-md group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-paper/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                          <Icon className="w-5 h-5 text-paper/80 group-hover:text-accent transition-colors" />
                        </div>
                        <span className="font-mono text-xs text-paper/50 group-hover:text-paper/90 transition-colors font-medium">
                          {label}
                        </span>
                      </LiquidGlass>
                    </a>
                  </Magnetic>
                </TiltCard>
              </div>
            ))}
          </div>

          {/* Stronger closing tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-12 font-display text-lg md:text-xl text-paper/40 italic tracking-tight"
          >
            Let's build something that matters.
          </motion.p>
        </motion.div>

        <div className="mt-24 pt-8 border-t border-paper/10 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-paper/50">
          <div>&copy; 2026 Kunj Shah &middot; Built in Ahmedabad</div>
          <div>Designed &amp; shipped by hand &middot; Currently shipping AI products every week</div>
        </div>
      </div>
    </section>
  )
}
