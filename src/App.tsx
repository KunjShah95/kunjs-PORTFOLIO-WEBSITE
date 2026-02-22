import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/ThemeProvider'
import { Layout } from './components/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingSpinner } from './components/LoadingSpinner'

// Eager load critical components for Home
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Education } from './components/Education'
import { ResearchLabs } from './components/ResearchLabs'
import { Experience } from './components/Experience'
import { Writing } from './components/Writing'
import { AIVideoCreation } from './components/AIVideoCreation'
import { ResearcherLive } from './components/ResearcherLive'
import { Contact } from './components/Contact'
import { SEO } from './components/SEO'
import { InitialLoader } from './components/InitialLoader'

// Lazy load secondary pages
const BlogsPage = lazy(() => import('./pages/BlogsPage').then(module => ({ default: module.BlogsPage })))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(module => ({ default: module.ProjectsPage })))
const SkillsPage = lazy(() => import('./pages/SkillsPage').then(module => ({ default: module.SkillsPage })))
const LabsPage = lazy(() => import('./pages/LabsPage').then(module => ({ default: module.LabsPage })))
const EducationPage = lazy(() => import('./pages/EducationPage').then(module => ({ default: module.EducationPage })))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage').then(module => ({ default: module.ExperiencePage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })))
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })))
const AIVideoPage = lazy(() => import('./pages/AIVideoPage').then(module => ({ default: module.AIVideoPage })))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then(module => ({ default: module.ProjectDetailPage })))
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage').then(module => ({ default: module.BlogDetailPage })))

function Home() {
  return (
    <div className="space-y-0">
      <SEO title="Kunj Shah | AI Engineer & Agent Builder" />
      <Hero />
      <Experience />
      <AIVideoCreation />
      <Projects />
      <ResearcherLive />
      <Skills />
      <ResearchLabs />
      <Writing />
      <Education />
      <Contact />
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <InitialLoader />
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
                  <Route path="/experience" element={<ExperiencePage />} />
                  <Route path="/blogs" element={<BlogsPage />} />
                  <Route path="/blogs/:slug" element={<BlogDetailPage />} />
                  <Route path="/education" element={<EducationPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/ai-videos" element={<AIVideoPage />} />
                </Routes>
              </Suspense>
            </Layout>
          </ErrorBoundary>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  )
}

export default App;
