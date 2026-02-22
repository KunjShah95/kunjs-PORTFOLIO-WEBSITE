import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'
import { BLOGS } from '../data/portfolio'

export function Writing() {
   // Get featured blogs
   const featuredBlogs = BLOGS.filter(blog => blog.featured).slice(0, 3)

   return (
      <section id="writing" className="section-padding bg-bg relative">
         <div className="container-aligned space-y-16">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-primary/30 pb-8 gap-6">
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-primary txt-mono text-xs tracking-widest font-bold uppercase">
                     <BookOpen className="w-4 h-4" />
                     TECHNICAL_WRITING
                  </div>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-txt uppercase leading-none">
                     Research <span className="text-muted/50 font-light">Archive</span>
                  </h2>
               </div>
               <div className="txt-mono text-xs text-muted uppercase tracking-widest font-bold border border-primary/30 px-4 py-2 rounded-sm">
                  ARTICLES: {BLOGS.length.toString().padStart(2, '0')}
               </div>
            </div>

            {/* Featured Articles Grid */}
            <div className="space-y-6">
               {featuredBlogs.map((blog, i) => (
                  <motion.a
                     key={blog.id}
                     href={`/blogs/${blog.slug}`}
                     initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                     className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 border border-primary/20 bg-surface hover:border-primary/60 transition-all duration-700 rounded-sm overflow-hidden"
                     whileHover={{ x: 8 }}
                  >
                     {/* Meta Column */}
                     <div className="lg:col-span-2 border-r border-primary/20 bg-primary/5 p-6 flex flex-col justify-between">
                        <div className="space-y-4">
                           <span className="text-[10px] font-bold txt-mono text-primary group-hover:tracking-widest transition-all uppercase tracking-[0.2em]">
                              {blog.date}
                           </span>
                           <div className="flex items-center gap-2 text-[9px] font-bold txt-mono text-muted/60 uppercase">
                              <Clock className="w-3 h-3" /> {blog.readTime} MIN
                           </div>
                        </div>
                        <div className="h-10 w-px bg-primary/10 group-hover:bg-primary/40 transition-colors" />
                     </div>

                     {/* Content Column */}
                     <div className="lg:col-span-7 p-8 sm:p-10 space-y-6 flex flex-col justify-between relative">
                        <div className="space-y-4 relative z-10">
                           <div className="text-[10px] font-bold txt-mono text-primary/60 uppercase tracking-widest">{blog.category.replace(/_/g, ' ')}</div>
                           <h3 className="text-3xl sm:text-4xl font-black text-txt group-hover:text-primary transition-colors tracking-tight uppercase leading-[1.1]">
                              {blog.title}
                           </h3>
                           <p className="text-sm text-muted/70 leading-relaxed max-w-2xl font-light">
                              {blog.excerpt}
                           </p>
                        </div>

                        <div className="flex flex-wrap gap-2 relative z-10">
                           {blog.tags.map(tag => (
                              <span
                                 key={tag}
                                 className="text-[9px] font-bold txt-mono text-muted/50 uppercase tracking-widest px-2.5 py-1 border border-primary/10 rounded-sm bg-primary/5 group-hover:border-primary/30 transition-colors"
                              >
                                 {tag}
                              </span>
                           ))}
                        </div>
                     </div>

                     {/* CTA Column */}
                     <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-primary/20 bg-primary/5 p-8 flex flex-col justify-center items-center group/cta relative overflow-hidden">
                        <motion.div
                           className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                           initial={false}
                        />
                        <div className="text-txt group-hover:text-primary transition-all duration-300">
                           <ArrowRight className="w-8 h-8 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                        </div>
                        <div className="mt-4 text-[10px] font-bold txt-mono text-muted/40 uppercase tracking-[0.3em] group-hover:text-primary transition-colors">Open_Entry</div>
                     </div>
                  </motion.a>
               ))}
            </div>

            {/* View All */}
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="pt-12 border-t border-primary/10 flex justify-end"
            >
               <a
                  href="/blogs"
                  className="group flex items-center gap-4 txt-mono text-[10px] font-bold text-muted hover:text-primary transition-all uppercase tracking-[0.3em]"
               >
                  <span className="w-12 h-px bg-primary/20 group-hover:w-20 transition-all" />
                  Access_Full_Archive
               </a>
            </motion.div>
         </div>
      </section>
   )
}
