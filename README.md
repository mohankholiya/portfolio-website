# Mohan Kholiya Portfolio

Source for [mohankholiya.co.in](https://mohankholiya.co.in), supporting senior-role hiring and independent consulting enquiries.

## Stack and content

Astro 6, TypeScript and Tailwind 4. Static output, native browser scripts, self-hosted fonts, and an optimised responsive portrait. No client framework, tracking SDK or page loader.

- `src/content/site.ts`: positioning, capabilities, case studies, career history and credentials.
- Homepage: two hiring tracks, About directly after the introduction, **all six case studies**, capabilities, experience, one resume, credentials and contact.
- `/case-studies/`: the same six studies with sector filters, for readers who want to narrow by sector. Existing detail URLs are preserved.
- `/privacy/`, `/sitemap.xml`, `/robots.txt` and a custom 404.
- `public/resume.pdf`: the single resume offered on the site. Do not split it into role-specific variants; one document, one download URL.

Case-study order is the display order. `caseStudies` in `site.ts` leads with capital benchmarking, then the identified opportunity, then the operating-model diagnostic, and the "next case" link on each detail page follows the same sequence.

Outcomes distinguish contracted optimisation, sourcing savings, identified opportunity and decision support. Do not aggregate different currencies, portfolio scopes or opportunity stages. The BT waterfall is synthetic, not an actual contract baseline. Consulting end-clients are anonymised.

## Portfolio presentation and exhibits

The name-based header supports a restrained professional presentation. The early introduction and visible project evidence adapt structural patterns from [Brittany Chiang](https://brittanychiang.com/) and [Tobias van Schneider](https://vanschneider.com/); their code, artwork and personal branding are not copied.

Typography runs on three voices, each with one job: **Archivo** for headlines and figures, **Source Sans 3** for reading copy, **IBM Plex Mono** for anything that is data (eyebrows, axis ticks, chart labels, scope metadata). All four faces are self-hosted from `public/fonts`; nothing is fetched from a font CDN.

### Audience

The site is written for **recruiters and hiring managers**. It presents capability areas, not services for sale, and carries no availability, rate or expert-network signalling, because to a hiring manager those read as a competing commitment. Changes to `copy.capabilities` or `copy.contact.types` should preserve that.

### Exhibits and chart discipline

Each case opens with an analytical exhibit in `CaseExhibit.astro`: a total-cost bridge, the opportunity-versus-programme comparison, a category-sourcing map, a peer-set comparison, a workload/capacity decision matrix and a category positioning matrix. Each home-page case card carries a matching mini spark in `CaseStudyCard.astro`.

One grammar holds across every figure:

- `--series-subject` (copper) is always the finding; `--series-context` (petrol) is always the comparison. Never swapped, never cycled. The pair is validated for colour-vision deficiency separation and for 3:1 contrast against the chart surface.
- Numeric charts state their units and start at zero. Shared-scale comparisons use one axis; there are no dual-axis charts.
- Every figure is either stated in that case study or derived from two figures that are. Derived values say so. The capacity and category matrices are qualitative and their axes carry no numeric scale. The BT bridge uses labelled synthetic data. The capital peer counts of 18 and 27 come from the project snapshot. **Where a case has no defensible ratio, the exhibit shows the shape of the analysis rather than inventing a proportion** — no staffing performance or category-level savings breakdown is fabricated.

## Development and checks

Use Node 22.12+ or Node 24, consistent with Astro 6.

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run check          # static: links, metadata, share card, fonts, PDFs, colour contrast
npm run preview
```

Browser checks run against the built site. Serve `dist/` on port 4399 first, then:

```bash
cd dist && python3 -m http.server 4399 --bind 127.0.0.1 &
npm run check:browser
```

| Script | What it guarantees |
| --- | --- |
| `scripts/check-build.py` | 10 pages, one H1 each, canonical and description present, `og:image` and `summary_large_image` present, every internal link and fragment resolves, PDFs and all four fonts are valid, the retired-slug redirect survives |
| `scripts/check-contrast.py` | Every text/background pair used on the site meets WCAG AA (4.5:1 text, 3:1 chart marks and baselines) |
| `scripts/responsive-audit.mjs` | No horizontal overflow and no undersized tap targets at 375, 768, 1024 and 1440, with real device emulation |
| `scripts/check-keyboard.mjs` | Visible focus on every tabbable element, plus the no-JS, reduced-motion, **print** and full-scroll states |

Two notes worth keeping:

- Headless Chrome's `--window-size` does **not** set the layout viewport. `--screenshot` will silently crop an 800px layout to the width you asked for, so every "mobile" screenshot looks broken in the same misleading way. Use `responsive-audit.mjs`, which drives real emulation.
- Scroll reveal never fires in print media. `@media print` must neutralise both the opacity **and** the transition, or a recruiter saving the page as a PDF gets blank sections. `check-keyboard.mjs` asserts this.

None of this replaces a real enquiry-delivery test after deployment.

## Enquiry delivery

Without configuration, **Prepare email** opens a mail draft. Nothing is sent automatically. A direct email link remains visible.

To enable Web3Forms delivery, set `PUBLIC_WEB3FORMS_ACCESS_KEY` in the build environment and rebuild. This provider's public form key is embedded in the HTML by design; never substitute a private account credential. Verify delivery after deployment. Errors preserve the visitor's message and offer the direct email route.

## Cloudflare publishing

This is **Cloudflare Pages Direct Upload**, not a GitHub-triggered build. Pushing or merging source does not publish the site.

After authenticating with Cloudflare, deploy to the existing project:

```bash
npm run build
python3 scripts/check-build.py
npx wrangler pages deploy dist --project-name mohan-kholiya-portfolio --branch main
```

The repository default branch is `master`; the existing Pages production branch is `main`. Confirm the target in Cloudflare before deploying. Alternatively upload the contents of `dist/` as a production deployment in the existing Pages project. Do not upload the source tree or private environment files.

An earlier README described a local post-commit deployment hook. Hooks are not tracked by Git and are not installed by this repository. Publishing should be deliberate and follow validation.

## Resume maintenance

`public/resume.pdf` is an authored document, not a generated one. To update it, replace the file and rebuild; the download URL never changes.

The site offers exactly one resume. An earlier revision generated two role-specific variants via `scripts/generate-resumes.py`, and that script has been removed because it would silently overwrite the authored PDF. It remains in Git history if the approach is ever wanted back.

Fonts are distributed with their licences in `public/fonts/`.
