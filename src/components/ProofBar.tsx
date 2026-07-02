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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Stat card 1 */}
          <Magnetic strength={0.15} className="w-full">
            <LiquidGlass intensity="medium" tint="rgba(124, 118, 255, 0.1)" className="w-full p-8 rounded-2xl border border-rule/12 text-center flex flex-col items-center justify-center">
              <div className="display text-6xl md:text-7xl font-extrabold text-accent leading-none">
                <CountUp value={shippedCount} duration={1.2} />
              </div>
              <div className="mt-4 font-mono text-xs text-ink-tertiary uppercase tracking-widest font-semibold">Things shipped</div>
            </LiquidGlass>
          </Magnetic>

          {/* Stat card 2 (GlowBorder accent) */}
          <Magnetic strength={0.15} className="w-full">
            <GlowBorder className="w-full">
              <div className="p-8 text-center flex flex-col items-center justify-center">
                <div className="display text-6xl md:text-7xl font-extrabold text-accent leading-none">
                  <CountUp value={hackathonFinals} duration={1.2} />
                </div>
                <div className="mt-4 font-mono text-xs text-ink-tertiary uppercase tracking-widest font-semibold">Hackathon finals</div>
              </div>
            </GlowBorder>
          </Magnetic>

          {/* Stat card 3 */}
          <Magnetic strength={0.15} className="w-full">
            <LiquidGlass intensity="medium" tint="rgba(6, 182, 212, 0.1)" className="w-full p-8 rounded-2xl border border-rule/12 text-center flex flex-col items-center justify-center">
              <div className="display text-6xl md:text-7xl font-extrabold text-accent leading-none">
                <CountUp value={GITHUB_STARS} duration={1.2} />
              </div>
              <div className="mt-4 font-mono text-xs text-ink-tertiary uppercase tracking-widest font-semibold">GitHub stars</div>
            </LiquidGlass>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
