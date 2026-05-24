# PLAN.md — apangburn.net implementation

This file maps the design system in `./design/` and the spec in `./DESIGN.md` to a concrete Next.js implementation. Read those two first.

> **Status:** Pre-scaffold. No code yet. This document is the contract for what gets built.

---

## Stack lock

- **Next.js 15+** with App Router, TypeScript, static export (`output: 'export'`)
- **Tailwind CSS** with custom theme extending the design-system tokens
- **MDX** for post content via `@next/mdx` + `gray-matter` for frontmatter
- **IBM Plex Sans + IBM Plex Mono + JetBrains Mono** via `next/font/google`
- **Cloudflare Pages** for hosting (DNS already managed via Cloudflare Registrar)
- **No CMS, no database, no API routes** — pure static site
- **Dark mode only** — no toggle, no system-preference detection

## Repo structure (target)

```
adpangburn-net/
├── README.md
├── DESIGN.md                    # the design spec (source of truth for look + voice)
├── PLAN.md                      # this file
├── package.json
├── next.config.ts               # output: 'export'
├── tsconfig.json
├── tailwind.config.ts           # extends with design tokens
├── postcss.config.mjs
├── mdx-components.tsx           # MDX → React component overrides (Pre, Callout, etc.)
│
├── app/
│   ├── layout.tsx               # root layout — Header + Footer + global styles
│   ├── page.tsx                 # home — bio, post list, latest YouTube
│   ├── globals.css              # token-driven CSS variables + Tailwind directives
│   ├── about/
│   │   └── page.tsx
│   ├── archive/
│   │   └── page.tsx
│   ├── notes/
│   │   └── [slug]/
│   │       └── page.tsx         # MDX post renderer
│   ├── not-found.tsx            # 404
│   ├── opengraph-image.tsx      # OG card generator using og-template
│   └── rss.xml/
│       └── route.ts             # RSS feed (one of the few server routes)
│
├── components/
│   ├── Header.tsx               # prompt-bar wordmark + nav
│   ├── Footer.tsx               # one-line mono + red square
│   ├── PostListItem.tsx         # the home/archive row
│   ├── YouTubeStrip.tsx         # latest video on home
│   ├── Callout.tsx              # audit/caveat/tldr/aside
│   ├── CodeBlock.tsx            # pre/code with file-header bar + 2px red rule
│   ├── Demo.tsx                 # inline React demo slot
│   ├── PromptBar.tsx            # the wordmark with blinking cursor
│   └── ui/                      # primitives if needed (Button, Tag, etc.)
│
├── content/
│   └── notes/
│       ├── note_001-building-this-blog.mdx
│       └── (future posts)
│
├── lib/
│   ├── posts.ts                 # reads MDX files at build time
│   ├── rss.ts                   # builds the RSS feed
│   └── utils.ts                 # date formatters, slug helpers
│
├── public/
│   ├── favicon.svg              # copied from design/project/assets/
│   ├── wordmark.svg
│   ├── og-template.svg
│   └── headshot.jpg             # to be supplied by Aaron
│
└── design/                      # full reference design system (read-only)
    └── (all the pangburn-design-system files)
```

---

## Build sequence (ordered, each step shippable)

### Step 1 — Scaffold

```bash
cd /Users/adp/src/adpangburn-net
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint
```

When prompted about the existing `design/`, `DESIGN.md`, `PLAN.md` files, decline to overwrite. The `.` arg installs into the current directory.

**Verify:** `npm run dev` opens a default Next.js page on localhost:3000.

### Step 2 — Tailwind theme + design tokens

Update `tailwind.config.ts` to extend with the tokens from `design/project/colors_and_type.css`. Mapping:

```ts
theme: {
  extend: {
    colors: {
      bg:          { DEFAULT: '#0A0A0A', 2: '#111111' },
      surface:     { DEFAULT: '#171717', 2: '#1F1F1F', 3: '#2A2A2A' },
      fg:          { DEFAULT: '#FAFAFA', 2: '#E4E4E7', 3: '#A1A1AA', 4: '#71717A', 5: '#52525B', 6: '#3F3F46' },
      red:         { DEFAULT: '#EF4444', deep: '#DC2626', soft: 'rgba(239,68,68,0.12)', dim: 'rgba(239,68,68,0.40)' },
      green:       { DEFAULT: '#A3E635', dim: 'rgba(163,230,53,0.20)' },
      amber:       { DEFAULT: '#FCD34D' },
      cyan:        { DEFAULT: '#67E8F9' },
      blue:        { DEFAULT: '#93C5FD' },
      rule:        { DEFAULT: '#1F1F1F', strong: '#2A2A2A', bright: '#3F3F46' },
    },
    fontFamily: {
      sans: ['var(--font-plex-sans)', 'system-ui', 'sans-serif'],
      mono: ['var(--font-plex-mono)', 'JetBrains Mono', 'SF Mono', 'monospace'],
    },
    fontSize: {
      xxs: '11px', xs: '12px', sm: '13px',
      base: '15px', md: '17px', lg: '20px',
      xl: '24px', '2xl': '32px', '3xl': '40px', '4xl': '56px',
    },
    spacing: {
      1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '24px',
      6: '32px', 7: '48px', 8: '64px', 9: '96px', 10: '128px',
    },
    borderRadius: {
      none: '0', sm: '2px', DEFAULT: '4px',
    },
    maxWidth: {
      col: '680px', 'col-wide': '960px',
    },
  },
},
```

