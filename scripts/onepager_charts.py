"""Chart primitives for the case-study one-pagers.

Every exhibit on the one-pagers is authored here as inline SVG rather than drawn
in a design tool, for three reasons: the numbers stay in one place next to the
copy that cites them, the same SVG is carried onto the website by
`extract-exhibits.py` instead of being redrawn, and the palette is checked at
build time rather than trusted.

PALETTE DISCIPLINE. `extract-exhibits.py` maps one-pager colours onto the site's
design tokens and rejects anything it does not recognise, so only the hexes in
its PALETTE table may appear below. That table deliberately collapses the
one-pager's several navies onto a single site token, which means a chart cannot
rely on "dark navy vs slightly-less-dark navy" to separate two series: on the
website those two segments would become the same colour. Sequential ramps
therefore step through genuinely distinct tokens (INK -> PETROL -> SLATE ->
HAIR), and every in-bar label is checked against its own fill for contrast.

ANIMATION HOOKS. The website animates these exhibits on scroll, so marks carry
class hooks the page JS can select. They are inert in print and in the PDFs.

    g    horizontal bar; grows from its left edge   (scaleX 0 -> 1)
    gy   vertical bar; grows from its baseline      (scaleY 0 -> 1)
    hi   the highlighted mark; fills last
    pop  annotation, label or callout; fades and rises
    dot  a peer mark in a distribution; fades in as a group
    ln   a drawn path; revealed along its length
"""

import random
import re

# ── Palette ──────────────────────────────────────────────────────────────
# Only these may appear in output. Each is a key in extract-exhibits.py's
# PALETTE, so each survives the mapping onto the site's tokens.
INK = "#0c2438"  # deepest navy
PETROL = "#1f6f9c"  # designated "context" series colour
SLATE = "#536575"  # muted; dark enough to carry white text
BODY = "#3a4751"
AXIS = "#7e8c99"  # chart axis / peer marks
HAIR = "#d7dee4"  # hairlines, lightest bar segment
GRID = "#e3e9ee"
BAND = "#eef2f6"  # quartile shading
PAPER = "#ffffff"
COPPER = "#c2772f"  # the subject series
COPPER_TEXT = "#8a4e18"  # copper at text contrast
COPPER_TINT = "#f6e9da"

DISPLAY = "Archivo, sans-serif"
SANS = "'Source Sans 3', sans-serif"
MONO = "'IBM Plex Mono', monospace"

# Sequential ramp for stacked bars. Five steps that stay distinct after the
# site's palette mapping, ordered dark -> light so the eye reads magnitude.
RAMP = [INK, PETROL, SLATE, AXIS, HAIR]
# Label colour that meets contrast on each ramp step, index-aligned with RAMP.
RAMP_LABEL = [PAPER, PAPER, PAPER, INK, INK]


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def text(x, y, s, *, size=11, fill=BODY, family=SANS, anchor="middle", weight=None, cls=None, extra=""):
    w = f' font-weight="{weight}"' if weight else ""
    c = f' class="{cls}"' if cls else ""
    return (
        f'<text x="{x:g}" y="{y:g}" font-family="{family}" font-size="{size:g}" '
        f'fill="{fill}" text-anchor="{anchor}"{w}{c}{extra}>{esc(s)}</text>'
    )


# Splits a formatted figure into prefix / number / suffix so the website can
# count it up on scroll: "£11.0M" -> ("£", 11.0, "M"), "~70% above peer median"
# -> ("~", 70, "% above peer median"). The printed text is unchanged, so the
# PDFs and the no-JS page are unaffected — the attributes are inert there.
_FIGURE = re.compile(r"^(?P<pre>[^0-9]*)(?P<n>[0-9]+(?:\.[0-9]+)?)(?P<suf>.*)$")


