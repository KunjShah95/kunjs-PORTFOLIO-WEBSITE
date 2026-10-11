import type { IconName } from "@/components/icon";

/* ==========================================================================
   Content sourced from the deployed site at kunjshah.in
   Sources: /api/portfolio.json, /llms-full.txt, /services.md, /pricing.md
   ========================================================================== */

export const site = {
  name: "Kunj Shah",
  initials: "KS",
  title: "AI Engineer & Agent Builder",
  role: "AI Engineer & Agent Builder",
  tagline: "aka AI Engineer",
  age: 22,
  email: "kunjkshah05@gmail.com",
  location: "Ahmedabad, India",
  locationLong: "Ahmedabad, Gujarat, India",
  timezone: "UTC +5:30",
  website: "https://kunjshah.in",
  hero: "I build the part of AI that has to keep working.",
  links: {
    github: "https://github.com/KunjShah95",
    githubAlt: "https://github.com/KunjShah01",
    linkedin: "https://www.linkedin.com/in/kunjshah05",
    x: "https://x.com/kunjshah_dev",
    huggingface: "https://huggingface.co/kunjshah01",
    peerlist: "https://peerlist.io/kunjshah",
    medium: "https://medium.com/@kkshah2005",
  },
} as const;

/**
 * Bottom tab bar. Capped at five entries so it stays legible on a 375px
 * phone — the remaining sections live in the header index menu.
 */
export const navItems = [
  { href: "/", label: "Home", icon: "cottage" },
  { href: "/projects", label: "Projects", icon: "code_blocks" },
  { href: "/writing", label: "Writing", icon: "edit_note" },
  { href: "/experience", label: "Experience", icon: "verified" },
  { href: "/contact", label: "Contact", icon: "mail" },
] as const satisfies readonly { href: string; label: string; icon: IconName }[];

/** Full site index, surfaced in the header dropdown and the home footer. */
export const indexItems = [
  {
    href: "/",
    label: "Home",
    icon: "cottage",
    description: "Overview, capabilities, and how to work together.",
  },
  {
    href: "/about",
    label: "About",
    icon: "person",
    description: "Bio, focus areas, and engineering philosophy.",
  },
  {
    href: "/experience",
    label: "Experience",
    icon: "verified",
    description: "Internships and open-source work history.",
  },
  {
    href: "/education",
    label: "Education",
    icon: "architecture",
    description: "B.Tech Computer Science at Indus University.",
  },
  {
    href: "/projects",
    label: "Projects",
    icon: "code_blocks",
    description: "Shipped systems with real metrics and live demos.",
  },
  {
    href: "/open-source",
    label: "Open Source",
    icon: "commit",
    description: "Merged pull requests and upstream ecosystem work.",
  },
  {
    href: "/skills",
    label: "Skills",
    icon: "hub",
    description: "The stack, grouped by discipline.",
  },
  {
    href: "/labs",
    label: "Labs",
    icon: "memory",
    description: "Research builds and from-scratch infrastructure.",
  },
  {
    href: "/manifesto",
    label: "Manifesto",
    icon: "verified_user",
    description: "Three non-negotiable principles for building AI systems.",
  },
  {
    href: "/hackathons",
    label: "Hackathons",
    icon: "badge",
    description: "10 hackathons, 4 finals.",
  },
  {
    href: "/writing",
    label: "Writing",
    icon: "edit_note",
    description: "Essays, case studies, and technical write-ups.",
  },
  {
    href: "/contact",
    label: "Contact",
    icon: "mail",
    description: "Services, availability, and direct channels.",
  },
] as const satisfies readonly {
  href: string;
  label: string;
  icon: IconName;
  description: string;
}[];

export const homeSubnav = [
  { href: "#about", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#capabilities", label: "Stack" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
] as const;

export const metrics = [
  { value: "17+", label: "Systems Shipped" },
  { value: "60+", label: "Merged PRs" },
  { value: "4×", label: "Hack Finals" },
] as const;

export const focusAreas = [
  "Agent systems",
  "Retrieval and RAG",
  "Edge computer vision",
  "Full-stack AI products",
] as const;

/* ---------------------------------------------------------------- Projects */

export type Project = {
  slug: string;
  title: string;
  category: string;
  status: string;
  icon: IconName;
  description: string;
  /** One-line summary used in compact rows. */
  summary: string;
  stack: readonly string[];
  metrics: readonly { value: string; label: string; accent?: boolean }[];
  body: string;
  challenges?: string;
  lessons?: string;
  /** Who built what: solo, lead, or the slice I owned on a team. */
  role?: string;
  /** How the claims above are checked: tests, evals, benchmarks. */
  evaluation?: string;
  /** What it does not do yet, or does not do well. */
  limitations?: string;
  demo?: string;
  /** Path prefix for a ~30s muted demo recording (.mp4/.webm/.jpg poster). */
  video?: string;
  github?: string;
};

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "agents", label: "AI Agents" },
  { id: "vision", label: "Computer Vision" },
  { id: "fullstack", label: "Full Stack AI" },
  { id: "ml", label: "Applied ML" },
] as const;

