import { clsx } from 'clsx'

interface MarqueeProps {
  items: string[]
  reverse?: boolean
  className?: string
}

/**
 * A single infinitely-scrolling row of pills. The list is doubled so the
 * -50% translate loops seamlessly. Ported from the imported design's marquee.
 */
export function Marquee({ items, reverse, className }: MarqueeProps) {
  const doubled = [...items, ...items]
  return (
    <div className={clsx('relative overflow-hidden', className)}>
      <div className={clsx('flex gap-2 w-max', reverse ? 'animate-marq-rev' : 'animate-marq')}>
        {doubled.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="font-mono text-xs px-3 py-1.5 border border-rule/12 rounded-full whitespace-nowrap bg-sunken text-ink-primary"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
