import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BLOGS } from '../data/portfolio'
import { cardRevealTransition, VIEWPORT_SECTION } from '../lib/motion'

export function Writing() {
  const featuredBlogs = BLOGS.filter(blog => blog.featured).slice(0, 3)

  return (
    <section id="writing" className="section-padding bg-bg relative">
      <div className="container-aligned space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted text-sm font-medium">
              <BookOpen className="w-4 h-4" />
              Writing
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-txt font-display">
              Articles & Guides
            </h2>
          </div>
          <span className="text-sm text-muted font-medium">{BLOGS.length} articles</span>
        </div>

        {/* Featured Articles */}
        <div className="space-y-4">
          {featuredBlogs.map((blog, i) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_SECTION}
              transition={cardRevealTransition(i)}
            >
              <Link
                to={`/blogs/${blog.slug}`}
                className="group flex flex-col sm:flex-row gap-0 rounded-xl border border-border bg-surface hover:border-primary/30 hover:bg-surfaceHighlight hover:shadow-md hover:shadow-primary/[0.05] transition-[border-color,box-shadow,background-color] duration-200 overflow-hidden"
              >
                {/* Date & Read Time */}
                <div className="sm:w-[160px] flex-shrink-0 border-b sm:border-b-0 sm:border-r border-border p-5 flex flex-row sm:flex-col gap-4 sm:gap-3 justify-between sm:justify-start">
                  <span className="text-xs font-medium text-muted">{blog.date}</span>
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Clock className="w-3 h-3" />
                    {blog.readTime} min read
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 sm:p-6 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-primary/80">{blog.category.replace(/_/g, ' ')}</span>
                    <h3 className="text-base sm:text-lg font-semibold text-txt group-hover:text-primary transition-colors leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed line-clamp-2">{blog.excerpt}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {blog.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-muted bg-bg border border-border px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden lg:flex items-center px-5 text-muted group-hover:text-primary transition-colors border-l border-border">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <div className="pt-4 flex justify-end">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
