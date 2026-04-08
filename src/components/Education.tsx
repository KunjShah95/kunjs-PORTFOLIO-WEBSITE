import { motion } from 'framer-motion'
import { MapPin, GraduationCap } from 'lucide-react'

import { EDUCATION } from '../data/portfolio'
import { cardRevealTransition, VIEWPORT_SECTION } from '../lib/motion'

export function Education() {

  return (
    <section id="education" className="section-padding relative overflow-hidden">
      <div className="container-aligned space-y-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/50 pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted text-sm font-medium">
              <GraduationCap className="w-4 h-4" />
              Education
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-txt font-display">
              Academic Background
            </h2>
          </div>
        </div>

        <div className="space-y-8">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT_SECTION}
              transition={cardRevealTransition(i)}
              className="relative"
            >
              <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-10 border border-border/50 bg-surface/30 hover:bg-surface/80 hover:border-primary/30 hover:shadow-md hover:shadow-primary/[0.05] transition-[border-color,box-shadow,background-color] rounded-lg items-center">
                <div className="md:col-span-3 space-y-2">
                  <div className="inline-flex items-center px-3 py-1 bg-surfaceHighlight rounded-sm text-primary txt-mono text-[10px] font-bold uppercase tracking-widest border border-primary/10">
                    {edu.period}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] txt-mono text-muted uppercase tracking-widest font-bold">
                    <MapPin className="w-3 h-3" />
                    {edu.location}
                  </div>
                </div>

                <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-txt group-hover:text-primary transition-colors">
                      {edu.school}
                    </h3>
                    <div className="text-xs txt-mono text-muted uppercase tracking-wider font-bold">
                      {edu.degree}
                    </div>
                  </div>
                  <div className="md:col-span-5 border-l border-border/50 pl-6">
                    <p className="text-sm text-muted font-light leading-relaxed">
                      {edu.summary}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
