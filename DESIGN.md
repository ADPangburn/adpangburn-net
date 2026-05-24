# DESIGN.md — pangburn-design

The single design source for **apangburn.net** — Aaron Pangburn's personal
engineering blog on HITL multi-agent orchestration, written from inside a regulated
enterprise. If you're an engineer (or agent) reading this to ship the site, this is
the doc.

> Visual direction in one line: **Linear's discipline meets a developer's terminal.**
> Voice in one line: **a senior engineer's field notes, with audit logs attached.**

---

## Implementation target

- **Next.js (App Router)** + **Tailwind CSS** + **MDX**, static-exported.
- **Cloudflare Pages** for hosting.
- Dark mode only. No light-mode toggle.
- Mobile-first, but the design is unapologetically dense on desktop.

---

## Color tokens

Drop these into `tailwind.config.ts` under `theme.extend.colors` (or use CSS variables
directly).

```css
/* Surfaces — warm near-black, never #000 */
--bg:        #0A0A0A;  /* page background */
--bg-2:      #111111;  /* slightly raised */
--surface:   #171717;  /* cards, code blocks, callouts */
--surface-2: #1F1F1F;  /* nested, hover */
--surface-3: #2A2A2A;  /* pressed */

/* Foreground — neutral gray ramp, no warm tint */
--fg:    #FAFAFA;  /* primary text */
--fg-2:  #E4E4E7;  /* body prose */
--fg-3:  #A1A1AA;  /* secondary, dim labels */
--fg-4:  #71717A;  /* muted, metadata, captions */
--fg-5:  #52525B;  /* placeholder, disabled */
--fg-6:  #3F3F46;  /* dim, disabled body */

/* The accent — used sparingly */
--red:      #EF4444;  /* links, current state, accent rules, brand cursor */
--red-deep: #DC2626;  /* visited, pressed */
--red-soft: rgba(239,68,68,0.12);  /* tint backgrounds, callouts, selection */
--red-dim:  rgba(239,68,68,0.40);

/* Signal palette — for diff, status, code */
--green: #A3E635;  /* strings, +diff, "shipped" */
--amber: #FCD34D;  /* numbers, ~modified, "caveat" */
--cyan:  #67E8F9;  /* tokens, hashes */
--blue:  #93C5FD;  /* identifiers, secondary code */

/* Structural */
--rule:         #1F1F1F;  /* hairline between rows */
--rule-strong:  #2A2A2A;  /* visible divider */
--rule-bright:  #3F3F46;  /* prominent divider, focus rings */
```

### Color rules

- **Never** `#000000` and **never** `#FFFFFF`. Everything has a slight bias.
- **One accent at a time.** Red is the accent. Green + amber + cyan + blue belong in
  code blocks, diff/status pills, and callout signaling — never large surfaces.
- **No gradients.** A diff line with a 12%-alpha tint is not a gradient.
- **Hover goes lighter, not darker.** Links hover to `#FCA5A5`; surfaces hover up one
  step (`--surface` → `--surface-2`).

---

## Type

Two families. Mono is first-class.

```css
--font-sans: "IBM Plex Sans", "Inter", system-ui, sans-serif;
--font-mono: "IBM Plex Mono", "JetBrains Mono", "SF Mono", Menlo, monospace;
```

Load via Google Fonts `@import` (Next.js: use `next/font/google`):
- `IBM Plex Sans` weights 400, 500, 600, 700
- `IBM Plex Mono` weights 400, 500, 600, 700 (+ italic 400)
- `JetBrains Mono` as fallback

### Scale (anchored at 15px body)

| Token | Size | Use |
|---|---|---|
| `--t-xxs` | 11px | tiny mono labels |
| `--t-xs`  | 12px | mono nav, captions |
| `--t-sm`  | 13px | small text, code block body |
| `--t-base`| 15px | **body prose** |
| `--t-md`  | 17px | post dek, lead paragraphs |
| `--t-lg`  | 20px | h4 (but h4 is usually a mono uppercase label) |
| `--t-xl`  | 24px | h3 |
| `--t-2xl` | 32px | h2 |
| `--t-3xl` | 40px | h1 |
| `--t-4xl` | 56px | display, 404 |

Body line-height 1.55. Headlines line-height 1.05–1.25. Letter-spacing on headlines
is `-0.025em` (h1), `-0.015em` (h2/h3).

