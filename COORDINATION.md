# Parallel work — read before writing

Two agents are building this rebuild at the same time.

- `content/**` (projects, lab, writing MDX, now.json) — owned by the content agent.
- `src/app/**` (except globals.css), `src/components/**`, `src/mdx/**`, `public/` config, `next.config.ts`,
  `src/app/sitemap.ts`, `src/app/robots.ts` — owned by the UI agent (Claude Code).
- `src/lib/types.ts` and `src/lib/content.ts` are shared contracts. Do not change field names without
  noting it here.

MDX components available to content: <Section n id title kicker>, <Diagram name="..."> plus the named
diagram aliases already used (WorkspaceDiagram, AgentLoopDiagram, RouterDiagram, ...), <Callout>, <Figure>.

Only real, verified content. No invented metrics, labs, or projects.
