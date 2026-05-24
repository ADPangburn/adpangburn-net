# ui_kits/site/

The blog UI for **aaron@pangburn:~$** — a single-product UI kit.

Hi-fi React + Babel recreation of the home, post, and about views. Components are
factored small so they can be lifted into the real Next.js + Tailwind + MDX
implementation later. Visual decisions trace back to `colors_and_type.css` and the
rules in the root `README.md`.

## Files

| File | What's in it |
|---|---|
| `index.html` | Live click-through demo. Boots React + Babel and mounts the app. |
| `App.jsx` | Top-level shell. Tracks current route in `useState`; renders Header + page. |
| `Header.jsx` | Prompt-bar wordmark (`aaron@pangburn:~$▍`), nav, RSS button. |
| `HomeView.jsx` | Hero (avatar + bio + socials), YouTube strip, post list grouped by year. |
| `PostView.jsx` | Single post: metadata, sans body, file-header code blocks, callouts, share row, prev/next. |
| `AboutView.jsx` | One-screen about page in voice, with `// shipping`, `// stack`, `// contact` blocks. |
| `PostListItem.jsx` | One row in the home list — date · `›` title · dek · tags · min read. |
| `YouTubeStrip.jsx` | Latest-video companion module with scanline-tinted thumb placeholder. |
| `Footer.jsx` | One-line mono footer with name, year, three links, and the block cursor. |
| `posts.js` | Fixture data — fabricated posts in the regulated-enterprise voice. |

## Screens demonstrated

1. **Home** — prompt-bar wordmark with blinking red cursor in the header, post list
   grouped by year with `// 2026` section markers and `note_NNN` IDs, YouTube companion.
2. **Post** — click any row in the home list. Full post layout with red `note_017`
   ID, mono metadata row, sans body, file-header code blocks, `audit note` callout,
   share row, prev/next nav cards.
3. **About** — short first-person about page in voice.

## What's deliberately omitted

- Search (no design yet — see README caveat).
- Comments (the brand uses social cross-posts instead).
- Member tiers / auth / paywall (out of scope).
- Dark/light toggle — the site is dark-only by intent.

These should be added only after the owner confirms whether they want them.

## Implementation target

Real site is intended for **Next.js (App Router) + Tailwind + MDX + Cloudflare Pages**.
The CSS variables in `colors_and_type.css` should be lifted into the Tailwind config
as theme tokens; the JSX components here become a starting point for the production
components.
