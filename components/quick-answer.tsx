import Link from "next/link";

/**
 * "Quick answer" — the audit-requested answer block for pricing and service
 * questions, written for both human scanners and answer engines. The bold
 * lead states the answer in the first line; the source line points at the
 * machine-readable originals so a citation always resolves.
 */
export function QuickAnswer({
  children,
  source,
}: {
  children: React.ReactNode;
  /** Where the same answer lives in machine-readable form. */
  source: { label: string; href: string }[];
}) {
  return (
    <dl className="rounded-2xl border border-border-hairline bg-surface-card p-5 md:p-6 flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <dt className="eyebrow text-signal-ink">Quick answer</dt>
        <dd className="font-body-md text-body-md text-text-primary max-w-[64ch]">{children}</dd>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border-hairline pt-3 font-body-sm text-body-sm text-text-muted">
        <span>Source:</span>
        {source.map((entry, index) => (
          <span key={entry.href} className="inline-flex items-center gap-2">
            {index > 0 && <span aria-hidden="true" className="text-border-dotted">·</span>}
            {entry.href.startsWith("/") ? (
              <Link className="link-dots hover:text-text-primary" href={entry.href}>
                {entry.label}
              </Link>
            ) : (
              <a className="link-dots hover:text-text-primary" href={entry.href}>
                {entry.label}
              </a>
            )}
          </span>
        ))}
      </div>
    </dl>
  );
}
