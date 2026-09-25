/**
 * Hero line reveal: the headline and tagline rise into place behind a mask,
 * once, on load.
 *
 * WHY THIS IS NOT SplitText. This is the only motion on the site that plays on
 * arrival, so it cannot be lazy-loaded — and GSAP core plus SplitText on the
 * critical path measured 10 Lighthouse points on the home page (96 -> 86, TBT
 * 90ms -> 360ms). The effect is worth about a kilobyte, not thirty-one, so it
 * is built here against the Web Animations API. GSAP, ScrollTrigger, SplitText
 * and Lenis all stay in the lazy chunk behind src/scripts/motion-entry.ts,
 * where they drive the exhibits and the timeline further down the page.
 *
 * HOW THE MASKING WORKS. Rather than rebuilding the headline into per-line
 * containers — which means reconstructing the inline markup inside it, and the
 * tagline has a coloured <span> and a <br> to preserve — every word is wrapped
 * in place with an overflow-hidden box. Words are then grouped into lines by
 * measured offsetTop, and every word on a line animates on the same delay with
 * the same transform. Because the words move identically and each mask is a
 * full line box, it reads as one line rising behind one mask; the seams between
 * word boxes fall in the spaces, where there is nothing to clip.
 *
 * The markup is restored when the animation finishes, so the split scaffolding
 * is not left in the DOM for assistive technology or text selection to trip on.
 */
/* This file has no imports, so without an explicit export TypeScript treats
   it as a global script and its top-level `const` collides with every other
   script's. The empty export marks it as a module. */
export {};

const root = document.documentElement;
const LINE_RISE = "cubic-bezier(0.16, 1, 0.3, 1)";

const targets = Array.from(
  document.querySelectorAll<HTMLElement>(".js-hero-line"),
);

/* `motion` is absent when the visitor has asked for reduced motion, in which
   case the stylesheet never hides the hero and there is nothing to do. */
if (root.classList.contains("motion") && targets.length && "animate" in Element.prototype) {
  void reveal();
} else {
  root.classList.add("hero-shown");
}

async function reveal() {
  /* Lines must be measured in the real face. Splitting against the fallback and
     letting the webfont swap in afterwards regroups the words into different
     lines than the masks were cut for. The race is the backstop for a font that
     never resolves. */
  await Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((r) => setTimeout(r, 600)),
  ]);

  /* If we arrived slowly the CSS safety reveal has already shown the hero and
     the visitor has started reading. Pulling the headline back out to replay it
     would read as a glitch, so past this point leave it alone. */
  if (performance.now() > 1100) {
    root.classList.add("hero-shown");
    return;
  }

  const restore = targets.map((el) => el.innerHTML);
  const words = targets.flatMap(wrapWords);
  if (!words.length) {
    root.classList.add("hero-shown");
    return;
  }

  /* Group by vertical position. Rounding absorbs sub-pixel differences between
     words sitting on the same baseline. */
  const tops = words.map((w) => Math.round(w.parentEl.offsetTop / 4));
  const unique = [...new Set(tops)].sort((a, b) => a - b);

  /* Revealing opacity here is what supersedes the CSS fallback animation. */
  root.classList.add("hero-shown");
  targets.forEach((el) => (el.style.opacity = "1"));

  const anims = words.map((w, i) =>
    w.inner.animate(
      { transform: ["translateY(115%)", "translateY(0)"] },
      {
        duration: 950,
        delay: unique.indexOf(tops[i]) * 90,
        easing: LINE_RISE,
        fill: "both",
      },
    ),
  );

  /* The last word in document order sits on the last line, so it carries the
     largest delay and finishes last. One listener, not one per word. */
  anims[anims.length - 1].addEventListener("finish", () => {
    targets.forEach((el, i) => {
      el.innerHTML = restore[i];
      el.style.removeProperty("opacity");
    });
  });

  const rest = Array.from(document.querySelectorAll<HTMLElement>(".js-hero-fade"));
  rest.forEach((el, i) =>
    el.animate(
      { opacity: [0, 1], transform: ["translateY(14px)", "translateY(0)"] },
      { duration: 700, delay: 250 + i * 60, easing: LINE_RISE, fill: "both" },
    ),
  );
}

/**
 * Wraps every word of an element in an overflow-hidden box, in place. Working
 * on text nodes only means ancestors are untouched, so a word inside the
 * tagline's coloured <span> keeps its colour and the <br> keeps its break.
 */
function wrapWords(el: HTMLElement) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const texts: Text[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (n.textContent?.trim()) texts.push(n as Text);
  }

  const out: { parentEl: HTMLElement; inner: HTMLElement }[] = [];
  texts.forEach((node) => {
    const frag = document.createDocumentFragment();
    /* Keep the separators: splitting on the whitespace itself and re-inserting
       it as plain text preserves the original spacing exactly. */
    node.textContent!.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (!part.trim()) {
        frag.appendChild(document.createTextNode(part));
        return;
      }
      const mask = document.createElement("span");
      mask.className = "hero-w";
      const inner = document.createElement("span");
      inner.className = "hero-w-i";
      inner.textContent = part;
      mask.appendChild(inner);
      frag.appendChild(mask);
      out.push({ parentEl: mask, inner });
    });
    node.parentNode?.replaceChild(frag, node);
  });
  return out;
}
