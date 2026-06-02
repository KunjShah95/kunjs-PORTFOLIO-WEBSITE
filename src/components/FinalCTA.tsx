import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-32 md:py-48 bg-inverse text-ink-inverse">
      <div className="max-w-manifest mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          <div className="md:col-span-9">
            <div className="kicker" style={{ color: 'rgb(var(--accent-ink) / 0.6)' }}>Get in touch</div>
            <h2 className="display text-5xl md:text-7xl mt-4 leading-[0.95] tracking-tightest">
              Have an agent
              <br />
              to ship? <em className="italic" style={{ color: 'rgb(var(--accent))' }}>Let&rsquo;s talk.</em>
            </h2>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-6 h-12 rounded-md bg-paper text-ink-primary font-body text-sm font-medium hover:bg-accent hover:text-accent-ink transition-colors duration-base ease-out-soft"
              >
                Start a conversation
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <a
                href="mailto:hello@kunjshah.dev"
                className="group inline-flex items-center gap-2 px-6 h-12 rounded-md border border-ink-inverse/20 text-ink-inverse font-body text-sm font-medium hover:border-ink-inverse transition-colors"
              >
                hello@kunjshah.dev
              </a>
            </div>
          </div>
          <div className="md:col-span-3 md:pl-6 md:border-l border-ink-inverse/12 flex flex-col justify-end gap-3">
            <div className="kicker" style={{ color: 'rgb(var(--accent-ink) / 0.6)' }}>Elsewhere</div>
            <a href="https://github.com/KunjShah95" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">GitHub &nearr;</a>
            <a href="https://linkedin.com/in/kshah00" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">LinkedIn &nearr;</a>
            <a href="https://twitter.com/kshah00" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">Twitter &nearr;</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
