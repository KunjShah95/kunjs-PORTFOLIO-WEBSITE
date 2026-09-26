import type { ReactNode } from 'react'

/** Editorial section marker: index · label · rule. The margin-note device
 *  used throughout the site instead of numbered section headers. */
export function Marker({
  index,
  label,
  aside,
}: {
  index: string
  label: string
  aside?: ReactNode
}) {
  return (
    <div className="marker">
      <span className="marker-idx">{index}</span>
      <h2 className="marker-label">{label}</h2>
      <span className="marker-rule" aria-hidden="true" />
      {aside ? <span className="marker-aside">{aside}</span> : null}
    </div>
  )
}

/** Page header for interior routes. Display serif, mono metadata row. */
export function PageHeader({
  index,
  title,
  lede,
  meta,
  children,
}: {
  index: string
  title: string
  lede?: string
  meta?: Array<{ k: string; v: string }>
  children?: ReactNode
}) {
  return (
    <header className="pt-[clamp(120px,16vh,200px)] pb-[clamp(36px,5vw,72px)] border-b border-line">
      <div className="flex items-center gap-4 mb-[clamp(20px,3vw,40px)]">
        <span className="mono-sm tracking-[0.14em] text-signal border border-line-accent px-2 py-[3px]">
          {index}
        </span>
        <span className="mono-sm faint">{title}</span>
      </div>
      <h1 className="font-display text-mega leading-[0.9] tracking-[-0.02em] font-normal text-balance m-0">
        {title}
      </h1>
      {lede ? (
        <p className="mt-[clamp(20px,2.6vw,34px)] text-lede leading-[1.42] text-dim max-w-[46ch] text-pretty">
          {lede}
        </p>
      ) : null}
      {meta && meta.length ? (
        <dl className="mt-[clamp(28px,4vw,48px)] grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-x-8 gap-y-6 border-t border-line pt-6 max-w-[900px]">
          {meta.map((m) => (
            <div key={m.k}>
              <dt className="mono-sm text-ghost mb-1.5">{m.k}</dt>
              <dd className="text-[0.9375rem] text-text my-0 leading-[1.35]">{m.v}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {children}
    </header>
  )
}

/** A labelled claim. Only used where a real measurement exists. */
export function Claim({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note?: string
}) {
  return (
    <div className="grid gap-1 py-4 border-t border-line">
      <span className="mono-sm tracking-[0.12em] text-ghost">{label}</span>
      <span className="font-display text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.05] tracking-[-0.01em] text-text tnum">
        {value}
      </span>
      {note ? (
        <span className="text-[0.8125rem] leading-[1.45] text-faint max-w-[40ch]">
          {note}
        </span>
      ) : null}
    </div>
  )
}

/** External link with the arrow affordance built in. */
export function OutLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      className={className ? `out-link ${className}` : 'out-link'}
      target="_blank"
      rel="noreferrer noopener"
    >
      <span>{children}</span>
      <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
        <path d="M2 10 10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.3" fill="none" />
      </svg>
    </a>
  )
}

/** Hairline CTA used at the end of sections. */
export function RuleLink({
  href,
  label,
  detail,
  external,
}: {
  href: string
  label: string
  detail?: string
  external?: boolean
}) {
  const inner = (
    <>
      <span className="rule-link-label">{label}</span>
      {detail ? <span className="rule-link-detail">{detail}</span> : null}
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <path d="M2 12 12 2M5 2h7v7" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </svg>
    </>
  )
  if (external) {
    return (
      <a className="rule-link" href={href} target="_blank" rel="noreferrer noopener">
        {inner}
      </a>
    )
  }
  return (
    <a className="rule-link" href={href}>
      {inner}
    </a>
  )
}
