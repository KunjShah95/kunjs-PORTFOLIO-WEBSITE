import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, Command } from 'lucide-react'
import { CommandMenu } from './CommandMenu'
import { ThemeToggle } from './ThemeToggle'
import { AIAssistant } from './AIAssistant'
import { Helmet } from 'react-helmet-async'

interface LayoutProps {
   children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
   const [scrolled, setScrolled] = useState(false)
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
   const [isCommandOpen, setIsCommandOpen] = useState(false)
   const location = useLocation()

   useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 20)
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

   const navLinks = [
      { label: 'About', href: '/about' },
      { label: 'Work', href: '/projects' },
      { label: 'Hackathons', href: '/hackathons' },
      { label: 'Labs', href: '/labs' },
      { label: 'Skills', href: '/skills' },
      { label: 'Contact', href: '/contact' },
   ]

   return (
      <div className="min-h-screen bg-bg text-txt selection:bg-primary/20 selection:text-primary transition-colors duration-300">
         <Helmet>
            <title>Kunj Shah | AI Engineer & Agent Builder</title>
            <meta name="description" content="Portfolio of Kunj Shah - AI Systems Engineer & Autonomous Agent Builder." />
         </Helmet>

         <CommandMenu open={isCommandOpen} setOpen={setIsCommandOpen} />

         {/* Navbar */}
         <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
               scrolled
                  ? 'py-3 bg-surface/80 backdrop-blur-md border-b border-border'
                  : 'py-4 bg-transparent'
            }`}
         >
            <div className="container-aligned flex items-center justify-between">
               {/* Logo */}
               <Link to="/" className="flex items-center gap-2.5 group">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white text-sm shadow-sm shadow-primary/30 transition-all group-hover:shadow-md group-hover:shadow-primary/40 group-hover:scale-105">
                     K
                  </div>
                  <div className="flex flex-col leading-tight">
                     <span className="text-sm font-semibold text-txt group-hover:text-primary transition-colors">Kunj Shah</span>
                     <span className="text-[10px] text-muted hidden sm:block">AI Engineer</span>
                  </div>
               </Link>

               {/* Desktop Nav */}
               <nav className="hidden lg:flex items-center gap-1">
                  {navLinks.map((link) => (
                     <NavLink
                        key={link.label}
                        to={link.href}
                        className={({ isActive }) =>
                           `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                              isActive
                                 ? 'text-primary bg-primary/8'
                                 : 'text-muted hover:text-txt hover:bg-surfaceHighlight'
                           }`
                        }
                     >
                        {link.label}
                        {location.pathname === link.href && (
                           <motion.div
                              layoutId="nav-indicator"
                              className="absolute inset-0 rounded-md bg-primary/8"
                              transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                           />
                        )}
                     </NavLink>
                  ))}
               </nav>

               {/* Right actions */}
               <div className="flex items-center gap-2">
                  <button
                     onClick={() => setIsCommandOpen(true)}
                     className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-surface text-xs text-muted hover:text-txt hover:border-border/80 transition-all"
                  >
                     <Command className="h-3 w-3" />
                     <span className="font-medium">⌘K</span>
                  </button>
                  <ThemeToggle />
                  <button
                     className="lg:hidden p-2 rounded-md border border-border text-txt hover:bg-surfaceHighlight transition-colors"
                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                     aria-label="Toggle menu"
                  >
                     {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
               </div>
            </div>
         </header>

         {/* Mobile Menu */}
         <AnimatePresence>
            {isMobileMenuOpen && (
               <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[60] bg-bg/97 backdrop-blur-xl flex flex-col pt-24 px-6 lg:hidden"
               >
                  <button
                     onClick={() => setIsMobileMenuOpen(false)}
                     className="absolute top-5 right-5 p-2 rounded-md border border-border text-txt hover:bg-surfaceHighlight transition-colors"
                  >
                     <X className="w-5 h-5" />
                  </button>

                  <nav className="flex flex-col gap-2">
                     {navLinks.map((link, i) => (
                        <motion.div
                           initial={{ opacity: 0, y: -8 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: i * 0.06 }}
                           key={link.label}
                        >
                           <NavLink
                              to={link.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={({ isActive }) =>
                                 `text-2xl font-semibold py-3 px-4 rounded-xl block transition-all ${
                                    isActive
                                       ? 'text-primary bg-primary/8'
                                       : 'text-txt hover:bg-surfaceHighlight'
                                 }`
                              }
                           >
                              {link.label}
                           </NavLink>
                        </motion.div>
                     ))}
                  </nav>
               </motion.div>
            )}
         </AnimatePresence>

         <main className="min-h-screen pt-16">
            <AnimatePresence mode="wait">
               <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
               >
                  {children}
               </motion.div>
            </AnimatePresence>
         </main>

         <AIAssistant />

         {/* Footer */}
         <footer className="border-t border-border bg-surface/50">
            <div className="container-aligned py-12">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                  {/* Brand */}
                  <div className="md:col-span-2 space-y-4">
                     <Link to="/" className="flex items-center gap-2.5 group w-fit">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white text-sm">
                           K
                        </div>
                        <span className="text-sm font-semibold text-txt group-hover:text-primary transition-colors">Kunj Shah</span>
                     </Link>
                     <p className="text-sm text-muted leading-relaxed max-w-xs">
                        Building full-stack AI systems and automation workflows. Based in Ahmedabad, India.
                     </p>
                     <div className="flex gap-4 pt-2">
                        <a href="https://github.com" target="_blank" rel="noreferrer"
                           className="text-sm text-muted hover:text-txt transition-colors font-medium">
                           GitHub
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer"
                           className="text-sm text-muted hover:text-txt transition-colors font-medium">
                           Twitter
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                           className="text-sm text-muted hover:text-txt transition-colors font-medium">
                           LinkedIn
                        </a>
                     </div>
                  </div>

                  {/* Navigation */}
                  <div className="space-y-4">
                     <h4 className="text-sm font-semibold text-txt">Navigation</h4>
                     <div className="flex flex-col gap-2.5">
                        <Link to="/about" className="text-sm text-muted hover:text-txt transition-colors">About</Link>
                        <Link to="/projects" className="text-sm text-muted hover:text-txt transition-colors">Projects</Link>
                        <Link to="/hackathons" className="text-sm text-muted hover:text-txt transition-colors">Hackathons</Link>
                        <Link to="/skills" className="text-sm text-muted hover:text-txt transition-colors">Skills</Link>
                        <Link to="/labs" className="text-sm text-muted hover:text-txt transition-colors">Research Labs</Link>
                        <Link to="/blogs" className="text-sm text-muted hover:text-txt transition-colors">Writing</Link>
                     </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-4">
                     <h4 className="text-sm font-semibold text-txt">Status</h4>
                     <div className="space-y-3">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                           <span className="text-sm text-muted">Available for work</span>
                        </div>
                        <div className="text-sm text-muted space-y-1">
                           <p>© 2025 Kunj Shah</p>
                           <p>Built with React & Vite</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   )
}
