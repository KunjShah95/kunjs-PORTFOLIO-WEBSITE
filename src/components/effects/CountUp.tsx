import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface CountUpProps {
  value: number
  duration?: number // in seconds
  suffix?: string
}

export function CountUp({ value, duration = 1.5, suffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let start = 0
    const end = value
    if (start === end) {
      setCount(end)
      return
    }

    const totalMiliseconds = duration * 1000
    const intervalTime = 30 // ~33 fps
    const totalSteps = Math.ceil(totalMiliseconds / intervalTime)
    const stepIncrement = (end - start) / totalSteps
    let step = 0

    const timer = setInterval(() => {
      step++
      const next = Math.round(start + stepIncrement * step)
      if (next >= end || step >= totalSteps) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(next)
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [value, duration, inView])

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}
