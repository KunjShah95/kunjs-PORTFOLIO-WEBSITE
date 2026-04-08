import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import { PORTFOLIO_FAQ } from '../data/seo-faq'
import { cardRevealTransition, VIEWPORT_SECTION } from '../lib/motion'

export function PortfolioFAQ() {
  return (
    <section id="faq" className="section-padding bg-bg relative border-t border-border/60">
      <div className="container-aligned">
        <div className="border-b border-border pb-8 space-y-2 mb-12">
          <div className="flex items-center gap-2 text-muted text-sm font-medium">
            <HelpCircle className="w-4 h-4" aria-hidden />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-txt font-display">
            Common questions
          </h2>
          <p className="text-muted max-w-2xl leading-relaxed">
            Straight answers for visitors, recruiters, and collaborators. Last updated April 2026.
          </p>
        </div>

        <dl className="grid gap-6 sm:gap-8 max-w-3xl">
          {PORTFOLIO_FAQ.map((item, i) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_SECTION}
              transition={cardRevealTransition(i)}
              className="rounded-xl border border-border bg-surface p-5 sm:p-6 shadow-sm shadow-black/[0.03]"
            >
              <dt className="font-display text-lg font-semibold text-txt leading-snug">{item.question}</dt>
              <dd className="mt-3 text-muted leading-relaxed">{item.answer}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
