import type { Transition, Variants } from 'framer-motion';

/** Shared motion language. One easing for entrances, one spring for state. */

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

/** Springs are for state change, never for entrances. */
export const SPRING: Transition = { type: 'spring', stiffness: 220, damping: 26, mass: 0.8 };
export const SOFT_SPRING: Transition = { type: 'spring', stiffness: 120, damping: 20 };

export const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE_OUT } },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const wipe: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: EASE_IN_OUT } },
};

export const stagger = (each = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
});

/** in-view defaults — one place, so every section reveals the same way */
export const inView = { once: true, margin: '-12% 0px -8% 0px' } as const;
