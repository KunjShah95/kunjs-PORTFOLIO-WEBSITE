import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ELSEWHERE: Array<{ href: string; label: string; icon?: typeof Github; external?: boolean }> = [
  { href: 'https://github.com/KunjShah95',       label: 'github.com/KunjShah95', icon: Github, external: true },
  { href: 'https://github.com/KunjShah01',       label: 'KunjShah01',            icon: Github, external: true },
  { href: 'https://linkedin.com/in/kunjshah05',  label: 'linkedin/in/kunjshah05', icon: Linkedin, external: true },
  { href: 'https://twitter.com/kunjshah_dev',    label: '@kunjshah_dev',         icon: Twitter, external: true },
  { href: 'mailto:kkshah20050@gmail.com',           label: 'kkshah20050@gmail.com', icon: Mail },
];

const SITE_LINKS = [
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/blogs', label: 'Writing' },
  { to: '/experience', label: 'Experience' },
  { to: '/hackathons', label: 'Hackathons' },
  { to: '/contact', label: 'Contact' },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-rule/12">
      <div className="max-w-manifest mx-auto px-6">
        {/* Main editorial section */}
        <div className="py-24 md:py-32 border-b border-rule/12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Endnote column */}
            <div className="md:col-span-3">
              <div className="kicker">Endnote</div>
              <div className="mt-2 font-mono text-xs text-ink-tertiary tabular-nums">
                v.2026 &middot; 06 / 06
              </div>
              <div className="mt-6 h-px w-8 bg-rule/32" />
              <p className="mt-6 text-sm text-ink-secondary leading-relaxed max-w-xs">
                AI engineer building autonomous systems in Ahmedabad, IN. Available for projects, contract work, and full-time roles.
              </p>
            </div>

            {/* Main content */}
            <div className="md:col-span-9">
              <h2 className="font-display text-5xl md:text-7xl tracking-tightest leading-[0.95] max-w-4xl">
                That&rsquo;s the
                <br />
                whole site.
              </h2>

              {/* Pull quote — the intentional editorial moment. From B001, the lead essay. */}
              <blockquote className="mt-12 md:mt-16 pl-6 border-l-2 border-ink-primary/40 max-w-3xl">
                <p className="font-display italic text-2xl md:text-4xl leading-[1.15] text-ink-primary">
                  &ldquo;Autonomy is easy.
                  <br />
                  Reliability is hard.&rdquo;
                </p>
                <footer className="mt-6 font-mono text-xs text-ink-tertiary uppercase tracking-kicker">
                  &mdash; on shipping production agents, JAN 2026
                </footer>
              </blockquote>

              <p className="mt-12 text-ink-secondary max-w-prose text-lg leading-relaxed">
                Built by hand in Ahmedabad. No CMS, no analytics on you, no cookie banner. If something here is wrong,{' '}
                <a
                  href="mailto:kkshah20050@gmail.com"
                  className="text-ink-primary underline decoration-ink-primary/30 decoration-2 underline-offset-4 hover:decoration-ink-primary/60 transition-colors"
                >
                  tell me
                </a>
                {' '}&mdash; I read every message.
              </p>

              {/* Quick links grid */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-xl">
                {SITE_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="group inline-flex items-center justify-between px-4 py-3 rounded-md border border-rule/12 hover:border-rule/32 hover:bg-elevated/50 transition-all duration-base"
                  >
                    <span className="text-sm text-ink-secondary group-hover:text-ink-primary transition-colors">
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-ink-quaternary group-hover:text-ink-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
              </div>

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

        {/* Bottom bar — copyright + social links */}
        <div className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="font-mono text-xs text-ink-tertiary">
            &copy; {year} Kunj Shah
          </div>

          <nav aria-label="Social links" className="flex flex-wrap gap-2">
            {ELSEWHERE.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="group inline-flex items-center gap-2 px-3 py-2 rounded-md border border-rule/12 hover:border-rule/32 hover:bg-elevated/50 transition-all duration-base"
              >
                {link.icon && <link.icon className="w-3.5 h-3.5 text-ink-tertiary group-hover:text-ink-primary transition-colors" />}
                <span className="font-mono text-xs text-ink-tertiary group-hover:text-ink-primary transition-colors">
                  {link.label}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
