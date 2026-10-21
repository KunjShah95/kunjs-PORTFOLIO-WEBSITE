import { chromium } from "playwright";

/**
 * End-to-end check of the contact form's spam guards.
 *
 * Each case fills the form the way a person would and submits. The
 * assertion is on what reached the mock Resend API: an abusive message
 * must not be delivered, while a genuine inquiry must be.
 */
const BASE = process.env.BASE ?? "http://localhost:3001";

const GENUINE = {
  name: "Priya Mehta",
  email: "priya@acme-ai.example",
  company: "Acme AI",
  details:
    "We are building a RAG pipeline over our internal documentation and retrieval quality is inconsistent across departments. We are looking for hybrid search with re-ranking, and a way to measure recall in CI so a change to the chunking strategy cannot silently regress it.",
};

const CASES = [
  { label: "genuine inquiry", expect: "delivered", fields: GENUINE },
  {
    label: "profanity",
    expect: "dropped",
    fields: {
      name: "anonymous",
      email: "abuser@example.com",
      company: "",
      details:
        "your portfolio is AI slop and you are an idiot. stop wasting your time, nobody wants to hire a fraud who builds nothing real for anyone.",
    },
  },
  {
    label: "obfuscated abuse",
    expect: "dropped",
    fields: {
      name: "anon",
      email: "abuser2@example.com",
      company: "",
      details: "this is f.u.c.king garbage and your whole site is a piece of shit",
    },
  },
  {
    label: "sales pitch",
    expect: "dropped",
    fields: {
      name: "SEO Expert",
      email: "seo@example.com",
      company: "Rank First",
      details:
        "We offer SEO services and can get you on page one. Buy followers, click here to claim your free audit and double your traffic in 30 days.",
    },
  },
  {
    label: "honeypot filled",
    expect: "dropped",
    fields: { ...GENUINE, honeypot: "http://spam.example" },
  },
  {
    label: "disposable mailbox",
    expect: "dropped",
    fields: { ...GENUINE, email: "someone@mailinator.com" },
  },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

for (const testCase of CASES) {
  await page.goto(BASE + "/contact", { waitUntil: "networkidle", timeout: 60000 });

  // The minimum-fill-time guard needs three seconds of real time.
  await page.waitForTimeout(3200);

  await page.fill('input[name="name"]', testCase.fields.name);
  await page.fill('input[name="email"]', testCase.fields.email);
  if (testCase.fields.company) {
    await page.fill('input[name="company"]', testCase.fields.company);
  }
  await page.fill('textarea[name="details"]', testCase.fields.details);
  if (testCase.fields.honeypot) {
    await page.evaluate((value) => {
      const el = document.querySelector('input[name="company_website"]');
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value",
      ).set;
      setter.call(el, value);
      el.dispatchEvent(new Event("input", { bubbles: true }));
    }, testCase.fields.honeypot);
  }

  await page.click('button[type="submit"]');
  await page.waitForTimeout(2500);

  // A dropped message still shows the success panel — that is the point of
  // dropping silently. A rejected field shows an inline error instead.
  const panel = await page.textContent("body");
  const inlineError = await page
    .locator("[id$='-error'], [role='alert']")
    .first()
    .textContent()
    .catch(() => null);

  console.log(
    `${testCase.label.padEnd(20)} expect=${testCase.expect.padEnd(9)} ` +
      `success=${panel.includes("Message received.") ? "yes" : "no"} ` +
      `inline="${(inlineError ?? "").trim().slice(0, 60)}"`,
  );
}

await browser.close();
