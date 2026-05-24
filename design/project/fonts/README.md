# fonts/

This brand uses two primary Google Fonts (and one fallback mono), loaded via `@import`
in `colors_and_type.css`:

- **IBM Plex Sans** (body, headings, UI) — by Mike Abbink / IBM
- **IBM Plex Mono** (code, metadata, prompt, brand mark) — by Mike Abbink / IBM
- **JetBrains Mono** (fallback mono) — by JetBrains

All three are OFL-licensed and free for any use.

## Substitution flag

⚠️ The site repo (`ADPangburn/adpangburn-net`) was empty when this design system was
built, so **no original font files were supplied**. These are best-guess Google Fonts
substitutes selected to match the design direction the owner picked (Terminal — Linear
meets CLI):

- IBM Plex Sans was chosen over Inter because it has slightly more character at body
  size — squared joins, narrower humanist forms — which reads more "developer chose
  this" than the Inter default.
- IBM Plex Mono pairs with the sans by design (same designer, calibrated metrics).
- JetBrains Mono is the fallback if a renderer can't find Plex Mono.

**If the owner has a preference**, drop the files into this folder and replace the
`@import` line in `colors_and_type.css` with `@font-face` declarations. Obvious
upgrades:

- **Berkeley Mono** (paid, by Berkeley Graphics) — distinct, opinionated. Would
  reinforce the "developer-made" cue.
- **Commit Mono** (free) — similar energy to Berkeley Mono.
- **Geist Sans / Geist Mono** (Vercel) — on-trend but works.

## Local fallback (for offline / self-hosting)

Download the families from:

- https://fonts.google.com/specimen/IBM+Plex+Sans
- https://fonts.google.com/specimen/IBM+Plex+Mono
- https://fonts.google.com/specimen/JetBrains+Mono

…and replace the `@import` in `colors_and_type.css` with `@font-face` blocks pointing
at local `.woff2` files in this folder.
