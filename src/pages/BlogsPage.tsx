import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Hash, ArrowUpRight, BookOpen } from 'lucide-react'
import { SEO } from '../components/SEO'
import { BLOGS, LOGS } from '../data/portfolio'

export function BlogsPage() {
  const [activeTab, setActiveTab] = useState<'BLOGS' | 'LOGS'>('BLOGS')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get all unique categories
  const categories = Array.from(new Set(BLOGS.map(b => b.category)))

  // Filter blogs by category
  const filteredBlogs = selectedCategory
    ? BLOGS.filter(blog => blog.category === selectedCategory)
    : BLOGS

  return (
    <div className="min-h-screen pt-32 pb-20 bg-bg">
      <SEO
        title="Technical Articles & Research Logs"
        description="Read Kunj Shah's in-depth technical articles on AI systems, MLOps, computer vision, and autonomous agents."
        url="https://kunjshah.dev/blogs"
      />

      <div className="container-aligned space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted text-sm font-medium">
              <BookOpen className="w-4 h-4" />
              Writing
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-txt font-display">
              Articles & Research Notes
            </h1>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-1 p-1 bg-surface border border-border rounded-lg">
            <button
              onClick={() => setActiveTab('BLOGS')}
              className={`px-5 py-2 text-sm font-medium transition-all rounded-md ${activeTab === 'BLOGS'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted hover:text-txt'
                }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab('LOGS')}
              className={`px-5 py-2 text-sm font-medium transition-all rounded-md ${activeTab === 'LOGS'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted hover:text-txt'
                }`}
            >
              Logs
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'BLOGS' ? (
              <motion.div
                key="blogs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all border ${selectedCategory === null
                      ? 'bg-primary text-white border-primary'
                      : 'bg-surface border-border text-muted hover:text-txt hover:border-primary/30'
                      }`}
                  >
                    All
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all border ${selectedCategory === cat
                        ? 'bg-primary text-white border-primary'
                        : 'bg-surface border-border text-muted hover:text-txt hover:border-primary/30'
                        }`}
                    >
                      {cat.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>

                {/* Blog Grid */}
                <div className="space-y-6 pt-8">
                  {filteredBlogs.map((blog, i) => (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                    >
                      <Link
                        to={`/blogs/${blog.slug}`}
                        className="group flex flex-col sm:flex-row rounded-xl border border-border bg-surface hover:border-primary/30 hover:bg-surfaceHighlight transition-all duration-200 overflow-hidden block"
                      >
                        {/* Meta Column */}
                        <div className="sm:w-[140px] flex-shrink-0 border-b sm:border-b-0 sm:border-r border-border p-5 flex flex-row sm:flex-col gap-4 sm:gap-2 justify-between sm:justify-start">
                          <span className="text-xs font-medium text-muted">{blog.date}</span>
                          <span className="text-xs text-muted">{blog.readTime} min read</span>
                        </div>

                        {/* Content Column */}
                        <div className="flex-1 p-5 sm:p-6 space-y-3">
                          <div className="space-y-1.5">
                            <span className="text-xs font-medium text-primary/80">{blog.category.replace(/_/g, ' ')}</span>
                            <h3 className="text-base sm:text-lg font-semibold text-txt group-hover:text-primary transition-colors leading-snug">
                              {blog.title}
                            </h3>
                            <p className="text-sm text-muted leading-relaxed line-clamp-2">
                              {blog.excerpt}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {blog.tags.slice(0, 4).map(tag => (
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
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {filteredBlogs.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-muted text-sm">
                      No articles in this category yet.
                    </p>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="logs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {LOGS.map((log) => (
                  <div
                    key={log.id}
                    className="group p-8 border border-primary/20 bg-surface border-l-4 border-l-primary hover:border-l-primary hover:border-primary transition-all rounded-r-sm"
                  >
                    <div className="grid lg:grid-cols-12 gap-6 items-start">
                      {/* Hash & Date Column */}
                      <div className="lg:col-span-2 space-y-2">
                        <div className="flex items-center gap-2 text-primary font-bold txt-mono text-xs uppercase tracking-wider">
                          <Hash className="w-3 h-3" /> {log.hash}
                        </div>
                        <div className="text-[10px] text-muted font-mono uppercase opacity-60">
                          {log.date}
                        </div>
                      </div>

                      {/* Module Column */}
                      <div className="lg:col-span-2 pl-6 border-l border-primary/30">
                        <div className="text-[10px] font-bold txt-mono text-muted uppercase tracking-widest mb-2">
                          MODULE
                        </div>
                        <div className="text-sm font-bold txt-mono text-txt uppercase">
                          {log.module}
                        </div>
                      </div>

                      {/* Action Column */}
                      <div className="lg:col-span-3">
                        <div className="text-[10px] font-bold txt-mono text-muted uppercase tracking-widest mb-2">
                          ACTION
                        </div>
                        <h3 className="text-lg font-bold text-txt uppercase tracking-wide group-hover:text-primary transition-colors">
                          {log.action}
                        </h3>
                      </div>

                      {/* Details Column */}
                      <div className="lg:col-span-5">
                        <div className="text-[10px] font-bold txt-mono text-muted uppercase tracking-widest mb-2">
                          DETAILS
                        </div>
                        <p className="text-sm text-muted leading-relaxed">
                          {log.details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
