import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";
import { pullQuote } from "@/lib/site-data";

/**
 * A single line of the manifesto, set as a pull quote.
 *
 * Every portfolio ends with a call to action. This is the thing said before
 * it — one opinion, stated flatly, that tells a reader what the work
 * actually stands for in the author's own words.
 *
 * The line is lifted from the manifesto rather than written for the occasion
 * (`pullQuote` in site-data), so the quote and the page it points at cannot
 * disagree. It is set in the serif face the rest of the site does not use,
 * which is what makes it read as an aside rather than another section.
 *
 * It is always one line. At 73 characters the type cannot be set at a fixed
 * size and still fit — it either wraps to three lines on a phone or
 * overflows the column. So the size is derived from the container's own
 * width (see `quote-line-text` in globals.css), which makes the sentence
 * fill the measure exactly at every viewport instead of reflowing.
 */
export function PullQuote({ className }: { className?: string }) {
  return (
    <Reveal
      as="figure"
      className={cn("quote-line flex flex-col gap-4", className)}
    >
      <blockquote className="quote-line-text font-serif text-text-primary">
        <span aria-hidden="true" className="text-text-muted">
          &ldquo;
        </span>
        {pullQuote.text}
        <span aria-hidden="true" className="text-text-muted">
          &rdquo;
        </span>
      </blockquote>
      <figcaption className="quote-line-caption flex items-center gap-2 font-label-meta text-label-meta text-text-muted">
        <span aria-hidden="true" className="h-px w-6 bg-border-dotted" />
        <Link
          className="group inline-flex items-center gap-1 transition-colors hover:text-text-primary"
          href={pullQuote.href}
        >
          {pullQuote.source}
          <Icon
            className="transition-transform duration-300 group-hover:translate-x-0.5"
            name="arrow_forward"
            size={12}
          />
        </Link>
      </figcaption>
    </Reveal>
  );
}
