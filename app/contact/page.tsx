import type { Metadata } from "next";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { ContactBody } from "@/components/contact/contact-body";
import { CopyEmailButton } from "@/components/ui/copy-email";
import { StatusDot } from "@/components/ui/primitives";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { Reveal } from "@/components/primitives/Reveal";
import { pageMeta } from "@/lib/seo";
import { JsonLd, pageBreadcrumb } from "@/components/seo/json-ld";
import { directChannels, site } from "@/lib/site-data";

export const metadata: Metadata = pageMeta({
  path: "/contact",
  title: "Contact & Hiring",
  description: "Advisory and contract engineering for multi-agent systems, edge computer vision, and LLM security. Based in Ahmedabad, India, available for Q2/Q3.",
  keywords: ["hire AI engineer India", "freelance AI engineer Ahmedabad", "AI consultant India", "hire machine learning developer", "AI engineer contact"],
});

export default function ContactPage() {
  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={pageBreadcrumb("Contact", "/contact")} />
        <div className="flex flex-col gap-8 md:gap-10">
        <PageIntro
          lead="Whether you need to architect multi-agent systems, optimize edge vision models, or audit LLM security, I'm open for advisory and contract engineering."
          title="Let's build something"
        />

        {/* ------------------------------------------------- availability card */}
        <Reveal className="bg-surface-container rounded-2xl p-space-md md:p-8 relative overflow-hidden" delay={0.25}>
          <div className="flex flex-col space-y-space-md">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-subtle shadow-xs">
                <StatusDot className="bg-accent-emerald" ping />
                <span className="font-body-sm text-body-sm text-text-primary font-semibold">
                  Available for advisory
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-text-muted flex items-center gap-1">
                <Icon name="schedule" size={14} />
                Replies within a day
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-space-sm pt-space-xs">
              <div className="min-w-0 flex-1">
                <span className="font-body-sm text-body-sm text-text-muted block">
                  Email
                </span>
                <span className="font-label-section text-headline-md md:text-headline-lg text-text-primary font-medium select-all truncate block">
                  {site.email}
                </span>
              </div>
              <CopyEmailButton />
            </div>

            <div className="flex flex-col gap-1.5 pt-2 bg-surface-container-low/60 -mx-space-md -mb-space-md md:-mx-8 md:-mb-8 p-space-md md:px-8 mt-2 md:flex-row md:gap-8">
              <div className="flex items-center gap-2 text-text-secondary font-body-sm text-body-sm">
                <Icon className="text-text-muted" name="location_on" size={16} />
                <span>
                  {site.location} ({site.timezone}), remote worldwide
                </span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary font-body-sm text-body-sm">
                <Icon className="text-text-muted" name="bolt" size={16} />
                <span>Open to fractional CTO &amp; specialized research sprints</span>
              </div>
            </div>
          </div>
        </Reveal>
        </div>


        <ContactBody />

        {/* ----------------------------------------------- 03 / direct channels */}
        <PageSection layout="stacked" meta="Async & sync" title="Direct channels">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
            {directChannels.map((channel) => {
              const external = channel.href.startsWith("http");
              const inner = (
                <>
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span className="min-w-0">
                      <span className="font-headline-md text-headline-md text-[14px] text-text-primary block truncate">
                        {channel.label}
                      </span>
                      <span className="font-label-meta text-label-meta text-[11px] text-text-muted block truncate">
                        {channel.handle}
                      </span>
                    </span>
                  </span>
                  <span className="text-text-muted shrink-0 transition-transform group-hover:translate-x-0.5">
                    <Icon name="arrow_outward" size={16} />
                  </span>
                </>
              );

              const className =
                "group lift bg-surface-card rounded-xl p-3 md:p-4 flex items-center justify-between gap-2 border border-border-hairline";

              return external ? (
                <a
                  className={className}
                  href={channel.href}
                  key={channel.label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {inner}
                </a>
              ) : (
                <a className={className} href={channel.href} key={channel.label}>
                  {inner}
                </a>
              );
            })}
          </div>
        </PageSection>

      </div>
    </PageShell>
  );
}
