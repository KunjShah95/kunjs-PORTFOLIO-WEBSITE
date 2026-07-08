import React, { useRef, useState, useCallback } from 'react'
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
  tint = 'rgba(226, 109, 72, 0.15)', // Default warm terracotta accent tint
}: LiquidGlassProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
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
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={clsx(
        'liquid-glass relative overflow-hidden transition-all duration-base ease-out-soft',
        className
      )}
    >
      {/* Dynamic Cursor light reflection (Glass refraction) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-slow ease-out-soft"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${tint}, transparent 65%)`,
        }}
      />

      {/* Surface shine glare */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-gradient-to-tr from-transparent via-white to-transparent"
        style={{
          transform: active ? 'translateX(10%)' : 'translateX(-10%)',
          transition: 'transform 0.8s ease-out',
        }}
      />

      {/* Dynamic border highlighting (iridescent flare) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-base rounded-[inherit]"
        style={{
          opacity: active ? 1 : 0,
          boxShadow: `inset 0 0 12px 1px rgb(var(--accent) / ${borderOpacity})`,
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
