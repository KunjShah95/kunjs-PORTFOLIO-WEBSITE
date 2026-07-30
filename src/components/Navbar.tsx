import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { clsx } from 'clsx';

const NAV = [
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/blogs', label: 'Writing' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 12);
  });

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-40 transition-all duration-300',
          scrolled ? 'py-2' : 'py-4'
        )}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group" aria-label="Home">
              <span className="relative">
                <span className="font-display text-lg font-bold tracking-tight text-ink-primary group-hover:text-accent transition-colors duration-200">
                  KS
                </span>
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-accent rounded-full group-hover:w-full transition-all duration-300" />
              </span>
              <span className={clsx(
                'font-display text-sm tracking-tight text-ink-tertiary transition-all duration-300',
                scrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              )}>
                Kunj Shah
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    clsx(
                      'relative px-2.5 py-1 font-body text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'text-ink-primary'
                        : 'text-ink-tertiary hover:text-ink-primary'
                    )
                  }
                >
                  {({ isActive }) => (
                    <span className="relative">
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button
                onClick={onOpenCommand}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 h-7 rounded-lg border border-rule/10 text-ink-tertiary hover:text-ink-primary hover:border-rule/30 hover:bg-elevated transition-all text-xs font-mono"
                aria-label="Open command menu"
              >
                <Search className="w-3 h-3" />
                <span className="text-[10px] opacity-50">&#8984;K</span>
              </button>

              <a
                href="https://github.com/KunjShah95"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-1.5 text-ink-quaternary hover:text-accent rounded-md hover:bg-elevated transition-all"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/>
                </svg>
              </a>

              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-1.5 text-ink-secondary hover:text-ink-primary"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-ink-primary/10 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-hidden />
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-paper/95 backdrop-blur-xl border-b border-rule/10 px-6 pt-20 pb-8"
              role="dialog"
              aria-label="Mobile navigation"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-5 right-6 p-2 text-ink-secondary hover:text-ink-primary"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
              <nav className="flex flex-col gap-1" aria-label="Mobile primary">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        clsx(
                          'py-3 px-2 font-display text-2xl rounded-lg transition-colors',
                          isActive ? 'text-accent bg-accent/5' : 'text-ink-secondary hover:text-ink-primary'
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-8 flex items-center gap-3">
                <a href="https://github.com/KunjShah95" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 border border-rule/10 rounded-lg hover:bg-elevated/30 hover:text-accent transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/kunjshah05" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 border border-rule/10 rounded-lg hover:bg-elevated/30 hover:text-accent transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="mailto:kkshah2005@gmail.com" aria-label="Email" className="p-2 border border-rule/10 rounded-lg hover:bg-elevated/30 hover:text-accent transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M22 4L12 13 2 4"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
