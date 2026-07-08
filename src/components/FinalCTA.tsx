import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, FileDown } from 'lucide-react'
import { Magnetic } from './effects'

const SOCIALS = [
  { label: 'GitHub', value: 'KunjShah95', href: 'https://github.com/KunjShah95' },
  { label: 'GitHub', value: 'KunjShah01', href: 'https://github.com/KunjShah01' },
  { label: 'LinkedIn', value: 'kunjshah05', href: 'https://linkedin.com/in/kunjshah05' },
  { label: 'Twitter', value: '@kunjshah_dev', href: 'https://twitter.com/kunjshah_dev' },
  { label: 'Peerlist', value: 'kunjshah', href: 'https://peerlist.io/kunjshah' },
  { label: 'Medium', value: '@kkshah2005', href: 'https://medium.com/@kkshah2005' },
]

export function FinalCTA() {
  return (
    <section id="final-cta" className="relative bg-ink-primary text-paper overflow-hidden py-24 md:py-32">
      <div className="relative z-10 max-w-manifest mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <span className="font-mono text-xs uppercase tracking-kicker text-paper/60 font-semibold px-3 py-1 rounded-full border border-paper/10 bg-paper/5">
            Let's connect
          </span>
          <h2 className="display text-5xl md:text-7xl mt-6 leading-[0.98] tracking-tightest max-w-4xl text-paper font-extrabold">
            Building something ambitious?{' '}
            <span className="text-accent">Let&rsquo;s make it real.</span>
          </h2>
          <p className="mt-8 text-paper/70 text-lg md:text-xl leading-relaxed max-w-2xl font-body">
            I design production AI systems — autonomous agents, LLM pipelines, edge computer vision — 
            and ship them with measurable results. Open to full-time AI engineering roles, freelance projects, 
            and research collaborations.
          </p>

          {/* CTA buttons */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.15}>
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 h-14 px-8 rounded-xl bg-accent text-accent-ink font-semibold text-base overflow-hidden hover:scale-[1.02] hover:-translate-y-0.5 active:scale-95 transition-all shadow-[0_10px_28px_rgb(var(--accent)/0.34)]"
              >
                Book a call
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Magnetic>

            <div className="relative group">
              <Magnetic strength={0.15}>
                <button
                  className="group relative inline-flex items-center gap-2 h-14 px-8 rounded-xl border border-paper/15 text-paper font-semibold text-base bg-paper/5 hover:bg-paper/10 hover:border-paper/25 hover:-translate-y-0.5 active:scale-95 transition-all w-full md:w-auto"
                >
                  <FileDown className="w-5 h-5 text-paper/70" />
                  Download résumé
                </button>
              </Magnetic>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="w-60 bg-[#1e1d1b] border border-white/10 p-1.5 rounded-xl shadow-2xl flex flex-col gap-1 text-left">
                  <a
                    href="/kunjaiml.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3 py-2 rounded-lg text-sm hover:bg-accent hover:text-white transition-colors font-medium flex items-center justify-between text-zinc-100"
                  >
                    <span>AI / ML Roles <span className="block text-[10px] text-zinc-400 group-hover:text-white/70 font-mono">kunjaiml.pdf</span></span>
                    <span className="text-xs text-zinc-400">↗</span>
                  </a>
                  <a
                    href="/kunjshah_cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3 py-2 rounded-lg text-sm hover:bg-accent hover:text-white transition-colors font-medium flex items-center justify-between text-zinc-100"
                  >
                    <span>Full Stack Roles <span className="block text-[10px] text-zinc-400 group-hover:text-white/70 font-mono">kunjshah_cv.pdf</span></span>
                    <span className="text-xs text-zinc-400">↗</span>
                  </a>
                </div>
              </div>
            </div>

            <Magnetic strength={0.15}>
              <a
                href="mailto:kkshah2005@gmail.com"
                className="group relative inline-flex items-center gap-2 h-14 px-8 rounded-xl border border-paper/15 text-paper font-semibold text-base bg-paper/5 hover:bg-paper/10 hover:border-paper/25 hover:-translate-y-0.5 active:scale-95 transition-all"
              >
                <Mail className="w-5 h-5 text-paper/70" />
                kkshah2005@gmail.com
              </a>
            </Magnetic>
          </div>

          {/* Social links — plain mono list */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 w-full max-w-lg">
            {SOCIALS.map(({ label, value, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-mono text-xs text-paper/40 hover:text-accent transition-colors"
              >
                <span className="text-paper/20 group-hover:text-accent/50 transition-colors">{label}</span>
                <span className="text-paper/20">·</span>
                <span>{value}</span>
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </motion.div>

        <div className="mt-24 pt-8 border-t border-paper/10 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-paper/50">
          <div>&copy; 2026 Kunj Shah &middot; Built in Ahmedabad</div>
          <div>12+ projects shipped &middot; 44+ PRs merged &middot; 4 hackathon finals</div>
        </div>
      </div>
    </section>
  )
}
