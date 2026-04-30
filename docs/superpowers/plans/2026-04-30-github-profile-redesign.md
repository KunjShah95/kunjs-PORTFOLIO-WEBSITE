# GitHubProfile Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the GitHubProfile component with a hybrid compact layout - consolidating cards into fewer cohesive sections with horizontal repo carousel.

**Architecture:** Three-tier vertical stack: (1) unified profile summary card with stats + quick facts, (2) side-by-side heatmap + language bar, (3) horizontal scrollable repo carousel.

**Tech Stack:** React, Framer Motion, TypeScript, Tailwind CSS

---

## File Structure

- Modify: `src/components/GitHubProfile.tsx` - entire component redesign

---

## Task 1: Restructure Section Header

**Files:**
- Modify: `src/components/GitHubProfile.tsx:426-472`

- [ ] **Step 1: Keep header minimal**

The existing header code (lines 435-472) is already minimal with just the title, refresh button, and GitHub link. No changes needed - verify it matches the spec.

- [ ] **Step 2: Commit**

```bash
git add src/components/GitHubProfile.tsx
git commit -m "refactor: keep header minimal per spec"
```

---

## Task 2: Create Unified Profile Summary Card

**Files:**
- Modify: `src/components/GitHubProfile.tsx:474-482`

- [ ] **Step 1: Replace StatCard grid with unified card**

Replace the existing 4-column StatCard grid with a single unified card that contains both the stats and quick facts:

```tsx
{user && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-surface border border-border rounded-lg p-6"
  >
    {/* Stats row */}
    <div className="grid grid-cols-4 gap-4 mb-6">
      <StatCardMinimal icon={BookOpen} label="Repos" value={user.public_repos} />
      <StatCardMinimal icon={Users} label="Followers" value={user.followers} />
      <StatCardMinimal icon={Star} label="Stars" value={totalStars} />
      <StatCardMinimal icon={GitFork} label="Following" value={user.following} />
    </div>
    
    {/* Quick facts row */}
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
      <div className="flex items-center gap-2 text-muted">
        <Calendar className="w-3.5 h-3.5" />
        <span>Member since {new Date(user.created_at).getFullYear()}</span>
      </div>
      {user.location && (
        <div className="flex items-center gap-2 text-muted">
          <Globe className="w-3.5 h-3.5" />
          <span>{user.location}</span>
        </div>
      )}
      {user.blog && (
        <a
          href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="truncate max-w-[200px]">{user.blog.replace(/^https?:\/\//, '')}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  </motion.div>
)}
```

- [ ] **Step 2: Add StatCardMinimal component**

Add a simplified stat card component after the existing StatCard (around line 183):

```tsx
function StatCardMinimal({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: number
}) {
  const animated = useCountUp(value)
  
  return (
    <div className="flex items-center gap-3 p-3 bg-surfaceHighlight/50 rounded-lg">
      <div className="p-1.5 bg-primary/10 rounded">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <div className="text-lg font-bold text-txt font-mono tabular-nums">{animated}</div>
        <div className="text-[10px] text-muted uppercase tracking-wide">{label}</div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/GitHubProfile.tsx
git commit -m "feat: add unified profile summary card with stats and quick facts"
```

---

## Task 3: Two-Column Layout for Heatmap and Languages

**Files:**
- Modify: `src/components/GitHubProfile.tsx:604-663`

- [ ] **Step 1: Convert grid to two-column layout**

Replace the existing grid (lines 604-663) with a two-column layout:

```tsx
<div className="grid md:grid-cols-5 gap-6">
  {/* Contribution Heatmap - 3 cols */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="md:col-span-3 bg-surface border border-border rounded-lg p-6 space-y-4"
  >
    {/* ... existing heatmap content ... */}
  </motion.div>

  {/* Language Distribution - 2 cols */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.15 }}
    className="md:col-span-2 bg-surface border border-border rounded-lg p-6 space-y-4"
  >
    {/* LanguageBar content moved here */}
  </motion.div>
</div>
```

- [ ] **Step 2: Move LanguageBar into the right column**

Take the LanguageBar component output and embed it directly in the right column instead of as a separate component.

- [ ] **Step 3: Commit**

```bash
git add src/components/GitHubProfile.tsx
git commit -m "feat: add two-column layout for heatmap and languages"
```

---

## Task 4: Horizontal Scrollable Repository Carousel

**Files:**
- Modify: `src/components/GitHubProfile.tsx:665-695`

- [ ] **Step 1: Convert repo grid to horizontal scroll**

Replace the existing 4-column grid with a horizontal scrollable carousel:

```tsx
<div className="space-y-5">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <GitBranch className="w-4 h-4 text-primary" />
      <h3 className="text-base font-bold text-txt">Recent Repositories</h3>
    </div>
    <a
      href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-muted hover:text-primary transition-colors flex items-center gap-1"
    >
      View all
      <ExternalLink className="w-3 h-3" />
    </a>
  </div>

  {repos.length > 0 ? (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
      {repos.map((repo, i) => (
        <motion.a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className="flex-shrink-0 w-[280px] group flex flex-col gap-3 p-5 bg-surface border border-border rounded-lg hover:border-primary/30 hover:shadow-md transition-all duration-300"
        >
          {/* ... existing RepoCard content ... */}
        </motion.a>
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center py-12 text-sm text-muted">
      <Loader2 className="w-4 h-4 animate-spin mr-2" />
      Loading repositories…
    </div>
  )}
</div>
```

- [ ] **Step 2: Add horizontal scroll styling**

Ensure the scrollbar styling is consistent with the theme. The scrollbar-thin class should work with existing CSS.

- [ ] **Step 3: Commit**

```bash
git add src/components/GitHubProfile.tsx
git commit -m "feat: add horizontal scrollable repo carousel"
```

---

## Task 5: Verify and Test

**Files:**
- Modify: `src/components/GitHubProfile.tsx`

- [ ] **Step 1: Build the project**

```bash
npm run build
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npm run typecheck
```

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

- [ ] **Step 4: Commit final changes**

```bash
git add src/components/GitHubProfile.tsx
git commit -m "feat: complete GitHubProfile redesign - hybrid compact layout"
```

---

## Verification Checklist

- [ ] Section header remains minimal
- [ ] Stats and quick facts in unified card
- [ ] Heatmap and language bar side-by-side (2-column on desktop)
- [ ] Repositories in horizontal scroll carousel
- [ ] Responsive: stacks on mobile
- [ ] All existing animations preserved
- [ ] Build passes with no errors