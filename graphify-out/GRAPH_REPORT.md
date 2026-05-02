# Graph Report - .  (2026-05-02)

## Corpus Check
- 57 files · ~52,917 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 102 nodes · 55 edges · 51 communities detected
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_GitHub Profile Redesign & Hero|GitHub Profile Redesign & Hero]]
- [[_COMMUNITY_ErrorBoundary|ErrorBoundary]]
- [[_COMMUNITY_GitHubProfile|GitHubProfile]]
- [[_COMMUNITY_AIAssistant|AIAssistant]]
- [[_COMMUNITY_Layout|Layout]]
- [[_COMMUNITY_ThemeProvider|ThemeProvider]]
- [[_COMMUNITY_CommandMenu|CommandMenu]]
- [[_COMMUNITY_SEO Component|SEO Component]]
- [[_COMMUNITY_Motion Animations|Motion Animations]]
- [[_COMMUNITY_SEO Dates Library|SEO Dates Library]]
- [[_COMMUNITY_BlogDetailPage|BlogDetailPage]]
- [[_COMMUNITY_App Entry Points|App Entry Points]]
- [[_COMMUNITY_Education Component|Education Component]]
- [[_COMMUNITY_Experience Component|Experience Component]]
- [[_COMMUNITY_LoadingSpinner|LoadingSpinner]]
- [[_COMMUNITY_Music Component|Music Component]]
- [[_COMMUNITY_Navbar|Navbar]]
- [[_COMMUNITY_PortfolioFAQ|PortfolioFAQ]]
- [[_COMMUNITY_ResearcherLive|ResearcherLive]]
- [[_COMMUNITY_ScrollToTop|ScrollToTop]]
- [[_COMMUNITY_ThemeToggle|ThemeToggle]]
- [[_COMMUNITY_AIVideoPage|AIVideoPage]]
- [[_COMMUNITY_ContactPage|ContactPage]]
- [[_COMMUNITY_EducationPage|EducationPage]]
- [[_COMMUNITY_ExperiencePage|ExperiencePage]]
- [[_COMMUNITY_Home Page|Home Page]]
- [[_COMMUNITY_LabsPage|LabsPage]]
- [[_COMMUNITY_ProjectsPage|ProjectsPage]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Tailwind Config|Tailwind Config]]
- [[_COMMUNITY_Vite Config|Vite Config]]
- [[_COMMUNITY_Type Definitions|Type Definitions]]
- [[_COMMUNITY_Vite Env|Vite Env]]
- [[_COMMUNITY_AIVideoCreation|AIVideoCreation]]
- [[_COMMUNITY_Contact Component|Contact Component]]
- [[_COMMUNITY_FeaturedProjects|FeaturedProjects]]
- [[_COMMUNITY_Hero Component|Hero Component]]
- [[_COMMUNITY_InitialLoader|InitialLoader]]
- [[_COMMUNITY_Projects Component|Projects Component]]
- [[_COMMUNITY_ResearchLabs|ResearchLabs]]
- [[_COMMUNITY_Skills Component|Skills Component]]
- [[_COMMUNITY_Spotify Component|Spotify Component]]
- [[_COMMUNITY_Portfolio Data|Portfolio Data]]
- [[_COMMUNITY_SEO FAQ Data|SEO FAQ Data]]
- [[_COMMUNITY_Site Library|Site Library]]
- [[_COMMUNITY_AboutPage|AboutPage]]
- [[_COMMUNITY_BlogsPage|BlogsPage]]
- [[_COMMUNITY_HackathonsPage|HackathonsPage]]
- [[_COMMUNITY_ProjectDetailPage|ProjectDetailPage]]
- [[_COMMUNITY_SkillsPage|SkillsPage]]
- [[_COMMUNITY_OG Image|OG Image]]

## God Nodes (most connected - your core abstractions)
1. `ErrorBoundary` - 4 edges
2. `Hero Component` - 4 edges
3. `Kunj Shah Portfolio (LLM Summary)` - 3 edges
4. `fetchExternalIntel()` - 2 edges
5. `handleSend()` - 2 edges
6. `useCountUp()` - 2 edges
7. `StatCard()` - 2 edges
8. `uniqueSameAs()` - 2 edges
9. `buildJsonLd()` - 2 edges
10. `Portfolio Metrics` - 2 edges

## Surprising Connections (you probably didn't know these)
- `GitHubProfile Redesign Implementation Plan` --semantically_similar_to--> `Portfolio Metrics`  [INFERRED] [semantically similar]
  docs/superpowers/plans/2026-04-30-github-profile-redesign.md → src/components/Hero.tsx
- `Hero Component` --conceptually_related_to--> `Profile Photo`  [INFERRED]
  src/components/Hero.tsx → public/profile.png
- `Kunj Shah Portfolio (LLM Summary)` --references--> `Hero Component`  [INFERRED]
  public/llms.txt → src/components/Hero.tsx
- `Hero Component` --links_to--> `Resume Document`  [EXTRACTED]
  src/components/Hero.tsx → public/resume.pdf
- `Kunj Shah Portfolio (LLM Summary)` --references--> `Resume Document`  [EXTRACTED]
  public/llms.txt → public/resume.pdf

## Hyperedges (group relationships)
- **Portfolio SEO and Public Files** — kunj_shah_portfolio, robots_txt, og_image [INFERRED 0.75]
- **GitHubProfile Redesign Documentation** — github_profile_redesign_plan, github_profile_redesign_spec [EXTRACTED 1.00]

## Communities

### Community 0 - "GitHub Profile Redesign & Hero"
Cohesion: 0.29
Nodes (8): GitHubProfile Redesign Implementation Plan, GitHubProfile Redesign Design Spec, Hero Component, Portfolio Metrics, Kunj Shah Portfolio (LLM Summary), Profile Photo, Resume Document, Robots.txt Crawl Rules

