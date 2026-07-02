import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { BackgroundBeams } from './effects/BackgroundBeams';
import { GradientOrb } from './effects/GradientOrb';
import { Magnetic } from './effects';

const LINKS = [
  { href: 'https://github.com/KunjShah95',       label: 'GitHub',                value: 'KunjShah95 — main',     external: true },
  { href: 'https://github.com/KunjShah01',       label: 'GitHub',                value: 'KunjShah01 — side',     external: true },
  { href: 'https://linkedin.com/in/kunjshah05',  label: 'LinkedIn',              value: 'in/kunjshah05',         external: true },
  { href: 'https://twitter.com/kunjshah_dev',    label: 'Twitter',               value: '@kunjshah_dev',         external: true },
  { href: 'mailto:kkshah2005@gmail.com',          label: 'Email',                value: 'kkshah2005@gmail.com' },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-rule/12">
      <BackgroundBeams count={1} />
      <GradientOrb size={250} className="bottom-[-100px] left-[-80px]" />
      <div className="relative max-w-manifest mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="py-14 md:py-18 flex flex-col items-center gap-10"
        >
          <div className="kicker">Find me elsewhere</div>
          <div className="w-full max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LINKS.map((link) => (
              <Magnetic key={link.value} strength={0.2} className="w-full">
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="glass glass-shine noise-texture group w-full flex items-center justify-between gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(0_0_0/0.16)]"
                >
                  <div>
                    <div className="font-mono text-xs uppercase tracking-kicker text-ink-tertiary">{link.label}</div>
                    <div className="font-mono text-sm mt-1 text-ink-secondary">{link.value}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-ink-tertiary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </a>
              </Magnetic>
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
