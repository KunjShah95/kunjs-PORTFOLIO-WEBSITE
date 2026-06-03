import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { LIVE_STATUS, IDENTITY } from '../data/portfolio';

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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-9 display text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] leading-[0.95] tracking-tightest"
          >
            I build agents
            <br />
            that{' '}
            <em className="italic text-accent underline decoration-accent decoration-[1.5px] underline-offset-[10px]">
              actually ship
            </em>
            .
          </motion.h1>

          {/* Portrait — DevFest Baroda, the 21-year-old behind the h1 */}
          <motion.figure
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3 flex flex-col items-stretch"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-sunken">
              <img
                src={IDENTITY.profile_photo}
                alt="Kunj Shah at DevFest Baroda 2025"
                className="w-full h-full object-cover object-[center_25%]"
                loading="eager"
                decoding="async"
                width="600"
                height="750"
              />
            </div>
            <figcaption className="mt-3 font-mono text-xs text-ink-tertiary text-right">
              DevFest Baroda, 2025
            </figcaption>
          </motion.figure>
        </div>

        {/* Sub-headline — the lede, now wider since the photo has the 3-col */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 md:mt-12 text-ink-secondary leading-relaxed text-lg md:text-xl max-w-2xl"
        >
          I&rsquo;m 21, fourth-year CS in Ahmedabad. I build production agents — retrieval, orchestration, and the backend underneath — and I write about the parts that broke.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1"
        >
          <div className="kicker">Currently building</div>
          <span className="font-mono text-xs text-ink-quaternary">/</span>
          <div className="font-mono text-sm text-ink-primary">{LIVE_STATUS.building}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-3"
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-8 text-sm text-ink-tertiary max-w-2xl"
        >
          For founders, small teams, and the rare weekend project. Whiteboard to production in weeks, not quarters — agents, retrieval, and the backend to hold them up.
        </motion.p>
      </div>
    </section>
  );
}