### Distinctive type treatments

- **Post IDs**: `note_017` in mono, semibold, red.
- **Section markers**: `// section_name` — mono, uppercase, dimmed. The `//` prefix is
  literal (not just a code comment — it's the brand's section marker).
- **The prompt bar** is the wordmark:
  `aaron@pangburn:~$ ▍` — `aaron` and `pangburn` in `--fg`, `@` and `:~` in `--fg-3`,
  `$` in `--red`, `▍` (block cursor) in `--red`, blinking at 1.05s.
- **Code blocks**: file-header bar (filename + language), 2px red left rule.
- **Callouts**: 2px left rule signals type — red (audit/critical), green (tl;dr/ok),
  amber (caveat), neutral (aside).

---

## Spacing & layout

4px base unit. Steps: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.

- **Prose column**: 680px wide.
- **Page chrome**: 880px wide.
- **No sidebars** on posts. **No sticky header.**
- **Radii**: `0` is the default. `2px` for inline code. `4px` for buttons + inputs is
  the maximum. **No pills. No fully rounded cards.** This is a terminal, not a chip
  bar.
- **One shadow** exists for dialogs only:
  `0 0 0 1px var(--rule-bright), 0 24px 48px -16px rgba(0,0,0,0.6)`.
  Everything else uses **borders for depth.**

---

## Components (the key patterns)

### Header — prompt-bar wordmark + nav

```
[aaron@pangburn:~$▍]                    writing  notes  about  [RSS]
─────────────────────────────────────────────────────────────────────
```

- Wordmark is a real prompt — `~/` updates to the current path (`~/notes`, `~/notes/017`).
- Active nav item has a `--red` 1px bottom border.
- RSS sits in a bordered mono tile, far right.
- 1px `--rule-strong` border-bottom separates header from page.

### Post list item

```
2026·03·12   note_017   › The retry loop is a human-in-the-loop loop      [tag] [tag]   8 MIN
                          Every retry budget should bottom out in a question to a person…
─────────────────────────────────────────────────────────────────────────────────────────
```

- Grid: `100px (date) / 56px (id) / 1fr (title+dek) / 220px (tags) / 60px (min)`
- `note_017` in red mono semibold; `›` marker before the title in red.
- Hover: row background → `--surface`.
- 1px `--rule` border-bottom between rows.

### Code block

```
┌─ orchestrator/retry.ts ────────────── typescript ─┐
│ // retries bottom out in a human, not an exception │
│ export async function retry(task: Task, budget = 3) {
│   …                                                 │
│ }                                                   │
└─────────────────────────────────────────────────────┘
   ↑ 2px red left rule
```

- File-header bar (filename + language) on `--bg-2`, mono 11px, dimmed.
- 2px `--red` left rule, 1px `--rule-strong` everywhere else.
- Syntax: `kw=red`, `str=green`, `num=amber`, `com=fg-4 italic`, identifier=fg.

### Callout

```
┃ AUDIT NOTE
┃ Every askHuman() call writes a row into the decision log.
┃ Compliance reads this table on Tuesdays.
```

Four kinds — `kind="audit|caveat|tldr|aside"`:

| kind | left rule | label color |
|---|---|---|
| audit / default | `--red` | `--red` |
| caveat | `--amber` | `--amber` |
| tldr / ok | `--green` | `--green` |
| aside | `--fg-5` | `--fg-3` |

Background is always `--surface`. Body is sans 14px. Label is mono 10px uppercase
semibold with 0.14em tracking.

### Demo slot (inline React in MDX)

`<Demo title="retry loop"> … </Demo>` — dashed 1px `--rule-bright` border on
`--bg-2`, mono header bar with `// section · interactive` on the right.

### Tags

Mono 10px, `--surface` background, 1px `--rule-strong` border, 2px radius, 2/7px
padding. All lowercase.

### Buttons

| Variant | Background | Border | Text |
|---|---|---|---|
| default | `--surface` | `--rule-bright` | `--fg` |
| primary | `--fg` | `--fg` | `--bg` |
| accent  | transparent | `--red` | `--red` |
| ghost   | transparent | transparent | `--fg-3` |

Mono 13px, medium weight, 8/16px padding, 2px radius, 0.04em tracking.

### Focus state

Always `1px solid --red` outline with `2-3px` offset. Visible, never `outline: none`.

