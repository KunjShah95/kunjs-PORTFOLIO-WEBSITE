import Link from "next/link";
import { Icon } from "@/components/icon";
import { indexItems } from "@/lib/site-data";

/**
 * Previous / next section links built from the site index, so no sub-page
 * is a dead end. The global footer (root layout) handles everything else.
 */
export function SubPageFooter({ current }: { current: string }) {
  const i = indexItems.findIndex((item) => item.href === current);
  const prev = i > 0 ? indexItems[i - 1] : null;
  const next = i >= 0 && i < indexItems.length - 1 ? indexItems[i + 1] : null;

  const card =
    "group lift flex-1 flex items-center gap-3 p-space-md md:p-6 rounded-2xl bg-surface-card border border-border-hairline min-w-0";

  return (
    <nav aria-label="Section navigation" className="w-full flex items-stretch gap-2 md:gap-4">
      {prev ? (
        <Link className={`${card} text-left`} href={prev.href}>
          <span className="text-text-muted shrink-0 transition-transform duration-300 group-hover:-translate-x-1">
            <Icon className="rotate-180" name="arrow_forward" size={18} />
          </span>
          <span className="min-w-0">
            <span className="font-body-sm text-body-sm text-text-muted block">
              Previous
            </span>
            <span className="font-headline-md text-headline-md md:text-headline-lg text-text-primary truncate block">
              {prev.label}
            </span>
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}

      {next && (
        <Link className={`${card} justify-end text-right`} href={next.href}>
          <span className="min-w-0">
            <span className="font-body-sm text-body-sm text-text-muted block">
              Next
            </span>
            <span className="font-headline-md text-headline-md md:text-headline-lg text-text-primary truncate block">
              {next.label}
            </span>
          </span>
          <span className="text-text-muted shrink-0 transition-transform duration-300 group-hover:translate-x-1">
            <Icon name="arrow_forward" size={18} />
          </span>
        </Link>
      )}
    </nav>
  );
}
