import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { Code, Sparkles, Cpu, Workflow, type LucideIcon } from 'lucide-react'

interface FloatingIcon {
  Icon: LucideIcon
  x: number
  y: number
  size: number
  delay: number
}

const ICONS: FloatingIcon[] = [
  { Icon: Code, x: 10, y: 20, size: 16, delay: 0 },
  { Icon: Sparkles, x: 85, y: 15, size: 14, delay: 0.5 },
  { Icon: Cpu, x: 90, y: 70, size: 18, delay: 1 },
  { Icon: Workflow, x: 8, y: 75, size: 15, delay: 1.5 },
]

interface FloatingIconsProps {
  className?: string
}

export function FloatingIcons({ className }: FloatingIconsProps) {
  return (
    <div className={clsx('absolute inset-0 overflow-hidden pointer-events-none', className)} aria-hidden>
      {ICONS.map(({ Icon, x, y, size, delay }) => (
        <motion.div
          key={`${x}-${y}`}
          className="absolute text-ink-tertiary/20"
          style={{ left: `${x}%`, top: `${y}%` }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
          }}
        >
          <Icon size={size} />
        </motion.div>
      ))}
    </div>
  )
}
