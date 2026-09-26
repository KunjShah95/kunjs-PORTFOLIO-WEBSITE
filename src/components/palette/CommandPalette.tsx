'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import type { PaletteRecord } from '@/lib/content'
import { IDENTITY, SECONDARY_NAV } from '@/lib/site'
import s from './CommandPalette.module.css'

type Kind = PaletteRecord['kind'] | 'action'

interface Item {
  id: string
  kind: Kind
  label: string
  sub: string
  href: string
  external?: boolean
  haystack: string
  /** Static actions sort above search hits. */
  weight: number
}

const KIND_LABEL: Record<Kind, string> = {
  action: 'Go to',
  project: 'Work',
  note: 'Writing',
  lab: 'Lab',
  page: 'Page',
}

/** Subsequence match with a bonus for contiguous runs and word starts.
 *  Cheap, predictable, and good enough for a 50-item index. */
function score(query: string, target: string): number {
  if (!query) return 1
  const q = query.toLowerCase()
  const t = target.toLowerCase()

  const direct = t.indexOf(q)
  if (direct === 0) return 1000 - t.length
  if (direct > 0) return 600 - direct - t.length * 0.1

  let ti = 0
  let hits = 0
  let streak = 0
  let best = 0
  for (const ch of q) {
    const found = t.indexOf(ch, ti)
    if (found === -1) return 0
    streak = found === ti ? streak + 1 : 0
    best = Math.max(best, streak)
    hits += 1
    ti = found + 1
  }
  return hits * 4 + best * 12 - t.length * 0.1
}

