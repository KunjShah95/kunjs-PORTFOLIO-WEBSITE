import { clsx } from 'clsx'

interface PageHeaderProps {
  kicker?: string
  title: string
  lede?: string
  className?: string
  children?: React.ReactNode
  center?: boolean
  shader?: boolean
}

export function PageHeader({ kicker, title, lede, className, children, center }: PageHeaderProps) {
  return (
    <header className={clsx('relative isolate overflow-hidden border-b border-rule/10 bg-paper px-5 py-16 sm:px-6 md:py-24 lg:py-28', className)}>
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_0%,rgb(var(--accent)/0.10),transparent_32%)]" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgb(var(--rule)/0.22)_0.6px,transparent_0.6px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
      </div>

      {center ? (
        <div className="relative mx-auto max-w-4xl text-center">
          {kicker && <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">{kicker}</span>}
          <h1 className="mx-auto mt-5 max-w-[18ch] font-display text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-ink-primary">{title}</h1>
          {lede && <p className="mx-auto mt-6 max-w-[58ch] text-base leading-7 text-ink-secondary sm:text-lg sm:leading-8">{lede}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      ) : (
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <div>
            {kicker && <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">{kicker}</span>}
            <h1 className="mt-7 max-w-[12ch] font-display text-[clamp(2.9rem,7.2vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-ink-primary">{title}</h1>
            {lede && <p className="mt-7 max-w-[62ch] text-base leading-7 text-ink-secondary sm:text-lg sm:leading-8">{lede}</p>}
            {children && <div className="mt-8">{children}</div>}
          </div>
          <div className="hidden lg:block" aria-hidden>
            <div className="ml-auto max-w-sm border-l border-rule/15 pl-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary">Kunj Shah / Portfolio</div>
              <p className="mt-5 max-w-[24ch] font-display text-2xl font-semibold leading-[1.04] tracking-[-0.03em] text-ink-primary">The work is the introduction.</p>
              <p className="mt-4 max-w-[30ch] text-sm leading-6 text-ink-secondary">AI engineering, systems thinking, and the practical details behind work that keeps running.</p>
              <div className="mt-7 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-tertiary"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> Ahmedabad · Remote</div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
