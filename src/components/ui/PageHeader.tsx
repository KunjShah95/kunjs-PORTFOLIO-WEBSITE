import { Kicker } from './Kicker';
import { clsx } from 'clsx';
import { ShaderBackground } from '../effects/ShaderBackground';

interface PageHeaderProps {
  kicker?: string;
  title: string;
  lede?: string;
  className?: string;
  children?: React.ReactNode;
  center?: boolean;
  /** subtle WebGL aurora behind the header — the site signature. Default on. */
  shader?: boolean;
}

export function PageHeader({ kicker, title, lede, className, children, center, shader = true }: PageHeaderProps) {
  return (
    <header
      className={clsx(
        'relative overflow-hidden pt-24 pb-16 border-b border-rule/12',
        center && 'text-center',
        className,
      )}
    >
      {shader && (
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
          <ShaderBackground className="opacity-40 md:opacity-[0.55]" intensity={0.45} />
          {/* contrast scrim: keep title crisp, melt into the page below */}
          <div className="absolute inset-0 bg-gradient-to-b from-paper/30 via-paper/70 to-paper" />
          {!center && (
            <div className="absolute inset-0 bg-gradient-to-r from-paper/80 via-paper/40 to-transparent" />
          )}
        </div>
      )}
      <div className={clsx('max-w-manifest mx-auto px-6', center && 'flex flex-col items-center')}>
        {kicker && <Kicker accent>{kicker}</Kicker>}
        <h1 className={clsx('display text-5xl md:text-6xl mt-3', center ? 'max-w-3xl' : 'max-w-prose')}>{title}</h1>
        {lede && <p className={clsx('mt-6 text-lg text-ink-secondary leading-relaxed', center ? 'max-w-2xl' : 'max-w-prose')}>{lede}</p>}
        {children && <div className={clsx('mt-8', center && 'flex justify-center')}>{children}</div>}
      </div>
    </header>
  );
}
