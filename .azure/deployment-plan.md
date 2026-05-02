# Deployment Plan: Portfolio Website
## Status: READY FOR REVIEW

## Overview
| Field | Value |
|-------|-------|
| **Name** | Kunj Shah Portfolio |
| **Type** | Static React + Vite SPA |
| **Current Host** | Vercel |
| **Target** | Azure Static Web Apps |
| **Recipe** | AZD (Azure Developer CLI) |

## Technology Stack
- React 18
- TypeScript
- Vite 5
- Tailwind CSS 3
- Framer Motion 11
- React Router DOM 7
- SPA routing (rewrites all paths to index.html)

## Deployment Configuration
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **SPA routing**: All routes rewrite to /index.html (matches current vercel.json)
- **Static assets**: public/ (images, PDF, manifest, robots.txt, sitemap.xml)

## Architecture
```
Browser → Azure Static Web Apps → CDN edge → Static files from dist/
```

## Why Azure Static Web Apps?
- Free tier available (F1)
- Built-in CDN + SSL
- SPA routing support
- GitHub Actions integration
- Easy to manage alongside Vercel

## Phase 1 Execution
- [x] Step 1: Analyze Workspace — COMPLETE
- [x] Step 2: Gather Requirements — COMPLETE
- [x] Step 3: Scan Codebase — COMPLETE
- [x] Step 4: Select Recipe — COMPLETE (AZD)
- [x] Step 5: Plan Architecture — COMPLETE
- [x] Step 6: Finalize Plan — COMPLETE

## Artifacts to Generate
1. `azure.yaml` — AZD configuration
2. `infra/app.bicep` — Static Web App resource
3. `infra/main.bicep` — Orchestrator with rg + swa
4. `src/<component>/Dockerfile` (optional — Static Web Apps supports no-Docker deploy)

## Rollback Plan
No destructive changes. Keep Vercel deployment active during migration.

---