Set up `app/globals.css` with the base styles from `colors_and_type.css` translated to Tailwind `@layer base`. Body background = `--bg`, default text = `--fg-2`.

Load fonts via `next/font/google` in `app/layout.tsx`.

**Verify:** localhost:3000 shows the warm near-black background with neutral text. Inspect the page; computed colors match the tokens.

### Step 3 — Header component (the brand glyph)

Build `components/Header.tsx` and `components/PromptBar.tsx`. Mirror the design in `design/project/ui_kits/site/Header.jsx`.

Critical detail: the **block cursor blink** (1.05s, `steps(2, start)`) is what readers will recognize first. Get this right. Respect `prefers-reduced-motion`.

The path segment in the prompt updates based on the current route:
- `/` → `aaron@pangburn:~$▍`
- `/notes/017` → `aaron@pangburn:~/notes/017$▍`

**Verify:** Header renders, cursor blinks at 1.05s, nav items work, active nav has red bottom border.

### Step 4 — Footer + base layout

Build `components/Footer.tsx` — one-line mono with name, year, three links, red square at the end. Reference `design/project/ui_kits/site/Footer.jsx`.

Wire Header + Footer into `app/layout.tsx`. Confirm 880px page chrome width, 680px prose column.

### Step 5 — MDX wiring + post infrastructure

Install MDX dependencies:
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter
npm install --save-dev @types/mdx
```

Configure `next.config.ts` for MDX. Create `mdx-components.tsx` that overrides:
- `pre` → `<CodeBlock>` (file-header bar + 2px red left rule)
- `blockquote` → styled with red left rule, italic
- `code` (inline) → mono, surface bg, hairline border
- Custom components: `<Callout kind="audit|caveat|tldr|aside">`, `<Demo title="...">`

Create `lib/posts.ts`:
```ts
// reads content/notes/*.mdx at build time
// parses frontmatter (title, date, dek, tags, id, draft, youtube)
// returns sorted post list + utilities for individual lookup
```

Frontmatter shape (per post `.mdx`):
```yaml
---
title: "The retry loop is a human-in-the-loop loop"
id: note_001
date: 2026-05-23
dek: "Every retry budget should bottom out in a question to a person."
tags: [hitl, orchestration]
read_time: 8
draft: false
---
```

**Verify:** A test `.mdx` file in `content/notes/` renders at `/notes/[slug]` with all custom MDX components working.

### Step 6 — Home page

Build `app/page.tsx`:
- Small headshot (or placeholder mono `ap` initials in a surface tile, per design)
- 2-3 sentence bio (field-report-honest tone — see voice rules in DESIGN.md)
- YouTubeStrip component (latest video tile) — optional, can ship empty initially
- Post list grouped by year, using `<PostListItem>` for each row
- Section markers like `// recent_notes` and `// 2026`

Reference: `design/project/ui_kits/site/HomeView.jsx` and `design/project/screenshots/home.png`.

**Verify:** Home renders with post list, headshot/placeholder visible, all type/color tokens applied.

### Step 7 — Archive + 404 + About

- **`/archive`** — full post list, optionally with tag filter (defer tag filter to v1.1)
- **404** — uses the `Site Direction Explorations.html` 404 mock as reference; mono terminal-style "command not found"
- **`/about`** — short first-person, sectioned with `// shipping`, `// stack`, `// contact`

### Step 8 — RSS + OpenGraph

- `app/rss.xml/route.ts` — generates RSS feed from `lib/posts.ts`
- `app/opengraph-image.tsx` — dynamic OG card per post using the `og-template.svg` design

### Step 9 — Cloudflare Pages deploy

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "feat: scaffold site from design system"
   git push -u origin main
   ```
2. Cloudflare Dashboard → Workers & Pages → Create Pages project → Connect to Git → select `ADPangburn/adpangburn-net`
3. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out` (Next.js static export default)
4. Save and Deploy. ~2 min build.
5. Add custom domain `apangburn.net` in Pages → Custom Domains. SSL auto-provisions.

**Verify:** `https://apangburn.net` loads the home page over HTTPS.

### Step 10 — First post

Write `content/notes/note_001-building-this-blog.mdx`:

> **"How I built this blog in one weekend with Claude Design + Claude Code."**