export const projects: readonly Project[] = [
  {
    slug: "onramp",
    video: "/videos/onramp",
    title: "OnRamp",
    category: "Agentic AI",
    status: "Live · v2.0",
    icon: "rocket_launch",
    description:
      "Turns any GitHub repo into a live onboarding program. A nine-step autopilot parses the codebase into a dependency and entity graph, routes every model call free-tier-first, then turns what it finds into issues, tasks, PRs, and senior reviews.",
    summary:
      "Repo-to-PR autopilot that parses any codebase, assigns work by role and load, and opens reviewed PRs on its own.",
    stack: [
      "FastAPI",
      "Python 3.12",
      "React 19",
      "PostgreSQL 16 + pgvector",
      "Redis + Celery",
    ],
    metrics: [
      { value: "9", label: "Step Pipeline", accent: true },
      { value: "20+", label: "Languages Parsed" },
      { value: "9", label: "Role Tiers" },
    ],
    body: "A repository is ingested once into a dependency graph plus an entity graph of classes, functions and API routes, and that index is reused everywhere. The autopilot classifies issues by difficulty, assigns each one to whoever currently holds the fewest active tasks, opens a PR per issue, re-parses the PR head to graph-diff it against the base, and emits a structured senior review. Because a merged PR advances the linked task and closes the originating GitHub issue, the loop closes without anyone touching a board.",
    challenges:
      "Keeping LLM cost near zero across a nine-step pipeline, and proving an autonomous PR actually fixed the issue rather than merely claiming it did.",
    lessons:
      "Model routing is a cost-control problem before it is a capability problem: free tiers first with a per-query-type fallback chain, backed by exact and semantic Redis caches, kept a full autopilot run cheaper than a single paid call would have been. And a generated PR only counts once the validator re-parses it and diffs the graph, because the agent's own summary is precisely the thing you cannot trust.",
    role: "Lead engineer and primary author: about 350 of the repo's ~370 commits, across the FastAPI backend, the autopilot pipeline, model routing and the React dashboard, with one collaborator.",
    evaluation:
      "Generated PRs are not trusted on the agent's word: step nine fetches each PR head, re-parses and re-graphs it, diffs the graph against the base for broken edges and new cycles, and retries unresolved issues a bounded number of times. Model choice was benchmarked on three real tasks from the repo across three OpenRouter models (9/9 solved; gpt-oss-20b about 5.6x cheaper than DeepSeek, gpt-4o-mini fastest at 6.8s average), and those fixes shipped as PRs with 51 passing tests across the touched suites. Backend and frontend CI run on every push.",
    limitations:
      "The model benchmark is three tasks, which is enough to pick a default, not to rank models. Graph-diff validation catches structural breakage, not wrong behaviour that keeps the graph intact, so the senior review still assumes a human reads it. Free-tier routing trades latency and rate limits for cost.",
    demo: "https://developer-onboard.vercel.app",
    github: "https://github.com/KunjShah95/onramp",
  },
  {
    slug: "engineeros",
    video: "/videos/engineeros",
    title: "EngineerOS",
    category: "Agentic AI",
    status: "Live · 10+ DAU",
    icon: "hub",
    description:
      "AI-native workspace unifying notes, tasks, projects, and a knowledge graph, with semantic search and a citation-backed multi-agent assistant.",
    summary:
      "AI-native workspace with a knowledge graph, pgvector semantic search, and a citation-backed multi-agent assistant.",
    stack: ["Next.js 14 RSC", "Supabase", "pgvector", "LangGraph", "Vercel Edge"],
    metrics: [
      { value: "10+", label: "Daily Users" },
      { value: "<200ms", label: "P95 Search" },
      { value: "<3s", label: "Agent Step" },
    ],
    body: "An AI-native workspace that unifies notes, tasks, projects, and a knowledge graph. Notes, tasks, and projects are nodes with real edges, so the assistant can traverse relationships instead of treating every record as an island.",
    challenges:
      "Local-first UX versus server-side intelligence, multi-agent state sync over Realtime, and predictable LLM costs across multi-step runs.",
    lessons:
      "Local-first UX with server-side intelligence is the right default for developer tools. Unifying storage is easy; unifying context is the actual product.",
    role: "Solo build: product, schema and row-level security, retrieval, the assistant and the GitHub integration.",
    evaluation:
      "Retrieval is measured, not assumed. The retrieval eval runs 20 typed queries (paraphrase, exact, mixed) over a 22-document corpus in which 14 documents are deliberate distractors; the first 8-document version scored 100% recall@3 for every strategy, so it measured nothing. Keyword scored 82.5% recall@1 and 92.5% MRR; equal-weight hybrid scored worse (72.5% and 86.7%) until the semantic leg was down-weighted to 0.35. Regression tests assert those floors, so a ranking change that degrades them fails CI alongside lint, typecheck and Vitest.",
    limitations:
      "The eval's semantic leg is a bag-of-words stand-in for a real embedder, so it cannot show what hybrid retrieval is worth; with no API key the product defaults to keyword-only, which is what the numbers support. The assistant answers over retrieved chunks rather than reasoning across the graph, and read-only viewer enforcement for team workspaces is still being swept through.",
    demo: "https://engineeros-delta.vercel.app/",
    github: "https://github.com/KunjShah95/EngineerOS",
  },
  {
    slug: "estate360",
    video: "/videos/estate360",
    title: "Estate360",
    category: "Agentic AI CRM",
    status: "Production",
    icon: "architecture",
    description:
      "Multi-tenant real-estate CRM for builders and brokerages: lead capture, kanban deals, tower/floor/unit inventory, cost sheets, bookings, milestone payments with UPI reconciliation, and a token-scoped buyer portal.",
    summary:
      "Multi-tenant real-estate CRM with test-enforced tenant isolation, milestone payment collection, and grounded document Q&A per workspace.",
    stack: [
      "Next.js 16",
      "Prisma 7",
      "PostgreSQL + pgvector",
      "NextAuth v5",
      "Tailwind v4",
    ],
    metrics: [
      { value: "3", label: "Tenant-Scope Test Gates", accent: true },
      { value: "7", label: "AI Surfaces" },
      { value: "4", label: "LLM Fallbacks" },
    ],
    body: "The whole sales lifecycle on a shared schema where every query is scoped by workspaceId: lead → contact → deal → site visit → unit → cost sheet and payment plan → booking → milestone collection → documents → reporting. The AI layer sits on top of that rather than beside it, with next-best-action, call analysis, revenue and collections forecasting, and a workspace-wide /ask grounded in the tenant's own rows and documents.",
    challenges:
      "Isolation that survives a forgotten filter, a payment engine where a webhook can arrive twice, and a RAG layer that must answer from one customer's documents without ever seeing another's.",
    lessons:
      "Scoping every query by workspaceId is necessary but not sufficient, and RLS that is merely enabled proves nothing: the app connects as a role that owns every table and carries BYPASSRLS, so policies are skipped whether or not they exist. Until a role that respects RLS is in place, the honest backstop is a test that fails the build on any unscoped query. And embeddings from different providers are not comparable, so switching the embedder has to force a reindex.",
    role: "Solo build: schema, auth and multi-tenancy, the payment and booking engine, the RAG layer and deployment.",
    evaluation:
      "Isolation is enforced mechanically rather than by review. A tenant-scope guard test scans every tenant-model call site in app/, lib/ and modules/ and fails if one lacks a workspaceId predicate, with exceptions registered alongside a checkable reason; two more tests assert that every tenant read path has a recorded broker-visibility decision and that the broker predicate actually reaches Prisma. Vitest covers units and Playwright covers end-to-end flows.",
    limitations:
      "Query scoping is the only deployed isolation layer. Postgres RLS is enabled and 31 policies are written, but they stay inert until the app moves to a NOBYPASSRLS role, a switch gated by a script that refuses to proceed until its checks pass. Advanced retrieval strategies (HyDE, hierarchical, query expansion) are opt-in and not yet evaluated.",
    demo: "https://agentic-crm-henna.vercel.app/",
    github: "https://github.com/KunjShah95/agentic-crm",
  },
  {
    slug: "lattice",
    video: "/videos/lattice",
    title: "Lattice",
    category: "AI Infrastructure Index",
    status: "Live",
    icon: "tag",
    description:
      "A curated, stack-ordered index of the infrastructure behind production AI systems: 112 tools across 9 layers, a page per tool, head-to-head comparisons, and 11 essays on the architectural decisions behind them.",
    summary:
      "Stack-ordered index of 112 AI infrastructure tools with per-tool pages, comparisons, essays, and build-time staleness guards.",
    stack: ["Next.js 16", "React 19", "MDX", "Tailwind v4", "Cloudflare Workers"],
    metrics: [
      { value: "112", label: "Tools Indexed", accent: true },
      { value: "152", label: "Pages Built" },
      { value: "134", label: "Unit Tests" },
    ],
    body: "Ordered by where a tool sits in a real system rather than by popularity: serving, routing, retrieval, fine-tuning, agents, orchestration, guardrails, prompts, evals. The facts about a tool (deployment, licence, cost) live apart from its link, and the build throws if either exists without the other, so a wrong licence can be corrected without touching prose.",
    challenges:
      "Reference content rots. Licence, cost, and deployment claims are the fastest-decaying facts in any tool index, and a confident stale one is worse than no entry.",
    lessons:
      "The hard part is not rendering 152 prerendered pages, it is making wrong facts impossible to ship. Coverage is asserted in both directions, stale licence data fails the build, and comparisons resolve tools by name against the dataset so a page cannot drift from the index.",
    demo: "https://lattice.kkshah2005.workers.dev/",
    github: "https://github.com/KunjShah95/lattice",
  },
  {
    slug: "offerguard-ai",
    video: "/videos/offerguard-ai",
    title: "OfferGuard AI",
    category: "AI Career Platform",
    status: "Live",
    icon: "shield_person",
    description:
      "Paste a JD, offer, or recruiter chat and get instant toxicity, burnout, salary-fairness, ghost-hiring, and negotiation analysis.",
    summary:
      "Multi-provider offer analysis across toxicity, burnout, salary fairness, and negotiation leverage.",
    stack: ["TanStack Start", "React 19", "Groq", "Firebase", "Tailwind"],
    metrics: [
      { value: "<3s", label: "End to End" },
      { value: "87%", label: "Model Agreement" },
      { value: "3", label: "Providers" },
    ],
    body: "A multi-provider orchestration pipeline (triage, then a deep analyzer, then a cross-check validator with chain-of-thought negotiation strategy) turns a job offer into an actionable brief in seconds instead of hours.",
    challenges:
      "False positives cost people real jobs, and the three providers disagree often enough to need a cross-check stage rather than a single verdict.",
    demo: "https://offerchecker-pi.vercel.app/",
    github: "https://github.com/KunjShah95/reverseinterview",
  },
  {
    slug: "equitylens",
    title: "EquityLens",
    category: "AI Fairness Auditing",
    status: "Production",
    icon: "balance",
    description:
      "Healthcare fairness auditing platform measuring demographic parity, equalized odds, and calibration across groups, with causal inference and drift detection.",
    summary:
      "Fairness auditing for clinical AI: parity, calibration, and drift across demographic groups.",
    stack: ["React", "FastAPI", "PostgreSQL", "TensorFlow"],
    metrics: [
      { value: "23%", label: "Bias Gap Found", accent: true },
      { value: "10×", label: "Audit Speedup" },
      { value: "3 wks→4h", label: "Audit Time" },
    ],
    body: "A production fairness audit across intersectional demographic slices, with Pareto frontier plots and automatic drift detection. Built for EU AI Act, NIST AI RMF, and ISO 25059 compliance review ahead of pre-market clinical evaluation.",
    lessons:
      "Audit overhead is the real bottleneck, cutting it from three weeks to four hours is what makes fairness review something teams actually run.",
    github: "https://github.com/KunjShah95/EquityLens",
  },
  {
    slug: "learnai",
    video: "/videos/learnai",
    title: "LearnAI",
    category: "Education AI",
    status: "Live",
    icon: "psychology_alt",
    description:
      "Adaptive learning platform with conversational tutoring, multi-provider LLM orchestration, and proficiency estimation via spaced repetition.",
    summary:
      "Adaptive tutoring with proficiency estimation and multi-provider model fallback.",
    stack: ["Next.js", "Firebase", "Supabase", "Gemini"],
    metrics: [
      { value: "+45%", label: "Quiz Completion", accent: true },
      { value: "4.2/5", label: "Satisfaction" },
      { value: "99.7%", label: "Uptime" },
    ],
    body: "Five adaptive difficulty levels with a multi-provider fallback chain across Gemini, GPT, and Claude, so a provider outage degrades quality rather than taking the product down.",
    demo: "https://intelligent-learning-assistant.vercel.app",
    github: "https://github.com/KunjShah95/intelligent-learning-assistant",
  },
  {
    slug: "smartflow-ai",
    video: "/videos/smartflow-ai",
    title: "SmartFlow AI",
    category: "Crowd Intelligence",
    status: "Beta",
    icon: "cloud_sync",
    description:
      "Real-time crowd monitoring with live heatmaps, wait-time prediction, and AI-powered routing recommendations.",
    summary:
      "Real-time crowd monitoring: heatmaps, wait-time forecasting, and routing advice.",
    stack: ["Next.js 15", "TypeScript", "Firebase", "Firestore"],
    metrics: [
      { value: "94%", label: "Accuracy" },
      { value: "<500ms", label: "Latency" },
      { value: "24h", label: "Window" },
    ],
    body: "Real-time ingestion into Firestore with time-series forecasting and heatmap rendering. A hybrid statistical + ML approach beats pure ML once the data gets noisy.",
    demo: "https://ps-1-eight.vercel.app",
    github: "https://github.com/KunjShah95/Smart-flow-ai",
  },
  {
    slug: "resumemaster-ai",
    title: "ResumeMasterAI 2026",
    category: "AI Career",
    status: "Architecture",
    icon: "architecture",
    description:
      "Career intelligence platform with a smart model-routing gateway, a complexity classifier sends cheap work to small models and reserves large models for real reasoning.",
    summary:
      "Smart routing gateway that cut LLM spend 65% by matching model size to task complexity.",
    stack: ["Python", "LangGraph", "ChromaDB", "Streamlit"],
    metrics: [
      { value: "65%", label: "Cost Reduction", accent: true },
      { value: "3×", label: "Precision" },
      { value: "<200ms", label: "Overhead" },
    ],
    body: "A complexity classifier routes each request to the cheapest model that can handle it, with checkpointing and human-in-the-loop review. Precise routing plus bounded agent steps keeps the token bill predictable instead of open-ended.",
    github: "https://github.com/KunjShah01/job-snipper",
  },
  {
    slug: "sentinel-cli",
    video: "/videos/sentinel-cli",
    title: "SENTINEL CLI",
    category: "Security Automation",
    status: "Open Source",
    icon: "terminal",
    description:
      "Automated security auditor that unifies 13+ analyzers into a single CLI workflow with cross-tool correlation and plain-language LLM summaries.",
    summary: "13+ security analyzers unified into one CLI with correlated findings.",
    stack: ["Node.js", "TypeScript", "LLM", "Docker"],
    metrics: [
      { value: "13+", label: "Analyzers" },
      { value: "70%", label: "Audit Cut", accent: true },
      { value: "~40%", label: "FPR Cut" },
    ],
    body: "Pluggable analyzers emit a unified schema so findings correlate across tools instead of landing in separate reports, with an LLM pass that explains the result in plain language.",
    demo: "https://sentinel-cli.vercel.app/",
    github: "https://github.com/KunjShah95/SENTINEL-CLI",
  },
  {
    slug: "railway-inspection",
    title: "Railway Inspection",
    category: "Computer Vision",
    status: "Deployed",
    icon: "memory",
    description:
      "Real-time railway defect detection running YOLOv8 with a TensorRT INT8 engine, GStreamer hardware decode, and CUDA kernels on Jetson Orin.",
    summary:
      "Sub-100ms defect detection on Jetson Orin with a custom INT8 TensorRT engine.",
    stack: ["C++", "OpenCV", "YOLOv8", "CUDA", "TensorRT"],
    metrics: [
      { value: "98.7%", label: "Accuracy", accent: true },
      { value: "4.2×", label: "vs Manual" },
      { value: "<100ms", label: "End to End" },
    ],
    body: "TensorRT ONNX engine with INT8 quantization-aware training, GStreamer hardware-accelerated decode, and hand-written CUDA kernels. Histogram equalization handles the low-light and motion-blur conditions on real track footage.",
    lessons:
      "INT8 QAT delivered 2× over the FP16 baseline while holding accuracy, quantization is an accuracy technique here, not a compromise.",
    github: "https://github.com/KunjShah95/ai-railway",
  },
  {
    slug: "archmind-ai",
    video: "/videos/archmind-ai",
    title: "ArchMind AI",
    category: "Architecture Intelligence",
    status: "Production",
    icon: "smart_toy",
    description:
      "Upload a diagram or a codebase and seven specialized agents score it across scalability, security, reliability, performance, cost, maintainability, and observability, then simulate failures and propose redesigns.",
    summary:
      "Seven parallel review agents that score, simulate, and redesign system architectures.",
    stack: ["Python", "LangGraph", "FastAPI", "React", "Supabase"],
    metrics: [
      { value: "7", label: "Review Agents" },
      { value: "7", label: "Dimensions" },
      { value: "6", label: "Model Fallbacks" },
    ],
    body: "Parses Mermaid, PlantUML, images, and PDFs into a graph, then fans out to seven scoring agents. The fallback chain runs Groq → NVIDIA → OpenRouter → Gemini → Ollama → Hugging Face, backed by an 18-rule heuristic engine that works with zero API keys.",
    github: "https://github.com/KunjShah95/archmind-ai",
    demo: "https://archmind-ai-topaz.vercel.app/",
  },
  {
    slug: "archmind-research-agent",
    video: "/videos/archmind-research-agent",
    title: "ArchMind Research Agent",
    category: "Agentic AI",
    status: "Live",
    icon: "auto_stories",
    description:
      "Autonomous research agent that plans a query, searches and scrapes the web, normalizes sources, and writes a cited report with verifiable provenance.",
    summary: "Planner → search → extract → grounded writer, producing cited research reports.",
    stack: ["Python", "LangGraph", "Streamlit", "RAG", "Web Scraping"],
    metrics: [
      { value: "4", label: "Pipeline Stages" },
      { value: "100%", label: "Cited Claims" },
      { value: "Live", label: "Status" },
    ],
    body: "A planner breaks the request into searches, an extractor normalizes noisy pages, and a grounded writer only claims what retrieval actually supports, every statement carries its source.",
    challenges:
      "Noisy web extraction and topic drift on broad queries, both addressed by constraining the writer to retrieved evidence.",
    demo: "https://internship-assessment-er3kjmh8nw5vvj8wgwxlmc.streamlit.app/",
    github: "https://github.com/KunjShah01/INTERNSHIP-ASSESSMENT",
  },
  {
    slug: "gap-miner",
    title: "GAP Miner",
    category: "AI Research",
    status: "Beta",
    icon: "content_copy",
    description:
      "Full-stack skill gap analyzer: semantic extraction pipelines over vectorized market data produce gap-versus-demand curves for career roadmaps.",
    summary: "Semantic market analysis that cuts roadmap generation from 10 days to 15 seconds.",
    stack: ["Llama-3", "LangChain", "FastAPI", "React", "ChromaDB"],
    metrics: [
      { value: "15s", label: "Roadmap Gen", accent: true },
      { value: "99.98%", label: "Time Saved" },
      { value: "0.92", label: "F1 Score" },
    ],
    body: "A semantic extraction pipeline over ChromaDB-vectorized market data, comparing supply against demand curves to surface the gaps worth closing.",
    github: "https://github.com/KunjShah95/gapminer",
  },
  {
    slug: "upi-fraud-guard",
    title: "UPI Fraud Guard",
    category: "Applied ML",
    status: "Stable",
    icon: "verified_user",
    description:
      "Real-time UPI fraud detection over amount velocity, merchant diversity, geolocation entropy, and time-of-day features, with a moving threshold for a 0.01% base rate.",
    summary: "Sub-100ms fraud scoring tuned for a punishing 0.01% base rate.",
    stack: ["Scikit-Learn", "XGBoost", "Pandas", "Flask"],
    metrics: [
      { value: "88%", label: "Detection" },
      { value: "<0.1%", label: "False Positive", accent: true },
      { value: "<100ms", label: "Scoring" },
    ],
    body: "Feature engineering over transaction velocity and behavioral entropy, paired with a threshold-moving strategy so the classifier stays useful at a fraud rate of one in ten thousand.",
    github: "https://github.com/KunjShah95/UPI-FRAUD-DETECTION-SYSTEM",
  },
  {
    slug: "minbpe-tokenizer",
    title: "MinBPE Tokenizer",
    category: "LLM Core",
    status: "Research",
    icon: "hub",
    description:
      "Byte Pair Encoding implemented from scratch in pure Python, replicating tiktoken's core with byte fallbacks and a custom vocabulary tuned on technical corpora.",
    summary: "A from-scratch BPE tokenizer with a custom technical vocabulary.",
    stack: ["Python", "NLP", "tiktoken", "Algorithms"],
    metrics: [
      { value: "15%", label: "Token Reduction", accent: true },
      { value: "~50K", label: "Merges" },
      { value: "~2×", label: "Slower" },
    ],
    body: "GPT-2/4 regex pre-tokenization, byte-level fallbacks, and a vocabulary retrained on technical text, trading pure-Python speed for a measurable drop in token count on domain corpora.",
    github: "https://github.com/KunjShah95/TOKENIZER-FROM-SCRATCH",
  },
  {
    slug: "cinepulse",
    title: "CinePulse",
    category: "Full Stack ML",
    status: "Production",
    icon: "devices",
    description:
      "End-to-end movie recommendation system: an NLP-heavy PyTorch backend behind a React and FastAPI product surface.",
    summary: "Full-stack recommender with sub-50ms inference and 92% accuracy.",
    stack: ["Python", "PyTorch", "React", "FastAPI"],
    metrics: [
      { value: "92%", label: "Accuracy" },
      { value: "<50ms", label: "Inference", accent: true },
      { value: "E2E", label: "Stack" },
    ],
    body: "A complete recommendation pipeline, feature extraction, model training, serving, and a product surface, rather than a notebook that stops at evaluation.",
    github: "https://github.com/KunjShah95/CinePulse",
  },
  {
    slug: "aether-ai",
    title: "AETHER AI",
    category: "AI Systems",
    status: "Framework",
    icon: "bolt",
    description:
      "Multi-model terminal assistant with a local-first Ollama path for zero data leakage.",
    summary: "Terminal assistant routing across local and hosted models.",
    stack: ["Python", "Ollama", "Gemini", "Groq"],
    metrics: [
      { value: "4", label: "Model Backends" },
      { value: "0", label: "Leakage" },
      { value: "CLI", label: "Interface" },
    ],
    body: "A terminal-native assistant that can fall back to a fully local Ollama path when a prompt must not leave the machine.",
    github: "https://github.com/KunjShah95/AETHER-AI",
  },
] as const;

