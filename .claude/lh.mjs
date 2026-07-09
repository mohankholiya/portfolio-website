import puppeteer from 'puppeteer-core';
import lighthouse from 'lighthouse';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.argv[2] || 'http://127.0.0.1:4321/';
const PORT = 9222;

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: [`--remote-debugging-port=${PORT}`, '--no-sandbox', '--disable-setuid-sandbox'],
});

const result = await lighthouse(URL, {
  port: PORT,
  output: 'json',
  logLevel: 'error',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
});

const c = result.lhr.categories;
const line = (k) => `${k.padEnd(16)} ${Math.round((c[k].score ?? 0) * 100)}`;
console.log('=== Lighthouse ===', URL);
for (const k of ['performance', 'accessibility', 'best-practices', 'seo']) console.log(line(k));

// Surface failing/notable audits
const audits = result.lhr.audits;
const fails = Object.values(audits)
  .filter(a => a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'informative')
  .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
  .slice(0, 25);
console.log('\n=== Notable audits (score < 1) ===');
for (const a of fails) {
  const val = a.displayValue ? ` (${a.displayValue})` : '';
  console.log(`- [${Math.round((a.score ?? 0) * 100)}] ${a.id}${val}: ${a.title}`);
}

await b.close();