### Community 1 - "ErrorBoundary"
Cohesion: 0.4
Nodes (1): ErrorBoundary

### Community 2 - "GitHubProfile"
Cohesion: 0.5
Nodes (2): StatCard(), useCountUp()

### Community 3 - "AIAssistant"
Cohesion: 0.67
Nodes (2): fetchExternalIntel(), handleSend()

### Community 4 - "Layout"
Cohesion: 0.5
Nodes (0): 

### Community 5 - "ThemeProvider"
Cohesion: 0.5
Nodes (0): 

### Community 6 - "CommandMenu"
Cohesion: 0.67
Nodes (0): 

### Community 7 - "SEO Component"
Cohesion: 1.0
Nodes (2): buildJsonLd(), uniqueSameAs()

### Community 8 - "Motion Animations"
Cohesion: 0.67
Nodes (0): 

### Community 9 - "SEO Dates Library"
Cohesion: 0.67
Nodes (0): 

### Community 10 - "BlogDetailPage"
Cohesion: 0.67
Nodes (0): 

### Community 11 - "App Entry Points"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Education Component"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Experience Component"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "LoadingSpinner"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Music Component"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Navbar"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "PortfolioFAQ"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "ResearcherLive"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "ScrollToTop"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "ThemeToggle"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "AIVideoPage"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "ContactPage"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "EducationPage"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "ExperiencePage"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Home Page"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "LabsPage"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "ProjectsPage"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "PostCSS Config"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Tailwind Config"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Vite Config"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Type Definitions"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Vite Env"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "AIVideoCreation"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Contact Component"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "FeaturedProjects"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Hero Component"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "InitialLoader"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Projects Component"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "ResearchLabs"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Skills Component"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Spotify Component"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Portfolio Data"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "SEO FAQ Data"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Site Library"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "AboutPage"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "BlogsPage"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "HackathonsPage"
Cohesion: 1.0
Nodes (0): 

### Community 48 - "ProjectDetailPage"
Cohesion: 1.0
Nodes (0): 

### Community 49 - "SkillsPage"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "OG Image"
Cohesion: 1.0
Nodes (1): Social Sharing Image

## Knowledge Gaps
- **4 isolated node(s):** `GitHubProfile Redesign Design Spec`, `Robots.txt Crawl Rules`, `Profile Photo`, `Social Sharing Image`
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `App Entry Points`** (2 nodes): `App.tsx`, `main.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Education Component`** (2 nodes): `Education()`, `Education.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Experience Component`** (2 nodes): `Experience()`, `Experience.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `LoadingSpinner`** (2 nodes): `LoadingSpinner()`, `LoadingSpinner.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Music Component`** (2 nodes): `Music()`, `Music.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Navbar`** (2 nodes): `Navbar()`, `Navbar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `PortfolioFAQ`** (2 nodes): `PortfolioFAQ()`, `PortfolioFAQ.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ResearcherLive`** (2 nodes): `ResearcherLive()`, `ResearcherLive.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ScrollToTop`** (2 nodes): `ScrollToTop()`, `ScrollToTop.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ThemeToggle`** (2 nodes): `ThemeToggle.tsx`, `ThemeToggle()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `AIVideoPage`** (2 nodes): `AIVideoPage()`, `AIVideoPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ContactPage`** (2 nodes): `ContactPage()`, `ContactPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `EducationPage`** (2 nodes): `EducationPage()`, `EducationPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ExperiencePage`** (2 nodes): `ExperiencePage()`, `ExperiencePage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Home Page`** (2 nodes): `Home()`, `Home.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `LabsPage`** (2 nodes): `LabsPage()`, `LabsPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ProjectsPage`** (2 nodes): `ProjectsPage()`, `ProjectsPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `PostCSS Config`** (1 nodes): `postcss.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tailwind Config`** (1 nodes): `tailwind.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Config`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Type Definitions`** (1 nodes): `types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Env`** (1 nodes): `vite-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `AIVideoCreation`** (1 nodes): `AIVideoCreation.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Contact Component`** (1 nodes): `Contact.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `FeaturedProjects`** (1 nodes): `FeaturedProjects.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero Component`** (1 nodes): `Hero.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `InitialLoader`** (1 nodes): `InitialLoader.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Projects Component`** (1 nodes): `Projects.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ResearchLabs`** (1 nodes): `ResearchLabs.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Skills Component`** (1 nodes): `Skills.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Spotify Component`** (1 nodes): `Spotify.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Portfolio Data`** (1 nodes): `portfolio.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `SEO FAQ Data`** (1 nodes): `seo-faq.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Site Library`** (1 nodes): `site.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `AboutPage`** (1 nodes): `AboutPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `BlogsPage`** (1 nodes): `BlogsPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `HackathonsPage`** (1 nodes): `HackathonsPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ProjectDetailPage`** (1 nodes): `ProjectDetailPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `SkillsPage`** (1 nodes): `SkillsPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `OG Image`** (1 nodes): `Social Sharing Image`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 2 inferred relationships involving `Hero Component` (e.g. with `Profile Photo` and `Kunj Shah Portfolio (LLM Summary)`) actually correct?**
  _`Hero Component` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Kunj Shah Portfolio (LLM Summary)` (e.g. with `Hero Component` and `Robots.txt Crawl Rules`) actually correct?**
  _`Kunj Shah Portfolio (LLM Summary)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `GitHubProfile Redesign Design Spec`, `Robots.txt Crawl Rules`, `Profile Photo` to the rest of the system?**
  _4 weakly-connected nodes found - possible documentation gaps or missing edges._