export const otherBuilds = [
  {
    icon: "school",
    title: "LearnAI adaptive tutor",
    body: "Multi-provider tutoring with proficiency estimation",
  },
  {
    icon: "verified_user",
    title: "SENTINEL CLI Red-Team Runner",
    body: "13+ analyzers, unified security audit schema",
  },
  {
    icon: "speed",
    title: "Ollama Token-Calculation Proposal",
    body: "Issue #15639: cut wasted inference",
  },
] as const;

/* ----------------------------------------------------------------- Writing */

export type Article = {
  slug: string;
  title: string;
  category: "agents" | "edge" | "security" | "mlops" | "genai" | "ml";
  categoryLabel: string;
  readTime: string;
  date: string;
  excerpt: string;
  cta: string;
  featured?: boolean;
};

export const writingCategories = [
  { id: "all", label: "All" },
  { id: "agents", label: "Agents" },
  { id: "edge", label: "Edge & Vision" },
  { id: "genai", label: "Generative AI" },
  { id: "mlops", label: "MLOps" },
  { id: "ml", label: "Machine Learning" },
  { id: "security", label: "Fairness & Safety" },
] as const;

export const articles: readonly Article[] = [
  {
    slug: "what-breaking-things-taught-me",
    title: "What Breaking Things Taught Me About Building Them",
    category: "agents",
    categoryLabel: "Engineering",
    readTime: "9 min read",
    date: "Jun 2026",
    excerpt:
      "The systems that taught me the most were the ones that failed in production, in front of real users.",
    cta: "Read essay",
    featured: true,
  },
  {
    slug: "shipping-harder-than-building",
    title: "Shipping Is Harder Than Building",
    category: "mlops",
    categoryLabel: "Shipping",
    readTime: "8 min read",
    date: "May 2026",
    excerpt:
      "Anyone can build a prototype. Keeping it alive, observable, and cheap to run is the actual work.",
    cta: "Read essay",
  },
  {
    slug: "why-i-build-things",
    title: "Why I Build Things That Do Not Exist Yet",
    category: "agents",
    categoryLabel: "Motivation",
    readTime: "7 min read",
    date: "Apr 2026",
    excerpt:
      "A vector database from scratch, a GPT-2 from first principles, a tokenizer in pure Python, why bother?",
    cta: "Read essay",
  },
  {
    slug: "equitylens-case-study",
    title: "EquityLens: Building an AI Fairness Auditing Platform",
    category: "security",
    categoryLabel: "Case Study",
    readTime: "8 min read",
    date: "Apr 2026",
    excerpt:
      "Finding a 23% performance gap in clinical triage models, and turning a three-week audit into four hours.",
    cta: "Read case study",
  },
  {
    slug: "agentic-workflow-orchestration",
    title: "Orchestrating Complex AI Workflows",
    category: "agents",
    categoryLabel: "Agents",
    readTime: "11 min read",
    date: "Feb 2026",
    excerpt:
      "CrewAI versus LangGraph, fallback model chains, and where human-in-the-loop gates actually belong.",
    cta: "Read guide",
  },
  {
    slug: "agentic-systems-production",
    title: "Building Production-Grade Agentic Systems",
    category: "agents",
    categoryLabel: "Architecture",
    readTime: "12 min read",
    date: "Jan 2026",
    excerpt:
      "Supervisor/subordinate topologies, Postgres JSONB checkpointing, HITL breakpoints, and trace logging that survives a 3am page.",
    cta: "Read deep dive",
  },
  {
    slug: "mlops-scale-deployments",
    title: "MLOps at Scale: Lessons from High-Frequency Model Deployments",
    category: "mlops",
    categoryLabel: "Infrastructure",
    readTime: "10 min read",
    date: "Dec 2025",
    excerpt:
      "Versioning, canary rollout, and quantization as CI/CD stages rather than one-off scripts.",
    cta: "Read guide",
  },
  {
    slug: "rag-semantic-search",
    title: "RAG Pipelines: Semantic Search and Contextual Retrieval",
    category: "genai",
    categoryLabel: "RAG",
    readTime: "11 min read",
    date: "Oct 2025",
    excerpt:
      "Chunking strategies, hybrid retrieval, and re-ranking that measurably improves grounded answers.",
    cta: "Read guide",
  },
  {
    slug: "prompt-engineering-reasoning",
    title: "Prompt Engineering for Complex Multi-Step Reasoning",
    category: "genai",
    categoryLabel: "Prompting",
    readTime: "9 min read",
    date: "Sep 2025",
    excerpt:
      "ReAct, Tree-of-Thoughts, self-correction loops, and structured outputs with XML, JSON, and Pydantic.",
    cta: "Read guide",
  },
  {
    slug: "cv-edge-optimization",
    title: "Computer Vision at Edge: Optimizing YOLOv8 for Real-Time Inference",
    category: "edge",
    categoryLabel: "Computer Vision",
    readTime: "14 min read",
    date: "Nov 2025",
    excerpt:
      "C++ and TensorRT, GStreamer with CUDA, INT8 quantization-aware training, and histogram equalization for low-light track footage.",
    cta: "Read benchmarks",
  },
  {
    slug: "anomaly-detection-streams",
    title: "Anomaly Detection in High-Dimensional Data Streams",
    category: "ml",
    categoryLabel: "Machine Learning",
    readTime: "13 min read",
    date: "Aug 2025",
    excerpt:
      "Building robust streaming anomaly detection that stays useful when the data distribution keeps moving.",
    cta: "Read writeup",
  },
] as const;

