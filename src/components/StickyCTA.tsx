import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { trackEvent, ANALYTICS_EVENTS } from '../lib/analytics'

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-4 right-4 z-50 lg:hidden"
        >
          <div className="bg-surface/90 backdrop-blur-xl border border-primary/20 rounded-2xl p-3 shadow-2xl flex items-center gap-3">
            <Link
              to="/contact"
              onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_STICKY_CONTACT)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 active:scale-95 transition-transform relative overflow-hidden"
            >
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2"
              >
                Let's Build
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(ANALYTICS_EVENTS.CLICK_STICKY_RESUME)}
              className="inline-flex items-center justify-center p-3 rounded-xl bg-surfaceHighlight border border-border text-txt active:scale-95 transition-transform"
              aria-label="View Resume"
            >
              <FileText className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
