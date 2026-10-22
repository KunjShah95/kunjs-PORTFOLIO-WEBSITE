"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "@/lib/motion-client";
import { Icon } from "@/components/icon";
import { Reveal } from "@/components/primitives/Reveal";
import { StatStrip } from "@/components/ui/blocks";
import { SectionLabel } from "@/components/ui/primitives";
import { EASE_OUT, inView } from "@/lib/motion";

type Metric = { value: string; label: string };

const HIGHLIGHT_CHIPS = ["Solo finalist", "2,000+ teams", "48 hours"] as const;

function HighlightCard({ blurb, animated }: { blurb: string; animated: boolean }) {
  const shell =
    "relative overflow-hidden rounded-2xl border border-border-hairline bg-surface-card p-space-md md:p-6 flex flex-col gap-3";

  const chips = (
    <div className="relative flex flex-wrap gap-1.5 pt-0.5">
      {HIGHLIGHT_CHIPS.map((chip, i) =>
        animated ? (
          <motion.span
            className="px-2.5 py-1 rounded-full bg-surface-subtle font-body-sm text-body-sm text-text-secondary"
            initial={{ y: 8 }}
            key={chip}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.2 + i * 0.06 }}
            viewport={inView}
            whileInView={{ y: 0 }}
          >
            {chip}
          </motion.span>
        ) : (
          <span
            className="px-2.5 py-1 rounded-full bg-surface-subtle font-body-sm text-body-sm text-text-secondary"
            key={chip}
          >
            {chip}
          </span>
        ),
      )}
    </div>
  );

  const inner = (
    <>
      {animated ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-emerald/10 blur-2xl"
          initial={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 0.25 }}
          viewport={inView}
          whileInView={{ scale: 1, opacity: 1 }}
        />
      ) : null}
      <SectionLabel tone="emerald-ink">Highlight</SectionLabel>
      <p className="relative font-body-md text-body-md text-text-secondary leading-relaxed max-w-2xl">
        {blurb}
      </p>
      {chips}
    </>
  );

  if (!animated) {
    return (
      <section aria-label="Highlight" className={shell}>
        {inner}
      </section>
    );
  }

  return (
    <motion.section
      aria-label="Highlight"
      className={shell}
      initial={{ y: 20 }}
      transition={{ duration: 0.78, ease: EASE_OUT, delay: 0.12 }}
      viewport={inView}
      whileInView={{ y: 0 }}
    >
      {inner}
    </motion.section>
  );
}

export function OpenSourceImpact({
  items,
}: {
  items: readonly Metric[];
}) {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col gap-space-sm">
      <Reveal delay={0.05}>
        <StatStrip items={items} tone="plain" />
      </Reveal>

      {reduce ? (
        <Link
          className="inline-flex items-center gap-1.5 -my-3 py-3 font-body-sm text-body-sm text-text-muted hover:text-text-primary transition-colors w-fit group"
          href="/open-source"
        >
          See the pull requests
          <Icon
            className="transition-transform group-hover:translate-x-0.5"
            name="arrow_forward"
            size={13}
          />
        </Link>
      ) : (
        <motion.div
          initial={{ y: 14 }}
          transition={{ duration: 0.68, ease: EASE_OUT, delay: 0.2 }}
          viewport={inView}
          whileInView={{ y: 0 }}
        >
          <Link
            className="inline-flex items-center gap-1.5 -my-3 py-3 font-body-sm text-body-sm text-text-muted hover:text-text-primary transition-colors w-fit group"
            href="/open-source"
          >
            <span className="link-draw">See the pull requests</span>
            <Icon
              className="transition-transform group-hover:translate-x-0.5"
              name="arrow_forward"
              size={13}
            />
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export function HackathonSpotlight({
  finals,
  total,
  blurb,
}: {
  finals: number;
  total: number;
  blurb: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col gap-space-sm">
      <Reveal delay={0.04}>
        <StatStrip
          items={[
            { value: String(finals), label: "Finals reached" },
            { value: String(total), label: "Entered" },
          ]}
        />
      </Reveal>

      <HighlightCard animated={!reduce} blurb={blurb} />
    </div>
  );
}
