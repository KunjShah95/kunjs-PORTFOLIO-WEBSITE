import { useRef, useCallback } from 'react'
import { clsx } from 'clsx'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
}

export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    const glow = glowRef.current
    if (!el || !glow) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    glow.style.setProperty('--sx', `${x}px`)
    glow.style.setProperty('--sy', `${y}px`)
  }, [])

  const onEnter = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '1'
  }, [])

  const onLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={clsx('relative overflow-hidden', className)}
    >
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: 0,
          background: `radial-gradient(280px circle at var(--sx, 50%) var(--sy, 50%), rgb(var(--accent) / 0.15), transparent 62%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}
