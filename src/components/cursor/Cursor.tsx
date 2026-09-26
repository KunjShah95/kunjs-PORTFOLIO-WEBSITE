'use client'

import { useEffect, useRef, useState } from 'react'
import s from './Cursor.module.css'

type Mode = 'default' | 'link' | 'view' | 'drag' | 'input'

/** Desktop-only, fine-pointer-only cursor.
 *
 *  Two elements: a dot that tracks the pointer exactly, and a ring that
 *  trails it on a spring. Mode is read from the element under the pointer
 *  via data attributes, so no per-link listeners are needed.
 *
 *  Everything is transform + opacity. No layout reads in the hot path,
 *  and the whole thing is inert for touch, coarse pointers and reduced
 *  motion. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<Mode>('default')
  const [label, setLabel] = useState('')

  useEffect(() => {
    const fine =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(pointer: coarse)').matches
    const calm = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || !calm) return
    setEnabled(true)
    document.documentElement.dataset.customCursor = 'on'

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let px = window.innerWidth / 2
    let py = window.innerHeight / 2
    let rx = px
    let ry = py
    let frame = 0
    let visible = false

    const render = () => {
      frame = 0
      // Critically-damped-ish follow. No spring library needed for 2D.
      rx += (px - rx) * 0.18
      ry += (py - ry) * 0.18
      dot.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      if (Math.abs(px - rx) > 0.4 || Math.abs(py - ry) > 0.4) {
        frame = requestAnimationFrame(render)
      } else {
        frame = 0
      }
    }

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }

    const onMove = (e: PointerEvent) => {
      px = e.clientX
      py = e.clientY
      if (!visible) {
        visible = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
        rx = px
        ry = py
      }
      kick()
    }

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null
      if (!t || typeof t.closest !== 'function') return
      const interactive = t.closest<HTMLElement>(
        'a, button, [role="button"], [data-cursor], input, textarea, select, summary, [tabindex]:not([tabindex="-1"])',
      )
      if (!interactive) {
        setMode('default')
        setLabel('')
        return
      }
      const declared = interactive.dataset.cursor as Mode | undefined
      if (declared) {
        setMode(declared)
        setLabel(interactive.dataset.cursorLabel ?? '')
        return
      }
      setMode(interactive.matches('input, textarea, select') ? 'input' : 'link')
      setLabel('')
    }

    const onLeave = () => {
      visible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const onDown = () => setMode((m) => (m === 'view' ? m : 'default'))
    const onUp = () => {}

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('blur', onLeave)
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('blur', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      if (frame) cancelAnimationFrame(frame)
      delete document.documentElement.dataset.customCursor
    }
  }, [])

  if (!enabled) return null

  return (
    <div className={s.layer} aria-hidden="true">
      <div
        ref={ringRef}
        className={s.ring}
        data-mode={mode}
        data-label={label || undefined}
      >
        {label && <span className={s.ringLabel}>{label}</span>}
      </div>
      <div ref={dotRef} className={s.dot} data-mode={mode} />
    </div>
  )
}
