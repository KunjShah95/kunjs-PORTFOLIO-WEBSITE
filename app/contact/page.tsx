import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { ContactBody } from "@/components/contact/contact-body";
import { DirectLines } from "@/components/contact/direct-lines";
import { PageIntro, PageSection } from "@/components/ui/page-intro";
import { buttonStyles } from "@/components/ui/blocks";
import { Reveal } from "@/components/primitives/Reveal";
import { pageMeta } from "@/lib/seo";
import { JsonLd, pageBreadcrumb } from "@/components/seo/json-ld";
import { legalDocuments } from "@/lib/legal";
import { clientFaqs, directChannels, hiringFaqs } from "@/lib/site-data";
import { bookingEnabled, bookingNote, bookingUrl } from "@/lib/booking";

export const metadata: Metadata = pageMeta({
  path: "/contact",
  title: "Contact & Hiring",
  description: "Start an AI project with Kunj Shah: agents, document search and full-stack AI apps for founders and small teams. Free 15-minute intro call, fixed price in writing, reply within one working day.",
  keywords: ["hire AI engineer India", "freelance AI engineer Ahmedabad", "AI consultant India", "hire machine learning developer", "AI engineer contact"],
});

export default function ContactPage() {
  return (
    <PageShell>
      <div className="stack-page">
        <JsonLd data={pageBreadcrumb("Contact", "/contact")} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [...clientFaqs, ...hiringFaqs].map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }}
        />
        <div className="flex flex-col gap-8 md:gap-10">
        <PageIntro
          lead="Two or three sentences is enough: what the product does, where it breaks, and when you need it. I reply within one working day, and the 15-minute intro call is free."
          eyebrow="Contact"
          title="Tell me what you're building."
        />

        {/* ------------------------------------------------- the fastest path */}
        {/* Rendered only when a scheduler is configured, so the page never
            shows a booking button that goes nowhere. The form below stays the
            second door: some people want to write before they talk. */}
        {bookingEnabled && bookingUrl && (
          <Reveal
            className="mx-auto w-full max-w-3xl flex flex-col gap-4 rounded-2xl border border-border-hairline bg-surface-card p-5 md:p-6 sm:flex-row sm:items-center sm:justify-between"
            delay={0.15}
          >
            <div className="flex min-w-0 flex-col gap-1.5">
              <span className="eyebrow text-text-muted">Fastest path</span>
              <span className="font-body-lg text-body-lg font-medium text-text-primary">
                Pick a 15-minute slot now.
              </span>
              <span className="font-body-sm text-body-sm text-text-secondary">{bookingNote}</span>
            </div>
            <a
              className={`${buttonStyles.primary} h-12 shrink-0`}
              data-track="Booking CTA Clicked"
              data-track-from="contact"
              href={bookingUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name="calendar_today" size={16} />
              Book the call
            </a>
          </Reveal>
        )}

        {/* ----------------------------------------------- the direct lines */}
        {/* Email, call and WhatsApp, whichever the visitor prefers. The form
            below stays for anyone who would rather write first. */}
        <Reveal className="mx-auto w-full max-w-3xl" delay={0.2}>
          <DirectLines />
        </Reveal>
        </div>


        <ContactBody />

        <PageSection meta="What clients ask before sending the first message." title="Fair questions.">
          <div className="mx-auto w-full max-w-3xl border-t border-border-hairline">
            {clientFaqs.map((faq) => (
              <details className="group border-b border-border-hairline" key={faq.question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-body-lg text-body-lg font-medium text-text-primary [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border-hairline text-text-muted transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 pr-12 font-body-md text-body-md text-text-secondary">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
          {/* Short third-person facts, kept on the page because the FAQPage
              schema above lists them and schema must match visible text. */}
          <dl className="mx-auto w-full max-w-3xl grid gap-5 pt-6 sm:grid-cols-2">
            {hiringFaqs.map((item) => (
              <div className="flex flex-col gap-1" key={item.question}>
                <dt className="eyebrow text-text-muted">{item.question}</dt>
                <dd className="font-body-sm text-body-sm text-text-secondary">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </PageSection>

        {/* ----------------------------------------------- 03 / direct channels */}
        <PageSection layout="stacked" meta="Prefer to look around first? The code, the writing and the profiles." title="Everywhere else I am.">
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

        {/* ----------------------------------------------- 04 / terms & privacy */}
        {/* Where a client actually looks for these: before they send the form,
            not buried in the footer. The forms and channels above come first,
            then the fine print. */}
        <PageSection
          layout="stacked"
          meta="The default agreement for any project without its own contract."
          title="Terms &amp; privacy"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {legalDocuments.map((doc) => (
              <Link
                className="group lift bg-surface-card rounded-2xl p-space-md md:p-5 border border-border-hairline flex flex-col gap-2 min-w-0"
                href={doc.path}
                key={doc.path}
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-surface-subtle text-text-secondary group-hover:bg-surface-container group-hover:text-text-primary transition-colors">
                    <Icon name={doc.icon} size={16} />
                  </span>
                  <span className="font-headline-lg text-headline-lg text-text-primary">
                    {doc.title}
                  </span>
                  <span className="ml-auto text-text-muted shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
                    <Icon name="arrow_forward" size={18} />
                  </span>
                </span>
                <span className="font-body-sm text-body-sm text-text-secondary">
                  {doc.description}
                </span>
              </Link>
            ))}
          </div>
        </PageSection>

      </div>
    </PageShell>
  );
}
