import { Kicker } from './Kicker';
import { clsx } from 'clsx';

interface PageHeaderProps {
  kicker?: string;
  title: string;
  lede?: string;
  className?: string;
  children?: React.ReactNode;
  center?: boolean;
}

export function PageHeader({ kicker, title, lede, className, children, center }: PageHeaderProps) {
  return (
    <header className={clsx('pt-24 pb-16 border-b border-rule/12', center && 'text-center', className)}>
      <div className={clsx('max-w-manifest mx-auto px-6', center && 'flex flex-col items-center')}>
        {kicker && <Kicker accent>{kicker}</Kicker>}
        <h1 className={clsx('display text-5xl md:text-6xl mt-3', center ? 'max-w-3xl' : 'max-w-prose')}>{title}</h1>
        {lede && <p className={clsx('mt-6 text-lg text-ink-secondary leading-relaxed', center ? 'max-w-2xl' : 'max-w-prose')}>{lede}</p>}
        {children && <div className={clsx('mt-8', center && 'flex justify-center')}>{children}</div>}
      </div>
    </header>
  );
}
