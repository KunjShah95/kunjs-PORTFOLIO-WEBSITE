import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { containerStaggerVariants } from '../../hooks/useReveal'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4
}

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export function BentoGrid({ children, className, cols = 3 }: BentoGridProps) {
  return (
    <motion.div
      variants={containerStaggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={clsx('grid gap-px bg-rule/12', colsMap[cols], className)}
    >
      {children}
    </motion.div>
  )
}
