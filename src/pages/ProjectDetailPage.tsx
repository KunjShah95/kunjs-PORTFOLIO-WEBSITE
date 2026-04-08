import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, Layout, Microscope, Activity, Code2, ArrowRight, ExternalLink } from 'lucide-react'
import { SEO } from '../components/SEO'
import { PROJECTS } from '../data/portfolio'
import { SITE_URL } from '../lib/site'

type ProjectDetail = {
  title: string
  category: string
  desc?: string
  demo?: string
  problem: string
  architecture: string
  ml_techniques: string[]
  decisions: string
  outcomes: string[]
  tech: string[]
  github: string
}

const projectData: Record<string, ProjectDetail> = {
  'cinepulse': {
    title: 'CinePulse',
    category: 'NLP & RECOMMENDATION SYSTEMS',
    desc: 'Emotion-based movie recommender using NLP classification and embedding-based similarity matching for high-precision discovery.',
    problem: 'Standard movie recommenders rely heavily on collaborative filtering, often failing during the cold-start phase and ignoring the granular emotional state of the user. CinePulse addresses the disconnect between a user\'s current mood and their cinematic preferences.',
    architecture: 'Dual-stream encoder system utilizing BERT for textual emotion extraction and a CLIP-inspired visual encoder for movie aesthetics. Results are indexed in Vald, a high-performance vector search engine, for low-latency retrieval.',
    ml_techniques: [
      'Sentiment & Emotion Classification (BERT/RoBERTa)',
      'Vector Embeddings & Semantic Search',
      'Similarity Matching using Cosine Distance',
      'Cold-start resolving via content-based filtering'
    ],
    decisions: 'Chose Vald as the primary vector database to handle high-concurrency requests with sub-millisecond response times. Opted for content-based embeddings over collaborative filtering to ensure high-quality recommendations for new movies and users.',
    outcomes: [
      '92% Accuracy in emotion detection from user prompts.',
      'Reduced recommendation latency to <50ms.',
      'Successfully handled 10k+ concurrent requests in stress testing.'
    ],
    tech: ['Python', 'PyTorch', 'Transformers', 'Vald', 'FastAPI'],
    github: 'https://github.com/KunjShah95/CinePulse'
  },
  'gap-miner': {
    title: 'GAP Miner',
    category: 'SEMANTIC INTELLIGENCE',
    desc: 'AI-powered skill gap analyzer leveraging semantic extraction from resumes and JDs to provide actionable learning paths.',
    problem: 'The rapid evolution of tech stacks makes it difficult for students and professionals to identify specific skill gaps between their current resumes and target Job Descriptions (JD). GAP Miner automates this career-critical analysis.',
    architecture: 'A multi-agent agentic workflow. The first agent parses the JD and Resume; the second performs semantic skill extraction; the third computes the delta using embedding-based distance; and the final agent generates a tailored learning roadmap.',
    ml_techniques: [
      'Semantic Text Extraction & Parsing',
      'Llama-3 for Natural Language Inference',
      'LangChain for Agent Orchestration',
      'Embedding-based Gap Analysis'
    ],
    decisions: 'Implemented Llama-3 locally using Ollama to ensure data privacy for user resumes. Used LangChain to manage the multi-step reasoning required for generating complex roadmaps.',
    outcomes: [
      'Reduced manual skill gap analysis time by 85%.',
      'Achieved 95% precision in extracting technical stacks from messy resume formats.',
      'Generated over 500+ personalized roadmaps during beta phase.'
    ],
    tech: ['Llama-3', 'LangChain', 'FastAPI', 'React', 'Ollama'],
    github: 'https://github.com/KunjShah95/GAP-Miner'
  },
  'railway-inspection': {
    title: 'Railway Inspection',
    category: 'COMPUTER VISION',
    desc: 'Real-time wagon inspection system with multi-camera ingestion, motion deblurring, and low-light enhancement pipelines.',
    problem: 'Manual inspection of railway wagon undercarriages is hazardous and inefficient. Real-time constraints and varying lighting conditions make automated computer vision solutions extremely challenging in field environments.',
    architecture: 'A high-speed vision pipeline consisting of multi-camera synchronized ingestion, real-time motion deblurring, and a YOLOv8-based defect detection engine running on NVIDIA Jetson edge devices.',
    ml_techniques: [
      'YOLOv8 Object Detection & Segmentation',
      'Custom Motion Deblurring Filters',
      'Low-light Image Enhancement (CLAHE + Deep Learning)',
      'Real-time Stream Ingestion/Processing'
    ],
    decisions: 'Implemented the core pipeline in C++ with Triton Kernels to meet the 30ms latency requirement for wagons moving at speed. Used a vLLM optimized YOLOv8 model for maximum throughput.',
    outcomes: [
      '99.5% Defect detection rate in varying weather conditions.',
      'Latency maintained below 25ms per frame.',
      'Reduced manual inspection time by 12x per train.'
    ],
    tech: ['C++', 'OpenCV', 'YOLOv8', 'vLLM', 'Triton'],
    github: 'https://github.com/KunjShah95/Railway-Inspection'
  },
  'upi-fraud-guard': {
    title: 'UPI Fraud Guard',
    category: 'PREDICTIVE ANALYTICS',
    desc: 'Advanced transaction fraud detection system handling extreme class imbalance and anomaly detection with precision optimization.',
    problem: 'UPI transactions generate massive volumes of data where fraudulent events are rare (needle in a haystack). Detecting these anomalies in real-time without blocking legitimate users is a critical challenge for fintech stability.',
    architecture: 'A hybrid anomaly detection system combining classic machine learning for known patterns and unsupervised learning for novel fraud vectors. Built with a focus on high-recall feature engineering.',
    ml_techniques: [
      'SMOTE for Class Imbalance Handling',
      'Isolation Forests for Anomaly Detection',
      'XGBoost Gradient Boosting',
      'Feature Engineering (Time-decaying transaction velocity)'
    ],
    decisions: 'Prioritized Precision and Recall over simple Accuracy to minimize "false alarms" that frustrate users. Utilized a sliding window approach for transaction velocity features.',
    outcomes: [
      'Detected 94% of fraud attempts in historical test sets.',
      'False Positive Rate kept below 0.1%.',
      'System processes transactions in under 10ms for real-time blocking.'
    ],
    tech: ['Scikit-learn', 'XGBoost', 'Pandas', 'Flask', 'PostgreSQL'],
    github: 'https://github.com/KunjShah95/UPI-Fraud-Detection'
  },
  'sentinel-cli': {
    title: 'SENTINEL CLI',
    category: 'SECURITY & CODE REVIEW',
    desc: 'Local-first AI-powered code review and security analysis CLI with multi-LLM support and autofix capabilities.',
    problem: 'Most code quality/security scanners are either fragmented or SaaS-first, creating privacy concerns and forcing teams to combine multiple tools for practical coverage. Sentinel CLI solves this with one local-first security and code review workflow.',
    architecture: 'Modular analyzer pipeline with 13+ analyzers (security, dependency, accessibility, React, TypeScript, API, Docker/Kubernetes and more), optional AI provider integrations, and multi-format reporting (console/JSON/SARIF/Markdown) for local and CI environments.',
    ml_techniques: [
      'LLM-assisted code auditing with bring-your-own-provider support',
      'Pattern-based security and secret detection',
      'Rule-driven static analysis across JS/TS/React and config assets',
      'Autofix workflows for common code-quality issues'
    ],
    decisions: 'Designed as local-first and API-key-owned by developers to preserve privacy and eliminate vendor lock-in. Prioritized CLI ergonomics and CI compatibility so the same checks run consistently in local dev and pipelines.',
    outcomes: [
      '13+ analyzers unified in a single CLI workflow.',
      'Supports OpenAI, Groq, Gemini, Anthropic, and OpenRouter providers.',
      'Outputs SARIF and CI-friendly artifacts for security workflows.'
    ],
    tech: ['Node.js', 'JavaScript', 'TypeScript', 'Docker', 'Kubernetes'],
    demo: 'https://sentinel-cux0dtano-kkshah2005-4679s-projects.vercel.app/',
    github: 'https://github.com/KunjShah95/SENTINEL-CLI'
  },
  'aether-ai': {
    title: 'AETHER AI',
    category: 'AGENTIC TERMINAL ASSISTANT',
    desc: 'Production-ready secure multi-model terminal assistant with local and cloud model support.',
    problem: 'Developers need one assistant that works across local and cloud LLMs, with practical tools and strong security defaults, instead of juggling fragmented scripts and unsafe terminal helpers.',
    architecture: 'Python-based terminal assistant with modular command handlers, model switching (Gemini/Groq/Ollama/HF/OpenAI/MCP), safe command allowlists, and pluggable extensions for productivity, coding, and system utilities.',
    ml_techniques: [
      'Multi-model orchestration across cloud and local LLM runtimes',
      'Context-aware command workflows for developer assistance',
      'Provider fallback strategy for resilient generation',
      'Prompt-driven automation with tool-use commands'
    ],
    decisions: 'Used secure-by-default constraints (sanitization + allowlists + boundary checks) to reduce operational risk. Added Ollama integration to enable private/offline local model workflows when cloud access is unavailable.',
    outcomes: [
      'Single CLI entry point for six+ model backends.',
      'Cross-platform support for Windows, macOS, and Linux.',
      'Extensible command ecosystem for productivity and code workflows.'
    ],
    tech: ['Python', 'Ollama', 'Gemini', 'Groq', 'FastAPI'],
    github: 'https://github.com/KunjShah95/AETHER-AI'
  },
  'minbpe-tokenizer': {
    title: 'MinBPE Tokenizer',
    category: 'LLM INFRASTRUCTURE',
    desc: 'Minimal Byte Pair Encoding tokenizer with basic, regex, and GPT-4 compatible variants.',
    problem: 'Tokenizer internals are often hidden behind heavy frameworks, making it hard to learn how BPE actually works and why token boundaries affect model behavior and cost.',
    architecture: 'Lightweight Python package implementing core BPE primitives with layered tokenizer variants: BasicTokenizer, RegexTokenizer, and GPT4Tokenizer compatibility paths, backed by tests and serialization utilities.',
    ml_techniques: [
      'Byte Pair Encoding (BPE) merge training',
      'Regex-aware pre-tokenization for stable segmentation',
      'Special-token handling and token-ID mapping',
      'GPT-4 compatible encoding parity checks against tiktoken'
    ],
    decisions: 'Kept implementation intentionally minimal and readable for educational clarity while still covering production-relevant concerns like save/load and special tokens.',
    outcomes: [
      'Clear, test-backed tokenizer implementation in pure Python.',
      'Supports basic learning use-cases and GPT-4 compatibility experiments.',
      'Useful foundation for custom tokenizer research and NLP education.'
    ],
    tech: ['Python', 'BPE', 'Regex', 'tiktoken', 'NLP'],
    github: 'https://github.com/KunjShah95/TOKENIZER-FROM-SCRATCH'
  },
  'resumemaster-ai': {
    title: 'ResumeMasterAI',
    category: 'CAREER AI PLATFORM',
    desc: 'AI-powered resume optimization and job-matching platform with ATS scoring and multi-model support.',
    problem: 'Job seekers struggle to optimize resumes for ATS pipelines and tailor applications quickly across roles. Most tools lack transparency, integrated workflows, or practical career analytics.',
    architecture: 'Streamlit-based multi-page platform with document parsing, ATS scoring, job matching, rewrite/cover-letter generation, and analytics modules, integrated with multiple LLM providers and vector-backed processing patterns.',
    ml_techniques: [
      'LLM-powered resume analysis and rewrite generation',
      'ATS-style scoring and recommendation heuristics',
      'Semantic job-resume matching',
      'Provider fallback across Groq/Gemini/OpenAI/Anthropic'
    ],
    decisions: 'Built around modular services and utility layers to support iterative feature growth (resume parsing, scoring, matching, generation) while keeping deployment simple via Streamlit and Docker options.',
    outcomes: [
      'Comprehensive end-to-end career tooling in a single application.',
      'Multi-model support for reliability and cost/performance tradeoffs.',
      'Production-grade feature set including analytics, versioning, and export workflows.'
    ],
    tech: ['Python', 'Streamlit', 'LangChain', 'Gemini', 'ChromaDB'],
    demo: 'https://resumemasterai.streamlit.app/',
    github: 'https://github.com/KunjShah01/job-snipper'
  }
}

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projectData[slug || '']
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug)
  const nextProject = currentIndex >= 0 ? PROJECTS[(currentIndex + 1) % PROJECTS.length] : PROJECTS[0]

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold text-txt">Project Not Found</h1>
        <Link to="/projects" className="text-primary hover:underline text-sm font-medium">Back to Projects</Link>
      </div>
    )
  }

  const canonical = `${SITE_URL}/projects/${slug}`

  return (
    <div className="min-h-screen pt-32 pb-20">
      <SEO
        title={`${project.title} | Case Study`}
        description={project.desc || project.problem}
        url={canonical}
        keywords={[
          project.title,
          ...(project.tech ?? []),
          'Kunj Shah',
          'case study',
          'portfolio',
        ]}
        breadcrumbs={[
          { name: 'Home', item: SITE_URL },
          { name: 'Projects', item: `${SITE_URL}/projects` },
          { name: project.title, item: canonical },
        ]}
      />

      <div className="container-aligned">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link to="/projects" className="group inline-flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Projects
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start border-b border-border/50 pb-16">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <div className="text-xs font-medium text-primary">{project.category.replace(/_/g, ' ')}</div>
              <h1 className="text-4xl sm:text-5xl font-bold text-txt tracking-tight leading-tight">
                {project.title}
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-muted font-light leading-relaxed max-w-3xl">
              {project.problem}
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-6 border border-border bg-surface rounded-lg space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t: string) => (
                    <span key={t} className="px-2 py-1 bg-surfaceHighlight rounded-md text-[10px] font-medium text-muted">{t}</span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-border/50">
                <div className="flex flex-col gap-3">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-txt text-bg rounded-md font-semibold text-sm hover:bg-primary transition-colors">
                    <Github className="w-4 h-4" /> View Source
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 border border-primary/40 bg-primary/10 text-primary rounded-md font-semibold text-sm hover:bg-primary/20 transition-colors">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 py-20">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-primary">
              <Layout className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-txt tracking-tight">Architecture</h2>
            </div>
            <div className="text-muted font-light leading-relaxed border-l-2 border-primary/20 pl-6">
              {project.architecture}
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-primary">
              <Microscope className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-txt tracking-tight">AI Techniques</h2>
            </div>
            <ul className="space-y-3">
              {project.ml_techniques.map((tech: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted font-light">
                  <div className="mt-1.5 w-1.5 h-1.5 bg-primary rounded-full shrink-0"></div>
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-primary">
              <Code2 className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-txt tracking-tight">Engineering Decisions</h2>
            </div>
            <div className="text-muted font-light leading-relaxed border-l-2 border-primary/20 pl-6">
              {project.decisions}
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-primary">
              <Activity className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-txt tracking-tight">Outcomes & Metrics</h2>
            </div>
            <ul className="space-y-4">
              {project.outcomes.map((metric: string, i: number) => (
                <li key={i} className="flex items-start gap-4 p-4 border border-border/50 bg-surface/30 rounded-lg">
                  <div className="text-primary font-bold text-lg">0{i + 1}</div>
                  <div className="text-sm text-muted font-light leading-relaxed">{metric}</div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>


        <div className="mt-20 pt-20 border-t border-border/50 flex flex-col items-center space-y-4">
          <h3 className="text-xs font-medium text-muted">Next Project</h3>
          <Link
            to={`/projects/${nextProject.slug}`}
            className="group flex items-center gap-4 text-2xl sm:text-4xl font-bold text-txt tracking-tight hover:text-primary transition-colors"
          >
            {nextProject.title}
            <ArrowRight className="w-8 h-8 sm:w-12 sm:h-12 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  )
}
