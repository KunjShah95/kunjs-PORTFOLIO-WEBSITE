import { Project, Experience, SkillGroup, Education, UserIdentity, Social, Blog, LogEntry } from '../types';
import { Brain, Database, Terminal, Workflow, ExternalLink, Github, Twitter, Linkedin } from 'lucide-react';

export const IDENTITY: UserIdentity = {
    name: "Kunj Shah",
    persona: "AI Engineer & Systems Builder",
    location: "Ahmedabad, IN",
    contact: "kunjkshah05@gmail.com",
    focus: ["AI Systems", "Autonomous Agents", "MLOps", "Computer Vision"],
    github_username: "KunjShah95",
    profile_photo: "/profile.png"
};

export const PROJECTS: Project[] = [
    {
        id: '01',
        title: 'CinePulse',
        category: 'NLP & RECOMMENDATION SYSTEMS',
        desc: 'Emotion-based movie recommender using NLP classification and embedding-based similarity matching for high-precision discovery.',
        tech: ['PYTHON', 'PYTORCH', 'TRANSFORMERS', 'VALD'],
        github: 'https://github.com/KunjShah95/CinePulse',
        slug: 'cinepulse',
        impact: 'PRODUCTION_READY',
    },
    {
        id: '02',
        title: 'GAP Miner',
        category: 'SEMANTIC INTELLIGENCE',
        desc: 'AI-powered skill gap analyzer leveraging semantic extraction from resumes and JDs to provide actionable learning paths.',
        tech: ['LLAMA-3', 'LANGCHAIN', 'FASTAPI', 'REACT'],
        github: 'https://github.com/KunjShah95/GAP-Miner',
        slug: 'gap-miner',
        impact: 'BETA_LIVE',
    },
    {
        id: '03',
        title: 'Railway Inspection',
        category: 'COMPUTER VISION',
        desc: 'Real-time wagon inspection system with multi-camera ingestion, motion deblurring, and low-light enhancement pipelines.',
        tech: ['C++', 'OPENCV', 'YOLOv8', 'vLLM'],
        github: 'https://github.com/KunjShah95/Railway-Inspection',
        slug: 'railway-inspection',
        impact: 'FIELD_TESTED',
    },
    {
        id: '04',
        title: 'UPI Fraud Guard',
        category: 'PREDICTIVE ANALYTICS',
        desc: 'Advanced transaction fraud detection system handling extreme class imbalance and anomaly detection with precision optimization.',
        tech: ['SCIKIT-LEARN', 'XGBOOST', 'PANDAS', 'FLASK'],
        github: 'https://github.com/KunjShah95/UPI-Fraud-Detection',
        slug: 'upi-fraud-guard',
        impact: 'ALGO_STABLE',
    },
    {
        id: '05',
        title: 'SENTINEL CLI',
        category: 'SECURITY & CODE REVIEW',
        desc: 'Local-first AI-powered code review and security analysis CLI with multi-LLM support, analyzers for security, dependency & accessibility checks, and autofix capabilities.',
        tech: ['NODE.JS', 'JAVASCRIPT', 'TYPESCRIPT', 'LLM', 'DOCKER'],
        github: 'https://github.com/KunjShah95/SENTINEL-CLI',
        demo: 'https://sentinel-cli.vercel.app/',
        slug: 'sentinel-cli',
        impact: 'OPEN_SOURCE_PRODUCT',
    },
    {
        id: '06',
        title: 'AETHER AI',
        category: 'AGENTIC TERMINAL ASSISTANT',
        desc: 'Production-ready, secure multi-model terminal assistant with model switching, local Ollama support, developer utilities, and extensible modular architecture.',
        tech: ['PYTHON', 'OLLAMA', 'GEMINI', 'GROQ', 'FASTAPI'],
        github: 'https://github.com/KunjShah95/AETHER-AI',
        slug: 'aether-ai',
        impact: 'OPEN_SOURCE_FRAMEWORK',
    },
    {
        id: '07',
        title: 'MinBPE Tokenizer',
        category: 'LLM INFRASTRUCTURE',
        desc: 'Minimal Byte Pair Encoding tokenizer implementation with Basic, Regex, and GPT-4 compatible variants for educational and practical NLP workflows.',
        tech: ['PYTHON', 'BPE', 'TOKENIZERS', 'NLP', 'TIKTOKEN'],
        github: 'https://github.com/KunjShah95/TOKENIZER-FROM-SCRATCH',
        slug: 'minbpe-tokenizer',
        impact: 'RESEARCH_TOOLING',
    },
    {
        id: '08',
        title: 'ResumeMasterAI',
        category: 'CAREER AI PLATFORM',
        desc: 'AI-powered resume optimization and job-matching platform with ATS scoring, multi-model support, analytics, and document intelligence pipelines.',
        tech: ['PYTHON', 'STREAMLIT', 'LANGCHAIN', 'GEMINI', 'CHROMADB'],
        github: 'https://github.com/KunjShah01/job-snipper',
        demo: 'https://resumemasterai.streamlit.app/',
        slug: 'resumemaster-ai',
        impact: 'PRODUCT_LIVE',
    }
];

