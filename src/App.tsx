import { Suspense, lazy } from 'react'
import { motion, MotionConfig } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from './components/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingSpinner } from './components/LoadingSpinner'
import { ScrollToTop } from './components/ScrollToTop'
import { useWebMCP } from './hooks/useWebMCP'

// Eager load critical components for Home
import { Hero } from './components/Hero'
import { FeaturedProjects } from './components/FeaturedProjects'
import { FeaturedHackathon } from './components/FeaturedHackathon'
import { GitHubProfile } from './components/GitHubProfile'
import { FinalCTA } from './components/FinalCTA'
import { SEO } from './components/SEO'
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

function Home() {
  const latestBlogs = BLOGS.slice(0, 3);

  return (
    <div className="space-y-0">
      <SEO
        title="Kunj Shah | AI Engineer & Agent Builder"
        description="Kunj Shah is an AI engineer and agent builder specializing in autonomous systems, agentic workflows, and LLM orchestration. See my portfolio of production-grade AI implementations."
        faqItems={PORTFOLIO_FAQ}
      />
      <Hero />
      <FeaturedProjects />
      <FeaturedHackathon />

      <GitHubProfile />

      <section id="writing" className="py-24 md:py-32">
        <div className="max-w-manifest mx-auto px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="kicker">04 · Writing</div>
              <h2 className="display text-4xl md:text-5xl mt-3 max-w-2xl">Long-form notes from shipping.</h2>
            </div>
            <Link
              to="/blogs"
              className="group inline-flex items-center gap-2 text-sm text-ink-secondary hover:text-ink-primary self-start md:self-auto"
            >
              All essays
              <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>

          {latestBlogs.length > 0 && (() => {
            const [lead, ...rest] = latestBlogs;
            return (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-rule/12">
                {/* Hero essay — full row on mobile, 8 cols on desktop */}
                <motion.article
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="md:col-span-8 bg-paper p-8 md:p-12 flex flex-col group min-h-[280px]"
                >
                  <div className="flex items-center gap-4">
                    <span className="kicker">{lead.category}</span>
                    <span className="font-mono text-xs text-ink-quaternary">·</span>
                    <span className="kicker">{lead.date}</span>
                    <span className="font-mono text-xs text-ink-quaternary">·</span>
                    <span className="kicker">{lead.readTime} min read</span>
                  </div>
                  <h3 className="display text-3xl md:text-5xl mt-6 leading-[0.95] tracking-tightest flex-1">
                    <Link to={`/blogs/${lead.slug}`} className="hover:underline decoration-ink-primary/30 underline-offset-8 decoration-1">
                      {lead.title}
                    </Link>
                  </h3>
                  <p className="mt-6 text-base md:text-lg text-ink-secondary leading-relaxed max-w-2xl">
                    {lead.excerpt}
                  </p>
                  <Link
                    to={`/blogs/${lead.slug}`}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink-primary self-start"
                  >
                    Read essay
                    <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                  </Link>
                </motion.article>

                {/* Supporting essays — stacked on the right */}
                <div className="md:col-span-4 flex flex-col gap-px bg-rule/12">
                  {rest.map((blog, i) => (
                    <motion.article
                      key={blog.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                      className="bg-paper p-6 md:p-8 flex-1 flex flex-col group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="kicker">{blog.category}</span>
                        <span className="font-mono text-xs text-ink-quaternary">·</span>
                        <span className="kicker">{blog.date}</span>
                      </div>
                      <h3 className="display text-xl md:text-2xl mt-4 leading-tight flex-1">
                        <Link to={`/blogs/${blog.slug}`} className="hover:underline decoration-ink-primary/30 underline-offset-4 decoration-1">
                          {blog.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-sm text-ink-secondary line-clamp-2">{blog.excerpt}</p>
                      <Link
                        to={`/blogs/${blog.slug}`}
                        className="mt-4 pt-4 border-t border-rule/12 inline-flex items-center gap-1.5 text-sm text-ink-secondary group-hover:text-ink-primary transition-colors"
                      >
                        Read
                        <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                      </Link>
                    </motion.article>
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
