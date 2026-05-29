# Handoff: Kodiak Pools & Spas — Marketing Landing Page

## Overview
A single-page marketing site for **Kodiak Pools and Spas, LLC** — a residential & commercial
pool-service company in Peoria, AZ (owner: Todd Crane). The page introduces the brand, lists the
six core services, calls out the home-warranty/insurance specialty, shows the service area, and
drives the primary conversion: **Request a Quote** (contact form). Secondary CTA is **click-to-call**.

The visual direction is **"heritage craftsman"** — high-contrast serif display type, a warm cream
paper background, cornflower-blue accent pulled from the company's bear-shield logo, hairline rules,
and square corners. It deliberately avoids the generic clip-art pool-company look.

## About the Design Files
The files in this bundle are **design references created in HTML/CSS** — a working prototype that
shows the intended look, copy, and behavior. They are **not** meant to be shipped verbatim. The task
is to **recreate this design in the target codebase's environment**, using its established patterns
and component library. If no front-end environment exists yet, pick an appropriate stack
(e.g. Next.js/React + your CSS approach of choice) and implement the design there.

Everything here is plain, framework-agnostic HTML + CSS plus two small enhancements (a Tweaks panel
and drag-to-fill image slots) that are **prototype-only conveniences** — see "Prototype-only pieces"
below; they should NOT be carried into production.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and copy are all specified here and in
`kodiak.css`. Recreate the UI pixel-faithfully using the codebase's libraries and patterns. All
design tokens are CSS custom properties in `:root` — lift them directly.

## Screens / Views
This is a single scrolling page. Sections top → bottom:

### 1. Sticky Header (`.site-header`)
- **Layout:** full-width sticky bar, 78px tall, translucent cream background with `backdrop-filter: blur(10px)` and a 1px bottom hairline. Inner content constrained to `--maxw` (1240px) with `--gutter` side padding. Flex row: brand lockup (left) · nav (pushed right via `margin-left:auto`) · phone + "Request a Quote" button.
- **Brand lockup:** 44px logo image + wordmark. Wordmark "KODIAK" in display font 900/1.32rem with a `<small>` subhead "Pools & Spas" (0.56rem, 0.34em tracking, uppercase).
- **Nav links:** `Services · Why Kodiak · Service Area · Contact`. 0.83rem, weight 600, ink-soft color, animated blue underline on hover (width 0 → 100%, 0.22s).
- **Phone:** `602.399.4037` in display font 1.05rem with uppercase caption "Call or text Todd". Links to `tel:6023994037`.
- **Button:** primary style (see Components).

