import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { IDENTITY } from '../data/portfolio'
import { OSS_STATS } from '../data/opensource'

const TRUST_SIGNALS = [
  { value: '12+', label: 'Projects shipped' },
  { value: `${OSS_STATS.mergedPRs}+`, label: 'Open-source PRs merged' },
  { value: '4x', label: 'Hackathon finalist' },
]

export function BentoHero() {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
      {/* Background accent — soft abstract shape */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] pointer-events-none" aria-hidden>
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute top-40 right-40 w-48 h-48 rounded-full bg-accent/8 blur-2xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 items-center">
        {/* Left: main statement */}
        <div className="flex flex-col gap-5">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="display text-[clamp(2.8rem,8vw,4.8rem)] leading-[1.02] tracking-tight font-semibold"
          >
            I ship production{' '}
            <span className="font-serif italic font-normal text-accent">AI systems</span>
            {' '}from agents to full-stack apps.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg leading-relaxed text-ink-secondary max-w-[50ch]"
          >
            AI engineer building autonomous agents, LLM pipelines, RAG systems, and the 
            backend infrastructure that makes them production-ready. Open-source at OWASP, Microsoft, and Ollama.
          </motion.p>

          {/* Trust signals — inline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-ink-tertiary font-mono"
          >
            {TRUST_SIGNALS.map((s) => (
              <span key={s.label} className="inline-flex items-center gap-1.5">
                <span className="text-accent font-semibold">{s.value}</span>
                {s.label}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              {IDENTITY.location}
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 h-11 px-5 rounded-full bg-accent text-accent-ink font-semibold text-sm hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgb(var(--accent)/0.30)]"
            >
              <span>View my work</span>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 h-11 px-5 rounded-full border border-rule/20 text-ink-primary font-medium text-sm hover:bg-elevated hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>

        {/* Right: photo with premium frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex flex-col items-center gap-5"
        >
          <div className="relative w-full max-w-[280px] mx-auto">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/25 via-accent/5 to-transparent opacity-70 blur-2xl" aria-hidden />
            <div className="relative p-1.5 rounded-[2rem] bg-elevated/80 border border-accent/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              <div className="rounded-[calc(2rem-0.375rem)] overflow-hidden bg-sunken">
                <div className="absolute inset-0 bg-gradient-to-t from-accent/15 via-transparent to-transparent pointer-events-none z-10 rounded-[calc(2rem-0.375rem)]" />
                <img
                  src={IDENTITY.profile_photo}
                  alt={`${IDENTITY.name} - AI Engineer`}
                  className="w-full aspect-[4/5] object-cover object-[center_20%]"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-rule/10 bg-elevated/70 max-w-[260px]">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-tertiary/70 block mb-2">Currently</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot shrink-0" />
              <span className="text-sm text-ink-primary font-medium">Building multi-agent research workflows</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile: small accent below */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-10 flex md:hidden items-center gap-3 text-xs text-ink-tertiary font-mono"
      >
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
        <span>Building multi-agent research workflows</span>
      </motion.div>
    </section>
  )
}
