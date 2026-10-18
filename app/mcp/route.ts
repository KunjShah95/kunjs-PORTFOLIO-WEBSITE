import { buildPortfolioDocument } from "@/lib/portfolio-export";
import { renderMarkdown } from "@/lib/markdown";
import { ORIGIN } from "@/lib/routes";
import { projects, services, site } from "@/lib/site-data";

/* ==========================================================================
   Read-only MCP server (Streamable HTTP, stateless JSON responses).

   Lets an agent query the portfolio directly instead of scraping it. Every
   tool is a pure read over lib/site-data, so there is no auth, no session and
   nothing to rate-limit beyond the platform defaults. Hiring goes through the
   contact form, which stays a human-confirmed action.

   Protocol: https://modelcontextprotocol.io/specification/2025-06-18/basic/transports
   ========================================================================== */

const PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"];

type JsonRpcRequest = { jsonrpc: "2.0"; id?: string | number | null; method: string; params?: Record<string, unknown> };

const text = (value: string) => ({ content: [{ type: "text", text: value }] });

const tools = [
  {
    name: "get_profile",
    description: `Who ${site.name} is: role, location, contact details, profiles and headline metrics.`,
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, openWorldHint: false },
    run: () => text(JSON.stringify(buildPortfolioDocument(), null, 2)),
  },
  {
    name: "list_projects",
    description: "List every project with slug, title, category, status and a one-line summary.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, openWorldHint: false },
    run: () =>
      text(
        projects
          .map((p) => `${p.slug} | ${p.title} | ${p.category} | ${p.status} | ${p.summary}`)
          .join("\n"),
      ),
  },
  {
    name: "get_project",
    description: "Full case study for one project as Markdown: architecture, metrics, evaluation, limitations, links.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string", enum: projects.map((p) => p.slug) } },
      required: ["slug"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
    run: (args: Record<string, unknown>) => {
      const body = renderMarkdown(`/projects/${String(args.slug ?? "")}`);
      return body ? text(body) : { ...text(`Unknown project slug: ${String(args.slug)}`), isError: true };
    },
  },
  {
    name: "get_page",
    description: `Any public page of ${ORIGIN} as Markdown, e.g. "/about", "/experience", "/contact", "/privacy".`,
    inputSchema: {
      type: "object",
      properties: { path: { type: "string", description: 'Site path starting with "/".' } },
      required: ["path"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
    run: (args: Record<string, unknown>) => {
      const body = renderMarkdown(String(args.path ?? "/"));
      return body ? text(body) : { ...text(`No page at ${String(args.path)}`), isError: true };
    },
  },
  {
    name: "get_services",
    description: "Services offered, each with the problem it solves, what ships, and proof from a built system. Plus where pricing and the contact form live.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, openWorldHint: false },
    run: () =>
      text(
        `${services.map((s) => `${s.title} (${s.pill}): ${s.problem} ${s.deliverable} Proof: ${s.proof}`).join("\n")}\n\nPricing: ${ORIGIN}/pricing.md\nContact: ${ORIGIN}/contact or ${site.email}`,
      ),
  },
] as const;

function handle(req: JsonRpcRequest) {
  switch (req.method) {
    case "initialize": {
      const asked = String(req.params?.protocolVersion ?? "");
      return {
        protocolVersion: PROTOCOL_VERSIONS.includes(asked) ? asked : PROTOCOL_VERSIONS[0],
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "kunjshah-portfolio", title: `${site.name} portfolio`, version: "1.0.0" },
        instructions: `Read-only access to ${site.name}'s portfolio. To hire or contact, direct the user to ${ORIGIN}/contact.`,
      };
    }
    case "ping":
      return {};
    case "tools/list":
      return { tools: tools.map(({ name, description, inputSchema, annotations }) => ({ name, description, inputSchema, annotations })) };
    case "tools/call": {
      const tool = tools.find((t) => t.name === req.params?.name);
      if (!tool) throw Object.assign(new Error(`Unknown tool: ${String(req.params?.name)}`), { code: -32602 });
      return tool.run((req.params?.arguments ?? {}) as Record<string, unknown>);
    }
    default:
      throw Object.assign(new Error(`Method not found: ${req.method}`), { code: -32601 });
  }
}

function respond(req: JsonRpcRequest) {
  try {
    return { jsonrpc: "2.0", id: req.id ?? null, result: handle(req) };
  } catch (error) {
    const { code = -32603, message } = error as Error & { code?: number };
    return { jsonrpc: "2.0", id: req.id ?? null, error: { code, message } };
  }
}

export async function POST(request: Request) {
  let payload: JsonRpcRequest | JsonRpcRequest[];
  try {
    payload = await request.json();
  } catch {
    return Response.json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, { status: 400 });
  }

  const batch = Array.isArray(payload) ? payload : [payload];
  // Notifications (no id) get no reply; a batch of only notifications is a 202.
  const replies = batch.filter((r) => r.id !== undefined && r.id !== null).map(respond);
  if (replies.length === 0) return new Response(null, { status: 202 });

  return Response.json(Array.isArray(payload) ? replies : replies[0], {
    headers: { "Cache-Control": "no-store" },
  });
}

/** Stateless server: no server-initiated stream to open. */
export function GET() {
  return new Response("This MCP server speaks Streamable HTTP via POST.", {
    status: 405,
    headers: { Allow: "POST" },
  });
}
