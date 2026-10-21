# Services: Kunj Shah (AI Engineer & Agent Builder)

> Machine-readable services summary for AI agents and prospective clients.
> Contact: kunjkshah05@gmail.com · https://kunjshah.in/contact
> Last updated: 2026-10-21

## Who This Is For

Founders, startups, and engineering teams that need AI shipped, not a slide deck.
Kunj Shah builds production AI systems from brief to deployment in weeks, not quarters.

## Services

Each service leads with the problem a prospect recognises as their own, then
what actually ships, then the shipped system that backs the claim.

### 1. Agents that verify their own work

- **Problem:** Your AI feature demos well and then fails silently in production
- **What you get:** An agent pipeline where each step is checked against real application state before it is trusted, with human-in-the-loop gates where confidence drops.
- **Proof:** Walkcast Lab caught 3 of 4 false successes where an agent claimed success the app's records contradicted.
- **Stack:** LangGraph, CrewAI, Playwright, Tool use

### 2. Search and RAG over your own documents

- **Problem:** Your data is already there, but nobody can find anything in it
- **What you get:** Hybrid retrieval over your documents with citations on every claim, measured against a labelled question set so recall is a number rather than an impression.
- **Proof:** EngineerOS runs a 20-query retrieval eval in CI that fails the build if recall drops below its floor.
- **Stack:** pgvector, BM25, Cross-encoder re-ranking

### 3. Full-stack AI apps, shipped end to end

- **Problem:** You need a working product, not a prototype
- **What you get:** Database, API and interface designed and deployed together, with model fallback chains so a provider outage degrades quality instead of taking the product down.
- **Proof:** 17+ systems deployed, including a multi-tenant CRM where tenant isolation is enforced by a test that fails the build.
- **Stack:** Next.js, FastAPI, PostgreSQL, Multi-provider fallback

### 4. LLM cost and architecture review

- **Problem:** Your model invoice keeps growing and nobody knows why
- **What you get:** A review of where the spend actually goes, plus a routing layer that sends easy work to small models and reserves large ones for real reasoning.
- **Proof:** Complexity-based routing cut API spend 65% with under 200ms added overhead.
- **Stack:** Model routing, Semantic caching, Quantization

### 5. Computer vision on the edge

- **Problem:** Inspection and defect detection has to happen in the field
- **What you get:** INT8 quantization-aware training with hardware-accelerated decode, so detection runs on Jetson-class hardware at sub-100ms instead of in the cloud.
- **Proof:** 98.7% accuracy at 4.2x manual throughput on real railway track footage.
- **Stack:** YOLOv8, TensorRT, CUDA, GStreamer

## Ways to work together

### Hiring managers: Full-time AI or full-stack role

Final-year B.Tech student at Indus University, currently interning on production AI/ML work. Open to AI engineering and full-stack roles where the systems are real and the evaluation matters.

- 2 internships shipping production AI/ML features
- 17+ systems built and deployed
- 60+ PRs merged into OWASP, Microsoft and Ollama

Next step: https://kunjshah.in/contact#inquiryForm

### Founders and small businesses: AI product build or workflow automation

A scoped pilot delivered end to end: discovery, build, tests, deployment and handover. Priced per pilot rather than per hour so you know the cost before we start.

- ₹10,000-20,000: website and lead-capture setup
- ₹15,000-35,000: AI workflow automation
- ₹25,000-60,000+: AI product or MVP engineering

Next step: https://kunjshah.in/contact#inquiryForm

### Open-source maintainers: Contributions and maintainership

Merged work in OWASP, Microsoft and Ollama repositories, including a security-regression CI workflow and AGENTS.md documentation. Ready to take on maintainer or triage responsibility where the project is agent and AI tooling.

- 60+ merged PRs, 41 issues resolved, 24+ repositories
- CI, security and agent-tooling contributions
- Onboarding docs written for coding agents

Next step: https://kunjshah.in/open-source

## Availability

- Open to: freelance, contract, part-time retainer, and full-time AI roles
- Location: Ahmedabad, India (remote-friendly, UTC+5:30)
- See https://kunjshah.in/pricing.md for rates