def counted(x, y, disp, **kw):
    m = _FIGURE.match(disp)
    if not m:
        return text(x, y, disp, **kw)
    n = m.group("n")
    dp = len(n.split(".")[1]) if "." in n else 0
    extra = (
        f' data-count="{n}" data-count-dp="{dp}"'
        f' data-count-pre="{esc(m.group("pre"))}"'
        f' data-count-suf="{esc(m.group("suf"))}"'
    )
    kw["extra"] = kw.get("extra", "") + extra
    return text(x, y, disp, **kw)


def note_lines(x, y, s, *, max_px=568, size=10.5, fill=SLATE, anchor="start", family=SANS):
    """Footnote under a chart, wrapped to fit inside the viewBox.

    SVG <text> does not wrap, so a long note silently runs past the right edge
    of the viewBox and is clipped — invisible in review, caught only by the
    responsive audit. Lines are stacked upward from `y` so the last line always
    sits on the baseline the caller chose and the block grows into the space
    above it, which is empty, rather than through the bottom of the viewBox.
    """
    # Source Sans 3 at these sizes averages a shade under 0.5em per character.
    per_char = size * 0.482
    limit = max(int(max_px / per_char), 12)
    words, lines, cur = s.split(), [], ""
    for wd in words:
        trial = f"{cur} {wd}".strip()
        if len(trial) > limit and cur:
            lines.append(cur)
            cur = wd
        else:
            cur = trial
    if cur:
        lines.append(cur)
    out = []
    for i, ln in enumerate(lines):
        ly = y - (len(lines) - 1 - i) * (size + 2.4)
        out.append(text(x, ly, ln, size=size, fill=fill, anchor=anchor, family=family))
    return "".join(out)


def rect(x, y, w, h, fill, *, rx=0, cls=None, op=None, stroke=None, sw=None):
    a = f' class="{cls}"' if cls else ""
    a += f' fill-opacity="{op}"' if op is not None else ""
    a += f' stroke="{stroke}" stroke-width="{sw or 1}"' if stroke else ""
    a += f' rx="{rx:g}"' if rx else ""
    return f'<rect x="{x:g}" y="{y:g}" width="{w:g}" height="{h:g}" fill="{fill}"{a} />'


def line(x1, y1, x2, y2, stroke, *, sw=1, dash=None, cls=None):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    c = f' class="{cls}"' if cls else ""
    return (
        f'<line x1="{x1:g}" y1="{y1:g}" x2="{x2:g}" y2="{y2:g}" '
        f'stroke="{stroke}" stroke-width="{sw:g}"{d}{c} />'
    )


def diamond(cx, cy, r, *, fill=COPPER, stroke=COPPER_TEXT, sw=1.5, cls="hi"):
    return (
        f'<path class="{cls}" d="M {cx:g} {cy - r:g} L {cx + r:g} {cy:g} '
        f'L {cx:g} {cy + r:g} L {cx - r:g} {cy:g} Z" fill="{fill}" '
        f'stroke="{stroke}" stroke-width="{sw:g}" />'
    )


def svg(body: str, *, label: str, w=640, h=240) -> str:
    return (
        f'<svg viewBox="0 0 {w} {h}" role="img" aria-label="{esc(label)}" '
        f'preserveAspectRatio="xMidYMid meet">{body}</svg>'
    )


# ── Exhibit types ────────────────────────────────────────────────────────


