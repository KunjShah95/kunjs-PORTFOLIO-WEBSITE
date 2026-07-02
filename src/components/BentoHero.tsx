import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { IDENTITY, LIVE_STATUS, PROJECTS, SKILL_GROUPS } from '../data/portfolio'
import { OSS_STATS } from '../data/opensource'
import { AnimatedCounter } from './AnimatedCounter'

import { Magnetic, SpotlightCard, GlowBorder, TextScramble, TiltCard } from './effects'

const NOW = [
  'Building a multi-agent research workflow',
  'Shipping open-source AI security tooling',
  'Open to freelance and fractional AI-eng work',
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

const CARD = 'rounded-2xl border border-rule/12 bg-elevated'

export function BentoHero() {
  const [activeSkillIdx, setActiveSkillIdx] = useState(0)
  const featured = PROJECTS.find((p) => p.slug === 'offerguard-ai') ?? PROJECTS[0]

  return (
    <section className="relative w-full max-w-manifest mx-auto px-6 pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Header */}
      <header className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-10 items-center pb-10 md:pb-14">
        {/* Left info column */}
        <div className="flex flex-col gap-6">
          <motion.div
            variants={reveal} initial="hidden" animate="visible"
            className="self-start inline-flex items-center gap-2.5 pl-3 pr-3.5 py-1.5 rounded-full border border-rule/12 bg-elevated font-mono text-[11.5px] tracking-wide text-ink-tertiary"
          >
            <span className="relative inline-block w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-live animate-ping-soft" />
              <span className="absolute inset-0 rounded-full bg-live animate-pdot" />
            </span>
            Open for AI &amp; Software roles · {LIVE_STATUS.available ? '2026' : 'booked'}
          </motion.div>

          <motion.h1
            variants={reveal} initial="hidden" animate="visible" custom={0.07}
            className="display text-[13vw] leading-[1.02] sm:text-6xl md:text-[4.2rem] max-w-[17ch]"
          >
            I build agentic AI &amp; software that{' '}
            <TextScramble words={['reasons', 'scales', 'ships', 'adapts', 'learns']} className="text-accent min-w-[7ch]" />.
          </motion.h1>

          <motion.p
            variants={reveal} initial="hidden" animate="visible" custom={0.14}
            className="text-lg md:text-xl leading-relaxed text-ink-secondary max-w-[56ch]"
          >
            AI Engineer &amp; Software Developer building autonomous agents, production AI/ML pipelines,
            and robust backend systems — bridging advanced intelligence with scalable software engineering.
          </motion.p>

          <motion.div
            variants={reveal} initial="hidden" animate="visible" custom={0.2}
            className="flex flex-wrap gap-3"
          >
            <Magnetic>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 h-12 px-5 rounded-xl bg-accent text-accent-ink font-semibold text-[15px] transition-[filter,box-shadow] hover:brightness-110 hover:shadow-[0_10px_28px_rgb(var(--accent)/0.34)]"
              >
                View selected work <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
            <a
              href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center h-12 px-5 rounded-xl border border-rule/12 bg-elevated text-ink-primary font-semibold text-[15px] hover:bg-sunken transition-colors"
            >
              Résumé
            </a>
          </motion.div>
        </div>

        {/* Right curvy hero photo column */}
        <motion.div
          variants={reveal} initial="hidden" animate="visible" custom={0.25}
          className="flex justify-center md:justify-end"
        >
          <TiltCard scale={1.015} maxRotation={5} className="w-full max-w-[280px] aspect-[3.8/5] md:max-w-[320px]">
            <div className="w-full h-full rounded-[3rem] overflow-hidden border border-accent/20 bg-accent/5 relative group shadow-2xl">
              <img 
                src={IDENTITY.profile_photo} 
                alt={IDENTITY.name} 
                className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-slow ease-out-soft" 
                loading="eager" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sunken/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-[3rem] border border-white/10 pointer-events-none" />
            </div>
          </TiltCard>
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
              <span className="text-sm text-ink-tertiary">AI Engineer · Full-stack Specialist</span>
            </div>
            <p className="text-[15px] leading-relaxed text-ink-secondary">
              I turn fuzzy problems into reliable systems — designing multi-agent architectures,
              wiring up evals and guardrails, and shipping the full stack around them. Building at the
              edge of <strong className="font-semibold text-ink-primary">agentic AI</strong>.
            </p>
            <div className="border-t border-rule/8 pt-3">
              <span className="font-mono text-[10px] uppercase text-ink-tertiary tracking-wider block mb-2 font-semibold">Roles I fill</span>
              <div className="flex flex-wrap gap-1.5">
                {['AI / ML Engineer', 'Agentic AI Dev', 'Full Stack Developer', 'Cloud & DevOps'].map((role) => (
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
              <div className="flex gap-4 font-mono text-xs">
                <a href="https://github.com/KunjShah95" target="_blank" rel="noopener noreferrer" className="text-ink-tertiary hover:text-accent transition-colors">GitHub ↗</a>
                <a href="https://x.com/kunjshah_dev" target="_blank" rel="noopener noreferrer" className="text-ink-tertiary hover:text-accent transition-colors">X ↗</a>
                <a href="https://www.linkedin.com/in/kunjshah05" target="_blank" rel="noopener noreferrer" className="text-ink-tertiary hover:text-accent transition-colors">LinkedIn ↗</a>
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
              <div className="text-[13px] text-ink-tertiary leading-tight">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Featured build */}
        <motion.div
          variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.12}
          className="md:[grid-area:feat] flex"
        >
          <Link to={`/projects/${featured.slug}`} className={`${CARD} w-full p-6 flex flex-col gap-3.5 min-h-[320px] group hover:border-accent/30 transition-colors`}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-tertiary">Featured build</span>
              <span className="font-mono text-[11px] text-live">● live</span>
            </div>
            <div className="flex-1 min-h-[130px] rounded-lg border border-rule/12 flex items-center justify-center" style={{ background: 'repeating-linear-gradient(135deg, rgb(var(--accent) / 0.08) 0 10px, rgb(var(--bg-elevated)) 10px 20px)' }}>
              <span className="font-mono text-[11.5px] text-ink-tertiary bg-elevated px-2.5 py-1.5 rounded-md border border-rule/12">{featured.title.toLowerCase()} · preview</span>
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="font-bold text-xl tracking-tight">{featured.title}</span>
              <span className="text-sm text-ink-tertiary">{featured.category}</span>
            </div>
            <p className="text-sm leading-relaxed text-ink-secondary line-clamp-2">{featured.desc}</p>
            <div className="flex gap-2 flex-wrap">
              {featured.tech.slice(0, 3).map((t) => (
                <span key={t} className="font-mono text-[11px] px-2.5 py-1.5 border border-rule/12 rounded-full text-ink-tertiary">{t}</span>
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
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-tertiary">Now</span>
          <div className="flex flex-col gap-3">
            {NOW.map((item) => (
              <div key={item} className="flex gap-2.5 items-start">
                <span className="w-[7px] h-[7px] rounded-full bg-accent mt-1.5 shrink-0" />
                <span className="text-sm leading-snug text-ink-secondary">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Glow CTA */}
        <motion.div
          variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.13}
          className="md:[grid-area:glow] flex"
        >
          <GlowBorder className="w-full">
            <div className="p-5 flex flex-col gap-3 justify-center h-full">
              <span className="font-bold text-base leading-snug tracking-tight">Have a gnarly AI problem?</span>
              <Magnetic>
                <Link to="/contact" className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-accent text-accent-ink font-semibold text-sm hover:brightness-110 transition-[filter]">
                  Let&rsquo;s talk <ArrowRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <a href={`mailto:${IDENTITY.contact}`} className="font-mono text-xs text-ink-tertiary hover:text-accent transition-colors">{IDENTITY.contact}</a>
            </div>
          </GlowBorder>
        </motion.div>

        {/* Latest writing */}
        <motion.div
          variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.18}
          className={`md:[grid-area:git] ${CARD} p-5 flex flex-col gap-3.5`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-tertiary">Writing</span>
            <Link to="/blog" className="font-mono text-[11px] text-ink-tertiary hover:text-accent transition-colors">all →</Link>
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