export const EXPERIENCE: Experience[] = [
    {
        id: 'XP0',
        company: 'PHAZE_AI',
        role: 'AUTOMATION_INTERN',
        period: 'DEC 2025 — FEB 2026',
        description: 'Developing automated agentic workflows for enterprise automation. Engineering autonomous scripts and multi-stage pipeline triggers.',
        skills: ['PYTHON', 'AGENTS', 'WORKFLOWS'],
    }
];

export const EDUCATION: Education[] = [
    {
        id: "ED01",
        school: "Indus University",
        degree: "B.Tech Computer Science [3rd Year]",
        period: "2023 - 2027",
        specialization: "Artificial Intelligence and Neural Networks.",
        location: "Ahmedabad, IN",
        summary: "Specializing in Artificial Intelligence and Neural Networks. Currently optimizing agentic workflows and local inference engines."
    }
];

export const SKILL_GROUPS: SkillGroup[] = [
    {
        category: 'Applied_GenAI',
        icon: Brain,
        description: 'Building practical semantic applications using modern LLM frameworks and orchestration tools.',
        skills: ['LangChain / CrewAI', 'RAG Pipelines', 'Prompt Engineering', 'Agent Workflows']
    },
    {
        category: 'Core_Machine_Learning',
        icon: Workflow,
        description: 'Solid academic foundation in neural networks, computer vision, and predictive modeling.',
        skills: ['PyTorch / TensorFlow', 'Computer Vision (OpenCV)', 'NLP / Transformers', 'Data Science (Pandas)']
    },
    {
        category: 'Full_Stack_Dev',
        icon: Terminal,
        description: 'Bridging the gap between AI models and user-facing applications with robust engineering.',
        skills: ['React / TypeScript', 'FastAPI / Python', 'Database Design', 'API Integration']
    },
    {
        category: 'DevOps_&_Tools',
        icon: Database,
        description: 'Proficiency in modern deployment workflows, version control, and cloud environments.',
        skills: ['Git / GitHub', 'Docker / Containers', 'Linux / Bash', 'Cloud Deployment']
    }
];

export const SOCIALS: Social[] = [
    {
        name: 'LINKEDIN',
        url: 'https://www.linkedin.com/in/kunjshah05',
        icon: Linkedin,
        label: 'PROFESSIONAL_SYNC'
    },
    {
        name: 'X_TWITTER',
        url: 'https://x.com/kunjshah_dev',
        icon: Twitter,
        label: 'SIGNAL_STREAM'
    },
    {
        name: 'GITHUB_V1',
        url: 'https://github.com/KunjShah95',
        icon: Github,
        label: 'CORE_REPOSITORY'
    },
    {
        name: 'GITHUB_V2',
        url: 'https://github.com/KunjShah01',
        icon: Github,
        label: 'RESEARCH_LABS'
    },
    {
        name: 'HUGGING_FACE',
        url: 'https://huggingface.co/kunjshah01',
        icon: ExternalLink,
        label: 'MODEL_VAULT'
    }
];

