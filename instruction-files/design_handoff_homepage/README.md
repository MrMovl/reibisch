# Handoff — Reibisch Homepage

A bilingual (DE / EN) one-page personal website for **Tomke Reibisch — Software & Beratung**, based in Northern Germany. Editorial serif headlines, mono accents, "Hafen" colour direction (paper, harbor blue, sand) with subtle wave motifs as the only northern-coast reference.

---

## About the design files

The files in this bundle are **design references created in HTML**. They are prototypes showing the intended look, type, layout, copy, and behaviour. They are not production code to copy verbatim.

Your job is to **recreate this design in the appropriate environment** for the project. The current `reibisch` repo (github.com/MrMovl/reibisch) is the target — if it already has a stack established (Astro, Next, plain HTML, Elm, etc.) use it; if it is empty, pick the simplest static stack that gets the job done. A static HTML site with one CSS file would be perfectly adequate. The current `Reibisch.html` mock works in plain HTML + React via Babel, which is fine for a mock but not for production — please ship a static, fast, no-React build for a homepage of this size unless you have a strong reason otherwise.

## Fidelity

**High-fidelity.** Colours, type, spacing, copy, hover states, and motion are all final. Recreate pixel-close in the chosen stack.

## What's in this folder

| File | Purpose |
|---|---|
| `Reibisch.html` | The final mock — open in a browser to see the design in action (DE/EN toggle top-right). |
| `direction-hafen.jsx` | The React component implementing the design. Use as the source of truth for measurements, colours, hover states, and animation timings. |
| `content.jsx` | All copy (DE + EN) and shared SVG motifs (`WaveLine`, `CompassMark`). Lift the strings as-is. |
| `README.md` | This document. |

---

## Page structure (single scrollable page)

The page is a fixed `1280px` design width. The mock is laid out as if rendered at that width; in production make it **responsive**: same layout above ~1100px, collapse the multi-column grids to single column on mobile, reduce hero `clamp()` font size.

Sections from top to bottom:

1. **Top bar** — three-column grid: brand name on the left, nav links centered, geographic coordinates (`53°33′N · 9°59′E`) right-aligned. All mono, small, muted.
2. **Hero** — eyebrow label, oversized serif question (`Was klemmt?` / `What's getting in the way?`), then a two-column row with the sub-paragraph (italic serif) on the left and the sand CTA + sub-label on the right.
3. **Wave separator** — 3 stacked sine waves, full bleed, drifting slowly horizontally.
4. **About** — three-column grid: section marker (italic serif "Über") on the left, bio block (name + role + body paragraph) in the middle, numbered three-point list on the right.
5. **Services** — section header row (section marker, headline, count badge), then three rows of services. Each row is a 60px / 1fr / 1.6fr / 36px grid: number tag, name (italic serif), body, arrow. Top + bottom 1px rules.
6. **Wave separator (second)** — 2 stacked sine waves, lighter.
7. **Contact band** — deep blue background with subtle sand waves drifting behind. Section marker, then a two-column row (headline + sub). Below, a 1px rule, then the email address as a giant sand-coloured serif link and the sand CTA right-aligned.
8. **Footer** — mono, small, muted. Copyright/location on the left, Impressum + Privacy on the right.

---

## Design tokens

### Colours

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#eef2f1` | Page background |
| `--ink` | `#1a2b35` | Body text |
| `--deep` | `#26465a` | Headlines, contact band bg, primary blue |
| `--sand` | `#c9b87a` | CTA background, hero link color in contact band, language-switch active |
| `--sand-deep` | `#9f8a4e` | Section marker accents, role line, "01/" indices |
| `--white-warm` | `#fbfaf6` | Text on dark CTA hover state |
| `--rule` | `rgba(38, 70, 90, 0.14)` | Hairlines between sections |
| `--soft` | `rgba(38, 70, 90, 0.55)` | Muted mono labels |

### Typography

Three families, all loaded from Google Fonts:

- **Newsreader** — italic and roman, weight 350. Used for all major headlines and section markers.
- **Geist** — system sans, weights 300/400/500/600. Used for body text, sub-paragraphs, and small UI text.
- **Geist Mono** — weights 400/500. Used for eyebrow labels, nav, coordinates, numbers, CTA labels, footer.

Type scale (px; pair with line-height noted):

