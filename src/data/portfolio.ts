

import { Project, Experience, SkillGroup, Education, UserIdentity, Social, Blog, LogEntry } from '../types';
import { Brain, Database, Terminal, Workflow, ExternalLink, Github, Twitter, Linkedin } from 'lucide-react';

export const IDENTITY: UserIdentity = {
    name: "Kunj Shah",
    persona: "AI Engineer, ML Specialist & Software Developer",
    location: "Ahmedabad, IN",
    contact: "kkshah2005@gmail.com",
    focus: ["Agentic AI / ML", "Software Development", "LLM Systems", "AI Engineering & Ops"],
    github_username: "KunjShah95",
    profile_photo: "/profile.png"
};

export const PROJECTS: Project[] = [
    {
        id: '12',
        title: 'OfferGuard AI',
        category: 'AI Career Platform',
        desc: 'AI-powered job offer analysis. Paste a job description, offer letter, or recruiter chat and get instant insights on toxicity, burnout risk, salary fairness, ghost hiring, and negotiation strategy.',
        tech: ['TANSTACK START', 'REACT 19', 'TAILWIND', 'GROQ', 'FIREBASE'],
        github: 'https://github.com/KunjShah95/reverseinterview',
        demo: 'https://offerchecker-pi.vercel.app/',
        slug: 'offerguard-ai',
        impact: 'Live',
        caseStudy: 'case-study-offerguard-ai',
        problem: 'Job seekers receive opaque offer letters and recruiter messages that hide red flags around pay, culture, and ghost hiring risks.',
        outcome: 'Reduced offer evaluation time from hours to seconds with multi-provider AI analysis and automated negotiation strategy generation.',
        metrics: { 'Tokens processed': '40,000+', 'LLM providers': '3', 'Analysis dimensions': '5' },
        inferenceLatency: '~2.1s for full analysis',
        tokensProcessed: '40,000+ tokens across providers',
        architecture: 'Multi-provider LLM orchestration. Primary scanner triages input → deep analyzer extracts structured signals → cross-check model validates consistency. Chain-of-thought prompting generates negotiation strategies.',
        challenges: ['Handling false positives — a flagged offer could cost someone a job opportunity', 'Cross-model consistency — different LLMs disagree on subjective toxicity signals'],
        lessons: ['Accuracy is not enough — context matters more than verdicts', 'Users want highlighted sentences with explanations, not just scores'],
        benchmarks: { 'Multi-provider agreement': '87%', 'Analysis time': '< 3s' },
    },
    {
        id: '10',
        title: 'EquityLens',
        category: 'AI Ethics',
        desc: 'Fairness auditing platform for detecting bias in healthcare AI, ensuring compliance with international standards.',
        tech: ['REACT', 'FASTAPI', 'POSTGRESQL', 'TENSORFLOW'],
        github: 'https://github.com/KunjShah95/fairness-lens-studio',
        slug: 'equitylens',
        impact: 'Production',
        caseStudy: 'case-study-equitylens',
        problem: 'Healthcare AI models often contain hidden biases that lead to unequal patient treatment recommendations.',
        outcome: 'Detected a 23% performance gap in commercial triage models and reduced audit overhead significantly.',
        metrics: { 'Bias metrics computed': '6', 'Regulatory frameworks': '3', 'Audit time reduction': '90%', 'Performance gap detected': '23%' },
        architecture: 'Fairness evaluation pipeline computing demographic parity, equalized odds, and calibration across sensitive attributes. Causal inference modules distinguish correlation from causation. Interactive Pareto frontier plots show accuracy-fairness tradeoffs with automated drift detection.',
        challenges: ['Confounding variables — detecting bias is not enough, you need to understand why it exists', 'Accuracy-fairness tradeoffs — improving fairness often reduces model accuracy'],
        lessons: ['Fairness is not a checkbox — it requires continuous monitoring', 'Compliance mappings to EU AI Act and NIST RMF make audits actionable'],
        benchmarks: { 'Audit speedup': '10x vs manual', 'Demographic parity gap': '23%', 'Fairness dimensions': '6' },
    },
    {
        id: '09',
        title: 'LearnAI',
        category: 'EdTech AI',
        desc: 'Personalized learning platform with adaptive tutoring, smart quizzes, and progress tracking across multiple model providers.',
        tech: ['NEXT.JS', 'FIREBASE', 'SUPABASE', 'GEMINI'],
        github: 'https://github.com/KunjShah95/intelligent-learning-assistant',
        demo: 'https://intelligent-learning-assistant.vercel.app',
        slug: 'learnai',
        impact: 'Live',
        problem: 'Traditional e-learning platforms provide a one-size-fits-all experience, failing to adapt to student learning speeds.',
        outcome: 'Increased quiz completion rates by 45% through adaptive difficulty adjustment.',
        metrics: { 'Quiz completion lift': '45%', 'Model providers': '3 (Gemini, GPT, Claude)', 'Adaptive difficulty levels': '5' },
        architecture: 'Multi-provider LLM orchestration for adaptive tutoring. Student responses feed a proficiency estimation model that adjusts question difficulty in real-time. Spaced repetition scheduling optimized per student via performance history analysis.',
        challenges: ['Calibrating difficulty across different subjects and student backgrounds', 'Balancing challenge vs discouragement in adaptive difficulty curves'],
        lessons: ['Adaptive pacing matters more than content quality for engagement', 'Multi-provider fallback prevents downtime during API outages'],
        benchmarks: { 'Quiz completion increase': '45%', 'Student satisfaction': '4.2/5', 'Uptime': '99.7%' },
    },
    {
        id: '11',
        title: 'SmartFlow AI',
        category: 'Smart Infrastructure',
        desc: 'Real-time crowd monitoring platform for transit hubs with live heatmaps and wait time prediction.',
        tech: ['NEXT.JS 15', 'TYPESCRIPT', 'FIREBASE', 'FIRESTORE'],
        github: 'https://github.com/KunjShah95/Smart-flow-ai',
        demo: 'https://ps-1-eight.vercel.app',
        slug: 'smart-flow-ai',
        impact: 'Beta',
        problem: 'Crowd management in transit hubs is often reactive, leading to bottlenecks during peak hours.',
        outcome: 'Wait-time prediction accuracy reached 94%, enabling proactive staff deployment.',
        metrics: { 'Prediction accuracy': '94%', 'Data refresh rate': 'Real-time', 'Forecast window': '24h' },
        architecture: 'Real-time event ingestion via Firebase Firestore with time-series forecasting for wait-time predictions. Heatmap visualization layers density data onto transit hub maps for operations teams. Hybrid statistical + ML model outperforms pure ML on noisy real-time data.',
        challenges: ['Handling sparse data during off-peak hours while maintaining prediction quality', 'Real-time synchronization across multiple transit hub data sources'],
        lessons: ['Hybrid statistical + ML models outperform pure ML on noisy real-time data', 'Operations teams need actionable alerts, not just dashboards'],
        benchmarks: { 'Prediction accuracy': '94%', 'Data latency': '< 500ms' },
    },
    {
        id: '08',
        title: 'ResumeMasterAI 2026',
        category: 'AI Career Platform',
        desc: 'Comprehensive career intelligence system with smart model routing and automated resume optimization.',
        tech: ['PYTHON', 'LANGGRAPH', 'AI GATEWAY', 'CHROMADB'],
        github: 'https://github.com/KunjShah01/job-snipper',
        demo: 'https://resumemasterai.streamlit.app/',
        slug: 'resumemaster-ai',
        impact: 'Architecture',
        problem: 'Disconnected LLM calls and manual management lead to high latency and inconsistent resume tailoring.',
        outcome: 'Reduced API costs by 65% and increased match precision by 3x using orchestrated routing.',
        metrics: { 'API cost reduction': '65%', 'Match precision': '3x improvement', 'LLM models routed': '4', 'Vector DB': 'ChromaDB' },
        architecture: 'Smart model routing gateway classifying tasks by complexity — cheap/small models for formatting, expensive/large for strategic rewriting. LangGraph orchestrates multi-step workflows with checkpointing and human-in-the-loop approval gates.',
        challenges: ['Classifying task complexity without adding latency overhead', 'Building reliable checkpointing for long-running multi-step workflows'],
        lessons: ['Smart routing across models cuts costs more than any prompt optimization', 'Human-in-the-loop gates prevent costly automated mistakes'],
        benchmarks: { 'Cost reduction': '65%', 'Match precision gain': '3x', 'Routing latency overhead': '< 200ms' },
    },
    {
        id: '05',
        title: 'SENTINEL CLI',
        category: 'Cybersecurity',
        desc: 'Security auditing tool that unifies multiple analyzers into a single, efficient command-line workflow.',
        tech: ['NODE.JS', 'TYPESCRIPT', 'LLM', 'DOCKER'],
        github: 'https://github.com/KunjShah95/SENTINEL-CLI',
        demo: 'https://sentinel-cli.vercel.app/',
        slug: 'sentinel-cli',
        impact: 'Open Source',
        problem: 'Security auditing involves juggling multiple disconnected tools and manual report correlation.',
        outcome: 'Consolidated 13+ security tools into a single command, reducing audit overhead by 70%.',
        metrics: { 'Tools consolidated': '13+', 'Audit overhead reduced': '70%', 'Report output': 'Unified' },
        architecture: 'Pluggable analyzer architecture — each security tool wraps as a modular pipeline stage. Results normalize into a unified schema with cross-tool correlation. LLM-powered summary explains findings in plain language.',
        challenges: ['Normalizing disparate output formats from 13+ independent security tools', 'Cross-correlating findings to eliminate duplicate signals'],
        lessons: ['Unified CLI dramatically lowers adoption barrier for security auditing', 'LLM-summarized reports make security accessible to non-experts'],
        benchmarks: { 'Audit time reduction': '70%', 'Tools integrated': '13+', 'False positive reduction': '~40%' },
    },
    {
        id: '03',
        title: 'Railway Inspection',
        category: 'Computer Vision',
        desc: 'Automated defect detection system using high-speed vision pipelines and YOLOv8 to replace hazardous manual inspections.',
        tech: ['C++', 'OPENCV', 'YOLOv8', 'CUDA'],
        github: 'https://github.com/KunjShah95/Railway-Inspection',
        slug: 'railway-inspection',
        impact: 'Deployed',
        caseStudy: 'case-study-railway-inspection',
        problem: 'Manual railway inspections are slow, hazardous, and prone to human error in defect detection.',
        outcome: 'Automated detection with 98.7% accuracy and 4.2x speedup over traditional methods.',
        metrics: { 'Detection accuracy': '98.7%', 'Speedup': '4.2x', 'Target latency': '< 100ms', 'Hardware': 'Jetson Orin (edge)' },
        architecture: 'C++ inference pipeline with TensorRT-optimized YOLOv8 ONNX exports for Jetson Orin. Multi-threaded GStreamer for hardware-accelerated video decoding with CUDA preprocessing. INT8 quantization via Quantization-Aware Training (QAT) maintains accuracy while halving inference time.',
        challenges: ['Sub-100ms end-to-end latency on fanless industrial edge hardware', 'Motion blur from moving trains degrading detection quality', 'Low-light conditions requiring real-time histogram equalization'],
        lessons: ['Python is a bottleneck for edge inference — C++ + TensorRT is essential', 'INT8 quantization with QAT preserves accuracy while doubling speed'],
        benchmarks: { 'End-to-end latency': '< 100ms', 'Detection accuracy': '98.7%', 'Speedup vs manual': '4.2x', 'INT8 speedup vs FP16': '2x' },
    },
    {
        id: '01',
        title: 'ArchMind AI',
        category: 'Architecture Intelligence',
        desc: 'AI Staff Architect for modern engineering teams — upload a diagram or paste code, and specialized agents score your architecture, surface risks, propose redesigns, and simulate failures.',
        tech: ['TYPESCRIPT', 'PYTHON', 'FASTAPI', 'REACT', 'SUPABASE'],
        github: 'https://github.com/KunjShah95/archmind-ai',
        demo: 'https://archmind-ai-topaz.vercel.app/',
        slug: 'archmind-ai',
        impact: 'Production',
        caseStudy: 'case-study-archmind-ai',
        problem: 'Architecture review is a slow, senior-engineer-only bottleneck — diagrams sit in docs, risks go unnoticed until production incidents, and teams lack automated tooling to evaluate design tradeoffs.',
        outcome: 'Shipped a live architecture intelligence platform that parses diagrams and code into a graph, runs 7 specialized analysis agents across it, and returns a scored report with prioritized findings — plus simulation, compliance auditing, and one-click redesigns.',
        metrics: { 'Analysis agents': '7 (Scalability, Security, Reliability, Performance, Cost, Maintainability, Observability)', 'Provider fallback': '6 + heuristic engine', 'Deployment': 'Vercel + Render + Supabase', 'Architecture formats': 'Mermaid, PlantUML, Image, URL' },
        architecture: 'Frontend (Vite + React + TS) on Vercel talks to a FastAPI backend on Render. Supabase handles auth (JWT) and PostgreSQL. The backend parses architecture inputs (Mermaid/PlantUML text or image/PDF vision extraction) into a graph, runs seven parallel agent analyses, and aggregates findings into a scored report. A provider fallback chain (Groq → NVIDIA → OpenRouter → Gemini → Ollama → HuggingFace) routes LLM calls, with an 18-rule heuristic engine as the zero-config fallback.',
        challenges: ['Parsing diverse architecture formats (Mermaid, PlantUML, hand-drawn images) into a unified graph representation', 'Building a resilient LLM strategy that works with zero API keys via heuristic fallback', 'Cold starts on Render free tier requiring a keep-warm workflow and client-side warming'],
        lessons: ['Seven specialized agents scoring independent dimensions produce better architecture insight than a single monolithic analysis', 'A heuristic fallback engine makes the product viable without any LLM keys — eliminating the chicken-and-egg problem for new users'],
        benchmarks: { 'Analysis dimensions': '7', 'LLM providers': '6 + heuristic fallback', 'Uptime': 'Keep-warm via GitHub Actions', 'Deployment': 'Full-stack on Vercel + Render + Supabase' },
    },
    {
        id: '02',
        title: 'GAP Miner',
        category: 'AI Research',
        desc: 'Full-stack skill gap analyzer using semantic extraction to automate the generation of tailored career learning roadmaps.',
        tech: ['LLAMA-3', 'LANGCHAIN', 'FASTAPI', 'REACT'],
        github: 'https://github.com/KunjShah95/arros',
        slug: 'autonomous-research',
        impact: 'Beta',
        problem: 'Market research and skill gap analysis take weeks of manual work for aspiring engineers.',
        outcome: 'Reduces roadmap generation time from 10 days to 15 seconds with 95% market alignment.',
        metrics: { 'Generation time': '15s (was 10 days)', 'Market alignment': '95%', 'LLM': 'Llama-3' },
        architecture: 'Semantic extraction pipeline using Llama-3 with LangChain for structured skill decomposition. Job market data is vectorized into ChromaDB for similarity search against user profiles. Gap analysis compares extracted skills against market demand curves.',
        challenges: ['Semantic alignment between user skills and market requirements is inherently fuzzy', 'Local LLM inference requires careful prompt engineering for structured output parsing'],
        lessons: ['Semantic similarity search with embeddings outperforms keyword matching', 'Local LLMs (Llama-3) handle structured extraction at a fraction of API cost'],
        benchmarks: { 'Time reduction': '99.98% (10 days → 15s)', 'Market alignment': '95%', 'Extraction F1': '0.92' },
    },
    {
        id: '04',
        title: 'UPI Fraud Guard',
        category: 'Machine Learning',
        desc: 'Fraud detection engine designed to identify anomalous transaction patterns with high-precision real-time response.',
        tech: ['SCIKIT-LEARN', 'XGBOOST', 'PANDAS', 'FLASK'],
        github: 'https://github.com/KunjShah95/UPI-Fraud-Detection',
        slug: 'upi-fraud-guard',
        impact: 'Stable',
        caseStudy: 'case-study-upi-fraud-guard',
        problem: 'Real-time UPI transactions are vulnerable to sophisticated fraud patterns that static rules miss.',
        outcome: 'Detected 88% of anomalous transactions with a false positive rate under 0.1%.',
        metrics: { 'Detection rate': '88%', 'False positive rate': '< 0.1%', 'Model': 'XGBoost' },
        architecture: 'XGBoost classifier on engineered UPI features — amount velocity, merchant diversity, geolocation entropy, time-of-day patterns. Threshold-moving strategy optimizes precision-recall for extreme class imbalance (fraud < 0.01% of transactions).',
        challenges: ['Extreme class imbalance — fraud is less than 0.01% of all transactions', 'Feature engineering for adversarial patterns that actively evade detection'],
        lessons: ['Precision-recall curves matter more than ROC AUC for fraud detection', 'Feature engineering on metadata patterns catches fraud that raw features miss'],
        benchmarks: { 'Detection rate': '88%', 'False positive rate': '< 0.1%', 'Precision': '~85%', 'Scoring latency': '< 100ms' },
    },
    {
        id: '06',
        title: 'ArchMind Research Agent',
        category: 'Agentic AI',
        desc: 'The autonomous research agent behind ArchMind AI — a self-planning agent that explores the web, evaluates sources, and writes cited analysis with verifiable provenance.',
        tech: ['PYTHON', 'LANGGRAPH', 'STREAMLIT', 'RAG', 'WEB SCRAPING'],
        github: 'https://github.com/KunjShah01/INTERNSHIP-ASSESSMENT',
        demo: 'https://internship-assessment-er3kjmh8nw5vvj8wgwxlmc.streamlit.app/',
        slug: 'archmind-research-agent',
        impact: 'Live',
        caseStudy: 'case-study-archmind-research-agent',
        problem: 'Internship and market research is repetitive and error-prone — matching roles, companies, and requirements by hand wastes days and misses signal.',
        outcome: 'Deployed a research agent that automates the full discovery-to-report pipeline, turning open-ended requests into structured, cited findings in minutes.',
        metrics: { 'Pipeline stages': 'Plan → Search → Read → Synthesize', 'Deployment': 'Streamlit Cloud', 'Citations': 'Source-linked', 'Token efficiency': 'Routed' },
        architecture: 'A planner agent breaks the request into sub-queries. Search + scraping agents gather evidence from the web, an extractor normalizes structured fields, and a writer agent produces a cited report. RAG over collected evidence keeps the synthesis grounded; the whole flow is exposed through an interactive Streamlit UI.',
        challenges: ['Extracting structured signal from noisy, inconsistent web sources', 'Preventing the agent from drifting off-topic on broad research queries'],
        lessons: ['A tight planner keeps research agents on-track and cheap', 'Grounded RAG beats free-form generation for factual reports'],
        benchmarks: { 'Deployment': 'Live', 'Report grounding': 'Cited', 'Interaction': 'Streamlit UI' },
    },
    {
        id: '07',
        title: 'MinBPE Tokenizer',
        category: 'Core AI',
        desc: 'Low-level Byte Pair Encoding implementation for understanding and optimizing tokenization logic in transformer models.',
        tech: ['PYTHON', 'NLP', 'TIKTOKEN', 'ALGORITHMS'],
        github: 'https://github.com/KunjShah95/TOKENIZER-FROM-SCRATCH',
        slug: 'minbpe-tokenizer',
        impact: 'Research',
        problem: 'Standard tokenizers are black boxes that can lead to inefficient context usage in domain-specific training.',
        outcome: 'Built a from-scratch BPE implementation that reduced token overhead by 15% for technical datasets.',
        metrics: { 'Token overhead reduction': '15%', 'Vocabulary size': '~50K merges', 'Implementation': 'Pure Python' },
        architecture: 'Pure Python implementation of Byte Pair Encoding, replicating OpenAI tiktoken core logic. Custom vocabulary training on technical document corpora to optimize merge rules for code and mathematical notation. Regex-based pre-tokenization following GPT-2/4 patterns.',
        challenges: ['Replicating edge-case behavior of production tokenizers (regex splits, byte fallbacks)', 'Optimizing merge rule discovery for domain-specific token efficiency'],
        lessons: ['Tokenization is a surprisingly impactful optimization lever for domain-specific LLM apps', 'Custom tokenizers can reduce token count by 10-15% for technical content'],
        benchmarks: { 'Token overhead reduction': '15% on technical datasets', 'Speed vs tiktoken': '~2x slower (pure Python)' },
    },
];

