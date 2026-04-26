import { Project, Experience, SkillGroup, Education, UserIdentity, Social, Blog, LogEntry } from '../types';
import { Brain, Database, Terminal, Workflow, ExternalLink, Github, Twitter, Linkedin } from 'lucide-react';

export const IDENTITY: UserIdentity = {
    name: "Kunj Shah",
    persona: "Full Stack AI/ML & Automation Specialist",
    location: "Ahmedabad, IN",
    contact: "kunjkshah05@gmail.com",
    focus: ["Full Stack AI", "Autonomous Automation", "Neural Intelligence", "Workflow Engineering"],
    github_username: "KunjShah95",
    profile_photo: "/profile.png"
};

export const PROJECTS: Project[] = [
    {
        id: '01',
        title: 'CinePulse',
        category: 'FULL STACK ML',
        desc: 'End-to-end movie recommender system with an NLP classification backend and a responsive user interface for real-time mood-based discovery.',
        tech: ['PYTHON', 'PYTORCH', 'REACT', 'FASTAPI'],
        github: 'https://github.com/KunjShah95/CinePulse',
        slug: 'cinepulse',
        impact: 'PRODUCTION_READY',
    },
    {
        id: '02',
        title: 'GAP Miner',
        category: 'AUTOMATED INTELLIGENCE',
        desc: 'Full-stack skill gap analyzer using semantic extraction to automate the generation of career-critical learning roadmaps.',
        tech: ['LLAMA-3', 'LANGCHAIN', 'FASTAPI', 'REACT'],
        github: 'https://github.com/KunjShah95/GAP-Miner',
        slug: 'gap-miner',
        impact: 'BETA_LIVE',
    },
    {
        id: '03',
        title: 'Railway Inspection',
        category: 'COMPUTER VISION AUTOMATION',
        desc: 'Automated defect detection system using high-speed vision pipelines and YOLOv8 to replace hazardous manual inspections.',
        tech: ['C++', 'OPENCV', 'YOLOv8', 'CUDA'],
        github: 'https://github.com/KunjShah95/Railway-Inspection',
        slug: 'railway-inspection',
        impact: 'FIELD_TESTED',
    },
    {
        id: '04',
        title: 'UPI Fraud Guard',
        category: 'PREDICTIVE AUTOMATION',
        desc: 'Automated fraud detection engine designed to identify anomalous transaction vectors with high-precision real-time response.',
        tech: ['SCIKIT-LEARN', 'XGBOOST', 'PANDAS', 'FLASK'],
        github: 'https://github.com/KunjShah95/UPI-Fraud-Detection',
        slug: 'upi-fraud-guard',
        impact: 'ALGO_STABLE',
    },
    {
        id: '05',
        title: 'SENTINEL CLI',
        category: 'SECURITY AUTOMATION',
        desc: 'Automated security auditor and review tool that unifies 13+ analyzers into one powerful AI-driven CLI workflow.',
        tech: ['NODE.JS', 'TYPESCRIPT', 'LLM', 'DOCKER'],
        github: 'https://github.com/KunjShah95/SENTINEL-CLI',
        demo: 'https://sentinel-cli.vercel.app/',
        slug: 'sentinel-cli',
        impact: 'OPEN_SOURCE_PRODUCT',
    },
    {
        id: '06',
        title: 'AETHER AI',
        category: 'AGENTIC AUTOMATION',
        desc: 'Multi-model automation assistant designed for terminal workflows, featuring local inference and secure command execution.',
        tech: ['PYTHON', 'OLLAMA', 'GEMINI', 'GROQ'],
        github: 'https://github.com/KunjShah95/AETHER-AI',
        slug: 'aether-ai',
        impact: 'OPEN_SOURCE_FRAMEWORK',
    },
    {
        id: '07',
        title: 'MinBPE Tokenizer',
        category: 'LLM CORE ARCHITECTURE',
        desc: 'Low-level Byte Pair Encoding implementation, automating the tokenization logic for custom transformer models.',
        tech: ['PYTHON', 'NLP', 'TIKTOKEN', 'ALGORITHMS'],
        github: 'https://github.com/KunjShah95/TOKENIZER-FROM-SCRATCH',
        slug: 'minbpe-tokenizer',
        impact: 'RESEARCH_TOOLING',
    },
    {
        id: '08',
        title: 'ResumeMasterAI',
        category: 'FULL STACK AI PLATFORM',
        desc: 'Integrated career intelligence platform automating the optimization of resumes and job matches using semantic matching.',
        tech: ['PYTHON', 'STREAMLIT', 'LANGCHAIN', 'CHROMADB'],
        github: 'https://github.com/KunjShah01/job-snipper',
        demo: 'https://resumemasterai.streamlit.app/',
        slug: 'resumemaster-ai',
        impact: 'PRODUCT_LIVE',
    },
    {
        id: '09',
        title: 'LearnAI',
        category: 'EDUCATION AI',
        desc: 'AI-powered personalized learning platform with adaptive tutoring, smart quizzes, and gamification. Supports multiple AI model providers.',
        tech: ['NEXT.JS', 'FIREBASE', 'SUPABASE', 'GEMINI'],
        github: 'https://github.com/KunjShah95/intelligent-learning-assistant',
        demo: 'https://intelligent-learning-assistant.vercel.app',
        slug: 'learnai',
        impact: 'PRODUCT_LIVE',
    },
    {
        id: '10',
        title: 'EquityLens',
        category: 'AI FAIRNESS AUDITING',
        desc: 'Healthcare fairness auditing platform for detecting AI bias. Ensures EU AI Act and NIST AI RMF compliance.',
        tech: ['REACT', 'FASTAPI', 'POSTGRESQL', 'TENSORFLOW'],
        github: 'https://github.com/KunjShah95/fairness-lens-studio',
        demo: 'https://fairness-lens-backend-988207147245.us-central1.run.app/',
        slug: 'equitylens',
        impact: 'PRODUCTION_READY',
    },
    {
        id: '11',
        title: 'Smart Flow AI',
        category: 'AUTOMATION PLATFORM',
        desc: 'Modern automation platform with intelligent workflows and AI-powered task orchestration.',
        tech: ['NEXT.JS', 'FIREBASE', 'FIRESTORE', 'TYPESCRIPT'],
        github: 'https://github.com/KunjShah95/Smart-flow-ai',
        demo: 'https://ps-1-eight.vercel.app',
        slug: 'smart-flow-ai',
        impact: 'BETA_LIVE',
    }
];