export function CommandPalette({
  open,
  onOpenChange,
  records,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  records: PaletteRecord[]
}) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const items = useMemo<Item[]>(() => {
    const actions: Item[] = [
      {
        id: 'action:work',
        kind: 'action',
        label: 'Search projects',
        sub: 'Shipped systems and case studies',
        href: '/work',
        haystack: 'search projects work shipped case studies',
        weight: 40,
      },
      {
        id: 'action:writing',
        kind: 'action',
        label: 'Search writing',
        sub: 'Field Notes — systems, engineering, experiments',
        href: '/writing',
        haystack: 'search writing field notes articles essays',
        weight: 39,
      },
      {
        id: 'action:lab',
        kind: 'action',
        label: 'Search lab',
        sub: 'Experiments and unfinished research',
        href: '/lab',
        haystack: 'search lab experiments research unfinished',
        weight: 38,
      },
      {
        id: 'action:stack',
        kind: 'action',
        label: 'Explore stack',
        sub: 'Technology map, evidence-linked',
        href: '/stack',
        haystack: 'explore stack technology map skills tools',
        weight: 37,
      },
      {
        id: 'action:github',
        kind: 'action',
        label: 'GitHub',
        sub: '@KunjShah95',
        href: IDENTITY.github,
        external: true,
        haystack: 'github code repositories source open source',
        weight: 36,
      },
      {
        id: 'action:linkedin',
        kind: 'action',
        label: 'LinkedIn',
        sub: 'kunjshah05',
        href: IDENTITY.linkedin,
        external: true,
        haystack: 'linkedin profile professional network',
        weight: 35,
      },
      {
        id: 'action:resume',
        kind: 'action',
        label: 'Résumé',
        sub: 'PDF — CV and AI/ML variant',
        href: IDENTITY.resume,
        external: true,
        haystack: 'resume cv pdf curriculum vitae download',
        weight: 34,
      },
      {
        id: 'action:contact',
        kind: 'action',
        label: 'Contact',
        sub: IDENTITY.email,
        href: '/contact',
        haystack: 'contact email hire availability work together',
        weight: 33,
      },
      ...SECONDARY_NAV.map((n, i) => ({
        id: `action:page:${n.href}`,
        kind: 'page' as const,
        label: n.label,
        sub: 'Section',
        href: n.href,
        haystack: `${n.label} section page`,
        weight: 20 - i,
      })),
    ]

    const content: Item[] = records.map((r) => ({
      id: r.id,
      kind: r.kind,
      label: r.label,
      sub: r.sub,
      href: r.href,
      haystack: r.keywords,
      weight: 0,
    }))

    const all = [...actions, ...content]
    if (!query.trim()) {
      return all.sort((a, b) => b.weight - a.weight).slice(0, 40)
    }
    return all
      .map((it) => ({ it, s: Math.max(score(query, it.label), score(query, it.haystack) * 0.6) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || b.it.weight - a.it.weight)
      .slice(0, 40)
      .map((x) => x.it)
  }, [query, records])

  const commit = useCallback(
    (item: Item | undefined) => {
      if (!item) return
      onOpenChange(false)
      setQuery('')
      if (item.external) {
        window.open(item.href, '_blank', 'noreferrer,noopener')
      } else {
        router.push(item.href)
      }
    },
    [onOpenChange, router],
  )

  // Focus management: remember what was focused, restore it on close.
  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement as HTMLElement | null
    setQuery('')
    setActive(0)
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(id)
      document.body.style.overflow = prevOverflow
      restoreRef.current?.focus?.()
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  // Keep the highlighted row in view without smooth-scrolling the page.
  useEffect(() => {
    if (!open) return
    const el = listRef.current?.children[active] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  if (!open) return null

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActive((i) => (items.length ? (i + 1) % items.length : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActive((i) => (items.length ? (i - 1 + items.length) % items.length : 0))
        break
      case 'Home':
        e.preventDefault()
        setActive(0)
        break
      case 'End':
        e.preventDefault()
        setActive(Math.max(0, items.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        commit(items[active])
        break
      case 'Escape':
        e.preventDefault()
        onOpenChange(false)
        break
      case 'Tab':
        // Trap focus inside the dialog.
        e.preventDefault()
        break
    }
  }

  return (
    <div className={s.scrim} onMouseDown={() => onOpenChange(false)}>
      <div
        className={s.dialog}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className={s.field}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            aria-hidden="true"
            className={s.fieldIcon}
          >
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" fill="none" />
            <path d="m11 11 3.5 3.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          <input
            ref={inputRef}
            className={s.input}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={items[active] ? `palette-${items[active].id}` : undefined}
            aria-autocomplete="list"
            aria-label="Search projects, writing and lab experiments"
            placeholder="Search projects, writing, lab…"
            value={query}
            spellCheck={false}
            autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className={s.esc}>ESC</kbd>
        </div>

        <ul className={s.list} id="palette-list" role="listbox" aria-label="Results" ref={listRef}>
          {items.length === 0 && (
            <li className={s.empty} role="presentation">
              <span className="mono-sm">No match</span>
              <p className={s.emptyBody}>
                Nothing in work, writing or lab matches “{query}”. Try a technology, a
                project name, or a category.
              </p>
            </li>
          )}
          {items.map((item, i) => (
            <li
              key={item.id}
              id={`palette-${item.id}`}
              role="option"
              aria-selected={i === active}
              className={s.row}
              data-active={i === active || undefined}
              onMouseEnter={() => setActive(i)}
              onClick={() => commit(item)}
            >
              <span className={s.rowKind}>{KIND_LABEL[item.kind]}</span>
              <span className={s.rowBody}>
                <span className={s.rowLabel}>{item.label}</span>
                <span className={s.rowSub}>{item.sub}</span>
              </span>
              {item.external ? (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={s.rowIcon}>
                  <path d="M2 10 10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.2" fill="none" />
                </svg>
              ) : (
                <span className={s.rowEnter}>↵</span>
              )}
            </li>
          ))}
        </ul>

        <div className={s.foot}>
          <span className="mono-sm">
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span className="mono-sm">
            <kbd>↵</kbd> open
          </span>
          <span className="mono-sm">
            <kbd>esc</kbd> dismiss
          </span>
          <span className={s.count}>{items.length} results</span>
        </div>
      </div>
    </div>
  )
}
