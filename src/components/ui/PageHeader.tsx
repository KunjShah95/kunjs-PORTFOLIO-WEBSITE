import { Kicker } from './Kicker';
import { clsx } from 'clsx';

interface PageHeaderProps {
  kicker?: string;
  title: string;
  lede?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({ kicker, title, lede, className, children }: PageHeaderProps) {
  return (
    <header className={clsx('pt-24 pb-16 border-b border-rule/12', className)}>
      <div className="max-w-manifest mx-auto px-6">
        {kicker && <Kicker accent>{kicker}</Kicker>}
        <h1 className="display text-5xl md:text-6xl mt-3 max-w-prose">{title}</h1>
        {lede && <p className="mt-6 text-lg text-ink-secondary max-w-prose leading-relaxed">{lede}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}
