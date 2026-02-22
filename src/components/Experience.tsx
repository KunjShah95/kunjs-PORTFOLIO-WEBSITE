import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { EXPERIENCE } from '../data/portfolio'

export function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="container-aligned space-y-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted text-sm font-medium">
              <Briefcase className="w-4 h-4" />
              Work Experience
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-txt">
              Where I've Worked
            </h2>
          </div>
          <span className="text-sm text-muted font-medium">
            {EXPERIENCE.length} position{EXPERIENCE.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Timeline */}
        <div className="relative space-y-6">
          {/* Vertical line */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-border hidden md:block" />

          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative grid grid-cols-1 md:grid-cols-[44px_1fr] gap-0 md:gap-6"
            >
              {/* Timeline dot */}
              <div className="hidden md:flex justify-center pt-6">
                <div className="w-2.5 h-2.5 rounded-full bg-primary/60 ring-4 ring-bg group-hover:bg-primary transition-colors duration-300 mt-px" />
              </div>

              {/* Card */}
              <div className="rounded-xl border border-border bg-surface p-6 hover:border-primary/30 hover:bg-surfaceHighlight transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-txt">{exp.company}</h3>
                    <p className="text-sm font-medium text-primary">{exp.role}</p>
                  </div>
                  <span className="text-xs font-medium text-muted bg-surfaceHighlight px-3 py-1 rounded-full border border-border whitespace-nowrap self-start">
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-4">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs font-medium text-muted bg-bg border border-border rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}