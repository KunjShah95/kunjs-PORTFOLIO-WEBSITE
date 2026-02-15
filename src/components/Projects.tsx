import { motion } from 'framer-motion'
import { Github, Code2, ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PROJECTS } from '../data/portfolio'

export function Projects() {

  return (
    <section id="projects" className="section-padding bg-bg relative">
      <div className="container-aligned space-y-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-primary/20 pb-8 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary txt-mono text-xs tracking-widest font-bold uppercase">
              <Code2 className="w-4 h-4" />
              DEPLOYMENT_REGISTRY
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-txt uppercase leading-none">
              Engineered <span className="text-muted/40 font-light">Works</span>
            </h2>
          </div>
          <div className="txt-mono text-xs text-muted uppercase tracking-widest font-bold border border-primary/30 bg-primary/5 px-4 py-2 rounded-sm">
            SYSTEM_COUNT: {PROJECTS.length.toString().padStart(2, '0')}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 sm:gap-12">
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 border border-primary/20 bg-surface hover:border-primary/50 transition-all duration-500 overflow-hidden"
              whileHover={{ scale: 1.01, y: -5 }}
            >
              {/* ID Column */}
              <div className="lg:col-span-2 border-r border-primary/20 bg-primary/5 flex items-center justify-center py-6 lg:py-0 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary/0 to-primary/10 transition-opacity duration-500"></div>
                <span className="text-lg lg:text-2xl font-black txt-mono text-primary/40 group-hover:text-primary transition-colors relative z-10 whitespace-nowrap">
                  {proj.id}
                </span>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 space-y-6 flex flex-col justify-between relative">
                {/* Hover Background */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="space-y-4 relative z-10">
                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-sm text-primary txt-mono text-xs font-bold uppercase tracking-widest">
                    <Code2 className="w-3 h-3" />
                    {proj.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl sm:text-4xl font-black text-txt group-hover:text-primary transition-colors tracking-tight uppercase">
                    {proj.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted/70 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                    {proj.desc}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                  {proj.tech.map(t => (
                    <motion.span
                      key={t}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1 text-xs uppercase font-bold tracking-wider txt-mono text-muted border border-primary/20 bg-primary/5 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Actions Column */}
              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-primary/20 bg-primary/5 p-6 sm:p-8 flex flex-col justify-between gap-6 relative overflow-hidden">
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                </div>

                {/* Visual Pattern */}
                <div className="flex-1 relative min-h-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <g stroke="currentColor" strokeWidth="0.5" fill="none">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" opacity="0.6" />
                      ))}
                      {Array.from({ length: 10 }).map((_, i) => (
                        <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} opacity="0.6" />
                      ))}
                    </g>
                  </svg>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 relative z-10">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] px-4 py-3 border border-primary/30 bg-primary/10 hover:border-primary/60 hover:bg-primary/20 text-txt hover:text-primary transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                  {proj.demo && (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[120px] px-4 py-3 border border-primary/30 bg-primary/10 hover:border-primary/60 hover:bg-primary/20 text-txt hover:text-primary transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" /> Live
                    </a>
                  )}
                  <Link
                    to={`/projects/${proj.slug}`}
                    className="flex-1 min-w-[120px] px-4 py-3 bg-primary/20 border border-primary/40 hover:border-primary/80 hover:bg-primary/30 text-primary font-bold uppercase tracking-widest flex items-center justify-center gap-2 group/btn transition-all"
                  >
                    Case <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Top Border Glow on Hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}