def dot_strip(rows, *, label, quartile_labels=("1st quartile", "2nd", "3rd", "4th quartile"),
              legend=("Peer project (27 per system)", "This project"), seed=7):
    """A quartile distribution per row: n peer dots, bands behind, subject diamond.

    rows: [{name, unit, pos}] where pos is 0..1 across the peer range.
    """
    rnd = random.Random(seed)
    x0, x1 = 196, 622
    span = x1 - x0
    q = span / 4
    out = []

    # Quartile bands: shade 2nd and 4th so the four zones read without gridlines.
    for i in (1, 3):
        out.append(rect(x0 + i * q, 30, q, 152, BAND))
    for i in range(1, 4):
        out.append(line(x0 + i * q, 30, x0 + i * q, 182, HAIR, sw=1, dash="3 3"))
    for i, ql in enumerate(quartile_labels):
        out.append(text(x0 + (i + 0.5) * q, 24, ql, size=9.5, fill=AXIS, family=MONO))

    ys = [62, 110, 158]
    for row, y in zip(rows, ys):
        out.append(text(186, y - 3, row["name"], size=11.5, fill=INK, family=DISPLAY,
                        anchor="end", weight=600))
        out.append(text(186, y + 10, row["unit"], size=9.5, fill=AXIS, family=MONO, anchor="end"))
        out.append(line(x0, y + 2, x1, y + 2, HAIR, sw=1.5))
        # 27 peers, evenly distributed with a little jitter so it reads as data.
        for k in range(27):
            px = x0 + 8 + (span - 16) * (k / 26)
            py = y + 2 + rnd.uniform(-3.4, 3.4)
            out.append(f'<circle class="dot" cx="{px:.1f}" cy="{py:.1f}" r="3.6" '
                       f'fill="{AXIS}" fill-opacity="0.85" />')
        out.append(diamond(x0 + 8 + (span - 16) * row["pos"], y + 2, 7.5))

    ly = 214
    out.append(f'<circle cx="{x0}" cy="{ly - 4}" r="3.6" fill="{AXIS}" fill-opacity="0.85" />')
    out.append(text(x0 + 10, ly, legend[0], size=10.5, fill=BODY, anchor="start"))
    lx = x0 + 186
    out.append(diamond(lx, ly - 4, 6.5, cls="pop"))
    out.append(text(lx + 12, ly, legend[1], size=10.5, fill=BODY, anchor="start"))
    return svg("".join(out), label=label)


def stacked_bar(segs, *, label, note=None, highlight=0, y=64, bh=52):
    """A single 100% stacked bar. segs: [{pct, label, sub}].

    `highlight` is an index or a set of indices; highlighted segments take the
    copper and are the ones the exhibit is actually about. A hairline white gap
    separates every segment, which is what keeps two adjacent highlighted bands
    legible as two rather than merging into one long copper run.
    """
    hset = {highlight} if isinstance(highlight, int) else set(highlight)
    x0, x1 = 30, 610
    span = x1 - x0
    gap = 1.6
    out = []
    cx = x0
    ramp_i = 0
    for i, s in enumerate(segs):
        w = span * s["pct"] / 100
        if i in hset:
            fill, lab, cls = COPPER, PAPER, "g hi"
        else:
            fill, lab, cls = RAMP[ramp_i], RAMP_LABEL[ramp_i], "g"
            ramp_i += 1
        out.append(rect(cx, y, max(w - gap, 1), bh, fill, cls=cls))
        out.append(counted(cx + w / 2, y + bh / 2 + 6, f'{s["pct"]:g}%', size=17, fill=lab,
                           family=DISPLAY, weight=700, cls="pop"))
        ty = y + bh + 20
        out.append(text(cx + w / 2, ty, s["label"], size=11, fill=INK, family=SANS, cls="pop"))
        if s.get("sub"):
            out.append(text(cx + w / 2, ty + 14, s["sub"], size=10.5, fill=AXIS,
                            family=SANS, cls="pop"))
        cx += w
    if note:
        out.append(note_lines(x0, 218, note, max_px=x1 - x0))
    return svg("".join(out), label=label)


