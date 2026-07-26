import React, { useRef, useCallback } from 'react'
import { clsx } from 'clsx'

interface LiquidGlassProps {
  children: React.ReactNode
  className?: string
  intensity?: 'subtle' | 'medium' | 'strong'
  tint?: string
}

export function LiquidGlass({
  children,
  className,
  intensity = 'medium',
  tint = 'rgba(226, 109, 72, 0.15)',
}: LiquidGlassProps) {
  const ref = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    const glow = glowRef.current
    const shine = shineRef.current
    const border = borderRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top

    if (glow) {
      glow.style.setProperty('--lx', `${x}px`)
      glow.style.setProperty('--ly', `${y}px`)
    }
    if (shine) {
      const pct = x / r.width
      shine.style.transform = `translateX(${(pct - 0.5) * 40}%)`
    }
    if (border) {
      border.style.setProperty('--lx', `${x}px`)
      border.style.setProperty('--ly', `${y}px`)
    }
  }, [])

  const onEnter = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '1'
    if (borderRef.current) borderRef.current.style.opacity = '1'
  }, [])

  const onLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0'
    if (shineRef.current) shineRef.current.style.transform = 'translateX(-50%)'
    if (borderRef.current) borderRef.current.style.opacity = '0'
  }, [])

  const borderOpacityMap = {
    subtle: 0.06,
    medium: 0.12,
    strong: 0.2,
  }

  const borderOpacity = borderOpacityMap[intensity]

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={clsx(
        'liquid-glass relative overflow-hidden transition-all duration-base ease-out-soft',
        className
      )}
    >
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-slow ease-out-soft"
        style={{
          opacity: 0,
          background: `radial-gradient(400px circle at var(--lx, 50%) var(--ly, 50%), ${tint}, transparent 65%)`,
        }}
      />

      <div
        ref={shineRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-gradient-to-tr from-transparent via-white to-transparent"
        style={{
          transform: 'translateX(-50%)',
          transition: 'transform 0.8s ease-out',
        }}
      />

      <div
        ref={borderRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-base rounded-[inherit]"
        style={{
          opacity: 0,
          boxShadow: `inset 0 0 12px 1px rgb(var(--accent) / ${borderOpacity})`,
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
