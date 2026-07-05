# Client Decision Page — pattern guide

A reusable pattern for a **one-page, self-contained HTML deliverable** that
presents scoping/product decisions to a client for discussion and sign-off.
Design = this site's "hafen" system (paper / deep / sand, Geist + Newsreader).

First built for the Deliverboard / Hugo Pfohe project (MVP → real product). This
folder captures the pattern so any future session can reproduce it without
re-deriving the design or the editorial approach.

- **`TEMPLATE.html`** — copy this. Self-contained skeleton with the full hafen
  CSS inline and placeholder content.
- **`GUIDE.md`** — this file.

---

## What it is / when to use

A single `.html` file the client can open by double-click, print, or receive by
e-mail. Fully offline: CSS is inline, the client logo is embedded as a base64
data URI, no external assets except Google Fonts (which degrade gracefully to
system serif/sans offline).

Use it when a client needs to **make or discuss a set of numbered decisions**
(scope, MVP → product, hosting, accounts, roles, cost). It is not a generic doc
template — the structure is specifically "here are the choices, decide them."

---

## Editorial rules (the important part)

These are the lessons that made the Deliverboard page land. Follow them.

1. **Split every point into two buckets:**
   - **"Das musst du entscheiden"** — only things that affect **cost, UX, or app
     behavior**. These stay open. Do **not** bake in a recommendation (unless the
     item is purely technical/infra, or the client explicitly asks for one).
   - **"Das setze ich um"** — pure technical / best-practice calls you make
     yourself (account ownership, EU region + AVV/DPA, backups, domain). Never
     put UX or behavior decisions here.
2. **Frank German, no fluff.** The client is known personally. Short sentences,
   fragments ok. No filler, no hedging, no "it depends" essays.
3. **Options, not prose.** Each open decision is `(a) / (b) / (c)` with a one-line
   trade-off each. Bold the option name, then the consequence.
4. **Prices: mark estimates as estimates.** If you could not verify a price, write
   "ca." / "grobe Schätzung" and say so. Only state a number as fact if sourced.
5. **No recommendations on UX/behavior.** You may recommend on infra (hosting,
   backups) because the client doesn't care about those. On login UX, roles, what
   data is shown, etc. — present options, let them choose.
6. Respect the global writing prefs of whoever you're working for (e.g. no em
   dashes in prose you author elsewhere; inside this template the `—` is used as a
   typographic separator between a bold term and its description, which the client
   approved — keep it consistent within the page).

---

## Page structure (top to bottom)

All classes below are defined in `TEMPLATE.html`'s inline `<style>`.

| Section | Classes | Purpose |
|---|---|---|
| Top bar | `.top-bar` `.brand` `.brand-plate` `.brand-kicker` `.top-bar-tag` | Client logo on a white plate, short kicker, right-aligned page tag. |
| Hero | `.hero` `.hero-eyebrow` `.hero-h1` `.hero-sub` `.hero-status` | Mono eyebrow, big serif title, italic serif subline, a bordered "status quo" box. |
| Decisions | `.sec` + `.decision` `.decision-num` `.decision-name` `.opts` `.opt` `.opt-tag` `.opt-body` | The open choices. One `.decision` per point; options tagged `a/b/c/—/?`. |
| I'll handle it | `.sec` + `.rows` `.row` `.row-mark` `.row-body` | Technical defaults, `~` markers. |
| Cost | `.sec` + `.rows` | Numbered cost lines. Add the "grobe Schätzung" note. |
| Next step | `.band` `.band-label` `.band-h2` `.band-sub` `.band-bottom` | Dark deep-blue closing band. |

The `.sec` grid (200px label · 48px gap · 1fr content) and the hafen colour
tokens are the same primitives the main site uses for About / Services / Contact.

---

## How to build one

1. **Copy** `TEMPLATE.html` to the deliverable's home (usually the *client
   project's* repo, e.g. `PRODUCT-DECISIONS.html`), not into this repo.
2. **Embed the client logo** as a data URI:
   ```
   base64 -w0 path/to/logo.jpg
   ```
   Paste the output into the `{{CLIENT_LOGO_DATA_URI}}` slot, keeping the
   `data:image/jpeg;base64,` prefix (fix the mime type for png/svg).
   - Logo with a **white/light background** (typical JPEG wordmark): keep it on
     the white `.brand-plate` (default) so the edges look intentional.
   - Logo that is **white-on-transparent**: drop the plate and place it on a dark
     surface instead, or it will be invisible on `--paper`.
3. **Fill the placeholders** (`{{...}}`) and duplicate the `<div class="decision">`
   block once per decision. Renumber `.decision-num`.
4. **Verify** by rendering a screenshot before sending:
   ```
   brave --headless --no-sandbox --hide-scrollbars \
     --window-size=1200,2400 --screenshot=preview.png \
     "file://$PWD/PRODUCT-DECISIONS.html"
   ```
   (`chromium` / `google-chrome` work the same.) Check the logo, the section
   rhythm, and mobile by narrowing `--window-size`.

### Placeholders in TEMPLATE.html

`{{CLIENT_LOGO_DATA_URI}}`, `{{CLIENT_KICKER}}`, `{{PAGE_TAG}}`, `{{EYEBROW}}`,
`{{TITLE}}`, `{{SUBLINE}}`, `{{STATUS_QUO}}`, decision blocks, `{{NEXT_STEP_*}}`,
`{{SIGNATURE}}`. Each is marked with an HTML comment.

---

## Later: promoting a filled page to a public route on reibisch.de

Not needed for the deliverable itself (it's a standalone file). Do this only when
a *specific, non-confidential* instance should be hosted on the site.

The hafen tokens and the shared primitives (`.sec`, `.section-label`,
`.service-row`, `.hangs`, `.contact`) already live globally in
`lib/reibisch_web/components/layouts/root.html.heex`. The **decision-specific**
classes (`.decision`, `.opt`, `.opt-tag`, `.rows`, `.row`, `.band`,
`.brand-plate`, `.hero-status`, `.top-bar-tag`) do **not** — add them to that
same `<style>` block.

Then, following this repo's page mechanism:

1. Add the body markup as `lib/reibisch_web/controllers/page_html/<name>.html.heex`
   (body only — drop TEMPLATE.html's `<head>`/`<style>`; the root layout supplies
   head + fonts + tokens).
2. Add a controller action in `page_controller.ex`.
3. Add the route in `router.ex` (leave it out of the nav to keep it unlisted).
4. Add a `@pages` entry in `lib/mix/tasks/build_static.ex` (this is what the static
   build actually renders).
5. Deploy per `CLAUDE.md`: PR → merge → `git checkout main && git pull` →
   `./deploy.sh`. **Keep client-confidential content off the public site** — use
   generic example content for anything public.