export const homeEssays = [
  { title: "What Breaking Things Taught Me About Building Them", year: "2026" },
  { title: "Building Production-Grade Agentic Systems", year: "2026" },
  { title: "Computer Vision at Edge: Optimizing YOLOv8", year: "2025" },
] as const;

/* -------------------------------------------------------------- Experience */

export type Job = {
  company: string;
  role: string;
  period: string;
  kind: string;
  description: string;
  skills: readonly string[];
  live?: boolean;
};

export const jobs: readonly Job[] = [
  {
    company: "Ideaboat",
    role: "Python Developer & Full Stack AI/ML Intern",
    period: "Jul 2026 - Present",
    kind: "Full Stack · AI/ML",
    description:
      "Building AI/ML features in production Python and FastAPI services with React and Node frontends, database design, deployment, and third-party integrations.",
    skills: ["Python", "FastAPI", "React", "Node.js", "PostgreSQL", "Deploy"],
    live: true,
  },
  {
    company: "PHAZE_AI",
    role: "Automation Intern",
    period: "Dec 2025 - Feb 2026",
    kind: "Agents · Automation",
    description:
      "Automated high-scale enterprise workflows using multi-agent systems and agentic reasoning, integrating AI models into full-stack production pipelines.",
    skills: ["Python", "Agents", "Full Stack", "Automation"],
  },
  {
    company: "Open Source",
    role: "Contributor",
    period: "2025 - Present",
    kind: "OWASP · Microsoft · Ollama",
    description:
      "60 merged pull requests, 41 issues resolved, and 24 external codebases, including the OWASP agent-security harness, Microsoft AI-Engineering-Coach, and Ollama.",
    skills: ["AI Security", "CI/CD", "Docs", "Inference"],
    live: true,
  },
] as const;

