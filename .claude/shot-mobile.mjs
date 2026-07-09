import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://127.0.0.1:4321/';
const OUT = '.claude/shots';
mkdirSync(OUT, { recursive: true });

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-device-scale-factor=1'],
});

// Section crops at mobile width (390px = iPhone 14)
async function crop(name, selector) {
  const page = await b.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1200));
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    document.getElementById('page-loader')?.classList.add('done');
  });
  await new Promise(r => setTimeout(r, 400));
  const el = await page.$(selector);
  if (el) {
    await el.screenshot({ path: `${OUT}/mobile-${name}.png` });
    console.log(`crop mobile-${name}.png`);
  } else {
    console.log(`SKIP ${name} — selector not found: ${selector}`);
  }
  await page.close();
}

await crop('hero', '#hero');
await crop('case', '#case-studies');
await crop('experience', '#experience');
await crop('credentials', '#credentials');
await crop('contact', '#contact');

await b.close();
console.log('done');
