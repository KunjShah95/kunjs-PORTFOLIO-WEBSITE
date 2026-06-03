import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { LIVE_STATUS } from '../data/portfolio';

export function Hero() {
  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-32 border-b border-rule/12">
      <div className="max-w-manifest mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-ink-tertiary"
        >
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-live" />
            </span>
            <span className="uppercase tracking-kicker">Available {LIVE_STATUS.available ? 'for hire' : '— booked'}</span>
          </span>
          <span className="hidden md:inline text-ink-quaternary">·</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            {LIVE_STATUS.location}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-9 display text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] leading-[0.95] tracking-tightest"
          >
            I build agents
            <br />
            that <em className="italic text-accent">actually ship</em>.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3 md:pl-6 md:border-l border-rule/12 flex flex-col justify-end"
          >
            <p className="text-ink-secondary leading-relaxed text-base max-w-xs">
              Kunj Shah &mdash; AI engineer based in Ahmedabad. I design, build, and deploy production-grade agentic systems.
            </p>
            <div className="mt-6 kicker">Currently building</div>
            <div className="mt-1 font-mono text-sm text-ink-primary">{LIVE_STATUS.building}</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 px-6 h-12 rounded-md bg-inverse text-ink-inverse font-body text-sm font-medium hover:bg-accent transition-colors duration-base ease-out-soft"
          >
            See what I&rsquo;ve built
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-6 h-12 rounded-md border border-ink-primary/20 text-ink-primary font-body text-sm font-medium hover:border-ink-primary transition-colors"
          >
            Start a conversation
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
