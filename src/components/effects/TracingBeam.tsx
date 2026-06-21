import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { clsx } from 'clsx'

interface TracingBeamProps {
  children: React.ReactNode
  className?: string
}

export function TracingBeam({ children, className }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const height = useTransform(smoothProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className={clsx('relative', className)}>
      <div className="absolute left-0 top-0 bottom-0 w-px bg-rule/12 hidden md:block" aria-hidden>
        <motion.div
          className="w-full bg-accent"
          style={{ height, opacity }}
        />
      </div>
      <div className="md:pl-8">
        {children}
      </div>
    </div>
  )
}
