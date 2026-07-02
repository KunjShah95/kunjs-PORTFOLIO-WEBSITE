import { motion } from 'framer-motion'
import { PROJECTS, HACKATHONS } from '../data/portfolio'
import { LiquidGlass, Magnetic, GlowBorder, CountUp } from './effects'

// Verified GitHub stars across KunjShah95 repos (gh API, 2026-06). The live
// count also renders in <GitHubProfile/>; update this snapshot when it drifts.
const GITHUB_STARS = 44

export function ProofBar() {
  const hackathonFinals = HACKATHONS.filter(h => h.placement === 'Finalist').length
  const shippedCount = PROJECTS.length

  return (
    <section className="py-16 md:py-24 border-b border-rule/12 overflow-hidden bg-sunken/10">
      <div className="max-w-manifest mx-auto px-6">
        {/* Bento-style asymmetric layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {/* Large — Things shipped */}
          <Magnetic strength={0.12} className="col-span-2">
            <LiquidGlass intensity="medium" tint="rgba(124, 118, 255, 0.1)" className="w-full p-8 md:p-10 rounded-2xl border border-rule/12 flex flex-col items-center justify-center noise-texture hover-lift">
              <motion.div 
                className="display text-7xl md:text-8xl font-extrabold text-accent leading-none"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              >
                <CountUp value={shippedCount} duration={1.2} />
              </motion.div>
              <div className="mt-4 font-mono text-xs text-ink-tertiary uppercase tracking-widest font-semibold">Things shipped</div>
            </LiquidGlass>
          </Magnetic>

          {/* Hackathon finals */}
          <Magnetic strength={0.12} className="col-span-1">
            <GlowBorder className="w-full h-full">
              <div className="p-6 md:p-8 flex flex-col items-center justify-center h-full">
                <motion.div 
                  className="display text-5xl md:text-6xl font-extrabold text-accent leading-none"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                >
                  <CountUp value={hackathonFinals} duration={1.2} />
                </motion.div>
                <div className="mt-3 font-mono text-[10px] text-ink-tertiary uppercase tracking-widest font-semibold text-center">Hackathon finals</div>
              </div>
            </GlowBorder>
          </Magnetic>

          {/* GitHub stars */}
          <Magnetic strength={0.12} className="col-span-1">
            <LiquidGlass intensity="medium" tint="rgba(6, 182, 212, 0.1)" className="w-full h-full p-6 md:p-8 rounded-2xl border border-rule/12 flex flex-col items-center justify-center noise-texture hover-lift">
              <motion.div 
                className="display text-5xl md:text-6xl font-extrabold text-accent leading-none"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
              >
                <CountUp value={GITHUB_STARS} duration={1.2} />
              </motion.div>
              <div className="mt-3 font-mono text-[10px] text-ink-tertiary uppercase tracking-widest font-semibold text-center">GitHub stars</div>
            </LiquidGlass>
          </Magnetic>

          {/* Bottom row — spanning full width */}
          <Magnetic strength={0.08} className="col-span-2 md:col-span-4">
            <LiquidGlass intensity="subtle" tint="rgba(168, 85, 247, 0.06)" className="w-full px-8 py-5 rounded-2xl border border-rule/12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 noise-texture">
              <span className="inline-flex items-center gap-2 font-mono text-xs text-ink-secondary">
                <span className="w-2 h-2 rounded-full bg-live animate-pdot" />
                Open Source Contributor
              </span>
              <span className="text-ink-quaternary font-mono text-xs">·</span>
              <span className="font-mono text-xs text-ink-secondary">Ahmedabad, IN</span>
              <span className="text-ink-quaternary font-mono text-xs">·</span>
              <span className="font-mono text-xs text-ink-secondary">Shipping every week</span>
            </LiquidGlass>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
