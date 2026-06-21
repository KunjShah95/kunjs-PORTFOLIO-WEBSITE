import { PROJECTS, HACKATHONS } from '../data/portfolio'

export function ProofBar() {
  const hackathonFinals = HACKATHONS.filter(h => h.placement === 'Finalist').length
  const shippedCount = PROJECTS.length

  return (
    <section className="py-16 border-b border-rule/12">
      <div className="max-w-manifest mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          <div className="text-center">
            <div className="display text-6xl md:text-7xl text-accent">{shippedCount}</div>
            <div className="mt-2 font-mono text-xs text-ink-tertiary uppercase tracking-kicker">Things shipped</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-rule/12" />
          <div className="text-center">
            <div className="display text-6xl md:text-7xl text-accent">{hackathonFinals}</div>
            <div className="mt-2 font-mono text-xs text-ink-tertiary uppercase tracking-kicker">Hackathon finals</div>
          </div>
          <div className="hidden md:block w-px h-16 bg-rule/12" />
          <div className="text-center">
            <div className="display text-6xl md:text-7xl text-accent">{shippedCount}+</div>
            <div className="mt-2 font-mono text-xs text-ink-tertiary uppercase tracking-kicker">Project stars</div>
          </div>
        </div>
      </div>
    </section>
  )
}
