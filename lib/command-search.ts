import type { IconName } from "@/components/icon";

/**
 * Command search for the ⌘K palette: the types and the scorer, with no data.
 *
 * Split from `lib/commands.ts` so the palette's client bundle does not pull in
 * the data the commands are built from. `lib/commands.ts` imports `lib/essays`
 * and `lib/site-data`, which carry every essay body and case study, and that
 * made the lazily loaded palette chunk ~118 KB compressed, downloaded on every
 * page load. The palette now fetches the built command list from
 * `/api/commands` (a static file) when it loads, and searches it with this.
 *
 * Ranking is a small hand-rolled scorer rather than a fuzzy-match dependency.
 * The corpus is a few dozen short strings, so a subsequence match over
 * word-initial characters is both faster and more predictable than
 * Levenshtein: it rewards "pjs" -> "Projects" without the noise that
 * edit-distance matching introduces on words this short.
 */

export type CommandGroup = "Navigate" | "Work" | "Writing" | "Actions" | "Legal";

export type Command = {
  id: string;
  label: string;
  /** Secondary line: a description, a date, or a hint. */
  detail?: string;
  group: CommandGroup;
  href?: string;
  /** External links open in a new tab. */
  external?: boolean;
  /** Keywords that match but do not appear in the label. */
  keywords?: string;
  icon?: IconName;
};

/**
 * Score a command against a lowercased query. Higher is better; `null` means
 * no match at all.
 *
 * Three passes, each stronger than the next:
 *   1. label starts with the query        -> 100
 *   2. label contains the query           ->  60
 *   3. keywords / detail contain it       ->  25
 * A subsequence match over word initials gets 40, which is what makes
 * "pjs" resolve to "Projects" and "cv" to "Resume".
 */
export function scoreCommand(command: Command, query: string): number | null {
  if (!query) return 0;

  const label = command.label.toLowerCase();
  const haystack = `${command.detail ?? ""} ${command.keywords ?? ""}`.toLowerCase();

  if (label.startsWith(query)) return 100;
  if (label.includes(query)) return 60;
  if (haystack.includes(query)) return 25;
  if (matchesInitials(label, query)) return 40;

  return null;
}

/** `pjs` matches "projects"; `cv` matches "resume" only via keywords. */
function matchesInitials(label: string, query: string): boolean {
  if (query.length < 2) return false;
  let i = 0;
  for (const char of label) {
    if (char === " " || char === "-") {
      i = 0;
      continue;
    }
    if (char === query[i]) i += 1;
    if (i === query.length) return true;
  }
  return false;
}

/** Filter and order the corpus for a query. */
export function searchCommands(
  commands: readonly Command[],
  query: string,
  limit = 12,
): Command[] {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    // Empty query: show the navigation spine so the palette is never blank.
    return commands.filter((c) => c.group === "Navigate").slice(0, limit);
  }

  return commands
    .map((command) => ({ command, score: scoreCommand(command, trimmed) }))
    .filter((entry): entry is { command: Command; score: number } => entry.score !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.command);
}
