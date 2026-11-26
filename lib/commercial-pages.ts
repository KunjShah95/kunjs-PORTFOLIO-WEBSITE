import { githubClaimFloorsLabel, publicMergedLabel } from "@/lib/site-data";

/**
 * Commercial-intent landing pages.
 *
 * These are buyer pages, not job-seeker pages: they answer "can I hire this
 * person for a project" rather than "is this person looking for a role".
 * Every claim is drawn from the shipped-project data in lib/site-data.ts and
 * the published pricing in public/pricing.md, so a new page cannot invent a
 * proof point that the case studies do not support.
 */
export type CommercialSection =
  | { kind: "paragraphs"; id: string; title: string; meta?: string; paragraphs: string[] }
  | { kind: "bullets"; id: string; title: string; meta?: string; items: string[] }
  | { kind: "steps"; id: string; title: string; meta?: string; items: string[] }
  | { kind: "projects"; id: string; title: string; meta?: string; slugs: string[] }
  | { kind: "table"; id: string; title: string; meta?: string; caption: string; columns: string[]; rows: string[][] };

export type CommercialPage = {
  path: string;
  metaTitle: string;
  title: string;
  eyebrow: string;
  lead: string;
  description: string;
  keywords: string[];
  quickAnswer: string;
  quickSources: { label: string; href: string }[];
  sections: CommercialSection[];
  faqs: { question: string; answer: string }[];
  ctaTitle: string;
  ctaBody: string;
};

const merged = `${githubClaimFloorsLabel()} merged pull requests ${publicMergedLabel()}`;

