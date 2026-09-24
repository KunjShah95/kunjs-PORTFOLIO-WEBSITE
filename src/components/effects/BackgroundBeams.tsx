import { useMemo } from 'react'
import { clsx } from 'clsx'

interface BackgroundBeamsProps {
  className?: string
  count?: number
}

export function BackgroundBeams({ className, count = 3 }: BackgroundBeamsProps) {
  const beams = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    width: `${30 + ((i * 17) % 36)}%`,
    height: `${60 + ((i * 23) % 70)}%`,
    left: `${8 + ((i * 29) % 64)}%`,
    top: `${5 + ((i * 37) % 42)}%`,
    duration: 9 + (i % 4) * 3,
    delay: (i % 3) * 1.4,
    x1: (i * 21 % 70) - 35,
    y1: -40 + (i * 13 % 30),
    x2: 20 - (i * 11 % 45),
    y2: (i * 17 % 50) - 25,
  })), [count])

  return (
    <div className={clsx('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      {beams.map((b) => <div key={b.id} className="animate-beam-float absolute rounded-full opacity-[0.06]" style={{ width: b.width, height: b.height, left: b.left, top: b.top, background: 'linear-gradient(135deg, rgb(var(--accent)), rgb(120 80 255))', filter: 'blur(80px)', animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s`, '--bx1': `${b.x1}px`, '--by1': `${b.y1}px`, '--bx2': `${b.x2}px`, '--by2': `${b.y2}px` } as React.CSSProperties} />)}
    </div>
  )
}
