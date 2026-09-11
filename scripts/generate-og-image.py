"""Render the Open Graph share card from the site's own tokens and fonts.

The redesign dropped og:image entirely, so every LinkedIn and WhatsApp share
rendered as a bare text link. This regenerates a 1200x630 card using the same
Archivo / IBM Plex Mono pairing and the same slate/copper palette as the site,
so the share card and the page look like the same product.

Run: python scripts/generate-og-image.py
"""

from __future__ import annotations

import io
from pathlib import Path

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
FONTS = ROOT / "public" / "fonts"
OUT = ROOT / "public" / "og-image.png"

WIDTH, HEIGHT = 1200, 630
SCALE = 2  # render at 2x then downsample, so type edges stay clean

INK = (12, 36, 56)
PAPER = (246, 248, 250)
COPPER = (194, 119, 47)
MUTED = (83, 101, 117)
HAIRLINE = (215, 222, 228)
ON_INK = (244, 247, 250)

FACTS = [
    ("16+ yrs", "Energy, utilities, telecom"),
    ("PS100M", "Category spend owned, BT Group"),
    ("$2.2B", "Upstream capital benchmarked"),
]


def load(name: str, size: int, weight: int | None = None) -> ImageFont.FreeTypeFont:
    """Load a woff2 face as a PIL font, converting in memory.

    PIL cannot read woff2, and fontsource ships woff2 only, so the face is
    decompressed to an in-memory TTF first. Variable faces are pinned to a
    single weight because PIL renders the default instance otherwise.
    """
    font = TTFont(FONTS / name)
    if weight is not None and "fvar" in font:
        from fontTools.varLib.instancer import instantiateVariableFont

        font = instantiateVariableFont(font, {"wght": weight}, inplace=False)
    buffer = io.BytesIO()
    font.flavor = None  # drop woff2 compression on the way out
    font.save(buffer)
    buffer.seek(0)
    return ImageFont.truetype(buffer, size)


def main() -> None:
    w, h = WIDTH * SCALE, HEIGHT * SCALE
    img = Image.new("RGB", (w, h), PAPER)
    d = ImageDraw.Draw(img)

    display_bold = load("archivo-var.woff2", 68 * SCALE, weight=700)
    display_mid = load("archivo-var.woff2", 30 * SCALE, weight=600)
    fact_value = load("archivo-var.woff2", 34 * SCALE, weight=700)
    mono = load("plex-mono-500.woff2", 19 * SCALE)
    mono_sm = load("plex-mono-400.woff2", 17 * SCALE)

    pad = 76 * SCALE

    # Copper rule across the top. The site's own signature mark.
    d.rectangle([0, 0, w, 10 * SCALE], fill=COPPER)

    # Eyebrow
    d.text(
        (pad, 92 * SCALE),
        "PROCUREMENT & SUPPLY CHAIN LEADERSHIP",
        font=mono,
        fill=COPPER,
    )

    # Name
    d.text((pad, 140 * SCALE), "Mohan Kholiya", font=display_bold, fill=INK)

    # Positioning line, two lines, hand-broken so it never wraps badly.
    d.text(
        (pad, 236 * SCALE),
        "Commercial insight.",
        font=display_mid,
        fill=INK,
    )
    d.text(
        (pad, 278 * SCALE),
        "Operational impact.",
        font=display_mid,
        fill=(138, 78, 24),
    )

    # Fact strip along the bottom, divided by hairlines.
    strip_top = 400 * SCALE
    d.line([pad, strip_top, w - pad, strip_top], fill=HAIRLINE, width=2 * SCALE)

    col_w = (w - pad * 2) // 3
    for i, (value, label) in enumerate(FACTS):
        x = pad + i * col_w
        if i:
            d.line(
                [x - 24 * SCALE, strip_top + 26 * SCALE, x - 24 * SCALE, strip_top + 118 * SCALE],
                fill=HAIRLINE,
                width=2 * SCALE,
            )
        # PIL has no pound glyph guarantee in every subset; draw it from the face
        text = value.replace("PS", "£")
        d.text((x, strip_top + 34 * SCALE), text, font=fact_value, fill=INK)
        d.text((x, strip_top + 86 * SCALE), label, font=mono_sm, fill=MUTED)

    # Footer bar carrying the domain.
    bar_top = h - 66 * SCALE
    d.rectangle([0, bar_top, w, h], fill=INK)
    d.text(
        (pad, bar_top + 22 * SCALE),
        "mohankholiya.co.in",
        font=mono,
        fill=ON_INK,
    )

    img = img.resize((WIDTH, HEIGHT), Image.LANCZOS)
    img.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
