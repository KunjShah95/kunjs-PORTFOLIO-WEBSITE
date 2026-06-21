import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { revealStaggerVariants } from '../../hooks/useReveal'
import { useTilt } from '../../hooks/useTilt'

interface BentoCardProps {
  title?: string
  desc?: string
  icon?: React.ReactNode
  header?: React.ReactNode
  children?: React.ReactNode
  className?: string
  span?: string
  variant?: 'default' | 'elevated' | 'accent' | 'inset'
  tilt?: boolean
  href?: string
  onClick?: () => void
}

export function BentoCard({
  title, desc, icon, header, children,
  className, span, variant = 'default', tilt = false, href, onClick,
}: BentoCardProps) {
  const tiltHook = useTilt({ scale: 1.005, maxRotation: 4 })
  const Tag = href ? 'a' : onClick ? 'button' : 'div'
  const extraProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : onClick ? { onClick } : {}

  const variantStyles = {
    default: 'bg-paper hover:bg-elevated',
    elevated: 'bg-elevated hover:bg-sunken',
    accent: 'bg-accent/8 hover:bg-accent/15',
    inset: 'bg-sunken hover:bg-elevated',
  }

  const content = (
    <motion.div
      variants={revealStaggerVariants}
      className={clsx(
        'group relative flex flex-col p-6 md:p-8 transition-colors duration-base ease-out-soft',
        variantStyles[variant],
        span,
        tilt && 'cursor-default',
        className,
      )}
      {...(tilt ? { ref: tiltHook.ref, style: tiltHook.style, ...tiltHook.handlers } : {})}
    >
      <span
        aria-hidden
        className="absolute top-0 left-0 h-px w-0 bg-ink-primary group-hover:w-full transition-all duration-slow ease-out-soft"
      />
      {header && <div className="mb-4">{header}</div>}
      {icon && <div className="mb-3 text-ink-tertiary group-hover:text-ink-primary transition-colors">{icon}</div>}
      {title && (
        <h3 className="font-display text-xl md:text-2xl leading-tight tracking-tightest text-ink-primary mb-2">
          {title}
        </h3>
      )}
      {desc && (
        <p className="text-sm text-ink-secondary leading-relaxed">{desc}</p>
      )}
      {children}
    </motion.div>
  )

  return (
    <Tag {...extraProps} className={clsx('block', span)}>
      {content}
    </Tag>
  )
}
