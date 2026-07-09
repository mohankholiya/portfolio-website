import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const HOME = 'http://localhost:4321/';

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

function fail(msg) { console.log('FAIL:', msg); }
function pass(msg) { console.log('PASS:', msg); }

const page = await b.newPage();
await page.setViewport({ width: 390, height: 844 }); // mobile, per the bug report

// Scroll every .reveal element individually into view with real settle time,
// far more reliable than blind scrollBy jumps for driving IntersectionObserver.
async function revealEverything() {
  const count = await page.evaluate(() => document.querySelectorAll('.reveal').length);
  for (let i = 0; i < count; i++) {
    await page.evaluate((idx) => {
      const el = document.querySelectorAll('.reveal')[idx];
      el.scrollIntoView({ block: 'center' });
    }, i);
    await new Promise(r => setTimeout(r, 150));
  }
  await new Promise(r => setTimeout(r, 800)); // let the last fadeUp animation finish
}

const countHiddenReveals = () => page.evaluate(() => {
  const rendered = Array.from(document.querySelectorAll('.reveal'))
    .filter(el => el.getClientRects().length > 0 && el.offsetParent !== null);
  const hidden = rendered.filter(el => parseFloat(getComputedStyle(el).opacity) < 0.05);
  return { total: rendered.length, hidden: hidden.map(el => el.className) };
});

await page.goto(HOME, { waitUntil: 'networkidle0', timeout: 60000 });
await new Promise(r => setTimeout(r, 1500));
await revealEverything();
let r1 = await countHiddenReveals();
r1.hidden.length === 0
  ? pass(`home first load: all ${r1.total} .reveal sections visible`)
  : fail(`home first load: ${r1.hidden.length}/${r1.total} still invisible: ${r1.hidden.join(' | ')}`);

// Navigate into a case study, then back — the reported bug path
const href = await page.evaluate(() => {
  const a = document.querySelector('a[href^="/case-studies/"]');
  return a ? a.getAttribute('href') : null;
});
if (!href) { fail('no case-study link found on home'); await b.close(); process.exit(1); }

await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 60000 }).catch(() => {}),
  page.evaluate((h) => document.querySelector(`a[href="${h}"]`).click(), href),
]);
await new Promise(r => setTimeout(r, 800));

await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 60000 }).catch(() => {}),
  page.evaluate(() => document.querySelector('a[href="/"]').click()),
]);
await new Promise(r => setTimeout(r, 1200));

await revealEverything();
const r2 = await countHiddenReveals();
r2.hidden.length === 0
  ? pass(`after case-study -> back: all ${r2.total} .reveal sections visible (bug fixed)`)
  : fail(`after case-study -> back: ${r2.hidden.length}/${r2.total} still invisible (bug reproduced): ${r2.hidden.join(' | ')}`);

// Contact form and filter tabs should still be wired up after the swap
const filterWorks = await page.evaluate(() => {
  const btn = document.querySelector('[data-filter="energy"]');
  if (!btn) return null;
  btn.click();
  const wrappers = Array.from(document.querySelectorAll('.card-wrapper[data-sector]'));
  const visible = wrappers.filter(w => w.style.display !== 'none');
  return visible.length > 0 && visible.every(w => w.dataset.sector === 'energy');
});
filterWorks ? pass('case-study filter tabs still work after swap') : fail('case-study filter tabs broken after swap');

await b.close();
console.log('done');
