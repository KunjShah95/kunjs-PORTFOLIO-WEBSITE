import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { IDENTITY } from '../data/portfolio'
import { OSS_STATS } from '../data/opensource'
import { Magnetic } from './effects/Magnetic'

const SIGNALS = [
  { value: '12+', label: 'systems shipped' },
  { value: `${OSS_STATS.mergedPRs}+`, label: 'open-source PRs' },
  { value: '4×', label: 'hackathon finalist' },
]

const USEFUL_WHEN = ['The idea is still a little fuzzy', 'The work needs to survive real users', 'The system has to be explainable']

export function BentoHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-rule/10 bg-paper py-16 sm:px-6 md:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden><div className="absolute -right-20 top-[-8rem] h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-3xl" /><div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgb(var(--rule)/0.22)_0.6px,transparent_0.6px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" /></div>
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20">
          <div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex w-fit items-center gap-2"><span className="signal-chip"><span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" /><strong>Available</strong> for focused AI work</span></motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="mt-7 max-w-[12ch] font-display text-[clamp(3rem,7.2vw,6.4rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-ink-primary">I build the part of AI that has to keep <span className="italic text-accent">working.</span></motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }} className="mt-7 max-w-[60ch] text-base leading-7 text-ink-secondary sm:text-lg sm:leading-8">Most of my work sits between the model and the product: agents that know when to stop, retrieval that returns useful context, APIs that do not fall over, and tools that make the next decision easier.</motion.p>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.14 }} className="mt-4 max-w-[58ch] text-sm leading-6 text-ink-tertiary sm:text-base sm:leading-7">I&apos;m happiest when the brief is still a little fuzzy and the work turns into something another person can actually use.</motion.p>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="mt-8 flex flex-wrap items-center gap-3"><Magnetic><Link to="/projects" className="group inline-flex min-h-11 items-center gap-2 rounded-lg bg-ink-primary px-5 py-3 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 active:scale-[0.98]">See the work <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></Magnetic><Link to="/contact" className="inline-flex min-h-11 items-center rounded-lg border border-rule/15 px-5 py-3 text-sm font-medium text-ink-primary transition-colors hover:border-ink-primary/30 hover:bg-elevated">Tell me what you&apos;re building</Link></motion.div>
            <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-tertiary"><MapPin className="h-3.5 w-3.5 text-accent" /> {IDENTITY.location} <span className="text-rule/30">/</span> <a href="https://peerlist.io/kunjshah/project/engineeros" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">EngineerOS · 11↑</a></div>
          </div>
          <motion.aside initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.14 }} className="lg:pt-3" aria-label="A little more about Kunj">
            <div className="relative mx-auto w-full max-w-sm lg:ml-auto lg:mr-0"><div className="absolute -inset-3 rounded-2xl bg-accent/[0.08] blur-2xl" aria-hidden /><div className="relative overflow-hidden rounded-2xl border border-rule/10 bg-elevated shadow-[0_18px_60px_rgb(var(--ink-primary)/0.10)]"><img src={IDENTITY.profile_photo} alt="Kunj Shah working on AI engineering projects" width="420" height="520" className="aspect-[4/5] w-full object-cover object-[center_18%]" fetchPriority="high" /><div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-primary/70 to-transparent" /><div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/20 bg-ink-primary/65 px-4 py-3 text-paper backdrop-blur-md"><span className="font-mono text-[9px] uppercase tracking-[0.1em] text-paper/70">Right now</span><p className="mt-1 text-sm font-medium leading-5">Building multi-agent research workflows and writing down what breaks.</p></div></div><div className="mt-4 rounded-xl border border-rule/10 bg-elevated/80 p-4 backdrop-blur"><span className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-tertiary">I&apos;m most useful when</span><ul className="mt-3 space-y-2">{USEFUL_WHEN.map((item) => <li key={item} className="flex items-start gap-2 text-xs leading-5 text-ink-secondary"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{item}</li>)}</ul></div></div>
          </motion.aside>
        </div>
        <div className="mt-14 grid max-w-2xl grid-cols-3 divide-x divide-rule/10 border-y border-rule/10 py-4 sm:mt-16">{SIGNALS.map((signal) => <div key={signal.label} className="px-3 first:pl-0 sm:px-5"><div className="font-display text-xl font-semibold tabular-nums text-ink-primary sm:text-2xl">{signal.value}</div><div className="mt-1 font-mono text-[9px] uppercase tracking-[0.08em] text-ink-tertiary">{signal.label}</div></div>)}</div>
      </div>
    </section>
  )
}
