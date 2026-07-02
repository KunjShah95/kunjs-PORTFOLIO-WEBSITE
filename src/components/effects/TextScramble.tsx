import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'

interface TextScrambleProps {
  words: string[]
  className?: string
  interval?: number
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%$&'

/**
 * Cycles through `words`, scrambling characters into place between each.
 * Ported from the imported design's data-scramble effect. Respects
 * prefers-reduced-motion by simply swapping words without the scramble.
 */
export function TextScramble({ words, className, interval = 2900 }: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    try { setReduced(matchMedia('(prefers-reduced-motion: reduce)').matches) } catch { /* noop */ }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el || !words.length) return
    el.textContent = words[0]

    if (reduced) {
      let i = 0
      const iv = setInterval(() => { i = (i + 1) % words.length; el.textContent = words[i] }, interval)
      return () => clearInterval(iv)
    }

    let idx = 0
    let raf = 0
    let cancelled = false

    const scrambleTo = (target: string) => {
      const from = el.textContent || ''
      const len = Math.max(from.length, target.length)
      const queue = Array.from({ length: len }, () => {
        const start = Math.floor(Math.random() * 8)
        return { to: '', ch: '', start, end: start + Math.floor(Math.random() * 8) + 8 }
      })
      queue.forEach((q, i) => { q.to = target[i] || '' })
      let frame = 0
      const run = () => {
        if (cancelled) return
        let out = ''
        let done = 0
        for (const it of queue) {
          if (frame >= it.end) { done++; out += it.to }
          else if (frame >= it.start) {
            if (!it.ch || Math.random() < 0.28) it.ch = CHARS[Math.floor(Math.random() * CHARS.length)]
            out += `<span style="opacity:.6;color:rgb(var(--accent))">${it.ch}</span>`
          } else { out += it.to }
        }
        el.innerHTML = out
        if (done < queue.length) { frame++; raf = requestAnimationFrame(run) }
      }
      run()
    }

    const iv = setInterval(() => {
      idx = (idx + 1) % words.length
      cancelAnimationFrame(raf)
      scrambleTo(words[idx])
    }, interval)

    return () => { cancelled = true; clearInterval(iv); cancelAnimationFrame(raf) }
  }, [words, interval, reduced])

  return <span ref={ref} className={clsx('inline-block', className)} />
}
