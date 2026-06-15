# CLAUDE.md — Personal Portfolio Website

Shared context for every session. Read this file in full before doing anything. If a request conflicts with this file, follow this file and flag the conflict.

---

## Always Do First

- **Read this entire file** at the start of every session.  
- **Invoke the `frontend-design` skill** before writing any frontend code — every session, no exceptions.  
- **Check `brand_assets/`** before designing. Use any real logo, headshot, or palette found there. Never invent brand colors or use placeholders where a real asset exists.  
- **Headshot:** canonical file is `brand_assets/headshot.*`. Always use the real image — never a placeholder avatar or initials fallback once this file exists. See headshot treatment spec in Section 4\.

---

## 1\. Project Overview & Goals

**Who:** Mohan Kholiya — procurement & supply chain leader, 16+ years across energy, oil & gas, utilities, and telecom, spanning global consulting advisory and in-house category ownership.

**One-line positioning:** "Procurement & supply chain leader who turns category strategy and supplier programs into measurable cost-out and resilience — across consulting and in-house roles."

**Primary goal:** Land senior procurement / supply-chain leadership roles (corporate *and* consulting) across global markets. Recruiter-facing first, with a clean on-ramp for GLG / Catalant–style consulting engagements.

**Primary audience (in priority order):**

1. Recruiters and hiring managers screening for senior procurement / category / supply-chain roles.  
2. Prospective consulting clients and expert-network buyers.  
3. Peers and collaborators.

**Success criteria:**

- A recruiter understands the positioning and sees one quantified win **within \~5 seconds** of landing.  
- Case studies communicate scale and outcome without naming any confidential client.  
- Clear, frictionless contact path (email, LinkedIn) above the fold and in the footer.  
- Lighthouse 90+ on Performance, Accessibility, Best Practices, SEO.

---

## 2\. Tech Stack & Constraints

**Committed stack (my recommendation — swap on request):**

- **Astro \+ Tailwind CSS.** Astro ships near-zero JS by default, which is the strongest fit for the hard Lighthouse / SEO / fast-load constraints below, while still allowing rich interactive "islands" exactly where motion earns its place.  
- **Motion:** GSAP \+ Lenis (smooth scroll) inside Astro islands. One optional `<canvas>`/Three.js or Spline hero island for the signature moment.  
- **Hosting:** **Vercel** (clean Astro deploys, preview URLs per branch, good DX).

**Strategic fork — decide before build:** If you want a full Bruno-Simon-style immersive WebGL experience as the *whole* site (not just one signature moment), switch to **Next.js \+ React Three Fiber \+ Framer Motion**. That buys maximum interactivity at the cost of a heavier bundle and more Lighthouse tuning. Default assumption is Astro/substance-first unless you say otherwise.

**Non-negotiables (every page, every PR):**

- Fully responsive, **mobile-first**.  
- **Lighthouse 90+** on all four categories.  
- **Accessible to WCAG 2.1 AA** — keyboard operable, visible focus, sufficient contrast, semantic landmarks, alt text, reduced-motion respected.  
- **SEO-friendly** — semantic HTML, one `<h1>` per page, meta \+ Open Graph \+ Twitter cards, sitemap, descriptive titles, JSON-LD `Person` schema.  
- **Fast load** — optimized/responsive images (AVIF/WebP), lazy-load below the fold, self-host fonts with `font-display: swap`, no render-blocking JS.

---

## 3\. Proposed Folder Structure

