"""Extract the analytical exhibits from the consulting one-pagers into src/content/exhibits.ts.

The one-pagers in `new case study/` are the strongest version of each analysis: real
peer distributions, Pareto concentration, should-cost build-ups, box plots by role.
They are the source of truth for the charts on the case study pages, so the SVGs are
carried across rather than redrawn, and this script is the only thing that writes
src/content/exhibits.ts.

The one-pagers were authored against the same navy / copper system as the site, but a
few of their greys and navies are near-duplicates of the site's tokens rather than the
tokens themselves. PALETTE maps those onto the real token values, and the script then
asserts that nothing outside the token set survives, so a chart cannot quietly drift
off-palette. Colours are written as literal hex rather than var(): a CSS custom
property inside an SVG presentation attribute is not reliably supported.

Re-run: python scripts/extract-exhibits.py
"""
import html as htmllib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "new case study"
OUT = ROOT / "src" / "content" / "exhibits.ts"

# Source one-pager filename -> case study id in src/content/site.ts.
ORDER = [
    ("capital-cost-competitiveness", "capital-cost-competitiveness"),
    ("unit-rate-governance", "unit-rate-governance"),
    ("supply-chain-benchmarking", "supply-chain-benchmarking"),
    ("bt-contract-renewal", "bt-contract-renewal"),
    ("accenture-capex-sourcing", "accenture-capex-sourcing"),
    ("category-intelligence", "category-intelligence"),
]

# One-pager colour -> site token value. Keys that map to themselves are listed so
# the allowed set below is explicit rather than implied.
PALETTE = {
    "#0c2438": "#0c2438",  # --color-ink
    "#10314c": "#0c2438",  # one-pager "deep"; site has no second navy
    "#33536e": "#0c2438",  # chart axis rules and peer-average ticks
    "#3a4751": "#3a4751",  # --color-body
    "#536575": "#536575",  # --color-muted
    "#7e8c99": "#7e8c99",  # --chart-axis
    "#7e8e9e": "#7e8c99",
    "#8295a3": "#7e8c99",
    "#8a99a8": "#7e8c99",  # peer marks
    "#5b6b7a": "#7e8c99",  # peer mark strokes
    "#9aa8b4": "#7e8c99",
    "#c2cdd6": "#d7dee4",
    "#d7dee4": "#d7dee4",  # --color-hairline
    "#e3e9ee": "#e3e9ee",  # --chart-grid
    "#eef2f6": "#eef2f6",  # --color-surface-tint
    "#ffffff": "#ffffff",  # --color-surface
    "#c2772f": "#c2772f",  # --series-subject
    "#8a4e18": "#8a4e18",  # --color-accent-text
    "#f6e9da": "#f6e9da",  # --color-accent-tint
    "#1f6f9c": "#1f6f9c",  # --series-context
    # The four below are series-tinted <text> labels, not fills. They read fine in
    # print but sit between 2.0:1 and 4.3:1 on a white chart, under the 4.5:1 that
    # ~10px labels need. They move to the accessible token of the same hue; the
    # series association still reads from position and from the mark they label.
    "#e0a86a": "#8a4e18",  # copper label   2.0:1 -> 6.6:1
    "#5b7f9c": "#1f6f9c",  # petrol label   4.3:1 -> 5.5:1
    "#8fb0c4": "#1f6f9c",  # light petrol   2.3:1 -> 5.5:1
    "#7e93a4": "#536575",  # grey label     3.1:1 -> 6.0:1
}
ALLOWED = set(PALETTE.values())

HEX = re.compile(r"#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b")


def clean(s: str) -> str:
    return htmllib.unescape(re.sub(r"\s+", " ", s)).strip()


def one(pattern: str, text: str) -> str:
    m = re.search(pattern, text, re.S)
    if not m:
        raise ValueError(f"pattern not found: {pattern[:60]}")
    return m.group(1)


def recolour(svg: str, where: str) -> str:
    def sub(m: re.Match) -> str:
        h = m.group(0).lower()
        if len(h) == 4:  # #abc -> #aabbcc
            h = "#" + "".join(c * 2 for c in h[1:])
        if h not in PALETTE:
            raise SystemExit(f"{where}: colour {h} is not in PALETTE; map it deliberately")
        return PALETTE[h]

    out = HEX.sub(sub, svg)
    stray = {m.group(0).lower() for m in HEX.finditer(out)} - ALLOWED
    if stray:
        raise SystemExit(f"{where}: off-palette colours survived: {sorted(stray)}")
    return out


def parse(stem: str, case_id: str) -> dict:
    raw = (SRC / f"{stem}.html").read_text(encoding="utf-8")
    exhibits = []
    for fig in re.findall(r'<figure class="exhibit".*?</figure>', raw, re.S):
        num = clean(one(r'<span class="ex-num">(.*?)</span>', fig))
        svg = one(r'<div class="ex-chart">(.*?)</div>', fig).strip()
        exhibits.append(
            {
                "num": num,
                "title": clean(one(r"<h3>(.*?)</h3>", fig)),
                "sub": clean(one(r'<p class="ex-sub">(.*?)</p>', fig)),
                "svg": recolour(svg, f"{case_id} / {num}"),
                "soWhat": clean(one(r'<aside class="ex-sowhat">.*?<p>(.*?)</p>', fig)),
            }
        )
    if len(exhibits) != 2:
        raise SystemExit(f"{case_id}: expected 2 exhibits, found {len(exhibits)}")
    return {"id": case_id, "exhibits": exhibits}


def ts(value, indent: int = 0) -> str:
    pad = "  " * indent
    if isinstance(value, str):
        return json.dumps(value, ensure_ascii=False)
    if isinstance(value, list):
        return "[\n" + ",\n".join(f"{pad}  {ts(v, indent + 1)}" for v in value) + f",\n{pad}]"
    if isinstance(value, dict):
        return "{\n" + ",\n".join(f"{pad}  {k}: {ts(v, indent + 1)}" for k, v in value.items()) + f",\n{pad}}}"
    raise TypeError(type(value))


def main() -> None:
    cases = [parse(stem, case_id) for stem, case_id in ORDER]
    body = ",\n  ".join(
        f"{json.dumps(c['id'])}: {ts(c['exhibits'], 1)}" for c in cases
    )
    OUT.write_text(
        "/* AUTO-GENERATED by scripts/extract-exhibits.py - do not hand-edit.\n"
        "   Source of truth: `new case study/*.html`, the consulting one-pagers.\n"
        "   Re-run: python scripts/extract-exhibits.py */\n\n"
        "export interface CaseExhibit {\n"
        "  /** \"Exhibit 1\" / \"Exhibit 2\", as numbered on the one-pager. */\n"
        "  num: string;\n"
        "  title: string;\n"
        "  /** What the chart plots and on what basis. */\n"
        "  sub: string;\n"
        "  /** Inline SVG, authored locally. No external input reaches this. */\n"
        "  svg: string;\n"
        "  /** The reading of the chart. Renders beside it, never as a caption. */\n"
        "  soWhat: string;\n"
        "}\n\n"
        "export const caseExhibits: Record<string, CaseExhibit[]> = {\n  "
        + body
        + ",\n};\n",
        encoding="utf-8",
    )

    for c in cases:
        print(f"  {c['id']:32} {len(c['exhibits'])} exhibits")
        for e in c["exhibits"]:
            print(f"      {e['num']}: {e['title'][:58]}")
    print(f"\nwrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
