import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useId } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, Command } from 'lucide-react'
import { CommandMenu } from './CommandMenu'
import { ThemeToggle } from './ThemeToggle'
import { AIAssistant } from './AIAssistant'
import { Helmet } from 'react-helmet-async'
import { SOCIALS } from '../data/portfolio'
import { pageVariants, navSpring } from '../lib/motion'

interface LayoutProps {
   children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
   const [scrolled, setScrolled] = useState(false)
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
   const [isCommandOpen, setIsCommandOpen] = useState(false)
   const location = useLocation()
   const mobileNavId = useId()

   useEffect(() => {
      let ticking = false
      const onScroll = () => {
         if (ticking) return
         ticking = true
         requestAnimationFrame(() => {
            setScrolled(window.scrollY > 20)
            ticking = false
         })
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
   }, [])

   useEffect(() => {
      if (!isMobileMenuOpen) return
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
         document.body.style.overflow = prevOverflow
      }
   }, [isMobileMenuOpen])

   useEffect(() => {
      if (!isMobileMenuOpen) return
      const onKey = (e: KeyboardEvent) => {
         if (e.key === 'Escape') setIsMobileMenuOpen(false)
      }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
   }, [isMobileMenuOpen])

   useEffect(() => {
      setIsMobileMenuOpen(false)
   }, [location.pathname])

const navLinks = [
       { label: 'About', href: '/about' },
       { label: 'Projects', href: '/projects' },
       { label: 'Hackathons', href: '/hackathons' },
       { label: 'Labs', href: '/labs' },
       { label: 'Skills', href: '/skills' },
       { label: 'Contact', href: '/contact' },
    ]

   const socialLinkLabel = (name: string) => {
      if (name.includes('LINKEDIN')) return 'LinkedIn'
      if (name.includes('TWITTER') || name.startsWith('X_')) return 'X'
      if (name.includes('GITHUB')) return name === 'GITHUB_V2' ? 'GitHub Labs' : 'GitHub'
      if (name.includes('HUGGING')) return 'Hugging Face'
      return name.replace(/_/g, ' ')
   }

