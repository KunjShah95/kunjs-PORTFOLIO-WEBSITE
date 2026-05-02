import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ArrowDown, Download, Sparkles, Terminal, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IDENTITY } from '../data/portfolio'

const METRICS = [
  { value: '11+', label: 'AI products shipped', icon: '🚀' },
  { value: '98.7%', label: 'CV accuracy', icon: '🎯' },
  { value: '5+', label: 'Hackathons', icon: '🏆' },
  { value: '70%', label: 'Screening cut', icon: '⚡' },
] as const

const TYPEWRITER_WORDS = [
  'Agentic Systems',
  'LLM Applications',
  'Computer Vision',
  'AI Products',
]

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2)
    } else {
      setDeleting(false)
      setWordIdx((w) => (w + 1) % words.length)
    }

    setDisplay(current.slice(0, charIdx))
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIdx, deleting, wordIdx])

  return display
}

/** Animated grid of dots that reacts to scroll */
function HeroCanvas() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Large ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.10, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] right-[-5%] w-[min(700px,90vw)] h-[700px] rounded-full bg-primary blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[-15%] left-[-8%] w-[min(600px,80vw)] h-[600px] rounded-full bg-secondary blur-[100px]"
      />

      {/* Engineering grid */}
      <div
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(var(--border-main)) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(var(--border-main)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 0%, transparent 75%)',
        }}
      />

      {/* Floating code fragments */}
      {[
        { text: 'agent.run()', x: '8%', y: '18%', delay: 0 },
        { text: 'LLM.generate()', x: '80%', y: '12%', delay: 0.6 },
        { text: 'pipe.deploy()', x: '72%', y: '76%', delay: 1.2 },
        { text: 'cv.predict()', x: '6%', y: '72%', delay: 1.8 },
      ].map(({ text, x, y, delay }) => (
        <motion.div
          key={text}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.18, 0.08, 0.18, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
          className="absolute txt-mono text-[10px] text-primary hidden lg:block"
          style={{ left: x, top: y }}
        >
          {text}
        </motion.div>
      ))}
    </div>
  )
}

export function NarrativeHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: '-20px' })
  const [imageError, setImageError] = useState(false)
  const typed = useTypewriter(TYPEWRITER_WORDS)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
    >
      <HeroCanvas />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 container-aligned w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center py-24 lg:py-32"
      >
        {/* ── LEFT: narrative ── */}
        <motion.div
          className="flex flex-col gap-7 order-2 lg:order-1"
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.10 } } }}
        >
          {/* Act label */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16,1,0.3,1] } } }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-bold tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Open for Freelance & Roles
            </span>
          </motion.div>

          {/* Act I: Identity */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } } }}
            className="space-y-3"
          >
            <p className="txt-mono text-xs text-muted uppercase tracking-[0.22em]">
              {IDENTITY.location}
            </p>
            <h1 className="font-display text-[clamp(3rem,6.5vw,5rem)] font-bold leading-[1.05] text-txt tracking-[-0.03em]">
              {IDENTITY.name}
            </h1>
            <div className="flex items-baseline gap-2 text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold font-display text-primary leading-none">
              <span>Building&nbsp;</span>
              <span className="inline-flex items-baseline gap-0.5 min-w-[11ch]">
                <span>{typed}</span>
                <span className="w-[2px] h-[1em] bg-primary animate-pulse inline-block ml-0.5 translate-y-[2px]" aria-hidden />
              </span>
            </div>
          </motion.div>

          {/* Act II: What I do */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16,1,0.3,1] } } }}
            className="text-base sm:text-lg text-muted leading-relaxed max-w-lg border-l-[3px] border-primary/40 pl-5"
          >
            I engineer end-to-end AI systems — from bias-auditing healthcare models to real-time
            crowd intelligence — and ship them as <em className="text-txt not-italic font-semibold">production-ready products</em>, not just notebooks.
          </motion.p>

          {/* Act III: Proof strip */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16,1,0.3,1] } } }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-2xl bg-surface/60 border border-border backdrop-blur-sm p-3"
          >
            {METRICS.map(({ value, label, icon }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1 py-2 px-1">
                <span className="text-base leading-none">{icon}</span>
                <span className="font-display text-[1.6rem] font-bold text-primary leading-none">{value}</span>
                <span className="txt-mono text-[9px] text-muted uppercase tracking-wide leading-tight">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Focus tags */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
            className="flex flex-wrap gap-2"
          >
            {IDENTITY.focus.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs text-muted font-medium hover:border-primary/40 hover:text-txt transition-colors duration-200 cursor-default"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
            className="flex flex-wrap gap-3 pt-1"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary text-white font-bold text-sm tracking-wide hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.97]"
            >
              View My Work
              <Zap className="w-4 h-4" aria-hidden />
            </Link>
            <Link
              to="/labs"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-surface border border-border text-txt font-semibold text-sm hover:bg-surfaceHighlight hover:border-primary/35 transition-all"
            >
              Live Demos
              <Sparkles className="w-4 h-4 text-primary" aria-hidden />
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border text-txt font-semibold text-sm hover:bg-surfaceHighlight hover:border-primary/35 transition-all"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: photo + floating cards ── */}
        <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[min(100%,400px)] lg:h-[400px]"
          >
            {/* Ambient glow ring */}
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/25 via-transparent to-secondary/20 opacity-70 blur-md" aria-hidden />

            {/* Photo frame */}
            <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden border border-border/70 shadow-2xl shadow-black/20 dark:shadow-black/50 bg-surfaceHighlight">
              {IDENTITY.profile_photo && !imageError ? (
                <img
                  src={IDENTITY.profile_photo}
                  alt={`${IDENTITY.name} — AI Engineer`}
                  width={400}
                  height={400}
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-display text-7xl font-bold text-primary/20">
                  KS
                </div>
              )}
            </div>

            {/* Floating: availability badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-3 sm:-left-6 glass-panel rounded-2xl px-4 py-3 shadow-xl max-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="txt-mono text-[9px] text-muted uppercase tracking-widest">Status</span>
              </div>
              <div className="text-sm font-bold text-txt">Freelancing & open</div>
            </motion.div>

            {/* Floating: terminal snippet */}
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              className="absolute -top-4 -right-3 sm:-right-6 glass-panel rounded-xl px-3.5 py-2.5 shadow-lg hidden sm:block"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Terminal className="w-3 h-3 text-primary" aria-hidden />
                <span className="txt-mono text-[9px] text-muted uppercase tracking-widest">stack</span>
              </div>
              <div className="txt-mono text-[11px] text-primary leading-relaxed">
                Python · LangChain<br />FastAPI · React
              </div>
            </motion.div>

            {/* Version tag */}
            <div
              className="absolute top-3 left-4 px-2.5 py-1 rounded-md border border-border/60 bg-surface/80 backdrop-blur-sm txt-mono text-[9px] text-muted uppercase tracking-widest"
              aria-hidden
            >
              v.2026
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 max-[380px]:hidden"
        aria-hidden
      >
        <span className="txt-mono text-[9px] text-muted uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-muted" />
        </motion.div>
      </motion.div>
    </section>
  )
}
