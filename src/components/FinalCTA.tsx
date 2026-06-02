import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative bg-ink-primary text-paper overflow-hidden">
      {/* Big background number — magazine-spread editorial mark */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-end pr-6 md:pr-12 pointer-events-none select-none"
      >
        <span
          className="font-display text-paper/[0.04] leading-none"
          style={{ fontSize: 'clamp(20rem, 50vw, 50rem)' }}
        >
          &bull;
        </span>
      </div>

      <div className="relative max-w-manifest mx-auto px-6 py-32 md:py-48">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          <div className="md:col-span-9">
            <div className="kicker text-paper/60">Get in touch</div>
            <h2 className="display text-5xl md:text-7xl mt-4 leading-[0.95] tracking-tightest max-w-4xl">
              Have an agent
              <br />
              to ship? <em className="italic text-accent">Let&rsquo;s talk.</em>
            </h2>
            <p className="mt-8 text-paper/70 text-lg leading-relaxed max-w-xl">
              I work with founders and small teams. Whiteboard to production in weeks, not quarters. Real systems, real users, real load.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-6 h-12 rounded-md bg-paper text-ink-primary font-body text-sm font-medium hover:bg-accent hover:text-accent-ink transition-colors duration-base ease-out-soft"
              >
                Start a conversation
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <a
                href="mailto:kkshah20050@gmail.com"
                className="group inline-flex items-center gap-2 px-6 h-12 rounded-md border border-paper/20 text-paper font-body text-sm font-medium hover:border-paper hover:bg-paper/5 transition-colors"
              >
                <Mail className="w-4 h-4" />
                kkshah20050@gmail.com
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:pl-6 md:border-l border-paper/15 flex flex-col justify-end gap-3">
            <div className="kicker text-paper/60">Elsewhere</div>
            <a href="https://github.com/KunjShah95" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-between text-sm text-paper/80 hover:text-paper transition-colors py-1">
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://github.com/KunjShah01" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-between text-sm text-paper/80 hover:text-paper transition-colors py-1">
              <span>GitHub &middot; KunjShah01</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://linkedin.com/in/kunjshah05" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-between text-sm text-paper/80 hover:text-paper transition-colors py-1">
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://twitter.com/kunjshah_dev" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-between text-sm text-paper/80 hover:text-paper transition-colors py-1">
              <span>Twitter</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </motion.div>

        {/* Bottom colophon line */}
        <div className="mt-20 pt-8 border-t border-paper/12 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-paper/50">
          <div>&copy; 2026 Kunj Shah &middot; Built in Ahmedabad</div>
          <div>Designed &amp; shipped by hand &middot; v.2026</div>
        </div>
      </div>
    </section>
  );
}
