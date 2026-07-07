import { Suspense, lazy } from 'react'
import { ArrowUpRight, Database, Workflow, Cpu, Code } from 'lucide-react'
import { motion, MotionConfig } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from './components/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingSpinner } from './components/LoadingSpinner'
import { ScrollToTop } from './components/ScrollToTop'
import { useWebMCP } from './hooks/useWebMCP'

// Eager load critical components for Home
import { BentoHero } from './components/BentoHero'
import { ServicesSection } from './components/ServicesSection'
import { ProcessSection } from './components/ProcessSection'
import { ProofBar } from './components/ProofBar'
import { FeaturedProjects } from './components/FeaturedProjects'
import { GitHubProfile } from './components/GitHubProfile'
import { FinalCTA } from './components/FinalCTA'
import {
  SpotlightCard,
  BackgroundBeams,
  GradientOrb,
  LiquidGlass,
  TiltCard,
  CountUp,
} from './components/effects'
import { SEO } from './components/SEO'
import { SITE_URL } from './lib/site'
import { InitialLoader } from './components/InitialLoader'
import { BLOGS } from './data/portfolio'
import { PORTFOLIO_FAQ } from './data/seo-faq'
import { useGitHubPRs } from './hooks/useGitHubPRs'

// Lazy load secondary pages
const BlogsPage = lazy(() => import('./pages/BlogsPage').then(module => ({ default: module.BlogsPage })))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(module => ({ default: module.ProjectsPage })))
const LabsPage = lazy(() => import('./pages/LabsPage').then(module => ({ default: module.LabsPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })))
const HackathonsPage = lazy(() => import('./pages/HackathonsPage').then(module => ({ default: module.HackathonsPage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then(module => ({ default: module.ProjectDetailPage })))
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage').then(module => ({ default: module.BlogDetailPage })))
const SkillsPage = lazy(() => import('./pages/SkillsPage').then(module => ({ default: module.SkillsPage })))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage').then(module => ({ default: module.ExperiencePage })))
const EducationPage = lazy(() => import('./pages/EducationPage').then(module => ({ default: module.EducationPage })))

function Home() {
  const latestBlogs = BLOGS.slice(0, 3)
  const { contributions, stats: liveStats } = useGitHubPRs()

  return (
    <div className="space-y-0">
      <SEO
        title="Kunj Shah | AI Engineer & Agent Builder — AI Agents, Web Apps & APIs"
        description="Kunj Shah is an AI engineer and agent builder in Ahmedabad shipping production AI agents, LLM pipelines, web apps, and APIs. Autonomous agents, RAG, LangChain, FastAPI, React."
        faqItems={PORTFOLIO_FAQ}
      />
      <BentoHero />
      <ServicesSection />
      <ProcessSection />

      {/* How I Build AI Systems — Engineering Architecture Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-sunken/10 border-t border-rule/12">
        <GradientOrb size={400} className="top-[-120px] left-[-80px] opacity-30" />
        <div className="relative max-w-manifest mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <div className="kicker text-accent font-semibold">02.2 · How I Build</div>
            <h2 className="display text-4xl md:text-5xl mt-3 max-w-3xl font-bold leading-[1.05]">Systems I build, from the inside out.</h2>
            <p className="mt-4 text-base text-ink-secondary max-w-2xl leading-relaxed">
              Architecture matters more than frameworks. Here is how I design the AI systems I ship.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* RAG Pipeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <TiltCard scale={1.01} maxRotation={3}>
                <SpotlightCard className="h-full rounded-2xl">
                  <LiquidGlass intensity="subtle" tint="rgba(124, 118, 255, 0.08)" className="p-6 md:p-8 h-full border border-rule/12 hover:border-accent/30 transition-all group">
                    <div className="flex items-center gap-2 mb-5">
                      <Database className="w-4 h-4 text-accent" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent font-bold">RAG Pipeline</span>
                    </div>
                    <div className="space-y-2.5 font-mono text-[13px] leading-relaxed">
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8">
                        <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">1</span>
                        <span className="text-ink-secondary">Documents → Chunking → Embedding</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8 ml-4">
                        <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">2</span>
                        <span className="text-ink-secondary">Vector store (ChromaDB) → Similarity search</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8 ml-8">
                        <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">3</span>
                        <span className="text-ink-secondary">Retrieved context + Query → LLM generation</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8 ml-12">
                        <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">4</span>
                        <span className="text-ink-secondary">Grounded answer with source citations</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-rule/8">
                      <span className="font-mono text-[10px] text-ink-tertiary">ChromaDB · LangChain · Multi-provider LLM · Hybrid search</span>
                    </div>
                  </LiquidGlass>
                </SpotlightCard>
              </TiltCard>
            </motion.div>

            {/* Multi-Agent System */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <TiltCard scale={1.01} maxRotation={3}>
                <SpotlightCard className="h-full rounded-2xl">
                  <LiquidGlass intensity="subtle" tint="rgba(6, 182, 212, 0.08)" className="p-6 md:p-8 h-full border border-rule/12 hover:border-accent/30 transition-all group">
                    <div className="flex items-center gap-2 mb-5">
                      <Workflow className="w-4 h-4 text-accent" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent font-bold">Multi-Agent Architecture</span>
                    </div>
                    <div className="space-y-2.5 font-mono text-[13px] leading-relaxed">
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8">
                        <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">M</span>
                        <span className="text-ink-secondary">Manager agent: decomposes goals → task graph</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8 ml-4">
                        <span className="w-6 h-6 rounded-md bg-cyan-500/10 flex items-center justify-center text-[10px] font-bold text-cyan-400">W</span>
                        <span className="text-ink-secondary">Worker agents: parallel execution with tool access</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8 ml-4">
                        <span className="w-6 h-6 rounded-md bg-amber-500/10 flex items-center justify-center text-[10px] font-bold text-amber-400">G</span>
                        <span className="text-ink-secondary">Guardrails: eval → HITL gates → fallback</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8 ml-8">
                        <span className="w-6 h-6 rounded-md bg-live/10 flex items-center justify-center text-[10px] font-bold text-live">✓</span>
                        <span className="text-ink-secondary">Checkpointing + state persistence (Postgres JSONB)</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-rule/8">
                      <span className="font-mono text-[10px] text-ink-tertiary">LangGraph · CrewAI · Supervisor/Worker pattern · Postgres state</span>
                    </div>
                  </LiquidGlass>
                </SpotlightCard>
              </TiltCard>
            </motion.div>

            {/* Edge CV Pipeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <TiltCard scale={1.01} maxRotation={3}>
                <SpotlightCard className="h-full rounded-2xl">
                  <LiquidGlass intensity="subtle" tint="rgba(34, 197, 94, 0.08)" className="p-6 md:p-8 h-full border border-rule/12 hover:border-accent/30 transition-all group">
                    <div className="flex items-center gap-2 mb-5">
                      <Cpu className="w-4 h-4 text-accent" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent font-bold">Edge Computer Vision</span>
                    </div>
                    <div className="space-y-2.5 font-mono text-[13px] leading-relaxed">
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8">
                        <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">1</span>
                        <span className="text-ink-secondary">GStreamer pipeline: HW-accelerated video decode</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8 ml-4">
                        <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">2</span>
                        <span className="text-ink-secondary">CUDA preprocess → TensorRT INT8 inference</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8 ml-8">
                        <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">3</span>
                        <span className="text-ink-secondary">NMS post-process → Defect classification</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8 ml-12">
                        <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">4</span>
                        <span className="text-ink-secondary">Alert → API → Dashboard (sub-100ms end-to-end)</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-rule/8">
                      <span className="font-mono text-[10px] text-ink-tertiary">C++ · TensorRT · YOLOv8 · Jetson Orin · QAT INT8</span>
                    </div>
                  </LiquidGlass>
                </SpotlightCard>
              </TiltCard>
            </motion.div>

            {/* Tokenizer / Transformer internals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TiltCard scale={1.01} maxRotation={3}>
                <SpotlightCard className="h-full rounded-2xl">
                  <LiquidGlass intensity="subtle" tint="rgba(168, 85, 247, 0.08)" className="p-6 md:p-8 h-full border border-rule/12 hover:border-accent/30 transition-all group">
                    <div className="flex items-center gap-2 mb-5">
                      <Code className="w-4 h-4 text-accent" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent font-bold">LLM Internals: BPE Tokenizer</span>
                    </div>
                    <div className="space-y-2.5 font-mono text-[13px] leading-relaxed">
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8">
                        <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">1</span>
                        <span className="text-ink-secondary">Pre-tokenize: regex split (GPT-2/4 pattern)</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8 ml-4">
                        <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">2</span>
                        <span className="text-ink-secondary">BPE merge: learn ~50K merge rules from corpus</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8 ml-8">
                        <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">3</span>
                        <span className="text-ink-secondary">Encode: apply merges → token IDs</span>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-accent/5 border border-rule/8 ml-12">
                        <span className="w-6 h-6 rounded-md bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent">4</span>
                        <span className="text-ink-secondary">Decode: token IDs → byte sequences → text</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-rule/8">
                      <span className="font-mono text-[10px] text-ink-tertiary">Pure Python implementation · 15% token reduction on technical data</span>
                    </div>
                  </LiquidGlass>
                </SpotlightCard>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      <ProofBar />
      <FeaturedProjects />

      <section id="open-source" className="relative py-24 md:py-32 overflow-hidden border-t border-rule/12 bg-sunken/10">
        <BackgroundBeams count={3} className="opacity-30" />
        <div className="relative max-w-manifest mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <div className="kicker text-accent font-semibold">02.5 · Open source</div>
              <h2 className="display text-4xl md:text-5xl mt-3 max-w-2xl font-bold leading-[1.05]">Shipping in other people&rsquo;s repos too.</h2>
            </div>
            <p className="text-sm text-ink-secondary max-w-xs self-start md:self-auto md:text-right">
              Real work in {liveStats.orgs.join(', ')} and {liveStats.projects}+ more —
              verified on GitHub.
            </p>
          </motion.div>

          {/* Liquid glass stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {([
              [liveStats.mergedPRs, 'merged PRs', false, 'rgba(124, 118, 255, 0.1)'],
              [liveStats.openedIssues, 'issues opened', false, 'rgba(6, 182, 212, 0.1)'],
              [liveStats.totalPRs, 'total PRs', false, 'rgba(168, 85, 247, 0.1)'],
              [liveStats.projects, 'external projects', true, 'rgba(34, 197, 94, 0.1)'],
            ] as [number, string, boolean, string][]).map(([n, l, isCount, tint], i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <TiltCard scale={1.02} maxRotation={5}>
                  <LiquidGlass intensity="subtle" tint={tint} className="p-5 md:p-6 border border-rule/12 rounded-2xl">
                    <div className="display text-3xl md:text-4xl text-accent font-extrabold tabular-nums">
                      <CountUp value={n} duration={1} suffix={isCount ? '+' : ''} />
                    </div>
                    <div className="kicker mt-2 text-ink-secondary">{l}</div>
                  </LiquidGlass>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="kicker">Contributions</span>
              <span className="font-mono text-xs text-ink-tertiary">{contributions.length} total</span>
            </div>
            
            <div className="divide-y divide-rule/8 rounded-2xl border border-rule/12 overflow-hidden bg-paper/20 backdrop-blur-sm">
              {contributions.map((c, i) => (
                <motion.div
                  key={c.url}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-2 py-5 px-6 md:flex-row md:items-center md:gap-6 hover:bg-accent/5 transition-colors relative"
                  >
                    {/* Hover border-left accent indicator */}
                    <span className="absolute left-0 inset-y-0 w-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center gap-3 md:w-44 md:shrink-0">
                      {c.notable && (
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
                      )}
                      <span className="display text-base font-bold text-ink-primary group-hover:text-accent transition-colors">
                        {c.label}
                      </span>
                    </div>
                    <p className="flex-1 text-sm text-ink-secondary leading-relaxed group-hover:text-ink-primary transition-colors">{c.title}</p>
                    <div className="flex items-center gap-2 font-mono text-xs text-ink-tertiary md:w-36 md:justify-end shrink-0">
                      <span className="px-2 py-0.5 rounded bg-paper/60 border border-rule/8 text-[10px]">
                        {c.kind === 'merged' ? 'merged' : 'proposed'}
                      </span>
                      <span>&middot;</span>
                      <span className="text-accent">{c.tag}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-accent ml-1" />
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <GitHubProfile />

      <section id="writing" className="relative py-24 md:py-32 overflow-hidden bg-sunken/5">
        <GradientOrb size={350} className="top-[-80px] right-[-60px] opacity-40" />
        <div className="relative max-w-manifest mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <div className="kicker text-accent font-semibold">03 · Writing</div>
              <h2 className="display text-4xl md:text-5xl mt-3 max-w-2xl font-bold leading-[1.05]">Long-form notes from shipping.</h2>
            </div>
            <Link
              to="/blogs"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover self-start md:self-auto transition-colors"
            >
              All essays
              <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </motion.div>

          {latestBlogs.length > 0 && (() => {
            const [lead, ...rest] = latestBlogs;
            return (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                {/* Hero essay */}
                <div className="md:col-span-8">
                  <TiltCard scale={1.01} maxRotation={3}>
                    <SpotlightCard className="h-full rounded-3xl">
                      <LiquidGlass
                        intensity="medium"
                        tint="rgba(124, 118, 255, 0.1)"
                        className="p-8 md:p-12 flex flex-col justify-between min-h-[380px] border border-rule/12 hover:border-accent/30 group transition-all"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-3 text-xs">
                            <span className="kicker text-accent">{lead.category}</span>
                            <span className="font-mono text-ink-quaternary">·</span>
                            <span className="kicker text-ink-secondary">{lead.date}</span>
                            <span className="font-mono text-ink-quaternary">·</span>
                            <span className="kicker text-ink-secondary">{lead.readTime} min read</span>
                          </div>
                          <h3 className="display text-3xl md:text-5xl mt-6 leading-[1.02] tracking-tightest font-bold">
                            <Link to={`/blogs/${lead.slug}`} className="hover:text-accent transition-colors">
                              {lead.title}
                            </Link>
                          </h3>
                          <p className="mt-6 text-base md:text-lg text-ink-secondary leading-relaxed max-w-2xl">
                            {lead.excerpt}
                          </p>
                        </div>
                        <div className="mt-8">
                          <Link
                            to={`/blogs/${lead.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors group/link"
                          >
                            Read essay
                            <span className="inline-block transition-transform group-hover/link:translate-x-1">&rarr;</span>
                          </Link>
                        </div>
                      </LiquidGlass>
                    </SpotlightCard>
                  </TiltCard>
                </div>

                {/* Supporting essays */}
                <div className="md:col-span-4 flex flex-col gap-6 md:gap-8">
                  {rest.map((blog) => (
                    <div key={blog.id} className="flex-1 flex">
                      <TiltCard scale={1.015} maxRotation={4} className="w-full flex">
                        <SpotlightCard className="w-full rounded-3xl flex">
                          <LiquidGlass
                            intensity="subtle"
                            tint="rgba(6, 182, 212, 0.08)"
                            className="p-6 md:p-8 flex flex-col justify-between w-full border border-rule/12 hover:border-accent/30 group transition-all"
                          >
                            <div>
                              <div className="flex items-center gap-3 text-xs">
                                <span className="kicker text-accent">{blog.category}</span>
                                <span className="font-mono text-ink-quaternary">·</span>
                                <span className="kicker text-ink-secondary">{blog.date}</span>
                              </div>
                              <h3 className="display text-xl md:text-2xl mt-4 leading-tight font-bold">
                                <Link to={`/blogs/${blog.slug}`} className="hover:text-accent transition-colors">
                                  {blog.title}
                                </Link>
                              </h3>
                              <p className="mt-3 text-sm text-ink-secondary line-clamp-3 leading-relaxed">{blog.excerpt}</p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-rule/8">
                              <Link
                                to={`/blogs/${blog.slug}`}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors group/link2"
                              >
                                Read
                                <span className="inline-block transition-transform group-hover/link2:translate-x-0.5">&rarr;</span>
                              </Link>
                            </div>
                          </LiquidGlass>
                        </SpotlightCard>
                      </TiltCard>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      <FinalCTA />
    </div>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4 pt-20">
      <SEO
        title="Page Not Found — Kunj Shah"
        description="The page you are looking for does not exist or has been moved. Return to the home page or browse projects and writing."
        url={`${SITE_URL}/404`}
      />
      <h1 className="text-6xl font-bold text-txt font-display">404</h1>
      <p className="text-muted text-lg">Page not found</p>
      <Link to="/" className="text-primary hover:underline text-sm font-medium">Return home</Link>
    </div>
  )
}

function App() {
  useWebMCP();

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <InitialLoader />
        <MotionConfig reducedMotion="user">
          <ErrorBoundary>
            <Layout>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                  <Route path="/skills" element={<SkillsPage />} />
                  <Route path="/labs" element={<LabsPage />} />
                  <Route path="/hackathons" element={<HackathonsPage />} />
                  <Route path="/blogs" element={<BlogsPage />} />
                  <Route path="/blogs/:slug" element={<BlogDetailPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/experience" element={<ExperiencePage />} />
                  <Route path="/education" element={<EducationPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
          </ErrorBoundary>
        </MotionConfig>
      </Router>
    </HelmetProvider>
  )
}

export default App;
