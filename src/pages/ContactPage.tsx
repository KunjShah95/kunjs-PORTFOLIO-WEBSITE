import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { BackgroundBeams } from '../components/effects/BackgroundBeams';
import { GradientOrb } from '../components/effects/GradientOrb';
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
            The fastest way to reach me is{' '}
            <a href="mailto:kkshah2005@gmail.com" className="text-ink-primary underline decoration-ink-primary/30 decoration-2 underline-offset-8 hover:decoration-ink-primary/60 transition-colors">email</a>.
          </h1>
          <p className="mt-8 text-lg text-ink-secondary max-w-2xl leading-relaxed">
            If you&rsquo;re working on something and want an extra set of hands, write to me. I usually reply within a day. For longer briefs, it helps to include the scope, the timeline, and what success would look like. Even a rough sketch is enough.
          </p>
        </motion.div>

        <div className="mt-24 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
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
