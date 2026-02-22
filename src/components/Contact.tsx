import { motion } from 'framer-motion'
import { MessageSquare, Mail } from 'lucide-react'
import { SOCIALS } from '../data/portfolio'

export function Contact() {
  return (
    <section id="contact" className="section-padding bg-bg relative">
      <div className="container-aligned">
        <div className="grid lg:grid-cols-12 gap-10 items-start">

          {/* Header */}
          <div className="lg:col-span-12 border-b border-border pb-8 space-y-2">
            <div className="flex items-center gap-2 text-muted text-sm font-medium">
              <Mail className="w-4 h-4" />
              Contact
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-txt">
              Let's Connect
            </h2>
          </div>

          {/* Contact Links */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOCIALS.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group flex items-center justify-between p-4 rounded-xl border border-border bg-surface hover:border-primary/30 hover:bg-surfaceHighlight transition-all duration-200"
              >
                <div className="space-y-0.5">
                  <div className="text-xs text-muted font-medium">{social.label}</div>
                  <div className="text-sm font-semibold text-txt group-hover:text-primary transition-colors">{social.name}</div>
                </div>
                <div className="w-7 h-7 rounded-lg bg-bg border border-border flex items-center justify-center group-hover:border-primary/30 group-hover:text-primary text-muted transition-all">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Direct Channel */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-surface p-6 space-y-5"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-emerald-400">Available now</span>
                </div>
                <h3 className="text-base font-semibold text-txt">Direct Message</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Open for partnerships, collaborations, and AI systems discussions.
                </p>
              </div>

              <a
                href="https://wa.me/919106878258"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
              >
                <MessageSquare className="w-4 h-4" />
                Send a Message
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
