import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Share2, Tag } from 'lucide-react'
import { SEO } from '../components/SEO'
import { BLOGS } from '../data/portfolio'

export function BlogDetailPage() {
    const { slug } = useParams()
    const blog = BLOGS.find((b) => b.slug === slug)
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <h1 className="text-4xl font-black text-txt uppercase">Intelligence Missing</h1>
                <p className="text-muted txt-mono text-sm uppercase">The requested data node does not exist.</p>
                <Link to="/blogs" className="text-primary hover:underline uppercase font-mono tracking-widest text-sm">Return to Archive</Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-bg">
            <SEO
                title={`${blog.title} | Kunj Shah`}
                description={blog.excerpt}
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
                    <Link to="/blogs" className="group inline-flex items-center gap-2 text-muted hover:text-primary transition-colors font-mono text-xs uppercase tracking-widest font-bold">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Archive Registry
                    </Link>
                </motion.div>

                {/* Header Section */}
                <header className="max-w-4xl space-y-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-4 text-[10px] txt-mono font-bold tracking-[0.2em] text-primary uppercase">
                            <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-sm">{blog.category.replace(/_/g, ' ')}</span>
                            <div className="flex items-center gap-2 text-muted/60">
                                <Calendar className="w-3 h-3" /> {blog.date}
                            </div>
                            <div className="flex items-center gap-2 text-muted/60">
                                <Clock className="w-3 h-3" /> {blog.readTime} MIN READ
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black text-txt tracking-tight uppercase leading-[0.9] lg:text-7xl">
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
                            {blog.content ? (
                                <div
                                    className="article-content"
                                    dangerouslySetInnerHTML={{
                                        __html: `<p class="text-muted leading-relaxed text-lg font-light mb-6">` + blog.content
                                            .replace(/### (.*)/g, '<h3 class="text-xl font-bold uppercase text-primary mt-12 mb-4 tracking-wider">$1</h3>')
                                            .replace(/## (.*)/g, '<h2 class="text-2xl font-black uppercase text-txt mt-16 mb-6 tracking-tight">$1</h2>')
                                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary/90 font-bold">$1</strong>')
                                            .replace(/\n\n/g, '</p><p class="text-muted leading-relaxed text-lg font-light mb-6">')
                                            .replace(/# (.*)/g, '') // Remove main h1
                                            + `</p>`
                                    }}
                                />
                            ) : (
                                <div className="py-20 text-center border-2 border-dashed border-border/50 rounded-lg">
                                    <p className="text-muted txt-mono animate-pulse">TRANSMISSION_INTERRUPTED: CONTENT_NODE_NULL</p>
                                </div>
                            )}
                        </motion.article>

                        {/* Tags & Interaction */}
                        <footer className="mt-20 pt-10 border-t border-border/50 flex flex-wrap items-center justify-between gap-8">
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map(tag => (
                                    <span key={tag} className="flex items-center gap-2 text-[10px] font-bold txt-mono text-muted/60 uppercase tracking-widest px-3 py-1.5 border border-border bg-surface hover:border-primary/40 hover:text-primary transition-colors cursor-default">
                                        <Tag className="w-3 h-3 text-primary/40" /> {tag}
                                    </span>
                                ))}
                            </div>
                            <button className="flex items-center gap-2 text-xs font-bold txt-mono text-muted hover:text-primary transition-colors uppercase tracking-widest">
                                <Share2 className="w-4 h-4" /> Share Article
                            </button>
                        </footer>
                    </main>

                    {/* Sidebar / Reading Info */}
                    <aside className="lg:col-span-4 space-y-12">
                        <div className="sticky top-32 space-y-8">
                            {/* Author Card */}
                            <div className="p-6 border border-border bg-surface/50 rounded-sm space-y-4">
                                <div className="text-[10px] font-bold txt-mono text-muted uppercase tracking-widest">Dispatcher</div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center text-white font-black text-xl">K</div>
                                    <div>
                                        <h4 className="font-bold text-txt uppercase text-sm">Kunj Shah</h4>
                                        <p className="text-[10px] txt-mono text-muted uppercase">Systems Specialist</p>
                                    </div>
                                </div>
                            </div>

                            {/* Newsletter / CTA */}
                            <div className="p-6 border border-primary/20 bg-primary/5 rounded-sm space-y-4">
                                <h4 className="font-bold text-txt uppercase text-sm">Stay Updated</h4>
                                <p className="text-xs text-muted leading-relaxed">Join the signal stream for more research into autonomous intelligence and distributed systems.</p>
                                <button className="w-full py-3 bg-primary text-white font-bold text-[10px] txt-mono uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(255,79,0,0.3)] transition-all">Connect_Stream</button>
                            </div>

                            {/* System Note */}
                            <div className="txt-mono text-[9px] text-muted/40 uppercase leading-loose border-t border-border/50 pt-6">
                                ARCHIVE_REF: {blog.id}<br />
                                ENCRYPTION: AES_256_STABLE<br />
                                LOG_TYPE: TECHNICAL_RESEARCH
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
