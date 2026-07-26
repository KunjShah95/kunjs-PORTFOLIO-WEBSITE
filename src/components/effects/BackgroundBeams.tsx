import { useMemo } from 'react'
import { clsx } from 'clsx'

interface BackgroundBeamsProps {
  className?: string
  count?: number
}

export function BackgroundBeams({ className, count = 3 }: BackgroundBeamsProps) {
  const beams = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      width: `${30 + Math.random() * 40}%`,
      height: `${60 + Math.random() * 80}%`,
      left: `${Math.random() * 60}%`,
      top: `${Math.random() * 40}%`,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 4,
      x1: Math.random() * 60 - 30,
      y1: Math.random() * -60 + 10,
      x2: Math.random() * -50 + 10,
      y2: Math.random() * 40 - 20,
    })),
  [count])

  return (
    <div className={clsx('absolute inset-0 overflow-hidden pointer-events-none', className)} aria-hidden>
      {beams.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full opacity-[0.04] animate-beam-float"
          style={{
            width: b.width,
            height: b.height,
            left: b.left,
            top: b.top,
            background: 'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--ink-primary)))',
            filter: 'blur(80px)',
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            '--bx1': `${b.x1}px`,
            '--by1': `${b.y1}px`,
            '--bx2': `${b.x2}px`,
            '--by2': `${b.y2}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