export const EXPERIENCE: Experience[] = [
    {
        id: 'XP0',
        company: 'PHAZE_AI',
        role: 'AUTOMATION_INTERN',
        period: 'DEC 2025 — FEB 2026',
        description: 'Automating high-scale enterprise workflows using multi-agent systems and agentic reasoning. Integrating AI models into full-stack production pipelines.',
        skills: ['PYTHON', 'AGENTS', 'FULL_STACK', 'AUTOMATION'],
    },
    {
        id: 'XP1',
        company: 'Open Source',
        role: 'OPEN_SOURCE_CONTRIBUTOR',
        period: '2025 — PRESENT',
        description: '44 merged pull requests across 13+ external projects — including OWASP (agent-security regression harness), Microsoft (AI-Engineering-Coach), and Ollama. Shipped CI gates, security scenarios, feature work, and docs. 45 issues opened.',
        skills: ['OWASP', 'CI/CD', 'AI SECURITY', 'OPEN SOURCE'],
    }
];

export const EDUCATION: Education[] = [
    {
        id: "ED01",
        school: "Indus University",
        degree: "B.Tech Computer Science [4th Year]",
        period: "2023 - 2027",
        specialization: "AI/ML Integration and Automation.",
        location: "Ahmedabad, IN",
        summary: "Focusing on the intersection of Full Stack Dev and AI. Developing automated systems that utilize distributed intelligence at scale."
    }
];

