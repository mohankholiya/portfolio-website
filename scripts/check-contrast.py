"""Check WCAG contrast for every text/background pair the site actually uses.

Colour tokens get edited in isolation and regress quietly, so the pairings are
listed explicitly here rather than inferred. AA is 4.5:1 for body text and
3:1 for large text (>=18.66px bold or >=24px) and for non-text UI such as
chart marks against the chart surface.
"""

from __future__ import annotations

import sys

TOKENS = {
    "paper": "#f6f8fa",
    "surface": "#ffffff",
    "surface-tint": "#eef2f6",
    "ink": "#0c2438",
    "body": "#3a4751",
    "muted": "#536575",
    "accent": "#c2772f",
    "accent-text": "#8a4e18",
    "on-ink": "#f4f7fa",
    "light-ink": "#bdcbd5",
    "light-accent": "#e4ae74",
    "series-subject": "#c2772f",
    "series-context": "#1f6f9c",
    "series-third": "#3f8f5f",
    "chart-axis": "#7e8c99",
}

# (foreground, background, minimum ratio, what it is)
PAIRS: list[tuple[str, str, float, str]] = [
    ("ink", "surface", 4.5, "headings on card"),
    ("ink", "paper", 4.5, "headings on page"),
    ("ink", "surface-tint", 4.5, "headings on tinted section"),
    ("body", "surface", 4.5, "body copy on card"),
    ("body", "paper", 4.5, "body copy on page"),
    ("body", "surface-tint", 4.5, "body copy on tinted section"),
    ("muted", "surface", 4.5, "captions and chart labels"),
    ("muted", "paper", 4.5, "captions on page"),
    ("muted", "surface-tint", 4.5, "captions on tinted section"),
    ("accent-text", "surface", 4.5, "eyebrow / accent text on card"),
    ("accent-text", "paper", 4.5, "eyebrow / accent text on page"),
    ("accent-text", "surface-tint", 4.5, "eyebrow on tinted section"),
    ("on-ink", "ink", 4.5, "text inside the dark proof panel"),
    ("light-ink", "ink", 4.5, "secondary text in the dark panel"),
    ("light-accent", "ink", 4.5, "accent text in the dark panel"),
    ("surface", "ink", 4.5, "primary button label"),
    # Non-text: chart marks and axes against the chart surface.
    ("series-subject", "surface", 3.0, "copper series mark"),
    ("series-context", "surface", 3.0, "petrol series mark"),
    ("series-third", "surface", 3.0, "third series mark"),
    ("chart-axis", "surface", 3.0, "chart baseline"),
    ("chart-axis", "paper", 3.0, "chart baseline on page"),
]


def luminance(hex_colour: str) -> float:
    h = hex_colour.lstrip("#")
    channels = [int(h[i : i + 2], 16) / 255 for i in (0, 2, 4)]
    linear = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in channels]
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]


def ratio(fg: str, bg: str) -> float:
    a, b = luminance(fg), luminance(bg)
    lighter, darker = max(a, b), min(a, b)
    return (lighter + 0.05) / (darker + 0.05)


def main() -> int:
    failures = 0
    for fg, bg, minimum, label in PAIRS:
        value = ratio(TOKENS[fg], TOKENS[bg])
        ok = value >= minimum
        failures += not ok
        print(
            f"{'PASS' if ok else 'FAIL'}  {value:5.2f}:1  (min {minimum})  "
            f"{fg} on {bg}  -  {label}"
        )
    print()
    if failures:
        print(f"FAILED: {failures} pair(s) below the minimum.")
        return 1
    print(f"PASS: all {len(PAIRS)} colour pairs meet their minimum.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
