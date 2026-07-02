import { motion } from 'framer-motion'
import { useTilt } from '../../hooks/useTilt'
import { clsx } from 'clsx'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  scale?: number
  maxRotation?: number
}

export function TiltCard({
  children,
  className,
  scale = 1.02,
  maxRotation = 6,
}: TiltCardProps) {
  const { ref, style, handlers } = useTilt({ scale, maxRotation })

  return (
    <motion.div
      ref={ref}
      style={style}
      {...handlers}
      className={clsx('perspective-1000 preserve-3d', className)}
    >
      {children}
    </motion.div>
  )
}
