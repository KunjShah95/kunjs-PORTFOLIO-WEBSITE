import { useRef, useState, useCallback } from 'react'
import { clsx } from 'clsx'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
}

/**
 * Card with a radial accent glow that tracks the cursor. Ported from the
 * imported design's data-spotlight card.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={clsx('relative overflow-hidden', className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(280px circle at ${pos.x}px ${pos.y}px, rgb(var(--accent) / 0.15), transparent 62%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
