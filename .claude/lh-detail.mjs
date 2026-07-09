import puppeteer from 'puppeteer-core';
import lighthouse from 'lighthouse';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.argv[2] || 'http://127.0.0.1:4321/';
const PORT = 9223;

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: [`--remote-debugging-port=${PORT}`, '--no-sandbox', '--disable-setuid-sandbox'],
});

const result = await lighthouse(URL, {
  port: PORT, output: 'json', logLevel: 'error',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
});

const audits = result.lhr.audits;
for (const id of ['color-contrast', 'label-content-name-mismatch', 'image-delivery-insight', 'render-blocking-insight', 'largest-contentful-paint-element']) {
  const a = audits[id];
  if (!a) continue;
  console.log(`\n===== ${id} =====`);
  console.log(a.title, '—', a.displayValue ?? '');
  const items = a.details?.items ?? [];
  for (const it of items.slice(0, 12)) {
    console.log(JSON.stringify(it.node?.snippet ?? it.node?.selector ?? it.url ?? it, null, 0).slice(0, 300));
  }
}
await b.close();
