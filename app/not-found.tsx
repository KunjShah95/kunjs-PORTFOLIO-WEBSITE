import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/shell/page-shell";
import { Icon } from "@/components/icon";
import { buttonStyles } from "@/components/ui/blocks";
import { indexItems } from "@/lib/site-data";

export const metadata: Metadata = { title: "Page not found | Kunj Shah" };

/** 404: says what happened, then offers the whole site index as a way out. */
export default function NotFound() {
  const destinations = indexItems.filter((item) => item.href !== "/").slice(0, 6);

  return (
    <PageShell>
      <div className="stack-page">
        <section className="flex flex-col gap-5 max-w-2xl">
          <span className="font-label-meta text-label-meta text-text-muted">404</span>
          <h1 className="font-headline-xl-mobile text-headline-xl-mobile text-text-primary tracking-tight">
            This page doesn&apos;t exist.
          </h1>
          <p className="font-body-lg text-body-lg text-text-secondary max-w-[46ch]">
            The link may be old, or the page moved. Everything that exists is one
            click from here.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link className={buttonStyles.primary} href="/">
              Back to home
            </Link>
            <Link className={buttonStyles.secondary} href="/projects">
              View projects
            </Link>
          </div>
        </section>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((item) => (
            <li key={item.href}>
              <Link
                className="group lift flex h-full flex-col gap-1 p-5 rounded-2xl bg-surface-card border border-border-hairline"
                href={item.href}
              >
                <span className="flex items-center justify-between font-headline-md text-headline-md text-text-primary">
                  {item.label}
                  <Icon
                    className="text-text-muted transition-transform duration-300 group-hover:translate-x-0.5"
                    name="arrow_forward"
                    size={16}
                  />
                </span>
                <span className="font-body-sm text-body-sm text-text-secondary">
                  {item.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
