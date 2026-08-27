import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { IDENTITY } from '../data/portfolio'
import { OSS_STATS } from '../data/opensource'
import { ShaderBackground } from './effects/ShaderBackground'
import { Magnetic } from './effects/Magnetic'

const TRUST_SIGNALS = [
  { value: '12+', label: 'Projects shipped' },
  { value: `${OSS_STATS.mergedPRs}+`, label: 'Open-source PRs merged' },
  { value: '4×', label: 'Hackathon finalist' },
]

export function BentoHero() {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-6 pt-20 pb-20 md:pt-28 md:pb-28">
      {/* Ambient — single soft radial, no competing shader wash */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-20 right-[8%] w-[520px] h-[520px] rounded-full bg-accent/[0.04] blur-[80px]" />
        <div className="absolute top-32 left-[-10%] w-[400px] h-[400px] rounded-full bg-accent/[0.025] blur-[60px]" />
        {/* Keep shader ultra-subtle — texture, not light source */}
        <ShaderBackground className="opacity-[0.22] md:opacity-[0.30]" intensity={0.35} />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/0 via-transparent to-paper" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.35fr_0.9fr] gap-10 md:gap-14 items-center">
        {/* Left: main statement */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 self-start"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-tertiary">Available for new work — Ahmedabad / Remote</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="display text-[clamp(2.6rem,7.2vw,4.4rem)] leading-[0.96] tracking-[-0.04em] font-[650]"
          >
            I ship production{' '}
            <span className="font-serif italic font-normal text-accent">AI systems</span>
            <br className="hidden md:block" />
            {' '}from agents to full-stack apps.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15px] md:text-[17px] leading-[1.7] text-ink-secondary max-w-[52ch] text-pretty"
          >
            AI engineer building autonomous agents, LLM pipelines, RAG systems, and the
            backend that makes them production-ready. Open source at OWASP, Microsoft, and Ollama.
          </motion.p>

          {/* Trust signals — editorial, not pill list */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-2 text-[11px] font-mono"
          >
            {TRUST_SIGNALS.map((s, i) => (
              <span key={s.label} className="inline-flex items-center gap-1.5">
                {i > 0 && <span className="w-px h-3 bg-rule/20 mx-1 hidden sm:inline-block" aria-hidden />}
                <span className="text-ink-primary font-semibold tabular-nums">{s.value}</span>
                <span className="text-ink-tertiary">{s.label}</span>
              </span>
            ))}
            <a href="https://peerlist.io/kunjshah/project/engineeros" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-accent transition-colors">
              <span className="w-px h-3 bg-rule/20 mx-1 hidden sm:inline-block" aria-hidden />
              <span className="text-accent font-semibold">Peerlist</span>
              <span className="text-ink-tertiary">EngineerOS — 11↑</span>
            </a>
            <span className="inline-flex items-center gap-1.5 text-ink-tertiary">
              <span className="w-px h-3 bg-rule/20 mx-1 hidden sm:inline-block" aria-hidden />
              <MapPin className="w-3 h-3 opacity-60" />
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
            <Magnetic>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 h-11 px-5 rounded-full bg-accent text-accent-ink font-semibold text-sm hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgb(var(--accent)/0.30)]"
              >
                <span>View my work</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </Link>
            </Magnetic>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 h-11 px-5 rounded-full border border-rule/20 text-ink-primary font-medium text-sm hover:bg-elevated hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>

        {/* Right: photo — quiet frame, no double glow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex flex-col items-start gap-4"
        >
          <div className="relative w-full max-w-[300px]">
            <div className="absolute -inset-4 rounded-[1.75rem] bg-accent/[0.06] blur-2xl" aria-hidden />
            <div className="relative rounded-[1.5rem] overflow-hidden border border-rule/10 bg-elevated shadow-[0_8px_32px_rgb(var(--ink-primary)/0.08)]">
              <img
                src={IDENTITY.profile_photo}
                alt={`${IDENTITY.name} - AI Engineer`}
                className="w-full aspect-[4/5] object-cover object-[center_18%]"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-primary/10 to-transparent pointer-events-none" />
            </div>
            {/* Caption tucked under, not floating card */}
            <div className="mt-3 flex items-center gap-2 font-mono text-[10px] leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
              <span className="tracking-wide uppercase text-ink-tertiary">Currently</span>
              <span className="text-ink-secondary">— building multi-agent research workflows</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile: grounding identity row (photo is desktop-only) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex md:hidden items-center gap-4 p-4 rounded-xl border border-rule/10 bg-elevated/70"
      >
        <div className="relative shrink-0">
          <div className="absolute -inset-1 rounded-full bg-accent/20 blur-md" aria-hidden />
          <img
            src={IDENTITY.profile_photo}
            alt={`${IDENTITY.name} - AI Engineer`}
            className="relative w-14 h-14 rounded-full object-cover object-[center_20%] border border-accent/20"
            loading="eager"
          />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-ink-primary leading-tight">{IDENTITY.name}</div>
          <div className="mt-1 flex items-center gap-2 text-xs text-ink-tertiary font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot shrink-0" />
            <span className="truncate">Building multi-agent research workflows</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