### Motion budget

- **Block cursor blink**: 1.05s, two-step (`steps(2, start)`). The only animation
  with personality.
- **Page body fade-in**: 200ms opacity 0→1 on load.
- **Color/border transitions**: 120ms ease-out.
- **Background transitions**: 80ms ease-out.
- Nothing else animates. No scroll reveals. No hover scales. Respect
  `prefers-reduced-motion`.

---

## Voice & content rules

### Voice

- **First-person, present-tense, declarative.** Specific. Operational. Audit-aware.
- ✅ "I rewrote orchestrator/retry.ts this weekend. Here's the trace from a real run."
- ❌ "In this article, we will explore…"
- ❌ "Excited to share what I've been working on!"

### Tone dials

| Dial | Setting |
|---|---|
| Formality | Low-medium. Slack DM to a smart senior colleague. |
| Authority | High, earned by specificity, not by stance. Show the trace. |
| Humor | Dry. No memes, no exclamation points. |
| Hedging | Minimal. "I don't know yet" beats "perhaps." |
| Selling | None. The post is the artifact. |

### Casing

- **Post titles**: Sentence case. `The retry loop is a human-in-the-loop loop`.
- **Section markers**: mono UPPERCASE with `//` prefix → `// recent_notes`.
- **Brand names**: as the brand spells them. `OpenAI`, `Claude Code`.
- **No ALL CAPS** in prose. Yes in mono labels.

### Length & shape

- Posts are as long as they need to be. 400 words or 6,000.
- Open with the punchline or the artifact. First line is the thesis.
- TL;DR goes at the end, not the top. (As a `tldr` callout.)

### Compliance / regulated framing

When writing about work, **be specific without being attributable**. Use roles ("the
on-call," "compliance"), never names. Fictionalize the stack if needed; keep the
lesson real.

### Emoji & ornament

**No emoji.** Anywhere. Ever. The blinking `▍` block cursor is the only ornament.

Unicode glyphs are first-class: `→ · › § ▍ ↗ ⊕ $`.

---

## The "don't" list

- No gradients on large surfaces.
- No drop caps. (Terminal aesthetic can't carry them.)
- No pills, no fully rounded cards.
- No emoji.
- No hover scale, no bounces, no scroll reveals.
- No light mode.
- No "subscribe!" popups, no email-capture modals, no exit-intent overlays.
- No purple/blue gradient hero anything.
- No "we" when writing as Aaron (unless literally describing a team).
- No marketing voice. Ever.

---

## Brand assets

- `wordmark.svg` — `aaron@pangburn:~$` (no cursor in SVG — cursor is HTML+CSS only).
- `mark.svg` — `a` + red block, 64×64.
- `favicon.svg` — just the red block, 32×32.
- `og-template.svg` — 1200×630 social card with the prompt bar and title.

---

## Iconography

- **No proprietary icon font.** Don't ship one.
- **Lucide via CDN** as the substitute baseline for any in-UI icons (RSS, search,
  copy, external-link, chevron). 1.5px stroke, `currentColor`, sized at cap-height.
- **Unicode glyphs over icons** wherever possible — `›` for markers, `→` for nav, `↗`
  for external links, `▍` for the brand, `$` for the prompt.

---

## What ships first

If you're starting the site from scratch, build in this order:

1. **Tailwind config + globals.css** with the color/type/spacing tokens above.
2. **`<Header>`** — the prompt-bar wordmark + nav. The block cursor blink is the
   first thing readers will recognize, so it's worth getting right.
3. **`<Footer>`** — the one-line mono with the red square.
4. **`<PostListItem>`** + the home feed.
5. **`<PostBody>` MDX components** — `<Pre>` with file-header, `<Callout>`,
   `<Blockquote>`, `<InlineCode>`, `<Demo>`.
6. **The post page** itself.
7. **Archive** + tag filter.
8. **404** and **⌘K command palette**.

The full reference design system (with preview cards, the React UI kit, and the
hi-fi screen mocks) lives at `.claude/skills/pangburn-design/` — read those if you
want to see the canonical visual reference before you build.

---

*Locked direction: Terminal (Option 02 from the 3-way palette exploration). The other
two — Tactical/Slate and Editorial/Oxblood — are not live; revisit
`.claude/skills/pangburn-design/Site Direction Explorations.html` if you ever want
to.*
