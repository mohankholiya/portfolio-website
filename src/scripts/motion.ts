/**
 * Motion layer: GSAP + ScrollTrigger, with Lenis driven off gsap.ticker so
 * there is exactly one rAF loop on the page.
 *
 * Contract this file holds to:
 *
 *  - Transform and opacity only. Nothing here animates a property that forces
 *    layout, so every tween stays on the compositor.
 *  - Everything plays once. A chart that rebuilt itself each time it scrolled
 *    past would read as decoration; these are exhibits, and an exhibit should
 *    assemble once and then stay put.
 *  - `prefers-reduced-motion` is handled upstream. The inline script in
 *    BaseLayout only sets `html.motion` when motion is allowed, and every
 *    "start hidden" rule in the stylesheet is scoped to `html.motion`. So when
 *    a visitor has reduced motion on, this module is still downloaded but does
 *    nothing, and the page is already in its final state — there is no state to
 *    undo and no flash to avoid.
 *  - The no-JS and JS-failed cases land in the same place, via the watchdog in
 *    BaseLayout that strips `html.motion` if this module never boots.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const root = document.documentElement;

function boot() {
  /* Tell the watchdog in BaseLayout that the bundle arrived, so it does not
     strip the class and undo the hidden states we are about to animate. */
  root.classList.add("motion-ready");

  initSmoothScroll();
  initExhibits();
  initTimeline();

  /* Webfonts land after this module parses, and the serif is a different
     height from its fallback, so every trigger measured before that is a few
     pixels out. */
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

/* ── Smooth scroll ─────────────────────────────────────────────────────── */

let lenis: Lenis | null = null;

function initSmoothScroll() {
  lenis = new Lenis({ lerp: 0.1 });

  /* One loop: Lenis is stepped by GSAP's ticker rather than its own rAF, so
     scroll position and tween playheads advance on the same frame. Two loops
     is what makes scroll-linked motion look like it is lagging the scroll. */
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  /* Native anchor jumps bypass Lenis and leave its internal position stale, so
     in-page links are routed through it. The offset clears the sticky header,
     matching the scroll-padding-top the no-motion path relies on. */
  const header = document.querySelector<HTMLElement>(".site-header, header");
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis?.scrollTo(target as HTMLElement, {
        offset: -((header?.offsetHeight ?? 72) + 24),
        duration: 1.1,
      });
      /* scrollTo does not move focus, so a keyboard user would be scrolled to
         the section with focus left behind on the link. */
      (target as HTMLElement).setAttribute("tabindex", "-1");
      (target as HTMLElement).focus({ preventScroll: true });
    });
  });

  /* Anything the browser scrolls itself — focusing an off-screen control,
     find-in-page, the skip link — has to be reconciled or Lenis will snap the
     page back to where it thought it was. */
  window.addEventListener(
    "focusin",
    () => {
      requestAnimationFrame(() => lenis?.resize());
    },
    { passive: true },
  );
}

/* ── Exhibits ──────────────────────────────────────────────────────────── */

/**
 * Each exhibit assembles itself once, as it comes into view:
 *
 *   1. the peer distribution fades in, and the plain bars grow from their axis
 *   2. the figures count up from zero
 *   3. the highlighted mark — the one the exhibit is actually about — lands last
 *   4. annotations and callouts settle in
 *
 * The order is the argument: the reader sees the field, then the numbers, then
 * the thing they are supposed to take away.
 */
