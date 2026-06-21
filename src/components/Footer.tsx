import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { BentoGrid, BentoCard } from './bento';

const ELSEWHERE: Array<{ href: string; label: string; icon?: typeof Github; external?: boolean }> = [
  { href: 'https://github.com/KunjShah95',       label: 'KunjShah95 — main',     icon: Github, external: true },
  { href: 'https://github.com/KunjShah01',       label: 'KunjShah01 — side',     icon: Github, external: true },
  { href: 'https://linkedin.com/in/kunjshah05',  label: 'linkedin/in/kunjshah05', icon: Linkedin, external: true },
  { href: 'https://twitter.com/kunjshah_dev',    label: '@kunjshah_dev',         icon: Twitter, external: true },
  { href: 'mailto:kkshah2005@gmail.com',           label: 'kkshah2005@gmail.com', icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-rule/12">
      <div className="max-w-manifest mx-auto px-6">
        {/* Bottom bar — copyright + social links */}
        <div className="py-10 flex flex-col items-center gap-8">
          <BentoGrid cols={3} className="w-auto">
            {ELSEWHERE.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                <BentoCard variant="inset" className="px-4 py-3 flex items-center gap-2">
                  {link.icon && <link.icon className="w-3.5 h-3.5 text-ink-tertiary group-hover:text-ink-primary transition-colors" />}
                  <span className="font-mono text-xs text-ink-tertiary group-hover:text-ink-primary transition-colors">
                    {link.label}
                  </span>
                </BentoCard>
              </a>
            ))}
          </BentoGrid>
          <div className="font-mono text-xs text-ink-tertiary">
            &copy; {year} Kunj Shah
          </div>
        </div>
      </div>
    </footer>
  );
}