export const SKILL_GROUPS: SkillGroup[] = [
    {
        category: 'Full Stack Dev',
        icon: Brain,
        description: 'Building responsive frontend interfaces and secure, scalable API architectures to support production workloads.',
        skills: ['React / Next.js 15', 'TypeScript / Node.js', 'FastAPI / Python', 'REST & GraphQL APIs', 'Tailwind CSS']
    },
    {
        category: 'Agentic AI',
        icon: Workflow,
        description: 'Designing autonomous workflows, multi-agent frameworks, and retrieval-augmented reasoning patterns.',
        skills: ['LangChain / LangGraph', 'CrewAI / AutoGen', 'RAG / Vector Databases', 'Agentic Workflows', 'Tool Integration']
    },
    {
        category: 'Core AI / ML',
        icon: Terminal,
        description: 'Developing models for computer vision, natural language understanding, and predictive analytics.',
        skills: ['PyTorch / TensorFlow', 'YOLOv8 / OpenCV', 'Transformers / NLP', 'Scikit-Learn', 'CUDA Acceleration']
    },
    {
        category: 'Cloud & DevOps',
        icon: Database,
        description: 'Provisioning secure cloud infrastructure, configuring CI/CD deployment pipelines, and managing containers.',
        skills: ['AWS / GCP Cloud', 'Docker / Kubernetes', 'CI/CD Github Actions', 'Linux & Bash Scripting', 'Supabase / Firebase']
    }
];

export const SOCIALS: Social[] = [
    {
        name: 'LINKEDIN',
        url: 'https://www.linkedin.com/in/kunjshah05',
        icon: Linkedin,
        label: 'LinkedIn'
    },
    {
        name: 'X_TWITTER',
        url: 'https://x.com/kunjshah_dev',
        icon: Twitter,
        label: 'Twitter / X'
    },
    {
        name: 'GITHUB_V1',
        url: 'https://github.com/KunjShah95',
        icon: Github,
        label: 'GitHub'
    },
    {
        name: 'GITHUB_V2',
        url: 'https://github.com/KunjShah01',
        icon: Github,
        label: 'Side Projects'
    },
    {
        name: 'HUGGING_FACE',
        url: 'https://huggingface.co/kunjshah01',
        icon: ExternalLink,
        label: 'Hugging Face'
    },
    {
        name: 'PEERLIST',
        url: 'https://peerlist.io/kunjshah',
        icon: ExternalLink,
        label: 'Peerlist'
    },
    {
        name: 'MEDIUM',
        url: 'https://medium.com/@kkshah2005',
        icon: ExternalLink,
        label: 'Medium'
    }
];

export const TESTIMONIALS: never[] = [];

