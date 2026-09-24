import { clsx } from 'clsx';

interface MetaRowItem {
  label: string;
  value: React.ReactNode;
}

interface MetaRowProps {
  items: MetaRowItem[];
  className?: string;
}

export function MetaRow({ items, className }: MetaRowProps) {
  return (
    <dl className={clsx('grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3', className)}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className="kicker mb-1">{item.label}</dt>
          <dd className="font-mono text-sm text-ink-primary">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
