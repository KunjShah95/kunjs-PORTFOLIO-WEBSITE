import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const ELSEWHERE: Array<{ href: string; label: string; icon?: typeof Github; external?: boolean }> = [
  { href: 'https://github.com/KunjShah95',       label: 'github.com/KunjShah95', icon: Github, external: true },
  { href: 'https://github.com/KunjShah01',       label: 'KunjShah01',            icon: Github, external: true },
  { href: 'https://linkedin.com/in/kunjshah05',  label: 'linkedin/in/kunjshah05', icon: Linkedin, external: true },
  { href: 'https://twitter.com/kunjshah_dev',    label: '@kunjshah_dev',         icon: Twitter, external: true },
  { href: 'mailto:kkshah20050@gmail.com',           label: 'kkshah20050@gmail.com', icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-rule/12">
      <div className="max-w-manifest mx-auto px-6">
        {/* Main editorial section */}
        <div className="py-24 md:py-32 border-b border-rule/12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Personal note — left column */}
            <div className="md:col-span-4">
              <div className="kicker">A note</div>
              <p className="mt-6 text-sm text-ink-secondary leading-relaxed max-w-xs">
                I'm 21, fourth-year CS at Indus University in Ahmedabad. I build agents in the hours I should be studying, and I write about the parts that broke.
              </p>
              <div className="mt-8 h-px w-8 bg-rule/32" />
              <p className="mt-6 font-mono text-xs text-ink-tertiary">
                if you write, I write back.
              </p>
            </div>

            {/* Main content */}
            <div className="md:col-span-8">
              <h2 className="font-display text-5xl md:text-6xl tracking-tightest leading-[0.95] max-w-5xl whitespace-nowrap">
                That&rsquo;s the whole site.
              </h2>

              {/* Pull quote — the loudest moment. A real 3 a.m. moment, not a magazine tagline. */}
              <div className="mt-16 md:mt-24 max-w-4xl">
                <div className="h-px bg-rule/32 mb-12 md:mb-16" />
                <blockquote>
                  <p className="font-display italic text-4xl md:text-7xl leading-[1.02] tracking-tightest text-ink-primary">
                    &ldquo;Every project I&rsquo;ve shipped,
                    <br />
                    I broke it twice first.
                    <br />
                    <span className="text-ink-secondary">I think that&rsquo;s the actual workflow.</span>&rdquo;
                  </p>
                </blockquote>
                <div className="mt-10 md:mt-12 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <footer className="font-mono text-xs text-ink-tertiary uppercase tracking-kicker">
                    &mdash; 3 a.m., probably 2025
                  </footer>
                </div>
                <div className="h-px bg-rule/32 mt-12 md:mt-16" />
              </div>

              <p className="mt-12 text-ink-secondary max-w-prose text-lg leading-relaxed">
                I read every message. The reply is short when I don&rsquo;t know, longer when I do. If we end up working together, expect chai references in the PR descriptions.
              </p>

              <a
                href="mailto:kkshah20050@gmail.com"
                className="group mt-10 inline-flex items-center gap-3 px-6 h-12 rounded-md bg-ink-primary text-ink-inverse font-body text-sm font-medium hover:bg-accent transition-colors duration-base ease-out-soft"
              >
                <Mail className="w-4 h-4" />
                Say hello
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
