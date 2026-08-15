import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Lock, Play, ExternalLink } from 'lucide-react'
import { ShaderBackground } from './effects/ShaderBackground'

export function LiveProjectShowcase() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="relative py-24 md:py-32 border-t border-rule/10 overflow-hidden">
      {/* Signature shader — most vivid on the page, this is the featured moment */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <ShaderBackground intensity={0.78} />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/85 via-transparent to-paper/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-paper/75 via-transparent to-paper/75" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Live Project</span>
            <h2 className="display text-4xl md:text-5xl leading-[1.04] font-semibold tracking-tight mt-2">
              EngineerOS:{' '}
              <span className="font-mono italic font-normal text-accent">shipped live</span>.
            </h2>
            <p className="mt-3 text-base text-ink-secondary max-w-[52ch] leading-relaxed">
              AI-native workspace for notes, tasks, projects, and a knowledge graph in one connected system.
              Semantic search. AI assistant with citations. Your data, your Supabase.
            </p>
          </div>
          <a
            href="https://engineeros-delta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover font-medium shrink-0 transition-colors"
          >
            Open live site
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Browser chrome mockup */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.32, 0.72, 0, 1] }}
          className="relative"
        >
          {/* Ambient glow ring */}
          <div
            className="absolute -inset-3 rounded-3xl pointer-events-none"
            aria-hidden
            style={{
              background: 'radial-gradient(ellipse 70% 55% at 50% 38%, rgb(var(--accent)/0.20), transparent 68%)',
              filter: 'blur(28px)',
            }}
          />

          {/* Browser window */}
          <div className="relative rounded-xl border border-accent/20 bg-elevated/90 shadow-[0_40px_100px_-16px_rgb(var(--accent)/0.18)] overflow-hidden backdrop-blur-sm">

            {/* Chrome bar */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-rule/10 bg-sunken/60">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" style={{ boxShadow: '0 0 5px rgba(255,95,87,0.5)' }} />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" style={{ boxShadow: '0 0 5px rgba(255,189,46,0.45)' }} />
                <div className="w-3 h-3 rounded-full bg-[#28CA41]" style={{ boxShadow: '0 0 5px rgba(40,202,65,0.5)' }} />
              </div>

              <div className="flex-1 flex justify-center px-4">
                <div className="flex items-center gap-2 h-7 px-3.5 rounded-full bg-paper border border-rule/10 font-mono text-[11px] text-ink-secondary max-w-sm w-full">
                  <Lock className="w-2.5 h-2.5 text-accent shrink-0" />
                  <span>engineeros-delta.vercel.app</span>
                </div>
              </div>

              <a
                href="https://engineeros-delta.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-1 text-[11px] text-accent hover:text-accent-hover font-medium transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Preview area — poster image until user clicks play */}
            <div className="relative overflow-hidden bg-[#0d0f14]" style={{ height: 440 }}>
              <AnimatePresence mode="wait">
                {!playing ? (
                  /* ── POSTER / PLAY STATE ── */
                  <motion.div
                    key="poster"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    {/* Dark scrim + play button */}
                    <button
                      onClick={() => setPlaying(true)}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/35 hover:bg-black/20 transition-colors group/play cursor-pointer"
                      aria-label="Interact with EngineerOS live"
                    >
                      {/* Play ring */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                      >
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                      </motion.div>
                      <span className="font-mono text-[11px] text-white/60 tracking-wider group-hover/play:text-white/90 transition-colors">
                        CLICK TO INTERACT
                      </span>
                    </button>

                    {/* Bottom badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#28CA41] animate-pulse" />
                      <span className="font-mono text-[10px] text-white/70">Live on Vercel Edge</span>
                    </div>
                  </motion.div>
                ) : (
/* ── LIVE VIDEO STATE ── */
                    <motion.div
                      key="video"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                      className="absolute inset-0"
                    >
                      <iframe
                        src="https://www.youtube.com/embed/Yo6sKL8CtAE?autoplay=1&rel=0&modestbranding=1"
                        className="w-full h-full border-0"
                        title="EngineerOS — live demo walkthrough"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />

                      {/* Reset button */}
                      <button
                        onClick={() => setPlaying(false)}
                        className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white/90 font-mono text-[10px] transition-colors"
                      >
                        ✕ exit
                      </button>
                    </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Tech + live badge row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.18 }}
          className="mt-6 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex flex-wrap gap-2">
            {['NEXT.JS', 'REACT', 'TYPESCRIPT', 'SUPABASE', 'TAILWIND', 'VERCEL'].map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] text-ink-tertiary px-2 py-0.5 rounded-md bg-sunken/50 border border-rule/10"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/KunjShah95/EngineerOS"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-ink-tertiary hover:text-accent transition-colors"
            >
              GitHub →
            </a>
            <a
              href="https://engineeros-delta.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover font-medium transition-colors"
            >
              Visit EngineerOS
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
