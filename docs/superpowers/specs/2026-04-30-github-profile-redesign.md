# GitHubProfile Component Redesign - Design Spec

## Overview

Redesign the Open Source Activity section (GitHubProfile.tsx) with a hybrid compact layout that consolidates multiple cards into fewer cohesive sections.

## Layout Structure

### Section Header (Minimal)
- "Open Source Activity" label with Activity icon
- "GitHub Profile" title
- Refresh button + GitHub profile link (right-aligned)

### Three-Tier Vertical Stack

**Tier 1: Profile Summary Card**
- Single unified card combining:
  - 4 animated stat counters (repos, followers, stars, following) in horizontal flex row
  - Quick facts inline: member since, location, website
- Replaces separate StatCard components

**Tier 2: Contributions + Languages (Two Columns)**
- Left (65%): Contribution heatmap with year selector dropdown
- Right (35%): Language distribution stacked bar + legend
- Similar visual height for balance

**Tier 3: Repositories Carousel**
- Horizontal scrollable row
- 6-8 repo cards visible in scroll
- Each card: repo name, description (truncated), language dot, stars, forks

## Visual Design

- **Cards**: Consistent padding (p-5 or p-6), rounded-lg borders, uniform hover states
- **Colors**: Theme primary color for accents, consistent surface/border colors
- **Spacing**: 6 gap between card rows, 4-6 gap within cards
- **Animations**: Preserve existing Framer Motion animations for counters and reveals

## Acceptance Criteria

1. Section header remains minimal (no user avatar/name embedded)
2. Stats and quick facts display in a single unified card
3. Heatmap and language bar display side-by-side in two columns
4. Repositories display as horizontal scrollable carousel
5. All existing data fetching and animations preserved
6. Responsive: stacks vertically on mobile (< 768px)

## Scope

- Modify GitHubProfile.tsx only
- No changes to data fetching logic
- Preserve existing API calls and contribution fetching