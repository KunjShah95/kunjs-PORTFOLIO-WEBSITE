import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Microscope, Plus, ArrowUpRight, Activity, Zap, ArrowRight } from 'lucide-react'
import { cardRevealTransition, VIEWPORT_SECTION } from '../lib/motion'
import { LOGS } from '../data/portfolio'

export function ResearchLabs() {
  const experiments = [
    {
      id: 'L01',
      title: 'Synthetic Memory',
      status: 'Stable',
      desc: 'Architecture for recursive state persistence in non-deterministic agent clusters.',
      stack: ['Redis', 'Vector DB'],
    },
    {
      id: 'L02',
      title: 'Neural Protocol',
      status: 'Beta',
      desc: 'Standardized handshake logic for multi-modal cross-agent task synchronization.',
      stack: ['gRPC', 'Protobuf'],
    },
    {
      id: 'L03',
      title: 'Context Window Optimizer',
      status: 'Experimental',
      desc: 'Building a memory compression system that intelligently prioritizes relevant context for long-running agent sessions.',
      stack: ['llama.cpp', 'Semantic Chunking'],
      new: true,
    },
  ]

  const buildingInPublicPosts = [
    {
      id: 'BIP01',
      title: 'Why I rebuilt my agent memory from scratch',
      excerpt: 'The standard RAG patterns weren\'t cutting it for multi-hour reasoning tasks. Here\'s what I learned about context prioritization.',
      date: 'Apr 2026',
      readTime: '5 min',
    },
    {
      id: 'BIP02',
      title: 'Debugging a 3-day agent loop: A post-mortem',
      excerpt: 'Sometimes the most valuable experiments are the ones that fail spectacularly. Here\'s what went wrong with my first autonomous agent.',
      date: 'Apr 2026',
      readTime: '7 min',
    },
  ]

  return (
    <section id="labs" className="section-padding bg-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full" />
      
      <div className="container-aligned space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                <Activity className="w-3 h-3" />
                Building in Public
                <span className="ml-1 text-[9px] opacity-70">{buildingInPublicPosts.length} new</span>
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-txt font-display">
              Research Labs
            </h2>
            <p className="text-muted text-sm max-w-xl">
              Where I experiment with early-stage ideas, agentic architectures, and low-level optimizations.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted font-medium">{experiments.length} active experiments</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12">
          {/* Active Experiments */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted flex items-center gap-2">
              <Microscope className="w-4 h-4" />
              Active Projects
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {experiments.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT_SECTION}
                  transition={cardRevealTransition(i)}
                  className="group rounded-xl border border-border bg-surface hover:border-primary/30 hover:bg-surfaceHighlight hover:shadow-md hover:shadow-primary/[0.05] transition-all duration-300 overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-0">
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-muted/50">{exp.id}</span>
                        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${
                          exp.status === 'Stable'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-primary/10 text-primary border-primary/20'
                        }`}>
                          {exp.status}
                        </span>
                        {'new' in exp && (
                          <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-primary text-white animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="text-lg font-bold text-txt group-hover:text-primary transition-colors">
                          {exp.title}
                        </h4>
                        <p className="text-sm text-muted leading-relaxed">{exp.desc}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.stack.map(s => (
                          <span key={s} className="text-xs font-medium text-muted bg-bg border border-border px-2.5 py-1 rounded-md">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t sm:border-t-0 sm:border-l border-border p-6 flex items-center justify-center bg-bg/20">
                      <Link
                        to="/contact"
                        className="relative z-20 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 text-sm font-bold transition-all shadow-md shadow-primary/20 cursor-pointer"
                      >
                        Collaborate
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT_SECTION}
                className="rounded-xl border border-dashed border-border p-8 flex flex-col items-center justify-center text-center space-y-2 transition-all hover:border-primary/20 group"
              >
                <Plus className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                <p className="text-xs text-muted font-medium">New experiment spinning up...</p>
              </motion.div>
            </div>

            {/* Building in Public Posts */}
            <div className="space-y-4 pt-6 border-t border-border">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Latest from the Lab
              </h3>
              <div className="space-y-3">
                {buildingInPublicPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blogs?search=${post.id}`}
                    className="block p-4 rounded-lg border border-border bg-surface hover:border-primary/30 hover:bg-surfaceHighlight transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5">
                        <h4 className="text-sm font-bold text-txt group-hover:text-primary transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted line-clamp-2">{post.excerpt}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors shrink-0" />
                    </div>
                    <div className="flex items-center gap-3 mt-3 text-[10px] text-muted/50 font-medium">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-muted/30" />
                      <span>{post.readTime} read</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Live Log Feed */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Live Feed
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-8 pl-10 relative">
                {LOGS.slice(0, 4).map((log, i) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VIEWPORT_SECTION}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-surface border-2 border-primary shadow-[0_0_8px_rgba(251,146,60,0.4)]" />
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[10px] font-bold txt-mono text-primary uppercase tracking-wider">{log.module}</span>
                        <span className="text-[10px] text-muted font-medium">{log.date}</span>
                      </div>
                      <h5 className="text-sm font-bold text-txt leading-tight">{log.action}</h5>
                      <p className="text-[12px] text-muted leading-relaxed italic border-l-2 border-border pl-3 mt-2">
                        "{log.details}"
                      </p>
                      <div className="pt-2">
                        <span className="text-[9px] font-mono text-muted/40 uppercase tracking-tighter bg-surface px-1.5 py-0.5 rounded border border-border">
                          commit: {log.hash}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Explore CTA */}
          <div className="flex justify-center pt-4">
            <Link to="/labs" className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-1">
              Try live demos → <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
