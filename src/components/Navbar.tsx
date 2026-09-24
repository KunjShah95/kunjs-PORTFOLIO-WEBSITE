import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, Search, X } from 'lucide-react'
import { clsx } from 'clsx'
import { ThemeToggle } from './ThemeToggle'

const NAV = [
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/blogs', label: 'Writing' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
  const searchHint = isMac ? '⌘ K' : 'Ctrl K'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <>
      <header className={clsx('fixed inset-x-0 top-0 z-50 border-b transition-all duration-300', scrolled ? 'border-rule/10 bg-paper/90 py-2 backdrop-blur-xl' : 'border-transparent bg-paper/65 py-4 backdrop-blur-md')}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-6">
          <Link to="/" className="group flex items-center gap-3" aria-label="Kunj Shah home">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-mono text-[10px] font-bold text-accent-ink transition-transform group-hover:-translate-y-0.5">KS</span>
            <span className="hidden sm:block"><span className="block font-display text-sm font-semibold tracking-tight text-ink-primary">Kunj Shah</span><span className="block whitespace-nowrap font-mono text-[9px] tracking-[0.08em] text-ink-tertiary">AI engineer · builder · open-source contributor</span></span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">{NAV.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => clsx('rounded-lg px-3.5 py-2 text-xs font-medium transition-colors', isActive ? 'bg-ink-primary text-paper' : 'text-ink-secondary hover:bg-sunken hover:text-ink-primary')}>{item.label}</NavLink>)}</nav>
          <div className="flex items-center gap-1.5"><button onClick={onOpenCommand} className="hidden min-h-9 items-center gap-2 rounded-lg border border-rule/10 px-3 text-ink-tertiary transition-colors hover:border-rule/20 hover:bg-elevated hover:text-ink-primary sm:inline-flex" aria-label="Open command menu"><Search className="h-3.5 w-3.5" /><span className="font-mono text-[9px] uppercase tracking-[0.1em]">{searchHint}</span></button><ThemeToggle /><Link to="/contact" className="hidden min-h-9 items-center gap-1.5 rounded-lg bg-ink-primary px-3 text-xs font-semibold text-paper transition-colors hover:bg-accent sm:inline-flex">Start a project <ArrowUpRight className="h-3.5 w-3.5" /></Link><button onClick={() => setMobileOpen(true)} className="grid h-10 w-10 place-items-center rounded-lg text-ink-secondary transition-colors hover:bg-sunken hover:text-ink-primary md:hidden" aria-label="Open menu" aria-expanded={mobileOpen}><Menu className="h-5 w-5" /></button></div>
        </div>
      </header>
      <AnimatePresence>
        {mobileOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation"><button className="absolute inset-0 bg-ink-primary/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-label="Close navigation" /><motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} className="relative flex min-h-full w-[min(88vw,22rem)] flex-col border-r border-rule/10 bg-paper p-5 shadow-2xl"><div className="flex items-center justify-between"><button onClick={() => setMobileOpen(false)} className="grid h-10 w-10 place-items-center rounded-lg text-ink-tertiary hover:bg-sunken hover:text-ink-primary" aria-label="Close menu"><X className="h-5 w-5" /></button></div><nav className="mt-16 flex flex-col" aria-label="Mobile primary">{NAV.map((item, index) => <motion.div key={item.to} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}><NavLink to={item.to} className={({ isActive }) => clsx('flex items-center justify-between border-b border-rule/10 py-5 font-display text-3xl tracking-tight', isActive ? 'text-accent' : 'text-ink-primary')}>{item.label}<ArrowUpRight className="h-5 w-5" /></NavLink></motion.div>)}</nav><div className="mt-auto border-t border-rule/10 pt-5"><p className="text-sm leading-6 text-ink-secondary">Agents, retrieval, edge vision, and the product work around them.</p><span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-accent"><span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" /> Available for new work</span></div></motion.div></motion.div>}
      </AnimatePresence>
    </>
  )
}
