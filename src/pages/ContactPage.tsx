import { ArrowUpRight, FileDown, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { SITE_URL } from '../lib/site'
import { trackEvent, ANALYTICS_EVENTS } from '../lib/analytics'

const METHODS = [
  { label: 'Email', value: 'kunjkshah05@gmail.com', href: 'mailto:kunjkshah05@gmail.com', primary: true },
  { label: 'GitHub', value: '@KunjShah95', href: 'https://github.com/KunjShah95' },
  { label: 'LinkedIn', value: 'in/kunjshah05', href: 'https://linkedin.com/in/kunjshah05' },
  { label: 'YouTube', value: '@kunjshah4158', href: 'https://www.youtube.com/@kunjshah4158' },
  { label: 'X / Twitter', value: '@kunjshah_dev', href: 'https://twitter.com/kunjshah_dev' },
]

const CHECKLIST = [
  'What you are trying to make or fix.',
  'What is already working or failing.',
  'The deadline, budget, or technical constraint.',
]

export function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Kunj Shah | AI Engineering Collaboration"
        description="Contact Kunj Shah for AI architecture, production AI MVPs, LLM systems, computer vision, and engineering collaborations. Based in Ahmedabad and available remotely."
        url={`${SITE_URL}/contact`}
      />

      {/* Hero */}
      <header className="relative isolate overflow-hidden border-b border-rule/10 bg-paper py-20 md:py-28 lg:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(var(--accent)/0.10),transparent_55%)]" />
          <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgb(var(--rule)/0.22)_0.6px,transparent_0.6px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              Contact
            </span>
            <h1 className="mx-auto mt-5 font-display text-[clamp(2.4rem,5.5vw,5rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-ink-primary">
              Bring the problem.<br />
              We&apos;ll find the first useful move.
            </h1>
            <p className="mx-auto mt-6 max-w-[56ch] text-base leading-7 text-ink-secondary sm:text-lg sm:leading-8">
              AI product, hard engineering problem, or an idea that needs a technical partner — send a rough brief. I usually reply within a day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="mailto:kunjkshah05@gmail.com"
              onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_CONTACT_EMAIL, { source: 'contact_page' })}
              className="group inline-flex min-h-12 items-center gap-2 rounded-lg bg-ink-primary px-6 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 hover:bg-accent"
            >
              Email me
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <span className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-rule/15 px-4 text-sm text-ink-secondary">
              <MapPin className="h-4 w-4 shrink-0" />
              Ahmedabad · Remote
            </span>
          </motion.div>

          <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-tertiary">
            <Mail className="h-3.5 w-3.5 text-accent" />
            Usually replies within a day
          </div>
        </div>
      </header>

      {/* Info grid */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 md:py-20">
        <div className="grid gap-8 md:grid-cols-2">

          {/* What to include */}
          <div className="rounded-2xl border border-rule/10 bg-elevated p-6 sm:p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary">
              A good first email includes
            </span>
            <ul className="mt-6 space-y-5">
              {CHECKLIST.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 font-mono text-[10px] text-accent">
                    0{i + 1}
                  </span>
                  <span className="text-sm leading-6 text-ink-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Currently + Resume */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-rule/10 bg-elevated p-6 sm:p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary">
                Currently
              </span>
              <p className="mt-4 text-sm leading-7 text-ink-secondary">
                Rewriting a research agent for the third time and reading{' '}
                <em>Designing Data-Intensive Applications</em> again.
              </p>
            </div>

            <details className="group overflow-hidden rounded-2xl border border-rule/10 bg-elevated">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-3 text-sm font-medium text-ink-primary [&::-webkit-details-marker]:hidden">
                <span className="inline-flex items-center gap-2">
                  <FileDown className="h-4 w-4 text-ink-tertiary" />
                  Download a tailored résumé
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-tertiary group-open:text-accent">
                  View files
                </span>
              </summary>
              <div className="grid gap-px border-t border-rule/10 bg-rule/10 sm:grid-cols-2">
                <a
                  href="/kunjaiml.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent(ANALYTICS_EVENTS.RESUME_DOWNLOAD, { file: 'kunjaiml.pdf', track: 'ai_ml', source: 'contact_page' })}
                  className="flex items-center justify-between bg-elevated px-5 py-4 text-sm hover:bg-sunken"
                >
                  AI / ML roles
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="/kunjshah_cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent(ANALYTICS_EVENTS.RESUME_DOWNLOAD, { file: 'kunjshah_cv.pdf', track: 'full_stack', source: 'contact_page' })}
                  className="flex items-center justify-between bg-elevated px-5 py-4 text-sm hover:bg-sunken"
                >
                  Full-stack roles
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Social links */}
      <section className="border-t border-rule/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="grid gap-px overflow-hidden rounded-none bg-rule/10 sm:grid-cols-3 lg:grid-cols-5">
            {METHODS.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group flex min-h-24 flex-col items-center justify-center gap-3 bg-paper px-4 py-5 text-center transition-colors hover:bg-elevated"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-tertiary group-hover:text-accent transition-colors">
                  {method.label}
                </span>
                <span className={`break-all font-mono text-xs ${method.primary ? 'text-accent' : 'text-ink-secondary'}`}>
                  {method.value}
                </span>
                <ArrowUpRight className="h-3 w-3 text-ink-quaternary opacity-0 transition-all group-hover:opacity-100 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
