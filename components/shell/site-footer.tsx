import Link from "next/link";
import { LocalClock } from "@/components/ui/local-clock";
import { indexItems, site } from "@/lib/site-data";

const social = [
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "X", href: site.links.x },
  { label: "Resume", href: "/kunjshah_cv.pdf" },
  { label: "Email", href: `mailto:${site.email}` },
] as const;

/**
 * Global footer, mounted once in the root layout. Pages own their closing
 * call to action; the footer only handles orientation: index and socials.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 md:mt-24 pb-24 short-screen:pb-20 lg:pb-0 bg-surface-container-low">
      <div className="shell-container py-12 md:py-16 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="font-headline-md text-headline-md text-text-primary">
            {site.name}
          </span>
        </div>

        <nav aria-label="Site index" className="md:col-span-5 md:col-start-6">
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-0 md:gap-y-2">
            {indexItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="inline-flex items-center min-h-11 lg:min-h-0 -mx-1.5 px-1.5 font-body-sm text-body-sm text-text-secondary hover:text-text-primary transition-colors"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="md:col-span-2 md:col-start-11 flex md:flex-col gap-x-5 gap-y-2 flex-wrap">
          {social.map((link) => (
            <li key={link.label}>
              <a
                className="inline-flex items-center justify-center min-h-11 min-w-11 lg:min-h-0 lg:min-w-0 -mx-1.5 px-1.5 font-body-sm text-body-sm text-text-secondary hover:text-text-primary transition-colors"
                href={link.href}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                target={link.href.startsWith("http") ? "_blank" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="shell-container py-5 border-t border-border-hairline font-body-sm text-body-sm text-text-muted flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <span>
          &copy; {year} {site.name}
        </span>
        <LocalClock />
      </div>
    </footer>
  );
}
