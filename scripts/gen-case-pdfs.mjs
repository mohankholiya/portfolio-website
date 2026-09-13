/**
 * Render the six consulting one-pagers in `new case study/` to A4-landscape PDFs
 * in public/case-studies/, one per case study route.
 *
 * Generating from the HTML rather than reusing the PDFs that already exist
 * elsewhere is deliberate: those are image-only scans with no text layer, and
 * their filenames do not map to the site's slugs. Rendering here makes the
 * mapping correct by construction and produces selectable, searchable text.
 *
 * The one-pagers reference the same four woff2 files the site self-hosts in
 * public/fonts/, under the same names, so those are copied next to the page
 * before printing and the @font-face block is used as authored. No network.
 */
import puppeteer from 'puppeteer-core';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'new case study');
const FONTS = path.join(ROOT, 'public', 'fonts');
const OUT = path.join(ROOT, 'public', 'case-studies');

/**
 * Source one-pager filename -> case study id in src/content/site.ts.
 * These are live URLs; keep them in step with the `caseStudies` ids and with
 * public/_redirects, never rename one in isolation.
 */
const MAP = {
  'capital-cost-competitiveness': 'capital-cost-competitiveness',
  'unit-rate-governance': 'unit-rate-governance',
  'supply-chain-benchmarking': 'supply-chain-benchmarking',
  'bt-contract-renewal': 'bt-contract-renewal',
  'accenture-capex-sourcing': 'accenture-capex-sourcing',
  'category-intelligence': 'category-intelligence',
};

const FONT_FILES = [
  'archivo-var.woff2',
  'source-sans-3-var.woff2',
  'plex-mono-400.woff2',
  'plex-mono-500.woff2',
];

const TMP = mkdtempSync(path.join(tmpdir(), 'mk-case-pdfs-'));
mkdirSync(path.join(TMP, 'fonts'), { recursive: true });
for (const f of FONT_FILES) copyFileSync(path.join(FONTS, f), path.join(TMP, 'fonts', f));
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

for (const [stem, slug] of Object.entries(MAP)) {
  const raw = readFileSync(path.join(SRC, `${stem}.html`), 'utf8');
  const tmpFile = path.join(TMP, `${slug}.html`);
  writeFileSync(tmpFile, raw, 'utf8');

  const page = await browser.newPage();
  await page.goto(pathToFileURL(tmpFile).href, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);

  // Fail loudly rather than shipping a PDF silently set in a fallback face.
  const loaded = await page.evaluate(() =>
    ['Archivo', 'Source Sans 3', 'IBM Plex Mono'].filter((f) =>
      document.fonts.check(`12px "${f}"`),
    ),
  );
  if (loaded.length !== 3) {
    throw new Error(`${slug}: expected 3 webfonts, loaded ${loaded.length} (${loaded.join(', ')})`);
  }

  const target = path.join(OUT, `${slug}.pdf`);
  await page.pdf({
    path: target,
    width: '297mm',
    height: '210mm',
    printBackground: true,
    pageRanges: '1',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await page.close();

  const title = /<title>(.*?)\s+—/.exec(raw)?.[1] ?? '';
  console.log(`  ${slug}.pdf  <- ${stem}.html   "${title}"`);
}

await browser.close();
rmSync(TMP, { recursive: true, force: true });
console.log('\ndone');
