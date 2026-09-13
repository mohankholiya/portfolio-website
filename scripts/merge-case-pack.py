"""Merge the six case one-pagers into a single downloadable case pack.

One file a recruiter can forward is worth more than six they have to collect, so the
per-case PDFs stay available and this is offered alongside them. Page order follows
the Case 01-06 numbering.
"""
from pathlib import Path

from pypdf import PdfWriter

ROOT = Path(__file__).resolve().parents[1]
DIR = ROOT / "public" / "case-studies"
OUT = ROOT / "public" / "Mohan_Kholiya_Case_Studies.pdf"

ORDER = [
    "capital-cost-competitiveness",
    "unit-rate-governance",
    "supply-chain-benchmarking",
    "bt-contract-renewal",
    "accenture-capex-sourcing",
    "category-intelligence",
]

writer = PdfWriter()
for slug in ORDER:
    src = DIR / f"{slug}.pdf"
    if not src.exists():
        raise SystemExit(f"missing {src} — run `node scripts/gen-case-pdfs.mjs` first")
    writer.append(src)

writer.add_metadata(
    {
        "/Title": "Mohan Kholiya - Selected Case Studies",
        "/Author": "Mohan Kholiya",
        "/Subject": "Procurement and supply chain engagements across energy, utilities and telecom",
    }
)
writer.write(OUT)
writer.close()

print(f"wrote {OUT.relative_to(ROOT)}  ({len(ORDER)} pages, {OUT.stat().st_size:,} bytes)")
