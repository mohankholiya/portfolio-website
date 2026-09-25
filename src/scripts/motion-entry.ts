/**
 * Loader for the motion layer. This is the only motion code on the critical
 * path, and it is deliberately tiny.
 *
 * WHY THIS EXISTS. GSAP + ScrollTrigger + Lenis is ~51KB gzipped, ~135KB
 * parsed. Imported statically it cost 32 Lighthouse performance points on the
 * home page — 97 -> 65, with Total Blocking Time going 130ms -> 990ms and LCP
 * 1.9s -> 3.2s. None of that buys anything for a visitor who never scrolls: the
 * exhibits are all below the fold, and the hero reveal is decoration.
 *
 * So the bundle is fetched only once the page is quiet, or sooner if the
 * visitor shows any intent to scroll. Whichever happens first wins, and the
 * import is idempotent — the browser dedupes the module.
 *
 * The cost of being late is small and bounded: an exhibit that scrolls into
 * view before GSAP lands is simply already in its finished state, because
 * nothing is hidden by CSS (see the note in src/styles/exhibits.css). The
 * animation is an enhancement over a page that is correct without it.
 */
/* This file has no imports, so without an explicit export TypeScript treats
   it as a global script and its top-level `const` collides with every other
   script's. The empty export marks it as a module. */
export {};

const root = document.documentElement;

if (root.classList.contains("motion")) {
  let started = false;

  const start = () => {
    if (started) return;
    started = true;
    teardown();
    import("./motion");
  };

  /* Any of these means the visitor is about to see something animate, so the
     bundle is wanted now rather than at the next idle slot. `scroll` and
     `pointerdown` are passive and fire once. */
  const NUDGES = ["scroll", "pointerdown", "keydown", "wheel", "touchstart"] as const;
  const teardown = () => {
    NUDGES.forEach((e) => window.removeEventListener(e, start));
  };
  NUDGES.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));

  /* Otherwise: after the page has loaded, at the first moment the main thread
     is free. The timeout is the backstop for a tab that never goes idle. */
  const idle = () => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(start, { timeout: 2500 });
    } else {
      setTimeout(start, 900);
    }
  };
  if (document.readyState === "complete") idle();
  else window.addEventListener("load", idle, { once: true });
}
