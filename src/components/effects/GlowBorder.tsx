import { clsx } from 'clsx'

interface GlowBorderProps {
  children: React.ReactNode
  className?: string
}

/**
 * Animated conic-gradient border wrapper. Ported from the imported design's
 * spinning glow CTA card.
 */
export function GlowBorder({ children, className }: GlowBorderProps) {
  return (
    <div className={clsx('relative overflow-hidden rounded-2xl p-[1.5px]', className)}>
      <div
        aria-hidden
        className="absolute inset-[-45%] animate-spin-slow"
        style={{
          background:
            'conic-gradient(from 0deg, rgb(var(--accent)), #22d3ee, #a855f7, rgb(var(--accent)))',
        }}
      />
      <div className="relative h-full rounded-[18.5px] bg-elevated">{children}</div>
    </div>
  )
}
