import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3001";
const OUT = "tmp-shots";
mkdirSync(OUT, { recursive: true });

const shots = [
  { name: "home-desktop", path: "/", width: 1440, height: 1000, full: true },
  { name: "home-mobile", path: "/", width: 390, height: 844, full: true },
  { name: "about-desktop", path: "/about", width: 1440, height: 1000, full: true },
  { name: "contact-desktop", path: "/contact", width: 1440, height: 1000, full: true },
  { name: "education-desktop", path: "/education", width: 1440, height: 1000, full: false },
];

const browser = await chromium.launch();
for (const shot of shots) {
  const page = await browser.newPage({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(BASE + shot.path, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/${shot.name}.png`, fullPage: shot.full });
  console.log(`${shot.name}: ${errors.length ? "ERRORS " + errors.join(" | ") : "clean"}`);
  await page.close();
}
await browser.close();