| Role | Family / style | Size | LH | Letter-spacing |
|---|---|---|---|---|
| Hero H1 (`Was klemmt?`) | Newsreader 350 | 104 | 0.96 | -0.028em |
| Contact H2 (`Reden wir`) | Newsreader 350 | 68 | 1.00 | -0.025em |
| Services H2 (`Was ich mache`) | Newsreader 350 | 48 | 1.00 | -0.02em |
| About name (`Tomke Reibisch`) | Newsreader 350 | 42 | 1.05 | -0.015em |
| Service name | Newsreader 350 | 28 | 1.15 | -0.01em |
| Section marker (Über / Leistungen / Kontakt) | Newsreader italic 350 | 26 | 1.00 | -0.01em |
| Hero sub (italic) | Newsreader 350 italic | 22 | 1.45 | — |
| About point (italic) | Newsreader 350 italic | 19 | 1.35 | — |
| About body | Geist 400 | 17 | 1.60 | — |
| Contact email link | Newsreader 350 | 38 | 1.00 | -0.01em |
| Body / paragraph | Geist 400 | 15–17 | 1.55–1.60 | — |
| CTA label | Geist Mono 500 | 14 | 1.00 | 0.04em, UPPERCASE |
| Top-bar brand | Geist Mono 600 | 12 | 1.00 | 0.02em |
| Nav links | Geist Mono 400 | 11 | 1.00 | 0.08em, UPPERCASE |
| Mono labels (eyebrow, meta) | Geist Mono 400 | 11–13 | 1.00 | 0.05–0.08em, UPPERCASE |
| Section marker index ("01") | Geist Mono 400 | 11 | 1.00 | 0.1em, UPPERCASE |

`text-wrap: pretty` on long paragraphs.

### Spacing

Outer page gutters: **48px** left/right.
Section vertical rhythm: top-bar `24px` top → hero `64px / 48px` → about `56px / 56px` → services `56px / 64px` → contact `64px / 48px` → footer `20px`.
Grid gaps between columns: typically **48px** or **60px**.

### Borders & radius

- Hairlines between sections: `1px solid rgba(38, 70, 90, 0.14)`
- CTA radius: `3px`
- Lang-switch radius: `999px`
- No drop shadows on cards — only on CTAs (see below).

---

## CTAs (buttons)

There are two visual variants. Both share the same dimensions and motion.

### Sand CTA (default — hero, contact)

```css
.cta-sand {
  display: inline-flex; align-items: center; gap: 14px;
  padding: 15px 22px;
  background: #c9b87a; color: #26465a;
  font-family: 'Geist Mono', monospace;
  font-size: 14px; font-weight: 500;
  letter-spacing: 0.04em; text-transform: uppercase;
  border-radius: 3px; text-decoration: none;
  box-shadow:
    0 1px 0 rgba(15, 31, 44, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transition: background-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease, transform 0.25s ease;
}
.cta-sand:hover {
  background: #26465a; color: #fbfaf6;
  box-shadow: 0 4px 18px rgba(38, 70, 90, 0.22);
  transform: translateY(-1px);
}
.cta-sand .arrow { transition: transform 0.3s ease; }
.cta-sand:hover .arrow { transform: translateX(8.5px); }   /* funLevel-dependent in mock */
```

The arrow is a plain `→` (U+2192) in a `<span class="arrow">` inside the link.

### Deep CTA (not currently used on the page — kept as a variant for future)

Same dimensions; `background: #26465a`, `color: #fbfaf6`. Hover transitions to sand.

---

## Animations & motion

Animation intensity comes from a single "fun level" value (0–100). The chosen production value is **75**. Translate the resulting durations directly:

| Animation | Duration | Easing | Notes |
|---|---|---|---|
| Wave separator drift (3-line, after hero) | **7.0s** | `ease-in-out infinite alternate` | `translateX(0 → -14px)` |
| Contact-band slow wave drift | **11.5s** | `ease-in-out infinite alternate` | `translateX(0 → +8px)` |
| CTA hover bg/color/shadow | 0.4s | `ease` | |
| CTA hover transform | 0.25s | `ease` | `translateY(-1px)` |
| CTA arrow shift on hover | 0.3s | `ease` | `translateX(~8.5px)` |
| Service row hover indent | 0.25s | `ease` | `padding-left 0 → 8px` |
| Service row arrow shift | 0.25s | `ease` | `translateX(4px)`, colour deep → harbor |

All animations should respect `prefers-reduced-motion: reduce` and be disabled there.

---

## Wave motif (the only "northern" decoration)

