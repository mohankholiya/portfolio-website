# Mohan Kholiya — Portfolio Website

Source for **[mohankholiya.co.in](https://mohankholiya.co.in)** — the personal portfolio of Mohan Kholiya, a procurement and supply chain leader with 16+ years across energy, oil & gas, utilities, and telecom.

The site is a credibility-first brochure site, not an app. It exists to support senior leadership roles and consulting engagements across India, the GCC, and globally. Every design and copy decision is made for a senior, time-poor evaluator: restraint and substance over decoration.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | [Astro 6](https://astro.build) — static output, zero client framework |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite` |
| Language | TypeScript (`astro/tsconfigs/strict`) |
| Hosting | Cloudflare Pages + custom domain |
| Fonts | Archivo (display), Source Sans 3 (body), IBM Plex Mono (data) — loaded non-render-blocking |

No UI framework, no component library, no analytics SDK. The only runtime JavaScript is a handful of small inline scripts (scroll reveal, nav state, loader, chart animation) plus Astro's `ClientRouter` for view transitions.

**Notable build choice:** `astro.config.mjs` sets `inlineStylesheets: 'always'`. Astro only auto-inlines sheets under 4 KB; this one is ~36 KB (~8 KB gzipped). Inlining removes a render-blocking request and improves FCP/LCP, which is worth the small HTML-size penalty on a site where each page ships one sheet.

---

## Project structure

```
.
├── src/
│   ├── pages/
│   │   ├── index.astro              # the single-page site
│   │   └── case-studies/            # six case study detail pages
│   ├── layouts/
│   │   ├── BaseLayout.astro         # <head>, SEO, OG/Twitter, JSON-LD Person schema
│   │   └── CaseStudyLayout.astro    # shared shell for case study pages
│   ├── components/                  # Nav, Hero, About, CaseStudies, Experience,
│   │                                # Competencies, Credentials, Testimonials,
│   │                                # Contact, Footer, CaseStudyCard
│   ├── content/
│   │   └── site.ts                  # ← all site content lives here
│   ├── styles/
│   │   └── global.css               # design tokens + component classes
│   └── assets/
├── public/
│   ├── resume.pdf                   # résumé download target
│   ├── images/headshot.jpeg
│   └── favicon.svg
├── case study/                      # source HTML/MD the case study pages were built from
├── brand assets/                    # headshot and résumé originals
├── .claude/                         # local QA scripts (Lighthouse, screenshots, verifiers)
├── .agents/skills/                  # Tailwind 4 + web design reference material
├── DESIGN.md                        # design system and rationale
├── claude.md.md                     # project brief and content rules
└── astro.config.mjs
```

---

## Site structure

Single page with sticky nav and anchor links, plus six case study sub-pages.

| Section | Anchor | Content |
|---|---|---|
| Hero | — | Positioning line, career stats, board-pack headline metrics |
| About | `#about` | Background, sectors, approach |
| Case Studies | `#case-studies` | Six engagements, each expanding to a detail page |
| Experience | `#experience` | Career history — employers named, end-clients anonymised |
| Competencies | `#competencies` | Core capability areas |
| Credentials | `#credentials` | Education, certifications, career footprint |
| Testimonials | `#testimonials` | Peer and stakeholder references |
| Contact | `#contact` | Email and LinkedIn |

Persistent CTAs in nav and footer: **Email**, **LinkedIn**, **Download résumé**.

### Case studies

| Slug | Sector | Engagement |
|---|---|---|
| `ntgm-cost-competitiveness` | Energy & O&G | Independent cost competitiveness review for a near-term gas development |
| `unit-rate-governance` | Utilities | Unit-rate governance & contracting strategy for a $233M contractor programme |
| `supply-chain-benchmarking` | Utilities | Supply chain workforce benchmarking & operating model assessment |
| `category-intelligence` | Energy & Utilities | Category intelligence for two opposite markets: Lighting and E-STATCOM |
| `bt-contract-renewal` | Telecom | Service delivery contract renewal & total cost optimisation — BT Group |
| `accenture-capex-sourcing` | Energy & O&G | End-to-end capex sourcing & category management for an Indian E&P operator |

Each follows **Challenge → Approach → Impact**, with a short summary on the home page and full detail on its own route.

---

## Content model

Almost all editable copy lives in a single typed module, `src/content/site.ts`:

| Export | Drives |
|---|---|
| `siteConfig` | Name, title, meta description, canonical URL, email, phone, location, LinkedIn, résumé path |
| `navLinks` | Sticky nav items |
| `heroStats` | The three quick facts (years, sectors, continents) |
| `heroMetrics` | Headline metrics strip |
| `caseStudies` | Case study cards — id, sector, headline, metric, description, tags |
| `experience` | Career history entries |
| `competencies` | Capability areas |
| `credentials` | Education and certifications |

To change a metric, a tag, or the positioning line, edit `site.ts` — not the components. Case study *detail* copy lives in the individual pages under `src/pages/case-studies/`.

---

## Local development

Requires Node 20+ (developed on Node 24).

```bash
npm install
npm run dev
```

Open <http://localhost:4321>.

### Build and preview

```bash
npm run build    # astro check (type-check) + astro build → /dist
npm run preview  # serve the built /dist locally
```

`npm run build` runs `astro check` first, so a type error fails the build rather than shipping.

---

## Deployment

Hosted on **Cloudflare Pages** by direct upload — there is no GitHub-triggered build. GitHub is the source of truth for code; Cloudflare receives a pre-built `/dist`.

A `post-commit` git hook runs the whole pipeline on every commit:

1. `git push origin master` — push source to GitHub
2. `npm run build` — compile to `/dist`
3. `npx wrangler pages deploy dist --project-name mohan-kholiya-portfolio --branch main` — deploy to production

The custom domain reflects the change within roughly 20 seconds.

> **Note:** because the hook is wired to `post-commit`, *any* commit on this repo pushes and deploys to production. There is no staging step.

### Manual deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name mohan-kholiya-portfolio --branch main
```

The hook lives in `.git/hooks/post-commit`, which git does not track — it must be recreated after a fresh clone.

---

## Quality bar

A change ships only when all of the following hold:

- **No placeholder text or metrics anywhere** — no `[X]`, no lorem ipsum, no blank tiles. Every figure is real, an honest approximation (`~$12M`, `30%+`), or qualitative. A visible placeholder destroys credibility for the whole page.
- **Lighthouse 90+** on Performance, Accessibility, Best Practices, and SEO.
- **WCAG 2.1 AA** — semantic landmarks, alt text, visible keyboard focus, sufficient contrast.
- **Fully keyboard navigable**, including the case study links and nav.
- **Renders correctly at 375px, 768px, and 1440px.**
- **All links work** — email, LinkedIn, résumé download, internal anchors.

Content conventions: end-client names stay masked ("a global E&P operator", "a U.S. energy utility"); employer names are stated, since they are already public. Tone is senior, precise, and understated — consulting-native vocabulary, no hype.

### QA helpers

Local scripts in `.claude/` support the checks above:

| Script | Purpose |
|---|---|
| `lh.mjs` / `lh-detail.mjs` | Lighthouse runs against the home and detail pages |
| `shot.mjs` / `shot-mobile.mjs` | Desktop and mobile screenshots |
| `verify-loader.mjs` | Confirms the loading screen clears, including on view-transition return |
| `verify-reveal.mjs` | Confirms scroll-reveal elements become visible |

---

## Conventions

- Semantic HTML5 with proper landmarks (`header`, `nav`, `main`, `section`, `footer`).
- Mobile-first responsive; ARIA only where semantics fall short.
- Short imperative commit subjects (e.g. `Add expandable case-study detail`).
- `workspace/` and `graphify-out/` are gitignored deliberately — the former was once an accidental submodule that broke builds.

---

## Contact

**Mohan Kholiya** — Gurugram, India
[mohan.kholiya@gmail.com](mailto:mohan.kholiya@gmail.com) · [LinkedIn](https://www.linkedin.com/in/mohankholiya/)

---

© Mohan Kholiya. Site content and case study material are personal professional work; not licensed for reuse.
