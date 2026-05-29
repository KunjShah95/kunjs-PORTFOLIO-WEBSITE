import { Suspense, lazy } from 'react'
import { motion, MotionConfig } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ArrowRight } from 'lucide-react'
import { ThemeProvider } from './components/ThemeProvider'
import { Layout } from './components/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingSpinner } from './components/LoadingSpinner'
import { ScrollToTop } from './components/ScrollToTop'
import { useWebMCP } from './hooks/useWebMCP'

// Eager load critical components for Home
import { Hero } from './components/Hero'
import { AboutShort } from './components/AboutShort'
import { FeaturedProjects } from './components/FeaturedProjects'
import { FeaturedHackathon } from './components/FeaturedHackathon'
import { GitHubProfile } from './components/GitHubProfile'
import { CurrentlyBuilding } from './components/CurrentlyBuilding'
import { Testimonials } from './components/Testimonials'
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
      <div id="about">
        <AboutShort />
      </div>
      <CurrentlyBuilding />
      <FeaturedProjects />
      <FeaturedHackathon />
      
      {/* GitHub Stats Section */}
      <section className="section-padding bg-bg relative border-y border-border/50">
        <div className="container-aligned">
          <GitHubProfile />
        </div>
      </section>
      
      {/* Latest Writing Section */}
      <section id="writing" className="section-padding bg-bg relative border-t border-border/50">
        <div className="container-aligned">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-txt mb-4">
                Latest <span className="text-primary">Writings</span>
              </h2>
              <p className="text-lg text-muted max-w-2xl">
                Thoughts on AI architecture, agentic systems, and the future of automation.
              </p>
            </div>
            <Link 
              to="/blogs" 
              className="group inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View All Posts
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBlogs.map((blog, i) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-4 p-6 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded">
                    {blog.category}
                  </span>
                  <span className="text-[10px] font-mono text-muted uppercase">
                    {blog.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-txt group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-muted line-clamp-3 flex-1">
                  {blog.excerpt}
                </p>
                <Link 
                  to={`/blogs/${blog.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-txt group-hover:text-primary transition-colors pt-4 border-t border-border/50"
                >
                  Read More
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
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
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  )
}

export default App;
