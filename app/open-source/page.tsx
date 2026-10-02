import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { SubPageFooter } from "@/components/ui/sub-page-footer";
import { CtaBand, StatStrip, buttonStyles } from "@/components/ui/blocks";
import { EmptyState } from "@/components/ui/empty-state";
import { impactMetrics, mergedContributions, site } from "@/lib/site-data";
import { getOpenSourceActivity, timeAgo, type PullRequestKind } from "@/lib/github";
import { pageMeta } from "@/lib/seo";
import { JsonLd, pageBreadcrumb } from "@/components/seo/json-ld";

/** Re-fetch GitHub activity at most once an hour. */
export const revalidate = 3600;


export const metadata: Metadata = pageMeta({
  path: "/open-source",
  title: "Open Source",
  description: "44 merged pull requests, 45 issues resolved, and 13+ external codebases, including the OWASP agent-security harness, Microsoft AI-Engineering-Coach, and Ollama.",
  keywords: ["Kunj Shah GitHub", "open source AI contributions", "OWASP contributor", "merged pull requests AI"],
});

/** Extra profiles beyond the primary GitHub. */
const profiles = [
  { icon: "terminal", label: "GitHub", href: site.links.github },
  { icon: "terminal", label: "GitHub (alt)", href: site.links.githubAlt },
  { icon: "hub", label: "Hugging Face", href: site.links.huggingface },
  { icon: "edit_note", label: "Medium", href: site.links.medium },
] as const;

/** Stat-tile wording for each inferred PR category. */
const KIND_LABELS: Record<PullRequestKind, string> = {
  feat: "Features",
  fix: "Fixes",
  security: "Security",
  refactor: "Refactors",
  perf: "Performance",
  docs: "Docs",
  test: "Tests",
  ci: "CI / Infra",
  chore: "Chores",
  other: "Other",
};

