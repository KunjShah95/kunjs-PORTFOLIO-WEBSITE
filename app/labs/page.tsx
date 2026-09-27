import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { SubPageFooter } from "@/components/ui/sub-page-footer";
import { Tag } from "@/components/ui/primitives";
import { CtaBand, buttonStyles } from "@/components/ui/blocks";
import { cn } from "@/lib/cn";
import { labs } from "@/lib/site-data";
import { pageMeta } from "@/lib/seo";
import { JsonLd, pageBreadcrumb } from "@/components/seo/json-ld";

export const metadata: Metadata = pageMeta({
  path: "/labs",
  title: "AI Labs & Research",
  description: "Research builds and from-scratch infrastructure: a vector database with 9 ANN algorithms, GPT-2 from first principles, and a pure-Python BPE tokenizer.",
  keywords: ["build GPT-2 from scratch", "vector database from scratch", "BPE tokenizer", "AI research projects", "from scratch machine learning"],
});

const STATUS_TONE = {
  Stable: "bg-accent-emerald/15 text-accent-emerald",
  Beta: "bg-surface-container text-text-primary",
  Experimental: "bg-surface-container text-text-secondary",
  Building: "bg-surface-container text-text-secondary",
} as const;

export default function LabsPage() {
  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={pageBreadcrumb("Labs", "/labs")} />
        <PageIntro
          title="Labs"
          lead="Things built to understand how they work, not to ship next quarter, a vector database from scratch, GPT-2 from first principles, a tokenizer in pure Python."
        >
          <span className="font-body-sm text-body-sm text-text-muted">
            {labs.length} builds
          </span>
        </PageIntro>

        {(["Building", "Stable", "Beta", "Experimental"] as const).map((status) => {
          const rows = labs.filter((l) => l.status === status);
          if (rows.length === 0) return null;
          return (
            <PageSection key={status} title={status} meta={`${rows.length}`}>
              <div className="grid gap-3 md:grid-cols-2">
                {rows.map((lab) => {
                  const inner = (
                    <>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-label-meta text-label-meta text-text-muted shrink-0">
                            {lab.id}
                          </span>
                          <h3 className="font-headline-lg text-headline-lg text-text-primary tracking-tight truncate">
                            {lab.title}
                          </h3>
                        </div>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full font-label-badge text-label-badge shrink-0",
                            STATUS_TONE[lab.status],
                          )}
                        >
                          {lab.status}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-text-secondary leading-relaxed">
                        {lab.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {lab.stack.map((item) => (
                          <Tag
                            key={item}
                            tone="subtle"
                          >
                            {item}
                          </Tag>
                        ))}
                      </div>
                    </>
                  );

                  const className =
                    "p-space-md md:p-6 rounded-2xl bg-surface-card border border-border-hairline flex flex-col gap-2";

                  return lab.url ? (
                    <a
                      className={`${className} lift group`}
                      href={lab.url}
                      key={lab.id}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {inner}
                      <span className="flex items-center gap-1 mt-auto pt-1 font-body-sm text-body-sm text-text-muted group-hover:text-text-primary transition-colors">
                        <Icon name="arrow_outward" size={13} />
                        View repository
                      </span>
                    </a>
                  ) : (
                    <div className={className} key={lab.id}>
                      {inner}
                    </div>
                  );
                })}
              </div>
            </PageSection>
          );
        })}

        <CtaBand
          body="Reimplementing a vector index or a transformer block is the fastest way to find the assumptions a library hides from you. The knowledge transfers directly into the systems I ship for clients."
          title="I build things that don't exist yet."
        >
          <Link className={buttonStyles.primary} href="/writing">
            <Icon name="edit_note" size={18} />
            Read why I build
          </Link>
        </CtaBand>

        <SubPageFooter current="/labs" />
      </div>
    </PageShell>
  );
}