def pareto(*, label, cut_i=45, n=90, total=20.0, note=None):
    """Spend concentration: ranked bars with a cumulative-share curve and the
    cut where the curve crosses ~80%."""
    x0, x1, ybase, ytop = 58, 566, 180, 30
    span, height = x1 - x0, ybase - ytop
    out = []
    # A decaying rank-size curve; the shape is what the exhibit asserts.
    vals = [total * (1.0 / (1 + 0.115 * i) ** 1.28) for i in range(n)]
    tot = sum(vals)
    for gv, lbl in ((0, "$0M"), (5, "$5M"), (10, "$10M"), (15, "$15M"), (20, "$20M")):
        gy = ybase - height * gv / total
        out.append(line(x0, gy, x1, gy, GRID))
        out.append(text(x0 - 10, gy + 4, lbl, size=10, fill=AXIS, family=MONO, anchor="end"))
    bw = span / n * 0.72
    for i, v in enumerate(vals):
        bx = x0 + span * i / n
        bh = height * v / total
        out.append(rect(bx, ybase - bh, bw, bh, COPPER if i < cut_i else AXIS,
                        cls="gy", op=0.92 if i < cut_i else 0.55))
    # Cumulative share, right axis 0-100%.
    pts, run = [], 0.0
    for i, v in enumerate(vals):
        run += v
        pts.append(f"{x0 + span * (i + 0.5) / n:.1f} {ybase - height * (run / tot):.1f}")
    out.append(f'<path class="ln" d="M {" L ".join(pts)}" fill="none" stroke="{INK}" stroke-width="2" />')
    for pv in (50, 80, 100):
        out.append(text(x1 + 10, ybase - height * pv / 100 + 4, f"{pv}%", size=10,
                        fill=AXIS, family=MONO, anchor="start"))
    cum = sum(vals[:cut_i]) / tot
    cxp = x0 + span * (cut_i - 0.5) / n
    cyp = ybase - height * cum
    out.append(line(cxp, ytop, cxp, ybase, INK, sw=1.1, dash="4 3", cls="pop"))
    out.append(line(x0, cyp, x1, cyp, COPPER_TEXT, sw=1.1, dash="5 4", cls="pop"))
    out.append(f'<circle class="pop" cx="{cxp:.1f}" cy="{cyp:.1f}" r="4.5" fill="{COPPER_TEXT}" />')
    out.append(rect(cxp + 12, 88, 214, 38, PAPER, rx=4, stroke=COPPER, sw=1, cls="pop"))
    out.append(text(cxp + 24, 104, f"Top {cut_i} of 482 items", size=12.5, fill=COPPER_TEXT,
                    family=DISPLAY, anchor="start", weight=700, cls="pop"))
    out.append(text(cxp + 24, 119, "drive ~80% of annual spend", size=11, fill=BODY,
                    anchor="start", cls="pop"))
    out.append(line(x0, ybase, x1, ybase, INK, sw=1.4))
    if note:
        out.append(note_lines(x0, 214, note, max_px=x1 + 46 - x0))
    return svg("".join(out), label=label)


def h_bars(items, *, label, note=None, vmax=None, unit="$", hi_n=0, bracket=None):
    """Ranked horizontal bars with the value printed at the end of each."""
    # The bar field stops well short of the viewBox: each bar prints its value
    # at its own end, and an optional bracket sits outside that again. Sizing
    # x1 to the full width clips whichever of the two runs longest.
    x0 = 150
    x1 = 452
    vmax = vmax or max(i["v"] for i in items) * 1.06
    out = []
    top, gap = 30, 27
    for i, it in enumerate(items):
        y = top + i * gap
        w = (x1 - x0) * it["v"] / vmax
        hot = i < hi_n
        out.append(text(x0 - 10, y + 13, it["label"], size=11.5, fill=BODY, anchor="end"))
        out.append(rect(x0, y, w, 17, COPPER if hot else INK, rx=2,
                        cls="g hi" if hot else "g", op=0.95 if hot else 0.88))
        out.append(counted(x0 + w + 8, y + 13, f'{unit}{it["v"]:.1f}M', size=12,
                           fill=COPPER_TEXT if hot else SLATE, family=DISPLAY,
                           anchor="start", weight=700, cls="pop"))
    if bracket:
        by0, by1 = top + 2, top + gap + 15
        bx = x1 + 62
        out.append(line(bx, by0, bx, by1, COPPER_TEXT, sw=1.4, cls="pop"))
        out.append(line(bx, by0, bx - 6, by0, COPPER_TEXT, sw=1.4, cls="pop"))
        out.append(line(bx, by1, bx - 6, by1, COPPER_TEXT, sw=1.4, cls="pop"))
        out.append(text(bx + 8, (by0 + by1) / 2 - 1, bracket[0], size=11.5, fill=COPPER_TEXT,
                        family=DISPLAY, anchor="start", weight=700, cls="pop"))
        out.append(text(bx + 8, (by0 + by1) / 2 + 13, bracket[1], size=10.5, fill=BODY,
                        anchor="start", cls="pop"))
    out.append(line(x0, top - 8, x0, top + len(items) * gap - 4, INK, sw=1.4))
    if note:
        out.append(note_lines(x0 - 132, 228, note, max_px=612))
    return svg("".join(out), label=label)