A horizontal stack of `n` parallel sine waves, drawn in SVG. The component in `content.jsx` (`WaveLine`) generates them; reimplement as static SVG or canvas — they don't need to be JS-driven.

Production values (with `localTouch = 85`, `funLevel = 75`):

- **Width**: 1280px (full-bleed)
- **Stroke**: `#26465a`, 1px, opacity ~0.87
- **Period**: 56px (the wavelength of one sine)
- **Amplitude**: 4px (post-hero), 3px (post-services)
- **Count**: 3 lines (post-hero), 2 lines (post-services), 4 lines (inside contact band, in sand at 18% opacity)
- **Gap between lines**: 9px (post-hero), 10px (post-services), 28px (contact band)
- Each subsequent line in a stack reduces opacity by 15%.

No other northern motifs (no horizon line, no compass on the live page — those were prior iterations and have been removed).

---

## Section copy (DE + EN)

All copy lives in `content.jsx` under `COPY.de` and `COPY.en`. Use those exact strings.

Key strings:

- **Brand**: `Reibisch` + tagline `Software & Beratung` (DE) / `Software · Apps · Consulting` (EN eyebrow only — the brand tagline stays in German on the top bar)
- **Coordinates**: `53°33′N · 9°59′E` (placeholder Hamburg — confirm with Tomke whether to keep, change to his town, or remove)
- **Hero question DE**: `Was klemmt?`
- **Hero question EN**: `What's getting in the way?`
- **Email**: `hallo@reibisch.de` *(placeholder — confirm)*
- **Footer**: `© 2026 · Tomke Reibisch · Norddeutschland · Festland & Küste`

---

## Open questions for Tomke

The following are placeholders the mock made up. Confirm or replace before launch:

- **Email address** — `hallo@reibisch.de` is a guess. Real address?
- **Coordinates** — Hamburg's `53°33′N · 9°59′E` is on the top bar. Keep Hamburg, swap to actual town, or remove this little flourish?
- **Impressum / Privacy** — links to fill in. German freelance Impressum has legal minimum content (full name, address, contact, USt-IdNr if applicable).
- **Year** — `© 2026` baked in; switch to dynamic `new Date().getFullYear()`.

---

## Language toggle

Lives at `position: fixed; top: 16px; right: 16px`. Pill-shaped, `999px` radius, glass background `rgba(255,255,255,0.75)` with `backdrop-filter: blur(8px)`. Active language: sand `#c9b87a` background, deep blue `#1a2b35` text. Inactive: transparent button, muted text.

Implementation suggestion for production: don't ship two language bundles via JS state. Use two static HTML files (`index.html` for DE, `en/index.html` for EN) and have the toggle be a real `<a>` link. SEO and performance both benefit.

---

## Accessibility notes

- Headlines use real `<h1>` / `<h2>` / `<h3>`.
- Every section gets a real `<section>` element; consider `aria-labelledby` pointing at its heading.
- The wave SVGs in the mock have `aria-hidden="true"` — keep that.
- The lang-switch should be a `<nav aria-label="Language">` with `<a>` tags (or `<button>` with `aria-pressed`).
- Contrast: sand-on-deep (#c9b87a on #26465a) hits ~5.8:1; deep-on-sand hits ~5.8:1. Body ink-on-paper hits ~12:1. All OK.

---

## Suggested build path

If starting fresh, a single static HTML file + one CSS file is enough. Use a single Liquid/Nunjucks/Astro template if you want clean DE/EN split. The page has zero interactive behaviour beyond the language toggle and CSS hovers — no client JS is required.

Order of work:

1. Set up the chosen static stack (or plain HTML).
2. Drop in Google Fonts link + CSS custom properties for the colour tokens.
3. Build the static HTML structure for each section in order, reading copy from `content.jsx`.
4. Layout: use CSS Grid for the multi-column section layouts; Flex for the top bar and CTAs.
5. Hairlines + section padding per the spacing table.
6. Implement the two CTA variants exactly per the CSS block above.
7. Reproduce the wave separators as inline SVG (or a tiny build step that generates them).
8. Add the CSS keyframe drift animations behind `@media (prefers-reduced-motion: no-preference)`.
9. Mobile breakpoint at ~720–900px: collapse multi-column grids to single column, reduce hero size with `clamp()`, drop the wave-drift animation if perf is a concern.

That's it. The design is intentionally minimal — the work is in the precision, not the surface area.
