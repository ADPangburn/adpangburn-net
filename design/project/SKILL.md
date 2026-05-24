---
name: pangburn-design
description: Use this skill to generate well-branded interfaces and assets for Aaron Pangburn's personal engineering blog — HITL multi-agent orchestration written from inside the regulated enterprise stack. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping posts, social cards, YouTube thumbnails, and site UI.
user-invocable: true
---

# pangburn-design

Direction: **Terminal — Linear's discipline meets a developer's CLI.** Near-black
surfaces, neutral-gray text, single red accent, IBM Plex Sans + IBM Plex Mono, the
brand glyph is a blinking red block cursor.

## Start here

1. **Read `README.md`** — full visual + content foundations, voice rules, color, type,
   spacing, iconography. The voice rules matter as much as the visual ones.
2. **Pull tokens from `colors_and_type.css`** — link it from your HTML (or copy
   variables inline for a single-file artifact).
3. **Lift components from `ui_kits/site/`** — Header, PostListItem, PostView, etc.
   These are JSX recreations of the actual site UI.
4. **Use the wordmark + favicon SVGs from `assets/`** rather than redrawing them.

## Working modes

**Visual artifacts (slides, mocks, throwaway prototypes):**
- Copy `assets/wordmark.svg` / `assets/mark.svg` / `assets/favicon.svg` and the fonts
  (via Google Fonts `@import`).
- Write static HTML or React; link `colors_and_type.css`.
- Stay in the dark / dense / type-first register. No gradients, no rounded card
  stacks, no SaaS pastels.

**Production code (Next.js + Tailwind + MDX, Cloudflare Pages target):**
- Read all of README.md — especially CONTENT FUNDAMENTALS (voice, casing, no emoji,
  compliance-aware framing) and VISUAL FOUNDATIONS (color rules, hover/press/focus,
  motion budget, MDX primitives).
- Lift CSS variables into your Tailwind config as theme tokens.
- Match the UI kit's component patterns rather than re-deriving them — especially the
  Callout, Code Block, Post List Item, and Header prompt bar.

## If the user invokes this skill with no other context

Ask what they want to build: a post layout? a social card? a YouTube thumbnail? a new
section of the site? a Linear-style internal tool? Then ask:

1. Is this for the site, a social platform, or something else?
2. Do they have a post title / topic to anchor the design?
3. Are they OK with the substitute fonts (IBM Plex Sans + IBM Plex Mono), or do they
   want to swap in Berkeley Mono / Commit Mono / something else?
4. Headshot — do they have one yet, or use the placeholder?

Then act as an expert designer who outputs HTML artifacts or production code,
depending on the need. Default to **HTML artifacts** unless asked otherwise.

## Voice rule of thumb

If you'd write it in a Slack DM to a smart senior colleague who has read your code,
it's on-brand. If it sounds like a marketing landing page, a research paper abstract,
or a LinkedIn humblebrag, rewrite it.

Specific over abstract. Operational over theoretical. Audit-aware. Compliance reads
your sentences on Tuesdays.
