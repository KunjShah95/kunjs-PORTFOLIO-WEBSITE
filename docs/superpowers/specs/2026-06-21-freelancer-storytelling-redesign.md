# Freelancer Storytelling Redesign

**Date:** 2026-06-21
**Status:** Draft
**Goal:** Reposition portfolio from "AI engineer" to "freelancer who ships anything" — attract more client inquiries

## Narrative

> "I ship the things you need built. AI agents, web apps, APIs, prototypes — you describe it, I build it."

Combines two angles:
- **Broad**: "I ship anything digital" (websites, backends, prototypes, automation)
- **Specialist**: "Especially AI agents and production systems for founders"

## Visual Direction

- **Dark theme** (Manu Arora / Aceternity UI style)
- Aceternity components already in codebase: BackgroundBeams, GradientOrb, BentoGrid, BentoCard, FloatingDock, Sparkles, TracingBeam, TextReveal
- Dark palette: deep bg (#0a0a0a or similar), light text, accent (#D94E20) for highlights
- Keep existing Tailwind CSS custom properties, add dark variants

## Homepage Layout (Top to Bottom)

### 1. Hero
- Full-viewport dark section with BackgroundBeams + GradientOrb
- Headline: *"I ship the things you need built."*
- Subheadline: *"AI agents, web apps, APIs, prototypes — you describe it, I build it. Whiteboard to production in weeks, not quarters."*
- Status bar: "Available for hire / Ahmedabad"
- Two CTAs: "See what I've built" (to projects) + "Start a conversation" (to contact)
- Portrait (DevFest photo) in a compact bento card on the right
- Motion fade-in (not TextReveal — reads faster)

### 2. What I Ship (Services)
- Dark BentoGrid, 2x2
- Cards: AI Agents & Automations | Web Apps & APIs | Prototypes & MVPs | Infra & Backend
- Each: Lucide icon, title, one-liner, hover glow
- No pricing — just scope

### 3. How I Work (Process)
- 3-step horizontal bento strip with connecting line
- Step 1: You tell me what you need (brief, scope, timeline)
- Step 2: I build it (no overhead, no meetings, just ship)
- Step 3: You get a working system (deployed, documented, handed off)

### 4. Ships (Projects / Proof)
- BentoGrid of recent work (reframed as client proof)
- Stats strip above: ★ X stars · Y hackathon finals · Z things shipped in 2026
- Hero card (2 cols): biggest win with impact metric
- Supporting cards (2): more projects with key numbers

### 5. Proof Bar (Social Proof)
- Left: big number ("12 things shipped") + brief line
- Right: hackathon logos/names with placement badges + total GitHub stars
- No contribution heatmap — too noisy

### 6. Final CTA
- Existing dark section with BackgroundBeams + GradientOrb
- Headline: *"Have something to ship?" → "Describe it to me. I'll build it."*
- Buttons: "Start a conversation" + email link
- Same dark background

### 7. Footer
- Simplified: copyright + social links in a centered bento strip
- No "That's the whole site" quote block (too long, distracts from CTA)

## Subpages

- **About**: Storytelling bio — "I'm 21, fourth-year CS. I started building because..." — personal narrative
- **Projects**: Reframed with services context — "Here's proof I can ship what you need"
- **Contact**: Simple form + email + social — minimal friction
- **Blog**: Keep as-is (writing already positions you as knowledgeable)
- **Skills**: Keep as-is or integrate into About

## Technical Changes Required

1. **Dark theme tokens**: New CSS custom properties for dark palette
2. **Homepage restructuring**: New sections (Services, Process, Proof Bar)
3. **Hero rewrite**: New copy, compact portrait layout
4. **FeaturedProjects → Ships**: Reframe as proof, add stats strip
5. **Footer simplification**: Remove quote block
6. **Remove heatmap**: From GitHubProfile section
7. **Navbar/FloatingDock**: Keep as-is

## Out of Scope

- Pricing/packages page (add later with real data)
- Client testimonials section (add when available)
- Blog post about freelance journey
- Booking/calendar integration