def box_plot(*, label, lo, q1, med, q3, hi, subject, vmax=60, note=None, subject_label="This utility",
             subject_note=""):
    """One horizontal box plot with the subject marked well outside the box."""
    x0, x1, y = 64, 604, 104
    out = []

    def X(v):
        return x0 + (x1 - x0) * v / vmax

    for g in range(0, vmax + 1, 10):
        out.append(line(X(g), 44, X(g), 166, GRID))
        out.append(text(X(g), 184, str(g), size=10, fill=AXIS, family=MONO))
    out.append(line(X(lo), y, X(hi), y, AXIS, sw=1.4, cls="pop"))
    out.append(line(X(lo), y - 13, X(lo), y + 13, AXIS, sw=1.4, cls="pop"))
    out.append(line(X(hi), y - 13, X(hi), y + 13, AXIS, sw=1.4, cls="pop"))
    out.append(rect(X(q1), y - 24, X(q3) - X(q1), 48, AXIS, rx=3, op=0.3, stroke=AXIS, sw=1.2, cls="g"))
    out.append(line(X(med), y - 24, X(med), y + 24, INK, sw=2.4, cls="pop"))
    out.append(text(X(med), y - 32, "Peer median", size=10, fill=AXIS, family=MONO, cls="pop"))
    out.append(diamond(X(subject), y, 9))
    out.append(text(X(subject), y - 24, subject_label, size=12, fill=COPPER_TEXT,
                    family=DISPLAY, weight=700, cls="pop"))
    if subject_note:
        out.append(counted(X(subject), y + 34, subject_note, size=10.5, fill=COPPER_TEXT,
                           family=MONO, cls="pop"))
    if note:
        out.append(note_lines(x0 - 40, 214, note, max_px=600))
    return svg("".join(out), label=label)


def grouped_columns(groups, *, label, series=("This utility", "Peer median"), vmax=50, note=None):
    """Two series side by side per category. groups: [{name, a, b}] as percents."""
    x0, x1, ybase, ytop = 58, 608, 168, 34
    out = []
    n = len(groups)
    slot = (x1 - x0) / n
    bw = min(26, slot * 0.28)
    for i, g in enumerate(groups):
        cx = x0 + slot * (i + 0.5)
        for j, (v, fill, cls) in enumerate(((g["a"], COPPER, "gy hi"), (g["b"], AXIS, "gy"))):
            bx = cx - bw - 3 + j * (bw + 6)
            bh = (ybase - ytop) * v / vmax
            out.append(rect(bx, ybase - bh, bw, bh, fill, cls=cls, op=1 if j == 0 else 0.6))
            out.append(counted(bx + bw / 2, ybase - bh - 6, f"{v:g}%", size=11,
                               fill=COPPER_TEXT if j == 0 else SLATE, family=DISPLAY,
                               weight=700, cls="pop"))
        out.append(text(cx, ybase + 17, g["name"], size=10.5, fill=BODY, cls="pop"))
        if g.get("name2"):
            out.append(text(cx, ybase + 30, g["name2"], size=10.5, fill=BODY, cls="pop"))
    out.append(line(x0, ybase, x1, ybase, INK, sw=1.4))
    ly = 218
    out.append(rect(x0, ly - 9, 11, 11, COPPER, rx=2))
    out.append(text(x0 + 18, ly, series[0], size=10.5, fill=BODY, anchor="start"))
    lx = x0 + 22 + len(series[0]) * 5.6
    out.append(rect(lx, ly - 9, 11, 11, AXIS, rx=2, op=0.6))
    out.append(text(lx + 18, ly, series[1], size=10.5, fill=BODY, anchor="start"))
    if note:
        out.append(text(x1, ly, note, size=10.5, fill=SLATE, anchor="end"))
    return svg("".join(out), label=label)


