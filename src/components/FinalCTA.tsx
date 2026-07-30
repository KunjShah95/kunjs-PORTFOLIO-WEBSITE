import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, FileDown } from 'lucide-react'

const SOCIALS = [
  { label: 'GitHub', value: 'KunjShah95', href: 'https://github.com/KunjShah95' },
  { label: 'LinkedIn', value: 'kunjshah05', href: 'https://linkedin.com/in/kunjshah05' },
  { label: 'Twitter', value: '@kunjshah_dev', href: 'https://twitter.com/kunjshah_dev' },
  { label: 'Email', value: 'kkshah2005@gmail.com', href: 'mailto:kkshah2005@gmail.com' },
  { label: 'Medium', value: '@kkshah2005', href: 'https://medium.com/@kkshah2005' },
  { label: 'Peerlist', value: 'kunjshah', href: 'https://peerlist.io/kunjshah' },
]

export function FinalCTA() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const resumeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (resumeRef.current && !resumeRef.current.contains(e.target as Node)) {
        setResumeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <section id="final-cta" className="relative border-t border-rule/10 py-24 md:py-32">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <h2 className="display text-4xl md:text-6xl leading-[0.98] tracking-tight max-w-3xl font-semibold">
            Building something ambitious?
          </h2>
          <p className="mt-6 text-ink-secondary text-lg leading-relaxed max-w-xl">
            Available for full-time AI engineering roles, freelance projects, and research collaborations.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 h-11 px-5 rounded-full bg-accent text-accent-ink font-semibold text-sm hover:brightness-110 hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgb(var(--accent)/0.30)]"
            >
              Start a conversation
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <div className="relative" ref={resumeRef}>
              <button
                onClick={() => setResumeOpen((o) => !o)}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-rule/20 text-ink-primary font-medium text-sm hover:bg-elevated hover:-translate-y-0.5 transition-all"
              >
                <FileDown className="w-4 h-4 text-ink-tertiary" />
                Resume
              </button>
              {resumeOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50">
                  <div className="w-56 bg-elevated border border-rule/10 p-1.5 rounded-xl shadow-xl flex flex-col gap-0.5">
                    <a
                      href="/kunjaiml.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setResumeOpen(false)}
                      className="w-full px-3 py-2 rounded-lg text-sm hover:bg-accent hover:text-accent-ink transition-colors font-medium flex items-center justify-between text-ink-primary"
                    >
                      <span>AI / ML Roles</span>
                      <span className="text-xs text-ink-quaternary">&rarr;</span>
                    </a>
                    <a
                      href="/kunjshah_cv.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setResumeOpen(false)}
                      className="w-full px-3 py-2 rounded-lg text-sm hover:bg-accent hover:text-accent-ink transition-colors font-medium flex items-center justify-between text-ink-primary"
                    >
                      <span>Full Stack Roles</span>
                      <span className="text-xs text-ink-quaternary">&rarr;</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 w-full max-w-lg">
            {SOCIALS.map(({ label, value, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-mono text-xs text-ink-quaternary hover:text-accent transition-colors"
              >
                <span className="text-ink-quaternary/60 group-hover:text-accent/50 transition-colors">{label}</span>
                <span className="text-ink-quaternary/40">/</span>
                <span className="text-ink-tertiary group-hover:text-ink-primary transition-colors">{value}</span>
              </a>
            ))}
          </div>

          <div className="mt-16 pt-6 border-t border-rule/10 flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-2xl text-xs text-ink-tertiary font-mono">
            <span>&copy; 2026 Kunj Shah &middot; Ahmedabad, IN</span>
            <span>12+ projects / 44+ PRs / 4 hackathon finals</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
