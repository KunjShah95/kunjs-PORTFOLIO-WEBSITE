import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface GradientOrbProps {
  className?: string
  size?: number
}

export function GradientOrb({ className, size = 300 }: GradientOrbProps) {
  return (
    <motion.div
      aria-hidden
      className={clsx('absolute rounded-full pointer-events-none', className)}
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle at 30% 30%, rgb(var(--accent) / 0.08), transparent 70%)',
      }}
      animate={{
        scale: [1, 1.08, 0.95, 1],
        rotate: [0, 5, -3, 0],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
