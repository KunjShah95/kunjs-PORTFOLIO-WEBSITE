

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
        category: 'Full Stack ML',
        desc: 'End-to-end movie recommender system with an NLP classification backend and a responsive user interface for real-time mood-based discovery.',
        tech: ['PYTHON', 'PYTORCH', 'REACT', 'FASTAPI'],
        github: 'https://github.com/KunjShah95/CinePulse',
        slug: 'cinepulse',
        impact: 'Production',
        problem: 'Movie discovery is often limited to static genre filters that fail to capture current user intent or mood.',
        outcome: 'Achieved 92% recommendation accuracy in user testing with sub-50ms inference latency.',
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
        problem: 'Manual railway inspections are slow, hazardous, and prone to human error in defect detection.',
        outcome: 'Automated detection with 98.7% accuracy and 4.2x speedup over traditional methods.',
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
        problem: 'Real-time UPI transactions are vulnerable to sophisticated fraud patterns that static rules miss.',
        outcome: 'Detected 88% of anomalous transactions with a false positive rate under 0.1%.',
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
    },
    {
        id: '06',
        title: 'AETHER AI',
        category: 'AI Systems',
        desc: 'Personal automation assistant designed for terminal workflows, featuring local inference and secure command execution.',
        tech: ['PYTHON', 'OLLAMA', 'GEMINI', 'GROQ'],
        github: 'https://github.com/KunjShah95/AETHER-AI',
        slug: 'aether-ai',
        impact: 'Framework',
        problem: 'Cloud-dependent AI assistants introduce latency and privacy concerns for sensitive development workflows.',
        outcome: 'Engineered a local-first assistant capable of executing complex shell commands with zero data leakage.',
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
    },
    {
        id: '10',
        title: 'EquityLens',
        category: 'AI Ethics',
        desc: 'Fairness auditing platform for detecting bias in healthcare AI, ensuring compliance with international standards.',
        tech: ['REACT', 'FASTAPI', 'POSTGRESQL', 'TENSORFLOW'],
        github: 'https://github.com/KunjShah95/fairness-lens-studio',
        demo: 'https://fairness-lens-backend-988207147245.us-central1.run.app/',
        slug: 'equitylens',
        impact: 'Production',
        problem: 'Healthcare AI models often contain hidden biases that lead to unequal patient treatment recommendations.',
        outcome: 'Detected a 23% performance gap in commercial triage models and reduced audit overhead significantly.',
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
        category: 'Full Stack AI',
        icon: Brain,
        description: 'Developing end-to-end intelligent applications with integrated ML backends and responsive frontends.',
        skills: ['React / Next.js', 'FastAPI / Python', 'PostgreSQL / Vald', 'API Architecture']
    },
    {
        category: 'AI Automation',
        icon: Workflow,
        description: 'Automating complex reasoning tasks using modern LLM frameworks and autonomous agentic patterns.',
        skills: ['LangChain / CrewAI', 'Agentic Workflows', 'RAG Pipelines', 'Automated Scraping']
    },
    {
        category: 'Core AI/ML',
        icon: Terminal,
        description: 'Engineering the neural core of applications through vision, NLP, and advanced predictive modeling.',
        skills: ['PyTorch / CUDA', 'YOLOv8 / OpenCV', 'Transformers / NLP', 'Scikit-Learn']
    },
    {
        category: 'DevOps & Infra',
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
    }
];

export const TESTIMONIALS = [
    {
        id: 't1',
        name: 'Manan Vyas',
        role: 'Tech Lead at ISAC',
        company: 'Indus University',
        text: "We've often worked as a perfect duo—I throw in wild AI/ML ideas, and Kunj jumps right into bringing them to life. Whether it's late-night brainstorming or fixing that one stubborn bug, Kunj has always been energetic, curious, and ready to implement. What I admire most is his consistency and hunger to grow in AI/ML. He doesn't just follow trends—he actually tries to implement and understand them. Highly recommend him for any team looking for a reliable, creative, and always-experimenting techie!",
        linkedin: 'https://www.linkedin.com/in/mananvyas0110'
    }
];

