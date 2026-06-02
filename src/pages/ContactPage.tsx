import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const METHODS = [
  { label: 'Email', value: 'hello@kunjshah.dev', href: 'mailto:hello@kunjshah.dev', primary: true },
  { label: 'GitHub', value: '@KunjShah95', href: 'https://github.com/KunjShah95' },
  { label: 'LinkedIn', value: 'in/kunjshah05', href: 'https://linkedin.com/in/kunjshah05' },
  { label: 'Twitter', value: '@kunjshah_dev', href: 'https://twitter.com/kunjshah_dev' },
];

export function ContactPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-manifest mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="kicker text-accent">Get in touch</div>
          <h1 className="display text-5xl md:text-7xl mt-4 leading-[0.95] tracking-tightest max-w-4xl">
            The fastest way to reach me is{' '}
            <a href="mailto:hello@kunjshah.dev" className="text-accent hover:underline">email</a>.
          </h1>
          <p className="mt-8 text-lg text-ink-secondary max-w-prose leading-relaxed">
            I&rsquo;m currently available for short-term projects, contract work, and full-time roles. I respond to most emails within 24 hours. For longer briefs, please include scope, timeline, and what success looks like.
          </p>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-px bg-rule/12">
          {METHODS.map((m) => (
            <a
              key={m.label}
              href={m.href}
              target={m.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group bg-paper p-8 flex items-center justify-between hover:bg-elevated transition-colors"
            >
              <div>
                <div className="kicker">{m.label}</div>
                <div className={`font-mono text-lg mt-2 ${m.primary ? 'text-accent' : 'text-ink-primary'}`}>
                  {m.value}
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-ink-tertiary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          ))}
        </div>

        <div className="mt-24 pt-12 border-t border-rule/12">
          <div className="kicker">Currently</div>
          <p className="mt-3 text-ink-secondary max-w-prose leading-relaxed">
            Building multi-agent research workflows in Ahmedabad, IN. Reading <em>Designing Data-Intensive Applications</em>. Available for new work.
          </p>
        </div>
      </div>
    </section>
  );
}
