import { useState } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { StickyCTA } from './StickyCTA'
import { CommandMenu } from './CommandMenu'
import { AIAssistant } from './AIAssistant'

interface LayoutProps {
   children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
   const [isCommandOpen, setIsCommandOpen] = useState(false)

   return (
      <div className="min-h-screen bg-paper text-ink-primary font-body">
         <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-ink-primary focus:text-ink-inverse focus:rounded-sm"
         >
            Skip to content
         </a>

         <Navbar onOpenCommand={() => setIsCommandOpen(true)} />

         <main id="main" className="pt-16">
            {children}
         </main>

         <Footer />
         <StickyCTA />

         <CommandMenu open={isCommandOpen} setOpen={setIsCommandOpen} />
         <AIAssistant />
      </div>
   )
}
