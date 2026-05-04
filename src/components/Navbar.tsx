import { Command, FileText, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface NavbarProps {
  onOpenCommand: () => void
}

export function Navbar({ onOpenCommand }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Projects', href: '/projects' },
    { label: 'Labs', href: '/labs' },
    { label: 'Skills', href: '/skills' },
    { label: 'Hackathons', href: '/hackathons' },
    { label: 'Writings', href: '/blogs' },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-primary/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 flex items-center justify-between py-4">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-sm font-bold tracking-widest txt-mono text-txt hover:text-primary transition-colors uppercase"
        >
          KUNJ_SHAH
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden sm:flex items-center gap-6">
          <ul className="items-center gap-6 text-xs font-bold txt-mono uppercase text-muted/70 hover:text-muted transition-colors flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.href} className="hover:text-primary transition-colors py-2">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <FileText className="w-3 h-3" />
                Resume
              </a>
            </li>
          </ul>

          {/* Command Palette */}
          <button 
            onClick={onOpenCommand}
            className="group flex items-center gap-2 px-3 py-1.5 border border-primary/30 bg-primary/5 hover:border-primary/60 hover:bg-primary/10 text-xs text-muted hover:text-primary font-bold txt-mono uppercase transition-all rounded-sm"
          >
            <Command className="w-3 h-3" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded bg-primary/10 px-1.5 font-sans text-[9px] text-muted sm:inline-block border border-primary/30 group-hover:border-primary/60 group-hover:text-primary transition-colors">⌘K</kbd>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 text-muted hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-bg/95 backdrop-blur-md border-b border-primary/20 overflow-hidden"
          >
            <ul className="px-4 py-4 space-y-3 text-sm font-bold txt-mono uppercase">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="block py-3 px-4 -mx-4 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-3 px-4 -mx-4 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Resume
                </a>
              </li>
            </ul>
            <div className="px-4 pb-4">
              <button 
                onClick={() => {
                  onOpenCommand()
                  setMobileMenuOpen(false)
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-primary/30 bg-primary/5 hover:border-primary/60 text-xs text-muted hover:text-primary font-bold txt-mono uppercase transition-all rounded-lg"
              >
                <Command className="w-4 h-4" />
                Search
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
