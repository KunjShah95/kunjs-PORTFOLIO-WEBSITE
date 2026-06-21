import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ParallaxOptions {
  offset?: number
}

export function useParallax(options: ParallaxOptions = {}) {
  const { offset = 0.15 } = options
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [offset * 200, -offset * 200])

  return { ref, y }
}
