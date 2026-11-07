import { essaysByDate, type Essay } from "@/lib/essays";
import { pricingTiers, projects, services, type Project } from "@/lib/site-data";

/**
 * Service landing pages: one per service that has enough shipped work behind
 * it to say something specific. Agents and RAG qualify (several case studies,
 * measured evaluations, essays). Full-stack, cost review and edge vision each
 * rest on one project, so they stay on the home page until there is more to
 * show: a page with one proof point is a thin keyword page, and that hurts
 * more than it helps.
 *
 * Nothing here is written fresh. The service copy comes from `services`, the
 * proof from each project's own "How it's tested" section, the prices from
 * `pricingTiers`, and the essays are matched by tag. So the landing pages can
 * never claim more than the case studies do.
 */

export type ServicePage = {
  path: string;
  /** Which entry in `services` this page expands, by its pill. */
  pill: (typeof services)[number]["pill"];
  title: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  /** Case studies to cite, strongest evidence first. */
  projectSlugs: string[];
  /** An essay is listed when a word in one of its tags is one of these. */
  essayTags: string[];
  /** Price bands that apply, by tier name. */
  tierNames: (typeof pricingTiers)[number]["name"][];
  /** How the work is done: each line is backed by a cited case study. */
  approach: { title: string; body: string; slug: string }[];
  faqs: { question: string; answer: string }[];
};

export const servicePages: readonly ServicePage[] = [
  {
    path: "/ai-agent-development",
    pill: "Agents",
    title: "AI agent development",
    metaTitle: "AI Agent Development Services",
    description:
      "AI agents that check their own work against your app's real state, built with LangGraph, Playwright and tool use. Fixed prices in INR, 2 to 4 week builds, code in your repo.",
    keywords: [
      "AI agent development",
      "AI agent development services",
      "hire AI agent developer",
      "LangGraph developer",
      "agentic AI developer India",
      "AI automation developer",
    ],
    projectSlugs: ["walkcast", "onramp", "archmind-ai", "estate360"],
    essayTags: ["agent", "agents", "langgraph", "browser"],
    tierNames: ["AI workflow automation", "AI product or MVP"],
    approach: [
      {
        title: "Verify against the app, not the agent's report",
        body: "Each step is checked against the application's own records before the next one runs. In the published Walkcast run, 3 of 4 agent success claims were false, and the check caught all three.",
        slug: "walkcast",
      },
      {
        title: "Re-check generated work before it ships",
        body: "OnRamp re-parses every pull request its agents open and diffs the dependency graph against the base for broken edges and new cycles, retrying unresolved issues a bounded number of times.",
        slug: "onramp",
      },
      {
        title: "Keep running when a model provider fails",
        body: "Calls go through a fallback chain across providers, and the tests exercise that chain directly, because it is the part most likely to break.",
        slug: "archmind-ai",
      },
      {
        title: "Make the safety rules a failing test",
        body: "Rules like tenant isolation are enforced by tests that fail the build, so they never depend on someone noticing in review.",
        slug: "estate360",
      },
    ],
    faqs: [
      {
        question: "How do you stop an agent from reporting success when it failed?",
        answer:
          "By not taking its word for it. After each action the system reads the application's state and compares it with what the step was meant to change. If they disagree, the step fails or the task goes to a person. That is the method Walkcast measures, and its published run is linked in the case study.",
      },
      {
        question: "Which frameworks do you use?",
        answer:
          "LangGraph for most multi-step agents, CrewAI where role-based crews fit, Playwright when the agent has to work a browser, and plain tool calling when a framework adds nothing. The choice is made per project and written into the scope.",
      },
      {
        question: "How long does an agent build take, and what does it cost?",
        answer:
          "Two to four weeks for a scoped first version. A single automated workflow is typically ₹15,000–35,000, and a full agent product ₹25,000–60,000+. The exact price is fixed in writing before work starts.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You do. Code goes into your repository and your cloud from the first commit, with tests, logging and a handoff doc your team can run it from.",
      },
    ],
  },
  {
    path: "/rag-development",
    pill: "RAG",
    title: "RAG and document search development",
    metaTitle: "RAG Development Services: Search Over Your Documents",
    description:
      "Search and RAG over your own documents that cites a source for every answer, with recall measured on real questions before launch. pgvector, BM25 and re-ranking; fixed INR prices.",
    keywords: [
      "RAG development",
      "RAG development services",
      "retrieval augmented generation developer",
      "document search AI",
      "pgvector developer",
      "hire RAG developer India",
    ],
    projectSlugs: ["engineeros", "archmind-research-agent", "onramp", "estate360"],
    essayTags: ["rag", "retrieval", "citations", "search"],
    tierNames: ["AI workflow automation", "AI product or MVP"],
    approach: [
      {
        title: "Measure recall on questions that can fail",
        body: "EngineerOS scores retrieval on 20 typed queries over a corpus where 14 of 22 documents are deliberate distractors. The first, easier corpus scored 100% for every strategy, which meant it measured nothing.",
        slug: "engineeros",
      },
      {
        title: "Tune hybrid search on the numbers",
        body: "Equal-weight hybrid search scored worse than keyword alone until the semantic leg was down-weighted to 0.35. The weights come from the eval, not from a default.",
        slug: "engineeros",
      },
      {
        title: "Fail the build when recall drops",
        body: "Regression tests assert the recall floors in CI, so a change to chunking, embeddings or prompts that hurts retrieval cannot ship unnoticed.",
        slug: "engineeros",
      },
      {
        title: "Cite a source for every claim",
        body: "Answers carry the passage they came from. The research agent's pipeline ends in a report where every claim is cited.",
        slug: "archmind-research-agent",
      },
    ],
    faqs: [
      {
        question: "How do I know the search actually finds the right document?",
        answer:
          "Before launch we write a set of real questions with known answers from your documents, and the system is scored on them. The score is a number in the handoff, and a test keeps it from dropping later.",
      },
      {
        question: "Vector search, keyword search, or both?",
        answer:
          "Usually both, weighted by what the evaluation shows. On EngineerOS keyword search beat an equal-weight hybrid until the semantic side was down-weighted, so the mix is measured per corpus rather than assumed.",
      },
      {
        question: "Where does my data live?",
        answer:
          "In your own database and cloud. The default stack is PostgreSQL with pgvector, which keeps documents, embeddings and permissions in one place you already control.",
      },
      {
        question: "How long does it take, and what does it cost?",
        answer:
          "Two to four weeks for a scoped first version. Projects are priced from the published bands, ₹15,000–35,000 for a single workflow and ₹25,000–60,000+ for a full product, and the exact price is fixed in writing after scoping.",
      },
    ],
  },
];

