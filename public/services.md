# Services: Kunj Shah (AI Engineer & Agent Builder)

> Machine-readable services summary for AI agents and prospective clients.
> Contact: kunjkshah05@gmail.com · https://kunjshah.in/contact
> Last updated: 2026-10-22

## Who This Is For

Founders, startups, and engineering teams that need AI shipped, not a slide deck.
Kunj Shah builds production AI systems from brief to deployment in weeks, not quarters.

## Services

Each service leads with the problem a prospect recognises as their own, then
what actually ships, then the shipped system that backs the claim.

### 1. Agents that check their own work

- **Problem:** Your agent says the task is done. Your database disagrees.
- **What you get:** An agent pipeline that compares every step against your app's real state before trusting it, and hands the task to a person when its confidence drops.
- **Proof:** In the published Walkcast Lab run, 3 of 4 agent success claims were false. The harness flagged all three.
- **Stack:** LangGraph, CrewAI, Playwright, Tool use

### 2. Search and RAG over your own documents

- **Problem:** The answer is somewhere in your documents. Nobody can find it.
- **What you get:** Search across your files that cites a source for every answer, scored against a set of real questions so you know the recall before launch.
- **Proof:** EngineerOS runs a 20-question retrieval test in CI. If recall drops below its floor, the build fails.
- **Stack:** pgvector, BM25, Cross-encoder re-ranking

### 3. Full-stack AI apps, built and deployed

- **Problem:** You have a prototype. You need a product people can log into.
- **What you get:** Database, API, interface and deployment in one build, with backup model providers so one provider's outage never takes your product offline.
- **Proof:** 17+ systems shipped, including a multi-tenant CRM where a test fails the build if any query could read another customer's data.
- **Stack:** Next.js, FastAPI, PostgreSQL, Multi-provider fallback

### 4. LLM cost and architecture review

- **Problem:** Your model bill grows every month and nobody can say why.
- **What you get:** A read of where the spend goes, then a router that sends easy requests to small models and saves the large ones for hard reasoning.
- **Proof:** Complexity-based routing cut API spend 65% and added under 200ms per request.
- **Stack:** Model routing, Semantic caching, Quantization

### 5. Computer vision on edge hardware

- **Problem:** Defect detection has to run in the field, on the device.
- **What you get:** Detection models quantized to INT8 and tuned for Jetson-class hardware, so inference runs on the device in under 100ms.
- **Proof:** 98.7% accuracy at 4.2x manual inspection speed on real railway track footage.
- **Stack:** YOLOv8, TensorRT, CUDA, GStreamer

## Ways to work together

### Hiring managers: Full-time AI or full-stack role

Final-year B.Tech student at Indus University, interning on production AI/ML work at Ideaboat. Open to AI engineering and full-stack roles on teams that measure what they ship.

- 2 internships shipping production AI/ML features
- 17+ systems built and deployed
- 60+ PRs merged across 24 external repositories

Next step: https://kunjshah.in/contact#inquiryForm

### Founders and small businesses: AI product build or workflow automation

A scoped pilot delivered end to end: discovery, build, tests, deployment and handover. Each pilot has a fixed price, agreed in writing before work starts.

- ₹10,000-20,000: website and lead-capture setup
- ₹15,000-35,000: AI workflow automation
- ₹25,000-60,000+: AI product or MVP engineering

Next step: https://kunjshah.in/contact#inquiryForm

### Open-source maintainers: Contributions and maintainership

Merged work in the OWASP agent-security harness and Microsoft AI-Engineering-Coach, including a security-regression CI workflow and AGENTS.md documentation. Ready to take on maintainer or triage responsibility where the project is agent and AI tooling.

- 60+ merged PRs, 43 issues resolved, 24+ repositories
- CI, security and agent-tooling contributions
- Onboarding docs written for coding agents

Next step: https://kunjshah.in/open-source

## Availability

- Open to: freelance, contract, part-time retainer, and full-time AI roles
- Location: Ahmedabad, India (remote-friendly, UTC+5:30)
- See https://kunjshah.in/pricing.md for rates
