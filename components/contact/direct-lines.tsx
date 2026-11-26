import { CopyEmailButton } from "@/components/ui/copy-email";
import { StatusDot } from "@/components/ui/primitives";
import {
  hasPhone,
  mailtoHref,
  phoneLabel,
  telHref,
  whatsappHref,
} from "@/lib/contact-links";
import { site } from "@/lib/site-data";

/**
 * The three ways to reach a person, in the order most people want them.
 *
 * This replaces a single copy-the-address row that sat above the form. The
 * form is still here, one screen down; this is for the visitor who already
 * knows what they want and should not have to write three paragraphs to get
 * it. Every tile is a full tap target on a phone.
 *
 * Call and WhatsApp render only when a number is configured — a dead tel:
 * link is worse than no phone number at all.
 */
const tile =
  "group flex min-w-0 flex-col gap-1 rounded-2xl border border-border-hairline bg-surface-card p-5 transition-colors hover:border-text-muted";

export function DirectLines() {
  return (
    <section aria-label="Direct contact" className="mx-auto flex w-full max-w-3xl flex-col gap-3">
      <p className="flex items-center gap-2 font-body-sm text-body-sm text-text-secondary">
        <StatusDot className="bg-accent-emerald" ping />
        Booking new projects &middot; {site.location} ({site.timezone}), working remotely
      </p>

      {/* One tile when only the address is published, three when a number is:
          a lone 1/3-width card would read like a missing option. */}
      <div className={hasPhone ? "grid gap-2 sm:grid-cols-3" : "flex flex-col gap-2"}>
        <a
          className={tile}
          data-track="Email Clicked"
          data-track-from="contact-direct"
          href={mailtoHref}
        >
          <span className="eyebrow text-text-muted">Email</span>
          <span className="font-body-md text-body-md font-medium text-text-primary break-all">
            {site.email}
          </span>
          <span className="font-body-sm text-body-sm text-text-muted">
            Reply within one working day
          </span>
        </a>

        {hasPhone && telHref && (
          <a
            className={tile}
            data-track="Call Clicked"
            data-track-from="contact-direct"
            href={telHref}
          >
            <span className="eyebrow text-text-muted">Call</span>
            <span className="font-body-md text-body-md font-medium text-text-primary">
              {phoneLabel}
            </span>
            <span className="font-body-sm text-body-sm text-text-muted">
              Straight through to me in IST
            </span>
          </a>
        )}

        {hasPhone && whatsappHref && (
          <a
            className={tile}
            data-track="WhatsApp Clicked"
            data-track-from="contact-direct"
            href={whatsappHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="eyebrow text-text-muted">WhatsApp</span>
            <span className="font-body-md text-body-md font-medium text-text-primary">
              {phoneLabel}
            </span>
            <span className="font-body-sm text-body-sm text-text-muted">
              Opens a message with the details already written
            </span>
          </a>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <CopyEmailButton />
        <span className="font-body-sm text-body-sm text-text-muted">
          {hasPhone ? "or copy the address" : "or copy the address and write when it suits you"}
        </span>
      </div>
    </section>
  );
}
