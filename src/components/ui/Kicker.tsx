import { clsx } from 'clsx';

interface KickerProps {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export function Kicker({ children, accent = false, className }: KickerProps) {
  return (
    <span className={clsx('kicker', accent && 'kicker-accent', className)}>
      {children}
    </span>
  );
}