portfolio/

  CLAUDE.md

  README.md

  astro.config.mjs

  tailwind.config.mjs

  tsconfig.json

  package.json

  .gitignore

  brand\_assets/              ← logo, headshot, palette/style guide (source of truth)

    headshot.\*               ← professional photo; canonical source for all site usage

  public/

    favicon.svg

    og-image.png

    resume.pdf               ← downloadable, kept in sync with the site copy

    images/

  src/

    pages/

      index.astro            ← the one-page portfolio

    layouts/

      BaseLayout.astro       ← \<head\>, meta/OG/SEO, fonts, skip-link

    components/

      Nav.astro

      Hero.astro

      About.astro

      CaseStudyCard.astro

      CaseStudies.astro

      Competencies.astro

      Credentials.astro

      Contact.astro

      Footer.astro

      islands/               ← interactive (client:\*) components only

        SignatureHero.jsx    ← the single signature motion/WebGL moment

        ScrollReveal.jsx

    content/

      case-studies/          ← Markdown/MDX, one file per anonymized case study

      site.ts                ← central copy/config (nav, contact, meta)

    styles/

      tokens.css             ← design tokens (colors, type, spacing)

      global.css

    lib/

      seo.ts                 ← meta/OG/JSON-LD helpers

**Sections / information architecture:** Hero → About → Selected case studies → Core competencies → Credentials (MBA, MIT SCx certs, awards) → Contact. Optional *Insights / writing* strip if a thought-leadership angle is added later. **Do not add sections beyond these without approval.**

---

## 4\. Design Direction

**Reference sites (for spirit, not cloning):**

- `bruno-simon.com` — take: a single memorable signature interaction and fearless craft. Leave: the full-site 3D game (wrong for a substance-first exec audience).  
- `zachjordan.io` — take: smooth scroll, restrained tasteful motion layered over real content, confident modern type.

**Aesthetic:** Bold & modern, dark-leaning, motion-rich but **substance-first**. The work and the numbers are the hero; motion frames them, never competes with them.

**Headshot treatment (locked in):**

- **Placement:** About section only — not in the hero. Sits beside the positioning paragraph.  
- **Shape:** Circular crop.  
- **Border:** Clean single-ring border using the brand accent color, 2–3px, with a subtle color-tinted glow/shadow behind it (e.g. `box-shadow: 0 0 0 3px <accent>, 0 8px 32px <accent-at-low-opacity>`).  
- **Size:** \~200–240px diameter on desktop; \~160px on mobile. Never dominate the layout.  
- **Alt text:** `"Mohan Kholiya — Procurement & Supply Chain Leader"` (exact string, every time).  
- **Optimisation:** Export/convert to AVIF \+ WebP at build time; include a JPEG fallback `<source>` in a `<picture>` element. Never serve the raw camera file.  
- **Hard rule:** If `brand_assets/headshot.*` does not exist, use a `160×160` `placehold.co` circle with initials "MK" as a temporary stub — never omit the `<img>` element entirely.

**Anti-generic guardrails:**

- **Color:** Never use a default Tailwind palette swatch (indigo-500, blue-600, etc.) as the brand color. Pick one custom brand hue and derive tints/shades from it. Define everything as tokens in `tokens.css` / Tailwind theme — no hardcoded hex in components.  
- **Typography:** Pair two distinct families — a characterful display face used with restraint \+ a clean body face. Tight tracking (`-0.03em`) on large headings; generous line-height (`1.7`) on body. Never the same font for both.  
- **Shadows:** No flat `shadow-md`. Layered, color-tinted shadows at low opacity.  
- **Depth:** A real layering system (base → elevated → floating), not everything on one z-plane.  
- **Gradients/texture:** If used, layer radial gradients and add subtle SVG-noise grain for depth — sparingly.  
- **Signature element:** Exactly one memorable interaction. Spend boldness there; keep everything around it quiet and disciplined.

---

## 5\. Motion & Interaction Rules

- Animate **only `transform` and `opacity`**. Never `transition-all`.  
- Spring-style / eased timing (e.g. `cubic-bezier(0.22, 1, 0.36, 1)`), not linear.  
- Every clickable element has **hover, focus-visible, and active** states. No exceptions.  
- Honor `prefers-reduced-motion: reduce` — disable scrubbed/parallax motion and leave content fully visible and usable.  
- Interactive islands load lazily (`client:visible` / `client:idle`); never block first paint.

---

## 6\. Coding Conventions