export const BLOGS: Blog[] = [
    {
        id: 'B009',
        title: 'What Breaking Things Taught Me About Building Them',
        slug: 'breaking-things-taught-me',
        category: 'Building',
        excerpt: 'The projects that failed taught me more than the ones that shipped. A honest look at mistakes, recoveries, and what I wish I knew earlier.',
        content: `
# What Breaking Things Taught Me About Building Them

I spent three weeks building a feature once. It was supposed to be smart — an AI system that could read resumes and match them to jobs automatically. I had it all figured out. The architecture was clean. The code was modular. I was proud of it.

Then I showed it to someone.

They pointed out something I had completely missed. The system worked great for tech jobs. But for everything else, it was guessing. I had trained it on data that looked like my own resume — technical, full of keywords like Python and React. When a teacher or a nurse uploaded theirs, the system got confused.

I remember staring at the screen, feeling that sinking feeling in my stomach. Three weeks. Wasted.

Or so I thought.

## The Real Lesson

Looking back, that failure was the best thing that could have happened to me. It taught me something that no tutorial or course ever did:

**Your assumptions are your biggest blind spot.**

I assumed my data was representative. I assumed the problem was simpler than it was. I assumed I had thought of everything. Every single assumption was wrong.

After that, I changed how I build things:

- **Show it early.** Even if it's ugly. Even if it's broken. Show it to someone before you're proud of it. The feedback hurts less when you haven't invested weeks.
- **Test with real people.** Not your friends who code. Real people who will use it. They will break it in ways you never imagined.
- **Small loops, quick feedback.** A week of building followed by a day of listening. Repeat.

## The Projects That Never Shipped

I have a graveyard of projects that never saw the light of day. A chatbot that couldn't stop apologizing. A scheduling tool that was too complicated for anyone to use. A dashboard that looked beautiful but answered questions nobody was asking.

Each one hurt in its own way. But each one also taught me something specific:

The chatbot taught me that AI without clear boundaries is just confusing. The scheduling tool taught me that features don't matter if the core experience is broken. The dashboard taught me to ask \*what do you need?\* before \*what can I build?\*

## Building Anyway

Here's the strange thing. Knowing that most projects fail — knowing that I'll probably make the same mistakes again in slightly different ways — doesn't stop me from building.

Because every now and then, something clicks. A user writes back saying \*this actually helps.\* A system runs in production for a month without breaking. A stranger on the internet sends a pull request.

Those moments make up for all the broken things.

**So I keep building. I just fail faster now, and I listen more carefully.**
        `,
        date: 'JUN 2026',
        readTime: 7,
        tags: ['BUILDING', 'LESSONS', 'FAILURE', 'MINDSET'],
        featured: true,
    },
    {
        id: 'B010',
        title: 'Shipping Is Harder Than Building — And That Is Okay',
        slug: 'shipping-harder-than-building',
        category: 'Building',
        excerpt: 'The gap between a working prototype and something real people use is bigger than most people think. Here is what bridging it actually looks like.',
        content: `
# Shipping Is Harder Than Building — And That Is Okay

I can build a prototype in a weekend. I have done it many times. A weekend of focused work, good music, and the thrill of creating something from nothing. By Sunday night, I have something that works.

The hard part comes Monday morning.

That is when you realize the difference between something that \*works\* and something that \*works for someone else.\*

## The Gap

A prototype runs on your machine. It uses your data, your network, your patience. You know exactly where to click and what to expect. When something breaks, you understand why.

A shipped product runs on someone else's machine. They have different data, slower internet, and zero patience. They will click where you did not expect them to click. They will expect things you never thought to build.

**That gap — between your machine and theirs — is where most projects die.**

I have felt this gap more times than I can count. You finish building. You feel proud. You share it. And then... silence. Or worse, confusion. People do not get it. They do not know what to do with it.

## What Bridging The Gap Looks Like

After enough of these experiences, I started noticing patterns in what actually helps:

**1. Watch someone use it.**
Not a demo. Not a walkthrough. Sit next to them and watch them try to figure it out on their own. Do not say anything. Watch where they hesitate. Watch where they frown. Those are your real bugs.

**2. Cut everything that isn't essential.**
When you build, you add features because they seem cool. When you ship, you remove features because they create confusion. Every extra button is a decision the user has to make. Every decision is a chance for them to leave.

**3. Write like a human.**
Not a documentation writer. Not a marketer. A human. If your project needs a 5-minute tutorial to explain what it does, the problem is not the tutorial. The problem is the project.

## The Emotional Part

Here is what nobody tells you about shipping:

It is lonely.

Building is exciting. Every line of code feels like progress. But shipping is a slow grind of fixing bugs you missed, answering questions you thought were obvious, and wondering if anyone even cares.

I have spent days on what felt like nothing — replying to a single user's email, fixing a typo in a button label, tweaking a loading animation. It does not feel like progress. But it is.

**Because that is what shipping actually is. Not a big launch. Not a moment of glory. A thousand small fixes, made patiently, over time.**

## Why It Matters

I ship things because I believe in the slow accumulation of useful things. A small tool that helps ten people is more meaningful to me than a grand idea that helps nobody.

So if you are stuck in that gap right now — between your prototype and the thing you want to share — keep going. The silence does not mean failure. It just means you are still building trust.

One user at a time.
        `,
        date: 'MAY 2026',
        readTime: 8,
        tags: ['BUILDING', 'SHIPPING', 'PRODUCT', 'MINDSSET'],
        featured: true,
    },
    {
        id: 'B011',
        title: 'Why I Build Things That Do Not Exist Yet',
        slug: 'why-i-build-things',
        category: 'Building',
        excerpt: 'A personal reflection on curiosity, frustration, and the quiet joy of making something that only existed in your head a few hours ago.',
        content: `
# Why I Build Things That Do Not Exist Yet

A few months ago, I needed a tool that did not exist. I wanted to take a long article, feed it to an AI, and have it ask me questions about what I just read. Not summarize it. Not explain it. Question me. Like a teacher would.

I looked for this tool everywhere. Nothing.

So I built it.

It took an evening. The code was messy. The interface was ugly. But when I pasted an article into it and the AI started asking me questions, I felt something that I have felt many times before:

**The quiet joy of making something real that did not exist a few hours ago.**

## Why I Really Build

People ask me why I spend so much time building things. The polite answer is that I want to solve problems. The real answer is more selfish:

I build because I get curious.

Something frustrates me or fascinates me, and the only way to understand it is to try making it. Reading about how something works has never been enough. I need to touch it. Break it. Try to put it back together in my own way.

This is why I have built a tokenizer from scratch, even though better ones already exist. Why I have trained a vision model on railway tracks, even though I do not work for a railway company. Why I have written the same research agent three times, each time learning what I missed the last two.

**I build to understand. Not to impress. Not to launch. To understand.**

## Frustration As Fuel

The most honest driver of my work is frustration. Not the angry kind. The kind that comes from bumping into the same problem twice and thinking \*there has to be a better way.\*

I built a fraud detection system because I was frustrated that small transactions — the kind that scammers use to test stolen cards — were invisible to traditional monitoring. I built a resume analyzer because I was frustrated by how much time I spent tailoring applications manually. I built a fairness auditing tool because I was frustrated that nobody was checking whether AI systems were fair.

**Every project started with a small frustration. Every one of them taught me something I did not expect.**

## The Lonely Part

Here is the other side of building things that do not exist yet:

Most of them will not matter to anyone but you.

I have projects on my GitHub that nobody has starred. Experiments that went nowhere. Ideas that made perfect sense at 2 AM and no sense at all the next morning.

And that is okay.

Because every one of those projects taught me something. A broken experiment is still a lesson. An abandoned idea still shaped how I think. The value is not in what gets shipped. It is in what gets learned.

## A Quiet Invitation

If you are reading this and you have an idea you keep thinking about — something small, something weird, something that probably does not make sense — build it.

Not because it will succeed. Not because anyone will care. But because the act of building it will change how you see the world.

**That alone is worth it.**
        `,
        date: 'APR 2026',
        readTime: 7,
        tags: ['BUILDING', 'MOTIVATION', 'PERSONAL', 'CURIOSITY'],
        featured: true,
    },
    {
        id: 'B001',
        title: 'Building Production-Grade AI Systems',
        slug: 'agentic-systems-production',
        category: 'Systems Architecture',
        excerpt: 'Deep dive into designing AI systems that are reliable, scalable, and ready for real-world deployment. Covering orchestration, error handling, and reasoning.',
        content: `
# Building Production-Grade Agentic Systems

We’ve all seen the demos. A simple script sends a prompt to an LLM, the LLM generates a tool call, and suddenly you have an \"autonomous agent.\" But if you’ve ever tried to move that agent from a local terminal into a production environment, you know exactly where the floor drops out.

The reality is that **autonomy is easy; reliability is hard.**

### The \"Happy Path\" Trap
Most agentic frameworks (like AutoGPT or even early LangChain implementations) focus on the happy path. They assume the agent will understand the goal, select the right tool, and interpret the output correctly. In production, the \"unhappy path\" is 80% of the engineering work.

Rate limits change. Tools return malformed JSON. The LLM gets stuck in a repetitive logic loop (hallucination spirals). To build something production-grade, we have to treat agents like distributed systems, not just chatbots.

### Core Architecture Pillars

1. **State Persistence & Checkpointing**: An agent should never be stateless. If a long-running task fails halfway through a 10-step reasoning chain, the system must be able to restore the exact state of its memory and scratchpad. I lean on Postgres with JSONB to track the "Trace ID" of every reasoning step.

2. **Hierarchical Orchestration**: Flat agents are brittle. In my recent work, I’ve moved toward a supervisor-subordinate model. A "Manager" agent breaks down the high-level goal into a graph of tasks, which are then assigned to specialized "Worker" agents with restricted tool access. This limits the "blast radius" of a single agent's mistake.

3. **Human-in-the-Loop (HITL) Triggers**: There are certain actions—database migrations, large-scale emails, financial transactions—where the entropy of an LLM is unacceptable. I implement "breakpoints" where the agent must pause and wait for a signed approval token before proceeding.

### The Feedback Loop
The most critical part of a production agent is the feedback loop. I don't just log the final output; I log the *reasoning trace*. By analyzing where agents deviate from the intended logic, I can perform targeted few-shot prompting or fine-tune smaller models (like Llama-3 8B) to handle specific sub-tasks with higher precision and lower cost than GPT-4.

Building agents isn't just about AI; it's about systems engineering. It's about building the safety rails that allow the intelligence to run at full speed without flying off the tracks.
        `,
        date: 'JAN 2026',
        readTime: 12,
        tags: ['AI SYSTEMS', 'ARCHITECTURE', 'PRODUCTION', 'SCALABILITY'],
        featured: true,
    },
    {
        id: 'B003',
        title: 'Computer Vision at Edge: Optimizing YOLOv8 for Real-Time Inference',
        slug: 'cv-edge-optimization',
        category: 'Computer Vision',
        excerpt: 'Techniques for deploying vision models on edge devices, focusing on quantization and low-latency performance on industrial hardware.',
        content: `
# Computer Vision at the Edge: The Fight for Every Millisecond

Deploying YOLOv8 on a powerful workstation with an A100 is a breeze. Deploying it on a fanless industrial PC at the edge of a railway track to detect wagon defects in real-time? That’s where the real engineering starts.

When I built the Railway Inspection system, the target was sub-100ms end-to-end latency. That included frame ingestion, preprocessing, inference, and post-processing. Here’s how I did it.

### 1. Moving Beyond Python
Python is fantastic for research, but for high-speed CV at the edge, it’s a bottleneck. I moved the entire inference pipeline to C++. Using **TensorRT**, I compiled the YOLOv8 ONNX exports into highly optimized engine files specifically tuned for the Jetson Orin's architecture. This alone gave us a 3x speedup.

### 2. The Preprocessing Pipeline
Often, the bottleneck isn't the model—it's the data preparation. I implemented a multi-threaded GStreamer pipeline for hardware-accelerated video decoding. By offloading image resizing and normalization to the GPU kernels (using CUDA), it kept the CPU free to handle the logic and network overhead.

### 3. Smart Quantization (INT8)
Standard FP16 quantization is safe, but INT8 is where you get the massive performance gains. However, naive INT8 quantization can kill your accuracy. I used **Quantization-Aware Training (QAT)** during the final few epochs of model training. This allowed the weights to adjust to the lower precision limits, maintaining 98%+ of our detection accuracy while cutting inference time by half.

### 4. Handling Environmental Chaos
Industrial environments aren't clean labs. I had to deal with:
*   **Motion Blur**: Optimized shutter speeds and implemented a lightweight deblurring kernel.
*   **Low Light**: Real-time histogram equalization before the image hits the model.

### Summary
The edge isn't just about the model. It's about the marriage of hardware-specific optimization and robust software engineering. When you're counting milliseconds, every byte of memory and every instruction cycle counts.
        `,
        date: 'NOV 2025',
        readTime: 14,
        tags: ['VISION', 'EDGE', 'OPTIMIZATION', 'HARDWARE'],
        featured: true,
    },
    {
        id: 'B005',
        title: 'Prompt Engineering for Complex Multi-Step Reasoning',
        slug: 'prompt-engineering-reasoning',
        category: 'Generative AI',
        excerpt: 'Advanced prompting techniques for breaking down complex problems and evaluating the quality of AI reasoning.',
        content: `
# Prompt Engineering for Complex Multi-Step Reasoning

Getting an LLM to do one thing is easy. Getting it to reason through a complex, multi-step problem while maintaining accuracy and consistency? That's an art.

## The Chain-of-Thought Revolution

Chain-of-thought (CoT) prompting changed everything. Instead of just asking for an answer, you prompt the model to show its reasoning:

**Before**: "What is 234 * 89?"

**After**: "Let's work through this step by step. First, multiply 234 by 9..."

But for complex reasoning, basic CoT isn't enough. You need structured prompting.

## Pattern 1: ReAct (Reason + Act)

Combine reasoning with actions. The model thinks about what to do, acts on it, observes the result, and adjusts.

This pattern is essential for any agentic system.

## Pattern 2: Tree of Thoughts

For problems with multiple valid approaches, generate multiple reasoning paths in parallel, then evaluate which leads to the best outcome.

I use this for creative writing, planning, and complex decision-making.

## Pattern 3: Self-Correction Loops

Build in explicit self-correction:

- Step 1: Generate initial solution

- Step 2: Review the solution for errors

- Step 3: If errors found, correct and repeat

- Step 4: If no errors, proceed to output

This is crucial for code generation and mathematical reasoning.

## Structured Outputs

For production systems, you need reliable output formats. Use:

1. **XML tags**: analysis and answer sections

2. **JSON schema**: Define exact structure in the prompt

3. **Pydantic models**: Parse into typed objects

## Evaluating Reasoning Quality

How do you know if your prompting is working?

1. **Consistency tests**: Run same query 5 times, check variance in answers

2. **Adversarial testing**: Try edge cases and prompt injections

3. **Step verification**: For multi-step, verify each step independently

4. **Human eval**: Have domain experts rate outputs

## The Biggest Mistake

Most people write prompts once and don't iterate. I treat prompts like code:

- Version control

- Test on diverse examples

- Measure performance over time

- Refactor when they get too complex

The best prompting is invisible — the user gets the right answer without knowing how much engineering went into the prompt.
        `,
        date: 'SEP 2025',
        readTime: 9,
        tags: ['PROMPTS', 'AI', 'REASONING', 'ENGINEERING'],
        featured: false,
    },
    {
        id: 'B007',
        title: 'EquityLens: Building an AI Fairness Auditing Platform',
        slug: 'equitylens-case-study',
        category: 'AI Ethics',
        excerpt: 'How I built a platform for detecting AI bias in healthcare, covering fairness metrics and international compliance standards.',
        content: `
# EquityLens: Building an AI Fairness Auditing Platform

When healthcare algorithms started making decisions about patient care—from triage prioritization to treatment recommendations—I realized nobody was actually checking if these AI systems were fair. That's how EquityLens was born.

## The Problem

Healthcare AI systems are being deployed at scale, but they're often trained on biased data. A model trained predominantly on data from one demographic can perform significantly worse for other groups. The EU AI Act now requires "appropriate transparency" for AI systems affecting fundamental rights—and that's exactly what EquityLens addresses.

## Architecture

### The Fairness Metrics Engine

I built a comprehensive fairness evaluation pipeline that computes:

- **Demographic Parity**: Does the model predict positive outcomes at equal rates across groups?
- **Equalized Odds**: Are true positive and false positive rates equal across groups?
- **Calibration**: Does the model have consistent probability outputs across demographics?

### The Compliance Layer

I integrated direct mappings to regulatory frameworks:
- EU AI Act risk categories and transparency requirements
- NIST AI RMF governance structures
- ISO/IEC 25059 quality standards for AI

## Key Challenges

1. **Confounding Variables**: It's not enough to check for bias—you need to understand *why* it exists. I implemented causal inference modules to distinguish between correlation and causation.

2. **Trade-off Visualization**: Fairness often comes at the cost of accuracy. I built interactive Pareto frontier plots so stakeholders can see exactly what they're trading off.

3. **Real-time Monitoring**: Bias can creep in over time as data distributions shift. The platform includes automated drift detection for fairness metrics.

## Results

- Surfaced a **23% performance gap** on a public triage dataset across demographic groups
- Cut a manual fairness review from days to under an hour
- Packaged as a reproducible audit report with an interactive dashboard

The source is on [GitHub](https://github.com/KunjShah95/fairness-lens-studio), validated on public, de-identified datasets.

Fairness isn't just a feature—it's a requirement for responsible AI deployment.
        `,
        date: 'APR 2026',
        readTime: 8,
        tags: ['ETHICS', 'HEALTHCARE', 'COMPLIANCE', 'CASE STUDY'],
        featured: true,
    },
    {
        id: 'B008',
        title: 'Orchestrating Complex AI Workflows',
        slug: 'agentic-workflow-orchestration',
        category: 'AI Systems',
        excerpt: 'Deep dive into building resilient multi-agent systems, exploring task delegation and error recovery in complex automation pipelines.',
        content: `
# Agentic Workflow Orchestration: Moving Beyond Single-Prompt Agents

The transition from single-prompt interactions to complex agentic workflows represents a paradigm shift in AI engineering. While a single prompt can solve isolated tasks, "workflows" allow for persistent reasoning, tool use, and self-correction.

## The Limits of Single-Prompt Agents
Single-prompt agents are often "fire and forget." They lack the ability to:
- **Handle multi-step dependencies**: Where the output of step A dictates the tool selection for step B.
- **Recover from errors**: If a tool call fails, the agent usually terminates or hallucinates a fix.
- **Maintain long-term context**: State is lost between independent runs.

## Enter Orchestration Frameworks
In my recent projects, I’ve moved toward **CrewAI** and **LangGraph** for more robust orchestration.

### 1. CrewAI: Role-Based Collaboration
CrewAI allows you to define specialized agents with distinct personas (e.g., Researcher, Writer, Analyst).
- **Task Delegation**: A "Manager" agent can assign sub-tasks based on expertise.
- **Memory Systems**: Short-term and long-term memory allow agents to "remember" previous tool outputs.

### 2. LangGraph: Cyclical Reasoning
LangGraph enables cyclical graphs, which are essential for self-correction loops. If an agent's code execution fails a test, the graph can route the control back to the "Coder" agent to fix the bug.

## Designing for Resilience
In production, I design for the "failure case."
- **Fallback Models**: If GPT-4 hits a rate limit, the orchestrator should automatically switch to a local Llama-3 instance via Ollama.
- **Human-in-the-Loop**: Critical actions (like deleting data or making payments) should trigger a "pause" in the graph for human approval.

Orchestration is what turns a chatbot into a reliable digital employee.
        `,
        date: 'FEB 2026',
        readTime: 12,
        tags: ['AI SYSTEMS', 'ORCHESTRATION', 'WORKFLOWS'],
        featured: false,
    },
    {
        id: 'B012',
        title: 'When AI Gets It Wrong: A Story About Trust',
        slug: 'when-ai-gets-it-wrong',
        category: 'AI Ethics',
        excerpt: 'I built a system that made a mistake. Not a technical bug — a human one. Here is what I learned about trust, testing, and taking responsibility.',
        content: `
# When AI Gets It Wrong: A Story About Trust

I built a system once that was supposed to help people. It read job descriptions, analyzed them for red flags, and told the user if something seemed off. Toxic language. Unreasonable demands. Signs of ghost hiring.

It worked beautifully in testing. Every test case passed. The accuracy numbers looked great.

And then it told someone their dream job was toxic. When it was not.

## The Call I Did Not Expect

A user wrote to me. They said the system had flagged an offer they were excited about. It highlighted words like \*fast-paced\* and \*wear many hats\* as potential burnout risks. The user was confused. They had talked to the team. They knew the culture. The system was wrong.

I remember reading that email and feeling my stomach drop.

I built this thing to help people. And here it was, causing stress instead.

The worst part? The system was not technically wrong. Those phrases *can* be red flags. But it lacked context. It could not tell the difference between a genuinely toxic workplace and a startup that is just passionate. It saw patterns, not people.

## What I Learned

That experience changed how I think about building AI systems.

**1. Accuracy is not enough.**
A system can be 95% accurate and still hurt someone in the 5%. If you are building something that affects real decisions, you need to think about the edge cases. Not as bugs to fix — but as people to consider.

**2. Tell people when you might be wrong.**
I added a disclaimer after that incident. Not a legal one. A human one. Something like: \*I am a tool, not a judge. Use me as input, not truth.\* It felt obvious in hindsight. But I had been too excited about the technology to think about the responsibility.

**3. Build room for human judgment.**
The best systems do not replace human decisions. They inform them. A flag is useful. A verdict is dangerous. I started designing every output as a suggestion, not a conclusion.

## Trust Takes Time

Here is the thing I keep coming back to:

Trust in AI is not built by having better accuracy. It is built by being honest about limitations. By admitting when you are wrong. By designing systems that respect the user's ability to make their own choice.

I still build systems that analyze and flag and recommend. But now I build them with more humility.

**And I always include a way for a human to say: I disagree.**
        `,
        date: 'MAR 2026',
        readTime: 7,
        tags: ['AI ETHICS', 'TRUST', 'LESSONS', 'HUMAN'],
        featured: true,
    },
    {
        id: 'B013',
        title: 'The Messy Middle of Every Project',
        slug: 'messy-middle-of-projects',
        category: 'Building',
        excerpt: 'The part between starting and finishing is the hardest. Nobody talks about it enough. Here is what it actually feels like and how I get through it.',
        content: `
# The Messy Middle of Every Project

Starting a project feels amazing. You have an idea. Everything is possible. The code is fresh. The motivation is high. You stay up late because you cannot stop thinking about it.

Finishing a project also feels amazing. You ship. You share. You feel that quiet pride of something complete.

But between starting and finishing is a long stretch that nobody talks about. I call it the messy middle.

## What The Messy Middle Feels Like

The messy middle is when:
- The exciting parts are done and the boring parts are all that is left
- You realize the architecture you planned needs to change
- A bug takes three days to fix instead of three hours
- You open the code and feel tired before you even start

I have been in the messy middle of almost every project I have ever built. And every time, I have the same thought: \*maybe this one is not worth finishing.\*

**That thought is a liar.**

## How I Get Through It

Over time, I have found a few things that actually help when I am stuck in the messy middle:

**1. Shrink the goal.**
When the whole project feels overwhelming, I stop thinking about the whole project. I pick one tiny thing — fix one bug, write one paragraph, refactor one function — and do only that. No multitasking. Just the one thing. Finishing something small gives me enough momentum to keep going.

**2. Talk to someone.**
Not for advice. Just to say \*I am building this thing and it is harder than I expected.\* Saying it out loud makes it smaller. And sometimes the other person asks a question that unblocks me without meaning to.

**3. Remember why I started.**
I keep a note at the top of every project. One sentence. \*I am building this because...\* When I am in the messy middle, I read that sentence. It reminds me that the hard work has a direction, even when it does not feel like it.

## The Middle Is Where The Work Happens

Here is what I have learned to accept:

The messy middle is not a sign that something is wrong. It is a sign that you are past the easy part and into the real work. The excitement of starting is a gift. But the discipline of continuing is what actually builds things.

**So if you are in the messy middle of something right now, keep going. The other side is closer than it feels.**
        `,
        date: 'FEB 2026',
        readTime: 6,
        tags: ['BUILDING', 'MOTIVATION', 'MINDSET', 'PROCESS'],
        featured: true,
    },
    {
        id: 'B014',
        title: 'Writing Code for Humans',
        slug: 'writing-code-for-humans',
        category: 'Building',
        excerpt: 'The best code I have ever written is not the smartest. It is the kindest. Here is why I care more about readability than cleverness.',
        content: `
# Writing Code for Humans

I used to think good code was clever code. The kind that made other developers nod and say \*nice.\* Short. Elegant. Using every feature of the language in a single line.

I don not think that anymore.

## The Code I Regret

A few months ago, I opened a project I had not touched in six months. It was my own code. And I could not understand it.

There was a function that did three things in one loop. There was a variable name that made sense only to me at 2 AM. There was an optimization that saved two milliseconds but took me an hour to trace through.

I remember staring at the screen and thinking: \*who wrote this?\*

I did. And future me was furious at past me.

**Clever code is a gift to your ego. Clear code is a gift to everyone else — including future you.**

## What I Do Differently Now

I have changed how I write code. Not because I got smarter, but because I got more considerate:

**1. I name things carefully.**
A variable called \*data\* tells me nothing. A variable called \*parsedJobDescriptions\* tells me exactly what it holds. I spend more time choosing names now. It feels slow in the moment. It saves hours later.

**2. I write small functions.**
If a function does more than one thing, I split it. Even if it means more files. A hundred simple files are easier to understand than one clever one.

**3. I add context, not comments.**
Comments that say \*this is a loop\* are useless. Comments that say \*we sort by priority here because the API requires ordered input\* are gold. But even better: I try to make the code explain itself.

## The Kindness Principle

Here is the idea I keep coming back to:

**Write code as if the person reading it is a kind stranger who is trying to help you.**

They do not know what you were thinking at 2 AM. They do not share your assumptions. They just need to understand what the code does so they can fix a bug or add a feature.

The kindest thing you can do is make that as easy as possible.

## It Pays Off

I have noticed something since I started writing code this way. When I come back to an old project, I can jump in faster. When someone else reads my code, they ask fewer questions. When something breaks, I find the bug sooner.

Writing for humans is not just nice. It is practical.

**And honestly, it feels better too.**
        `,
        date: 'JAN 2026',
        readTime: 6,
        tags: ['CODING', 'CRAFT', 'MINDSET', 'BEST PRACTICES'],
        featured: true,
    },
    {
        id: 'B015',
        title: 'Starting Before You Are Ready',
        slug: 'starting-before-you-are-ready',
        category: 'Building',
        excerpt: 'I have never felt ready for any project I finished. The ones I waited to start are the ones I never built. Here is why I jump in anyway.',
        content: `
# Starting Before You Are Ready

I almost did not start any of my projects.

Every single one of them began with the same feeling: \*I do not know enough to build this.\*

The Railway Inspection system? I had never deployed a model on edge hardware before. The fraud detection engine? I had never worked with financial transaction data. The fairness auditing tool? I barely understood bias metrics when I started.

**I learned by building. Not by waiting until I was ready.**

## The Waiting Trap

Here is how the waiting trap works:

You have an idea. You think about it. You read about it. You watch tutorials. You bookmark resources. You tell yourself you will start once you understand it better.

But understanding never comes from reading. It comes from doing.

I spent two weeks reading about quantization before I started the Railway Inspection project. Two weeks of tutorials and papers and notes. And you know what? None of it stuck.

Then I wrote one line of code that quantized a model. And in that moment, I understood more than I had in two weeks of reading.

**The reading is not the learning. The doing is.**

## What I Do Now

I have a rule now. It is simple and I break it all the time, but when I follow it, everything gets better:

**Start before you feel ready. Let the panic of not knowing push you to figure it out.**

Concretely, this means:
- I write the first line of code within an hour of having the idea
- I accept that the first version will be bad (it always is)
- I treat confusion as a sign that I am learning, not a sign that I should stop

## The Fear Never Goes Away

I have built a lot of things at this point. And I still feel the same fear before every new project. The voice that says \*you are not qualified\* and \*someone else can do this better.\*

That voice never goes away. I have just learned to build things while it is talking.

**If you are waiting to feel ready before you start something, here is your sign: you will never feel ready. Start anyway.**
        `,
        date: 'DEC 2025',
        readTime: 6,
        tags: ['BUILDING', 'MINDSET', 'STARTING', 'FEAR'],
        featured: true,
    },
    {
        id: 'B016',
        title: 'How I Built OfferGuard AI: A Case Study',
        slug: 'case-study-offerguard-ai',
        category: 'Case Study',
        excerpt: 'How I built an AI-powered job offer analyzer that reads offer letters, recruiter chats, and job descriptions to surface red flags in seconds. The full story from idea to deployment.',
        content: `
# How I Built OfferGuard AI: A Case Study

The idea came from a conversation. A friend had received a job offer that looked great on paper — good salary, nice title, respectable company. But something felt off. They could not put their finger on it. They asked me: \*can you build something that reads this and tells me what to look out for?\*

I said yes before I knew how.

## The Problem

Job seekers receive offers that are designed to look good. The recruiter is on your side — until they are not. Ghost jobs, bait-and-switch titles, burnout culture hidden behind words like \*fast-paced\* and \*wear many hats.\*

The existing tools were either generic (glassdoor reviews from strangers) or required a lawyer. Nobody was reading the actual text of the offer and analyzing it in real time.

## What I Built

OfferGuard AI takes three inputs:
- A job description
- An offer letter (or offer summary)
- A recruiter chat transcript

It analyzes all three together and surfaces:
- **Toxicity signals**: language patterns that correlate with poor work environments
- **Burnout risk**: unreasonable expectations disguised as opportunity
- **Salary fairness**: market comparison based on role, location, and experience
- **Ghost job detection**: signs that the role may not be real
- **Negotiation strategy**: specific talking points the candidate can use

## The Technical Side

I used a multi-provider AI approach. Different models are better at different things. One model handles the initial scan, another does the deep analysis, and a third cross-checks the results for consistency. This way, if one model misses something, another catches it.

The frontend is built with TanStack Start and React 19. Users paste their documents and get results in seconds. No signup required. No data stored.

## What I Learned

The hardest part was not the technology. It was the responsibility.

When you tell someone their job offer might be toxic, you are affecting a real decision in their life. I spent more time on the disclaimer than on any single feature. \*I am a tool, not a judge. Use me as input, not truth.\*

I also learned that people do not want a verdict. They want context. The most useful feature is not the red flag count — it is the specific sentences highlighted with an explanation of why they matter.

## The Result

The project is live at [offerchecker-pi.vercel.app](https://offerchecker-pi.vercel.app/). It has been used by job seekers across multiple industries. The feedback that matters most is when someone writes back and says \*that helped me negotiate a better offer.\*

**That is why I build things.**
        `,
        date: 'MAR 2026',
        readTime: 8,
        tags: ['CASE STUDY', 'AI', 'PRODUCT', 'BUILDING'],
        featured: true,
    },
    {
        id: 'B017',
        title: 'Building EquityLens: Auditing AI for Fairness',
        slug: 'case-study-equitylens',
        category: 'Case Study',
        excerpt: 'The story of building an AI fairness auditing platform that detects bias in healthcare models. What I found, how I built it, and why it matters more than ever.',
        content: `
# Building EquityLens: Auditing AI for Fairness

I started this project because I was angry.

Healthcare algorithms were making decisions about patient care — who gets prioritized, what treatment is recommended, which patients need follow-ups. And nobody was checking if these systems were fair.

## The Problem

A model trained mostly on data from one demographic group will perform worse for other groups. This is not a bug. It is a feature of how machine learning works. Models learn patterns from their training data. If the training data is skewed, the model will be skewed too.

The problem is that in healthcare, skewed decisions have real consequences. A triage system that underestimates the severity of a patient's condition can delay critical care. A treatment recommender that works better for one group than another creates unequal outcomes.

The EU AI Act now requires transparency for AI systems affecting fundamental rights. But compliance is expensive. Most small hospitals and clinics do not have the resources to audit their models.

## What I Built

EquityLens is a fairness auditing platform that automates the detection of bias in AI models. It computes standard fairness metrics — demographic parity, equalized odds, calibration — and maps them directly to regulatory frameworks like the EU AI Act and NIST AI RMF.

The platform includes:
- A fairness metrics engine that evaluates models against multiple demographic axes
- Causal inference modules that distinguish correlation from causation
- Interactive visualizations showing fairness-accuracy tradeoffs
- Automated drift detection for monitoring bias over time
- Compliance report generation aligned with international standards

## The Technical Side

The backend is built with FastAPI and Python. The fairness engine uses standard ML fairness libraries plus custom implementations for healthcare-specific metrics. The frontend is built with React, and the visualization layer uses interactive charts that let stakeholders explore tradeoffs.

The hardest technical challenge was the causal inference module. It is not enough to detect that bias exists — you need to understand *why*. I implemented multiple causal analysis methods to distinguish between genuine model bias and confounding variables in the data.

## What I Found

When I ran the platform on a public healthcare triage dataset, it surfaced a 23% performance gap across demographic groups. The model was significantly less accurate for certain populations.

That number — 23% — is the reason I built this.

## The Result

The platform is open source on [GitHub](https://github.com/KunjShah95/fairness-lens-studio). It reduces a manual fairness review from days to under an hour. It has been validated on public, de-identified healthcare datasets.

**Fairness is not a feature. It is a requirement.**
        `,
        date: 'FEB 2026',
        readTime: 8,
        tags: ['CASE STUDY', 'AI ETHICS', 'HEALTHCARE', 'BUILDING'],
        featured: true,
    },
    {
        id: 'B018',
        title: 'Teaching a Computer to Inspect Railway Tracks',
        slug: 'case-study-railway-inspection',
        category: 'Case Study',
        excerpt: 'Building a real-time railway defect detection system that runs on edge hardware. The story of YOLOv8, TensorRT, and why every millisecond matters.',
        content: `
# Teaching a Computer to Inspect Railway Tracks

A railway track inspection system has to find tiny defects in metal, at high speed, in broad daylight and pouring rain, on a computer that fits in a backpack. This is the story of how I built one.

## The Problem

Manual railway inspection is slow, dangerous, and inconsistent. A human inspector walks miles of track looking for cracks, deformations, and wear patterns. In a moving train, the window for detecting a defect is milliseconds. Miss one, and the consequences are serious.

The existing automated systems were expensive and required specialized hardware. I wanted to build something that could run on affordable edge devices and still meet the accuracy requirements.

## What I Built

A computer vision system that runs YOLOv8 on a Jetson Orin edge device, detecting railway wagon defects in real time. The target was sub-100ms end-to-end latency — from camera frame to detection output.

I moved the inference pipeline from Python to C++ using TensorRT, compiling the model into highly optimized engine files for the Jetson architecture. This gave a 3x speedup immediately.

The preprocessing pipeline used hardware-accelerated video decoding via GStreamer, offloading image resizing and normalization to the GPU. This kept the CPU free for logic and networking.

## The Hardest Part

The real world is not a clean lab. I had to handle:
- **Motion blur**: trains move fast. I optimized shutter speeds and added a lightweight deblurring kernel.
- **Low light**: inspections happen at all hours. Real-time histogram equalization before inference.
- **Temperature variation**: the edge device sits outside. Thermal management in software.

The most important lesson was that INT8 quantization with Quantization-Aware Training maintained 98%+ accuracy while cutting inference time in half. It was the difference between a lab demo and a real-world system.

## The Result

The system achieved 98.7% defect detection accuracy with a 4.2x speedup over traditional methods. It runs on affordable edge hardware, making automated inspection accessible to smaller rail operators.

**The edge is not just about the model. It is about every millisecond.**
        `,
        date: 'JAN 2026',
        readTime: 7,
        tags: ['CASE STUDY', 'COMPUTER VISION', 'EDGE', 'HARDWARE'],
        featured: true,
    },
    {
        id: 'B019',
        title: 'Catching Fraud Before It Happens: UPI Fraud Guard',
        slug: 'case-study-upi-fraud-guard',
        category: 'Case Study',
        excerpt: 'Using machine learning to catch fraudulent UPI transactions that static rules miss. The story of building a real-time fraud detection engine from scratch.',
        content: `
# Catching Fraud Before It Happens: UPI Fraud Guard

Fraudsters are getting smarter. Static rule-based systems cannot keep up. This is the story of building a machine learning system that detects fraudulent UPI transactions in real time.

## The Problem

UPI (Unified Payments Interface) processes billions of transactions in India every month. Most are legitimate. But the ones that are not — the fraudulent ones — are getting harder to catch.

Traditional fraud detection relies on static rules: flag transactions above a certain amount, block repeated attempts from the same IP, watch for unusual locations. But fraudsters have learned to work around these rules. They test with small amounts. They use multiple accounts. They mimic legitimate behavior.

The challenge was to build a system that could detect fraud patterns that static rules miss, while keeping false positives low enough that genuine users are not blocked.

## What I Built

UPI Fraud Guard is a machine learning-based fraud detection engine that analyzes transaction patterns in real time. It uses an ensemble of models — XGBoost for structured pattern detection, anomaly detection for unusual behavior, and a custom scoring layer that combines signals into a risk score.

The system processes transactions as they happen. Each transaction is scored in milliseconds. High-risk transactions are flagged for review. Medium-risk transactions are monitored. Low-risk transactions pass through.

## The Technical Side

The backend is built with Flask and Python. The feature engineering pipeline extracts dozens of signals from each transaction: amount, frequency, time patterns, device fingerprints, location proximity, and historical behavior.

The model training used Scikit-learn for preprocessing and XGBoost for the primary classifier. I used SMOTE for handling the class imbalance (fraudulent transactions are rare — less than 0.1% of total volume).

The hardest part was the evaluation. When you are dealing with financial transactions, false positives are expensive. Blocking a legitimate transaction is worse than letting a fraudulent one through in some cases. I designed the system with configurable thresholds so operators can tune the sensitivity based on their risk tolerance.

## The Result

The system detected 88% of anomalous transactions with a false positive rate under 0.1%. It reduced the manual review workload significantly while catching fraud patterns that static rules missed entirely.

**The best fraud detection is invisible. It stops bad transactions without the good ones ever noticing.**
        `,
        date: 'DEC 2025',
        readTime: 7,
        tags: ['CASE STUDY', 'ML', 'FRAUD', 'FINANCE'],
        featured: true,
    },
    {
        id: 'B020',
        title: 'Building ArchMind AI: An Architecture Intelligence Platform',
        slug: 'case-study-archmind-ai',
        category: 'Case Study',
        excerpt: 'How I built ArchMind AI — an AI Staff Architect that parses diagrams and code into architecture graphs, runs 7 specialized agents for review, simulates failures, and generates redesigns. Full-stack with a resilient zero-LLM-key fallback.',
        content: `
# Building ArchMind AI: An Architecture Intelligence Platform

Architecture review has always been a slow, senior-engineer-only bottleneck. Diagrams sit in static docs, risks go unnoticed until production incidents, and teams lack automated tooling to evaluate tradeoffs. I built ArchMind AI to change that.

## The Problem

Engineering teams face three structural problems with architecture:

1. **Review is bottlenecked on senior engineers** — there are never enough staff architects to review every design doc, and most reviews happen as a rubber stamp after decisions are already made.
2. **Architecture knowledge is static** — diagrams in a wiki rot. There is no live analysis, no automated risk detection, no way to ask "what breaks if this service fails?"
3. **Multi-dimensional tradeoffs are invisible** — a design might be scalable but insecure, cheap but unreliable. Teams lack tooling that scores across all the axes that matter.

## What I Built

ArchMind AI is an **AI Staff Architect** — upload a Mermaid/PlantUML diagram, an image/PDF, paste code, and the platform does the rest:

- **7-Agent Analysis Engine** — Scalability, Security, Reliability, Performance, Cost, Maintainability, and Observability agents each score a dimension and emit severity-ranked findings, aggregated into an overall architecture score.
- **AI Architecture Generator** — Describe a system in natural language (*"Design an e-commerce platform for 10M users"*) and get back a Mermaid diagram, tech-stack rationale, and starter Kubernetes/Terraform manifests.
- **Simulation & Resilience Suite** — Project latency (p50/p95/p99) and cost across user tiers, and run a chaos failure simulator that traces cascade failures and estimates recovery MTTR.
- **One-Click Redesigns** — Re-optimize a design against blueprints such as Cost Optimized, High Availability, Enterprise Scale, and Multi-Region, with side-by-side comparison.
- **Compliance Auditing** — Score readiness against SOC 2, ISO 27001, GDPR, HIPAA, and PCI DSS and list outstanding gaps.
- **Architecture Copilot** — Chat with an assistant that knows your components, connections, and findings (*"What happens if Redis fails?"*).
- **DevOps, IaC & API Auditing** — Scan Terraform, Kubernetes YAML, and Docker Compose for misconfigurations; review OpenAPI specs; detect missing database indexes.

## The Technical Side

The frontend (Vite + React + TypeScript + Tailwind + shadcn/ui) on Vercel talks to a FastAPI backend on Render. Supabase handles JWT auth and PostgreSQL. The backend parses architecture inputs (Mermaid/PlantUML text or image/PDF via vision extraction) into a unified graph, runs seven agent analyses in parallel, and aggregates findings into a scored report.

The hardest engineering challenge was the **LLM strategy**. I wanted the product to work with zero API keys — no chicken-and-egg problem for new users. The solution is a provider fallback chain (Groq → NVIDIA → OpenRouter → Gemini → Ollama → HuggingFace) with an 18-rule heuristic engine as the final fallback. No LLM keys configured? The heuristic engine produces a baseline score so the product still delivers value. Configure any provider, and it upgrades automatically.

Render's free tier spins down after ~15 min idle, causing a ~40s cold start. I solved this with a GitHub Actions keep-warm workflow that pings /api/health every 10 minutes, plus client-side warming on page load.

## What I Learned

- **Seven specialized agents beat one monolithic analysis** every time. Each dimension (security, cost, reliability) has different evaluation logic — mixing them degrades quality.
- **A heuristic fallback engine makes the product viable for anyone.** Zero-config onboarding is a product decision, not just a technical one.
- **Architecture review is inherently multi-agent** — the same way you'd ask a security engineer, a SRE, and a cost analyst to review a design, the platform needs specialized agents for each dimension.
- **Cold starts are a UX problem disguised as an infrastructure problem** — solve them at the UX layer (warming + graceful degradation), not just with more expensive hosting.

## The Result

ArchMind AI is live at [archmind-ai-topaz.vercel.app](https://archmind-ai-topaz.vercel.app/), with full source on [GitHub](https://github.com/KunjShah95/archmind-ai). Upload a diagram or paste code, and get a multi-dimensional architecture score with prioritized findings in minutes.

**Architecture review should be automated, continuous, and multi-dimensional — not a rubber stamp from the one senior engineer who has time.**
        `,
        date: 'JUL 2026',
        readTime: 10,
        tags: ['CASE STUDY', 'ARCHITECTURE', 'AGENTS', 'FULLSTACK', 'AI'],
        featured: true,
    },
    {
        id: 'B021',
        title: 'The ArchMind Research Agent: Autonomous Discovery to Report',
        slug: 'case-study-archmind-research-agent',
        category: 'Case Study',
        excerpt: 'Building the autonomous research agent behind ArchMind — a self-planning agent that explores the web, evaluates sources, and writes cited analysis. Deployed on Streamlit Cloud.',
        content: `
# The ArchMind Research Agent: Autonomous Discovery to Report

ArchMind AI needed a brain that could actually *do* research, not just talk about it. That brain is the ArchMind Research Agent — an autonomous, self-planning agent that takes an open-ended request and returns structured, cited findings.

## The Problem

Internship and market research is repetitive and error-prone. Matching roles, companies, and requirements by hand wastes days and misses signal. Generic search dumps links; it doesn't *reason* about what you need.

## What I Built

The agent runs a four-stage pipeline:

1. **Plan** — a planner agent breaks the request into focused sub-queries
2. **Search** — web search + scraping agents gather evidence
3. **Read** — an extractor normalizes structured fields from noisy sources
4. **Synthesize** — a writer agent produces a cited report grounded in the collected evidence

RAG over the gathered evidence keeps the synthesis factual instead of hallucinated. The whole flow is exposed through an interactive Streamlit UI so users can watch and steer the research live.

## The Technical Side

The biggest engineering challenge was **signal extraction** — web sources are inconsistent, messy, and often contradictory. I constrained the planner tightly so the agent stays on-topic and cheap, and I used RAG over collected evidence to anchor the writer rather than letting it free-generate. The result is a pipeline that is both autonomous and verifiable.

## What I Learned

- A **tight planner** keeps research agents on-track and keeps token costs down.
- **Grounded RAG beats free-form generation** every time for factual reports.
- An interactive UI turns a black-box agent into something people actually trust.

## The Result

The agent is deployed at [internship-assessment-er3kjmh8nw5vvj8wgwxlmc.streamlit.app](https://internship-assessment-er3kjmh8nw5vvj8wgwxlmc.streamlit.app/), with source on [GitHub](https://github.com/KunjShah01/INTERNSHIP-ASSESSMENT). It turns open-ended research requests into structured, cited findings in minutes.

**Autonomy without grounding is just confident guessing.**
        `,
        date: 'JUN 2026',
        readTime: 7,
        tags: ['CASE STUDY', 'AGENTS', 'RAG', 'DEPLOY'],
        featured: true,
    },
];