   return (
      <div className="min-h-screen bg-bg text-txt selection:bg-primary/25 selection:text-txt transition-colors duration-300 relative">
         <div className="grain-overlay" aria-hidden />
         <div className="tech-grid-layer" aria-hidden />
         <Helmet>
            <title>Kunj Shah | AI Engineer & Agent Builder</title>
            <meta name="description" content="Portfolio of Kunj Shah — AI systems, agents, and data / ML engineering." />
         </Helmet>

         <CommandMenu open={isCommandOpen} setOpen={setIsCommandOpen} />

         <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-white focus:font-medium"
         >
            Skip to content
         </a>

         <header
            className={`fixed top-0 left-0 right-0 z-[60] transition-[padding,background-color,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
               scrolled
                  ? 'py-2.5 bg-surface/88 backdrop-blur-md border-b border-border shadow-sm shadow-black/[0.03] dark:shadow-black/25'
                  : 'py-3 bg-bg/55 backdrop-blur-[8px] border-b border-transparent'
            }`}
         >
            <div className="container-aligned flex items-center justify-between gap-4">
               <Link to="/" className="flex items-center gap-2.5 group min-w-0">
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-primary flex items-center justify-center font-display font-semibold text-white text-base shadow-md shadow-primary/25 transition-transform duration-300 ease-out group-hover:shadow-lg group-hover:shadow-primary/30 group-hover:scale-[1.02] group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-bg">
                     K
                  </div>
                  <div className="flex flex-col leading-tight min-w-0">
                     <span className="text-sm font-semibold text-txt group-hover:text-primary transition-colors font-display tracking-tight truncate">
                        Kunj Shah
                     </span>
                     <span className="text-[10px] text-muted hidden sm:block tracking-wide uppercase truncate txt-mono">
                        AI · Data · ML Engineering
                     </span>
                  </div>
               </Link>

               <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
                  {navLinks.map((link) => (
                     <NavLink
                        key={link.label}
                        to={link.href}
                        className={({ isActive }) =>
                           `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 relative overflow-hidden ${
                              isActive ? 'text-primary' : 'text-muted hover:text-txt'
                           }`
                        }
                     >
                        {({ isActive }) => (
                           <>
                              <span className="relative z-10">{link.label}</span>
                              {isActive && (
                                 <motion.span
                                    layoutId="nav-underline"
                                    className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-primary"
                                    transition={navSpring}
                                 />
                              )}
                           </>
                        )}
                     </NavLink>
                  ))}
               </nav>

               <div className="flex items-center gap-2 shrink-0">
                  <button
                     type="button"
                     onClick={() => setIsCommandOpen(true)}
                     className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-surface text-xs text-muted hover:text-txt hover:border-border/80 transition-colors duration-200"
                     aria-label="Open command palette"
                  >
                     <Command className="h-3 w-3 shrink-0" aria-hidden />
                     <span className="font-medium txt-mono">⌘K</span>
                  </button>
                  <ThemeToggle />
                  <button
                     type="button"
                     className="lg:hidden touch-target inline-flex items-center justify-center p-2 rounded-md border border-border text-txt hover:bg-surfaceHighlight transition-colors"
                     onClick={() => setIsMobileMenuOpen((o) => !o)}
                     aria-expanded={isMobileMenuOpen}
                     aria-controls={mobileNavId}
                     aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                  >
                     {isMobileMenuOpen ? <X className="w-5 h-5" aria-hidden /> : <Menu className="w-5 h-5" aria-hidden />}
                  </button>
               </div>
            </div>
         </header>

         <AnimatePresence mode="wait">
            {isMobileMenuOpen && (
               <motion.div
                  id={mobileNavId}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site navigation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[59] bg-bg/97 backdrop-blur-xl flex flex-col pt-20 px-5 pb-8 lg:hidden"
               >
                  <button
                     type="button"
                     onClick={() => setIsMobileMenuOpen(false)}
                     className="absolute top-4 right-4 touch-target inline-flex items-center justify-center p-2 rounded-md border border-border text-txt hover:bg-surfaceHighlight transition-colors"
                     aria-label="Close menu"
                  >
                     <X className="w-5 h-5" aria-hidden />
                  </button>

                  <nav className="flex flex-col gap-1.5 flex-1" aria-label="Mobile primary">
                     {navLinks.map((link, i) => (
                        <motion.div
                           initial={{ opacity: 0, x: -12 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: i * 0.04, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                           key={link.label}
                        >
                           <NavLink
                              to={link.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={({ isActive }) =>
                                 `text-xl font-semibold py-4 px-5 rounded-2xl flex items-center justify-between transition-all ${
                                    isActive ? 'text-primary bg-primary/10' : 'text-txt hover:bg-surfaceHighlight'
                                 }`
                              }
                           >
                              <span>{link.label}</span>
                              {link.label === 'Projects' && (
                                 <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-tighter font-bold">New</span>
                              )}
                           </NavLink>
                        </motion.div>
                     ))}
                     
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="mt-8 pt-8 border-t border-border/50 space-y-6"
                     >
                        <div className="flex flex-col gap-4">
                           <p className="text-[10px] txt-mono text-muted uppercase tracking-widest pl-5">Get in touch</p>
                           <div className="flex gap-5 pl-5">
                              {SOCIALS.map((social) => (
                                 <a 
                                    key={social.url} 
                                    href={social.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-muted hover:text-primary transition-all hover:scale-110 p-1"
                                 >
                                    <span className="sr-only">{social.name}</span>
                                    <social.icon className="w-5 h-5" />
                                 </a>
                              ))}
                           </div>
                        </div>
                        
                        <a
                           href="/resume.pdf"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="mx-5 py-4 rounded-2xl bg-surface border border-border flex items-center justify-center gap-3 text-base font-bold text-txt hover:bg-surfaceHighlight transition-colors"
                        >
                           <Command className="w-4 h-4" />
                           View Resume
                        </a>
                     </motion.div>
                  </nav>
                  <p className="text-center text-[10px] txt-mono text-muted uppercase tracking-[0.25em] pt-6 opacity-60">
                     Freelancing · AI · Data · ML engineering
                  </p>
               </motion.div>
            )}
         </AnimatePresence>

         <main id="main-content" className="relative z-10 min-h-screen pt-20">
            <AnimatePresence mode="wait">
               <motion.div
                  key={location.pathname}
                  variants={pageVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
               >
                  {children}
               </motion.div>
            </AnimatePresence>
         </main>

         <AIAssistant />

         <footer className="relative z-10 border-t border-border bg-surface/50">
            <div className="container-aligned py-12">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                  <div className="md:col-span-2 space-y-4">
                     <Link to="/" className="flex items-center gap-2.5 group w-fit rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-display font-semibold text-white text-sm">
                           K
                        </div>
                        <span className="text-sm font-semibold text-txt group-hover:text-primary transition-colors font-display">
                           Kunj Shah
                        </span>
                     </Link>
                     <p className="text-[11px] txt-mono text-txtDim uppercase tracking-wider">
                     </p>
                     <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
                        {SOCIALS.map((social) => (
                           <a
                              key={social.name + social.url}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-muted hover:text-primary transition-colors font-medium"
                           >
                              {socialLinkLabel(social.name)}
                           </a>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h4 className="text-sm font-semibold text-txt font-display">Navigation</h4>
                     <div className="flex flex-col gap-2.5">
                        <Link to="/about" className="text-sm text-muted hover:text-txt transition-colors">
                           About
                        </Link>
                        <Link to="/projects" className="text-sm text-muted hover:text-txt transition-colors">
                           Projects
                        </Link>
                        <Link to="/hackathons" className="text-sm text-muted hover:text-txt transition-colors">
                           Hackathons
                        </Link>
                        <Link to="/skills" className="text-sm text-muted hover:text-txt transition-colors">
                           Skills
                        </Link>
                        <Link to="/labs" className="text-sm text-muted hover:text-txt transition-colors">
                           Research Labs
                        </Link>
                        <Link to="/blogs" className="text-sm text-muted hover:text-txt transition-colors">
                           Writing
                        </Link>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h4 className="text-sm font-semibold text-txt font-display">Status</h4>
                     <div className="space-y-3">
                        <div className="flex items-center gap-2">
                           <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                           </span>
                           <span className="text-sm text-muted">Freelancing · AI / Data / ML engineer roles</span>
                        </div>
                        <p className="text-sm text-muted txt-mono">
                           © {new Date().getFullYear()} Kunj Shah
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   )
}
