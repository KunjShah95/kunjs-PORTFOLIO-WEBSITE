import { Mail } from 'lucide-react';

const ELSEWHERE: Array<{ href: string; label: string; external?: boolean }> = [
  { href: 'https://github.com/KunjShah95',       label: 'github.com/KunjShah95', external: true },
  { href: 'https://github.com/KunjShah01',       label: 'KunjShah01',             external: true },
  { href: 'https://linkedin.com/in/kunjshah05',  label: 'linkedin',               external: true },
  { href: 'https://twitter.com/kunjshah_dev',    label: '@kunjshah_dev',          external: true },
  { href: 'mailto:kkshah20050@gmail.com',           label: 'email' },
  { href: '/rss.xml',                            label: 'rss' },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-rule/12">
      <div className="max-w-manifest mx-auto px-6">
        <div className="py-24 md:py-32 border-b border-rule/12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-2">
              <div className="kicker">Endnote</div>
              <div className="mt-2 font-mono text-xs text-ink-tertiary tabular-nums">v.2026 &middot; 06 / 06</div>
            </div>
            <div className="md:col-span-10">
              <h2 className="font-display text-5xl md:text-7xl tracking-tightest leading-[0.95] max-w-4xl">
                That&rsquo;s the
                <br />
                whole site.
              </h2>
              <p className="mt-10 text-ink-secondary max-w-prose text-lg leading-relaxed">
                Built by hand in Ahmedabad. No CMS, no analytics on you, no cookie banner. If something here is wrong,{' '}
                <a
                  href="mailto:kkshah20050@gmail.com"
                  className="text-ink-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition-colors"
                >
                  tell me
                </a>
                {' '}&mdash; I read every message.
              </p>
              <a
                href="mailto:kkshah20050@gmail.com"
                className="group mt-10 inline-flex items-center gap-3 px-6 h-12 rounded-md bg-ink-primary text-ink-inverse font-body text-sm font-medium hover:bg-accent transition-colors duration-base ease-out-soft"
              >
                <Mail className="w-4 h-4" />
                Start a conversation
                <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        <div className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-ink-tertiary">
          <div>&copy; {year} Kunj Shah &mdash; No tracking, no cookies, no newsletter.</div>
          <nav aria-label="Social links" className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {ELSEWHERE.map((link, i) => (
              <span key={link.href} className="inline-flex items-center gap-x-3">
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="hover:text-ink-primary transition-colors"
                >
                  {link.label}
                </a>
                {i < ELSEWHERE.length - 1 && <span className="text-ink-quaternary">/</span>}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
