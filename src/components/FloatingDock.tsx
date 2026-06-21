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
        transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center gap-1.5 px-3 py-2 rounded-full border border-rule/12 bg-paper/85 backdrop-blur-lg shadow-lg"
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
                'relative flex flex-col items-center justify-center w-10 h-10 rounded-full transition-colors duration-base',
                isActive
                  ? 'bg-ink-primary text-paper'
                  : 'text-ink-tertiary hover:text-ink-primary hover:bg-elevated',
              )}
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
              <AnimatePresence>
                {hovered === label && !isActive && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-ink-primary text-paper text-[10px] font-mono whitespace-nowrap"
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
