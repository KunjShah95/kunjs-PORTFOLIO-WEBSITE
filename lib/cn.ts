/** Tiny classnames joiner. Keeps conditional Tailwind lists readable. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
