import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'
import { SKILL_GROUPS } from '../data/portfolio'

export function Skills() {
  return (
    <section id="skills" className="section-padding bg-bg overflow-hidden relative">
      <div className="container-aligned relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted text-sm font-medium">
              <Cpu className="w-4 h-4" />
              Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-txt">
              Skills & Technologies
            </h2>
          </div>
          <span className="text-sm text-muted font-medium">{SKILL_GROUPS.length} categories</span>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {SKILL_GROUPS.map((group) => (
            <motion.div
              key={group.category}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="group rounded-xl border border-border bg-surface p-6 hover:border-primary/30 hover:bg-surfaceHighlight transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <group.icon className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <h3 className="text-base font-semibold text-txt group-hover:text-primary transition-colors duration-200">
                  {group.category.replace(/_/g, ' ')}
                </h3>
                <p className="text-xs text-muted leading-relaxed">{group.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 pt-4 border-t border-border">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs text-muted flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/40 flex-shrink-0" />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