export const LOGS: LogEntry[] = [
    {
        id: 'LOG001',
        date: '2026-01-27',
        hash: 'A3F7C2',
        module: 'AI Systems',
        action: 'Deployed Automation Framework',
        details: 'Implemented a multi-model orchestration layer for handling complex task sequences with improved error recovery.',
    },
    {
        id: 'LOG002',
        date: '2026-01-25',
        hash: 'B9E5F1',
        module: 'MLOps',
        action: 'Integrated Monitoring Suite',
        details: 'Configured comprehensive system monitoring with automated drift detection and real-time performance alerts.',
    },
    {
        id: 'LOG003',
        date: '2026-01-23',
        hash: 'C4D2A8',
        module: 'Database',
        action: 'Optimized Vector Indexing',
        details: 'Implemented HNSW indexing for semantic search, reducing query latency significantly for large datasets.',
    },
    {
        id: 'LOG004',
        date: '2026-01-20',
        hash: 'D7B1E6',
        module: 'Machine Learning',
        action: 'Quantized Vision Model',
        details: 'Converted YOLOv8 to INT8 precision, achieving a 4x inference speedup while maintaining high accuracy.',
    },
    {
        id: 'LOG005',
        date: '2026-01-18',
        hash: 'E2F9C3',
        module: 'Frontend',
        action: 'Redesigned Project Theme',
        details: 'Finalized the industrial aesthetic update with enhanced scroll animations and refined grid layouts.',
    },
];