def build_up(cols, *, label, legend, gap_note=None, note=None):
    """Two stacked cost columns compared element by element (quote vs should-cost)."""
    ybase, ytop = 176, 40
    out = []
    scale = (ybase - ytop) / 104
    xs = [78, 232]
    bw = 92
    for ci, col in enumerate(cols):
        cy = ybase
        for si, seg in enumerate(col["segs"]):
            h = seg * scale
            fill = COPPER if si == len(col["segs"]) - 1 else RAMP[si]
            lab = PAPER if si != len(col["segs"]) - 1 else PAPER
            cls = "gy hi" if si == len(col["segs"]) - 1 else "gy"
            out.append(rect(xs[ci], cy - h, bw, h, fill, cls=cls))
            if h > 15:
                out.append(counted(xs[ci] + bw / 2, cy - h / 2 + 5, f"{seg:g}", size=12.5,
                                   fill=lab, family=DISPLAY, weight=700, cls="pop"))
            cy -= h
        out.append(counted(xs[ci] + bw / 2, cy - 9, f'{col["total"]:g}', size=15, fill=INK,
                           family=DISPLAY, weight=700, cls="pop"))
        out.append(text(xs[ci] + bw / 2, ybase + 18, col["name"], size=11, fill=INK,
                        family=SANS, weight=600, cls="pop"))
        if col.get("sub"):
            out.append(text(xs[ci] + bw / 2, ybase + 31, col["sub"], size=10, fill=AXIS, cls="pop"))
    if gap_note:
        # The gap is the height difference between the two columns, so outline
        # exactly that band on the shorter one rather than floating a box near
        # it — and label it to the right, clear of the column total.
        gy0 = ybase - cols[0]["total"] * scale
        gy1 = ybase - cols[1]["total"] * scale
        out.append(rect(xs[1], gy0, bw, gy1 - gy0, COPPER, rx=1.5, op=0.16, cls="pop"))
        out.append(f'<rect class="pop" x="{xs[1]:g}" y="{gy0:g}" width="{bw:g}" '
                   f'height="{gy1 - gy0:g}" fill="none" stroke="{COPPER}" '
                   f'stroke-width="1.2" stroke-dasharray="4 3" rx="1.5" />')
        out.append(text(xs[1] + bw + 10, gy0 - 4, gap_note, size=11.5, fill=COPPER_TEXT,
                        family=DISPLAY, anchor="start", weight=700, cls="pop"))
    lx, ly = 404, 58
    for i, (name, val) in enumerate(legend):
        fill = COPPER if i == len(legend) - 1 else RAMP[i]
        out.append(rect(lx, ly + i * 22 - 9, 11, 11, fill, rx=2, cls="pop"))
        out.append(text(lx + 18, ly + i * 22, name, size=11, fill=BODY, anchor="start", cls="pop"))
        out.append(text(lx + 170, ly + i * 22, val, size=11, fill=INK, family=MONO,
                        anchor="end", cls="pop"))
    out.append(line(lx, ly + len(legend) * 22 - 4, lx + 170, ly + len(legend) * 22 - 4, HAIR))
    if note:
        out.append(text(lx, ly + len(legend) * 22 + 12, note, size=10, fill=AXIS, anchor="start"))
    out.append(line(48, ybase, 340, ybase, INK, sw=1.4))
    return svg("".join(out), label=label)


