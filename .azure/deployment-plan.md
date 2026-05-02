# Deployment Plan: Portfolio Website

## Status: PLANNED

## Overview

| Field | Value |
|-------|-------|
| **Name** | Kunj Shah Portfolio |
| **Type** | Static React + Vite SPA |
| **Current Host** | Vercel |
| **Target** | Cloudflare Pages |
| **Recipe** | Cloudflare Pages + Markdown for Agents |

## Goal

Enable **Markdown for Agents** — AI agents requesting with `Accept: text/markdown` header receive Markdown instead of HTML.

## Why Cloudflare Pages?

- Markdown for Agents available on Pro/Business plans
- Built-in CDN + SSL
- SPA routing support
- Easy migration from Vercel

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
Browser → Cloudflare → Cloudflare Pages → Static files from dist/
```

## Implementation Steps

### Step 1: Deploy to Cloudflare Pages
- [ ] Connect repo to Cloudflare Pages
- [ ] Configure build: `npm run build` → `dist/`
- [ ] Add `_headers` for SPA routing (or use `_workerRoutes`)

### Step 2: Configure Domain
- [ ] Add custom domain in Cloudflare dashboard
- [ ] Update DNS to point to Cloudflare

### Step 3: Enable Markdown for Agents
- [ ] Upgrade to Pro/Business plan (required)
- [ ] Enable "Markdown for Agents" in dashboard → AI Crawl Control
- [ ] Or use API:
```bash
curl -X PATCH 'https://api.cloudflare.com/client/v4/zones/{zone_tag}/settings/content_converter' \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer {api_token}" \
  --data '{"value": "on"}'
```

### Step 4: Verify
- [ ] Test: `curl -H "Accept: text/markdown" https://yoursite.com`
- [ ] Verify `content-type: text/markdown`
- [ ] Check `x-markdown-tokens` header

## Rollback Plan

Keep Vercel deployment active during migration.

---

## Cloudflare Pages SPA Config

Create `public/_headers`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

Create `public/_routes.json` for SPA routing:

```json
{
  "version": 1,
  "index": "index.html",
  "error_pages": {
    "404": "index.html"
  },
  "routes": [
    { "pattern": "/", "frontend": {} },
    { "pattern": "/*", "frontend": {} }
  ]
}
```

Or use Cloudflare dashboard → Pages → Custom CRLs.