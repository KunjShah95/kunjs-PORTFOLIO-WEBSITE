import { motion } from 'framer-motion'
import { useState } from 'react'
import { User, Target, Cpu, Briefcase, GraduationCap, Zap } from 'lucide-react'
import { SEO } from '../components/SEO'
import { AnimatedCounter } from '../components/AnimatedCounter'
import { IDENTITY, EXPERIENCE, EDUCATION, SKILL_GROUPS } from '../data/portfolio'

const stats = [
  { value: 11, label: 'Projects', suffix: '+' },
  { value: 1500, label: 'Hours Coded', suffix: '+' },
  { value: 8, label: 'Tech Stack', suffix: '' },
]

export function AboutPage() {
   const [imageError, setImageError] = useState(false)

   return (
      <div className="min-h-screen pt-32 pb-20">
         <SEO
            title="About"
            description="Learn about Kunj Shah, an AI/ML Engineer specializing in autonomous systems, agentic workflows, and LLM orchestration."
            url="https://kunjshah.vercel.app/about"
         />

         <div className="container-aligned space-y-20">
            {/* Header with Stats */}
            <section className="space-y-12">
               <div className="border-b border-border/50 pb-8 space-y-2">
                  <div className="flex items-center gap-2 text-muted text-sm font-medium">
                     <User className="w-4 h-4" />
                     About Me
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-txt font-display">
                     About Kunj Shah
                  </h1>
               </div>

               {/* Animated Stats */}
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-3 gap-4 max-w-xl"
               >
                  {stats.map((stat, i) => (
                     <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-surface border border-border rounded-xl text-center hover:border-primary/30 transition-colors"
                     >
                        <p className="text-3xl font-bold text-txt">
                           <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        </p>
                        <p className="text-xs text-muted mt-1">{stat.label}</p>
                     </motion.div>
                  ))}
               </motion.div>
            </section>

            {/* Story Section */}
            <section className="space-y-12">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                  {/* Left: Story Content */}
                  <div className="lg:col-span-8 space-y-12">
                     <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                     >
                        <h2 className="text-2xl sm:text-3xl font-bold text-txt leading-relaxed max-w-3xl">
                           Engineering the bridge between <span className="text-primary">human intent</span> and <span className="text-txt underline underline-offset-4 decoration-1">machine execution</span>.
                        </h2>

                        <div className="space-y-6 text-muted font-light text-lg leading-relaxed max-w-3xl">
                           <p>
                              Specializing in high-performance agentic systems, LLM orchestration, and distributed system architectures.
                              I focus on the "Surgical" layer of software engineering—where precision meets scalability.
                           </p>
                           <p>
                              My methodology integrates advanced RAG pipelines with resilient backend infrastructures,
                              ensuring that autonomous agents operate with maximum spectral efficiency and minimal latency.
                              I build for production, not just for the demo.
                           </p>
                        </div>

                        {/* Story Cards with Dashboard Style */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                           <motion.div
                              whileHover={{ y: -4 }}
                              className="p-8 border border-border bg-surface rounded-xl space-y-4 group hover:border-primary/30 transition-all"
                           >
                              <div className="flex items-center gap-3">
                                 <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Target className="w-5 h-5 text-primary" />
                                 </div>
                                 <div>
                                    <h3 className="text-sm font-semibold text-txt">Current Focus</h3>
                                    <p className="text-[10px] text-muted">2026</p>
                                 </div>
                              </div>
                              <p className="text-xs text-muted leading-relaxed">
                                 Standardizing multi-agent communication protocols for cross-infrastructure task delegation.
                              </p>
                              <div className="flex gap-2 pt-2">
                                 <span className="text-[10px] px-2 py-1 bg-primary/10 text-primary rounded">Agents</span>
                                 <span className="text-[10px] px-2 py-1 bg-primary/10 text-primary rounded">LLM Orchestration</span>
                              </div>
                           </motion.div>

                           <motion.div
                              whileHover={{ y: -4 }}
                              className="p-8 border border-border bg-surface rounded-xl space-y-4 group hover:border-primary/30 transition-all"
                           >
                              <div className="flex items-center gap-3">
                                 <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                                    <Cpu className="w-5 h-5 text-blue-400" />
                                 </div>
                                 <div>
                                    <h3 className="text-sm font-semibold text-txt">Core Stack</h3>
                                    <p className="text-[10px] text-muted">Primary</p>
                                 </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                 {['React', 'Python', 'LangChain', 'Docker', 'Vector DB'].map((tech) => (
                                    <span key={tech} className="text-xs px-2 py-1 bg-bg border border-border rounded text-muted">
                                       {tech}
                                    </span>
                                 ))}
                              </div>
                           </motion.div>
                        </div>
                     </motion.div>
                  </div>

                  {/* Right: Profile Card */}
                  <div className="lg:col-span-4 space-y-12">
                     <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-10 border border-border bg-surface rounded-lg space-y-8"
                     >
                        <div className="flex justify-center">
                           <div className="w-32 h-32 rounded-full overflow-hidden bg-surfaceHighlight flex items-center justify-center border border-border">
                              {IDENTITY.profile_photo && !imageError ? (
                                 <img
                                    src={IDENTITY.profile_photo}
                                    alt={`${IDENTITY.name} profile photo`}
                                    className="w-full h-full object-cover object-top"
                                    onError={() => setImageError(true)}
                                 />
                              ) : (
                                 <User className="w-16 h-16 text-muted" />
                              )}
                           </div>
                        </div>

                        <div className="space-y-4">
                           <div className="text-xs font-medium text-muted border-b border-border/50 pb-2">Details</div>
                           <div className="space-y-3 text-sm">
                              <div className="flex justify-between items-center text-muted">
                                 <span>Status</span>
                                 <span className="text-green-500 font-medium">Open for Collab</span>
                              </div>
                              <div className="flex justify-between items-center text-muted">
                                 <span>Location</span>
                                 <span className="text-txt font-medium">Ahmedabad, India</span>
                              </div>
                              <div className="flex justify-between items-center text-muted">
                                 <span>Timezone</span>
                                 <span className="text-txt font-medium">GMT+5:30</span>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  </div>
               </div>
            </section>

            {/* Skills Section with Animations */}
            <section className="space-y-12">
               <div className="border-b border-border/50 pb-8 space-y-2">
                  <div className="flex items-center gap-2 text-muted text-sm font-medium">
                     <Zap className="w-4 h-4" />
                     Skills
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-txt">
                     Technical Skills
                  </h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {SKILL_GROUPS.map((group, index) => (
                     <motion.div
                        key={group.category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="p-6 border border-border bg-surface rounded-lg space-y-4 hover:border-primary/50 transition-all cursor-pointer"
                     >
                        <div className="p-3 bg-surfaceHighlight rounded-md w-fit group-hover:bg-primary/10 transition-colors">
                           <group.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="space-y-2">
                           <h3 className="text-sm font-semibold text-txt">
                              {group.category.replace(/_/g, ' ')}
                           </h3>
                           <p className="text-xs text-muted leading-relaxed">
                              {group.description}
                           </p>
                        </div>
                        <div className="pt-4 border-t border-border/50">
                           <div className="flex flex-wrap gap-2">
                              {group.skills.map((skill) => (
                                 <span
                                    key={skill}
                                    className="px-2 py-1 bg-surfaceHighlight rounded text-[10px] font-medium text-muted/80"
                                 >
                                    {skill}
                                 </span>
                              ))}
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </section>

            {/* Experience & Education Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
               {/* Experience */}
               <div className="space-y-12">
                  <div className="border-b border-border/50 pb-8 space-y-2">
                     <div className="flex items-center gap-2 text-muted text-sm font-medium">
                        <Briefcase className="w-4 h-4" />
                        Work
                     </div>
                     <h2 className="text-2xl font-bold tracking-tight text-txt">
                        Experience
                     </h2>
                  </div>

                  <div className="space-y-8">
                     {EXPERIENCE.map((exp, index) => (
                        <motion.div
                           key={exp.id}
                           initial={{ opacity: 0, x: -20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.4, delay: index * 0.1 }}
                           className="relative pl-8 border-l border-border space-y-2"
                        >
                           <motion.div
                              whileInView={{ scale: [0, 1] }}
                              viewport={{ once: true }}
                              className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background"
                           />
                           <div className="flex justify-between items-start">
                              <div>
                                 <h3 className="text-base font-semibold text-txt">{exp.role}</h3>
                                 <div className="text-primary text-xs font-medium mb-2">
                                    {exp.company}
                                 </div>
                              </div>
                              <span className="text-xs font-mono text-muted border border-border px-2 py-1 rounded bg-surfaceHighlight">
                                 {exp.period}
                              </span>
                           </div>
                           <p className="text-sm text-muted leading-relaxed max-w-md">{exp.description}</p>
                           <div className="flex gap-2 pt-2">
                              {exp.skills.map((s) => (
                                 <span key={s} className="text-[10px] font-mono text-muted/60 uppercase">
                                    #{s}
                                 </span>
                              ))}
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>

               {/* Education */}
               <div className="space-y-12">
                  <div className="border-b border-border/50 pb-8 space-y-2">
                     <div className="flex items-center gap-2 text-muted text-sm font-medium">
                        <GraduationCap className="w-4 h-4" />
                        Studies
                     </div>
                     <h2 className="text-2xl font-bold tracking-tight text-txt">
                        Education
                     </h2>
                  </div>

                  <div className="space-y-8">
                     {EDUCATION.map((edu, index) => (
                        <motion.div
                           key={edu.id}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: index * 0.1 }}
                           className="p-6 border border-border bg-surface rounded-lg space-y-4 hover:border-primary/30 transition-colors"
                        >
                           <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                 <h3 className="text-base font-semibold text-txt">{edu.school}</h3>
                                 <div className="text-primary text-xs font-medium">
                                    {edu.degree}
                                 </div>
                              </div>
                              <span className="text-xs font-mono text-muted border border-border px-2 py-1 rounded bg-surfaceHighlight">
                                 {edu.period}
                              </span>
                           </div>
                           <div className="text-sm text-muted">
                              <span className="text-xs text-muted/60 block mb-1">Specialization</span>
                              {edu.specialization}
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </section>
         </div>
      </div>
   )
}