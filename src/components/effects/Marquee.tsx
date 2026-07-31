import { clsx } from 'clsx'

interface MarqueeProps {
  items: string[]
  reverse?: boolean
  className?: string
  /** optional click handler per item (e.g. filter, link) */
  onItemClick?: (item: string) => void
}

/**
 * An infinitely-scrolling row of pills. The list is doubled so the -50%
 * translate loops seamlessly.
 *
 * Interactions:
 *  - hovering anywhere on the strip pauses the scroll (so a pill can be read)
 *  - each pill lifts, scales, fills with accent, and casts a soft glow on hover
 *  - pressing a pill gives tactile feedback (:active scale-down)
 * All CSS-driven — no state, no re-renders, honors reduced-motion via the
 * global media query that freezes animations.
 */
export function Marquee({ items, reverse, className, onItemClick }: MarqueeProps) {
  const doubled = [...items, ...items]
  const interactive = typeof onItemClick === 'function'

  return (
    <div className={clsx('group relative overflow-x-clip', className)}>
      <div
        className={clsx(
          'flex gap-2.5 w-max py-2 will-change-transform group-hover:[animation-play-state:paused]',
          reverse ? 'animate-marq-rev' : 'animate-marq',
        )}
      >
        {doubled.map((t, i) => (
          <button
            key={`${t}-${i}`}
            type="button"
            tabIndex={interactive ? 0 : -1}
            aria-hidden={!interactive}
            onClick={interactive ? () => onItemClick!(t) : undefined}
            className={clsx(
              'relative font-mono text-xs px-3.5 py-1.5 rounded-full whitespace-nowrap select-none',
              'border border-rule/12 bg-sunken text-ink-primary',
              'transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out-soft',
              'hover:z-10 hover:-translate-y-1 hover:scale-[1.08] hover:border-accent/45 hover:bg-accent/10 hover:text-accent',
              'hover:shadow-[0_10px_26px_-6px_rgb(var(--accent)/0.35)]',
              'active:scale-95 active:translate-y-0 active:duration-100',
              'focus-visible:z-10 focus-visible:border-accent/50 focus-visible:text-accent',
              interactive ? 'cursor-pointer' : 'cursor-default',
            )}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}
