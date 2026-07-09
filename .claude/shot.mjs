import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://127.0.0.1:4321/';
const OUT = '.claude/shots';
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.connect({
  browserWSEndpoint: undefined,
}).catch(() => null);

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-device-scale-factor=1'],
});

async function shoot(name, width, height, fullPage) {
  const page = await b.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });
  // let fonts settle
  await new Promise(r => setTimeout(r, 1200));
  // force reveals visible so screenshots aren't blank
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    document.getElementById('page-loader')?.classList.add('done');
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage });
  console.log(`shot ${name}.png  (${width}x${height} fullPage=${fullPage})`);
  await page.close();
}

await shoot('desktop-full', 1440, 900, true);
await shoot('mobile-full', 375, 812, true);

// Section crops at desktop
async function crop(name, selector, width = 1440) {
  const page = await b.newPage();
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1200));
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    document.getElementById('page-loader')?.classList.add('done');
  });
  await new Promise(r => setTimeout(r, 400));
  const el = await page.$(selector);
  if (el) {
    await el.screenshot({ path: `${OUT}/${name}.png` });
    console.log(`crop ${name}.png`);
  } else {
    console.log(`SKIP ${name} — selector not found: ${selector}`);
  }
  await page.close();
}

await crop('desktop-hero', '#hero');
await crop('desktop-case', '#case-studies');
await crop('desktop-experience', '#experience');
await crop('desktop-competencies', '#competencies');
await crop('desktop-credentials', '#credentials');
await crop('desktop-testimonials', '#testimonials');

await b.close();
console.log('done');
