
import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { Search, User, Briefcase, Activity, Hash, Cpu, Command, Trophy, GraduationCap, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface CommandMenuProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [setOpen, open])

  const commands = [
    { icon: User, label: 'Home', description: 'Back to main page', shortcut: 'H', path: '/' },
    { icon: User, label: 'About', description: 'About profile and background', shortcut: 'A', path: '/about' },
    { icon: Briefcase, label: 'Projects', description: 'View all projects', shortcut: 'P', path: '/projects' },
    { icon: Trophy, label: 'Hackathons', description: 'Competition highlights', shortcut: 'K', path: '/hackathons' },
    { icon: Cpu, label: 'Skills', description: 'Technical capabilities', shortcut: 'S', path: '/skills' },
    { icon: Hash, label: 'Writing', description: 'Articles and blog posts', shortcut: 'W', path: '/blogs' },
    { icon: Activity, label: 'Labs', description: 'Research and experiments', shortcut: 'L', path: '/labs' },
    { icon: GraduationCap, label: 'Education', description: 'Academic background', shortcut: 'E', path: '/education' },
    { icon: Mail, label: 'Contact', description: 'Get in touch', shortcut: 'C', path: '/contact' },
  ]

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description.toLowerCase().includes(search.toLowerCase())
  )

  const handleAction = (path: string) => {
    navigate(path)
    setOpen(false)
    setSearch('')
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[20vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-bg/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-md bg-surface rounded-xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="h-4 w-4 text-muted shrink-0" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 h-6 bg-transparent text-sm text-txt outline-none placeholder:text-muted"
                placeholder="Search pages..."
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded border border-border bg-surfaceHighlight text-[10px] text-muted font-mono">
                ESC
              </kbd>
            </div>

            {/* Commands List */}
            <div className="p-2 max-h-72 overflow-y-auto">
              <p className="px-3 py-1.5 text-[10px] font-medium text-muted uppercase tracking-wider">Navigation</p>
              <div className="space-y-0.5">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd) => (
                    <button
                      key={cmd.label}
                      onClick={() => handleAction(cmd.path)}
                      className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm group hover:bg-surfaceHighlight transition-colors"
                    >
                      <div className="w-8 h-8 rounded-md bg-surfaceHighlight group-hover:bg-primary/10 group-hover:text-primary flex items-center justify-center transition-colors shrink-0">
                        <cmd.icon className="h-4 w-4 text-muted group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-txt text-sm">{cmd.label}</div>
                        <div className="text-[11px] text-muted">{cmd.description}</div>
                      </div>
                      <span className="text-[10px] text-muted/60 font-mono">{cmd.shortcut}</span>
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-sm text-muted">No results found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-border bg-surfaceHighlight/50 flex items-center gap-3 text-[10px] text-muted">
              <Command className="w-3 h-3" />
              <span>to open</span>
              <span className="mx-1">·</span>
              <span>Esc to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
