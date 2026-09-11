/**
 * Keyboard and no-JavaScript checks.
 *
 * The reveal animation hides content until an observer fires, so the no-JS
 * path is the one that can silently ship a blank page. This asserts both.
 */
import { chromium } from "playwright-core";

const BASE = process.argv[2] ?? "http://127.0.0.1:4399";
const browser = await chromium.launch({ channel: "chrome" });
const problems = [];

// 1. Every *reachable* focusable element must show a visible focus indicator.
// Elements inside a closed <details> or a [hidden] panel are display:none and
// cannot be tabbed to, so focusing them proves nothing; they are skipped and
// the collapsed mobile menu is instead opened and checked on its own pass.
// Focus must be driven by real Tab presses: a programmatic .focus() does not
// reliably match :focus-visible, which is what the site styles, so probing
// that way reports every element as unstyled.
for (const vp of [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 375, height: 812 },
]) {
  const page = await browser.newPage({ viewport: vp });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  // Open the collapsed menu so its links are genuinely in the tab order, and
  // stamp a unique id on every element so repeated link text ("Read case
  // study" appears three times) does not look like the tab order wrapping.
  await page.evaluate(() => {
    document.querySelector("details.mobile-nav")?.setAttribute("open", "");
    document
      .querySelectorAll("body *")
      .forEach((el, i) => el.setAttribute("data-kb", String(i)));
  });

  const bad = [];
  const seen = new Set();
  let checked = 0;

  for (let i = 0; i < 120; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        key: el.getAttribute("data-kb") ?? el.tagName,
        label: (el.textContent ?? el.tagName).trim().slice(0, 40),
        rendered: r.width > 0 && r.height > 0,
        outline: s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0,
        ring: s.boxShadow !== "none",
        underline: s.textDecorationLine.includes("underline"),
      };
    });
    if (!info) continue;
    if (seen.has(info.key)) break; // wrapped around the document
    seen.add(info.key);
    if (!info.rendered) continue;
    checked++;
    if (!info.outline && !info.ring && !info.underline) bad.push(info.label);
  }

  if (bad.length)
    problems.push(
      `[${vp.name}] no visible focus on ${bad.length}/${checked}: ${bad.join(" | ")}`,
    );
  else
    console.log(
      `PASS: [${vp.name}] tabbed ${checked} elements, every one shows a focus indicator.`,
    );
  await page.close();
}

// 2. With JavaScript disabled the page must still render its content.
{
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" });

  const hidden = await page.evaluate(() => {
    let invisible = 0;
    for (const el of document.querySelectorAll(".reveal")) {
      const s = getComputedStyle(el);
      if (parseFloat(s.opacity) < 0.5) invisible++;
    }
    return {
      invisible,
      reveals: document.querySelectorAll(".reveal").length,
      bodyText: document.body.innerText.trim().length,
    };
  });

  if (hidden.invisible)
    problems.push(`No-JS: ${hidden.invisible}/${hidden.reveals} reveal blocks render invisible.`);
  else
    console.log(
      `PASS: no-JS renders ${hidden.bodyText} characters, all ${hidden.reveals} reveal blocks visible.`,
    );
  await ctx.close();
}

// 3. With reduced motion, revealed content must be visible immediately.
{
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const invisible = await page.evaluate(
    () =>
      [...document.querySelectorAll(".reveal")].filter(
        (el) => parseFloat(getComputedStyle(el).opacity) < 0.5,
      ).length,
  );
  if (invisible) problems.push(`Reduced motion: ${invisible} blocks stayed hidden.`);
  else console.log("PASS: reduced motion shows all content immediately.");
  await ctx.close();
}

// 4. Print and save-as-PDF. Scroll reveal never fires in print media, so
// without an explicit override every section below the fold prints blank.
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  const hidden = await page.evaluate(
    () =>
      [...document.querySelectorAll(".reveal")].filter(
        (el) => parseFloat(getComputedStyle(el).opacity) < 0.5,
      ).length,
  );
  if (hidden) problems.push(`Print: ${hidden} reveal blocks would print blank.`);
  else console.log("PASS: print media renders every reveal block.");
  await page.close();
}

// 5. Scrolling the page reveals everything it should.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(600);
  const hidden = await page.evaluate(
    () =>
      [...document.querySelectorAll(".reveal")].filter(
        (el) => parseFloat(getComputedStyle(el).opacity) < 0.5,
      ).length,
  );
  if (hidden) problems.push(`Scroll: ${hidden} blocks never revealed.`);
  else console.log("PASS: scrolling reveals every block.");
  await page.close();
}

await browser.close();

if (problems.length) {
  console.log("\nFAILED:");
  problems.forEach((p) => console.log("  " + p));
  process.exit(1);
}
console.log("\nPASS: keyboard, no-JS and reduced-motion checks.");
