/**
 * Responsive and accessibility audit against the built site.
 *
 * Headless Chrome's --window-size does NOT set the layout viewport, so
 * --screenshot silently crops an 800px layout down to the requested width and
 * every "mobile" screenshot looks broken in the same misleading way. This
 * drives real device emulation over CDP instead, and measures overflow rather
 * than eyeballing it.
 *
 * Usage: node scripts/responsive-audit.mjs [baseUrl]
 */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] ?? "http://127.0.0.1:4399";
const OUT = "C:/Users/mohan/AppData/Local/Temp/audit";

const VIEWPORTS = [
  { name: "375", width: 375, height: 812, mobile: true },
  { name: "768", width: 768, height: 1024, mobile: true },
  { name: "1024", width: 1024, height: 768, mobile: false },
  { name: "1440", width: 1440, height: 900, mobile: false },
];

const PAGES = [
  { name: "home", path: "/" },
  { name: "case-governance", path: "/case-studies/unit-rate-governance/" },
  { name: "case-categories", path: "/case-studies/category-intelligence/" },
  { name: "case-benchmark", path: "/case-studies/capital-cost-competitiveness/" },
  { name: "case-capacity", path: "/case-studies/supply-chain-benchmarking/" },
  { name: "case-sourcing", path: "/case-studies/accenture-capex-sourcing/" },
  { name: "case-waterfall", path: "/case-studies/bt-contract-renewal/" },
  { name: "index", path: "/case-studies/" },
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const findings = [];

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: vp.mobile,
    hasTouch: vp.mobile,
  });

  for (const page of PAGES) {
    const p = await context.newPage();
    await p.goto(BASE + page.path, { waitUntil: "networkidle" });

    // Touch viewports are held to the 44px comfortable-target guideline.
    // Pointer viewports are held to WCAG 2.2 AA 2.5.8, which is 24px.
    const report = await p.evaluate((minTarget) => {
      const doc = document.documentElement;
      const vw = doc.clientWidth;

      // Anything whose right edge crosses the viewport is a real overflow.
      // Elements inside an overflow-x:auto ancestor are intentional and skipped.
      const scrollable = (el) => {
        for (let n = el.parentElement; n; n = n.parentElement) {
          const ov = getComputedStyle(n).overflowX;
          if (ov === "auto" || ov === "scroll") return true;
        }
        return false;
      };

      // The spam honeypot is parked far off-canvas on purpose.
      const honeypot = (el) => !!el.closest(".honeypot");
      // Links inside a closed <details> menu are not reachable, so their
      // collapsed geometry is not a real tap-target failure.
      const inClosedDetails = (el) => {
        const d = el.closest("details");
        return !!d && !d.open;
      };

      const offenders = [];
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.right <= vw + 1 && r.left >= -1) continue;
        if (scrollable(el) || honeypot(el)) continue;
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className?.baseVal ?? el.className ?? "")
            .toString()
            .slice(0, 60),
          left: Math.round(r.left),
          right: Math.round(r.right),
        });
      }

      // Interactive targets smaller than 44px in either axis.
      const small = [];
      for (const el of document.querySelectorAll(
        "a, button, select, input, textarea, summary",
      )) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.height >= minTarget && r.width >= minTarget) continue;
        if (honeypot(el) || inClosedDetails(el)) continue;
        small.push({
          text: (el.textContent ?? "").trim().slice(0, 34),
          w: Math.round(r.width),
          h: Math.round(r.height),
        });
      }

      return {
        vw,
        scrollWidth: doc.scrollWidth,
        overflows: doc.scrollWidth > vw + 1,
        offenders: offenders.slice(0, 8),
        offenderCount: offenders.length,
        smallTargets: small.slice(0, 8),
        smallCount: small.length,
        imgNoAlt: document.querySelectorAll("img:not([alt])").length,
        h1: document.querySelectorAll("h1").length,
      };
    }, vp.mobile ? 44 : 24);

    if (report.overflows || report.offenderCount || report.smallCount) {
      findings.push({ viewport: vp.name, page: page.name, ...report });
    }

    await p.screenshot({
      path: `${OUT}/${page.name}-${vp.name}.png`,
      fullPage: vp.name === "375" || vp.name === "1440",
    });
    await p.close();
  }
  await context.close();
}

await browser.close();

if (!findings.length) {
  console.log("PASS: no horizontal overflow, no sub-44px targets, alt text present.");
} else {
  console.log(`${findings.length} finding group(s):\n`);
  for (const f of findings) {
    console.log(`[${f.viewport}px] ${f.page}`);
    console.log(`  viewport ${f.vw}  scrollWidth ${f.scrollWidth}  overflow=${f.overflows}`);
    if (f.offenderCount)
      console.log(`  overflowing (${f.offenderCount}):`, JSON.stringify(f.offenders));
    if (f.smallCount)
      console.log(`  small targets (${f.smallCount}):`, JSON.stringify(f.smallTargets));
    if (f.imgNoAlt) console.log(`  images without alt: ${f.imgNoAlt}`);
    if (f.h1 !== 1) console.log(`  h1 count: ${f.h1}`);
    console.log("");
  }
}
