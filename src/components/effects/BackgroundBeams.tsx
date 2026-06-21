import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface BackgroundBeamsProps {
  className?: string
  count?: number
}

export function BackgroundBeams({ className, count = 3 }: BackgroundBeamsProps) {
  const beams = Array.from({ length: count }, (_, i) => ({
    id: i,
    width: `${30 + Math.random() * 40}%`,
    height: `${60 + Math.random() * 80}%`,
    left: `${Math.random() * 60}%`,
    top: `${Math.random() * 40}%`,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 4,
  }))

  return (
    <div className={clsx('absolute inset-0 overflow-hidden pointer-events-none', className)} aria-hidden>
      {beams.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full opacity-[0.04]"
          style={{
            width: b.width,
            height: b.height,
            left: b.left,
            top: b.top,
            background: 'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--ink-primary)))',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
