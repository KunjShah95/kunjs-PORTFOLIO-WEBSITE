import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
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

function WritingSection({ blogs }: { blogs: typeof BLOGS }) {
  const [lead, ...rest] = blogs
  if (!lead) return null

  return (
    <section id="writing" className="relative border-t border-rule/10 py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-4xl font-semibold leading-[0.96] tracking-[-0.05em] text-ink-primary md:text-5xl">
            Notes from shipping.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ink-secondary">
            Long-form essays on AI engineering, agents, and production systems.
          </p>
          <Link
            to="/blogs"
            className="group mx-auto mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-secondary transition-colors hover:text-accent"
          >
            All essays <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7"
          >
            <div className="flex min-h-[320px] flex-col justify-between rounded-2xl border border-rule/10 bg-elevated p-6 text-center transition-all hover:border-accent/30 hover:-translate-y-0.5 sm:p-8">
              <div>
                <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[10px]">
                  <span className="uppercase tracking-wider text-accent">{lead.category}</span>
                  <span className="text-ink-quaternary">/</span>
                  <span className="text-ink-tertiary">{lead.date} · {lead.readTime} min read</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-ink-primary md:text-3xl">
                  <Link to={`/blogs/${lead.slug}`} className="transition-colors hover:text-accent">
                    {lead.title}
                  </Link>
                </h3>
                <p className="mx-auto mt-4 max-w-prose text-sm leading-6 text-ink-secondary">
                  {lead.excerpt}
                </p>
              </div>
              <Link
                to={`/blogs/${lead.slug}`}
                className="mt-6 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
              >
                Read essay →
              </Link>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4 md:col-span-5">
            {rest.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-1 flex-col justify-between rounded-2xl border border-rule/10 bg-elevated p-5 text-center transition-all hover:border-accent/30 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-center gap-2 font-mono text-[10px]">
                    <span className="uppercase tracking-wider text-accent">{blog.category}</span>
                    <span className="text-ink-quaternary">/</span>
                    <span className="text-ink-tertiary">{blog.date}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-tight tracking-tight text-ink-primary">
                    <Link to={`/blogs/${blog.slug}`} className="transition-colors hover:text-accent">
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-secondary">{blog.excerpt}</p>
                </div>
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="mt-4 inline-flex items-center justify-center gap-1 border-t border-rule/10 pt-3 text-xs font-medium text-accent transition-colors hover:text-accent-hover"
                >
                  Read →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Home() {
  const latestBlogs = [...BLOGS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3)

  return (
    <div>
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
      <WritingSection blogs={latestBlogs} />
      <FinalCTA />
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center space-y-4 py-20">
      <SEO
        title="Page Not Found - Kunj Shah"
        description="The page you are looking for does not exist or has been moved. Return to the home page or browse projects and writing."
        url={`${SITE_URL}/404`}
      />
      <h1 className="text-6xl font-bold font-display text-ink-primary">404</h1>
      <p className="text-ink-secondary text-lg">Page not found</p>
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium"><Link to="/" className="text-accent hover:underline">Return home</Link><Link to="/projects" className="text-ink-secondary hover:text-ink-primary">Browse work</Link><Link to="/blogs" className="text-ink-secondary hover:text-ink-primary">Read writing</Link></div>
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
