/**
 * The rail is authored in its finished state and only JS takes it apart, so
 * every path where JS does not run must show a complete rail. This asserts
 * that for the three ways that happens: reduced motion, JS disabled, and
 * print. A regression here is an invisible-by-default section, which is the
 * one failure mode the whole no-hidden-state contract exists to prevent.
 *
 * Usage: node scripts/check-timeline-fallback.mjs [baseUrl]
 */
import { chromium } from "playwright-core";

/* Matches the default in responsive-audit.mjs and check-keyboard.mjs, so the
   three run off one base URL under `npm run check:browser`. Note that
   `astro preview` may bind to localhost/::1 rather than 127.0.0.1, in which
   case pass the base URL explicitly. */
const BASE = process.argv[2] ?? "http://127.0.0.1:4399";
const browser = await chromium.launch({ channel: "chrome" });
const fails = [];

const read = (page) =>
  page.evaluate(() => {
    const fill = document.querySelector(".career-rail-fill");
    const dots = Array.from(document.querySelectorAll(".career-node-dot"));
    if (!fill || !dots.length) return { missing: true };
    const scaleY = (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).d;
    return {
      missing: false,
      fill: +scaleY(fill).toFixed(3),
      dots: dots.map((d) => +scaleY(d).toFixed(3)),
      dotCount: dots.length,
    };
  });

/* 1. Reduced motion. The bundle still downloads, but html.motion is never set
      so the module returns without touching anything. */
{
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.mouse.wheel(0, 2000);
  await page.waitForTimeout(2500);
  const r = await read(page);
  const ok = !r.missing && r.fill === 1 && r.dots.every((d) => d === 1);
  console.log(`reduced-motion  fill=${r.fill} dots=[${r.dots}]  ${ok ? "PASS" : "FAIL"}`);
  if (!ok) fails.push("reduced-motion");
  await ctx.close();
}

/* 2. JS off. Nothing runs at all; the served HTML/CSS must already be right. */
{
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "load" });
  const r = await read(page);
  const ok = !r.missing && r.fill === 1 && r.dots.every((d) => d === 1);
  console.log(`no-js           fill=${r.fill} dots=[${r.dots}]  ${ok ? "PASS" : "FAIL"}`);
  if (!ok) fails.push("no-js");
  await ctx.close();
}

/* 3. Print. Scroll triggers never fire when printing, so a scrubbed rail would
      print as an empty gutter beside a full list of roles. */
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  const r = await read(page);
  const ok = !r.missing && r.fill === 1 && r.dots.every((d) => d === 1);
  console.log(`print           fill=${r.fill} dots=[${r.dots}]  ${ok ? "PASS" : "FAIL"}`);
  if (!ok) fails.push("print");
  await ctx.close();
}

await browser.close();
if (fails.length) {
  console.error(`\nFAILED: ${fails.join(", ")}`);
  process.exit(1);
}
console.log("\nall fallback paths show a complete rail");
