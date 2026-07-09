import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const HOME = 'http://127.0.0.1:4321/';

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

function fail(msg) { console.log('FAIL:', msg); }
function pass(msg) { console.log('PASS:', msg); }

const page = await b.newPage();
await page.setViewport({ width: 1280, height: 800 });

// helper: is the loader currently blocking the page?
const loaderBlocking = () => page.evaluate(() => {
  const l = document.getElementById('page-loader');
  if (!l) return false; // no loader at all = not blocking
  const s = getComputedStyle(l);
  const blocking = s.display !== 'none'
    && s.visibility !== 'hidden'
    && parseFloat(s.opacity) > 0.01;
  return blocking;
});

// 1. First visit to home — loader may flash, then must clear
await page.goto(HOME, { waitUntil: 'networkidle0', timeout: 60000 });
await new Promise(r => setTimeout(r, 1500)); // allow the 760ms dismiss + fade
let blocking = await loaderBlocking();
blocking ? fail('loader still blocking on first home load') : pass('home first load: loader cleared');

// 2. Click into the first case study
const href = await page.evaluate(() => {
  const a = document.querySelector('a[href^="/case-studies/"]');
  return a ? a.getAttribute('href') : null;
});
if (!href) { fail('no case-study link found on home'); await b.close(); process.exit(1); }
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 60000 }).catch(() => {}),
  page.evaluate((h) => {
    const a = document.querySelector(`a[href="${h}"]`);
    a.click();
  }, href),
]);
await new Promise(r => setTimeout(r, 800));
const onCase = page.url().includes('/case-studies/');
onCase ? pass(`navigated into case study (${page.url().replace('http://127.0.0.1:4321','')})`) : fail('did not land on case study');

// 3. Click "Back to Portfolio" — the reported bug path
await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 60000 }).catch(() => {}),
  page.evaluate(() => {
    const back = document.querySelector('a[href="/"]');
    back.click();
  }),
]);
await new Promise(r => setTimeout(r, 1200));
const backHome = page.url().replace(/\/$/, '') === HOME.replace(/\/$/, '');
backHome ? pass('returned to home') : fail(`unexpected url after back: ${page.url()}`);
blocking = await loaderBlocking();
blocking ? fail('>>> loader STUCK after returning home (bug reproduced)') : pass('>>> home NOT blocked by loader after return (bug fixed)');

// 4. Confirm the page is actually interactive (hero headline visible & clickable region)
const heroVisible = await page.evaluate(() => {
  const h = document.getElementById('hero-headline');
  if (!h) return false;
  const r = h.getBoundingClientRect();
  const topEl = document.elementFromPoint(r.left + 5, r.top + 5);
  return !!topEl && (topEl === h || h.contains(topEl)); // loader not on top
});
heroVisible ? pass('hero is the top element (page interactive)') : fail('something still overlays the hero');

await b.close();
console.log('done');
