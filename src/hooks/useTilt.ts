import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useCallback } from 'react'

interface TiltOptions {
  scale?: number
  maxRotation?: number
  springConfig?: { stiffness: number; damping: number }
}

export function useTilt(options: TiltOptions = {}) {
  const { scale = 1.01, maxRotation = 6, springConfig = { stiffness: 250, damping: 20 } } = options
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxRotation, -maxRotation]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxRotation, maxRotation]), springConfig)
  const hoverScale = useSpring(1, springConfig)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const xVal = (e.clientX - rect.left) / rect.width - 0.5
    const yVal = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xVal)
    y.set(yVal)
    hoverScale.set(scale)
  }, [x, y, hoverScale, scale])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    hoverScale.set(1)
  }, [x, y, hoverScale])

  return {
    ref,
    style: {
      rotateX,
      rotateY,
      scale: hoverScale,
      transition: 'transform 0.1s',
      transformStyle: 'preserve-3d' as const,
      perspective: 800,
    },
    handlers: { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave },
  }
}