export const FEATURED_PROJECTS = [
    {
        id: 'archmind-ai',
        title: 'ArchMind AI',
        problem: 'Architecture review is a slow, senior-engineer-only bottleneck — diagrams rot in docs, risks go unseen until incidents, and teams lack automated tooling for design tradeoffs.',
        solution: 'Built an AI Staff Architect that parses diagrams/code into a graph, runs 7 specialized agents for review, simulates failures, runs compliance audits, and generates one-click redesigns.',
        techStack: ['TypeScript', 'Python', 'React', 'FastAPI', 'Supabase'],
        result: 'Turns an architecture diagram into a multi-dimensional scored report with prioritized findings, live on Vercel + Render.',
        demoUrl: 'https://archmind-ai-topaz.vercel.app/',
        githubUrl: 'https://github.com/KunjShah95/archmind-ai',
    },
    {
        id: 'archmind-research-agent',
        title: 'ArchMind Research Agent',
        problem: 'Internship and market research is repetitive and error-prone, missing signal when done by hand.',
        solution: 'An autonomous research agent that explores the web, evaluates sources, and writes cited analysis with verifiable provenance.',
        techStack: ['Python', 'LangGraph', 'Streamlit', 'RAG', 'Web Scraping'],
        result: 'Automates the full discovery-to-report pipeline, deployed on Streamlit Cloud.',
        demoUrl: 'https://internship-assessment-er3kjmh8nw5vvj8wgwxlmc.streamlit.app/',
        githubUrl: 'https://github.com/KunjShah01/INTERNSHIP-ASSESSMENT',
    },
    {
        id: 'learnai',
        title: 'LearnAI',
        problem: 'Traditional e-learning platforms provide a one-size-fits-all experience, failing to adapt to student learning speeds.',
        solution: 'Personalized learning platform with adaptive tutoring, smart quizzes, and progress tracking across multiple model providers.',
        techStack: ['Next.js', 'Firebase', 'Supabase', 'Gemini'],
        result: 'Increased quiz completion rates by 45% through adaptive difficulty adjustment.',
        demoUrl: 'https://intelligent-learning-assistant.vercel.app',
        githubUrl: 'https://github.com/KunjShah95/intelligent-learning-assistant',
    },
];

