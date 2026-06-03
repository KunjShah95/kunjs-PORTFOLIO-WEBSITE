import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { clsx } from 'clsx';

const NAV = [
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/blogs', label: 'Writing' },
  { to: '/experience', label: 'Experience' },
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
          scrolled
            ? 'bg-paper/85 backdrop-blur-md border-b border-rule/12'
            : 'bg-paper/0 border-b border-transparent'
        )}
      >
        <div className="max-w-manifest mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <span className="font-display text-2xl tracking-tightest transition-colors duration-base">Kunj Shah</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    'relative font-body text-sm transition-colors',
                    isActive ? 'text-ink-primary' : 'text-ink-secondary hover:text-ink-primary'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1.5 left-0 right-0 h-px bg-ink-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCommand}
              className="hidden sm:inline-flex items-center gap-2 px-3 h-8 rounded-md border border-rule/12 text-ink-secondary hover:text-ink-primary hover:border-rule/32 transition-colors text-sm"
              aria-label="Open command menu"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="kicker">&#8984;K</span>
            </button>
            <a href="https://github.com/KunjShah95" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hidden sm:inline-flex p-2 text-ink-secondary hover:text-ink-primary">
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-ink-secondary hover:text-ink-primary"
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
            <div className="absolute inset-0 bg-ink-primary/20" onClick={() => setMobileOpen(false)} aria-hidden />
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-paper border-b border-rule/12 px-6 pt-20 pb-8"
              role="dialog"
              aria-label="Mobile navigation"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-5 right-6 p-2 text-ink-secondary"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
              <nav className="flex flex-col gap-1" aria-label="Mobile primary">
                {NAV.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      clsx(
                        'py-3 font-display text-3xl border-b border-rule/12',
                        isActive ? 'text-ink-primary' : 'text-ink-secondary'
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-8 flex items-center gap-3">
                <a href="https://github.com/KunjShah95" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 border border-rule/12 rounded-md">
                  <Github className="w-4 h-4" />
                </a>
                <a href="https://linkedin.com/in/kunjshah05" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 border border-rule/12 rounded-md">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="mailto:kkshah20050@gmail.com" aria-label="Email" className="p-2 border border-rule/12 rounded-md">
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
