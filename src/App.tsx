import { Suspense, lazy } from 'react'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/ThemeProvider'
import { Layout } from './components/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingSpinner } from './components/LoadingSpinner'
import { ScrollToTop } from './components/ScrollToTop'
import { useWebMCP } from './hooks/useWebMCP'

// Eager load critical components for Home
import { Hero } from './components/Hero'
import { FeaturedProjects } from './components/FeaturedProjects'
import { FinalCTA } from './components/FinalCTA'
import { Testimonials } from './components/Testimonials'
import { SEO } from './components/SEO'
import { InitialLoader } from './components/InitialLoader'
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

function Home() {
  return (
    <div className="space-y-0">
      <SEO
        title="Kunj Shah | AI Engineer & Agent Builder"
        description="Kunj Shah is an AI engineer and agent builder in Ahmedabad, India. Portfolio of generative AI systems, autonomous agents, computer vision, and full-stack prototypes—Python, FastAPI, React, LangChain, and MLOps-style delivery."
        faqItems={PORTFOLIO_FAQ}
      />
      <Hero />
      <FeaturedProjects />
      <Testimonials />
      <FinalCTA />
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
                    <Route path="/skills" element={<Navigate to="/" replace />} />
                    <Route path="/labs" element={<LabsPage />} />
                    <Route path="/hackathons" element={<HackathonsPage />} />
                    <Route path="/blogs" element={<BlogsPage />} />
                    <Route path="/blogs/:slug" element={<BlogDetailPage />} />
                    <Route path="/contact" element={<ContactPage />} />
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
