/**
 * Captures the Experience rail mid-draw, to prove the fill tracks scroll and
 * the nodes land on the front of it.
 *
 * Scrolling is driven with real wheel events rather than window.scrollTo,
 * because Lenis owns the scroll position: a programmatic jump moves the
 * document out from under Lenis's internal target and it snaps back on the
 * next frame, which would photograph the rail in a state no visitor sees.
 *
 * Usage: node scripts/shoot-timeline.mjs [baseUrl]
 */
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] ?? "http://127.0.0.1:4399";
const OUT = ".shots/timeline";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });

for (const vp of [
  { name: "1440", width: 1440, height: 900 },
  { name: "375", width: 375, height: 812 },
]) {
  const page = await browser.newPage({ viewport: vp });
  await page.goto(BASE, { waitUntil: "networkidle" });

  /* The motion bundle is behind an idle-or-intent loader, so nudge it and wait
     for the module to announce itself rather than racing it. */
  await page.mouse.wheel(0, 1);
  await page.waitForFunction(
    () => document.documentElement.classList.contains("motion-ready"),
    null,
    { timeout: 10000 },
  );

  const box = await page.evaluate(() => {
    const el = document.querySelector(".career-timeline");
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height };
  });

  /* Sample the draw across its whole range: the fill runs from the rail's top
     hitting 72% of the viewport to its bottom hitting the same line. */
  const start = box.top - vp.height * 0.72;
  const span = box.height;

  for (const [i, p] of [0.12, 0.38, 0.64, 0.95].entries()) {
    const target = Math.round(start + span * p);
    let current = await page.evaluate(() => window.scrollY);
    /* Wheel in chunks; Lenis eases toward its target and a single huge delta
       would still be in flight when the shutter opens. */
    while (Math.abs(target - current) > 4) {
      await page.mouse.wheel(0, Math.max(-400, Math.min(400, target - current)));
      await page.waitForTimeout(60);
      current = await page.evaluate(() => window.scrollY);
    }
    await page.waitForTimeout(700); // let the scrub settle

    const shot = await page.evaluate(() => {
      const r = document.querySelector(".career-timeline").getBoundingClientRect();
      const fill = document.querySelector(".career-rail-fill");
      const dots = Array.from(document.querySelectorAll(".career-node-dot"));
      const scaleOf = (el) => {
        const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
        return { x: +m.a.toFixed(3), y: +m.d.toFixed(3) };
      };
      return {
        railTop: Math.round(r.top),
        railHeight: Math.round(r.height),
        fillScaleY: scaleOf(fill).y,
        dotScales: dots.map((d) => scaleOf(d).x),
      };
    });

    console.log(
      `${vp.name} p=${p}  scrollY=${current}  fillScaleY=${shot.fillScaleY}  dots=[${shot.dotScales.join(", ")}]`,
    );

    await page.screenshot({
      path: `${OUT}/${vp.name}-${i}-p${String(p).replace("0.", "")}.png`,
      clip: {
        x: 0,
        y: Math.max(0, shot.railTop - 30),
        width: vp.width,
        height: Math.min(vp.height - Math.max(0, shot.railTop - 30), shot.railHeight + 60),
      },
    });
  }

  await page.close();
}

await browser.close();
console.log(`\nwrote ${OUT}/`);