export const impactMetrics = [
  { value: "60+", label: "PRs Merged" },
  { value: "41", label: "Issues Solved" },
  { value: "24+", label: "Repos" },
] as const;

export const ossTotals = [
  { value: "72", label: "Total PRs" },
  { value: "15K+", label: "Lines Changed" },
  { value: "18", label: "Code Reviews" },
] as const;

/* ------------------------------------------------------- Open source detail */

export type Contribution = {
  org: string;
  label: string;
  title: string;
  kind: "merged" | "proposed";
  /**
   * Category badge. Uses the same vocabulary as the inferred live PR types
   * (`PullRequestKind`) so the two lists read as one system. `issue` is extra,
   * for reported defects that are not pull requests at all.
   */
  tag: "feat" | "fix" | "docs" | "refactor" | "test" | "perf" | "ci" | "security" | "issue";
  url: string;
  notable?: boolean;
  /** Long-form write-up for the contributions worth explaining. */
  caseStudy?: {
    problem: string;
    change: string;
    why: string;
    /** Diff size as merged, e.g. "+127 / -45 across 2 files". */
    size?: string;
    /** ISO date the PR merged. */
    merged?: string;
  };
};

export const contributions: readonly Contribution[] = [
  {
    org: "OWASP/Agent-Security-Regression-Harness",
    label: "OWASP",
    title:
      "Security regression workflow + goal-hijack API-key-extraction scenario for agent testing.",
    kind: "merged",
    tag: "security",
    url: "https://github.com/OWASP/Agent-Security-Regression-Harness/pull/109",
    notable: true,
    caseStudy: {
      problem:
        "The harness shipped a GitHub Actions workflow only as a copy-paste example under docs/. The repository's own CI ran pytest and nothing else, so none of its 19 bundled attack scenarios were validated on a pull request.",
      change:
        "Split CI into two parallel jobs: the existing pytest job and a new security-regression job that validates every scenario YAML, runs trace-based checks against goal-hijack, outbound-email-exfiltration and cross-session memory-leak scenarios (with both a clean and a leaking trace), and dry-runs the scenarios that have no trace fixtures yet. Artifacts upload on every run, and the docs now describe the committed workflow.",
      why:
        "A security harness that never runs its own scenarios can regress silently. The job needs no credentials, since every check uses a recorded trace or a dry run, so it also runs on forks and external PRs.",
      size: "+127 / -45 across 2 files",
      merged: "2026-05-17",
    },
  },
  {
    org: "microsoft/AI-Engineering-Coach",
    label: "Microsoft",
    title: "AGENTS.md worker + trust-flow documentation for the AI engineering coach.",
    kind: "merged",
    tag: "docs",
    url: "https://github.com/microsoft/AI-Engineering-Coach/pull/50",
    notable: true,
    caseStudy: {
      problem:
        "Coding agents working in the repository had no canonical AGENTS.md notes for its three worker subsystems or for the lifecycle of locally trusted rules, so they had to infer both from scattered source and docs.",
      change:
        "Added AGENTS.md notes covering the three workers and the local-rule trust flow, linking out to the existing anti-pattern and rule-editor documentation rather than duplicating it.",
      why:
        "AGENTS.md is what an agent reads before touching a codebase. Pointing it at the source material keeps the notes short and stops them drifting from the docs they summarise.",
      size: "+37 across 1 file",
      merged: "2026-05-25",
    },
  },
  {
    org: "ollama/ollama",
    label: "Ollama",
    title:
      "Proposed token-calculation support with UI display to cut wasted inference.",
    kind: "proposed",
    tag: "feat",
    url: "https://github.com/ollama/ollama/issues/15639",
    notable: true,
  },
  {
    org: "Lavina-korani/edupulse-final",
    label: "EduPulse",
    title: "RBAC, real-time messaging, i18n/RTL, global search, 10+ merged PRs.",
    kind: "merged",
    tag: "feat",
    url: "https://github.com/Lavina-korani/edupulse-final/pulls?q=author%3AKunjShah95",
  },
  {
    org: "Abhash-Chakraborty/Find",
    label: "Find",
    title:
      "PR issue-ownership triage gate (CI) + user-feedback loops for person grouping.",
    kind: "merged",
    tag: "ci",
    url: "https://github.com/Abhash-Chakraborty/Find/pull/225",
    caseStudy: {
      problem:
        "During an open-source programme, PRs were arriving without a linked issue, or from someone other than the issue's assignee, and maintainers were triaging ownership by hand.",
      change:
        "A GitHub Actions gate that labels every opened or updated PR do-not-merge, keeps needs-linked-issue in sync, and assigns the PR to its author only when a linked issue exists and that same author holds it. Dependabot PRs are exempt and labelled as dependencies; issue lookups are capped and missing references ignored, so the workflow cannot wedge.",
      why:
        "It narrows what a maintainer has to check without taking the decision away: the gate never closes a PR and never removes do-not-merge itself. A dry-run checklist ships with it, and the script was syntax-checked with node --check before merge.",
      size: "+178 / -11 across 2 files",
      merged: "2026-05-22",
    },
  },
  {
    org: "Adoflabs/Veridion",
    label: "Veridion",
    title: "Auth enhancements, PWA support, and testing infrastructure.",
    kind: "merged",
    tag: "feat",
    url: "https://github.com/Adoflabs/Veridion/pull/19",
  },
  {
    org: "microsoft/vscode",
    label: "VS Code",
    title:
      "Reported multi-provider model selection gap (OpenAI / Gemini / Ollama).",
    kind: "proposed",
    tag: "issue",
    url: "https://github.com/microsoft/vscode/issues?q=author%3AKunjShah95",
  },
] as const;