function initExhibits() {
  const charts = document.querySelectorAll<SVGSVGElement>(".onepager-chart svg");

  charts.forEach((svg) => {
    const q = <T extends Element>(sel: string) =>
      Array.from(svg.querySelectorAll<T>(sel));

    const dots = q(".dot");
    const barsX = q(".g:not(.hi)");
    const barsY = q(".gy:not(.hi)");
    const hiX = q(".g.hi");
    const hiY = q(".gy.hi");
    const hiMark = q(".hi:not(.g):not(.gy)");
    const paths = q<SVGPathElement>(".ln");
    const pops = q(".pop");
    const figures = q<SVGTextElement>("text[data-count]");

    /* Start states are set here rather than in the stylesheet so GSAP is the
       only thing touching `transform` on these nodes. GSAP resolves SVG
       transform origins into the matrix it writes; if CSS has also declared
       transform-box/transform-origin, the offset gets applied twice and the
       segments of a stacked bar land in the wrong places. See the note at the
       foot of src/styles/exhibits.css. */
    gsap.set([...barsX, ...hiX], { scaleX: 0, transformOrigin: "left center" });
    gsap.set([...barsY, ...hiY], { scaleY: 0, transformOrigin: "center bottom" });
    gsap.set(hiMark, { opacity: 0, scale: 0.4, transformOrigin: "center center" });
    gsap.set(dots, { opacity: 0 });
    gsap.set(pops, { opacity: 0, y: 8 });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: svg.closest(".case-exhibit") ?? svg,
        start: "top 82%",
        once: true,
      },
    });

    if (dots.length) {
      tl.to(dots, { opacity: 1, duration: 0.6, stagger: { each: 0.008 } }, 0);
    }
    if (barsX.length) {
      tl.to(barsX, { scaleX: 1, duration: 0.8, stagger: 0.07, ease: "power3.inOut" }, 0);
    }
    if (barsY.length) {
      tl.to(barsY, { scaleY: 1, duration: 0.75, stagger: 0.07, ease: "power3.inOut" }, 0);
    }
    if (paths.length) {
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(p, { strokeDashoffset: 0, duration: 1.2, ease: "none" }, 0.15);
      });
    }

    figures.forEach((el, i) => countUp(tl, el, 0.3 + Math.min(i, 8) * 0.04));

    /* The subject mark lands after the field it is being compared against, so
       the eye is already on the distribution when the answer arrives. */
    const at = dots.length || barsX.length || barsY.length ? 0.55 : 0.1;
    if (hiX.length) tl.to(hiX, { scaleX: 1, duration: 0.85, ease: "power3.inOut" }, at);
    if (hiY.length) tl.to(hiY, { scaleY: 1, duration: 0.85, ease: "power3.inOut" }, at);
    if (hiMark.length) {
      tl.to(
        hiMark,
        { opacity: 1, scale: 1, duration: 0.7, stagger: 0.09, ease: "back.out(1.7)" },
        at,
      );
    }

    if (pops.length) {
      tl.to(pops, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, at + 0.12);
    }

    /* Belt and braces: if a tween is ever killed mid-flight (a resize that
       rebuilds triggers, a browser that bails on the timeline), leave the
       exhibit in its authored state rather than part-drawn. */
    tl.eventCallback("onInterrupt", () => {
      gsap.set([...barsX, ...barsY, ...hiX, ...hiY], { clearProps: "transform" });
      gsap.set([...dots, ...pops, ...hiMark], { clearProps: "opacity,transform" });
    });
  });
}

/* ── Career timeline ───────────────────────────────────────────────────── */

/**
 * The rail down the Experience list draws itself as you scroll, and each role's
 * node lands as the line reaches it.
 *
 * WHY THE TWO TRIGGERS SHARE A 72% LINE. The fill is scrubbed from the rail's
 * top hitting 72% of the viewport to its bottom hitting the same 72%. Over that
 * range the 72% line sweeps the rail from end to end, one document pixel per
 * pixel scrolled, so at progress `p` the line sits exactly `p` of the way down
 * the rail — which is where `scaleY: p` puts the fill's leading edge. Each node
 * then fires on `top 72%`, the moment that same line crosses it. Matching the
 * two ends is what keeps the dots on the front of the fill; an `end` of
 * `bottom 78%` would compress the mapping and the dots would drift ahead.
 *
 * The scrub lag is deliberately short for the same reason — at 0.3s the fill
 * trails the pointer enough to feel weighted without the dots outrunning it.
 */
function initTimeline() {
  const rail = document.querySelector<HTMLElement>(".career-timeline");
  const fill = rail?.querySelector<HTMLElement>(".career-rail-fill");
  if (!rail || !fill) return;

  gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });

  gsap.to(fill, {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
      trigger: rail,
      start: "top 72%",
      end: "bottom 72%",
      scrub: 0.3,
    },
  });

  rail.querySelectorAll<HTMLElement>(".career-node-dot").forEach((dot) => {
    gsap.set(dot, { scale: 0, transformOrigin: "center center" });
    gsap.to(dot, {
      scale: 1,
      duration: 0.45,
      ease: "back.out(2)",
      scrollTrigger: {
        /* The node, not the row: the row's top is above the node by the row's
           padding, so triggering off the row would light the dot early. */
        trigger: dot,
        start: "top 72%",
        once: true,
      },
    });
  });
}

/** Tween a figure from zero to its authored value, preserving its formatting. */
function countUp(tl: gsap.core.Timeline, el: SVGTextElement, at: number) {
  const to = Number(el.dataset.count);
  if (!Number.isFinite(to)) return;
  const dp = Number(el.dataset.countDp ?? 0);
  const pre = el.dataset.countPre ?? "";
  const suf = el.dataset.countSuf ?? "";
  const counter = { v: 0 };
  const write = () => {
    el.textContent = pre + counter.v.toFixed(dp) + suf;
  };

  tl.to(
    counter,
    {
      v: to,
      duration: 1.1,
      ease: "power2.out",
      onStart: write,
      onUpdate: write,
      /* Leave the authored string in place rather than a re-formatted one, so
         the DOM ends up byte-identical to what the server sent. */
      onComplete: () => {
        el.textContent = pre + to.toFixed(dp) + suf;
      },
    },
    at,
  );
}

/* ── Entry ─────────────────────────────────────────────────────────────── */

/* Last, not first: boot() reaches the module-scoped `lenis` binding, and a
   `let` is in its temporal dead zone until execution reaches the declaration.
   Calling boot() above this point throws before a single tween is built.

   The `motion` guard is re-checked here rather than trusted from the loader,
   because this module is also reachable by a direct import. */
if (root.classList.contains("motion")) {
  gsap.registerPlugin(ScrollTrigger);
  boot();
}
