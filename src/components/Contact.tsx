import { motion } from 'framer-motion'
import { MessageSquare, Send, ExternalLink } from 'lucide-react'
import { SOCIALS } from '../data/portfolio'
import { cardRevealTransition, VIEWPORT_SECTION } from '../lib/motion'

function SocialCard({ social, index }: { social: typeof SOCIALS[0], index: number }) {
  return (
    <motion.a
      key={social.name + social.url}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_SECTION}
      transition={cardRevealTransition(index)}
      className="group flex items-center justify-between p-4 rounded-xl bg-surface/60 border border-border hover:border-primary/40 transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <social.icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <div className="text-xs text-muted font-mono">{social.label}</div>
          <div className="text-sm font-semibold text-txt">{social.name}</div>
        </div>
      </div>
      <ExternalLink className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
    </motion.a>
  )
}

export function Contact() {
  return (
    <section id="contact" className="section-padding bg-bg relative">
      <div className="absolute inset-0 tech-grid-layer opacity-30" />
      
      <div className="container-aligned relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_SECTION}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <Send className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-muted uppercase tracking-wider">Connect</span>
          </div>
          <h2 className="text-3xl font-bold text-txt mb-2">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted max-w-lg">
            Building something together? Let's talk about your AI systems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOCIALS.map((social, i) => (
              <SocialCard key={social.name} social={social} index={i} />
            ))}
          </div>

          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_SECTION}
              transition={cardRevealTransition(SOCIALS.length, 0.06)}
              className="p-6 rounded-xl bg-gradient-to-br from-primary/10 via-surface/60 to-cyan-500/10 border border-primary/20"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-green-400">Available</span>
              </div>
              
              <h3 className="text-lg font-bold text-txt mb-2">Direct Contact</h3>
              <p className="text-sm text-muted mb-4">
                Open for AI projects, consulting, and collaborations.
              </p>

              <a
                href="https://wa.me/919106878258"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Send Message
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}