/**
 * Shared motion tokens — opacity/transform first for compositor-friendly animations.
 * Pair with <MotionConfig reducedMotion="user"> at the app root.
 */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const
export const EASE_SOFT = [0.16, 1, 0.3, 1] as const

export const DURATION = {
  fast: 0.18,
  normal: 0.32,
  slow: 0.52,
} as const

/** Default viewport for scroll-driven section cards */
export const VIEWPORT_SECTION = { once: true, margin: '-48px' as const }

export function cardRevealTransition(index: number, staggerMs = 0.075) {
  return {
    delay: index * staggerMs,
    duration: DURATION.normal,
    ease: EASE_OUT,
  } as const
}

export const pageVariants = {
  initial: { opacity: 0, y: 10 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: DURATION.fast, ease: EASE_OUT },
  },
} as const

export const navSpring = {
  type: 'spring' as const,
  bounce: 0.2,
  duration: 0.42,
}

/** Hero left column — staggered children */
export const heroVariants = {
  container: {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.075, delayChildren: 0.05 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.normal, ease: EASE_OUT },
    },
  },
  photo: {
    hidden: { opacity: 0, scale: 0.97 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: DURATION.slow, ease: EASE_SOFT },
    },
  },
} as const

/** Section grids — parent staggers child cards */
export const staggerContainer = (gap = 0.08) =>
  ({
    hidden: {},
    visible: {
      transition: { staggerChildren: gap, delayChildren: 0.04 },
    },
  }) as const

export const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT },
  },
} as const
