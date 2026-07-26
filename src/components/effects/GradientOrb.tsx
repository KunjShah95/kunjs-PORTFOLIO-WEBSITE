import { clsx } from 'clsx'

interface GradientOrbProps {
  className?: string
  size?: number
}

export function GradientOrb({ className, size = 300 }: GradientOrbProps) {
  return (
    <div
      aria-hidden
      className={clsx('absolute rounded-full pointer-events-none animate-orb-drift', className)}
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle at 30% 30%, rgb(var(--accent) / 0.08), transparent 70%)',
      }}
    />
  )
}