export const BLOGS: Blog[] = [
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

1. **State Persistence & Checkpointing**: An agent should never be stateless. If a long-running task fails halfway through a 10-step reasoning chain, the system must be able to restore the exact state of its memory and scratchpad. We use Redis or Postgres with JSONB to track the "Trace ID" of every reasoning step.

2. **Hierarchical Orchestration**: Flat agents are brittle. In my recent work, I’ve moved toward a supervisor-subordinate model. A "Manager" agent breaks down the high-level goal into a graph of tasks, which are then assigned to specialized "Worker" agents with restricted tool access. This limits the "blast radius" of a single agent's mistake.

3. **Human-in-the-Loop (HITL) Triggers**: There are certain actions—database migrations, large-scale emails, financial transactions—where the entropy of an LLM is unacceptable. We implement "breakpoints" where the agent must pause and wait for a signed approval token before proceeding.

### The Feedback Loop
The most critical part of a production agent is the feedback loop. We don't just log the final output; we log the *reasoning trace*. By analyzing where agents deviate from the intended logic, we can perform targeted few-shot prompting or fine-tune smaller models (like Llama-3 8B) to handle specific sub-tasks with higher precision and lower cost than GPT-4.

Building agents isn't just about AI; it's about systems engineering. It's about building the safety rails that allow the intelligence to run at full speed without flying off the tracks.
        `,
        date: 'JAN 2026',
        readTime: 12,
        tags: ['AI SYSTEMS', 'ARCHITECTURE', 'PRODUCTION', 'SCALABILITY'],
        featured: true,
    },
    {
        id: 'B002',
        title: 'MLOps at Scale: Lessons from High-Frequency Model Deployments',
        slug: 'mlops-scale-deployments',
        category: 'Infrastructure',
        excerpt: 'A practical guide to managing continuous model updates in production. Best practices for versioning, monitoring, and cost optimization.',
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
        category: 'Computer Vision',
        excerpt: 'Techniques for deploying vision models on edge devices, focusing on quantization and low-latency performance on industrial hardware.',
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
        tags: ['VISION', 'EDGE', 'OPTIMIZATION', 'HARDWARE'],
        featured: true,
    },
    {
        id: 'B004',
        title: 'RAG Pipelines: Semantic Search and Contextual Retrieval',
        slug: 'rag-semantic-search',
        category: 'Generative AI',
        excerpt: 'Comprehensive guide to building Retrieval-Augmented Generation systems, covering vector databases and embedding strategies.',
        content: `
# RAG Pipelines: Semantic Search and Contextual Retrieval

If you're building AI applications that need to answer questions about your own documents, RAG is the backbone that makes it possible. But getting it right? That's where most teams struggle.

## The Core Problem

LLMs are trained on massive datasets, but they don't know about your specific documents, your company's internal knowledge base, or yesterday's updates. You have two options:

1. **Fine-tuning** — expensive, slow, and risky for keeping knowledge up-to-date

2. **RAG** — retrieval-augmented generation that fetches relevant context at query time

RAG is the clear winner for most production use cases.

## Step 1: Chunking Strategy

How you split your documents determines everything downstream. I've experimented with:

- **Fixed-size chunks** (512-1024 tokens): Simple but often break semantic units

- **Semantic chunking**: Use embeddings to find natural breakpoints in meaning

- **Recursive splitting**: Split on multiple delimiters, then re-split oversized chunks

My recommendation: Start with semantic chunking using embeddings to find natural boundaries, then validate with a sample of queries.

## Step 2: Vector Database Selection

Your options:

- **Pinecone**: Fully managed, great scaling, pricey at scale

- **Weaviate**: Open-source, graph-like queries, self-hostable

- **Chroma**: Lightweight, great for prototyping

- **Milvus**: Best for massive-scale production

- **pgvector**: If you're already on PostgreSQL

For most projects, I recommend **Weaviate** or **Pinecone** depending on your scale needs.

## Step 3: Retrieval Optimization

Basic retrieval (top-k semantic similarity) is just the start. To make it production-grade:

1. **Query rewriting**: Use a small LLM to reformulate user queries for better retrieval

2. **Hybrid search**: Combine semantic (dense) with keyword (sparse) search using BM25

3. **Re-ranking**: Run a cross-encoder model on top-k results to re-score for relevance

4. **Parent document retrieval**: Fetch chunks and reconstruct their parent context

## The Context Window Problem

When your retrieved context exceeds the LLM's window or becomes too noisy, you need smart compression. Techniques I use:

- **Contextual compression**: Extract only relevant sentences from retrieved docs

- **Summary-based retrieval**: Summarize docs first, then retrieve summaries

- **Hierarchical indexing**: Index at chunk, document, and collection levels

## Monitoring & Maintenance

RAG isn't "set and forget." You need:

- **Retrieval metrics**: Track hit rate, relevance scores

- **Answer quality**: Human feedback loops or LLM-as-judge evaluation

- **Data freshness**: Re-index on schedule or on-change

- **Concept drift detection**: Monitor when retrieval quality drops

The biggest insight? RAG quality is 80% about your data pipeline and retrieval strategy, 20% about the LLM you choose.
        `,
        date: 'OCT 2025',
        readTime: 11,
        tags: ['RAG', 'AI', 'EMBEDDINGS', 'SEARCH'],
        featured: false,
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
        id: 'B006',
        title: 'Anomaly Detection in High-Dimensional Data Streams',
        slug: 'anomaly-detection-streams',
        category: 'Machine Learning',
        excerpt: 'Building robust anomaly detection systems for real-time data, focusing on feature engineering and deployment for fraud and security.',
        content: `
# Anomaly Detection in High-Dimensional Data Streams

When you're monitoring millions of transactions per second, finding the needle in the haystack isn't just hard — it's a completely different problem than traditional ML.

## The Challenge

In low dimensions, outliers are obvious. But in high dimensions (hundreds of features), "normal" behavior becomes incredibly varied, and the notion of distance breaks down. A point that's far in one feature might be perfectly normal in another.

## Approach 1: Isolation Forest

The intuition is elegant: anomalies are few and different. Randomly partitioning data should isolate them faster.

- Anomalies need fewer partitions to be isolated

- Average path length = anomaly score

- Works great for moderate dimensions (50-200 features)

## Approach 2: Autoencoders

Train an autoencoder to reconstruct "normal" data. When you feed in anomalous data, reconstruction error spikes.

- Learn the manifold of normal behavior

- High reconstruction error = likely anomaly

- Good for complex, non-linear patterns

The catch: needs enough normal data to learn the manifold, and can miss novel anomaly types.

## Approach 3: Statistical Methods

For time-series data:

- **ARIMA residuals**: Model expected values, flag deviations

- **Seasonal decomposition**: Separate trend, seasonality, residuals

- **Exponential smoothing**: Detect sudden shifts in smoothed series

## Handling Concept Drift

Your model trained on January data might fail in March. Solutions:

1. **Rolling windows**: Retrain on recent window only

2. **Ensemble updates**: Maintain multiple models, weight by recency

3. **Drift detection**: Monitor prediction distribution, trigger retrain when significant shift detected

4. **Online learning**: Update incrementally as new data arrives

## Real-Time Architecture

For production systems:

- **Stream processing**: Kafka plus Flink or Spark Streaming

- **Feature store**: Pre-compute rolling statistics

- **Model serving**: Low-latency inference under 10ms

- **Alert pipeline**: Threshold-based or ML-based alerting

## What Actually Works

In production across multiple fraud detection systems:

- **Ensemble is key**: Combine statistical plus ML plus rules

- **Feature engineering over model choice**: Domain expertise wins

- **Label quality matters**: False positives kill your system

- **Tune for precision, not recall**: Better to miss one than alert on ten

## The Uncomfortable Truth

No model catches everything. Build for:

- Detection latency under 100ms

- Graceful degradation under load

- Human-in-the-loop for edge cases

- Continuous monitoring and iteration

Anomaly detection is not a solved problem — it's an ongoing arms race against adversaries.
        `,
        date: 'AUG 2025',
        readTime: 13,
        tags: ['ANOMALY', 'STREAMING', 'ML', 'SECURITY'],
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

- Detected **23% performance gap** in a commercial triage model across demographic groups
- Reduced compliance audit time from **3 weeks to 4 hours**
- Deployed to production with **99.9% uptime**

The platform is live at [fairness-lens-backend](https://fairness-lens-backend-988207147245.us-central1.run.app/) and handles healthcare data from multiple hospital systems.

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
In production, we must design for the "failure case."
- **Fallback Models**: If GPT-4 hits a rate limit, the orchestrator should automatically switch to a local Llama-3 instance via Ollama.
- **Human-in-the-Loop**: Critical actions (like deleting data or making payments) should trigger a "pause" in the graph for human approval.

Orchestration is what turns a chatbot into a reliable digital employee.
        `,
        date: 'MAY 2024',
        readTime: 12,
        tags: ['AI SYSTEMS', 'ORCHESTRATION', 'WORKFLOWS'],
        featured: false,
    },
    {
        id: 'B009',
        title: 'Scaling AI Inference: Optimization Strategies for Production',
        slug: 'scaling-llm-inference',
        category: 'Infrastructure',
        excerpt: 'How to reduce latency and cost in high-throughput AI applications without sacrificing accuracy, from quantization to decoding strategies.',
        content: `
# Scaling LLM Inference: Optimization Strategies for Production

As we move AI from prototypes to enterprise-grade applications, the bottleneck shifts from model capability to **inference efficiency**. Scaling a model to handle thousands of concurrent requests requires a deep understanding of the hardware-software interface.

## The Latency-Cost Trade-off
The primary goal of inference optimization is to minimize Time-To-First-Token (TTFT) and maximize tokens per second, while keeping VRAM usage low.

### 1. Quantization: The 80/20 Rule
Quantizing a model from FP16 to INT4 or INT8 can reduce VRAM requirements by up to 75% with minimal impact on perplexity.
- **GGUF**: Best for CPU/GPU hybrid inference (local LLMs).
- **AWQ/GPTQ**: Optimized for high-throughput GPU serving.

### 2. Speculative Decoding
Speculative decoding uses a smaller "draft" model (e.g., Llama-7B) to predict the next few tokens, which are then validated in parallel by the "target" model (e.g., Llama-70B). This can result in a 2-3x speedup for sequence generation without losing quality.

### 3. KV-Cache Management
In long-context RAG applications, the KV-cache can consume massive amounts of VRAM. Techniques like **PagedAttention** (used in vLLM) allow for dynamic memory allocation, preventing fragmentation and enabling much higher batch sizes.

## Choosing the Right Backend
In my production pipelines, I’ve found that:
- **vLLM** is the gold standard for high-throughput serving on NVIDIA GPUs.
- **Ollama** is unbeatable for local development and private edge deployments.
- **Groq** (LPU architecture) is the current leader for raw inference speed (sub-50ms TTFT).

Efficiency isn't just about saving money; it's about enabling the "instant" UX that users expect from modern AI.
        `,
        date: 'APR 2024',
        readTime: 10,
        tags: ['MLOPS', 'INFERENCE', 'OPTIMIZATION', 'SCALABILITY'],
        featured: false,
    },
    {
        id: 'B010',
        title: 'Next.js 15: Engineering High-Performance AI Interfaces',
        slug: 'nextjs-15-performance',
        category: 'Frontend',
        excerpt: 'Leveraging modern web features to build fast, streaming AI interfaces that provide an instant user experience.',
        content: `
# Next.js 15: Engineering High-Performance AI Interfaces

Building AI interfaces is different from building standard CRUD apps. You're dealing with long-running requests, token streaming, and complex UI states. Next.js 15, paired with React 19, introduces several patterns that are specifically beneficial for AI applications.

## Streaming as a First-Class Citizen
AI responses are slow. Waiting 10 seconds for a full response is a UX killer. Next.js 15 makes it easier to implement partial hydration and streaming.
- **Loading UI (Suspense)**: Instantly show the interface while the AI backend generates the initial tokens.
- **Server Actions**: Securely handle model routing and tool execution on the server, keeping API keys away from the client.

## React 19 Hooks for AI
The new \`useActionState\` and \`useOptimistic\` hooks are game-changers for AI chatbots.
- **useOptimistic**: Instantly show the user's message and a "typing..." indicator before the server even receives the request.
- **useActionState**: Simplifies handling of the streaming state, error handling, and form submission logic.

## Partial Prerendering (PPR)
PPR allows you to combine static content (like the chatbot sidebar and previous history) with dynamic streaming content (the current response) in a single request. This reduces the number of round-trips and makes the app feel significantly faster.

## The "Zero-Latency" Goal
In my portfolio redesign, I’ve focused on "Industrial Aesthetics" which prioritize functional speed. By using CSS-only animations and minimizing client-side JS, we ensure that the interface remains responsive even while the heavy lifting happens in the LLM background.

Performance is the foundation of trust in AI.
        `,
        date: 'MAR 2024',
        readTime: 8,
        tags: ['NEXTJS', 'FRONTEND', 'PERFORMANCE', 'UX'],
        featured: false,
    },
    {
        id: 'B011',
        title: 'Secure CI/CD for AI Models: Protecting the Development Lifecycle',
        slug: 'secure-cicd-ai-models',
        category: 'Cybersecurity',
        excerpt: 'Implementing robust security checks in AI development, from scanning for vulnerabilities to ensuring data integrity in automated pipelines.',
        content: `
# Secure CI/CD for AI Models: Protecting the Neural Supply Chain

In the rush to deploy AI, security is often an afterthought. However, AI introduces a new attack surface: the **neural supply chain**. From poisoned training data to prompt injection, the vulnerabilities are unique and dangerous.

## The New Attack Vectors
1. **Prompt Injection**: Malicious input designed to bypass system instructions or leak sensitive system prompts.
2. **Data Leakage**: LLMs "remembering" sensitive training data or PII and revealing it to unauthorized users.
3. **Weight Tampering**: If an attacker gains access to your model weights (e.g., in Hugging Face or S3), they can subtly alter model behavior without changing a line of code.

## Implementing a Security-First Pipeline
A modern AI CI/CD pipeline should include:

### 1. Automated Red-Teaming
Use a smaller LLM to "attack" your main model during the CI phase. We use frameworks like **Giskard** or custom scripts to test for bias, toxicity, and prompt injection resilience.

### 2. PII Scrubbing
Before data hits your fine-tuning pipeline or vector database, it must pass through a scrubbing layer. We use **Presidio** to identify and mask names, emails, and financial information.

### 3. Model Integrity Checks
Implement SHA-256 hashing for model weights. Before loading a model into production, the inference server should verify the hash against a known good value stored in a secure secret manager.

### 4. Output Filtering
Never return raw LLM output directly. Implement a "Guardrail" layer that checks the generated text against a list of restricted topics or PII patterns before it reaches the end user.

Security isn't a checkbox; it's a continuous process that starts in the development environment.
        `,
        date: 'FEB 2024',
        readTime: 9,
        tags: ['SECURITY', 'CICD', 'AI SAFETY', 'DEVOPS'],
        featured: false,
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
        id: 'equity-lens',
        title: 'AI Fairness Auditing Platform',
        problem: 'Healthcare AI models often contain hidden biases that lead to unequal patient treatment recommendations without transparency.',
        solution: 'Built a comprehensive fairness evaluation pipeline that automates bias detection and ensures compliance with international standards.',
        techStack: ['Python', 'FastAPI', 'LangChain', 'PostgreSQL'],
        result: 'Identified significant performance gaps and reduced audit time from weeks to hours with high reliability.',
        demoUrl: 'https://fairness-lens-backend-988207147245.us-central1.run.app/',
        githubUrl: 'https://github.com/KunjShah95/fairness-lens-studio',
    },
    {
        id: 'autonomous-research',
        title: 'GAP Miner',
        problem: 'Developing career roadmaps typically requires weeks of manual market research and analysis.',
        solution: 'Developed an AI-powered system that automates market analysis and identifies skill gaps in seconds.',
        techStack: ['GPT-4', 'Python', 'React', 'Vector DB'],
        result: 'Achieved 3× faster roadmap generation with high market alignment.',
        demoUrl: '',
        githubUrl: 'https://github.com/KunjShah95/arros',
    },
    {
        id: 'resumemaster-ai',
        title: 'ResumeMasterAI 2026',
        problem: 'Manual management of multiple AI models lead to high costs, latency, and inconsistent resume quality.',
        solution: 'Engineered a smart AI Gateway for optimized model routing and a hierarchical system for end-to-end career automation.',
        techStack: ['Python', 'LangGraph', 'AI Gateway', 'PostgreSQL'],
        result: 'Reduced API costs by 65% while significantly increasing candidate match precision.',
        demoUrl: 'https://resumemasterai.streamlit.app/',
        githubUrl: 'https://github.com/KunjShah01/job-snipper',
    },
];
