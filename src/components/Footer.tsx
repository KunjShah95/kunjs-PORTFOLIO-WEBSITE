import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const SOCIALS = [
  { label: 'GitHub', value: 'KunjShah95', href: 'https://github.com/KunjShah95' },
  { label: 'LinkedIn', value: 'kunjshah05', href: 'https://linkedin.com/in/kunjshah05' },
  { label: 'Peerlist', value: 'kunjshah', href: 'https://peerlist.io/kunjshah' },
  { label: 'X / Twitter', value: '@kunjshah_dev', href: 'https://twitter.com/kunjshah_dev' },
]

const INTERNAL = [
  { label: 'About', to: '/about' },
  { label: 'Experience', to: '/experience' },
  { label: 'Skills', to: '/skills' },
  { label: 'Labs', to: '/labs' },
  { label: 'Education', to: '/education' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-rule/10 bg-paper">
      <div className="absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.7fr_0.7fr] md:gap-8">
          <div>
            <p className="max-w-[14ch] font-display text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-ink-primary sm:text-5xl">
              Make the next system matter.
            </p>
            <p className="mt-6 max-w-[42ch] text-sm leading-6 text-ink-secondary">
              Building agents, retrieval systems, edge vision, and the software that makes them dependable.
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary">Explore</span>
            <nav className="mt-5 flex flex-col items-start gap-3" aria-label="Footer navigation">
              {INTERNAL.map((item) => (
                <Link key={item.to} to={item.to} className="text-sm text-ink-secondary transition-colors hover:text-accent">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-tertiary">Elsewhere</span>
            <nav className="mt-5 flex flex-col items-start gap-3" aria-label="Social links">
              {SOCIALS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-sm text-ink-secondary transition-colors hover:text-accent"
                >
                  {social.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-rule/10 pt-5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-tertiary sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Kunj Shah · Built by hand</span>
          <span>12+ systems / 44+ PRs / 4 hackathon finals</span>
        </div>
      </div>
    </footer>
  )
}
