import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site-data";

/**
 * The two links a recruiter checks before anything else: the CV and the
 * code. They sit with the primary calls to action on the pages a visitor
 * lands on first, so the proof is one glance away instead of something to
 * hunt for in a footer.
 *
 * Both open in a new tab — the point is to be able to check one and come
 * back to the page they came from.
 */
export function ProofLinks({
  className,
  from,
  githubHint,
}: {
  /** Placement label, so hero and case-study clicks stay separable. */
  from: string;
  className?: string;
  /** Optional context beside the GitHub label, e.g. "60+ merged PRs". */
  githubHint?: string;
}) {
  const linkClass =
    "inline-flex items-center gap-1.5 min-h-11 -my-1 py-1 font-body-sm text-body-sm font-medium text-text-primary transition-colors hover:text-text-secondary";

  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
      <a
        className={linkClass}
        data-track="Resume Clicked"
        data-track-from={from}
        href="/kunjshah_cv.pdf"
        rel="noopener"
        target="_blank"
      >
        <Icon className="text-text-muted" name="download" size={15} />
        <span className="underline decoration-border-dotted underline-offset-4">
          Resume (PDF)
        </span>
      </a>
      <a
        className={linkClass}
        data-track="GitHub Clicked"
        data-track-from={from}
        href={site.links.github}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Icon className="text-text-muted" name="code_blocks" size={15} />
        <span className="underline decoration-border-dotted underline-offset-4">
          GitHub
        </span>
        {githubHint ? (
          <span className="font-normal text-text-muted">{githubHint}</span>
        ) : null}
      </a>
    </div>
  );
}