export default async function OpenSourcePage() {
  /** `recent` is already merged-only, newest merge first. */
  const activity = await getOpenSourceActivity(12);
  const mergedRecent = activity?.recent ?? [];

  // Live numbers when GitHub answers; the curated figures otherwise.
  const liveMetrics = activity
    ? [
        { value: String(activity.mergedPullRequests), label: "PRs merged" },
        { value: String(activity.mergedRepos), label: "Repositories" },
        // Top three categories by count, so the mix is legible without a
        // second row of numbers. Built from the fetched pages, not just the
        // twelve shown in the list below.
        ...activity.kindCounts.slice(0, 3).map((entry) => ({
          value: String(entry.count),
          label: KIND_LABELS[entry.kind],
        })),
      ]
    : impactMetrics;

  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={pageBreadcrumb("Open Source", "/open-source")} />
        <PageIntro
          title="Open Source"
          lead="Merged pull requests in codebases I don't own, mostly the agent and inference tooling I use every day."
        >
          <Link
            className="inline-flex items-center gap-1.5 font-body-sm text-body-sm text-text-secondary hover:text-text-primary transition-colors"
            href={site.links.github}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon name="terminal" size={14} />
            github.com/KunjShah95
          </Link>
        </PageIntro>

        {/* ------------------------------------------------------ stats strips */}
        <StatStrip items={liveMetrics} tone="plain" />

        {/* ------------------------------------------------------ live activity */}
        {activity && mergedRecent.length > 0 ? (
          <PageSection
            id="latest"
            meta={
              <span className="inline-flex items-center gap-1.5 font-body-sm text-body-sm text-accent-emerald">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-accent-emerald animate-ping opacity-60" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                </span>
                Live from GitHub
                <span className="text-text-muted">
                  · synced {timeAgo(activity.fetchedAt)}
                </span>
              </span>
            }
            title="Latest merged"
          >
            <ol className="flex flex-col border-t border-border-hairline">
              {mergedRecent.map((pr) => (
                <li key={pr.url}>
                  <a
                    className="group grid grid-cols-[1fr_auto] items-start gap-3 md:gap-4 py-3.5 md:py-4 border-b border-border-hairline"
                    href={pr.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="min-w-0 flex flex-col gap-1">
                      <span className="font-body-md text-body-md text-text-primary font-medium transition-transform duration-300 group-hover:translate-x-1">
                        {pr.title}
                      </span>
                      <span className="flex items-center gap-2 min-w-0">
                        <span className="font-label-meta text-label-meta text-text-muted truncate">
                          {pr.owner}/{pr.repo} #{pr.number}
                        </span>
                        {pr.kind !== "other" ? (
                          <span
                            className="shrink-0 font-label-meta text-label-meta uppercase tracking-wide text-text-muted bg-surface-subtle rounded px-1.5 py-0.5"
                            title={`${pr.kind} change`}
                          >
                            {pr.kind}
                          </span>
                        ) : null}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 shrink-0">
                      <time
                        className="font-label-meta text-label-meta text-text-muted"
                        dateTime={pr.date}
                        title={new Date(pr.date).toUTCString()}
                      >
                        {timeAgo(pr.date)}
                      </time>
                      <Icon
                        className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                        name="arrow_outward"
                        size={14}
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
            <a
              className="group inline-flex items-center gap-1.5 w-fit font-body-sm text-body-sm text-text-muted hover:text-text-primary transition-colors"
              href={`https://github.com/pulls?q=${encodeURIComponent("is:pr is:merged author:KunjShah95")}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              All {activity?.mergedPullRequests ?? "merged"} merged pull requests on GitHub
              <Icon className="transition-transform group-hover:translate-x-0.5" name="arrow_forward" size={13} />
            </a>
          </PageSection>
        ) : (
          <PageSection title="Latest merged">
            <EmptyState
              action={
                <a
                  className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full border border-border-hairline bg-surface-card font-body-sm text-body-sm font-medium text-text-primary hover:border-text-muted transition-colors"
                  href={`https://github.com/pulls?q=${encodeURIComponent("is:pr is:merged author:KunjShah95")}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  See merged PRs on GitHub
                </a>
              }
              body="GitHub didn't answer just now, so the live list is hidden. The highlights below are always available."
              icon="commit"
              title="Live activity is unavailable right now."
            />
          </PageSection>
        )}

        {/* -------------------------------------------------------- contributions */}
        <PageSection
          meta={`${mergedContributions.length} merged`}
          title={activity ? "Highlights" : "Contributions"}
        >
          <div className="grid gap-2 md:grid-cols-2">
            {mergedContributions.map((item) => (
              <a
                className="group lift p-space-sm md:p-4 bg-surface-card rounded-xl border border-border-hairline flex items-start justify-between gap-2"
                href={item.url}
                key={item.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="flex items-start gap-3 min-w-0">
                  <span className="min-w-0 flex flex-col gap-1">
                    <span className="flex items-center gap-2 flex-wrap">
                      <span className="font-headline-md text-body-md text-text-primary font-semibold">
                        {item.label}
                      </span>
                    </span>
                    <span className="font-body-sm text-body-sm text-text-secondary leading-snug">
                      {item.title}
                    </span>
                    <span className="flex items-center gap-1.5 min-w-0">
                      <span className="font-label-meta text-label-meta text-text-muted truncate">
                        {item.org}
                      </span>
                      <span
                        className="shrink-0 font-label-meta text-label-meta uppercase tracking-wide text-text-muted bg-surface-subtle rounded px-1.5 py-0.5"
                        title={`${item.tag} change`}
                      >
                        {item.tag}
                      </span>
                    </span>
                  </span>
                </span>
                <span className="text-text-muted shrink-0 mt-1 transition-transform group-hover:translate-x-0.5">
                  <Icon name="arrow_outward" size={16} />
                </span>
              </a>
            ))}
          </div>
        </PageSection>

        {/* ------------------------------------------------------------ profiles */}
        <PageSection layout="stacked" title="Profiles">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
            {profiles.map((profile) => (
              <a
                className="group lift bg-surface-card rounded-xl p-3 md:p-4 flex items-center justify-between gap-2 border border-border-hairline"
                href={profile.href}
                key={profile.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <span className="font-headline-md text-headline-md text-[14px] text-text-primary truncate">
                    {profile.label}
                  </span>
                </span>
                <span className="text-text-muted shrink-0 transition-transform group-hover:translate-x-0.5">
                  <Icon name="arrow_outward" size={16} />
                </span>
              </a>
            ))}
          </div>
        </PageSection>

        <CtaBand
          body="I'm happy to review issues, benchmark patches, and evaluation harness contributions across the agent runtime ecosystem."
          title="Working on agent security or inference tooling?"
        >
          <a
            className={buttonStyles.primary}
            href={`${site.links.github}/issues`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon name="commit" size={18} />
            Open an issue
          </a>
          <Link className={buttonStyles.secondary} href="/contact">
            Get in touch
            <Icon name="arrow_forward" size={14} />
          </Link>
        </CtaBand>

        <SubPageFooter current="/open-source" />
      </div>
    </PageShell>
  );
}
