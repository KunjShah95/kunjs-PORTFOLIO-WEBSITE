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
      const handleScroll = () => setScrolled(window.scrollY > 30)
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

   const navLinks = [
      { label: 'Work', href: '/projects' },
      { label: 'Labs', href: '/labs' },
      { label: 'Skills', href: '/skills' },
      { label: 'Contact', href: '/contact' },
   ]

   return (
      <div className="min-h-screen bg-bg text-txt selection:bg-primary/20 selection:text-primary transition-colors duration-500">
         <Helmet>
            <title>Kunj Shah | AI Engineer & Agent Builder</title>
            <meta name="description" content="Portfolio of Kunj Shah - AI Systems Engineer & Autonomous Agent Builder." />
         </Helmet>

         <CommandMenu open={isCommandOpen} setOpen={setIsCommandOpen} />

         {/* Editorial Navbar */}
         <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-surface/80 backdrop-blur-md border-b border-border/50' : 'py-6 md:py-8 bg-transparent'
               }`}
         >
            <div className="container-aligned flex items-center justify-between">
               <Link to="/" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-sm bg-primary text-white flex items-center justify-center font-black text-lg shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                     K
                  </div>
                  <div className="flex flex-col">
                     <span className="text-sm font-bold tracking-wide text-txt group-hover:text-primary transition-colors">KUNJ SHAH</span>
                     <span className="text-[10px] txt-mono text-muted uppercase tracking-widest hidden sm:block">AI Systems Engineer</span>
                  </div>
               </Link>

               <nav className="hidden lg:flex items-center gap-8">
                  {navLinks.map((link) => (
                     <NavLink
                        key={link.label}
                        to={link.href}
                        className={({ isActive }: { isActive: boolean }) => `text-xs font-bold uppercase tracking-widest transition-all relative py-2 ${isActive ? 'text-primary' : 'text-muted hover:text-txt'}`}
                     >
                        {link.label}
                        {location.pathname === link.href && (
                           <motion.div
                              layoutId="nav-indicator"
                              className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full"
                              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                           />
                        )}
                     </NavLink>
                  ))}
               </nav>

               <div className="flex items-center gap-3">
                  <button
                     onClick={() => setIsCommandOpen(true)}
                     className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-border/50 hover:border-primary/50 transition-all text-[10px] txt-mono text-muted hover:text-txt uppercase tracking-widest bg-surface/50 rounded-sm"
                  >
                     <Command className="h-3 w-3" />
                     <span>CMD+K</span>
                  </button>
                  <ThemeToggle />
                  <button
                     className="lg:hidden p-2 border border-border/50 text-txt rounded-sm hover:bg-surfaceHighlight transition-colors"
                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                     aria-label="Toggle menu"
                  >
                     {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
               </div>
            </div>
         </header>

         {/* Mobile Menu Overlay */}
         <AnimatePresence>
            {isMobileMenuOpen && (
               <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-xl flex flex-col pt-32 px-6 lg:hidden"
               >
                  <button
                     onClick={() => setIsMobileMenuOpen(false)}
                     className="absolute top-6 right-6 p-2 border border-border text-txt rounded-sm hover:border-primary transition-colors"
                  >
                     <X className="w-6 h-6" />
                  </button>

                  <nav className="flex flex-col gap-6">
                     {navLinks.map((link, i) => (
                        <motion.div
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: i * 0.1 }}
                           key={link.label}
                        >
                           <NavLink
                              to={link.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={({ isActive }) => `text-3xl font-black uppercase tracking-tight py-2 block border-l-2 pl-4 transition-all ${isActive ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-txt hover:pl-6'}`}
                           >
                              {link.label}
                           </NavLink>
                        </motion.div>
                     ))}
                  </nav>
               </motion.div>
            )}
         </AnimatePresence>

         <main className="min-h-screen pt-20">
            <AnimatePresence mode="wait">
               <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
               >
                  {children}
               </motion.div>
            </AnimatePresence>
         </main>

         <AIAssistant />

         {/* Industrial Footer */}
         <footer className="border-t border-primary/20 bg-surface/20 section-padding relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
               <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                  <defs>
                     <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" />
                     </pattern>
                  </defs>
                  <rect width="1000" height="1000" fill="url(#grid)" />
               </svg>
            </div>

            <div className="container-aligned relative z-10">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-16">
                  {/* Brand Section */}
                  <div className="col-span-1 md:col-span-2 space-y-6">
                     <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 bg-primary/80 group-hover:bg-primary transition-colors text-white flex items-center justify-center font-black text-xs border border-primary/40 rounded-sm">
                           K
                        </div>
                        <div className="flex flex-col">
                           <span className="text-xs font-black tracking-widest text-txt group-hover:text-primary transition-colors uppercase">KUNJ SHAH</span>
                           <span className="text-[10px] txt-mono text-muted/60 uppercase tracking-wider">AI Systems Engineer</span>
                        </div>
                     </Link>
                     <p className="text-sm text-muted/60 leading-relaxed max-w-sm font-light">
                        Architecting autonomous systems at the intersection of neural networks and industrial computation.
                        Crafting the next generation of intelligent agents.
                     </p>
                     <div className="flex gap-6 pt-4 border-t border-primary/10">
                        <a
                           href="https://github.com"
                           target="_blank"
                           rel="noreferrer"
                           className="txt-mono text-xs text-muted/60 hover:text-primary transition-colors font-bold uppercase tracking-wider hover:translate-x-1 duration-300"
                        >
                           Github →
                        </a>
                        <a
                           href="https://twitter.com"
                           target="_blank"
                           rel="noreferrer"
                           className="txt-mono text-xs text-muted/60 hover:text-primary transition-colors font-bold uppercase tracking-wider hover:translate-x-1 duration-300"
                        >
                           Twitter →
                        </a>
                        <a
                           href="https://linkedin.com"
                           target="_blank"
                           rel="noreferrer"
                           className="txt-mono text-xs text-muted/60 hover:text-primary transition-colors font-bold uppercase tracking-wider hover:translate-x-1 duration-300"
                        >
                           LinkedIn →
                        </a>
                     </div>
                  </div>

                  {/* Navigation Map */}
                  <div className="space-y-6">
                     <h4 className="text-xs font-black text-txt tracking-widest uppercase border-b border-primary/20 pb-3">NAVIGATION</h4>
                     <div className="flex flex-col gap-2 txt-mono">
                        <Link to="/projects" className="text-xs text-muted/60 hover:text-primary transition-all hover:pl-2 duration-300 uppercase tracking-wider font-bold">→ Projects</Link>
                        <Link to="/skills" className="text-xs text-muted/60 hover:text-primary transition-all hover:pl-2 duration-300 uppercase tracking-wider font-bold">→ Capabilities</Link>
                        <Link to="/labs" className="text-xs text-muted/60 hover:text-primary transition-all hover:pl-2 duration-300 uppercase tracking-wider font-bold">→ Research Labs</Link>
                        <Link to="/blogs" className="text-xs text-muted/60 hover:text-primary transition-all hover:pl-2 duration-300 uppercase tracking-wider font-bold">→ Archive</Link>
                     </div>
                  </div>

                  {/* System Status */}
                  <div className="space-y-6">
                     <h4 className="text-xs font-black text-txt tracking-widest uppercase border-b border-primary/20 pb-3">SYSTEM_STATUS</h4>
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 px-4 py-3 border border-primary/30 bg-primary/5 rounded-sm">
                           <div className="w-2 h-2 bg-primary/80 animate-pulse rounded-full shadow-lg shadow-primary/40"></div>
                           <span className="txt-mono text-[11px] tracking-widest font-bold text-primary uppercase">ONLINE</span>
                        </div>
                        <div className="txt-mono text-xs text-muted/50 space-y-1">
                           <p>© 2024 - 2025 Kunj Shah</p>
                           <p>Built on Vite + React</p>
                           <p>Deployed on Vercel Edge</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Divider */}
               <div className="border-t border-primary/10 mt-12 pt-8">
                  <div className="flex items-center justify-between txt-mono text-[10px] text-muted/40 uppercase tracking-wider">
                     <span>SYSTEM_v2.1 | INDUSTRIAL_VOID</span>
                     <span>KUNJ_SHAH.DEV</span>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   )
}
