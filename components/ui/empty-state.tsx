import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icon";
import { cn } from "@/lib/cn";

/**
 * Composed empty / fallback state. Says what happened in one line and
 * always offers a way forward, so a filter with no results or a failed
 * fetch never ends in a blank area.
 */
export function EmptyState({
  icon = "tag",
  title,
  body,
  action,
  className,
}: {
  icon?: IconName;
  title: ReactNode;
  body?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 rounded-2xl border border-dashed border-border-dotted px-6 py-10 md:px-10 md:py-14",
        className,
      )}
      role="status"
    >
      <span className="w-10 h-10 rounded-xl bg-surface-container text-text-secondary flex items-center justify-center">
        <Icon name={icon} size={20} />
      </span>
      <p className="font-headline-md text-headline-md text-text-primary">{title}</p>
      {body && (
        <p className="font-body-md text-body-md text-text-secondary max-w-[48ch]">{body}</p>
      )}
      {action && <div className="pt-1">{action}</div>}
    </div>
  );
}