/**
 * Only merged pull requests.
 *
 * Open issues and proposals are real activity but they aren't contributions
 * yet — nothing landed upstream. The portfolio showcases `this` so every row
 * links to work that was actually accepted and merged.
 */
export const mergedContributions = contributions.filter(
  (c) => c.kind === "merged",
);

/** Opened issues and unmerged proposals, kept for the data layer only. */
export const proposedContributions = contributions.filter(
  (c) => c.kind !== "merged",
);

/* ------------------------------------------------------------------- Skills */

export const skillGroups = [
  {
    key: "fullstack",
    title: "Full Stack AI",
    icon: "devices",
    description:
      "Web apps with the model built in: API, database and interface shipped together.",
    skills: ["React / Next.js", "FastAPI / Python", "PostgreSQL", "API Architecture"],
  },
  {
    key: "agents",
    title: "Applied ML & Automation",
    icon: "hub",
    description:
      "LLM workflows that call tools, check their own output, and hand off to a human when unsure.",
    skills: ["LangChain / CrewAI", "Agentic Workflows", "RAG Pipelines", "Scraping"],
  },
  {
    key: "core",
    title: "Models & Vision",
    icon: "memory",
    description:
      "Training and tuning models for vision, language and prediction, then making them fast enough to serve.",
    skills: ["PyTorch / CUDA", "YOLOv8 / OpenCV", "Transformers / NLP", "Scikit-Learn"],
  },
  {
    key: "infra",
    title: "Infrastructure & Dev",
    icon: "cloud_sync",
    description:
      "Containers, CI/CD and deployment, so the model runs the same in production as on a laptop.",
    skills: ["Docker / Kubernetes", "Git / GitHub Actions", "Linux", "Cloud Deploy"],
  },
] as const;

export const stackTags = [
  "PyTorch",
  "LangGraph",
  "CrewAI",
  "OpenAI",
  "Llama-3",
  "Hugging Face",
  "ChromaDB",
  "Pinecone",
  "FastAPI",
  "Python",
  "PostgreSQL",
  "Redis",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Docker",
  "Vercel",
  "AWS",
  "Supabase",
] as const;

/**
 * Full inventory, one row per discipline. `category` drives the filter tabs on
 * /skills — each row carries exactly one, so filtering selects a subset of
 * rows rather than re-shaping the data.
 */
export const stackCategories = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "aiml", label: "AI & ML" },
  { id: "data", label: "Data" },
  { id: "infra", label: "Infrastructure" },
  { id: "vision", label: "Vision" },
] as const;

export type StackCategory = (typeof stackCategories)[number]["id"];

