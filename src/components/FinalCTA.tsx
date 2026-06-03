import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative bg-ink-primary text-paper overflow-hidden">
      <div className="relative max-w-manifest mx-auto px-6 py-32 md:py-48">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          <div className="md:col-span-8">
            <div className="kicker text-paper/80">Get in touch</div>
            <h2 className="display text-5xl md:text-7xl mt-4 leading-[0.95] tracking-tightest max-w-4xl text-paper">
              Have an agent
              <br />
              to ship? <em className="italic text-accent">Let&rsquo;s talk.</em>
            </h2>
            <p className="mt-8 text-paper/85 text-lg leading-relaxed max-w-xl">
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

          <div className="md:col-span-4 md:pl-8 md:border-l border-paper/15 flex flex-col justify-end gap-4">
            <div className="kicker text-paper/80">Elsewhere</div>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://github.com/KunjShah95"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-2 p-4 rounded-md border border-paper/15 hover:border-paper/40 hover:bg-paper/5 transition-all duration-base"
              >
                <Github className="w-5 h-5 text-paper/70 group-hover:text-paper transition-colors" />
                <span className="font-mono text-[11px] text-paper/60 group-hover:text-paper/90 transition-colors">GitHub</span>
              </a>
              <a
                href="https://github.com/KunjShah01"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-2 p-4 rounded-md border border-paper/15 hover:border-paper/40 hover:bg-paper/5 transition-all duration-base"
              >
                <Github className="w-5 h-5 text-paper/70 group-hover:text-paper transition-colors" />
                <span className="font-mono text-[11px] text-paper/60 group-hover:text-paper/90 transition-colors">Alt</span>
              </a>
              <a
                href="https://linkedin.com/in/kunjshah05"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-2 p-4 rounded-md border border-paper/15 hover:border-paper/40 hover:bg-paper/5 transition-all duration-base"
              >
                <Linkedin className="w-5 h-5 text-paper/70 group-hover:text-paper transition-colors" />
                <span className="font-mono text-[11px] text-paper/60 group-hover:text-paper/90 transition-colors">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/kunjshah_dev"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-2 p-4 rounded-md border border-paper/15 hover:border-paper/40 hover:bg-paper/5 transition-all duration-base"
              >
                <Twitter className="w-5 h-5 text-paper/70 group-hover:text-paper transition-colors" />
                <span className="font-mono text-[11px] text-paper/60 group-hover:text-paper/90 transition-colors">Twitter</span>
              </a>
            </div>
            <a
              href="mailto:kkshah20050@gmail.com"
              className="group inline-flex items-center justify-center gap-2 p-3 rounded-md border border-paper/15 hover:border-paper/40 hover:bg-paper/5 transition-all duration-base"
            >
              <Mail className="w-4 h-4 text-paper/70 group-hover:text-paper transition-colors" />
              <span className="font-mono text-xs text-paper/60 group-hover:text-paper/90 transition-colors">Email</span>
            </a>
          </div>
        </motion.div>

        {/* Bottom colophon line */}          <div className="mt-20 pt-8 border-t border-paper/15 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-paper/70">
          <div>&copy; 2026 Kunj Shah &middot; Built in Ahmedabad</div>
          <div>Designed &amp; shipped by hand &middot; v.2026</div>
        </div>
      </div>
    </section>
  );
}
