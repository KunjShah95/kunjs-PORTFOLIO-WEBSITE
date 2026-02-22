import { Command, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

interface NavbarProps {
  onOpenCommand: () => void
}

export function Navbar({ onOpenCommand }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-40 bg-bg/80 backdrop-blur-md border-b border-primary/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 flex items-center justify-between py-4">
        {/* Logo */}
        <a 
          href="/" 
          className="text-sm font-bold tracking-widest txt-mono text-txt hover:text-primary transition-colors uppercase"
        >
          KUNJ_SHAH
        </a>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 text-xs font-bold txt-mono uppercase sm:flex text-muted/70 hover:text-muted transition-colors">
            <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
            <li><a href="#projects" className="hover:text-primary transition-colors">Projects</a></li>
            <li><a href="#labs" className="hover:text-primary transition-colors">Labs</a></li>
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
      </div>
    </motion.nav>
  )
}
