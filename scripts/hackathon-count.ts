/**
 * Count hackathon entries and placements, so the copy and the data agree.
 *
 * Run with: npx tsx scripts/hackathon-count.ts
 */
import { hackathons } from "../lib/site-data";

const finalists = hackathons.filter((h) => h.placement === "Finalist");
const participants = hackathons.filter((h) => h.placement !== "Finalist");

console.log(`total entries: ${hackathons.length}`);
console.log(`finalist entries: ${finalists.length}`);
console.log(`participant entries: ${participants.length}`);
console.log("\nfinalists:");
for (const h of finalists) console.log(`  ${h.event} (${h.year}) team=${h.team}`);

console.log("\nby year:");
const years = new Map<number, number>();
for (const h of hackathons) years.set(h.year, (years.get(h.year) ?? 0) + 1);
for (const [year, count] of Array.from(years.entries()).sort()) console.log(`  ${year}: ${count}`);
