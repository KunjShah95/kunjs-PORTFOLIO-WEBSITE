import { strict as assert } from "node:assert";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { commands } from "../lib/commands";
import { searchCommands } from "../lib/command-search";

const ROOT = join(import.meta.dirname, "..");

test("search ranks the corpus the palette fetches", () => {
  assert.equal(searchCommands(commands, "proj")[0]?.label, "Projects");
  assert.ok(searchCommands(commands, "serverless").some((c) => c.group === "Writing"));
  assert.ok(searchCommands(commands, "").every((c) => c.group === "Navigate"));
});

test("the palette's client code never imports the command data", () => {
  // lib/commands pulls in every essay body; importing it from the palette put
  // ~118 KB of compressed JavaScript on every page load.
  for (const file of ["components/shell/command-palette.tsx", "lib/command-search.ts"]) {
    const source = readFileSync(join(ROOT, file), "utf8");
    assert.doesNotMatch(source, /from "@\/lib\/(commands|essays|site-data)"/, file);
  }
});

test("the route template never ships the first page invisible", () => {
  // An `initial={{ opacity: 0 }}` on first render hid every page body until
  // hydration: mobile LCP 3.4-4.3s instead of ~1.2s. The fade must stay gated
  // behind the client-navigation flag.
  const source = readFileSync(join(ROOT, "app/template.tsx"), "utf8");
  assert.match(source, /if \(reduce \|\| !animate\) return <>\{children\}<\/>;/);
  assert.match(source, /useState\(\(\) => hasMounted\)/);
});
