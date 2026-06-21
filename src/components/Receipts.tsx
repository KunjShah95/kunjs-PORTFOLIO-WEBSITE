import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Trophy, Rocket, MessageSquareWarning } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { BentoGrid, BentoCard } from './bento'

const STATS = [
  { icon: Rocket, value: '12', label: 'Things shipped in 2026', href: '/projects' },
  { icon: Trophy, value: '4', label: 'Hackathon finals', href: '/hackathons' },
  { icon: Github, value: 'Live', label: 'GitHub — repos in public', href: 'https://github.com/KunjShah95', external: true },
  { icon: MessageSquareWarning, value: '1', label: 'Chatbot I still apologize for', href: '/about' },
]

export function Receipts() {
  const { ref, isVisible } = useReveal({ threshold: 0.15 })

  return (
    <section ref={ref} className="border-y border-rule/12 bg-elevated/30">
      <div className="max-w-manifest mx-auto px-6 py-10">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <div>
            <div className="kicker">Receipts</div>
            <p className="mt-1 text-sm text-ink-tertiary max-w-md">
              Numbers I can back up. Click into any of them.
            </p>
          </div>
        </div>
        {isVisible && (
          <BentoGrid cols={4} gap="sm">
            {STATS.map((s, i) => {
              const Icon = s.icon
              const inner = (
                <BentoCard variant="outlined" hover="translate" className="p-6 flex flex-col gap-3 h-full">
                  <div className="flex items-center justify-between">
                    <Icon className="w-4 h-4 text-ink-tertiary group-hover:text-ink-primary transition-colors" />
                    <ArrowUpRight className="w-3.5 h-3.5 text-ink-quaternary group-hover:text-ink-primary transition-colors" />
                  </div>
                  <div>
                    <div className="display text-3xl md:text-4xl tracking-tightest text-ink-primary leading-none">
                      {s.value}
                    </div>
                    <div className="mt-2 text-xs text-ink-tertiary leading-snug">
                      {s.label}
                    </div>
                  </div>
                </BentoCard>
              )
              return s.external ? (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="block">
                  {inner}
                </a>
              ) : (
                <Link key={s.label} to={s.href} className="block">
                  {inner}
                </Link>
              )
            })}
          </BentoGrid>
        )}
      </div>
    </section>
  )
}
