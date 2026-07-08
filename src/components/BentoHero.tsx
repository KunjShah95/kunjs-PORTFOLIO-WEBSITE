import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin, Activity, GitMerge, Award } from 'lucide-react'
import { IDENTITY, LIVE_STATUS, PROJECTS, SKILL_GROUPS } from '../data/portfolio'
import { OSS_STATS } from '../data/opensource'
import { AnimatedCounter } from './AnimatedCounter'
import { Magnetic, SpotlightCard, CountUp } from './effects'

const NOW = [
  'Building a multi-agent research workflow',
  'Shipping open-source AI security tooling',
  'Open to full-time AI eng roles & freelance',
]

const CURRENTLY_BUILDING = [
  { name: 'OfferGuard AI', status: 'live' },
  { name: 'Multi-agent research workflow', status: 'active' },
  { name: 'Open-source security tooling', status: 'active' },
]

const TRUST_SIGNALS = [
  { value: 12, suffix: '+', label: 'Shipped projects' },
  { value: OSS_STATS.mergedPRs, suffix: '+', label: 'Open-source PRs' },
  { value: 4, suffix: '', label: 'Hackathon finals' },
]

const WRITING_ENTRIES = [
  { title: 'Evals that catch regressions', date: 'Jun 2026', readTime: '8 min', url: '#' },
  { title: 'Designing multi-agent handoffs', date: 'May 2026', readTime: '12 min', url: '#' },
  { title: 'Cutting LLM latency 60%', date: 'Apr 2026', readTime: '6 min', url: '#' },
]

const reveal = {
  hidden: { opacity: 0, y: 14 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.2, 0.7, 0.2, 1] } }),
}

const CARD = 'rounded-2xl border border-rule/12 bg-elevated noise-texture'

