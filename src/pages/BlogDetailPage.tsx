import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Tag, Linkedin, Twitter } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SEO } from '../components/SEO'
import { BLOGS } from '../data/portfolio'
import { SITE_URL } from '../lib/site'
import { blogDateToIsoDate } from '../lib/seo-dates'

export function BlogDetailPage() {
    const { slug } = useParams()
    const blog = BLOGS.find((b) => b.slug === slug)
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    const shareToLinkedIn = () => {
        const url = encodeURIComponent(`${SITE_URL}/blogs/${blog?.slug}`)
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400')
    }

    const shareToTwitter = () => {
        const url = encodeURIComponent(`${SITE_URL}/blogs/${blog?.slug}`)
        const text = encodeURIComponent(`Check out this article: ${blog?.title}`)
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400')
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-bold text-txt">Article Not Found</h1>
                <p className="text-muted text-sm">The requested article does not exist.</p>
                <Link to="/blogs" className="text-primary hover:underline text-sm font-medium">Back to Articles</Link>
            </div>
        )
    }

    const canonical = `${SITE_URL}/blogs/${blog.slug}`
    const isoPublished = blogDateToIsoDate(blog.date)

    return (
        <div className="min-h-screen pt-32 pb-20 bg-bg">
            <SEO
                title={`${blog.title} | Kunj Shah`}
                description={blog.excerpt}
                url={canonical}
                type="article"
                datePublished={isoPublished}
                dateModified={isoPublished}
                articleHeadline={blog.title}
                articleSection={blog.category.replace(/_/g, ' ')}
                articleTags={blog.tags}
                keywords={[blog.title, blog.category.replace(/_/g, ' '), ...blog.tags, 'Kunj Shah', 'AI engineering']}
                breadcrumbs={[
                    { name: 'Home', item: SITE_URL },
                    { name: 'Articles', item: `${SITE_URL}/blogs` },
                    { name: blog.title, item: canonical },
                ]}
            />

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
                style={{ scaleX }}
            />

            <div className="container-aligned">
                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link to="/blogs" className="group inline-flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm font-medium">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        All Articles
                    </Link>
                </motion.div>

                {/* Header Section */}
                <header className="max-w-4xl space-y-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-medium">{blog.category.replace(/_/g, ' ')}</span>
                            <div className="flex items-center gap-1.5 text-sm text-muted">
                                <Calendar className="w-3.5 h-3.5" /> {blog.date}
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-muted">
                                <Clock className="w-3.5 h-3.5" /> {blog.readTime} min read
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-bold text-txt tracking-tight leading-tight">
                            {blog.title}
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl sm:text-2xl text-muted font-light leading-relaxed italic border-l-4 border-primary/20 pl-6"
                    >
                        {blog.excerpt}
                    </motion.p>
                </header>

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
                    {/* Main Article Content */}
                    <main className="lg:col-span-8">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="max-w-none"
                        >
                            <div className="prose prose-invert max-w-none">
                                <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        h1: ({ children }) => <h1 className="text-3xl sm:text-4xl font-bold text-txt mb-8 tracking-tight font-display border-b border-border pb-4">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-2xl font-bold text-txt mt-16 mb-6 tracking-tight flex items-center gap-3">
                                            <span className="w-1.5 h-6 bg-primary rounded-full" />
                                            {children}
                                        </h2>,
                                        h3: ({ children }) => <h3 className="text-xl font-bold uppercase text-primary mt-12 mb-4 tracking-wider">{children}</h3>,
                                        p: ({ children }) => <p className="text-muted leading-relaxed text-lg font-light mb-6">{children}</p>,
                                        ul: ({ children }) => <ul className="space-y-4 mb-8 pl-4">{children}</ul>,
                                        li: ({ children }) => (
                                            <li className="flex gap-3 text-muted text-lg font-light">
                                                <span className="text-primary mt-1.5 flex-shrink-0">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="2" />
                                                    </svg>
                                                </span>
                                                <span>{children}</span>
                                            </li>
                                        ),
                                        code: ({ node, inline, className, children, ...props }: any) => {
                                            return inline ? (
                                                <code className="bg-surfaceHighlight border border-border text-primary px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                                                    {children}
                                                </code>
                                            ) : (
                                                <div className="my-8 relative group">
                                                    <div className="absolute -inset-2 bg-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <pre className="relative bg-surface border border-border p-6 rounded-sm font-mono text-sm overflow-x-auto text-txt-dim leading-relaxed">
                                                        <div className="flex justify-end items-center mb-4 border-b border-border pb-2 opacity-40">
                                                            <div className="flex gap-1.5">
                                                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                                                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                                                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                                            </div>
                                                        </div>
                                                        <code>{children}</code>
                                                    </pre>
                                                </div>
                                            )
                                        },
                                        a: ({ children, href }) => (
                                            <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline decoration-primary/30 underline-offset-4 transition-colors">
                                                {children}
                                            </a>
                                        ),
                                        blockquote: ({ children }) => (
                                            <blockquote className="border-l-4 border-primary bg-primary/5 p-8 my-10 italic text-txt-dim text-xl font-light">
                                                {children}
                                            </blockquote>
                                        ),
                                    }}
                                >
                                    {blog.content}
                                </ReactMarkdown>
                            </div>
                        </motion.article>

                        {/* Tags & Interaction */}
                        <footer className="mt-20 pt-10 border-t border-border/50 flex flex-wrap items-center justify-between gap-8">
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map(tag => (
                                    <span key={tag} className="flex items-center gap-1.5 text-xs font-medium text-muted px-2.5 py-1 border border-border bg-surface hover:border-primary/40 hover:text-primary transition-colors cursor-default rounded-md">
                                        <Tag className="w-3 h-3 text-primary/40" /> {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                <span className="text-xs font-bold txt-mono text-muted uppercase tracking-widest">Share:</span>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={shareToLinkedIn}
                                        className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border border-border bg-surface hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/5 transition-all"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        <span className="hidden sm:inline">Share</span>
                                    </button>
                                    <button 
                                        onClick={shareToTwitter}
                                        className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border border-border bg-surface hover:border-[#1da1f2] hover:text-[#1da1f2] hover:bg-[#1da1f2]/5 transition-all"
                                    >
                                        <Twitter className="w-4 h-4" />
                                        <span className="hidden sm:inline">Tweet</span>
                                    </button>
                                    <button 
                                        onClick={() => {
                                            navigator.clipboard.writeText(`${SITE_URL}/blogs/${blog.slug}`)
                                            alert('Link copied to clipboard!')
                                        }}
                                        className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border border-border bg-surface hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                        <span className="hidden sm:inline">Copy</span>
                                    </button>
                                </div>
                            </div>
                        </footer>
                    </main>

                    {/* Sidebar / Reading Info */}
                    <aside className="lg:col-span-4 space-y-12">
                        <div className="sticky top-32 space-y-8">
                            {/* Author Card */}
                            <div className="p-6 border border-border bg-surface/50 rounded-sm space-y-4">
                                <div className="text-[10px] font-bold txt-mono text-muted uppercase tracking-widest">Author</div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center text-white font-black text-xl">K</div>
                                    <div>
                                        <h4 className="font-bold text-txt uppercase text-sm">Kunj Shah</h4>
                                        <p className="text-[10px] txt-mono text-muted uppercase">AI Engineer</p>
                                    </div>
                                </div>
                            </div>

                            {/* Newsletter / CTA */}
                            <div className="p-6 border border-primary/20 bg-primary/5 rounded-sm space-y-4">
                                <h4 className="font-bold text-txt uppercase text-sm">Stay Updated</h4>
                                <p className="text-xs text-muted leading-relaxed">Join the signal stream for more research into autonomous intelligence and distributed systems.</p>
                                <button className="w-full py-3 bg-primary text-white font-bold text-[10px] txt-mono uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(255,79,0,0.3)] transition-all">Subscribe</button>
                            </div>

                            {/* System Note */}
                            <div className="txt-mono text-[9px] text-muted/40 uppercase leading-loose border-t border-border/50 pt-6">
                                Published in {blog.category.replace(/_/g, ' ')}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