export function servicePageByPath(path: string): ServicePage {
  const page = servicePages.find((entry) => entry.path === path);
  if (!page) throw new Error(`No service page for ${path}`);
  return page;
}

export type ResolvedServicePage = ServicePage & {
  service: (typeof services)[number];
  projects: Project[];
  essays: Essay[];
  tiers: (typeof pricingTiers)[number][];
};

/** Join a page's references to the data they point at; throws on a dangling one. */
export function resolveServicePage(page: ServicePage): ResolvedServicePage {
  const service = services.find((entry) => entry.pill === page.pill);
  if (!service) throw new Error(`${page.path}: no service with pill ${page.pill}`);
  const cited = page.projectSlugs.map((slug) => {
    const project = projects.find((entry) => entry.slug === slug);
    if (!project) throw new Error(`${page.path}: unknown project ${slug}`);
    return project;
  });
  for (const step of page.approach) {
    if (!page.projectSlugs.includes(step.slug)) {
      throw new Error(`${page.path}: "${step.title}" cites ${step.slug}, which the page does not list`);
    }
  }
  // Whole words only: "rag" matches "rag" and "rag pipelines" but not "rags",
  // a tag on an unrelated tools survey. List plural forms explicitly.
  const words = (tag: string) => tag.toLowerCase().split(/[^a-z0-9]+/);
  const essays = essaysByDate
    .filter((essay) =>
      essay.tags.some((tag) =>
        words(tag).some((word) => page.essayTags.some((want) => word === want)),
      ),
    )
    .slice(0, 5);
  const tiers = pricingTiers.filter((tier) =>
    (page.tierNames as readonly string[]).includes(tier.name),
  );
  return { ...page, service, projects: cited, essays, tiers };
}
