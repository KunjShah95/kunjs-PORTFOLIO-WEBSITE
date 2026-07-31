import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Database, Workflow, Code } from 'lucide-react'
import { Layout } from './components/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingSpinner } from './components/LoadingSpinner'
import { ScrollToTop } from './components/ScrollToTop'
import { useWebMCP } from './hooks/useWebMCP'

// Eager load critical components for Home
import { BentoHero } from './components/BentoHero'
import { TechMarquee } from './components/TechMarquee'
import { ServicesSection } from './components/ServicesSection'
import { FeaturedProjects } from './components/FeaturedProjects'
import { FinalCTA } from './components/FinalCTA'
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
        title="Kunj Shah | AI Engineer & Agent Builder - Autonomous Agents, LLMs & Production AI Systems"
        description="Kunj Shah is an AI engineer and agent builder in Ahmedabad building production AI systems — autonomous agents, LLM orchestration, RAG pipelines, edge computer vision, and full-stack AI applications. 12+ shipped projects, 44+ open-source PRs, 4 hackathon finals."
        faqItems={PORTFOLIO_FAQ}
        datePublished="2024-01-15"
        dateModified="2026-07-30"
      />
      <BentoHero />
      <TechMarquee />
      <FeaturedProjects />

      <ServicesSection />

      {/* How I Build AI Systems */}
      <section className="relative py-24 md:py-32 border-t border-rule/10">
        <div className="relative max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <h2 className="display text-4xl md:text-5xl leading-[1.05] max-w-3xl font-semibold">Inside the stack.</h2>
            <p className="mt-3 text-base text-ink-secondary max-w-2xl leading-relaxed">
              How I design the AI systems I ship, from data to deployment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: Database,
                title: 'RAG Pipeline',
                steps: ['Documents / Chunking / Embedding', 'Vector store (ChromaDB) / Similarity search', 'Retrieved context + Query / LLM generation', 'Grounded answer with source citations'],
                tags: 'ChromaDB / LangChain / Multi-provider LLM / Hybrid search',
              },
              {
                icon: Workflow,
                title: 'Multi-Agent Architecture',
                steps: ['Manager agent: decomposes goals into task graph', 'Worker agents: parallel execution with tool access', 'Guardrails: eval / HITL gates / fallback', 'Checkpointing + state persistence (Postgres JSONB)'],
                tags: 'LangGraph / CrewAI / Supervisor/Worker pattern / Postgres state',
              },
              {
                icon: Code,
                title: 'Full-Stack AI App',
                steps: ['React / Next.js frontend / FastAPI / Python backend', 'PostgreSQL + Redis for state and caching', 'Multi-provider LLM orchestration with fallback chain', 'CI/CD deploy on Vercel + Render with Docker'],
                tags: 'React / FastAPI / PostgreSQL / Docker / Vercel + Render',
              },
              {
                icon: Code,
                title: 'LLM Internals: BPE Tokenizer',
                steps: ['Pre-tokenize: regex split (GPT-2/4 pattern)', 'BPE merge: learn ~50K merge rules from corpus', 'Encode: apply merges into token IDs', 'Decode: token IDs into byte sequences into text'],
                tags: 'Pure Python implementation / 15% token reduction on technical data',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="rounded-xl border border-rule/10 bg-elevated p-6 md:p-8 hover:border-accent/25 transition-all group"
              >
                <div className="flex items-center gap-2 mb-5">
                  <item.icon className="w-4 h-4 text-accent" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink-tertiary">{item.title}</span>
                </div>
                <div className="space-y-2.5 font-mono text-[13px] leading-relaxed">
                  {item.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-accent/40 shrink-0 tabular-nums w-4">{i + 1}.</span>
                      <span className="text-ink-secondary">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-rule/10">
                  <span className="font-mono text-[10px] text-ink-tertiary">{item.tags}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section id="open-source" className="relative py-24 md:py-32 border-t border-rule/10">
        <div className="relative max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <h2 className="display text-4xl md:text-5xl leading-[1.05] max-w-2xl font-semibold">Open source contributions.</h2>
              <p className="mt-3 text-base text-ink-secondary max-w-2xl leading-relaxed">
                Real work in {liveStats.orgs.join(', ')} and {liveStats.projects}+ more verified on GitHub.
              </p>
            </div>
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              [liveStats.mergedPRs, 'merged PRs', ''],
              [liveStats.openedIssues, 'issues opened', ''],
              [liveStats.totalPRs, 'total PRs', ''],
              [liveStats.projects, 'external projects', '+'],
            ].map(([n, label, suffix]) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-5 rounded-xl border border-rule/10 bg-elevated"
              >
                <div className="display text-3xl text-accent font-bold tabular-nums leading-none">
                  {n}{suffix as string}
                </div>
                <div className="mt-2 font-mono text-[11px] text-ink-tertiary">{label}</div>
              </motion.div>
            ))}
          </div>

          {/* Contributions list */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-5">
              <span className="kicker">Recent contributions</span>
              <span className="font-mono text-[10px] text-ink-tertiary">{contributions.length} total</span>
            </div>

            <div className="divide-y divide-rule/10 rounded-xl border border-rule/10 overflow-hidden">
              {contributions.map((c, i) => (
                <motion.div
                  key={c.url}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1.5 py-4 px-5 md:flex-row md:items-center md:gap-5 hover:bg-accent/5 transition-colors relative"
                  >
                    <span className="absolute left-0 inset-y-0 w-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center gap-2.5 md:w-44 md:shrink-0">
                      {c.notable && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
                      )}
                      <span className="display text-sm font-semibold text-ink-primary group-hover:text-accent transition-colors">
                        {c.label}
                      </span>
                    </div>
                    <p className="flex-1 text-sm text-ink-secondary leading-relaxed group-hover:text-ink-primary transition-colors">{c.title}</p>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-ink-tertiary md:w-32 md:justify-end shrink-0">
                      <span className="px-1.5 py-0.5 rounded bg-sunken/60 border border-rule/10">{c.kind}</span>
                      <span className="text-accent">{c.tag}</span>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Writing */}
      <section id="writing" className="relative py-24 md:py-32 border-t border-rule/10">
        <div className="relative max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <h2 className="display text-4xl md:text-5xl leading-[1.05] max-w-2xl font-semibold">Notes from shipping.</h2>
              <p className="mt-3 text-base text-ink-secondary max-w-2xl leading-relaxed">
                Long-form essays on AI engineering, agents, and production systems.
              </p>
            </div>
            <Link
              to="/blogs"
              className="group inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover shrink-0 transition-colors"
            >
              All essays
              <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </motion.div>

          {latestBlogs.length > 0 && (() => {
            const [lead, ...rest] = latestBlogs;
            return (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Lead essay */}
                <div className="md:col-span-7">
                  <div className="h-full p-6 md:p-8 rounded-xl border border-rule/10 bg-elevated hover:border-accent/30 transition-all group hover-lift flex flex-col justify-between min-h-[340px]">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-accent">{lead.category}</span>
                        <span className="text-ink-quaternary">/</span>
                        <span className="font-mono text-[10px] text-ink-tertiary">{lead.date} &middot; {lead.readTime} min read</span>
                      </div>
                      <h3 className="display text-2xl md:text-3xl mt-5 leading-[1.05] font-semibold">
                        <Link to={`/blogs/${lead.slug}`} className="hover:text-accent transition-colors">
                          {lead.title}
                        </Link>
                      </h3>
                      <p className="mt-4 text-sm text-ink-secondary leading-relaxed max-w-2xl">
                        {lead.excerpt}
                      </p>
                    </div>
                    <div className="mt-6">
                      <Link
                        to={`/blogs/${lead.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                      >
                        Read essay
                        <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Supporting essays */}
                <div className="md:col-span-5 flex flex-col gap-6">
                  {rest.map((blog) => (
                    <div key={blog.id} className="flex-1">
                      <div className="h-full p-5 md:p-6 rounded-xl border border-rule/10 bg-elevated hover:border-accent/30 transition-all group hover-lift flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 text-xs mb-2">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-accent">{blog.category}</span>
                            <span className="text-ink-quaternary">/</span>
                            <span className="font-mono text-[10px] text-ink-tertiary">{blog.date}</span>
                          </div>
                          <h3 className="display text-lg md:text-xl leading-tight font-semibold">
                            <Link to={`/blogs/${blog.slug}`} className="hover:text-accent transition-colors">
                              {blog.title}
                            </Link>
                          </h3>
                          <p className="mt-2 text-sm text-ink-secondary line-clamp-2 leading-relaxed">{blog.excerpt}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-rule/10">
                          <Link
                            to={`/blogs/${blog.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
                          >
                            Read
                            <span className="inline-block transition-transform group-hover:translate-x-0.5">&rarr;</span>
                          </Link>
                        </div>
                      </div>
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
        title="Page Not Found - Kunj Shah"
        description="The page you are looking for does not exist or has been moved. Return to the home page or browse projects and writing."
        url={`${SITE_URL}/404`}
      />
      <h1 className="text-6xl font-bold font-display text-ink-primary">404</h1>
      <p className="text-ink-secondary text-lg">Page not found</p>
      <Link to="/" className="text-accent hover:underline text-sm font-medium">Return home</Link>
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
      </Router>
    </HelmetProvider>
  )
}

export default App
