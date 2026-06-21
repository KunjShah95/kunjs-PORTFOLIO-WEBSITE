import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface AnimatedStrokeProps {
  className?: string
  path: string
  width?: number
  height?: number
  color?: string
  strokeWidth?: number
  delay?: number
  duration?: number
}

export function AnimatedStroke({
  className, path, width = 120, height = 40,
  color, strokeWidth = 1, delay = 0, duration = 2,
}: AnimatedStrokeProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={clsx('overflow-visible', className)}
      aria-hidden
    >
      <motion.path
        d={path}
        stroke={color ?? 'rgb(var(--rule) / 0.32)'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}
