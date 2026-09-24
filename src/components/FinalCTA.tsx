import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, FileDown, Mail } from 'lucide-react'
import { trackEvent, ANALYTICS_EVENTS } from '../lib/analytics'

const SOCIALS = [
  { label: 'GitHub', value: 'KunjShah95', href: 'https://github.com/KunjShah95' },
  { label: 'LinkedIn', value: 'kunjshah05', href: 'https://linkedin.com/in/kunjshah05' },
  { label: 'Peerlist', value: 'kunjshah', href: 'https://peerlist.io/kunjshah' },
  { label: 'X / Twitter', value: '@kunjshah_dev', href: 'https://twitter.com/kunjshah_dev' },
]

export function FinalCTA() {
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <section id="final-cta" className="relative overflow-hidden border-t border-rule/10 py-20 md:py-32" aria-labelledby="cta-heading">
      <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">

        <h2 id="cta-heading" className="mx-auto max-w-[14ch] font-display text-4xl font-semibold leading-[0.92] tracking-[-0.06em] text-ink-primary sm:text-6xl">
          Let&apos;s make the hard part feel small.
        </h2>
        <p className="mx-auto mt-6 max-w-[58ch] text-base leading-7 text-ink-secondary">
          I&apos;m open to focused AI engineering work, product sprints, architecture reviews, and research collaborations. Bring the rough brief. We can make it specific together.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/contact" className="glow-button">
            Start a conversation <ArrowUpRight className="h-4 w-4" />
          </Link>
          <a
            href="mailto:kunjkshah05@gmail.com"
            onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_CONTACT_EMAIL, { source: 'home_final_cta' })}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-rule/15 px-4 text-sm font-medium text-ink-secondary transition-colors hover:border-accent/50 hover:bg-accent/5 hover:text-ink-primary"
          >
            <Mail className="h-4 w-4" /> Email directly
          </a>
        </div>

        <div className="dark-card mx-auto mt-10 w-full max-w-xl rounded-2xl p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-tertiary">Prefer a PDF?</span>
            <button
              onClick={() => setResumeOpen((open) => !open)}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-rule/10 px-3 text-xs font-medium text-ink-secondary transition-colors hover:border-accent/40 hover:text-accent"
              aria-expanded={resumeOpen}
              aria-controls="resume-options"
            >
              <FileDown className="h-3.5 w-3.5" /> Résumé
            </button>
          </div>
          {resumeOpen && (
            <div id="resume-options" className="mt-3 grid gap-1 border-t border-rule/10 pt-3">
              <a
                href="/kunjaiml.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent(ANALYTICS_EVENTS.RESUME_DOWNLOAD, { file: 'kunjaiml.pdf', track: 'ai_ml', source: 'final_cta' })}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs text-ink-secondary hover:bg-white/5 hover:text-ink-primary"
              >
                AI / ML roles <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="/kunjshah_cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent(ANALYTICS_EVENTS.RESUME_DOWNLOAD, { file: 'kunjshah_cv.pdf', track: 'full_stack', source: 'final_cta' })}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs text-ink-secondary hover:bg-white/5 hover:text-ink-primary"
              >
                Full-stack roles <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
          <div className="mt-4 border-t border-rule/10 pt-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-ink-tertiary">Public profiles</span>
            <div className="mt-2 grid gap-1">
              {SOCIALS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between font-mono text-[10px] text-ink-secondary hover:text-accent"
                >
                  <span>{social.label}</span>
                  <span>{social.value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
