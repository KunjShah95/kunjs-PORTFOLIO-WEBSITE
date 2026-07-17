import { motion } from 'framer-motion'
import { Briefcase, ArrowRight, Server, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EXPERIENCE } from '../data/portfolio'
import { cardRevealTransition, VIEWPORT_SECTION } from '../lib/motion'

function TimelineItem({ exp, index }: { exp: typeof EXPERIENCE[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_SECTION}
      transition={cardRevealTransition(index)}
      className="relative p-5 rounded-xl bg-elevated/60 border border-rule/12 hover:border-accent/40 transition-all duration-300 group"
    >
      <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl bg-accent/0 group-hover:bg-accent/60 transition-colors duration-300" />
      
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/10">
            <Briefcase className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h3 className="text-base font-bold text-ink-primary">{exp.company}</h3>
            <p className="text-sm text-accent font-medium">{exp.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-xs font-mono text-green-400">Active</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3 text-xs text-ink-secondary font-mono">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {exp.period}
        </div>
        <div className="flex items-center gap-1">
          <Server className="w-3 h-3" />
          {exp.skills.length} technologies
        </div>
      </div>

      <p className="text-sm text-ink-secondary mb-4">{exp.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {exp.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 text-[10px] font-mono text-ink-secondary bg-paper border border-rule/12 rounded"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function Experience() {
  return (
    <section id="experience" className="section-padding bg-paper relative">
      <div className="absolute inset-0 tech-grid-layer opacity-30" />
      
      <div className="container-aligned relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_SECTION}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <Server className="w-4 h-4 text-accent" />
            <span className="text-xs font-mono text-ink-secondary uppercase tracking-wider">Career</span>
          </div>
          <h2 className="text-3xl font-bold text-ink-primary mb-2">
            Work <span className="text-accent">History</span>
          </h2>
          <p className="text-ink-secondary max-w-lg">
            The places I&rsquo;ve actually shipped something, in chronological order.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXPERIENCE.map((exp, i) => (
            <TimelineItem key={i} exp={exp} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_SECTION}
          className="mt-8 flex justify-center"
        >
          <Link 
            to="/experience" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-elevated border border-rule/12 text-ink-primary font-medium text-sm hover:bg-elevated transition-colors"
          >
            Full Timeline
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}