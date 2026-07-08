import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const LINKS = [
  { href: 'https://github.com/KunjShah95',       label: 'GitHub',                value: 'KunjShah95 — main',     external: true },
  { href: 'https://github.com/KunjShah01',       label: 'GitHub',                value: 'KunjShah01 — side',     external: true },
  { href: 'https://linkedin.com/in/kunjshah05',  label: 'LinkedIn',              value: 'in/kunjshah05',         external: true },
  { href: 'https://twitter.com/kunjshah_dev',    label: 'Twitter',               value: '@kunjshah_dev',         external: true },
  { href: 'https://peerlist.io/kunjshah',        label: 'Peerlist',              value: '@kunjshah',             external: true },
  { href: 'https://medium.com/@kkshah2005',       label: 'Medium',                value: '@kkshah2005',           external: true },
  { href: 'mailto:kkshah2005@gmail.com',          label: 'Email',                value: 'kkshah2005@gmail.com' },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-rule/12">
      <div className="relative max-w-manifest mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="py-14 md:py-18 flex flex-col items-center gap-10"
        >
          <div className="kicker">Find me elsewhere</div>
          <div className="w-full max-w-2xl mx-auto divide-y divide-rule/8 border border-rule/12 rounded-2xl overflow-hidden">
            {LINKS.map((link) => (
              <a
                key={link.value}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="group flex items-center justify-between gap-4 px-5 py-4 bg-paper hover:bg-elevated transition-colors"
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary">{link.label}</div>
                  <div className="font-mono text-sm mt-1 text-ink-secondary group-hover:text-ink-primary transition-colors">{link.value}</div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-ink-quaternary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="font-mono text-xs text-ink-tertiary">
              &copy; {year} Kunj Shah &middot; Designed &amp; built by hand
            </div>
            <div className="font-mono text-[10px] text-ink-quaternary">
              Currently shipping AI products every week
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
