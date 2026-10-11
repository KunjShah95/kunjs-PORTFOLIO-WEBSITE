// Agent-readiness audit: axe-core plus landmark / nav / form / button checks.
// Usage: node scripts/agent-audit.mjs [baseUrl] [axePath]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const axePath = process.argv[3];
const paths = ["/", "/about", "/contact", "/cite", "/education", "/experience", "/privacy", "/terms", "/projects", "/projects/onramp", "/labs", "/open-source", "/hackathons", "/manifesto", "/skills", "/writing"];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const path of paths) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  const report = await page.evaluate(() => {
    const name = (el) =>
      el.getAttribute("aria-label") ||
      (el.getAttribute("aria-labelledby") && document.getElementById(el.getAttribute("aria-labelledby"))?.textContent?.trim()) ||
      el.textContent?.trim().replace(/\s+/g, " ").slice(0, 40) || "";
    const landmarks = {
      header: document.querySelectorAll("header, [role=banner]").length,
      main: document.querySelectorAll("main, [role=main]").length,
      footer: document.querySelectorAll("footer, [role=contentinfo]").length,
      navs: [...document.querySelectorAll("nav, [role=navigation]")].map((n) => ({
        label: n.getAttribute("aria-label"),
        list: !!n.querySelector("ul, ol"),
        links: n.querySelectorAll("a").length,
      })),
      sectionsUnlabelled: [...document.querySelectorAll("main section")].filter(
        (s) => !s.getAttribute("aria-label") && !s.getAttribute("aria-labelledby"),
      ).length,
      sections: document.querySelectorAll("main section").length,
      h1: document.querySelectorAll("h1").length,
    };
    const linksOutsideNav = [...document.querySelectorAll("header a, footer a")].filter((a) => !a.closest("nav")).map(name);
    const unnamedButtons = [...document.querySelectorAll("button, [role=button]")].filter((b) => !name(b)).map((b) => b.outerHTML.slice(0, 100));
    const fields = [...document.querySelectorAll("input, textarea, select")]
      .filter((f) => f.type !== "hidden")
      .map((f) => ({
        name: f.name, type: f.type, id: f.id,
        label: !!(f.labels?.length || f.getAttribute("aria-label")),
        required: f.required, autocomplete: f.getAttribute("autocomplete"),
        describedby: f.getAttribute("aria-describedby"),
      }));
    const forms = [...document.querySelectorAll("form")].map((f) => ({
      name: f.getAttribute("aria-label") || f.getAttribute("name"),
      toolname: f.getAttribute("toolname"),
      submit: [...f.querySelectorAll("button[type=submit], button:not([type]), input[type=submit]")].map(name),
    }));
    return { landmarks, linksOutsideNav, unnamedButtons, fields, forms };
  });
  if (axePath) await page.addScriptTag({ path: axePath });
  const axe = axePath
    ? await page.evaluate(async () =>
        (await window.axe.run(document, { resultTypes: ["violations"] })).violations.map(
          (v) => `${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(" | ")}`,
        ),
      )
    : [];
  console.log(`\n=== ${path}`);
  console.log(JSON.stringify({ ...report, axe }, null, 1));
}
await browser.close();