Structure (per the design's voice rules):
- Lead with the artifact (you're reading it)
- Show the trace: design prompt, the bundle Claude Design produced, the Next.js scaffold, the deploy
- Use a `<Callout kind="audit">` to acknowledge the design system is AI-augmented but the writing is yours
- Embed code blocks (your `tailwind.config.ts` excerpt, the connector script preview)
- Use a `<Callout kind="tldr">` at the end: "If you want to do the same, here's the path."

Push. Cloudflare auto-deploys. Live within minutes.

---

## Translation notes (design → Tailwind)

| Design system | Tailwind equivalent |
|---|---|
| `var(--bg)` | `bg-bg` |
| `var(--surface)` | `bg-surface` |
| `var(--fg-2)` (body) | `text-fg-2` |
| `var(--red)` accent | `text-red` / `border-red` |
| `var(--font-mono)` | `font-mono` |
| `var(--space-5)` (24px) | `p-5` / `m-5` (24px in our scale) |
| `var(--col)` 680px | `max-w-col` |
| `border-radius: 2px` | `rounded-sm` |
| `border-radius: 4px` (max) | `rounded` |

Reference HTML previews in `design/project/preview/*.html` show the canonical look of each token.

## What ships first (per DESIGN.md, in order)

1. Tailwind config + globals.css ✅ Step 2
2. `<Header>` with prompt-bar wordmark + blink cursor ✅ Step 3
3. `<Footer>` ✅ Step 4
4. `<PostListItem>` + home feed ✅ Step 5–6
5. MDX components (`<Pre>`, `<Callout>`, `<Blockquote>`, `<InlineCode>`, `<Demo>`) ✅ Step 5
6. Post page ✅ Step 5
7. Archive + tag filter ✅ Step 7 (filter deferred to v1.1)
8. 404 + ⌘K command palette ✅ Step 7 (command palette deferred to v1.1)

## Tiered scope (anti-morph discipline)

Each tier is independently shippable. v(N+1) does NOT start until v(N) is live in production.

### v1.0 — site live + first essay (Days 1-7)

- Steps 1-5 (scaffold + Tailwind tokens + Header/Footer + MDX wiring + post page)
- Step 6 (home page with bio + post list)
- Step 7, partial (404 only — defer archive + about to v1.1)
- Step 9 (Cloudflare Pages deploy + custom domain)
- Step 10 (first post: "How I built this blog with Claude Design + Claude Code")

**Time budget: 12-18 hours.** AI-assisted pace.
**Ship deadline: Day 7.**
**Morph signal:** if not live by Day 7, the morph won — ship whatever exists.

### v1.1 — archive, RSS, OG, second essay (Days 8-14)

- Step 7, full (archive page with tag filter, about page)
- Step 8 (RSS feed + OpenGraph image generation)
- Second post

**Time budget: 8-12 hours.**
**Ship deadline: Day 14.**

### v1.2 — command palette, search, third essay (Days 15-21)

- ⌘K command palette (per DESIGN.md "What ships first" list, item 8)
- File-grep search (no backend)
- Third post

**Time budget: 6-10 hours.**
**Ship deadline: Day 21.**

### Total possible spend
- 26-40 hours over 3 weeks, AI-assisted, mixed daytime + evening availability
- 3 essays + full site shipped at end of 3 weeks
- Sustainable cadence afterward: one essay every 4-6 weeks per DESIGN.md

## Deferred indefinitely (never v1.x)

- Newsletter signup
- Dark mode toggle — **never** (dark only, per DESIGN.md)
- Comments — **never**
- Analytics with tracking JS (Cloudflare Web Analytics later — no JS, no banner needed)
- Backend / API routes / dynamic rendering

## The discipline that replaces the time cap

The original 10-hour budget was a proxy for "ship before morph wins." With AI assistance + remote daytime work, the actual cap is **scope completion per tier, not hours spent**. The morph signal is:

- Trying to add tier-2 features to tier 1 (e.g., "let me just add the command palette before launch")
- Tier 1 slipping past Day 7
- Tier 2 starting before tier 1 is in production
- Adding a 4th tier without shipping the previous three first

## Success criteria

- `https://apangburn.net` resolves, loads, looks like the design
- One post is published
- RSS feed exists at `/rss.xml`
- Site passes Lighthouse 95+ on Performance, 100 on Accessibility
- Aaron looks at it and recognizes himself in it

## What's explicitly NOT in scope for v1

- Database
- CMS / admin UI
- Comments
- User auth
- Search backend (file-grep at most)
- Newsletter signup
- Cookie banner (no tracking → none needed)
- Analytics (defer; can add Cloudflare's free analytics later via DNS, no JS)
- Any backend, API route, or dynamic rendering

---

*This plan is derived from `DESIGN.md` and the design system under `./design/`. Both are the source of truth. If this plan and DESIGN.md conflict, DESIGN.md wins.*