export const stackInventory: readonly {
  title: string;
  icon: IconName;
  category: Exclude<StackCategory, "all">;
  items: readonly string[];
}[] = [
  {
    title: "Languages",
    icon: "code_blocks",
    category: "frontend",
    items: ["Python", "TypeScript", "JavaScript", "C++"],
  },
  {
    title: "Frontend",
    icon: "devices",
    category: "frontend",
    items: ["React", "Next.js 15", "Vite", "Tailwind"],
  },
  {
    title: "Backend",
    icon: "terminal",
    category: "backend",
    items: ["FastAPI", "Node.js", "Flask", "Streamlit"],
  },
  {
    title: "AI & ML",
    icon: "hub",
    category: "aiml",
    items: [
      "GPT-4",
      "Claude",
      "Gemini",
      "Llama",
      "Groq",
      "Ollama",
      "LangGraph",
      "CrewAI",
      "PyTorch",
      "XGBoost",
    ],
  },
  {
    title: "Data",
    icon: "content_copy",
    category: "data",
    items: [
      "PostgreSQL",
      "pgvector",
      "ChromaDB",
      "Firebase",
      "Supabase",
      "Redis",
    ],
  },
  {
    title: "Infrastructure",
    icon: "cloud_sync",
    category: "infra",
    items: [
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Vercel",
      "Cloudflare",
      "Render",
    ],
  },
  {
    title: "Computer Vision",
    icon: "memory",
    category: "vision",
    items: ["YOLOv8", "CUDA", "TensorRT", "GStreamer", "OpenCV"],
  },
];

/* ---------------------------------------------------------------- Education */

export const education = {
  institution: "Indus University",
  degree: "B.Tech Computer Science",
  year: "4th Year",
  period: "2023 - 2027",
  specialization: "AI/ML Integration & Automation",
  location: "Ahmedabad, India",
  summary:
    "Focusing on the intersection of full stack development and AI, building automated systems that use distributed intelligence at scale.",
  coursework: [
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing",
    "Distributed Systems",
    "Cloud Deployment",
  ],
} as const;

/* --------------------------------------------------------------- Hackathons */

export type Hackathon = {
  title: string;
  event: string;
  year: number;
  placement: "Finalist" | "Participant";
  team: string;
  description: string;
};

export const hackathons: readonly Hackathon[] = [
  {
    title: "Autonomous Hacks",
    event: "Autonomous Hacks",
    year: 2026,
    placement: "Finalist",
    team: "Solo",
    description:
      "Selected out of 2000+ teams in the online round, and from 300+ teams in the offline final. Built an autonomous AI system end-to-end in 48 hours.",
  },
  {
    title: "Odoo x Adani Hackathon",
    event: "Odoo x Adani",
    year: 2026,
    placement: "Finalist",
    team: "4",
    description:
      "Selected for the final round out of 100+ teams in the Odoo Adani Hackathon.",
  },
  {
    title: "AIDTM Hackathon",
    event: "AIDTM",
    year: 2026,
    placement: "Participant",
    team: "3",
    description: "Participated in the AIDTM Hackathon organized by Adani.",
  },
  {
    title: "AMD Slingshot",
    event: "AMD Slingshot",
    year: 2026,
    placement: "Participant",
    team: "2",
    description: "Participated in the AMD Slingshot hackathon challenge.",
  },
  {
    title: "Odoo Gandhinagar",
    event: "Odoo Gandhinagar",
    year: 2025,
    placement: "Finalist",
    team: "3",
    description:
      "Selected for the final round out of 350+ teams at Odoo Gandhinagar.",
  },
  {
    title: "Smart India Hackathon",
    event: "SIH",
    year: 2025,
    placement: "Finalist",
    team: "6",
    description: "Qualified as a finalist at the college-level SIH hackathon.",
  },
  {
    title: "Walmart Hackathon",
    event: "Walmart",
    year: 2025,
    placement: "Participant",
    team: "3",
    description: "Participated in the Walmart innovation hackathon challenge.",
  },
  {
    title: "Google Agentic AI Hackathon",
    event: "Google",
    year: 2025,
    placement: "Participant",
    team: "2",
    description: "Participated in the Google Agentic AI Hackathon.",
  },
  {
    title: "Yorkie Hackathon",
    event: "Yorkie",
    year: 2025,
    placement: "Participant",
    team: "2",
    description: "Participated in the Yorkie Hackathon 2025.",
  },
  {
    title: "Open Source Workshop",
    event: "Community",
    year: 2025,
    placement: "Participant",
    team: "Community",
    description:
      "Participated in an open source workshop and collaborative community sessions.",
  },
] as const;

/* --------------------------------------------------------------------- Labs */

export type Lab = {
  id: string;
  title: string;
  status: "Stable" | "Beta" | "Experimental" | "Building";
  description: string;
  stack: readonly string[];
  url?: string;
};

export const labs: readonly Lab[] = [
  {
    id: "L01",
    title: "Synthetic Memory",
    status: "Stable",
    description:
      "Architecture for recursive state persistence in non-deterministic agent clusters. Episodic memory buffers with decay-aware consolidation, semantic compression of long-running agent state, and checkpoint-based recovery.",
    stack: ["Redis", "Vector DB", "pgvector", "LLM"],
  },
  {
    id: "L02",
    title: "Neural Protocol",
    status: "Beta",
    description:
      "Standardized handshake and task-routing protocol for multi-agent systems. Capability advertisement, task decomposition contracts, result aggregation, and failure escalation across heterogeneous runtimes.",
    stack: ["gRPC", "Protobuf", "Python", "asyncio"],
  },
  {
    id: "L03",
    title: "Context Window Optimizer",
    status: "Experimental",
    description:
      "Memory compression that prioritises relevant context for long agent sessions. Semantic chunking with recency-relevance scoring, sliding-window eviction, and compressed summaries to stay under budget without losing signal.",
    stack: ["llama.cpp", "Semantic Chunking", "Python"],
  },
  {
    id: "L04",
    title: "Building My Own Vector DB",
    status: "Building",
    description:
      "A full vector database from scratch: 9 ANN algorithms (HNSW, IVF, PQ, Int8, LSH, KD-Tree, VP-Tree, BM25, Hybrid RRF), a cost-based query planner, WAL with fsync durability, background compaction, distributed scatter-gather, and row-level RBAC. Multimodal ingestion, cross-encoder RAG, OpenAI-compatible endpoints, and GPU-accelerated indexing via CuPy and Numba.",
    stack: ["FastAPI", "HNSW", "PostgreSQL", "CLIP", "gRPC", "Kubernetes"],
    url: "https://github.com/KunjShah01/BUILDING-MY-OWN-VECTOR-DB",
  },
  {
    id: "L05",
    title: "Building My Own GPT-2",
    status: "Building",
    description:
      "Reimplementing GPT-2 from first principles following the nanoGPT curriculum, character-level tokenization, causal self-attention, multi-head attention, the full transformer block, then byte-pair encoding and training on Tiny Shakespeare.",
    stack: ["PyTorch", "Python", "CUDA", "Attention", "BPE"],
    url: "https://github.com/KunjShah01/transformers",
  },
  {
    id: "L06",
    title: "MinBPE",
    status: "Stable",
    description:
      "Pure Python byte-pair encoding replicating tiktoken's core, with GPT-2/4 regex pre-tokenization, byte fallbacks, and a custom vocabulary trained on technical corpora.",
    stack: ["Python", "tiktoken", "NLP"],
    url: "https://github.com/KunjShah95/TOKENIZER-FROM-SCRATCH",
  },
] as const;

/* ------------------------------------------------------- Services & pricing */