export const BLOGS: Blog[] = [
    {
        id: 'B001',
        title: 'Building Production-Grade Agentic Systems',
        slug: 'agentic-systems-production',
        category: 'SYSTEMS_ARCHITECTURE',
        excerpt: 'Deep dive into designing autonomous agents that are reliable, scalable, and production-ready. Covering orchestration frameworks, error handling, and distributed reasoning.',
        date: 'JAN 2026',
        readTime: 12,
        tags: ['AGENTS', 'SYSTEMS', 'PRODUCTION', 'ARCHITECTURE'],
        featured: true,
    },
    {
        id: 'B002',
        title: 'MLOps at Scale: Lessons from High-Frequency Model Deployments',
        slug: 'mlops-scale-deployments',
        category: 'DEVOPS_INFRASTRUCTURE',
        excerpt: 'Practical guide to managing continuous model updates in production. Best practices for versioning, monitoring, rollback strategies, and cost optimization.',
        date: 'DEC 2025',
        readTime: 10,
        tags: ['MLOPS', 'DEPLOYMENT', 'INFRASTRUCTURE', 'MONITORING'],
        featured: true,
    },
    {
        id: 'B003',
        title: 'Computer Vision at Edge: Optimizing YOLOv8 for Real-Time Inference',
        slug: 'cv-edge-optimization',
        category: 'COMPUTER_VISION',
        excerpt: 'Techniques for deploying vision models on edge devices. Motion deblurring, quantization strategies, and achieving sub-100ms latency on industrial hardware.',
        date: 'NOV 2025',
        readTime: 14,
        tags: ['VISION', 'EDGE', 'OPTIMIZATION', 'INFERENCE'],
        featured: true,
    },
    {
        id: 'B004',
        title: 'RAG Pipelines: Semantic Search and Contextual Retrieval',
        slug: 'rag-semantic-search',
        category: 'GENERATIVE_AI',
        excerpt: 'Comprehensive guide to building Retrieval-Augmented Generation systems. Vector database selection, embedding strategies, and improving LLM accuracy with external knowledge.',
        date: 'OCT 2025',
        readTime: 11,
        tags: ['RAG', 'LLM', 'EMBEDDINGS', 'SEMANTIC_SEARCH'],
        featured: false,
    },
    {
        id: 'B005',
        title: 'Prompt Engineering for Complex Multi-Step Reasoning',
        slug: 'prompt-engineering-reasoning',
        category: 'GENERATIVE_AI',
        excerpt: 'Advanced prompting techniques for breaking down complex problems. Chain-of-thought patterns, structured outputs, and evaluating reasoning quality.',
        date: 'SEP 2025',
        readTime: 9,
        tags: ['PROMPTS', 'LLM', 'REASONING', 'ENGINEERING'],
        featured: false,
    },
    {
        id: 'B006',
        title: 'Anomaly Detection in High-Dimensional Data Streams',
        slug: 'anomaly-detection-streams',
        category: 'MACHINE_LEARNING',
        excerpt: 'Building robust anomaly detection systems for real-time data. Handling concept drift, feature engineering, and deployment considerations for fraud and security.',
        date: 'AUG 2025',
        readTime: 13,
        tags: ['ANOMALY', 'STREAMING', 'DETECTION', 'PRODUCTION'],
        featured: false,
    },
];

export const LOGS: LogEntry[] = [
    {
        id: 'LOG001',
        date: '2026-01-27',
        hash: 'A3F7C2',
        module: 'AGENT_ORCHESTRATION',
        action: 'DEPLOY_CREW_FRAMEWORK_v1',
        details: 'Deployed hierarchical multi-agent system with task delegation and autonomous problem-solving capabilities. 99.2% uptime achieved.',
    },
    {
        id: 'LOG002',
        date: '2026-01-25',
        hash: 'B9E5F1',
        module: 'MLOPS_PIPELINE',
        action: 'INTEGRATE_MONITORING_SUITE',
        details: 'Added comprehensive ML monitoring with prometheus, grafana dashboards, and automated drift detection triggers.',
    },
    {
        id: 'LOG003',
        date: '2026-01-23',
        hash: 'C4D2A8',
        module: 'DATA_SYSTEMS',
        action: 'OPTIMIZE_VECTOR_INDEX',
        details: 'Implemented HNSW indexing for semantic search. Reduced query latency from 450ms to 32ms at scale.',
    },
    {
        id: 'LOG004',
        date: '2026-01-20',
        hash: 'D7B1E6',
        module: 'INFERENCE_ENGINE',
        action: 'QUANTIZE_VISION_MODEL',
        details: 'Converted YOLOv8 to INT8 with 4.2x speedup. Maintained 98.7% accuracy on validation set.',
    },
    {
        id: 'LOG005',
        date: '2026-01-18',
        hash: 'E2F9C3',
        module: 'FRONTEND_SYSTEMS',
        action: 'REDESIGN_TO_INDUSTRIAL_THEME',
        details: 'Completed VOID/INDUSTRIAL aesthetic redesign. Implemented kinetic scroll-linked animations and 3D perspective grid.',
    },
];
