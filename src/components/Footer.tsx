import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Rss } from 'lucide-react';

const COLOPHON: Array<{ label: string; items: { to?: string; href?: string; label: string }[] }> = [
  {
    label: 'Site',
    items: [
      { to: '/projects', label: 'Projects' },
      { to: '/blogs', label: 'Writing' },
      { to: '/experience', label: 'Experience' },
      { to: '/skills', label: 'Skills' },
      { to: '/about', label: 'About' },
    ],
  },
  {
    label: 'Elsewhere',
    items: [
      { href: 'https://github.com/kshah00', label: 'GitHub' },
      { href: 'https://linkedin.com/in/kshah00', label: 'LinkedIn' },
      { href: 'https://twitter.com/kshah00', label: 'Twitter' },
      { href: 'mailto:hello@kunjshah.dev', label: 'Email' },
      { href: '/rss.xml', label: 'RSS' },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-rule/12 mt-32">
      <div className="max-w-manifest mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="font-display text-4xl tracking-tightest">Kunj Shah</div>
            <p className="mt-4 text-ink-secondary max-w-sm leading-relaxed">
              AI engineer. Building production-grade agentic systems in Ahmedabad, IN.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <dt className="kicker">Built with</dt>
              <dd className="font-mono text-ink-secondary">React · Vite · Tailwind</dd>
              <dt className="kicker">Last deploy</dt>
              <dd className="font-mono text-ink-secondary">{new Date().toISOString().slice(0, 10)}</dd>
              <dt className="kicker">License</dt>
              <dd className="font-mono text-ink-secondary">All rights reserved</dd>
              <dt className="kicker">Version</dt>
              <dd className="font-mono text-ink-secondary">v.2026 · LOGS_001</dd>
            </dl>
          </div>

          {COLOPHON.map((col) => (
            <div key={col.label} className="md:col-span-3">
              <div className="kicker mb-4">{col.label}</div>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item.label}>
                    {item.to ? (
                      <Link to={item.to} className="text-ink-secondary hover:text-ink-primary transition-colors">
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.href} target={item.href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-ink-secondary hover:text-ink-primary transition-colors">
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1 flex md:flex-col items-start gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-live" />
              </span>
              <span className="kicker">Live</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-rule/12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="kicker">&copy; {year} Kunj Shah &mdash; All rights reserved</div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/kshah00" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 text-ink-secondary hover:text-ink-primary">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/kshah00" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 text-ink-secondary hover:text-ink-primary">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://twitter.com/kshah00" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="p-2 text-ink-secondary hover:text-ink-primary">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="mailto:hello@kunjshah.dev" aria-label="Email" className="p-2 text-ink-secondary hover:text-ink-primary">
              <Mail className="w-4 h-4" />
            </a>
            <a href="/rss.xml" aria-label="RSS" className="p-2 text-ink-secondary hover:text-ink-primary">
              <Rss className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
