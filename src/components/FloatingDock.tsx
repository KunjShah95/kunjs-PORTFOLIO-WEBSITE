import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'
import {
  LayoutDashboard, FolderOpen, User, BookOpen, Cpu,
  type LucideIcon,
} from 'lucide-react'

interface DockItem {
  icon: LucideIcon
  label: string
  to: string
}

const DOCK_ITEMS: DockItem[] = [
  { icon: LayoutDashboard, label: 'Home', to: '/' },
  { icon: FolderOpen, label: 'Projects', to: '/projects' },
  { icon: User, label: 'About', to: '/about' },
  { icon: BookOpen, label: 'Writing', to: '/blogs' },
  { icon: Cpu, label: 'Labs', to: '/labs' },
]

export function FloatingDock() {
  const navigate = useNavigate()
  const location = useLocation()
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 hidden md:flex justify-center pointer-events-none">
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex items-center gap-0.5 px-2.5 py-1 rounded-full border border-rule/10 bg-paper/80 backdrop-blur-lg shadow-lg"
        aria-label="Quick navigation"
      >
        {DOCK_ITEMS.map(({ icon: Icon, label, to }) => {
          const isActive = location.pathname === to
          return (
            <button
              key={to}
              onClick={() => navigate(to)}
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
              className={clsx(
                'relative flex flex-col items-center justify-center w-7 h-7 rounded-full transition-colors duration-200',
                isActive
                  ? 'bg-accent text-accent-ink'
                  : 'text-ink-tertiary hover:text-ink-primary hover:bg-elevated',
              )}
              aria-label={label}
            >
              <Icon className="w-3 h-3" />
              <AnimatePresence>
                {hovered === label && !isActive && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-md bg-ink-primary text-paper text-[8px] font-mono whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </motion.nav>
    </div>
  )
}
