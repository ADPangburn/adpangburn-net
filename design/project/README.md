# Pangburn Design System

The visual + content system for **Aaron Pangburn's** personal engineering research blog.
Notes from inside the regulated stack — HITL multi-agent orchestration written from a
practitioner perspective, for engineers building real production AI in places where
"move fast" gets you fired.

Brand voice in one line: **a senior engineer's field notes, with audit logs attached.**

Visual direction in one line: **Linear's discipline meets a developer's terminal.**

---

## What this site is

A long-form engineering blog that doubles as the source for cross-posts on X and
LinkedIn, with a companion YouTube channel where Aaron walks through real commits
(no slides, no script).

The audience is **other engineers building production AI systems**, especially the
ones working inside enterprises where the LLM is one signature on a change ticket
away from a SOC2 finding. The owner explicitly rejected:

- The standard researcher-blog template (white page, serif body, sparse academic
  layout — Karpathy / Hamel / Eugene Yan).
- The indie-hacker SaaS marketing look (gradient hero, "join the waitlist," startup
  energy).
- Gamer-chair edginess (RGB, neon, vaporwave).
- Corporate gloss.

What we built instead is dark, dense, type-disciplined, with a single red accent and
a blinking block cursor as the brand glyph.

## Source repos consulted

The owner attached `ADPangburn/adpangburn-net` (the site repo, currently empty when
this system was built — the design was done from first principles informed by the
owner's other repos and stated preferences).

| Repo | Why it matters here |
|---|---|
| [agentic-orchestrator](https://github.com/ADPangburn/agentic-orchestrator) | "Human-in-the-loop multi-agent orchestration system with full observability." Sets the topic of the blog. |
| `familiar` (private) | "A senior developer in a box for SMBs… learns the business's taste over time." Voice: practical, taste-driven. |
| `orchestrator-dashboard` (private) | "Real-time terminal-style dashboard for agent monitoring." Confirms the terminal aesthetic is true to the work. |
| `adp-claude` (private) | Personal Claude Code config. Confirms developer-first audience. |

Style anchors the owner named (rejected as templates, but useful as negative space):
[offconvex.org](https://www.offconvex.org/), [colah.github.io](https://colah.github.io/),
[jeremykun.com](https://www.jeremykun.com/) — credibility-through-restraint, but
without the academic preciousness.

The locked direction was picked from a three-way exploration (see
`Site Direction Explorations.html`) — **option 02 · Terminal**.

---

## Index of this design system

| File / folder | What's in it |
|---|---|
| `README.md` | This file. Strategy, voice, visual foundations, iconography. |
| `SKILL.md` | Agent-Skills-compatible front matter so this folder works as a portable skill. |
| `colors_and_type.css` | CSS variables — surfaces, fg ramp, red accent, signal palette, type, spacing. |
| `fonts/` | Webfonts (IBM Plex Sans, IBM Plex Mono, JetBrains Mono — all OFL). |
| `assets/` | Wordmark, mark, favicon, OG card template. |
| `preview/` | Cards that populate the **Design System** tab. |
| `ui_kits/site/` | Hi-fi React recreation of the site — Home, Post, About. |
| `Site Direction Explorations.html` | The three-palette comparison that picked this direction. Kept as a decisions artifact. |

> Use `SKILL.md` as the entry point when this folder is loaded as a Claude Skill or
> dropped into another project; use this README when you're building inside this project.

## UI kit

See `ui_kits/site/`. Boots from `ui_kits/site/index.html` and demonstrates three
click-through screens:

1. **Home** — terminal-style prompt-bar wordmark, square avatar with red status dot,
   field-report bio, latest-video strip, post list grouped by year with `note_NNN`
   IDs and `›` markers.
2. **Post** — full layout with mono metadata, sans body, file-header code blocks, red
   2px-left-rule callouts (audit / caveat / tl;dr / aside), share row, prev/next nav.
3. **About** — short first-person about page with sectioned `// shipping`,
   `// stack`, `// contact` blocks.

---

## CONTENT FUNDAMENTALS

### Voice

**First-person, present-tense, declarative.** Specific. Operational. The writer is
doing the work, not reporting on it. Audit-aware.

- ✅ "I rewrote `orchestrator/retry.ts` this weekend. Here's the trace from a real run."
- ✅ "The trick is to make the human visible inside the loop, not adjacent to it."
- ✅ "Compliance reads this table on Tuesdays."
- ❌ "In this article, we will explore the design considerations for…"
- ❌ "Recent advances in agentic systems have shown that…"
- ❌ "Excited to share what I've been working on!"

**"I"** is fine and expected. **"We"** only when literally describing a team. **"You"**
is used in instructions ("you'll want to log the tool input separately").

### Tone

| Dial | Setting |
|---|---|
| Formality | Low-medium. Like writing to a smart senior colleague over Slack DM. |
| Authority | High, but **earned by specificity**, not by stance. Show the trace. |
| Humor | Dry. One-liners welcome. No memes, no exclamation points. |
| Hedging | Minimal. "I don't know yet" beats "perhaps" / "arguably." |
| Selling | None. The post is the artifact. No CTAs above the fold. No "subscribe!" popups. |
| Outsider edge | Mild. The writer is *in* the enterprise, not selling to it. Skeptical of vendor talk. |

### Casing

- **Post titles**: Sentence case. `The retry loop is a human-in-the-loop loop`. Not Title Case.
- **Section headings**: Sentence case for prose `<h2>`. Mono uppercase for site-chrome
  section markers (`// recent_notes`, `// 2026`, `// stack`).
- **Inline code / file paths**: as-typed. Backticks always.
- **Brand names**: as the brand spells them. `OpenAI`, `Claude Code`, `Cloudflare`, not lowercase.
- **No ALL CAPS** in prose. Yes in mono labels.

### Length & shape

- Posts are **as long as they need to be** — 400 words or 6,000.
- Open with the punchline or the artifact. The first line is the thesis.
- Sub-headings are scarce. Three or four max per post.
- TL;DRs are welcome at the end, not the top. Don't tell me the answer before I've earned it.

### Emoji & ornament

**No emoji in body copy, headlines, nav, or UI.** Ever. The brand glyph (the blinking
red block cursor) is the only ornament.

Unicode characters used as glyphs are first-class: `→`, `·`, `›`, `§`, `▍`, `↗`, `⊕`.
Treat them like typography, not decoration. The `›` is the post-row marker. The `▍`
is the brand.

### Examples (model voice)

> **note_017 · 2026·03·12 · 8 min read**
>
> **The retry loop is a human-in-the-loop loop**
>
> I spent the weekend rewriting how `orchestrator/retry.ts` handles tool failures.
> The short version: every retry budget should bottom out in a question to a person,
> not a `RETRY_EXHAUSTED` exception. Here is the trace from a real run — three
> loops, one human, one save.

> **note_016**
>
> What I had to add before any of this was allowed near production. The unglamorous
> list, in order of how often each one came up in review.

> **YouTube companion** (sidebar caption)
>
> *$ walkthrough — actual commit, no slides. 14:22.*

### Cross-posting

- **X**: 1–2 sentence teaser + link. Same voice. Lowercase. Sometimes a snippet of
  the code block as a screenshot.
- **LinkedIn**: 3–5 sentences. Slightly more "what I learned" framing. Audit-aware
  framing plays well here.
- **YouTube**: Title mirrors post title. Description = post TL;DR + chapter markers.
  Thumbnail uses the OG template.

The site is the source of truth. Social posts link back.

### Compliance / regulated-environment notes

When writing about work, **be specific without being attributable**. Use
hypotheticals if needed. Never name a client, employer, vendor decision, or internal
tool by its real internal name. Use roles ("the on-call," "compliance," "the data
team"), not names. When in doubt, fictionalize the stack and keep the lesson.

---

## VISUAL FOUNDATIONS

### The 10-second read

Warm near-black background (`#0A0A0A`). Neutral-gray text in a 6-step ramp. **One**
accent color — red `#EF4444`, used for links, the active nav, the post-ID, the code-block
left rule, callout signals, and the brand cursor. **One** brand glyph — the blinking
red block cursor. Mono dominates the chrome (wordmark, post IDs, metadata, section
markers, code, captions). Sans (IBM Plex Sans) carries the prose. The page reads like
a well-designed CLI — dense, scannable, no fluff.

### Color

| Token | Hex | Used for |
|---|---|---|
| `--bg` | `#0A0A0A` | Page background. Warm near-black, never `#000`. |
| `--bg-2` | `#111111` | Slightly raised — code-block headers, prompt rows. |
| `--surface` | `#171717` | Cards, code blocks, tag backgrounds, callouts. |
| `--surface-2` | `#1F1F1F` | Nested, hover. |
| `--surface-3` | `#2A2A2A` | Pressed. |
| `--fg` | `#FAFAFA` | Primary text. |
| `--fg-2` | `#E4E4E7` | Body prose (slightly dimmed). |
| `--fg-3` | `#A1A1AA` | Secondary text, dim labels. |
| `--fg-4` | `#71717A` | Muted — metadata, captions, mono section heads. |
| `--fg-5` | `#52525B` | Subtle — placeholder, disabled. |
| `--fg-6` | `#3F3F46` | Dim — disabled body. |
| `--red` | `#EF4444` | **The** accent. Used sparingly. |
| `--red-deep` | `#DC2626` | Visited, pressed. |
| `--red-soft` | `rgba(239,68,68,0.12)` | Tint backgrounds, callouts, selection. |
| `--green` | `#A3E635` | Strings in code, `+` diff signals, "shipped" tag. |
| `--amber` | `#FCD34D` | Numbers in code, `~` modified, "caveat" callouts. |
| `--cyan` | `#67E8F9` | Tokens, hashes. |
| `--blue` | `#93C5FD` | Identifiers, secondary code accent. |
| `--rule` | `#1F1F1F` | Hairline between rows. |
| `--rule-strong` | `#2A2A2A` | Visible divider. |
| `--rule-bright` | `#3F3F46` | Prominent divider, focus rings. |

**Rules**:
- Never `#000000` and never `#FFFFFF`. Everything has a slight bias.
- One accent at a time. Don't combine `--red` and `--green` decoratively in the same
  component (they're allowed together in code blocks and diff/log signals, because
  they mean something).
- **No gradients on large surfaces.** Ever. (A diff line with a 12%-alpha tint
  background is not a gradient.)

### Type

A two-family stack:

| Role | Family | Notes |
|---|---|---|
| Body, headings, UI | **IBM Plex Sans** | Distinctive workhorse — slightly squared, fewer humanist curves than Inter. Carries character at all sizes. |
| Code, mono, metadata, prompt, brand mark | **IBM Plex Mono** | First-class. Used for the wordmark, post IDs, section markers (`// recent_notes`), and all code. |

Fallback mono: JetBrains Mono.

Body sets at **15px / 1.55 line-height / max-width 680px**. Dense by design. The owner
is writing for engineers who scan code all day; the body type is calibrated to feel
familiar to them.

**Distinctive treatments**:
- **Post IDs** as `note_017` — mono, semibold, red.
- **Section markers** as `// section_name` — mono, uppercase, dimmed, the `//` slightly dimmer.
- **The prompt bar** — `aaron@pangburn:~$▍` — appears as the site wordmark, in
  social cards, and as a stylistic accent in some headings. The `$` is red. The `▍`
  cursor blinks at 1.05s.
- **Code blocks** carry a file-header bar (filename + language) and a 2px red
  left rule.
- **Callouts** use the same 2px left rule pattern with the rule color signaling type:
  red = audit note / critical, green = tl;dr / ok, amber = caveat, neutral = aside.

See `colors_and_type.css` for the full ramp.

### Spacing

Built on a **4px base unit**. Steps: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.

- Vertical rhythm follows the body line-height (1.55 × 15 = ~23px).
- Content column is **680px wide** for prose; layout chrome is 880px wide.
- Density is intentional — this is a working engineer's page, not a magazine.

### Layout rules

- One column of content, centered. No sidebar.
- No sticky headers. Nav scrolls with the page.
- Footer is one line of mono text — name, year, three links, the brand cursor.
- The site is built mobile-first but never apologizes for being dense on desktop.

### Borders, rules, radii

- **Three rule weights** in dim grays: `--rule` (1F1F1F), `--rule-strong` (2A2A2A),
  `--rule-bright` (3F3F46). Plus the **2px red** for accent rules (callouts, code
  blocks, currently-selected items).
- **Radii**: `--radius-0: 0` (default), `--radius-1: 2px` (inline code only),
  `--radius-2: 4px` (the maximum, for buttons and inputs). **No pills. No fully
  rounded cards.** The aesthetic is terminal, not chip-bar.

### Shadows & elevation

There is **one** shadow and you probably won't use it:

```
--shadow-overlay: 0 0 0 1px var(--rule-bright), 0 24px 48px -16px rgba(0,0,0,0.6);
```

For dialogs and dropdowns only. **Depth comes from borders**, not shadows.

### Backgrounds & imagery

- The page background is solid `--bg` (#0A0A0A). No textures, no noise, no patterns,
  no gradients.
- Optional very subtle scanlines on the YouTube thumbnail placeholder, at <2% alpha,
  to evoke CRT — but only there, not on the page.
- **Imagery in posts** is treated like a code block: a thin border, mono caption, and
  centered in the column. No drop shadows.
- **Photography vibe**: cool, slightly underexposed, high contrast. No glossy product
  shots. Aaron's headshot should be one photo — not a stylized illustration.
- **YouTube thumbnails** use the same OG-card template (file-path title, mono prompt,
  red accent rule).

### Hover, press, focus, motion

| State | Treatment |
|---|---|
| Link hover | Color shifts **lighter** (red → `#FCA5A5`) — going lighter on dark mode reads more visibly than going darker. |
| Button hover | Background shifts one step lighter (`--surface` → `--surface-2`). |
| Press | Background shifts one *more* step lighter (`--surface-2` → `--surface-3`). |
| Focus visible | 1px `--red` outline with 2–3px offset. Visible, never hidden. |
| Transitions | 120ms ease-out for color, 80ms for background. No bounces, no eases that "feel slick." |

**Animations are minimal.** The only animation in the system is the **block cursor
blink** (1.05s, two-step) and a 200ms body fade-in on page load. Both respect
`prefers-reduced-motion`.

### Transparency & blur

Not used on surfaces. Backgrounds are opaque. The only allowed transparencies are
in token values (`--red-soft`, `--green-dim`) which are tints on top of `--bg` for
small accents.

### Cards (when you must)

```
background: var(--surface);
border: 1px solid var(--rule-strong);
border-radius: var(--radius-1);
padding: var(--space-5);
```

That's it. If you find yourself adding a shadow or a gradient to a card, the design
is drifting. To indicate primacy on a card, use a 2px red left border — same pattern
as the callout and the code block. The borders carry the meaning.

### MDX primitives the kit supports

The site is implementation-targeted at **Next.js App Router + Tailwind + MDX,
static-exported to Cloudflare Pages**. The system provides primitives for the
post-body affordances MDX needs to feel first-class:

- `pre + code` — fenced block with file-header bar, language hint, 2px red rule
- `code` inline — mono, surface background, hairline border, 2px radius
- `blockquote` — left red rule, italic, dimmed
- `Callout` — `{ label, kind: "audit" | "caveat" | "tldr" | "aside" }`
- `Demo` slot — a wrapped div where an inline React component drops in for live demos

---

## ICONOGRAPHY

This is a **type-first, glyph-first** site. Icons are an accent, not a system
load-bearing element. The brand glyph is the **▍ block cursor** — that's the only
mark the site really needs.

### Approach

- **No proprietary icon font.** The brand does not need one.
- **Lucide** is the substitute baseline if and when an icon is genuinely needed
  (RSS, search, external-link, copy, link, chevron). Stroke 1.5px, `currentColor`,
  sized at surrounding cap-height. Load via CDN: `https://unpkg.com/lucide@latest`.
  ⚠️ **Flagged substitution** — no icon set was supplied. Lucide chosen because its
  geometry matches the typographic discipline. Swap globally if you pick another.
- **SVG over PNG** for any custom mark. PNG only for raster photos / OG cards exported.
- **Unicode glyphs are first-class** and replace most icon needs:
  - `›` post-row marker
  - `→` nav, continuations
  - `↗` external link
  - `▍` brand cursor
  - `$` shell prompt
  - `·` separators
  - `§ ¶ †` references
- **Emoji**: not in UI, not in body. (See content rules.)

### Icon usage rules

- Icons never appear alone on a button without a text label. (`↗` and `›` are glyphs,
  not icons.)
- Icon color is `--fg-3` at rest, `--fg` on hover, `--red` for current/active state.
- Icon size: matches cap-height of adjacent text. Default 14px.
- All decorative icons get `aria-hidden="true"`.

### Logo / wordmark

The brand mark is a **prompt bar**: `aaron@pangburn:~$▍`. Set in IBM Plex Mono
semibold. The `$` is red `--red`, the `▍` cursor is red and blinks at 1.05s. The
`~` represents the current path; on a post page the wordmark can read
`aaron@pangburn:~/notes/017$▍`.

The reduced mark is `a▍` (the lowercase `a` plus a red cursor block). The favicon
collapses further to just `▍` — the cursor *is* the brand at small sizes.

See `assets/wordmark.svg`, `assets/mark.svg`, `assets/favicon.svg`,
`assets/og-template.svg`.

### Imagery in posts

YouTube thumbnails, diagrams, screenshots, code-output captures — all inline at
column width, with mono captions and an optional 1px `--rule-strong` border for
photos. No drop shadows.

---

## Substitution flags (read these before publishing)

- **All three fonts are Google Fonts substitutes** the design system author selected.
  Owner has not confirmed. Defaults: IBM Plex Sans, IBM Plex Mono, JetBrains Mono.
  Berkeley Mono and Commit Mono are obvious paid upgrades for the mono — drop in
  via `@font-face` and the system carries.
- **No icon set was supplied.** Lucide via CDN is the substitute baseline.
- **The headshot in the demo is placeholder** (`ap` mono initials on a surface tile).
  Owner needs to supply a single high-quality photo.
- **All post fixtures are fabricated.** They mirror the inferred voice but were not
  written by the owner. Treat them as voice references, not real content.

---

## A note from the design pass

This system was built after a three-way palette exploration
(`Site Direction Explorations.html`). Option 02 (Terminal) was selected by the owner.
The other two directions (Tactical/Slate, Editorial/Oxblood) are kept as the
exploration record but not as live tokens — if the owner wants to revisit, the source
is intact.
