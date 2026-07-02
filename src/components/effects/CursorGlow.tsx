import { useEffect, useRef } from 'react'

/**
 * CursorGlow — A soft radial gradient spotlight that follows the mouse.
 * GPU-accelerated via transform: translate3d(). Disabled on touch devices
 * and when prefers-reduced-motion is enabled (handled in CSS).
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const raf = useRef<number>(0)
  const pos = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    // Skip on touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      if (el) {
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`
      }
      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden />
}
