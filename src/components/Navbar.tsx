import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { clsx } from 'clsx';

const NAV = [
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/blogs', label: 'Writing' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-40 transition-all duration-base ease-out-soft',
          scrolled ? 'py-2' : 'py-3'
        )}
      >
        <div
          className={clsx(
            'max-w-4xl mx-auto mx-6 sm:mx-auto px-5 flex items-center justify-between rounded-2xl transition-all duration-500 ease-out-soft noise-texture',
            scrolled
              ? 'h-12 bg-paper/80 backdrop-blur-xl border border-rule/15 shadow-[0_4px_24px_rgb(0_0_0/0.08),0_1px_2px_rgb(0_0_0/0.04)]'
              : 'h-14 bg-paper/0 border border-transparent'
          )}
        >
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <span className="font-display text-lg tracking-tightest transition-colors duration-base font-bold">
              KS
            </span>
            <span className={clsx(
              'font-display text-sm tracking-tight transition-all duration-300 overflow-hidden',
              scrolled ? 'w-0 opacity-0' : 'w-auto opacity-100'
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
                    'relative px-3 py-1.5 rounded-lg font-body text-[13px] font-medium transition-all duration-200',
                    isActive
                      ? 'text-accent bg-accent/10'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-elevated/50'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-accent/10 -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-0.5">
            <ThemeToggle />
            <button
              onClick={onOpenCommand}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 h-7 rounded-lg border border-rule/12 text-ink-tertiary hover:text-ink-primary hover:border-rule/25 hover:bg-elevated/40 transition-all text-[11px] font-mono"
              aria-label="Open command menu"
            >
              <Search className="w-3 h-3" />
              <span className="kicker text-[10px]">&#8984;K</span>
            </button>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1 px-2.5 h-7 rounded-lg border border-rule/12 text-ink-tertiary hover:text-ink-primary hover:border-rule/25 hover:bg-elevated/40 transition-all text-[11px] font-mono font-semibold">
              Resume
            </a>
            <a href="https://github.com/KunjShah95" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hidden sm:inline-flex p-1.5 text-ink-tertiary hover:text-ink-primary rounded-lg hover:bg-elevated/40 transition-all">
              <Github className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-1.5 text-ink-secondary hover:text-ink-primary"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
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
            <div className="absolute inset-0 bg-ink-primary/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-hidden />
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-paper/95 backdrop-blur-xl border-b border-rule/12 px-6 pt-20 pb-8 noise-texture"
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
                <a href="https://github.com/KunjShah95" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 border border-rule/12 rounded-lg hover:bg-elevated/40 transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com/in/kunjshah05" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 border border-rule/12 rounded-lg hover:bg-elevated/40 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="mailto:kkshah2005@gmail.com" aria-label="Email" className="p-2 border border-rule/12 rounded-lg hover:bg-elevated/40 transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
