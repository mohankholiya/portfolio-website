# Mohan Kholiya Portfolio

Source for [mohankholiya.co.in](https://mohankholiya.co.in), supporting senior-role hiring and independent consulting enquiries.

## Stack and content

Astro 6, TypeScript and Tailwind 4. Static output, native browser scripts, self-hosted Archivo and Source Sans 3, and an optimised responsive portrait. No client framework, tracking SDK or page loader.

- `src/content/site.ts`: positioning, services, case studies, career history and credentials.
- Homepage: two audience routes, selected cases, services, experience, two resumes, about and contact.
- `/case-studies/`: all six studies with sector filters. Existing detail URLs are preserved.
- `/privacy/`, `/sitemap.xml`, `/robots.txt` and a custom 404.
- `public/resume.pdf`: consulting resume; original download URL retained.
- `public/Mohan_Kholiya_Industry_Resume.pdf`: industry resume.

Outcomes distinguish contracted optimisation, sourcing savings, identified opportunity and decision support. Do not aggregate different currencies, portfolio scopes or opportunity stages. The BT waterfall is synthetic, not an actual contract baseline. Consulting end-clients are anonymised.

## Development and checks

Use Node 22.12+ or Node 24, consistent with Astro 6.

```bash
npm ci
npm run dev
```

```bash
npm run build
python3 scripts/check-build.py
npm run preview
```

The build type-checks the site. The additional checker covers links, fragments, metadata, structured data, fonts and PDF downloads. It does not replace desktop/mobile browser QA or a real enquiry-delivery test.

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

The PDFs are editorially aligned with the site, with separate industry and advisory introductions. Uploaded source resumes are unchanged.

```bash
python3 scripts/generate-resumes.py
```

This optional authoring utility requires ReportLab, Node TypeScript stripping support and DejaVu Sans in `/usr/share/fonts/truetype/dejavu/`. It is not required to build the website. Render and inspect both PDFs after editing, then rebuild.

Fonts are distributed with their licences in `public/fonts/`.
