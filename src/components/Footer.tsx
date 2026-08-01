import { motion } from 'framer-motion';

const LINKS = [
  { href: 'https://github.com/KunjShah95',       label: 'GitHub',    value: 'KunjShah95' },
  { href: 'https://linkedin.com/in/kunjshah05',  label: 'LinkedIn',  value: 'in/kunjshah05' },
  { href: 'https://twitter.com/kunjshah_dev',    label: 'Twitter',   value: '@kunjshah_dev' },
  { href: 'mailto:kunjkshah05@gmail.com',         label: 'Email',    value: 'kunjkshah05@gmail.com' },
  { href: 'https://medium.com/@kkshah2005',       label: 'Medium',   value: '@kkshah2005' },
  { href: 'https://peerlist.io/kunjshah',        label: 'Peerlist',  value: '@kunjshah' },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-20 border-t border-rule/10">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="py-12"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
            <div className="space-y-3 max-w-xs">
              <span className="font-display text-lg font-bold tracking-tight text-ink-primary">KS</span>
              <p className="text-sm text-ink-tertiary leading-relaxed">
                AI engineer shipping production systems from agents to full-stack apps.
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-accent/20 bg-accent/5 text-[10px] font-mono text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
                Available for AI roles
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2.5 md:max-w-md md:justify-end">
              {LINKS.map((link) => (
                <a
                  key={link.value}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm whitespace-nowrap"
                >
                  <span className="text-ink-quaternary font-mono text-[10px] uppercase tracking-wider group-hover:text-accent transition-colors">
                    {link.label}
                  </span>
                  <span className="text-ink-secondary group-hover:text-ink-primary transition-colors">
                    {link.value}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-5 border-t border-rule/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-tertiary">
            <span>&copy; {year} Kunj Shah &middot; Built by hand</span>
            <span className="font-mono">12+ projects / 44+ PRs / 4 hackathon finals</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
