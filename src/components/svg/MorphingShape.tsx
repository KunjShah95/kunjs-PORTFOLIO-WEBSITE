import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface MorphingShapeProps {
  className?: string
  size?: number
  color?: string
}

const INITIAL = 'M20 40 C20 20 40 20 60 40 C80 60 100 60 100 40'
const FINAL = 'M20 40 C40 10 60 70 80 40 C90 25 100 40 100 40'

export function MorphingShape({ className, size = 120, color }: MorphingShapeProps) {
  return (
    <svg
      width={size}
      height={size / 3}
      viewBox="0 0 120 60"
      fill="none"
      className={clsx('overflow-visible', className)}
      aria-hidden
    >
      <motion.path
        d={INITIAL}
        stroke={color ?? 'rgb(var(--accent) / 0.2)'}
        strokeWidth={1.5}
        strokeLinecap="round"
        animate={{ d: FINAL }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
    </svg>
  )
}
