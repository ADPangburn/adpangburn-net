# apangburn.net

Aaron Pangburn's engineering blog — HITL multi-agent orchestration, from the field.

## Stack

- **Next.js 16** (App Router, static export to `./out/`)
- **React 19**
- **Tailwind CSS 4** (`@theme` tokens; see `app/globals.css`)
- **MDX** via `@next/mdx` + `next-mdx-remote/rsc`
- **Cloudflare Pages** for hosting; auto-deploys from `main`

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # produces ./out/ for static hosting
npm run lint
```

## Adding a post

Drop an MDX file in `content/notes/` with frontmatter:

```mdx
---
title: The retry loop is a human-in-the-loop loop
date: 2026-05-23
dek: Optional one-line dek shown in the feed.
tags: [orchestration, hitl]
minutes: 8
---

Post body in MDX. Use `<Callout>`, `<Demo>`, fenced code blocks, etc.
```

Commit and push to `main` — Cloudflare Pages builds and deploys.

## Project layout

- `app/` — App Router pages, layout, robots, sitemap
- `components/` — UI components (Header, Footer, PromptBar, MDX building blocks)
- `lib/` — server-side utilities (post loader)
- `content/notes/` — MDX post sources
- `public/` — static assets (favicon, wordmark, OG template)
- `design/` — locked design system reference; not built
- `tests/` — Playwright specs run against the built `./out/`