def waterfall(steps, *, label, note=None):
    """Bridge from an opening value to a closing one. steps: first and last are
    absolute bars; the middle ones are deltas."""
    ybase, ytop = 176, 40
    out = []
    vals = [s["v"] for s in steps]
    top = max(vals[0], vals[-1]) * 1.16
    scale = (ybase - ytop) / top
    x0, slot = 46, 112
    bw = 66
    run = vals[0]
    for i, s in enumerate(steps):
        bx = x0 + i * slot
        if i == 0 or i == len(steps) - 1:
            h = s["v"] * scale
            y = ybase - h
            out.append(rect(bx, y, bw, h, COPPER if i == len(steps) - 1 else INK,
                            cls="gy hi" if i == len(steps) - 1 else "gy"))
            out.append(counted(bx + bw / 2, y - 9, s["disp"], size=13, fill=INK, family=DISPLAY,
                               weight=700, cls="pop"))
            if i == 0:
                run = s["v"]
        else:
            h = abs(s["v"]) * scale
            y = ybase - run * scale
            out.append(rect(bx, y, bw, max(h, 2), AXIS, cls="gy", op=0.7))
            out.append(counted(bx + bw / 2, y - 9, s["disp"], size=11.5, fill=SLATE,
                               family=DISPLAY, weight=700, cls="pop"))
            out.append(line(bx + bw, y + h, bx + slot, y + h, HAIR, sw=1, dash="3 3"))
            run += s["v"]
        out.append(text(bx + bw / 2, ybase + 18, s["name"], size=10.5, fill=BODY, cls="pop"))
        if s.get("name2"):
            out.append(text(bx + bw / 2, ybase + 31, s["name2"], size=10.5, fill=BODY, cls="pop"))
    out.append(line(x0 - 8, ybase, x0 + len(steps) * slot - 40, ybase, INK, sw=1.4))
    if note:
        out.append(note_lines(x0 - 8, 222, note, max_px=600))
    return svg("".join(out), label=label)


def compare_table(rows, *, label, heads, note=None):
    """A before/after comparison. Rendered as SVG so the exhibit travels to the
    website through the same path as every chart."""
    out = []
    # Three columns inside 640: the row label, the "before" state and the
    # "after" state. The before/after cells carry near-sentence-length text, so
    # the type is set at 10.2 and the columns are sized to the longest cell
    # rather than split evenly — at 11pt the longest rows ran past the divider.
    x_lab, x_a, x_b, x_end = 20, 160, 392, 632
    fs = 10.2
    y0, rh = 46, 30
    out.append(text(x_a, y0 - 14, heads[0], size=10, fill=AXIS, family=MONO, anchor="start"))
    out.append(text(x_b, y0 - 14, heads[1], size=10, fill=COPPER_TEXT, family=MONO, anchor="start"))
    out.append(line(x_b - 14, y0 - 28, x_b - 14, y0 + rh * len(rows) - 6, COPPER, sw=1.4))
    for i, r in enumerate(rows):
        y = y0 + i * rh
        out.append(line(x_lab, y - 12, x_end, y - 12, HAIR))
        out.append(text(x_lab, y + 6, r["k"], size=fs + 0.6, fill=INK, family=SANS,
                        anchor="start", weight=600, cls="pop"))
        out.append(text(x_a, y + 6, r["a"], size=fs, fill=AXIS, anchor="start", cls="pop"))
        out.append(text(x_b, y + 6, r["b"], size=fs, fill=INK, anchor="start", cls="pop hi"))
    out.append(line(x_lab, y0 + rh * len(rows) - 12, x_end, y0 + rh * len(rows) - 12, HAIR))
    if note:
        out.append(note_lines(x_lab, y0 + rh * len(rows) + 10, note, max_px=x_end - x_lab))
    return svg("".join(out), label=label)
