# Mohan Kholiya — Portfolio Website

Personal portfolio for Mohan Kholiya, a senior procurement and supply chain leader with 16+ years across energy, oil & gas, utilities, and telecom. Built to support senior leadership roles and consulting engagements across India, the GCC, and globally.

Live at **[mohankholiya.co.in](https://mohankholiya.co.in)**

---

## Tech Stack

- [Astro 6](https://astro.build) — static site framework
- [Tailwind CSS 4](https://tailwindcss.com) — utility-first styling
- TypeScript
- Cloudflare Pages — hosting and CDN

---

## Site Structure

Single-page with sticky nav and anchor links:

| Section | Description |
|---|---|
| Hero | Positioning statement and career stats |
| About | Background, sectors, and approach |
| Case Studies | Six anonymised client engagements with SVG analysis charts |
| Competencies | Core capability areas |
| Credentials | Education, certifications, and career footprint |
| Contact | Email and LinkedIn CTA |

### Case Studies

| Slug | Title |
|---|---|
| `ntgm-cost-competitiveness` | Independent cost competitiveness review — near-term gas development |
| `unit-rate-governance` | Unit-rate governance & contracting strategy — $233M contractor programme |
| `supply-chain-benchmarking` | Supply chain workforce benchmarking & operating model assessment |
| `category-intelligence` | Category intelligence — Lighting and E-STATCOM |
| `bt-contract-renewal` | Service delivery contract renewal & total cost optimisation — BT Group |
| `accenture-capex-sourcing` | End-to-end capex sourcing & category management — Indian E&P operator |

---

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build & Preview

```bash
npm run build    # astro check + astro build → outputs to /dist
npm run preview  # serve /dist locally
```

---

## Deployment

Hosted on **Cloudflare Pages** (direct upload, no GitHub integration).

A `post-commit` git hook handles the full pipeline automatically on every commit:

1. `git push origin master` — pushes to GitHub
2. `npm run build` — compiles the Astro site into `/dist`
3. `npx wrangler pages deploy dist --project-name mohan-kholiya-portfolio --branch main` — deploys to production

The custom domain updates within ~20 seconds of each commit.

### Manual deploy (if needed)

```bash
npm run build
npx wrangler pages deploy dist --project-name mohan-kholiya-portfolio --branch main
```

---

## Content

All site content lives in `src/content/site.ts` (case study cards, credentials, competencies, hero stats). Case study detail pages are in `src/pages/case-studies/`.

Source HTML files for case studies are in `/case study/` at the project root.
