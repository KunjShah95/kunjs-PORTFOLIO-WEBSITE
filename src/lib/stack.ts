import 'server-only'

import {
  getLab,
  getNotes,
  getProjects,
  getStack,
  STACK_CATEGORY_BLURB,
  STACK_CATEGORY_ORDER,
} from './content'
import type { TechMapGroup, TechMapItem } from '@/components/stack/TechMap'

/** Resolves the technology map into renderable groups, with titles looked
 *  up so the detail panel can name real projects rather than slugs. */
export function buildStackGroups(): TechMapGroup[] {
  const projects = getProjects()
  const lab = getLab()

  const projectTitles: Record<string, string> = {}
  for (const p of projects) projectTitles[p.slug] = p.title

  const labTitles: Record<string, string> = {}
  for (const l of lab) labTitles[l.slug] = l.title

  const grouped = new Map<string, TechMapItem[]>()
  for (const entry of getStack()) {
    if (!entry.projects.length && !(entry.lab?.length ?? 0)) continue
    const item: TechMapItem = {
      ...entry,
      projectTitles,
      labTitles,
      weight: entry.projects.length * 2 + (entry.lab?.length ?? 0),
    }
    const list = grouped.get(entry.category) ?? []
    list.push(item)
    grouped.set(entry.category, list)
  }

  return STACK_CATEGORY_ORDER.filter((c) => grouped.has(c)).map((category) => ({
    category,
    blurb: STACK_CATEGORY_BLURB[category] ?? '',
    items: (grouped.get(category) ?? []).sort(
      (a, b) => b.weight - a.weight || a.tech.localeCompare(b.tech),
    ),
  }))
}

/** Counts used in the stack page header. */
export function stackStats() {
  const stack = getStack()
  return {
    technologies: stack.filter((e) => e.projects.length > 0).length,
    all: stack.length,
    projects: getProjects().length,
    notes: getNotes().length,
  }
}