export const services = [
  {
    title: "Agents and automation",
    icon: "hub",
    iconClass: "text-secondary",
    body: "Autonomous agents and multi-agent workflows with LangGraph and CrewAI, tool use, function calling, and guardrails.",
    outcome: "A process that ran on manual effort now runs itself, with human-in-the-loop gates.",
    pill: "Agents",
    cta: "Discuss an agent build",
  },
  {
    title: "Search and RAG over your data",
    icon: "content_copy",
    iconClass: "text-accent-emerald",
    body: "Retrieval-augmented generation over your documents with hybrid vector + BM25 search and cross-encoder re-ranking.",
    outcome: "Your team can ask questions of your own data and get cited answers.",
    pill: "RAG",
    cta: "Discuss a RAG system",
  },
  {
    title: "Full-stack AI apps",
    icon: "devices",
    iconClass: "text-on-tertiary-container",
    body: "React and Next.js frontends with FastAPI and Python backends, multi-provider LLM orchestration, and fallback chains.",
    outcome: "A polished product your customers can actually use.",
    pill: "Full Stack",
    cta: "Discuss a build",
  },
  {
    title: "Computer vision on the edge",
    icon: "memory",
    iconClass: "text-primary",
    body: "YOLOv8 with TensorRT INT8 quantization-aware training and GStreamer on Jetson-class hardware, sub-100ms inference.",
    outcome: "Real-time defect and object detection running on the edge.",
    pill: "Computer Vision",
    cta: "Discuss a vision pipeline",
  },
  {
    title: "Architecture and cost reviews",
    icon: "verified_user",
    iconClass: "text-on-tertiary-container",
    body: "Architecture reviews, LLM cost optimization via smart routing (up to 65% reduction), and fairness auditing for EU AI Act and NIST compliance.",
    outcome: "A system that is cheaper to run and defensible to an auditor.",
    pill: "Advisory",
    cta: "Request a review",
  },
] as const;

/* -------------------------------------------------------------- Achievements */

export const achievements = [
  {
    value: "98.7%",
    label: "Defect Detection",
    detail: "Railway Inspection: 4.2× faster than manual, <100ms end-to-end",
  },
  {
    value: "65%",
    label: "LLM Cost Cut",
    detail: "ResumeMasterAI: smart routing between small and large models",
  },
  {
    value: "94%",
    label: "Wait-Time Accuracy",
    detail: "SmartFlow AI: real-time prediction on live data",
  },
  {
    value: "23%",
    label: "Bias Gap Found",
    detail: "EquityLens: across demographic groups in clinical triage",
  },
  {
    value: "99.98%",
    label: "Faster Roadmaps",
    detail: "GAP Miner: 10 days of analysis down to 15 seconds",
  },
  {
    value: "10+",
    label: "Daily Active Users",
    detail: "EngineerOS: a workspace people actually rely on",
  },
] as const;

/* ---------------------------------------------------------------- Manifesto */

const projectIndex = new Map(projects.map((p) => [p.slug, p]));

/**
 * Resolves a project slug to its record. Evidence rows cite projects by slug
 * rather than repeating their names and URLs, so a repo that moves or a
 * project that gets renamed is corrected in one place.
 */
export function projectBySlug(slug: string): Project | undefined {
  return projectIndex.get(slug);
}

/**
 * The three principles, each carrying the shipped systems that prove it.
 *
 * The evidence is nested rather than kept in a parallel list so a principle
 * and its proof cannot drift apart, and so the page can say which system
 * stands behind each line. `ships[].project` is a `Project` slug — the
 * manifesto's whole argument is that these are running systems, not claims.
 */
export const principles = [
  {
    number: "01",
    icon: "verified_user",
    title: "Determinism over Hallucination",
    body: "Unconstrained text generation has high entropy. Production systems require multi-pass schema validation, Pydantic guardrails, and deterministic state machines before any external tool executes side effects.",
    ships: [
      {
        claim: "Multi-pass structured JSON extraction with Pydantic validation",
        project: "archmind-research-agent",
      },
      {
        claim: "Bounded tool recursion and recoverable checkpointed agent runs",
        project: "resumemaster-ai",
      },
      {
        claim: "Grounded writers that only claim what retrieval supports",
        project: "archmind-research-agent",
      },
    ],
  },
  {
    number: "02",
    icon: "bolt",
    title: "Edge & Cost Efficiency",
    body: "Throwing $20/token calls at trivial classification is lazy engineering. I prioritize quantization (AWQ/INT8), semantic caching, speculative decoding, and small specialized models on local runtimes.",
    ships: [
      {
        claim: "INT8 quantization-aware training: 2× over FP16, 98.7% retained",
        project: "railway-inspection",
      },
      {
        claim: "Semantic caching and speculative decoding for p99 latency",
        project: "onramp",
      },
      {
        claim: "Complexity-based routing that cut API spend by 65%",
        project: "resumemaster-ai",
      },
    ],
  },
  {
    number: "03",
    icon: "model_training",
    title: "Observability First",
    body: "If you cannot trace every token generation timestamp, p99 latency curve, prompt version, and tool-call parameter payload, your model isn't in production. It's an unmonitored experiment.",
    ships: [
      {
        claim: "Per-token generation timestamps and prompt versioning in traces",
        project: "engineeros",
      },
      {
        claim: "p99 latency tracked per pipeline, not per model",
        project: "engineeros",
      },
      {
        claim: "Recovery from agent loops via Redis state checkpointing",
        project: "onramp",
      },
    ],
  },
] as const;

/* ----------------------------------------------------------------- Contact */

export const directChannels = [
  {
    icon: "terminal",
    label: "GitHub",
    handle: "github.com/KunjShah95",
    href: site.links.github,
  },
  { icon: "tag", label: "X (Twitter)", handle: "@kunjshah_dev", href: site.links.x },
  {
    icon: "badge",
    label: "LinkedIn",
    handle: "linkedin.com/in/kunjshah05",
    href: site.links.linkedin,
  },
  {
    icon: "hub",
    label: "Hugging Face",
    handle: "huggingface.co/kunjshah01",
    href: site.links.huggingface,
  },
  {
    icon: "badge",
    label: "Peerlist",
    handle: "peerlist.io/kunjshah",
    href: site.links.peerlist,
  },
  { icon: "edit_note", label: "Medium", handle: "@kkshah2005", href: site.links.medium },
] as const;

export const projectFocusOptions = [
  "AI Agents",
  "RAG Systems",
  "Full-Stack AI",
  "Edge Vision",
  "Audit / Review",
] as const;

export const timelineOptions = ["Urgent (<2 wks)", "Next Month", "Flexible"] as const;

/** Natural-language hiring Q&A — used for on-page copy and FAQPage schema. */
export const hiringFaqs = [
  {
    question: "Who is Kunj Shah?",
    answer:
      "Kunj Shah is an AI engineer and agent builder based in Ahmedabad, India. He ships production AI systems—autonomous agents, RAG pipelines, edge computer vision, and full-stack AI apps—with 17+ delivered projects and 60+ merged open-source pull requests.",
  },
  {
    question: "Is Kunj Shah available for freelance AI work?",
    answer:
      "Yes. Kunj is open to fixed-scope builds, hourly consulting, monthly retainers, and full-time AI/ML roles. Rates and engagement models are published in INR at kunjshah.in/pricing.md; email kunjkshah05@gmail.com or use the contact form.",
  },
  {
    question: "What does Kunj Shah build?",
    answer:
      "Production agent systems (LangGraph, CrewAI), RAG with hybrid search and re-ranking, React/Next.js plus FastAPI full-stack AI products, YOLOv8/TensorRT edge vision on Jetson, and architecture or cost reviews including EU AI Act fairness auditing.",
  },
  {
    question: "How do I cite Kunj Shah or this portfolio?",
    answer:
      "Use canonical URLs: kunjshah.in for the person, kunjshah.in/projects for shipped work, kunjshah.in/writing for essays. Machine-readable summaries live at kunjshah.in/llms.txt and kunjshah.in/api/portfolio.json.",
  },
] as const;