### 2. Hero (`.hero`)
- **Layout:** 2-column grid `1.05fr / 0.95fr`, gap `clamp(32px,5vw,80px)`, vertical padding `clamp(56px,8vw,110px)`. Faint bear-shield watermark absolutely positioned behind, right side, `opacity: 0.05`.
- **Left (copy):** eyebrow "Pools · Spas · Peoria, Arizona" → H1 `Craftsmanship\nis back.` (display font, 900, `clamp(3.2rem,9vw,7.2rem)`, line-height 0.92; the word "back." is blue) → definition paragraph → action buttons (primary "Request a Quote" + ghost "Call 602.399.4037") → trust row (ROC #309965 · Licensed & Bonded · Home-Warranty Specialist · Residential & Commercial, each prefixed with a small rotated-square blue diamond).
- **Right (media):** a hero image placeholder, `clamp(380px,46vw,560px)` tall, 1px border with an offset cream "stacked card" shadow (`box-shadow: 26px 26px 0 -2px ...`). A black "20+ / Years of craft" badge pinned top-left. **In production:** replace the placeholder with a real `<img>` (a clean pool / finished job / Todd at work). The "20+ years" figure is a placeholder — confirm before shipping.

### 3. Trust Strip (`.trust-strip`)
- Full-width band, ink (near-black) background, cream text. 4 equal columns separated by faint vertical rules. Each: a display-font value + an uppercase 0.16em caption.
- Items: `ROC #309965 / Licensed Contractor` · `Warranty Claims / Home-Warranty Specialist` · `Res. & Comm. / Residential & Commercial` · `Diagnose → Done / Fixed Right the First Time`.

### 4. Services (`#services`)
- **Section head:** eyebrow "What we do" + H2 "Full-service pool care, from the pump to the patio." + lead paragraph (right-aligned, max 38ch).
- **Grid:** 3 columns (2 at ≤960px, 1 at ≤600px). Cells use shared 1px hairline borders (border-top/left on container, border-right/bottom on each card) so they read as one ruled table. Card padding `34px 32px 38px`, card background `--card`, hover background `--paper-2`.
- **Each card:** small rotated-square blue outline mark (top-right) · number `01`–`06` (display font, blue) · H3 service name (1.62rem) · one-line description.
- **The six services (exact copy in the HTML):** Diagnosis & Repair · Green Pool Clean-ups · Weekly Maintenance · Heaters · Pumps & Filters · Cleaners.

### 5. Why Kodiak (`#why`)
- Band with `--paper-2` background and top/bottom hairlines. 2-column grid `1.1fr / 0.9fr`.
- **Left:** a "dictionary entry" device — blue 3px left border, `crafts·man·ship` headword (display 900), italic pronunciation line, the definition in quotes, then a body paragraph about Todd's standard.
- **Right:** dark card (`--ink` bg, cream text, padding 40px). Eyebrow "The Kodiak difference" → H3 "Home-Warranty Specialist" → paragraph → bullet list (each bullet a small light-blue diamond). **This section is the key differentiator** (Kodiak is the go-to contractor for home-warranty/insurance pool claims) — keep it prominent.

### 6. Service Area (`#area`)
- 2-column grid `0.92fr / 1.08fr`.
- **Left:** a map placeholder, `clamp(340px,40vw,480px)` tall, 1px border. **In production:** embed a real map (static map image or an interactive map keyed to the West Valley) or a branded illustration.
- **Right:** eyebrow "Where we work" + H2 "Peoria & the Phoenix West Valley." + a 2-column city list (`columns: 2`) with hairline row separators and small blue dots, then a "Based at …" address paragraph.
- **Cities listed:** Peoria, Glendale, Surprise, Sun City, Sun City West, El Mirage, Litchfield Park, Goodyear, Avondale, Waddell, Anthem, North Phoenix. (Confirm/trim with the client.)

### 7. Contact / Request a Quote (`#contact`)
- Band, ink background, cream text. 2-column grid `1fr / 0.82fr`.
- **Left:** eyebrow "Request a quote" + H2 "Tell us about your pool." + lead, then the form (`.qform`, 2-col grid): Name*, Phone*, Email, City, "What do you need?" (select, full-width), Property type (Residential/Commercial segmented control, full-width), Details (textarea, full-width), submit button (full-width).
- **Right (`.contact-card`):** four hairline-separated rows — Phone, Email, Address, License — each with a small square glyph "icon" box. **In production:** swap the placeholder glyphs (☎ @ ⌖ §) for the codebase's real icon set.
- **Form behavior:** see Interactions.

### 8. Footer (`.site-footer`)
- Very dark (`#0c0f15`). Grid `1.4fr / 1fr / 1fr` (collapses on small screens) + a full-width legal row with a top hairline.
- **Brand column:** the **full-color** logo on a cream plate (`background: var(--paper)`, 12px padding, `--radius`) so the bear detail reads on the dark background — see "Footer logo" note. Wordmark + script tagline "Craftsmanship is back" (in `--font-script`, light blue) + blurb.
- **Columns:** Services links, Contact details (phone, email, address, ROC#).
- **Legal row:** copyright + "Residential · Commercial · Home-Warranty Specialist".

## Interactions & Behavior
- **Smooth scroll** to in-page anchors (`html { scroll-behavior: smooth }`), nav + CTAs link to `#services / #why / #area / #contact`.
- **Nav underline:** animated width on hover, 0.22s ease.
- **Buttons:** `translateY(-2px)` on hover (0.18s). Primary fills blue→blue-deep; ghost inverts to ink/paper.
- **Service cards:** background lightens to `--paper-2` on hover (0.2s).
- **Property-type segmented control:** clicking a label toggles an `.active` class (blue fill) onto it and removes it from siblings. Underlying inputs are visually hidden radios.
- **Quote form submit (prototype):** prevents default; validates Name + Phone are non-empty (empty fields get a warning border `#e0856b`); on success, hides all fields/button and reveals a `.form-success` thank-you block. **In production:** wire to a real backend — email (e.g. form-to-email service) or SMS to Todd — with proper validation, spam protection, and a real success/error state. The prototype does not send anything.
- **Form fields:** focus state lightens background and sets a light-blue (`#8fb4e6`) border.
- **Responsive:** at ≤960px nav hides (needs a mobile menu in production), hero/why/area/contact collapse to 1 column, hero media moves above copy, trust strip → 2 cols, services → 2 cols. At ≤600px services/form/cities → 1 col, header CTA button hides.

## State Management
Minimal — this is largely static. The only stateful UI:
- **Property type** selection (Residential | Commercial) — one enum value.
- **Form values** (name, phone, email, city, service, property type, message) + a **submitted** boolean to toggle the success state.
- **Form validation** errors per required field.
Implement with whatever the target framework uses (e.g. `useState` + a form library in React).

## Design Tokens
All defined as CSS custom properties in `kodiak.css` `:root` (default "Faithful" palette):

**Colors**
| Token | Value | Use |
|---|---|---|
| `--ink` | `#15181f` | primary text, dark bands |
| `--ink-soft` | `#3c4250` | secondary text |
| `--blue` | `#2c66b2` | accent (matches logo) |
| `--blue-deep` | `#1c4886` | accent hover / eyebrows |
| `--paper` | `#f7f5ee` | page background |
| `--paper-2` | `#efece1` | alt section background |
| `--card` | `#fffefa` | service card background |
| `--line` | `rgba(21,24,31,0.14)` | hairline rules |
| `--line-strong` | `rgba(21,24,31,0.32)` | media borders |
| footer bg | `#0c0f15` | — |
| light blue (on dark) | `#8fb4e6` | bullets, focus, captions on dark |
| error border | `#e0856b` | invalid field |

Two alternate palettes are defined as `[data-theme="steel"]` and `[data-theme="water"]` (a deeper steel-blue, and a pool-water teal accent). These were exploration options via the Tweaks panel — **pick one palette for production** (default is "Faithful"). Token values for each are in `kodiak.css`.

**Typography** (Google Fonts)
- Display / headings: **Bodoni Moda** (`--font-display`), weights 400–900. Chosen to match the card's high-contrast serif. Headings use `line-height: 1.02`, `letter-spacing: -0.01em`; the big hero display uses `line-height: 0.92`, weight 900.
- Body / UI: **Hanken Grotesk** (`--font-text`), weights 400–800. Body `line-height: 1.6`.
- Script accent: **Pinyon Script** (`--font-script`) — only for the "Craftsmanship is back" tagline.
- Eyebrows/labels: text font, 700, ~0.72rem, `letter-spacing: 0.32em`, uppercase.
- (The Tweaks panel also offered Playfair Display / Marcellus / DM Serif as headline alternatives and Mulish / Work Sans as body alternatives — ignore unless you want to A/B; Bodoni Moda + Hanken Grotesk is the intended pairing.)

**Spacing / structure**
- `--maxw: 1240px`, `--gutter: clamp(20px, 5vw, 72px)`.
- Section vertical padding: `clamp(64px, 9vw, 128px)`.
- `--radius: 2px` (square/heritage). A "soft" option of 14px exists via `[data-corners="soft"]` — prototype only.

**Shadows / borders**
- Hero media stacked-card shadow: `26px 26px 0 -2px var(--paper-2), 26px 26px 0 -1px var(--line)`.
- Most separators are 1px solid `--line` hairlines rather than shadows.

## Assets
- **`assets/kodiak-logo.png`** — the bear-shield logo, **transparent background**, 1004×952, blue (#2c66b2-ish) + black. This was **extracted and cleaned from the client's business-card photo** (de-skewed, posterized to two flat brand colors, background knocked out). It is a raster cleanup of a low-res source, **not a true vector**. **Recommendation:** have the client supply the original vector/high-res logo, or commission a vector redraw, before launch. Used at: header (44px), hero watermark (faint, large), footer (88px on a cream plate).
- **Footer logo note:** the logo's bear is black, so on the dark footer it's placed on a **cream plate** (`background: var(--paper)` + padding + radius) so all detail reads. Do the same anywhere the logo sits on a dark background — do **not** use a flat single-color silhouette (it loses the bear).
- **`card-front.jpeg` / `card-back.jpeg`** — the original business cards, included for brand reference (logo, fonts, taglines, services, contact info).
- **No photography yet.** Hero and service-area map are placeholders the client will fill. Provide real images in production.

**Brand facts (from the cards)**
- Business: Kodiak Pools and Spas, LLC · Owner: Todd Crane · ROC #309965
- Phone: 602.399.4037 · Email: KodiakPoolsandSpas@gmail.com
- Address: 8194 W Deer Valley Rd, Suite 106 PMB218, Peoria, AZ 85383
- Taglines: "Craftsmanship is Back" · "crafts·man·ship — a person who is highly skilled in their craft or trade"
- Positioning: Expert Pool Service, Installation & Repair · Residential & Commercial · Home-Warranty Specialist

## Prototype-only pieces (do NOT ship)
- **`tweaks-panel.jsx` + `tweaks-app.jsx`** — an in-prototype control panel (React + in-browser Babel) for toggling palette/fonts/corners during design review. Not for production. The intended production choices: "Faithful" palette, Bodoni Moda + Hanken Grotesk, 2px corners.
- **`image-slot.js`** — a drag-and-drop image placeholder web component used so the client can preview their own photos in the prototype. Replace every `<image-slot>` with a real `<img>`/picture element in production.
- The **in-browser Babel** + unpkg React CDN scripts — remove entirely.

## Files
- `Kodiak Pools and Spas.html` — the page markup (sections, copy, form).
- `kodiak.css` — the full design system + layout (all tokens, all section styles, responsive rules).
- `tweaks-app.jsx`, `tweaks-panel.jsx`, `image-slot.js` — prototype-only (see above).
- `assets/kodiak-logo.png` — cleaned logo.
- `card-front.jpeg`, `card-back.jpeg` — brand reference.
- `screenshots/` — rendered reference images of the design: `01-hero.png`, `02-services.png`, `03-why-kodiak.png`, `04-service-area.png`, `05-contact.png`, `06-footer.png`. (Captured at ~1280px desktop width; image/map areas show empty placeholders to be filled with real photos.)
