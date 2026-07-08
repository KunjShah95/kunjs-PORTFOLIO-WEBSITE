import { motion } from 'framer-motion';
import { ArrowUpRight, FileDown } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SITE_URL } from '../lib/site';
import { Magnetic } from '../components/effects';

const METHODS = [
  { label: 'Email', value: 'kkshah2005@gmail.com', href: 'mailto:kkshah2005@gmail.com', primary: true },
  { label: 'YouTube', value: '@kunjshah4158', href: 'https://www.youtube.com/@kunjshah4158' },
  { label: 'GitHub', value: '@KunjShah95', href: 'https://github.com/KunjShah95' },
  { label: 'LinkedIn', value: 'in/kunjshah05', href: 'https://linkedin.com/in/kunjshah05' },
  { label: 'Twitter', value: '@kunjshah_dev', href: 'https://twitter.com/kunjshah_dev' },
];

export function ContactPage() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <SEO
        title="Contact — Kunj Shah"
        description="The fastest way to reach Kunj Shah is email. If you're working on something and want an extra set of hands, write. Also find me on GitHub, LinkedIn, and Twitter."
        url={`${SITE_URL}/contact`}
      />
      <div className="relative max-w-manifest mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <div className="kicker">Get in touch</div>
          <h1 className="display text-5xl md:text-7xl mt-4 leading-[0.95] tracking-tightest max-w-3xl">
            Building something ambitious?{' '}
            <span className="text-accent">Let&rsquo;s make it real.</span>
          </h1>
          <p className="mt-8 text-lg text-ink-secondary max-w-2xl leading-relaxed">
            I build production AI systems — from transformer weights to customer deployment. 
            If you have an AI product, a hard engineering problem, or an idea that needs a technical founder, 
            write to me. I usually reply within a day.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href="mailto:kkshah2005@gmail.com"
                className="group relative inline-flex items-center gap-2 h-14 px-8 rounded-xl bg-accent text-accent-ink font-semibold text-base hover:scale-[1.02] hover:-translate-y-0.5 active:scale-95 transition-all shadow-[0_10px_28px_rgb(var(--accent)/0.34)]"
              >
                Email me
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Magnetic>
            <div className="relative group">
              <Magnetic>
                <button
                  className="group relative inline-flex items-center gap-2 h-14 px-8 rounded-xl border border-rule/15 text-ink-primary font-semibold text-base bg-elevated hover:bg-sunken hover:-translate-y-0.5 active:scale-95 transition-all w-full md:w-auto"
                >
                  <FileDown className="w-5 h-5" />
                  Download résumé
                </button>
              </Magnetic>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="w-60 bg-elevated/95 backdrop-blur-xl border border-rule/12 p-1.5 rounded-xl shadow-2xl flex flex-col gap-1 noise-texture text-left">
                  <a
                    href="/kunjaiml.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3 py-2 rounded-lg text-sm hover:bg-accent hover:text-accent-ink transition-colors font-medium flex items-center justify-between text-ink-primary"
                  >
                    <span>AI / ML Roles <span className="block text-[10px] text-ink-tertiary group-hover:text-accent-ink/70 font-mono">kunjaiml.pdf</span></span>
                    <span className="text-xs text-ink-tertiary">↗</span>
                  </a>
                  <a
                    href="/kunjshah_cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3 py-2 rounded-lg text-sm hover:bg-accent hover:text-accent-ink transition-colors font-medium flex items-center justify-between text-ink-primary"
                  >
                    <span>Full Stack Roles <span className="block text-[10px] text-ink-tertiary group-hover:text-accent-ink/70 font-mono">kunjshah_cv.pdf</span></span>
                    <span className="text-xs text-ink-tertiary">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-20 max-w-2xl mx-auto divide-y divide-rule/12 border border-rule/12 rounded-2xl overflow-hidden">
          {METHODS.map((m) => (
            <a
              key={m.label}
              href={m.href}
              target={m.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 px-6 py-5 bg-paper hover:bg-elevated transition-colors"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary">{m.label}</div>
                <div className={`font-mono text-base mt-1.5 ${m.primary ? 'text-accent' : 'text-ink-secondary'}`}>
                  {m.value}
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-ink-quaternary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </a>
          ))}
        </div>

        <div className="mt-24 max-w-2xl mx-auto pt-12 border-t border-rule/12 text-center">
          <div className="kicker">Currently</div>
          <p className="mt-3 text-ink-secondary leading-relaxed">
            Rewriting a research agent for the third time. Reading <em>Designing Data-Intensive Applications</em> again. Usually up for new work. If you have something, write to me.
          </p>
        </div>
      </div>
    </section>
  );
}
