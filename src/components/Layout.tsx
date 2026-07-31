import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { CommandMenu } from './CommandMenu'
import { AIAssistant } from './AIAssistant'
import { FloatingDock } from './FloatingDock'
import { CursorGlow } from './effects/CursorGlow'

interface LayoutProps {
   children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
   const { pathname } = useLocation()
   const isHome = pathname === '/'
   const [isCommandOpen, setIsCommandOpen] = useState(false)

   return (
      <div className="min-h-screen bg-paper text-ink-primary font-body overflow-x-clip">
         <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-ink-primary focus:text-ink-inverse focus:rounded-sm"
         >
            Skip to content
         </a>

         <Navbar onOpenCommand={() => setIsCommandOpen(true)} />
         <CursorGlow />

         <AnimatePresence mode="wait">
            <motion.main
               key={pathname}
               id="main"
               className="pt-14"
               initial={{ opacity: 0, y: 6 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -6 }}
               transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
               {children}
            </motion.main>
         </AnimatePresence>

         {!isHome && <Footer />}

         <CommandMenu open={isCommandOpen} setOpen={setIsCommandOpen} />
         <AIAssistant />
         <FloatingDock />
      </div>
   )
}
