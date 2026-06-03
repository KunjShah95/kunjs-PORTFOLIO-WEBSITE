import { clsx } from 'clsx';

interface SectionLabelProps {
  number?: string;
  label: string;
  className?: string;
}

export function SectionLabel({ number, label, className }: SectionLabelProps) {
  return (
    <div className={clsx('flex items-baseline gap-3 mb-8', className)}>
      {number && (
        <span className="font-mono text-sm text-accent tabular-nums">{number}</span>
      )}
      <span className="kicker">{label}</span>
    </div>
  );
}