export const commercialPages: readonly CommercialPage[] = [
  {
    path: "/proof-of-work",
    metaTitle: "Proof of Work: 15 Projects, 138+ PRs",
    title: "Proof of work, not a promise.",
    eyebrow: "Open the code before you pay",
    lead:
      "I am Kunj Shah, a freelance AI agent developer in Ahmedabad. I have shipped 15 AI systems and merged 138+ pull requests (67 public) into repositories I do not own. Every number below links to something you can open and check.",
    description:
      "Kunj Shah's proof of work: 14 shipped AI systems and 138+ merged PRs (67 public) across 32 external repos, with source, tests and measured results you can check.",
    keywords: [
      "AI engineer portfolio 100+ merged PRs",
      "freelance AI engineer proof of work",
      "AI agent consultant open source proof",
      "shipped AI projects portfolio India",
      "Kunj Shah proof of work",
    ],
    quickAnswer:
      "Kunj Shah is a freelance AI agent developer in Ahmedabad with 14 shipped AI systems and 138+ merged pull requests (67 public) across 32 external repositories. Each case study links to its source, tests and measured results, so a hiring manager can verify the work before a call.",
    quickSources: [
      { label: "/projects", href: "/projects" },
      { label: "/open-source", href: "/open-source" },
      { label: "/llms.txt", href: "/llms.txt" },
    ],
    sections: [
      {
        kind: "table",
        id: "numbers",
        title: "The numbers, and where to check them",
        meta: "Every figure states what it counts and what it leaves out.",
        caption: "Verifiable claims about Kunj Shah's shipped work",
        columns: ["Claim", "Number", "Where to check", "What it excludes"],
        rows: [
          ["Systems shipped to users", "14", "/projects — one case study per system", "16 systems built; the other 2 are prototypes in /labs"],
          ["Merged pull requests", "138+ (67 public)", "/open-source and the GitHub profile", "Private client merges are real but cannot be linked"],
          ["External repositories", "32", "/open-source", "Repositories I own are not counted here"],
          ["Hackathon finals", "4", "/hackathons", "10 hackathons entered"],
          ["Measured results", "98.7% accuracy · 65% API cost cut · 23% fairness gap", "The linked case study and /writing", "Each result is tied to one setup, not claimed universally"],
        ],
      },
      {
        kind: "projects",
        id: "selected-work",
        title: "Selected systems, with the proof attached",
        meta: "Open a case study, then open its source and its tests.",
        slugs: ["walkcast", "engineeros", "estate360", "railway-inspection", "archmind-ai", "lattice"],
      },
      {
        kind: "steps",
        id: "verify",
        title: "How to verify this in five minutes",
        meta: "The same pass I would ask a hiring manager to run on any portfolio.",
        items: [
          "Open a case study and read the metric with the method next to it. A number without a method is an opinion.",
          "Follow the source link to the repository. Check that the tests exist and that the README describes the same system.",
          "Read the limitations section. If a page has none, it is hiding where the system breaks.",
          "Open /open-source and match a public merged PR to the project it changed.",
          "Bring the one thing that is still unclear to the intro call. If the answer is not in the code, it should be said plainly.",
        ],
      },
      {
        kind: "paragraphs",
        id: "limits",
        title: "What this proof does not show",
        paragraphs: [
          "Most client work is private, so there is no logo wall and no quote to publish without permission. The public work is shown in full; the private work is not claimed with a link that would 404.",
          "A benchmark is a result under a specific setup, not a guarantee for your data. The case studies name the corpus, hardware and failure modes behind each figure.",
          "A merged PR proves that a maintainer accepted a change. It does not prove that every change was large. Both the count and the links are shown so you can judge the work yourself.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Kunj Shah a freelance AI agent developer?",
        answer:
          "Yes. Kunj Shah is an AI engineer in Ahmedabad, India, available for freelance fixed-scope builds, hourly reviews and monthly retainers. He ships agents, RAG search, full-stack AI apps and edge computer vision, and publishes the code and tests for the work he can show.",
      },
      {
        question: "Does he have a real shipped-project portfolio?",
        answer:
          "Yes. 14 systems are shipped to users and each has a case study at kunjshah.in/projects. 16 systems have been built in total; the two prototypes are listed separately in /labs rather than counted as shipped.",
      },
      {
        question: "Can I see the merged pull requests?",
        answer:
          "The public subset is 67 merged pull requests, listed one link per merge on kunjshah.in/open-source. The full floor is 138+ across 32 external repositories; the remainder are private client merges that cannot be linked without exposing a client.",
      },
      {
        question: "How much does it cost to hire him?",
        answer:
          "Fixed-scope projects start at ₹25,000 and typically take 2 to 4 weeks. Reviews and debugging are ₹1,500/hour, and retainers run ₹30,000-75,000/month. The exact price is fixed in writing after a free 15-minute call. Full rates are at kunjshah.in/pricing.md.",
      },
    ],
    ctaTitle: "Now check the work against your problem.",
    ctaBody:
      "Send two or three sentences about what you need built. I will answer on that directly, and the first 15-minute call is free.",
  },
  {
    path: "/hire-ai-agent-developer",
    metaTitle: "Hire an AI Agent Developer",
    title: "Hire an AI agent developer who shows the tests.",
    eyebrow: "For founders and teams ready to commission work",
    lead:
      "You are not looking for a candidate profile. You need an agent that works against your own systems, with a scope, a price and code you can inspect. I build that in two to four weeks and hand it over in your repository.",
    description:
      "Hire an AI agent developer who ships code you can check: LangGraph and CrewAI agents with evals, verification gates and fixed INR scope in 2–4 weeks.",
    keywords: [
      "hire ai agent developer",
      "AI agent consultant open source proof of work",
      "freelance AI engineer who ships real code",
      "LangGraph developer India",
      "CrewAI developer India",
      "custom AI agent developer for business",
    ],
    quickAnswer:
      "Hire Kunj Shah, a freelance AI agent developer in Ahmedabad, for fixed-scope LangGraph and CrewAI agents with typed tool contracts, evaluations and independent verification of each step. Projects start at ₹25,000, take 2 to 4 weeks, and the code lands in your repository.",
    quickSources: [
      { label: "/proof-of-work", href: "/proof-of-work" },
      { label: "/ai-agent-development", href: "/ai-agent-development" },
      { label: "/pricing.md", href: "/pricing.md" },
    ],
    sections: [
      {
        kind: "bullets",
        id: "deliverable",
        title: "What you get for a fixed price",
        meta: "The same deliverable on every engagement. No lock-in, no black box.",
        items: [
          "A scoped first version with a written definition of done, usually in 2 to 4 weeks.",
          "Typed tool contracts and a checkpointed graph for anything multi-step, not a prompt that grows until it breaks.",
          "An evaluation set from your real cases, plus a verification step that compares the agent's claim with your application's own state.",
          "Fallback providers so one model outage does not take the workflow offline.",
          "Code, tests, logs and a handoff document in your repository and your cloud, with two revision rounds included.",
        ],
      },
      {
        kind: "projects",
        id: "proof",
        title: "Evidence you can open before the call",
        meta: "Four shipped systems, each with its own measurement and limitations.",
        slugs: ["walkcast", "onramp", "archmind-ai", "estate360"],
      },
      {
        kind: "table",
        id: "freelancer-vs-agency",
        title: "Freelancer or agency?",
        meta: "An honest comparison, including when an agency is the better choice.",
        caption: "Choosing between a freelancer and an agency for a custom AI agent",
        columns: ["Question", "Freelancer (this practice)", "Agency"],
        rows: [
          ["Who writes the code", "The person you talk to, from scope to handover", "A rotating team, often with a project manager between you and the build"],
          ["Typical first version", "2 to 4 weeks, fixed quote in writing", "Longer procurement and staffing cycle"],
          ["Starting price", "₹25,000 fixed scope; ₹1,500/hour for reviews", "Usually a larger retainer or project minimum"],
          ["Proof before you pay", "Public case studies, source, tests and a PR history you can open", "A pitch deck and references you have to take on trust"],
          ["Lock-in", "Code and tests in your repo; you own everything", "Varies; ask who owns the repository and the prompts"],
          ["Pick this when", "One clear workflow, a small team, and a need to ship", "You need many parallel workstreams and a dedicated account function"],
        ],
      },
      {
        kind: "steps",
        id: "vet",
        title: "How to vet an AI agent developer before hiring",
        items: [
          "Ask for the definition of done on a past project, not the technology stack.",
          "Ask how the agent's claimed success is checked against application state. If the answer is 'the model reports it', keep looking.",
          "Open the repository and read the evaluation. A real eval has cases that can fail, not a demo that always passes.",
          "Ask for the limitations section. An engineer who knows where the system breaks is the one you want maintaining it.",
          "Ask who owns the code, the cloud and the prompts. The answer should be you, in writing, before work starts.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does it cost to build a custom AI agent?",
        answer:
          "A single automated workflow is typically ₹15,000-35,000; a full agent product with tools, guardrails and deployment is ₹25,000-60,000+. Hourly review work is ₹1,500. An agency typically starts higher because of staffing and management overhead. The exact fixed quote is written after a free 15-minute call, and full rates are at kunjshah.in/pricing.md.",
      },
      {
        question: "Which frameworks do you use for agents?",
        answer:
          "LangGraph for most multi-step agents, CrewAI where role-based crews fit, Playwright when the agent has to work a browser, and plain tool calling when a framework adds nothing. The choice is made per project and written into the scope.",
      },
      {
        question: "Can you work with an existing codebase and cloud?",
        answer:
          "Yes. Code goes into your repository and your cloud from the first commit. The handoff includes tests, logging and a short document your team can run the system from. There is no platform to subscribe to and no lock-in.",
      },
      {
        question: "Do you take full-time roles as well as projects?",
        answer:
          "Yes, but this page is for project work. If you are hiring for a full-time AI engineering role, the about and contact pages cover that path. For a scoped build, start here or at the contact page.",
      },
    ],
    ctaTitle: "Bring the workflow you want automated.",
    ctaBody:
      "Two or three sentences is enough: what the agent should do, which system it touches, and when you need it. I reply within one working day.",
  },
  {
    path: "/ai-automation-consultant-ahmedabad",
    metaTitle: "AI Automation Consultant Ahmedabad",
    title: "AI automation consultant in Ahmedabad for startups.",
    eyebrow: "Ahmedabad · Gujarat · India · remote",
    lead:
      "I audit a workflow that is eating your team's time, then build the narrowest agent or search system that removes it. Fixed INR scope, a two-to-four-week pilot, and the code in your repository when it ships.",
    description:
      "AI automation consultant in Ahmedabad for startups: workflow audits, agents and RAG in your stack, fixed INR scope, code in your repo, 2–4 week pilots.",
    keywords: [
      "AI automation consultant Ahmedabad",
      "AI automation consultant for startups India",
      "AI integration developer for SaaS product",
      "RAG application developer for business",
      "custom AI agent for business India",
      "AI workflow automation Gujarat",
    ],
    quickAnswer:
      "Kunj Shah is an AI automation consultant in Ahmedabad who helps startups replace manual workflows with agents and document search. A typical engagement is a free 15-minute call, a fixed written quote, a 2 to 4 week pilot, and a handover in your repository. Fixed projects start at ₹25,000.",
    quickSources: [
      { label: "/ai-developer-ahmedabad", href: "/ai-developer-ahmedabad" },
      { label: "/services.md", href: "/services.md" },
      { label: "/pricing.md", href: "/pricing.md" },
    ],
    sections: [
      {
        kind: "bullets",
        id: "workflows",
        title: "Workflows I automate",
        meta: "Each one is backed by a shipped system you can open.",
        items: [
          "Developer onboarding: turn a repository into a role-assigned plan and reviewed pull requests — OnRamp.",
          "Support and knowledge search: answers over your own documents with a source cited for every claim — EngineerOS and Estate360.",
          "Architecture review: several agents scoring a design, simulating failures and working with no API keys — ArchMind AI.",
          "Field inspection and reporting: on-device detection with measured latency — Railway Inspection.",
          "Lead intake and follow-up inside a multi-tenant CRM with test-enforced isolation — Estate360.",
        ],
      },
      {
        kind: "steps",
        id: "engagement",
        title: "How the engagement runs",
        meta: "The same four steps for every fixed-scope pilot.",
        items: [
          "A free 15-minute call to name one workflow, who uses it, and what a correct result looks like.",
          "A fixed quote in writing: scope, price, timeline and the evaluation cases that will decide whether the pilot passed.",
          "A 2 to 4 week build with weekly demos. You see the system running before you see a final invoice.",
          "Handover: code in your repo, tests in your CI, logs and a short document your team can run it from.",
        ],
      },
      {
        kind: "projects",
        id: "proof",
        title: "Consulting backed by shipped systems",
        meta: "Not a slide deck. Open the code and the measurements.",
        slugs: ["onramp", "engineeros", "estate360", "smartflow-ai"],
      },
      {
        kind: "paragraphs",
        id: "fit",
        title: "Who this is for, and who it is not for",
        paragraphs: [
          "This is for founders and small teams with one painful, specific workflow and a system the automation can touch through an API or a repository. It works best when there is someone on your side who can say what a correct result looks like.",
          "It is not for a vague 'add AI to our product' brief, for evading anti-bot systems, or for a project where nobody can define done. If your need is a full-time hire instead of a project, the contact page covers that separately.",
          "If you are comparing local options, the AI developer in Ahmedabad page covers availability and rates; this page covers the consulting engagement and the workflows it applies to.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does an AI automation consultant actually do?",
        answer:
          "An AI automation consultant finds the workflow that costs a team the most time, defines what a correct result looks like, then builds the narrowest system that produces it: an agent with tools, search over your documents, or a small service connecting the two. The work is measured against real cases before it is called done.",
      },
      {
        question: "Do you work with startups outside Ahmedabad?",
        answer:
          "Yes. I am based in Ahmedabad, Gujarat (UTC +5:30), and work remotely with teams anywhere a repository can be shared. Local meetings in Ahmedabad are available when useful, but they are not required.",
      },
      {
        question: "How much does an AI automation pilot cost?",
        answer:
          "Fixed-scope projects start at ₹25,000, with a typical 2 to 4 week pilot. Automation workflows are usually ₹15,000-35,000 and a full product or MVP ₹25,000-60,000+. Retainers run ₹30,000-75,000/month. Full details are at kunjshah.in/pricing.md.",
      },
      {
        question: "Where does my data live?",
        answer:
          "In your own database and cloud. The default retrieval stack is PostgreSQL with pgvector, which keeps documents, embeddings and permissions together. Code and configuration land in your repository from the first commit.",
      },
    ],
    ctaTitle: "Name the workflow that is eating your week.",
    ctaBody:
      "Tell me what it is, who touches it, and what a correct result would look like. You will get a fixed quote in writing after the first call.",
  },
];

export function commercialPageByPath(path: string): CommercialPage {
  const page = commercialPages.find((entry) => entry.path === path);
  if (!page) throw new Error(`No commercial page for ${path}`);
  return page;
}
