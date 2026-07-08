import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { LIVE_STATUS, IDENTITY } from '../data/portfolio';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center border-b border-rule/12 overflow-hidden">
      <div className="relative w-full max-w-manifest mx-auto px-6 py-24 md:py-32">
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-8 flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="display text-[3.5rem] sm:text-[4.5rem] md:text-[6rem] leading-[0.95] tracking-tightest"
            >
              I ship the things
              <br />
              you need built.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 text-ink-secondary leading-relaxed text-lg md:text-xl max-w-2xl"
            >
              AI agents, web apps, APIs, prototypes — you describe it, I build it. Whiteboard to production in weeks, not quarters.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 px-6 h-12 rounded-md bg-accent text-accent-ink font-body text-sm font-medium hover:bg-accent-hover transition-colors duration-base ease-out-soft"
              >
                See what I&rsquo;ve built
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-6 h-12 rounded-md border border-rule text-ink-secondary font-body text-sm font-medium hover:border-accent hover:text-accent transition-colors"
              >
                Start a conversation
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.figure
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 flex flex-col items-stretch"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sunken">
              <img
                src={IDENTITY.profile_photo}
                alt="Kunj Shah at DevFest Baroda 2025"
                className="w-full h-full object-cover object-[center_25%]"
                loading="eager"
                decoding="async"
                width="395"
                height="878"
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs text-ink-tertiary text-right">
              DevFest Baroda, 2025
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
