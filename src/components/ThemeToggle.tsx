import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Moon, Palette, Sun } from 'lucide-react'
import { clsx } from 'clsx'

export type ThemeName = 'canvas' | 'obsidian' | 'ash'

export const THEMES: Array<{ id: ThemeName; label: string; description: string; colors: string[]; icon: typeof Sun }> = [
  { id: 'canvas', label: 'Canvas', description: 'Emerald editorial', colors: ['#F8FCF9', '#059669', '#142C24'], icon: Sun },
  { id: 'obsidian', label: 'Obsidian', description: 'Electric depth', colors: ['#080B12', '#38BDF8', '#DCF0FF'], icon: Moon },
  { id: 'ash', label: 'Ash', description: 'Quiet gold', colors: ['#F4F4F5', '#F59E0B', '#18181B'], icon: Palette },
]

function getInitialTheme(): ThemeName {
  if (typeof window === 'undefined') return 'canvas'
  const stored = localStorage.getItem('theme')
  return THEMES.some((theme) => theme.id === stored) ? stored as ThemeName : 'canvas'
}

function applyTheme(theme: ThemeName) {
  const root = document.documentElement
  const isDark = theme === 'obsidian'
  root.dataset.theme = theme
  root.classList.toggle('dark', isDark)
  root.style.colorScheme = isDark ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeName>(getInitialTheme)
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const activeTheme = THEMES.find((item) => item.id === theme) ?? THEMES[1]

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    if (!open) return
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <div ref={wrapperRef} className="relative">
      <button onClick={() => setOpen((value) => !value)} className="flex h-9 items-center gap-2 rounded-lg px-2 text-ink-secondary transition-colors hover:bg-sunken hover:text-ink-primary" aria-label={`Choose theme. Current theme: ${activeTheme.label}`} aria-haspopup="menu" aria-expanded={open}>
        <span className="grid h-5 w-5 place-items-center rounded-full border border-rule/15" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full" style={{ background: activeTheme.colors[1] }} /></span>
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.08em] lg:inline">{activeTheme.label}</span>
      </button>

      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.16 }} className="absolute right-0 top-11 z-[120] w-64 border border-rule/15 bg-elevated p-2 shadow-2xl" role="menu" aria-label="Theme selection">
          <div className="border-b border-rule/10 px-3 pb-3 pt-2"><span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-tertiary">Appearance</span><p className="mt-1 text-xs text-ink-secondary">Choose the atmosphere, not the content.</p></div>
          <div className="mt-2 grid gap-1">{THEMES.map((item) => { const Icon = item.icon; const isActive = item.id === theme; return <button key={item.id} role="menuitemradio" aria-checked={isActive} onClick={() => { setTheme(item.id); setOpen(false) }} className={clsx('flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors', isActive ? 'bg-sunken text-ink-primary' : 'text-ink-secondary hover:bg-sunken/60 hover:text-ink-primary')}><span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md border border-rule/10" style={{ background: item.colors[0] }}><Icon className="h-3.5 w-3.5" style={{ color: item.colors[1] }} /></span><span className="min-w-0 flex-1"><span className="block text-xs font-semibold">{item.label}</span><span className="mt-0.5 block text-[11px] text-ink-tertiary">{item.description}</span></span>{isActive && <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />}</button> })}</div>
        </motion.div>}
      </AnimatePresence>
    </div>
  )
}
