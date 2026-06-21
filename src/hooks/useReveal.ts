import { useAnimation, useInView } from 'framer-motion'
import { useRef } from 'react'

interface RevealOptions {
  amount?: number
  once?: boolean
}

export function useReveal(options: RevealOptions = {}) {
  const { amount = 0.15, once = true } = options
  const ref = useRef(null)
  const controls = useAnimation()
  const inView = useInView(ref, { amount, once })

  if (inView) controls.start('visible')
  else if (!once) controls.start('hidden')

  return { ref, controls, inView }
}

export const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export const revealStaggerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export const containerStaggerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}