- **Files:** Astro components `PascalCase.astro`; island components `PascalCase.jsx`; pages/routes `kebab-case`; helpers `camelCase.ts`.  
- **Component pattern:** Static content → `.astro`. Interactivity → an island in `components/islands/` with the narrowest possible `client:` directive. Keep islands small; push logic into `lib/`.  
- **Styling:** Tailwind utilities for layout/spacing; design tokens (CSS custom properties \+ Tailwind theme) for color/type. No magic numbers — use spacing tokens.  
- **Content:** All copy lives in `content/` (`site.ts` \+ per–case-study Markdown), never hardcoded in components, so future edits don't require touching markup.  
- **Accessibility baked in:** semantic elements, one `<h1>`, labelled controls, `alt` on every image, skip-to-content link.  
- **Commits:** Conventional Commits — `feat:`, `fix:`, `style:`, `refactor:`, `perf:`, `docs:`, `chore:`. One logical change per commit, imperative mood, ≤ \~72-char subject.

---

## 7\. Content & Copy Guidelines

- **Voice:** Confident, plain, outcome-first. Active voice. Specific over clever. No buzzword soup.  
- **Lead with the result.** Every case study and most bullets open with a quantified outcome (cost reduction, savings, cycle-time, downtime avoided), then the how.  
- **Confidentiality framework (hard rule):** Never name a consulting client. Use sector descriptors instead — e.g. "leading global E\&P company," "major North American utility," "leading upstream oil & gas operator, India." Operator-role metrics and portfolio sizes are safe to include.  
- **Keep it scannable:** short paragraphs, tight bullets (\~18–20 words), front-loaded metrics. A recruiter should grasp each case study from its headline \+ one stat alone.  
- **Consistency with the resume:** site copy and `resume.pdf` must tell the same story with the same numbers. If one changes, change both.  
- **Microcopy:** Buttons say exactly what happens ("View case study," "Email Mohan," "Download résumé"). Errors/empty states are directive, not decorative.

---

## 8\. Local Dev & Verify Workflow

The original workflow had machine-specific Puppeteer paths. Set yours once locally; the discipline below is what matters.

- **Always serve on localhost** and screenshot from `http://localhost:<port>` — never a `file:///` URL.  
- Start the dev server (`npm run dev`) in the background before screenshotting. Don't start a second instance if one is running.  
- Use a local headless-screenshot script (Puppeteer/Playwright). Configure the Chrome cache \+ script paths once for this machine in `README.md`; keep the script in project root and use it as-is.  
- **Compare against the design intent across at least 2 rounds.** Be specific: "heading is 32px but should be \~24px," "card gap is 16px, should be 24px." Check: spacing/padding, font size/weight/line-height, exact colors, alignment, border-radius, shadows, image sizing.  
- Stop only when no visible issues remain (or you say so). **Never stop after one screenshot pass.**

---

## 9\. Definition of Done (per task)

A task is done only when **all** of the following hold:

- [ ] Matches the agreed design direction; verified across ≥ 2 screenshot rounds.  
- [ ] Fully responsive from 320px up; no horizontal scroll or overflow.  
- [ ] Lighthouse 90+ on all four categories for the affected page.  
- [ ] Keyboard-navigable; visible focus; passes WCAG AA contrast; `prefers-reduced-motion` respected.  
- [ ] Semantic HTML, correct heading order, meta/OG/JSON-LD present and accurate.  
- [ ] All copy pulled from `content/`; no confidential client names anywhere.  
- [ ] Only `transform`/`opacity` animated; every interactive element has hover/focus/active.  
- [ ] No console errors/warnings; images optimized and appropriately sized. Headshot served via `<picture>` with AVIF \+ WebP sources and JPEG fallback; `alt` text is exact string per Section 4\.  
- [ ] Conventional-commit message written.

---

## 10\. Hard Rules

- Do **not** add sections, features, or content beyond the agreed IA without approval.  
- Do **not** use `transition-all`.  
- Do **not** use default Tailwind blue/indigo as the primary brand color.  
- Do **not** name confidential consulting clients — sector descriptors only.  
- Do **not** stop after a single screenshot pass.  
- Do **not** hardcode copy into components — it lives in `content/`.  
- **Propose the folder structure and wait for approval before building.**