export const EXPERIENCE: Experience[] = [
    {
        id: 'XP0',
        company: 'PHAZE_AI',
        role: 'AUTOMATION_INTERN',
        period: 'DEC 2025 — FEB 2026',
        description: 'Automating high-scale enterprise workflows using multi-agent systems and agentic reasoning. Integrating AI models into full-stack production pipelines.',
        skills: ['PYTHON', 'AGENTS', 'FULL_STACK', 'AUTOMATION'],
    }
];

export const EDUCATION: Education[] = [
    {
        id: "ED01",
        school: "Indus University",
        degree: "B.Tech Computer Science [3rd Year]",
        period: "2023 - 2027",
        specialization: "AI/ML Integration and Automation.",
        location: "Ahmedabad, IN",
        summary: "Focusing on the intersection of Full Stack Dev and AI. Developing automated systems that utilize distributed intelligence at scale."
    }
];

export const SKILL_GROUPS: SkillGroup[] = [
    {
        category: 'Full_Stack_AI',
        icon: Brain,
        description: 'Developing end-to-end intelligent applications with integrated ML backends and responsive frontends.',
        skills: ['React / Next.js', 'FastAPI / Python', 'PostgreSQL / Vald', 'API Architecture']
    },
    {
        category: 'Applied_ML_Automation',
        icon: Workflow,
        description: 'Automating complex reasoning tasks using modern LLM frameworks and autonomous agentic patterns.',
        skills: ['LangChain / CrewAI', 'Agentic Workflows', 'RAG Pipelines', 'Automated Scraping']
    },
    {
        category: 'Core_Intelligence',
        icon: Terminal,
        description: 'Engineering the neural core of applications through vision, NLP, and advanced predictive modeling.',
        skills: ['PyTorch / CUDA', 'YOLOv8 / OpenCV', 'Transformers / NLP', 'Scikit-Learn']
    },
    {
        category: 'Infrastructure_&_Dev',
        icon: Database,
        description: 'Building the foundation for automation through robust CI/CD, containers, and secure shell workflows.',
        skills: ['Docker / Kubernetes', 'Git / GitHub', 'Linux Shell', 'Cloud Deployment']
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
        content: `
# Building Production-Grade Agentic Systems

We’ve all seen the demos. A simple script sends a prompt to an LLM, the LLM generates a tool call, and suddenly you have an \"autonomous agent.\" But if you’ve ever tried to move that agent from a local terminal into a production environment, you know exactly where the floor drops out.

The reality is that **autonomy is easy; reliability is hard.**

### The \"Happy Path\" Trap
Most agentic frameworks (like AutoGPT or even early LangChain implementations) focus on the happy path. They assume the agent will understand the goal, select the right tool, and interpret the output correctly. In production, the \"unhappy path\" is 80% of the engineering work.

Rate limits change. Tools return malformed JSON. The LLM gets stuck in a repetitive logic loop (hallucination spirals). To build something production-grade, we have to treat agents like distributed systems, not just chatbots.

### Core Architecture Pillars

1. **State Persistence & Checkpointing**: An agent should never be stateless. If a long-running task fails halfway through a 10-step reasoning chain, the system must be able to restore the exact state of its memory and scratchpad. We use Redis or Postgres with JSONB to track the "Trace ID" of every reasoning step.

2. **Hierarchical Orchestration**: Flat agents are brittle. In my recent work, I’ve moved toward a supervisor-subordinate model. A "Manager" agent breaks down the high-level goal into a graph of tasks, which are then assigned to specialized "Worker" agents with restricted tool access. This limits the "blast radius" of a single agent's mistake.

3. **Human-in-the-Loop (HITL) Triggers**: There are certain actions—database migrations, large-scale emails, financial transactions—where the entropy of an LLM is unacceptable. We implement "breakpoints" where the agent must pause and wait for a signed approval token before proceeding.

### The Feedback Loop
The most critical part of a production agent is the feedback loop. We don't just log the final output; we log the *reasoning trace*. By analyzing where agents deviate from the intended logic, we can perform targeted few-shot prompting or fine-tune smaller models (like Llama-3 8B) to handle specific sub-tasks with higher precision and lower cost than GPT-4.

Building agents isn't just about AI; it's about systems engineering. It's about building the safety rails that allow the intelligence to run at full speed without flying off the tracks.
        `,
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
        content: `
# MLOps at Scale: Beyond the Jupyter Notebook

The hardest part of AI is often not the model itself, but the plumbing required to keep it alive in the wild. When you're deploying models ten times a day across multiple clusters, you quickly realize that "standard" DevOps isn't enough. You're not just deploying code; you're deploying a toxic combination of code, data, and stochastic weights.

### The Data Ghost in the Machine
In traditional software, if the code doesn't change, the behavior is mostly predictable. In ML, your model can start failing even if you haven't touched the codebase in months. This is **concept drift**.

We recently implemented an automated drift detection pipeline that monitors the distribution of inference inputs. If the Kolmogorov-Smirnov test indicates a significant shift from the training distribution, the system triggers an automated alert and, in some cases, spins up a retraining job on a fresh slice of data.

### Standardizing the Pipeline

1. **Model Versioning (Not Just Git)**: Git is for code. For models, we use DVC (Data Version Control) paired with an MLflow registry. Every production deployment is tagged with a unique model URI that links directly back to the specific dataset and hyperparameters used to create it. If a user reports a weird result, we can replicate that exact inference state in seconds.

2. **Canary Deployments for Weights**: We never swap a model 1:1. We use a "Shadow Mode" where the new model receives 100% of the traffic but its outputs are logged silently without being returned to the user. Once we verify the new model's latency and prediction confidence match our expectations, we transition to a 5/95 traffic split.

3. **Quantization as a First-Class Citizen**: You can't just throw an FP32 model into a production cluster and hope for the best. We've integrated Auto-GPTQ into the CI/CD pipeline. Every model is automatically quantized to 4-bit or 8-bit during the build phase to ensure we aren't wasting thousands of dollars on GPU compute.

### Conclusion
MLOps is about reducing the "fear of deployment." When your monitoring is robust enough that the system tells *you* when it’s failing—rather than waiting for a user complaint—you've reached true production-grade MLOps.
        `,
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
        content: `
# Computer Vision at the Edge: The Fight for Every Millisecond

Deploying YOLOv8 on a powerful workstation with an A100 is a breeze. Deploying it on a fanless industrial PC at the edge of a railway track to detect wagon defects in real-time? That’s where the real engineering starts.

When we built the Railway Inspection system, our target was sub-100ms end-to-end latency. That included frame ingestion, preprocessing, inference, and post-processing. Here’s how we did it.

### 1. Moving Beyond Python
Python is fantastic for research, but for high-speed CV at the edge, it’s a bottleneck. We moved the entire inference pipeline to C++. Using **TensorRT**, we were able to compile the YOLOv8 ONNX exports into highly optimized engine files specifically tuned for the Jetson Orin's architecture. This alone gave us a 3x speedup.

### 2. The Preprocessing Pipeline
Often, the bottleneck isn't the model—it's the data preparation. We implemented a multi-threaded GStreamer pipeline for hardware-accelerated video decoding. By offloading image resizing and normalization to the GPU kernels (using CUDA), we kept the CPU free to handle the logic and network overhead.

### 3. Smart Quantization (INT8)
Standard FP16 quantization is safe, but INT8 is where you get the massive performance gains. However, naive INT8 quantization can kill your accuracy. We used **Quantization-Aware Training (QAT)** during the final few epochs of model training. This allowed the weights to adjust to the lower precision limits, maintaining 98%+ of our detection accuracy while cutting inference time by half.

### 4. Handling Environmental Chaos
Industrial environments aren't clean labs. We had to deal with:
*   **Motion Blur**: Optimized shutter speeds and implemented a lightweight deblurring kernel.
*   **Low Light**: Real-time histogram equalization before the image hits the model.

### Summary
The edge isn't just about the model. It's about the marriage of hardware-specific optimization and robust software engineering. When you're counting milliseconds, every byte of memory and every instruction cycle counts.
        `,
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
