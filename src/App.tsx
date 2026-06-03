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
          <div className="text-center mb-12">
            <div className="kicker">04 · Writing</div>
            <h2 className="display text-4xl md:text-5xl mt-3 max-w-2xl mx-auto">Latest essays</h2>
            <p className="mt-4 text-ink-secondary max-w-xl mx-auto">
              Long-form notes on AI architecture, agentic systems, and what I&rsquo;m learning by shipping.
            </p>
            <div className="mt-6">
              <Link to="/blogs" className="group inline-flex items-center gap-2 text-sm text-ink-secondary hover:text-ink-primary">
                All essays &rarr;
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule/12">
            {latestBlogs.map((blog, i) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-paper p-8 flex flex-col group"
              >
                <div className="flex items-center justify-between">
                  <span className="kicker text-accent">{blog.category}</span>
                  <span className="kicker">{blog.date}</span>
                </div>
                <h3 className="display text-2xl mt-4 leading-tight flex-1">
                  <Link to={`/blogs/${blog.slug}`} className="group-hover:text-accent transition-colors">
                    {blog.title}
                  </Link>
                </h3>
                <p className="mt-4 text-sm text-ink-secondary line-clamp-3">{blog.excerpt}</p>
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="mt-6 pt-4 border-t border-rule/12 inline-flex items-center gap-1.5 text-sm group-hover:text-accent transition-colors"
                >
                  Read essay &rarr;
                </Link>
              </motion.article>
            ))}
          </div>
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
