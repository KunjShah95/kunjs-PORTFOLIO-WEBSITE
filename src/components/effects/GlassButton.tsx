import { Link } from 'react-router-dom'
import { clsx } from 'clsx'
import { Magnetic } from './Magnetic'

interface GlassButtonProps {
  children: React.ReactNode
  to?: string
  href?: string
  icon?: React.ReactNode
  variant?: 'accent' | 'glass' | 'glass-invert'
  className?: string
  magnetic?: boolean
}

/**
 * Glassmorphic button with a shine sweep + magnetic lift microinteraction.
 * Taste cue: one rewarding hover, translucent depth, hairline + inner highlight.
 */
export function GlassButton({
  children, to, href, icon, variant = 'glass', className, magnetic = true,
}: GlassButtonProps) {
  const base =
    'group relative inline-flex items-center gap-2 h-12 px-6 rounded-xl font-semibold text-[15px] ' +
    'glass-shine transition-[transform,box-shadow,filter] duration-300 ease-out-soft ' +
    'hover:-translate-y-0.5 will-change-transform'

  const variants = {
    accent: 'bg-accent text-accent-ink border border-accent/40 shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] hover:brightness-110 hover:shadow-[0_12px_30px_rgb(var(--accent)/0.4)]',
    glass: 'glass text-ink-primary hover:shadow-[0_14px_36px_rgb(0_0_0/0.2)]',
    'glass-invert': 'glass-invert text-paper hover:shadow-[0_14px_36px_rgb(0_0_0/0.4)]',
  }

  const cls = clsx(base, variants[variant], className)
  const inner = (
    <>
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
      <span className="relative z-[1]">{children}</span>
    </>
  )

  const el = to ? (
    <Link to={to} className={cls}>{inner}</Link>
  ) : (
    <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={cls}>{inner}</a>
  )

  return magnetic ? <Magnetic>{el}</Magnetic> : el
}
