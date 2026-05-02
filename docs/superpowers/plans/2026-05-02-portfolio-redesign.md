# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign portfolio to fix conversion issues, transform projects to case studies, improve mobile UX, apply European aesthetic (monochrome + deep blue)

**Architecture:** Replace hero and projects components with case study format. Apply new color palette. Full responsive overhaul. Keep existing React/Tailwind/Framer Motion stack.

**Tech Stack:** React, Tailwind CSS, Framer Motion, TypeScript

---

## Task 1: Update Color Palette in Tailwind Config

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: Update color palette**

```javascript
// tailwind.config.js - Update colors
colors: {
  primary: '#1A3A5C', // Deep Blue
  // Keep existing: bg, surface, txt, muted, border
}
```

- [ ] **Step 2: Run build to verify**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.js
git commit -m "feat: add deep blue to color palette"
```

---

## Task 2: Redesign Hero Section (European Minimal)

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Rewrite Hero with European minimal style**

Replace current Hero with simplified version:
- Remove heavy gradients
- Add clear positioning statement
- Deep blue CTA buttons
- Minimal dot grid texture only

```tsx
// Key changes:
// - Remove gradient backgrounds (lines 19-23)
// - Update CTA button: bg-primary (now deep blue)
// - Add positioning statement: "Building autonomous AI systems that deliver measurable business outcomes"
// - Simplified layout with emphasis on whitespace
```

- [ ] **Step 2: Test in browser**

Run: `npm run dev`
Verify: Hero displays correctly with new styling

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: redesign hero with european minimal style"
```

---

## Task 3: Restructure Projects to Case Study Format

**Files:**
- Modify: `src/components/Projects.tsx`
- Modify: `src/data/portfolio.ts` (project data)

- [ ] **Step 1: Add case study structure to Projects component**

Add Problem/Solution/Architecture/Results sections to each project card:

```tsx
// New project card structure:
<div className="project-card">
  <div className="problem"> {/* Problem section */} </div>
  <div className="solution"> {/* Solution section */} </div>
  <div className="architecture"> {/* Architecture diagram placeholder */} </div>
  <div className="results"> {/* Metrics */} </div>
</div>
```

- [ ] **Step 2: Add metrics to portfolio.ts**

Ensure each project has: problem, outcome/metrics fields populated

```typescript
// Example for EquityLens:
{
  id: '10',
  title: 'EquityLens',
  problem: 'Healthcare AI deployed with zero bias auditing — EU AI Act violation',
  solution: 'Built fairness evaluation pipeline with EU AI Act, NIST RMF compliance',
  architecture: 'Multi-layer: Data → Metrics → Visualization → Compliance',
  results: { gap: '23%', timeReduction: '99%', uptime: '99.9%' },
  demo: 'https://fairness-lens-backend-988207147245.us-central1.run.app/'
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.tsx src/data/portfolio.ts
git commit -m "feat: restructure projects to case study format"
```

---

## Task 4: Elevate EquityLens as Flagship

**Files:**
- Modify: `src/components/Projects.tsx`
- Modify: `src/components/FeaturedProjects.tsx` (if exists)

- [ ] **Step 1: Add flagship styling to EquityLens**

```tsx
// Add special styling:
// - Larger card size
// - Architecture diagram section
// - Metrics badges prominently displayed
// - EU AI Act compliance badge
// - Live demo link emphasized
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: add EquityLens as flagship project"
```

---

## Task 5: Mobile UX Overhaul

**Files:**
- Modify: `src/components/Projects.tsx`
- Modify: `src/components/Layout.tsx` (if needed for sticky CTA)
- Modify: `src/index.css` (mobile typography)

- [ ] **Step 1: Implement responsive grid**

```css
/* src/index.css or inline classes */
/* Desktop: 2-3 columns */
/* Tablet: 2 columns */
/* Mobile: 1 column */
```

- [ ] **Step 2: Add sticky mobile CTA**

Add bottom sticky bar on mobile for key CTAs:

```tsx
// In Projects or Layout
<div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 md:hidden flex justify-around">
  <a href="/projects" className="btn-primary">View Projects</a>
  <a href="/contact" className="btn-secondary">Let's Talk</a>
</div>
```

- [ ] **Step 3: Fix mobile typography**

Ensure body text minimum 16px, appropriate line-height

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.tsx src/components/Layout.tsx src/index.css
git commit -m "feat: implement mobile UX overhaul"
```

---

## Task 6: Polish & Verify

**Files:**
- All modified files

- [ ] **Step 1: Run full build**

Run: `npm run build`
Expected: No errors

- [ ] **Step 2: Test responsive**

Manual: Resize browser, verify mobile layout works

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "feat: complete portfolio redesign - european style, case studies, mobile UX"
```

---

## Execution Options

**Plan complete and saved to `docs/superpowers/plans/2026-05-02-portfolio-redesign.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**