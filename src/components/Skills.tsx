import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'
import { SKILL_GROUPS } from '../data/portfolio'
import { staggerContainer, staggerItem, VIEWPORT_SECTION } from '../lib/motion'

function SkillCard({ group }: { group: typeof SKILL_GROUPS[0] }) {
  const IconComponent = group.icon
  
  return (
    <motion.div
      variants={staggerItem}
      className="group relative p-5 rounded-xl bg-elevated/60 border border-rule/12 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-accent/10 border border-accent/20">
            <IconComponent className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-mono text-ink-secondary uppercase tracking-wider">Module</span>
            <h3 className="text-base font-bold text-ink-primary group-hover:text-accent transition-colors">
              {group.category.replace(/_/g, ' ')}
            </h3>
          </div>
          <div className="px-2 py-0.5 rounded bg-green-500/10">
            <span className="text-[10px] font-mono text-green-400">Active</span>
          </div>
        </div>

        <p className="text-sm text-ink-secondary mb-4">{group.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-[10px] font-mono text-ink-secondary bg-paper border border-rule/12 rounded hover:border-accent/30 hover:text-ink-primary transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="section-padding bg-paper relative">
      <div className="absolute inset-0 tech-grid-layer opacity-30" />
      
      <div className="container-aligned relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_SECTION}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-accent" />
            <span className="text-xs font-mono text-ink-secondary uppercase tracking-wider">Capabilities</span>
          </div>
          <h2 className="text-3xl font-bold text-ink-primary mb-2">
            Technical <span className="text-accent">Stack</span>
          </h2>
          <p className="text-ink-secondary max-w-lg">
            Production-ready technologies for building scalable AI systems.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_SECTION}
          variants={staggerContainer(0.08)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {SKILL_GROUPS.map((group) => (
            <SkillCard key={group.category} group={group} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}