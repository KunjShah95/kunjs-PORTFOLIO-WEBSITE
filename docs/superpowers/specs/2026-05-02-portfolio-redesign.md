# Portfolio Redesign Specification

**Date:** 2026-05-02  
**Status:** DESIGN APPROVED  
**Type:** Full Portfolio Redesign

---

## Overview

Redesign portfolio to:
1. Fix conversion issues (bounce rate problem)
2. Transform projects from "assignments" to "real systems" (case study format)
3. Improve mobile UX (62% mobile users)
4. European aesthetic — monochrome + deep blue, minimal, sophisticated

---

## Visual Direction

### Color Palette
| Role | Color |
|------|-------|
| Primary | Deep Blue (#1A3A5C) |
| Background | White (#FFFFFF) / Off-white (#F8F9FA) |
| Surface | Light Gray (#F5F5F5) |
| Text Primary | Near Black (#1A1A1A) |
| Text Secondary | Gray (#6B7280) |
| Border | Light Gray (#E5E7EB) |

### Typography
- **Headlines**: Clean sans-serif (Inter or similar)
- **Body**: readable, generous line-height
- **Hierarchy**: Strong contrast between headline/body/caption

### Style Keywords
- Minimal, functional, trustworthy, substantial
- Less flash, more substance
- European design sensibility — precision, clarity

---

## Component: Hero Section

### Current Problems
- Generic positioning: "AI Engineer building agentic systems & real-world LLM applications"
- Too much noise (gradients, decorative elements)
- No clear value proposition above the fold

### Redesign
1. **Clear positioning statement** — Lead with what you do for clients
2. **Minimal backdrop** — Dot grid as subtle texture, remove heavy gradients
3. **Deep blue CTAs** — "View Projects" and "Let's Talk" in #1A3A5C
4. **Whitespace** — Ample breathing room

### Layout
```
[Positioning Statement]
[Name + Title]
[Value Proposition - 1 line]
[Primary CTA] [Secondary CTA]
[Resume link as subtle text link]
```

### Metrics (if available)
- Consider adding: "X projects delivered" or "X% client retention" badge

---

## Component: Projects Section

### Current Problems
- Projects feel like student assignments, not production systems
- Basic cards: title + description + tech stack + links
- No differentiation between flagship and other projects

### Redesign: Case Study Format

**For ALL projects:**
```
┌─────────────────────────────────────────┐
│ PROBLEM                                │
│ [1-2 sentences: What problem you solved]│
├─────────────────────────────────────────┤
│ SOLUTION                               │
│ [Your approach + tech stack]           │
├─────────────────────────────────────────┤
│ ARCHITECTURE                           │
│ [System flow diagram / "how it works"] │
├─────────────────────────────────────────┤
│ RESULTS                               │
│ [Metrics with numbers]                 │
│ [Demo link if available]                │
└─────────────────────────────────────────┘
```

### EquityLens (Flagship) — Full Case Study

**Problem:**
- Healthcare AI deployed with zero bias auditing — EU AI Act violation
- No transparency into model fairness across demographics

**Solution:**
- Built comprehensive fairness evaluation pipeline
- Integrated EU AI Act, NIST AI RMF, ISO/IEC 25059 compliance
- Real-time drift detection for fairness metrics

**Architecture:**
- Multi-layer system: Data ingestion → Metric computation → Visualization → Compliance layer
- Interactive dashboard for stakeholders

**Results (KEY METRICS):**
- 23% performance gap detected in commercial triage model
- Audit time: 3 weeks → 4 hours (99% reduction)
- 99.9% uptime
- EU AI Act compliance badge

**Demo:**
- Live at: https://fairness-lens-backend-988207147245.us-central1.run.app/

### Other Projects — Streamlined Format
- GAP Miner (3× faster roadmap generation)
- Railway Inspection (98.7% accuracy, sub-100ms latency)
- Sentinel CLI (90% reduction in setup time)
- ResumeMasterAI (70% reduction in screening time)
- LearnAI (2× student engagement)

---

## Component: Mobile UX

### Current Problems (Likely)
- Text-heavy sections
- No clear CTAs on mobile
- Hard navigation
- Poor touch targets

### Redesign: Full Responsive Overhaul

**Grid Layout:**
- Desktop: 2-3 column project grid
- Tablet: 2 columns
- Mobile: 1 column, card-based

**Mobile CTAs:**
- Sticky bottom bar on projects page: "View Projects" / "Let's Talk"
- Large touch targets (minimum 48px)

**Typography:**
- Body text: 16px minimum
- Headlines: scaled appropriately
- Line height: 1.5-1.6 for readability

**Navigation:**
- Hamburger menu with clear labels
- Quick access to key sections

---

## Component: About / Experience

### Keep Current (Working Well)
- Skills section with groups
- Experience timeline
- Education

### Optionally Add
- "What I'm building now" — current focus
- "What I believe about AI" — your direction (Agentic AI)

---

## Implementation Priority

### Phase 1: Hero + Projects Redesign
1. Hero section — European minimal style
2. Projects → case study format
3. EquityLens as flagship

### Phase 2: Mobile UX
1. Responsive grid
2. Mobile CTAs
3. Typography fixes

### Phase 3: Polish
1. Architecture diagrams
2. Metrics badges
3. Fine-tune colors

---

## Success Criteria

- Reduced bounce rate on homepage
- Projects perceived as "real systems" not assignments
- Mobile users can easily navigate to projects
- Clear differentiation: "this candidate is different"

---

## Notes

- Keep existing tech stack (React, Tailwind, Framer Motion)
- Maintain current routing structure
- Preserve existing content, restructure presentation only