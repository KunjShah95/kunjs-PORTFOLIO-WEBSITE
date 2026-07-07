import { motion } from 'framer-motion';
import { ArrowUpRight, FileDown } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SITE_URL } from '../lib/site';
import { BackgroundBeams } from '../components/effects/BackgroundBeams';
import { GradientOrb } from '../components/effects/GradientOrb';
import { Magnetic, TextScramble } from '../components/effects';

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
      <BackgroundBeams count={2} />
      <GradientOrb size={350} className="top-[-80px] right-[-60px]" />
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
            <span className="text-accent">
              <TextScramble words={["Let's make it real.", "Ship it.", "Build it."]} className="min-w-[10ch] text-accent inline-block" />
            </span>
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
            <Magnetic>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 h-14 px-8 rounded-xl border border-rule/15 text-ink-primary font-semibold text-base bg-elevated hover:bg-sunken hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                <FileDown className="w-5 h-5" />
                Download résumé
              </a>
            </Magnetic>
          </div>
        </motion.div>

        <div className="mt-20 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {METHODS.map((m) => (
            <Magnetic key={m.label} strength={0.2} className="w-full">
              <a
                href={m.href}
                target={m.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`glass glass-shine group w-full flex items-center justify-between gap-4 p-6 rounded-2xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(0_0_0/0.16)] ${m.primary ? 'sm:col-span-2 ring-1 ring-accent/25' : ''}`}
              >
                <div>
                  <div className="font-mono text-xs uppercase tracking-kicker text-ink-tertiary">{m.label}</div>
                  <div className={`font-mono text-lg mt-2 ${m.primary ? 'text-accent font-medium' : 'text-ink-secondary'}`}>
                    {m.value}
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-ink-tertiary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </Magnetic>
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