/**
 * Live system status — what Kunj is currently doing.
 * Hardcoded for v1. In v2, replace with a fetch from a small Cloudflare Worker
 * or read from a JSON file in /public/.
 */
export const LIVE_STATUS = {
  building: 'Multi-agent research workflow',
  shipped: '12 things in 2026',
  reading: 'Designing Data-Intensive Applications',
  location: 'Ahmedabad, IN',
  available: true,
  lastUpdated: '2026-06-02T00:00:00Z',
} as const;

export const HACKATHONS: Array<{
  title: string;
  event?: string;
  name?: string;
  description?: string;
  summary?: string;
  year: number;
  placement?: string;
  team?: string;
  prize?: string;
}> = [
  {
    title: 'Autonomous Hacks',
    event: 'Autonomous Hacks',
    description: 'Selected out of 2000+ teams in the online round, and from 300+ teams in the offline final round. Built an autonomous AI system end-to-end in 48 hours.',
    year: 2026,
    placement: 'Finalist',
    team: 'Solo',
  },
  {
    title: 'Odoo Adani Hackathon',
    event: 'Odoo x Adani',
    description: 'Selected for the final round out of 100+ teams in the Odoo Adani Hackathon.',
    year: 2026,
    placement: 'Finalist',
    team: '4',
  },
  {
    title: 'AIDTM Hackathon',
    event: 'AIDTM',
    description: 'Participated in AIDTM Hackathon organized by Adani.',
    year: 2026,
    placement: 'Participant',
    team: '3',
  },
  {
    title: 'AMD Slingshot',
    event: 'AMD Slingshot',
    description: 'Participated in AMD Slingshot hackathon challenge.',
    year: 2026,
    placement: 'Participant',
    team: '2',
  },
  {
    title: 'Odoo Gandhinagar',
    event: 'Odoo Gandhinagar',
    description: 'Selected for the final round out of 350+ teams at Odoo Gandhinagar.',
    year: 2025,
    placement: 'Finalist',
    team: '3',
  },
  {
    title: 'SIH Hackathon (College Level)',
    event: 'Smart India Hackathon',
    description: 'Qualified as finalist at college-level SIH hackathon.',
    year: 2025,
    placement: 'Finalist',
    team: '6',
  },
  {
    title: 'Walmart Hackathon',
    event: 'Walmart',
    description: 'Participated in Walmart innovation hackathon challenge.',
    year: 2025,
    placement: 'Participant',
    team: '3',
  },
  {
    title: 'Google Agentic AI Hackathon',
    event: 'Google',
    description: 'Participated in Google Agentic AI Hackathon.',
    year: 2025,
    placement: 'Participant',
    team: '2',
  },
  {
    title: 'Yorkie Hackathon',
    event: 'Yorkie',
    description: 'Participated in Yorkie Hackathon 2025.',
    year: 2025,
    placement: 'Participant',
    team: '2',
  },
  {
    title: 'Open Source Workshop',
    event: 'Community',
    description: 'Participated in open source workshop and collaborative sessions.',
    year: 2025,
    placement: 'Participant',
    team: 'Community',
  },
];
