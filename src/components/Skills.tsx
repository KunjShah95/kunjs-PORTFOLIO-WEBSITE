import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'
import { SKILL_GROUPS } from '../data/portfolio'

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
    }
  }

  return (
    <section id="skills" className="section-padding bg-bg overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container-aligned relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-primary/30 pb-8 mb-16 gap-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-primary txt-mono text-xs tracking-widest font-bold uppercase"
            >
              <Cpu className="w-4 h-4" />
              CAPABILITY_MATRIX
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-txt uppercase leading-none">
              Technical <span className="text-muted/40 font-light">Specifications</span>
            </h2>
          </div>
          <div className="txt-mono text-[10px] text-muted uppercase tracking-widest font-bold border border-primary/30 px-4 py-2 rounded-sm bg-surface/50">
            MATRIX_SIZE: {SKILL_GROUPS.length.toString().padStart(2, '0')}
          </div>
        </div>

        {/* Grid-based Capability Matrix */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
        >
          {SKILL_GROUPS.map((group) => (
            <motion.div
              key={group.category}
              variants={cardVariants}
              className="group relative bg-surface border border-primary/20 p-8 flex flex-col justify-between transition-all duration-700 hover:border-primary/60 overflow-hidden rounded-sm"
              whileHover={{
                y: -8,
                transition: { duration: 0.4, ease: "circOut" }
              }}
            >
              {/* Scanline Effect on Card */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2) 50%)] bg-[length:100%_4px] transition-opacity duration-700" />

              {/* Hover Accent Bar */}
              <motion.div
                className="absolute top-0 left-0 w-[2px] h-full bg-primary"
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.4 }}
              />

              <div className="space-y-6 relative z-10">
                <div className="flex items-start justify-between">
                  <div className="p-3 border border-primary/30 bg-primary/5 text-primary group-hover:bg-primary group-hover:text-bg transition-colors duration-500">
                    <group.icon className="w-5 h-5" />
                  </div>
                  <div className="txt-mono text-[8px] text-muted/30 uppercase tracking-widest">v2.1</div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-txt uppercase tracking-tight group-hover:text-primary transition-colors duration-300">
                    {group.category.replace(/_/g, ' ')}
                  </h3>
                  <p className="text-sm text-muted/70 leading-relaxed font-light">
                    {group.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-6 border-t border-primary/10">
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ x: 2, color: 'rgb(var(--primary-rgb))' }}
                      className="text-[10px] font-bold txt-mono text-muted/60 uppercase tracking-widest flex items-center gap-2 group/skill transition-colors"
                    >
                      <div className="w-1 h-1 bg-primary/30 rounded-full group-hover/skill:bg-primary transition-colors" />
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Status Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-24 pt-12 border-t border-primary/20 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="flex items-center gap-4 text-muted/40 txt-mono text-[10px] uppercase font-bold tracking-[0.3em]">
            <div className="w-12 h-[1px] bg-primary/20"></div>
            SYSTEM_STATUS
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['NEURAL_OPS', 'VOID_ENGINE', 'CORE_LOGIC', 'INTEL_RECOGNITION'].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-muted/50 uppercase"
              >
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full"></div>
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
