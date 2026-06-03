import { clsx } from 'clsx';

interface QuoteProps {
  children: React.ReactNode;
  attribution?: string;
  source?: string;
  className?: string;
}

export function Quote({ children, attribution, source, className }: QuoteProps) {
  return (
    <blockquote className={clsx('my-12 pl-6 border-l-2 border-ink-primary/40', className)}>
      <p className="display text-2xl md:text-3xl italic leading-snug text-ink-primary">
        &ldquo;{children}&rdquo;
      </p>
      {(attribution || source) && (
        <footer className="mt-4 kicker">
          {attribution}
          {attribution && source && ' · '}
          {source}
        </footer>
      )}
    </blockquote>
  );
}
