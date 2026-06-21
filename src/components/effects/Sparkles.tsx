import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { useMemo } from 'react'

interface SparklesProps {
  className?: string
  count?: number
  color?: string
}

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export function Sparkles({ className, count = 12, color }: SparklesProps) {
  const sparkles: Sparkle[] = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    })),
  [count])

  return (
    <div className={clsx('absolute inset-0 overflow-hidden pointer-events-none', className)} aria-hidden>
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            backgroundColor: color ?? 'rgb(var(--accent))',
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
