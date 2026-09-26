'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/** Split text into per-line masked reveals.
 *  Lines are supplied as an array so the wrapper never has to measure or
 *  split on the client — no layout thrash, no hydration mismatch. */
export function MaskedLines({
  lines,
  as: Tag = 'span',
  className,
  delay = 0,
  stagger = 0.07,
}: {
  lines: ReactNode[]
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div'
  className?: string
  delay?: number
  stagger?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px -8% 0px' })
  const calm = useReducedMotion()

  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((line, i) => (
        <span className="mask-line" key={i}>
          <span
            style={
              calm
                ? undefined
                : {
                    transform: inView ? 'translateY(0)' : 'translateY(105%)',
                    transition: `transform 720ms cubic-bezier(0.16,1,0.3,1) ${
                      delay + i * stagger
                    }s`,
                  }
            }
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}

/** Single-element entrance. Used sparingly — one per section at most. */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article' | 'span' | 'p'
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-6% 0px -6% 0px' })
  const calm = useReducedMotion()

  if (calm) {
    return (
      <Tag ref={ref as never} className={className}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : `translate3d(0, ${y}px, 0)`,
        transition: `opacity 620ms cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 720ms cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </Tag>
  )
}

/** Staggers direct children as they enter. For index rows and grids. */
export function RevealGroup({
  children,
  className,
  stagger = 0.055,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  stagger?: number
  as?: 'div' | 'ul' | 'ol'
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px -5% 0px' })
  const calm = useReducedMotion()

  return (
    <Tag ref={ref as never} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={
                calm
                  ? undefined
                  : {
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'none' : 'translate3d(0, 14px, 0)',
                      transition: `opacity 560ms cubic-bezier(0.16,1,0.3,1) ${
                        i * stagger
                      }s, transform 680ms cubic-bezier(0.16,1,0.3,1) ${i * stagger}s`,
                    }
              }
            >
              {child}
            </div>
          ))
        : children}
    </Tag>
  )
}

/** True once the element has been seen — for lazy-mounting visualisations. */
export function useSeen<T extends HTMLElement>(margin = '200px') {
  const ref = useRef<T>(null)
  // framer-motion types `margin` as a closed union of px/rem template
  // literals and does not export that type, so derive it from the hook's
  // own options. A composed string still needs the assertion.
  const inView = useInView(ref, {
    once: true,
    margin: `${margin} 0px ${margin} 0px` as NonNullable<
      Parameters<typeof useInView>[1]
    >['margin'],
  })
  return [ref, inView] as const
}

/** Counts a number up once, in view. Respects reduced motion by snapping. */
export function CountUp({
  to,
  duration = 1.1,
  className,
  format,
}: {
  to: number
  duration?: number
  className?: string
  format?: (n: number) => string
}) {
  const [n, setN] = useState(0)
  const holder = useRef<HTMLSpanElement>(null)
  const [seen, setSeen] = useState(false)
  const calm = useReducedMotion()

  useEffect(() => {
    const el = holder.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!seen || calm) return
    let frame = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - p, 3)
      setN(to * eased)
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [seen, to, duration, calm])

  return (
    <span ref={holder} className={className} data-tnum>
      {calm || !seen ? (format ? format(to) : to) : format ? format(n) : Math.round(n)}
    </span>
  )
}
