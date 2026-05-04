import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Hash, ArrowUpRight, Search, Filter, Clock, ChevronRight } from 'lucide-react'
import { SEO } from '../components/SEO'
import { BLOGS, LOGS } from '../data/portfolio'

export function BlogsPage() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<'BLOGS' | 'LOGS'>('BLOGS')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    
    if (category) setSelectedCategory(category)
    if (search) setSearchQuery(search.toLowerCase())
  }, [searchParams])

  // Get all unique categories
  const categories = useMemo(() => Array.from(new Set(BLOGS.map(b => b.category))), [])

  // Filter blogs by category and search
  const filteredBlogs = useMemo(() => BLOGS.filter(blog => {
    const matchesCategory = selectedCategory ? blog.category === selectedCategory : true
    const matchesSearch = searchQuery 
      ? blog.title.toLowerCase().includes(searchQuery) || 
        blog.excerpt.toLowerCase().includes(searchQuery) ||
        blog.tags.some(t => t.toLowerCase().includes(searchQuery)) ||
        blog.id.toLowerCase().includes(searchQuery)
      : true
    return matchesCategory && matchesSearch
  }), [selectedCategory, searchQuery])

  const featuredBlog = useMemo(() => BLOGS.find(b => b.featured) || BLOGS[0], [])
  const nonFeaturedBlogs = useMemo(() => filteredBlogs.filter(b => b.id !== featuredBlog.id), [filteredBlogs, featuredBlog])

  return (
    <div className="min-h-screen pt-32 pb-20 bg-bg">
      <SEO
        title="Technical Articles & Research Logs"
        description="Read Kunj Shah's in-depth technical articles on AI systems, MLOps, computer vision, and autonomous agents."
        url="https://kunjshah.vercel.app/blogs"
      />

      <div className="container-aligned space-y-20">
        {/* Header */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 gap-8">
            {/* Tab Switcher */}
            <div className="flex gap-1 p-1 bg-surface border border-border rounded-sm">
              <button
                onClick={() => setActiveTab('BLOGS')}
                className={`px-6 py-2 text-xs font-bold txt-mono tracking-wider transition-all rounded-sm uppercase ${activeTab === 'BLOGS'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted hover:text-txt'
                  }`}
              >
                Articles
              </button>
              <button
                onClick={() => setActiveTab('LOGS')}
                className={`px-6 py-2 text-xs font-bold txt-mono tracking-wider transition-all rounded-sm uppercase ${activeTab === 'LOGS'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted hover:text-txt'
                  }`}
              >
                Logs
              </button>
            </div>
          </div>

          {activeTab === 'BLOGS' && !selectedCategory && !searchQuery && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative"
            >
              <Link to={`/blogs/${featuredBlog.slug}`} className="block">
                <div className="grid lg:grid-cols-2 border border-border rounded-sm overflow-hidden bg-surface group-hover:border-primary/50 transition-all duration-500">
                  <div className="p-8 md:p-12 space-y-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold txt-mono tracking-tighter uppercase rounded-sm border border-primary/20">
                          Featured Article
                        </span>
                        <span className="text-[10px] text-muted txt-mono uppercase tracking-widest">{featuredBlog.date}</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-bold text-txt group-hover:text-primary transition-colors leading-[1.1]">
                        {featuredBlog.title}
                      </h2>
                      <p className="text-lg text-muted leading-relaxed line-clamp-3">
                        {featuredBlog.excerpt}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm font-bold txt-mono text-primary group-hover:gap-6 transition-all uppercase tracking-widest">
                      Read Investigation <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="bg-bg p-8 md:p-12 flex flex-col justify-center gap-8">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-2 border-b border-border/50">
                          <span className="text-xs text-muted txt-mono">Category</span>
                          <span className="text-xs text-txt txt-mono font-bold">{featuredBlog.category.replace(/_/g, ' ')}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-border/50">
                          <span className="text-xs text-muted txt-mono">Duration</span>
                          <span className="text-xs text-txt txt-mono font-bold">{featuredBlog.readTime}m read</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-border/50">
                          <span className="text-xs text-muted txt-mono">Status</span>
                          <span className="text-xs text-green-500 txt-mono font-bold">Published</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {featuredBlog.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-bg border border-border text-[10px] text-muted txt-mono font-bold uppercase tracking-tighter">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border rounded-sm py-3 pl-12 pr-4 text-xs txt-mono focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted/50"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="w-3 h-3 text-muted mr-2" />
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 text-[10px] font-bold txt-mono tracking-tighter uppercase rounded-sm border transition-all ${selectedCategory === null
                ? 'bg-primary text-white border-primary'
                : 'bg-surface border-border text-muted hover:border-primary/30'
                }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-[10px] font-bold txt-mono tracking-tighter uppercase rounded-sm border transition-all ${selectedCategory === cat
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface border-border text-muted hover:border-primary/30'
                  }`}
              >
                {cat.replace(/_/g, '_')}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'BLOGS' ? (
              <motion.div
                key="blogs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-px bg-border border border-border"
              >
                {(selectedCategory || searchQuery ? filteredBlogs : nonFeaturedBlogs).map((blog, i) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-bg hover:bg-surfaceHighlight transition-colors group"
                  >
                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start justify-between"
                    >
                      <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center gap-4 text-[10px] txt-mono font-bold tracking-widest text-muted group-hover:text-primary transition-colors">
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {blog.date}</span>
                          <span className="w-1 h-1 bg-border rounded-full" />
                          <span className="flex items-center gap-1.5 uppercase">{blog.category.replace(/_/g, ' ')}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-txt">
                          {blog.title}
                        </h3>
                        <p className="text-muted leading-relaxed text-sm md:text-base line-clamp-2">
                          {blog.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {blog.tags.map(tag => (
                            <span key={tag} className="text-[9px] font-bold txt-mono text-muted/60 uppercase">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-4 min-w-[120px]">
                        <span className="text-[10px] txt-mono font-bold text-muted bg-surface px-2 py-1 border border-border rounded-sm">
                          {blog.readTime}M_READ
                        </span>
                        <ChevronRight className="w-5 h-5 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  </motion.div>
                ))}

                {filteredBlogs.length === 0 && (
                  <div className="bg-bg text-center py-24 border-t border-border">
                    <p className="text-muted txt-mono text-xs font-bold tracking-widest uppercase">
                      Error 404: No data found matching criteria
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
                    className="group p-8 border border-border bg-surface border-l-4 border-l-primary hover:border-primary transition-all rounded-sm"
                  >
                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                      {/* Hash & Date Column */}
                      <div className="lg:col-span-2 space-y-3">
                        <div className="flex items-center gap-2 text-primary font-bold txt-mono text-xs uppercase tracking-wider">
                          <Hash className="w-3 h-3" /> {log.hash}
                        </div>
                        <div className="text-[10px] text-muted font-mono uppercase opacity-60 tracking-[0.2em]">
                          {log.date}
                        </div>
                      </div>

                      {/* Module Column */}
                      <div className="lg:col-span-2 pl-6 border-l border-border">
                        <div className="text-xs font-bold txt-mono text-txt uppercase tracking-wider">
                          {log.module}
                        </div>
                      </div>

                      {/* Action Column */}
                      <div className="lg:col-span-3">
                        <h3 className="text-base font-bold text-txt uppercase tracking-wide group-hover:text-primary transition-colors">
                          {log.action}
                        </h3>
                      </div>

                      {/* Details Column */}
                      <div className="lg:col-span-5">
                        <p className="text-sm text-muted leading-relaxed font-medium">
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