export function BentoHero() {
  const [activeSkillIdx, setActiveSkillIdx] = useState(0)
  const featured = PROJECTS.find((p) => p.slug === 'offerguard-ai') ?? PROJECTS[0]

  return (
    <section className="relative w-full max-w-manifest mx-auto px-6 pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Header */}
      <header className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-10 items-start pb-10 md:pb-14">
        {/* Left info column */}
        <div className="flex flex-col gap-6">
          <motion.div
            variants={reveal} initial="hidden" animate="visible"
            className="self-start inline-flex items-center gap-2.5 pl-3 pr-3.5 py-1.5 rounded-full border border-rule/12 bg-elevated font-mono text-[11.5px] tracking-wide text-ink-tertiary noise-texture"
          >
            <span className="relative inline-block w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-live animate-ping-soft" />
              <span className="absolute inset-0 rounded-full bg-live animate-pdot" />
            </span>
            Available for AI engineering roles · {LIVE_STATUS.available ? '2026' : 'booked'}
          </motion.div>

          <motion.h1
            variants={reveal} initial="hidden" animate="visible" custom={0.07}
            className="display text-[12vw] leading-[1.02] sm:text-5xl md:text-[3.8rem] lg:text-[4.2rem] max-w-[20ch]"
          >
            Autonomous systems aren't the{' '}
            <span className="text-accent">future</span>. They're{' '}
            <span className="text-accent">what I build today</span>.
          </motion.h1>

          <motion.p
            variants={reveal} initial="hidden" animate="visible" custom={0.14}
            className="text-base md:text-lg leading-relaxed text-ink-secondary max-w-[56ch] font-body"
          >
            AI Engineer — I replace repetitive human work with autonomous agents, 
            ship production ML pipelines, and build systems that scale. 
            From tokenizers written from scratch to multi-provider LLM orchestration 
            serving thousands of tokens.
          </motion.p>

          {/* Inline trust signals */}
          <motion.div
            variants={reveal} initial="hidden" animate="visible" custom={0.18}
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {TRUST_SIGNALS.map((s, i) => (
              <span key={s.label} className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-tertiary">
                {i === 0 && <Activity className="w-3 h-3 text-accent" />}
                {i === 1 && <GitMerge className="w-3 h-3 text-accent" />}
                {i === 2 && <Award className="w-3 h-3 text-accent" />}
                <span className="text-accent font-bold text-sm tabular-nums">
                  <CountUp value={s.value} duration={1.2} suffix={s.suffix} />
                </span>
                {s.label}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-tertiary">
              <MapPin className="w-3 h-3" />
              {IDENTITY.location}
            </span>
          </motion.div>

          <motion.div
            variants={reveal} initial="hidden" animate="visible" custom={0.22}
            className="flex flex-wrap gap-3"
          >
            <Magnetic>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 h-12 px-5 rounded-xl bg-accent text-accent-ink font-semibold text-[15px] transition-[filter,box-shadow,transform] hover:brightness-110 hover:shadow-[0_10px_28px_rgb(var(--accent)/0.34)] hover:-translate-y-0.5 active:translate-y-0"
              >
                See engineering work <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Magnetic>
            <div className="relative group">
              <button
                className="inline-flex items-center h-12 px-5 rounded-xl border border-rule/12 bg-elevated text-ink-primary font-semibold text-[15px] hover:bg-sunken hover:-translate-y-0.5 transition-all noise-texture"
              >
                Résumé
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="w-56 bg-elevated/95 backdrop-blur-xl border border-rule/12 p-1.5 rounded-xl shadow-2xl flex flex-col gap-1 noise-texture">
                  <a
                    href="/kunjaiml.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-accent hover:text-accent-ink transition-colors font-medium flex items-center justify-between text-ink-primary"
                  >
                    <span>AI / ML Roles <span className="block text-[10px] text-ink-tertiary group-hover:text-accent-ink/70 font-mono">kunjaiml.pdf</span></span>
                    <span className="text-xs text-ink-tertiary">↗</span>
                  </a>
                  <a
                    href="/kunjshah_cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-accent hover:text-accent-ink transition-colors font-medium flex items-center justify-between text-ink-primary"
                  >
                    <span>Full Stack Roles <span className="block text-[10px] text-ink-tertiary group-hover:text-accent-ink/70 font-mono">kunjshah_cv.pdf</span></span>
                    <span className="text-xs text-ink-tertiary">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right — Currently Building floating glass card */}
        <motion.div
          variants={reveal} initial="hidden" animate="visible" custom={0.25}
          className="flex flex-col gap-4"
        >
          {/* Profile photo */}
          <div className="w-full max-w-[280px] aspect-[3.8/5] md:max-w-[300px] mx-auto md:mx-0 rounded-2xl overflow-hidden border border-rule/12">
            <img
              src={IDENTITY.profile_photo}
              alt={`${IDENTITY.name} — AI Engineer`}
              className="w-full h-full object-cover object-[center_20%]"
              loading="eager"
            />
          </div>

          {/* Currently Building */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="p-4 rounded-xl border border-rule/12 bg-elevated max-w-[300px] mx-auto md:mx-0"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-tertiary block mb-3">Currently Building</span>
            <div className="flex flex-col gap-1.5">
              {CURRENTLY_BUILDING.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="text-accent text-xs">→</span>
                  <span className="text-[13px] text-ink-secondary font-medium">{item.name}</span>
                  {item.status === 'live' && (
                    <span className="font-mono text-[9px] text-live bg-live/10 px-1.5 py-0.5 rounded font-bold">LIVE</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* Bento grid */}
      <div className="grid grid-cols-1 gap-4 md:[grid-template-columns:1.35fr_1fr_1.15fr] md:[grid-template-areas:'about_stats_feat'_'about_marq_feat'_'now_glow_git'] md:items-stretch">

        {/* About */}
        <motion.div
          variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="md:[grid-area:about]"
        >
          <SpotlightCard className={`${CARD} h-full p-6 flex flex-col gap-4 min-h-[320px]`}>
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-xl tracking-tight">{IDENTITY.name}</span>
              <span className="text-sm text-ink-tertiary font-body">AI Engineer · Systems Builder</span>
            </div>
            <p className="text-[15px] leading-relaxed text-ink-secondary font-body">
              I design and ship production AI systems — from multi-agent architectures 
              and RAG pipelines to edge-deployed computer vision. Every project here 
              shipped with real metrics: latency, accuracy, cost reduction. 
              I care about <strong className="font-semibold text-ink-primary">measurable engineering</strong>, not demos.
            </p>
            <div className="border-t border-rule/8 pt-3">
              <span className="font-mono text-[10px] uppercase text-ink-tertiary tracking-wider block mb-2 font-semibold">What I build</span>
              <div className="flex flex-wrap gap-1.5">
                {['AI Agents', 'LLM Systems', 'Computer Vision', 'Full-Stack AI'].map((role) => (
                  <span key={role} className="px-2 py-0.5 text-[10.5px] font-semibold text-accent bg-accent/8 border border-accent/20 rounded-md hover:bg-accent hover:text-white transition-colors duration-200 cursor-default">
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-auto flex items-center justify-between gap-3 flex-wrap pt-3 border-t border-rule/8">
              <span className="font-mono text-xs text-ink-tertiary inline-flex items-center gap-1.5">
                <MapPin className="w-3 h-3" /> {IDENTITY.location}
              </span>
              <div className="flex gap-4 font-mono text-xs flex-wrap">
                <a href="https://github.com/KunjShah95" target="_blank" rel="noopener noreferrer" className="text-ink-tertiary hover:text-accent transition-colors">GitHub ↗</a>
                <a href="https://www.linkedin.com/in/kunjshah05" target="_blank" rel="noopener noreferrer" className="text-ink-tertiary hover:text-accent transition-colors">LinkedIn ↗</a>
                <a href="/kunjaiml.pdf" target="_blank" rel="noopener noreferrer" className="text-ink-tertiary hover:text-accent transition-colors">AI/ML Resume ↗</a>
                <a href="/kunjshah_cv.pdf" target="_blank" rel="noopener noreferrer" className="text-ink-tertiary hover:text-accent transition-colors">Fullstack Resume ↗</a>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.06}
          className={`md:[grid-area:stats] ${CARD} p-6 grid grid-cols-2 gap-x-4 gap-y-6 content-center`}
        >
          {([
            [12, '+', 'projects shipped'],
            [OSS_STATS.mergedPRs, '', 'merged PRs'],
            [OSS_STATS.projects, '+', 'OSS repos'],
            [4, '', 'hackathon finals'],
          ] as [number, string, string][]).map(([n, suf, label]) => (
            <div key={label} className="flex flex-col gap-1">
              <div className="display text-3xl tabular-nums leading-none">
                <AnimatedCounter value={n} suffix={suf} />
              </div>
              <div className="text-[13px] text-ink-tertiary leading-tight font-body">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Featured build */}
        <motion.div
          variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.12}
          className="md:[grid-area:feat] flex"
        >
          <Link to={`/projects/${featured.slug}`} className={`${CARD} w-full p-6 flex flex-col gap-3.5 min-h-[320px] group hover:border-accent/30 transition-all hover-lift`}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-tertiary">Featured build</span>
              <span className="font-mono text-[11px] text-live flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-live animate-pdot" />
                live
              </span>
            </div>
            <div className="flex-1 min-h-[130px] rounded-xl border border-rule/12 flex items-center justify-center overflow-hidden" style={{ background: 'repeating-linear-gradient(135deg, rgb(var(--accent) / 0.08) 0 10px, rgb(var(--bg-elevated)) 10px 20px)' }}>
              <span className="font-mono text-[11.5px] text-ink-tertiary bg-elevated px-2.5 py-1.5 rounded-md border border-rule/12">{featured.title.toLowerCase()} · preview</span>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="font-bold text-xl tracking-tight">{featured.title}</span>
              <span className="text-sm text-ink-tertiary">{featured.category}</span>
            </div>
            <p className="text-sm leading-relaxed text-ink-secondary line-clamp-2 font-body">{featured.desc}</p>
            <div className="flex gap-2 flex-wrap">
              {featured.tech.slice(0, 3).map((t) => (
                <span key={t} className="font-mono text-[11px] px-2.5 py-1.5 border border-rule/12 rounded-full text-ink-tertiary group-hover:border-accent/20 transition-colors">{t}</span>
              ))}
            </div>
          </Link>
        </motion.div>

        {/* Interactive daily toolbox */}
        <motion.div
          variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.09}
          className={`md:[grid-area:marq] ${CARD} p-5 flex flex-col gap-3.5`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-tertiary">Daily toolbox</span>
            <span className="font-mono text-[9px] text-accent font-semibold px-2 py-0.5 rounded bg-accent/8 border border-accent/15">interactive</span>
          </div>

          <div className="flex gap-2">
            {SKILL_GROUPS.map((group, idx) => {
              const Icon = group.icon
              const isActive = activeSkillIdx === idx
              return (
                <button
                  key={group.category}
                  onClick={() => setActiveSkillIdx(idx)}
                  className={`flex-1 flex items-center justify-center py-2 px-1.5 rounded-lg border transition-all duration-300 ${
                    isActive 
                      ? 'bg-accent/8 border-accent/30 text-accent shadow-sm'
                      : 'bg-paper/40 border-rule/8 text-ink-tertiary hover:text-ink-primary hover:border-rule/16'
                  }`}
                  title={group.category}
                >
                  <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
                </button>
              )
            })}
          </div>

          <div className="flex-1 flex flex-col justify-center min-h-[90px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkillIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex flex-wrap gap-1.5"
              >
                {SKILL_GROUPS[activeSkillIdx].skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-[11px] font-mono text-ink-secondary bg-sunken/40 border border-rule/8 rounded-md hover:border-accent/30 hover:text-ink-primary transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Now */}
        <motion.div
          variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.06}
          className={`md:[grid-area:now] ${CARD} p-5 flex flex-col gap-3.5`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-tertiary">Now</span>
            <span className="w-1.5 h-1.5 rounded-full bg-live animate-pdot" />
          </div>
          <div className="flex flex-col gap-3">
            {NOW.map((item) => (
              <div key={item} className="flex gap-2.5 items-start">
                <span className="w-[7px] h-[7px] rounded-full bg-accent mt-1.5 shrink-0" />
                <span className="text-sm leading-snug text-ink-secondary font-body">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.13}
          className={`md:[grid-area:glow] ${CARD} flex`}
        >
          <div className="p-5 flex flex-col gap-3 justify-center h-full w-full">
            <span className="font-bold text-base leading-snug tracking-tight">Building something ambitious?</span>
            <Magnetic>
              <Link to="/contact" className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-accent text-accent-ink font-semibold text-sm hover:brightness-110 hover:-translate-y-0.5 transition-all">
                Let&rsquo;s make it real <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
            <a href={`mailto:${IDENTITY.contact}`} className="font-mono text-xs text-ink-tertiary hover:text-accent transition-colors">{IDENTITY.contact}</a>
          </div>
        </motion.div>

        {/* Latest writing */}
        <motion.div
          variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.18}
          className={`md:[grid-area:git] ${CARD} p-5 flex flex-col gap-3.5`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-tertiary">Writing</span>
            <Link to="/blogs" className="font-mono text-[11px] text-ink-tertiary hover:text-accent transition-colors">all →</Link>
          </div>
          <div className="flex flex-col">
            {WRITING_ENTRIES.map((entry) => (
              <a
                key={entry.title}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-3 border-t border-rule/8 first:border-t-0 hover:bg-sunken/40 -mx-2 px-2 rounded-lg transition-colors"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14.5px] font-semibold tracking-tight text-ink-primary leading-snug">{entry.title}</span>
                  <span className="font-mono text-[11px] text-ink-tertiary">{entry.date} · {entry.readTime}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-ink-tertiary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
