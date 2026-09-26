'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { CommandPalette } from '@/components/palette/CommandPalette'
import type { PaletteRecord } from '@/lib/content'
import { NAV, IDENTITY } from '@/lib/site'
import s from './Masthead.module.css'

export function MastheadBar({ records }: { records: PaletteRecord[] }) {
  const pathname = usePathname()
  const [condensed, setCondensed] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const progressRef = useRef<HTMLSpanElement>(null)

  // One passive scroll listener drives both the condensing state and the 1px
  // progress hairline. rAF-throttled, transform only — no layout reads.
  useEffect(() => {
    let frame = 0
    const apply = () => {
      frame = 0
      const y = window.scrollY
      setCondensed(y > 12)
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(1, y / max) : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Cmd/Ctrl+K opens the palette. Kills the browser's own search shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setPaletteOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    setPanelOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  return (
    <>
      <header
        className={s.masthead}
        data-condensed={condensed || undefined}
        data-open={panelOpen || undefined}
      >
        <div className={s.bar}>
          <Link href="/" className={s.mark} aria-label="Kunj Shah — home">
            <span className={s.markDot} aria-hidden="true" />
            <span className={s.markText}>Kunj Shah</span>
          </Link>

          <nav className={s.nav} aria-label="Primary">
            <ul className={s.navList}>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={s.navLink}
                    data-active={isActive(item.href) || undefined}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    <span className={s.navIdx}>{item.index}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={s.end}>
            <button
              type="button"
              className={s.paletteTrigger}
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette. Keyboard shortcut: Command or Control plus K"
            >
              <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
                <path
                  d="M1.5 3.2h9M1.5 6h9M1.5 8.8h5.5"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  fill="none"
                />
              </svg>
              <span className={s.kbd}>⌘K</span>
            </button>

            <a
              href={IDENTITY.github}
              className={s.iconLink}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile of Kunj Shah (opens in a new tab)"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
                />
              </svg>
            </a>

            <button
              type="button"
              className={s.menuButton}
              onClick={() => setPanelOpen((v) => !v)}
              aria-expanded={panelOpen}
              aria-controls="mobile-nav"
            >
              <span className="mono-sm">{panelOpen ? 'Close' : 'Menu'}</span>
              <span className={s.menuGlyph} data-open={panelOpen || undefined} aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>

        <div className={s.progress} aria-hidden="true">
          <span ref={progressRef} />
        </div>
      </header>

      <div
        id="mobile-nav"
        className={s.panel}
        data-open={panelOpen || undefined}
        hidden={!panelOpen}
      >
        <nav aria-label="Primary, expanded">
          <ul className={s.panelList}>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={s.panelLink}
                  data-active={isActive(item.href) || undefined}
                >
                  <span className="mono-sm">{item.index}</span>
                  <span className={s.panelLabel}>{item.label}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path
                      d="M2 12 12 2M5 2h7v7"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={s.panelFoot}>
          <a href={IDENTITY.github} target="_blank" rel="noreferrer noopener" className="mono-sm">
            GitHub ↗
          </a>
          <a href={IDENTITY.linkedin} target="_blank" rel="noreferrer noopener" className="mono-sm">
            LinkedIn ↗
          </a>
          <Link href="/contact" className="mono-sm">
            Contact
          </Link>
          <button
            type="button"
            className="mono-sm"
            onClick={() => {
              setPanelOpen(false)
              setPaletteOpen(true)
            }}
          >
            ⌘K Search
          </button>
        </div>
      </div>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        records={records}
      />
    </>
  )
}
