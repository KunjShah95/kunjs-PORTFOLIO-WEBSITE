import { clsx } from 'clsx';

interface RuleProps {
  strong?: boolean;
  label?: string;
  className?: string;
}

export function Rule({ strong = false, label, className }: RuleProps) {
  if (label) {
    return (
      <div className={clsx('flex items-center gap-4 my-8', className)}>
        <div className={clsx('flex-1', strong ? 'rule-strong' : 'rule')} />
        <span className="kicker">{label}</span>
        <div className={clsx('flex-1', strong ? 'rule-strong' : 'rule')} />
      </div>
    );
  }
  return <div className={clsx(strong ? 'rule-strong' : 'rule', className)} />;
}
