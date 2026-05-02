import { motion } from 'framer-motion'
import { Briefcase, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EXPERIENCE } from '../data/portfolio'
import { cardRevealTransition, VIEWPORT_SECTION } from '../lib/motion'

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
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-txt font-display">
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
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_SECTION}
              transition={cardRevealTransition(i)}
              className="group relative grid grid-cols-1 md:grid-cols-[44px_1fr] gap-0 md:gap-6"
            >
              {/* Timeline dot */}
              <div className="hidden md:flex justify-center pt-6">
                <div className="w-2.5 h-2.5 rounded-full bg-primary/60 ring-4 ring-bg group-hover:bg-primary transition-colors duration-300 mt-px" />
              </div>

              {/* Card */}
              <div className="rounded-xl border border-border bg-surface p-6 hover:border-primary/30 hover:bg-surfaceHighlight hover:shadow-md hover:shadow-primary/[0.05] transition-[border-color,box-shadow,background-color] duration-300">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-txt">{exp.company}</h3>
                    <p className="text-sm font-medium text-primary">{exp.role}</p>
                    <p className="text-xs text-muted">{exp.period}</p>
                  </div>
                </div>

                <p className="text-sm text-muted mb-4">{exp.description}</p>

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

        {/* Explore CTA */}
        <div className="flex justify-center pt-4">
          <Link to="/experience" className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-1">
            See my full journey → <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}