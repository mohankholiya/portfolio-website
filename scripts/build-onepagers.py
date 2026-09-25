"""Write the six case-study one-pagers in `new case study/` from structured copy.

These six A4-landscape pages are the source of truth for the case studies: the
website's exhibits are extracted from them by `extract-exhibits.py`, and the
downloadable PDFs are printed from them by `gen-case-pdfs.mjs`. Keeping the copy
and the charts here rather than in six hand-maintained HTML files is what stops
the decks drifting apart from each other — every page gets the same grid, the
same type scale and the same footer discipline by construction.

Run order when anything here changes:

    python scripts/build-onepagers.py      # this file -> new case study/*.html
    python scripts/extract-exhibits.py     # -> src/content/exhibits.ts
    node   scripts/gen-case-pdfs.mjs       # -> public/case-studies/*.pdf
    python scripts/merge-case-pack.py      # -> public/Mohan_Kholiya_Case_Studies.pdf

The `id` of each case is a live URL. Never rename one in isolation: it must stay
in step with `caseStudies` in src/content/site.ts, the route files under
src/pages/case-studies/, and public/_redirects.
"""

from pathlib import Path

import onepager_charts as C

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "new case study"

CSS = """
@font-face{font-family:"Archivo";src:url("fonts/archivo-var.woff2")format("woff2");font-weight:100 900;font-display:block;}
@font-face{font-family:"Source Serif 4";src:url("fonts/source-serif-4-var.woff2")format("woff2");font-weight:400 700;font-display:block;}
@font-face{font-family:"Source Sans 3";src:url("fonts/source-sans-3-var.woff2")format("woff2");font-weight:200 900;font-display:block;}
@font-face{font-family:"IBM Plex Mono";src:url("fonts/plex-mono-400.woff2")format("woff2");font-weight:400;font-display:block;}
@font-face{font-family:"IBM Plex Mono";src:url("fonts/plex-mono-500.woff2")format("woff2");font-weight:500;font-display:block;}

:root{
  --ink:#0c2438; --deep:#10314c; --body:#3a4751; --muted:#536575;
  --hair:#d7dee4; --accent:#c2772f; --accent-text:#8a4e18; --accent-tint:#f6e9da;
  --band:#eef2f6; --paper:#fff; --on-ink:#f4f7fa; --dark-rule:#30495c;
  --display:"Archivo",sans-serif; --serif:"Source Serif 4",Georgia,serif;
  --sans:"Source Sans 3",sans-serif; --mono:"IBM Plex Mono",monospace;
}

@page{size:297mm 210mm;margin:0;}
*{box-sizing:border-box;margin:0;padding:0;}
html,body{background:#fff;}
body{font-family:var(--sans);color:var(--body);
  -webkit-print-color-adjust:exact;print-color-adjust:exact;text-rendering:geometricPrecision;}

.page{width:297mm;height:210mm;padding:10mm 11mm;display:flex;flex-direction:column;
  overflow:hidden;position:relative;}
.page::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2.6mm;background:var(--ink);}
.page::after{content:"";position:absolute;left:0;top:0;width:2.6mm;height:46mm;background:var(--accent);}
.page > *{padding-left:5mm;}

.head{height:7.4mm;flex:0 0 7.4mm;display:flex;align-items:baseline;
  justify-content:space-between;border-bottom:0.35mm solid var(--ink);}
.wordmark{font-family:var(--display);font-weight:700;font-size:9pt;letter-spacing:.22em;
  text-transform:uppercase;color:var(--ink);}
.head-right{font-family:var(--mono);font-size:6.8pt;letter-spacing:.14em;
  text-transform:uppercase;color:var(--muted);}
.head-right b{color:var(--accent-text);font-weight:500;}

/* The headline is the argument, so it takes the serif. */
.title-block{flex:0 0 20mm;padding-top:3.2mm;display:flex;gap:6mm;align-items:flex-start;}
.title-block h1{font-family:var(--serif);font-weight:600;font-size:18pt;line-height:1.15;
  letter-spacing:-0.008em;color:var(--ink);flex:0 0 116mm;}
.governing{font-size:9pt;line-height:1.42;color:var(--muted);padding-top:0.4mm;
  border-left:0.35mm solid var(--hair);padding-left:5mm;}

.facts{flex:0 0 10.4mm;display:grid;grid-template-columns:repeat(4,1fr);
  border-top:0.25mm solid var(--hair);border-bottom:0.25mm solid var(--hair);margin-top:1.4mm;}
.fact{padding:1.7mm 4mm 1.7mm 0;border-right:0.25mm solid var(--hair);}
.fact:last-child{border-right:0;}
.fact-k{display:block;font-family:var(--mono);font-size:6.2pt;letter-spacing:.14em;
  text-transform:uppercase;color:#8295a3;margin-bottom:0.6mm;}
.fact-v{display:block;font-family:var(--display);font-weight:600;font-size:7.8pt;
  line-height:1.24;color:var(--deep);}

.body{flex:1 1 auto;display:grid;grid-template-columns:90mm 1fr;gap:6.4mm;
  padding-top:3.2mm;min-height:0;}
.col-left{display:flex;flex-direction:column;gap:2.8mm;min-height:0;}
.sec-label{font-family:var(--mono);font-size:6.4pt;letter-spacing:.16em;text-transform:uppercase;
  color:var(--accent-text);display:flex;align-items:center;gap:2mm;margin-bottom:1.3mm;}
.sec-label::after{content:"";flex:1;height:0.25mm;background:var(--hair);}
.col-left p{font-size:7.9pt;line-height:1.36;color:var(--body);}
.col-left ul{list-style:none;}
.col-left li{font-size:7.9pt;line-height:1.34;color:var(--body);padding-left:3.4mm;
  position:relative;margin-bottom:1.2mm;}
.col-left li:last-child{margin-bottom:0;}
.col-left li::before{content:"";position:absolute;left:0;top:1.5mm;width:1.6mm;height:0.5mm;
  background:var(--accent);}
.judgment p{font-family:var(--serif);font-weight:500;font-size:8.4pt;line-height:1.36;
  color:var(--deep);}

.col-right{display:flex;flex-direction:column;gap:3.4mm;min-height:0;}
.exhibit{flex:1 1 0;display:flex;flex-direction:column;min-height:0;
  border:0.25mm solid var(--hair);border-radius:1.6mm;padding:2.4mm 3mm 2mm;background:var(--paper);}
.ex-head{display:flex;align-items:baseline;gap:2.6mm;flex-wrap:wrap;
  border-bottom:0.25mm solid var(--hair);padding-bottom:1.3mm;}
.ex-num{font-family:var(--mono);font-size:6.2pt;letter-spacing:.14em;text-transform:uppercase;
  color:var(--accent-text);}
.ex-head h3{font-family:var(--display);font-weight:700;font-size:9pt;color:var(--ink);
  letter-spacing:-0.005em;}
.ex-sub{font-size:7.2pt;color:#8295a3;margin-left:auto;}
.ex-body{flex:1 1 auto;display:grid;grid-template-columns:1fr 46mm;gap:3.2mm;min-height:0;
  padding-top:1.4mm;}
.ex-chart{min-height:0;display:flex;align-items:center;}
.ex-chart svg{width:100%;height:auto;max-height:100%;display:block;}
.ex-sowhat{border-left:0.35mm solid var(--accent);padding-left:2.8mm;display:flex;
  flex-direction:column;justify-content:center;}
.sw-label{font-family:var(--mono);font-size:6.2pt;letter-spacing:.16em;text-transform:uppercase;
  color:var(--accent-text);margin-bottom:1.1mm;}
.ex-sowhat p{font-size:7.6pt;line-height:1.38;color:var(--body);}

/* Three statements of what the work produced, then the single number it is
   remembered by. Three columns, not a bulleted list: each is a whole claim. */
.results{flex:0 0 25mm;margin-top:3mm;display:grid;grid-template-columns:1fr 56mm;
  background:var(--ink);border-radius:1.6mm;overflow:hidden;}
.results-main{padding:2.4mm 4mm 2.2mm;min-width:0;display:flex;flex-direction:column;}
.results .sec-label{color:#e4ae74;margin-bottom:1.6mm;}
.results .sec-label::after{background:var(--dark-rule);}
.delivered{display:grid;grid-template-columns:repeat(3,1fr);gap:0 5mm;flex:1 1 auto;}
.delivered p{font-size:7.4pt;line-height:1.32;color:var(--on-ink);
  border-top:0.3mm solid var(--dark-rule);padding-top:1.4mm;}
.metric{background:var(--accent);padding:2.4mm 4mm;display:flex;flex-direction:column;
  justify-content:center;}
.metric .m-label{font-family:var(--mono);font-size:6pt;letter-spacing:.14em;
  text-transform:uppercase;color:#4a2a0c;margin-bottom:0.8mm;}
.metric .m-value{font-family:var(--serif);font-weight:700;font-size:21pt;line-height:1;
  color:#fff;letter-spacing:-0.015em;}
.metric .m-sub{font-size:7.2pt;line-height:1.24;color:#fdf3e8;margin-top:1.1mm;}
.metric .m-award{font-size:6.6pt;line-height:1.24;color:#fff;margin-top:1.6mm;
  padding-top:1.4mm;border-top:0.3mm solid rgba(255,255,255,.4);font-weight:600;}

/* Sources sit before the anonymisation note: a reader checking the numbers
   should not have to take the disclaimer first. */
.foot{flex:0 0 9mm;display:flex;align-items:flex-end;gap:6mm;padding-top:1.6mm;}
.note{font-size:6.1pt;line-height:1.32;color:#7b8896;flex:1 1 auto;}
.note b{color:var(--muted);font-weight:600;}
.contact{font-family:var(--mono);font-size:6.4pt;line-height:1.5;color:var(--muted);
  text-align:right;white-space:nowrap;}
.contact b{color:var(--ink);font-weight:500;}
"""

# ── The six cases ────────────────────────────────────────────────────────
# `id` is a live URL. See the module docstring before renaming one.

CASES = [
    {
        "id": "capital-cost-competitiveness",
        "kicker": "Energy &amp; oil and gas",
        "num": "Case 01",
        "topic": "Capital cost benchmarking",
        "h1": "Benchmarking system by system replaced a blanket cost mandate with a focused agenda.",
        "governing": "A pre-FEED gas development had been told it was not first quartile, with no evidence of where or why. Two independent benchmarks — top-down against 27 peers and bottom-up to component level — put the gap in pipeline and rig rate, and cleared production facilities.",
        "facts": [
            ("Industry", "Oil &amp; gas — upstream, offshore"),
            ("Engagement context", "Consulting · Wood Mackenzie · supermajor, $2B+ gas development"),
            ("Role", "Independent competitiveness review (pre-FEED)"),
            ("Duration", "4 months"),
        ],
        "situation": [
            "An internal review placed costs outside first quartile, with no like-for-like evidence of where.",
            "Comparable shallow-water gas peers were scarce, so a credible peer set was the first problem to solve.",
            "Without isolating the systems driving the gap, the default response would be to cut everywhere.",
        ],
        "contribution": "Led the benchmarking workstream: built the 27-peer set, normalised cost top-down by system and bottom-up by component, and turned a fragmented cost picture into an independent, board-ready verdict for the gap-to-goal workshop.",
        "judgment": "First quartile is not the right goal for every system. Separating structural gaps — tie-back distance, seabed conditions, a thin regional contracting market — from commercially addressable ones such as rig rate made the benchmark actionable rather than merely damning.",
        "exhibits": [
            {
                "title": "Two of three cost systems sit in the fourth quartile",
                "sub": "Normalised unit cost vs 27-peer set",
                "svg": C.dot_strip(
                    [
                        {"name": "Production facilities", "unit": "$/tonne", "pos": 0.42},
                        {"name": "Pipeline", "unit": "$/km", "pos": 0.82},
                        {"name": "Drilling & completions", "unit": "$/ft", "pos": 0.77},
                    ],
                    label="Quartile position by cost system: production facilities in the second quartile, pipeline and drilling and completions in the fourth",
                ),
                "sowhat": "The cost story is not uniform. Facilities sit mid-pack; pipeline and drilling sit in the fourth quartile, so a cut-everything mandate would spend effort where the project is already competitive.",
            },
            {
                "title": "Rig rate carries 41% of drilling and completions cost",
                "sub": "Share of benchmarked D&amp;C cost",
                "svg": C.stacked_bar(
                    [
                        {"pct": 41, "label": "Rig rate"},
                        {"pct": 17, "label": "Tubulars", "sub": "& casing"},
                        {"pct": 15, "label": "Wellhead &", "sub": "completion"},
                        {"pct": 14, "label": "Services", "sub": "& fluids"},
                        {"pct": 13, "label": "Logistics", "sub": "& other"},
                    ],
                    label="Rig rate is 41 percent of drilling and completions cost, ahead of tubulars at 17, wellhead at 15, services at 14 and logistics at 13",
                    note="Rig rate benchmarked against premium regional jack-up rates: fourth quartile on ~40 planned drill days, against a 30–50 day peer range.",
                ),
                "sowhat": "One line item carries the category, and it is the one genuinely open to negotiation — turning “drilling looks expensive” into a specific commercial lever.",
            },
        ],
        "delivered": [
            "The first credible like-for-like cost view: a 27-project peer set built where few ideal comparators existed.",
            "A system-level verdict: second quartile on facilities, fourth quartile on pipeline and on drilling &amp; completions.",
            "The pre-FEED agenda reframed from cutting everywhere to two evidence-backed levers: pipeline and rig rate.",
        ],
        "metric": ("2 of 3", "cost systems in the fourth quartile"),
        "award": "Recognised with the firm’s Q3 Innovation Award",
        "sources": "Operator cost submission benchmarked against an independent project-cost database; n=27 peers, normalised for scope, water depth and first-production year. Component shares from transactional benchmarking; ~52% of D&amp;C rebuilt bottom-up.",
    },
    {
        "id": "unit-rate-governance",
        "kicker": "Utilities",
        "num": "Case 02",
        "topic": "Spend diagnostics &amp; contract strategy",
        "h1": "One governance gap repeating six times, not six expensive contractors.",
        "governing": "A ~$230M contractor programme was billing roughly $5–6M a year above the assessment benchmark. The cause was not who held the work but the absence of rate-book enforcement — so replacing contractors would have reproduced it.",
        "facts": [
            ("Industry", "Energy &amp; utilities — electric distribution"),
            ("Engagement context", "Consulting · large US investor-owned utility"),
            ("Role", "Independent commercial assessment (pre-RFP)"),
            ("Duration", "6 weeks"),
        ],
        "situation": [
            "A five-year renewal of overhead-construction contracts was approaching, on a rate book five years out of date.",
            "Ambiguous work descriptions and time-based billing made the exposure real but unquantified.",
            "Spend ran across 482 rate-book items and six contractors; the diagnosis had to find the few that mattered.",
        ],
        "contribution": "Led the assessment end to end: analysed ~565,000 transactions from twelve months of approved spend, quantified above-market billing, isolated its structural root cause, and converted it into a five-pillar contracting framework tied to the RFP critical path.",
        "judgment": "A rate comparison only holds when the work and its units are genuinely comparable. Weighting each contractor’s rates by its own volumes, and keeping the finding as one integrated opportunity, stopped it being split into individually deniable line items.",
        "exhibits": [
            {
                "title": "45 of 482 rate-book items drive ~80% of spend",
                "sub": "Pareto of the ~$230M annual portfolio",
                "svg": C.pareto(
                    label="Pareto chart: the top 45 of 482 rate-book items drive about 80 percent of annual spend",
                    note="Rate-book items ranked by annual spend · bars: spend per item · line: cumulative share",
                ),
                "sowhat": "The governance problem is concentrated — 45 items, not 482 — which makes it fixable inside one renewal cycle rather than overwhelming.",
            },
            {
                "title": "The same billing pattern appears in all six contractors",
                "sub": "Unit-billing variance vs volume-weighted average rate, $M",
                "svg": C.h_bars(
                    [
                        {"label": "Contractor A", "v": 1.3},
                        {"label": "Contractor B", "v": 1.3},
                        {"label": "Contractor C", "v": 1.2},
                        {"label": "Contractor D", "v": 0.5},
                        {"label": "Contractor E", "v": 0.4},
                        {"label": "Contractor F", "v": 0.3},
                    ],
                    label="Above-market billing variance by contractor: A and B at 1.3 million dollars each, C at 1.2, D at 0.5, E at 0.4 and F at 0.3",
                    hi_n=2,
                    bracket=("~half the exposure", "in two contractors"),
                    note="Variance weighted by each contractor’s own transaction volume against the volume-weighted average rate, floored at zero, totals ~$5.0M.",
                ),
                "sowhat": "The two largest carry about half the exposure, but the driver is absent rate enforcement. Any replacement contractor would repeat the pattern.",
            },
        ],
        "delivered": [
            "A ~$5–6M annual opportunity, addressable through one structural lever: rate-book enforcement.",
            "A costly contractor reshuffle avoided — it would not have fixed the cause.",
            "An RFP-ready toolkit: five-pillar contract framework, work-description standard and pricing template.",
        ],
        "metric": ("~$5–6M", "a year above benchmark — about 2–3% of annual contractor spend"),
        "sources": "Twelve months of client-approved contractor spend: ~565,000 transactions across ~$230M, 482 rate-book items and six contractors. Variance weighted by each contractor’s own transaction volume against the volume-weighted average rate, floored at zero.",
    },
    {
        "id": "supply-chain-benchmarking",
        "kicker": "Utilities",
        "num": "Case 03",
        "topic": "Operating model &amp; workforce benchmarking",
        "h1": "The supply-chain team wasn’t oversized. Its load sat on managers, with no execution layer beneath them.",
        "governing": "Headcount ratios would have called this function efficient. Assessing workload role by role showed a lean structure carrying ~70% more spend per FTE than the peer median, with no planning function and no headroom for the growth it was asked to absorb.",
        "facts": [
            ("Industry", "Energy &amp; utilities — regulated electric &amp; gas"),
            ("Engagement context", "Consulting · US energy utility"),
            ("Role", "Organisational benchmarking &amp; operating model"),
            ("Duration", "12 weeks"),
        ],
        "situation": [
            "Leadership needed to know whether the supply-chain organisation could support current spend and planned growth.",
            "Raw headcount comparisons would obscure real differences in role scope and functional coverage.",
            "The goal was a fact base for workforce decisions, not a headcount verdict in either direction.",
        ],
        "contribution": "Led the assessment across structure, roles and capacity: defined the peer framework, normalised spend and headcount by workload, clustered roles by capability rather than title, and translated the findings into structural implications.",
        "judgment": "High spend per person can mean a lean organisation or an overloaded one, and the two call for opposite responses. Reading the number alongside scope and how execution work was distributed turned a benchmark into a recommendation.",
        "exhibits": [
            {
                "title": "The utility supports more spend per FTE than any peer",
                "sub": "Peer distribution, indexed",
                "svg": C.box_plot(
                    label="Box plot of spend supported per FTE: this utility sits beyond the top of the peer range, about 70 percent above the peer median",
                    lo=13, q1=25, med=31, q3=38, hi=46, subject=53,
                    subject_note="~70% above peer median",
                    note="Spend supported per FTE, indexed · box: peer interquartile range · whiskers: peer range",
                ),
                "sowhat": "Beyond the top of the peer range: evidence of a lean, broad-scope structure, not an over-resourced one.",
            },
            {
                "title": "Capacity is concentrated in manager roles, over a thin execution layer",
                "sub": "Illustrative mix, this utility vs peer median",
                "svg": C.grouped_columns(
                    [
                        {"name": "Category", "name2": "managers", "a": 42, "b": 26},
                        {"name": "Sourcing", "name2": "specialists", "a": 20, "b": 26},
                        {"name": "Procurement", "name2": "ops", "a": 30, "b": 30},
                        {"name": "PMO / CoE", "a": 8, "b": 10},
                        {"name": "Planning", "a": 0, "b": 8},
                    ],
                    label="Share of supply-chain FTEs by role: category managers 42 percent against a peer median of 26, sourcing specialists 20 against 26, procurement operations 30 against 30, PMO 8 against 10, and planning zero against 8",
                    note="Share of supply-chain FTEs by role",
                ),
                "sowhat": "Managers hold a far larger share of capacity than peers, enablement is thin, and planning has no dedicated FTE: the two structural gaps.",
            },
        ],
        "delivered": [
            "A structured fact base on supply-chain sizing relative to peers, usable directly in workforce planning.",
            "Two structural gaps identified: lean enablement and no standalone planning function.",
            "A prioritised reinforcement roadmap, de-risked through a single-region pilot with tracked KPIs.",
        ],
        "metric": ("~70%", "more spend per FTE than the peer median — no headroom for growth"),
        "sources": "Client function and role-level spend and FTE data, normalised by workload (assets served, spend under management) and clustered by delivered capability rather than job title, benchmarked against comparable regulated utilities.",
    },
    {
        "id": "bt-contract-renewal",
        "kicker": "Telecom",
        "num": "Case 04",
        "topic": "Should-cost modelling &amp; negotiation",
        "h1": "The negotiable gap was never in the labour rates — it sat in overhead and margin.",
        "governing": "A field-services renewal was set to roll forward historical rates. Rebuilding the supplier’s economics from the cost drivers up moved the negotiation onto what the service should cost, and secured ~£2M a year with the incumbent retained.",
        "facts": [
            ("Industry", "Telecommunications"),
            ("Engagement context", "In-house category ownership · BT Group"),
            ("Role", "Category &amp; sourcing manager — renewal and negotiation"),
            ("Duration", "6 months"),
        ],
        "situation": [
            "A multi-year regional service-delivery contract was nearing renewal with no refreshed cost baseline.",
            "Rates had been accepted for years without visibility of the supplier’s cost build-up.",
            "Pressing a regional incumbent too hard would put field-service delivery at risk.",
        ],
        "contribution": "Led the renewal end to end: built the should-cost model from first principles, priced the total cost of mobilisation, travel, service credits and rework, set the negotiation strategy and walk-away position, and led the supplier negotiation to close.",
        "judgment": "The negotiation that mattered was total service economics, not the headline day rate. A lower rate means little if mobilisation or rework push cost back up, so the ask was sequenced to take the margin gap while protecting continuity.",
        "exhibits": [
            {
                "title": "Labour and materials matched; the 16-point gap sat in overhead and margin",
                "sub": "Indexed annual cost by element",
                "svg": C.build_up(
                    [
                        {"name": "Quoted renewal", "total": 100, "segs": [46, 17, 21, 16]},
                        {"name": "Should-cost", "total": 84, "segs": [46, 17, 14, 7]},
                    ],
                    label="Indexed cost build-up: labour 46 and materials 17 match in both columns, while overhead falls from 21 to 14 and margin from 16 to 7",
                    legend=[("Labour", "46 → 46"), ("Materials", "17 → 17"),
                            ("Overhead", "21 → 14"), ("Margin", "16 → 7")],
                    gap_note="16-point gap",
                    note="Index, quoted renewal = 100",
                ),
                "sowhat": "Overhead and margin sat 16 points above a defensible build-up, which made the gap negotiable rather than a market price to accept.",
            },
            {
                "title": "Four levers took the contract from £11.0M to £9.0M a year",
                "sub": "£M, annual contract value, rounded",
                "svg": C.waterfall(
                    [
                        {"name": "Quoted", "name2": "renewal", "v": 11.0, "disp": "£11.0M"},
                        {"name": "Rate gap to", "name2": "should-cost", "v": -0.9, "disp": "−£0.9M"},
                        {"name": "Travel &", "name2": "mobilisation", "v": -0.6, "disp": "−£0.6M"},
                        {"name": "Service credits", "name2": "& rework", "v": -0.5, "disp": "−£0.5M"},
                        {"name": "Signed", "name2": "contract", "v": 9.0, "disp": "£9.0M"},
                    ],
                    label="Waterfall from a quoted renewal of 11.0 million pounds down through three levers to a signed contract of 9.0 million pounds",
                ),
                "sowhat": "The rate move took roughly the margin gap (~9 of 16 points), leaving overhead to protect continuity. The rest came from costs the day rate hides.",
            },
        ],
        "delivered": [
            "~£2M a year locked into the renewed contract, with the incumbent retained and delivery uninterrupted.",
            "Total-cost visibility across rates, travel, mobilisation, service levels and rework.",
            "A defensible should-cost baseline left with the team to anchor the next renewal cycle.",
        ],
        "metric": ("~£2M", "a year — about 18% of annual contract value"),
        "sources": "Should-cost model built from first principles — labour and productivity, materials, overhead recovery, fair margin — indexed to the quoted renewal = 100. Total-cost build covers rates, mobilisation, travel, service credits and rework. BT Group named as engagement context; the supplier is withheld.",
    },
    {
        "id": "accenture-capex-sourcing",
        "kicker": "Energy &amp; oil and gas",
        "num": "Case 05",
        "topic": "Category strategy &amp; strategic sourcing",
        "h1": "Matching each CapEx category to its own supply market turned scattered tenders into ~$4M of savings.",
        "governing": "A large upstream capital programme was bought package by package, leaking leverage at every award. Managing it as three categories, each with its own sourcing posture, delivered ~$4M of CapEx savings and a governance model embedded in the client’s own team.",
        "facts": [
            ("Industry", "Oil &amp; gas — upstream E&amp;P"),
            ("Engagement context", "Consulting · Accenture · upstream E&amp;P operator"),
            ("Role", "CapEx category &amp; sourcing lead"),
            ("Duration", "12 months"),
        ],
        "situation": [
            "A large upstream capital programme was sourced project by project, each package tendered in isolation.",
            "With no category strategy or aggregated demand view, leverage against a concentrated contractor base was limited.",
            "Any consolidation had to keep technical, quality and schedule requirements intact.",
        ],
        "contribution": "Within Accenture’s team, led CapEx sourcing and category management: built strategies for EPC, surface facilities and drilling &amp; completions, aggregated demand across projects, ran sourcing from qualification to award, and embedded category governance in the client’s team.",
        "judgment": "Leverage came from the structure of the process as much as the size of the package. A concentrated market does not reward a longer bidder list; it rewards disciplined stage-gates — so each category earned its own contracting approach.",
        "exhibits": [
            {
                "title": "Three categories, three supply markets, three sourcing postures",
                "sub": "Share of the managed capital programme",
                "svg": C.stacked_bar(
                    [
                        {"pct": 48, "label": "EPC packages", "sub": "Structured competition"},
                        {"pct": 30, "label": "Surface facilities", "sub": "Package & frame agreements"},
                        {"pct": 22, "label": "Drilling & completions", "sub": "Rate & availability management"},
                    ],
                    label="Share of the managed capital programme: EPC packages 48 percent, surface facilities 30 percent, drilling and completions 22 percent",
                    note="One programme, three supply markets — and therefore three sourcing approaches.",
                ),
                "sowhat": "EPC dominates the programme and earns the most structured competition; smaller categories are better served by frame agreements than a full re-tender each cycle.",
            },
            {
                "title": "What changed: from package-by-package buying to category management",
                "sub": "Before and after",
                "svg": C.compare_table(
                    [
                        {"k": "Unit of sourcing", "a": "Each package tendered alone", "b": "Category managed across projects"},
                        {"k": "Demand view", "a": "Project by project", "b": "Aggregated across the programme"},
                        {"k": "Competition", "a": "One tendering formula for all", "b": "Posture matched to each supply market"},
                        {"k": "Suppliers", "a": "Transactional, award by award", "b": "Frame agreements and managed routines"},
                        {"k": "Ownership", "a": "Project teams", "b": "Category governance in the client’s team"},
                    ],
                    heads=("Before", "After"),
                    label="Comparison of package-by-package buying against category management across unit of sourcing, demand view, competition, suppliers and ownership",
                ),
                "sowhat": "The savings came from the process, not a longer bidder list: stage-gated competition where the market is concentrated, frames where volume repeats.",
            },
        ],
        "delivered": [
            "~$4M in CapEx savings across the managed sourcing portfolio.",
            "Category strategies for EPC, surface facilities and drilling &amp; completions, replacing project-by-project buying.",
            "Category playbooks and supplier-management routines embedded with the in-house team.",
        ],
        "metric": ("~$4M", "CapEx savings delivered"),
        "sources": "Managed capital programme segmented into sourcing categories and sized by share of programme value. No split of the ~$4M saving across categories is implied. Accenture named as engagement context; the E&amp;P client is withheld.",
    },
    {
        "id": "category-intelligence",
        "kicker": "Energy &amp; utilities",
        "num": "Case 06",
        "topic": "Category intelligence &amp; supply markets",
        "h1": "Half of E-STATCOM cost sits in supply-constrained inputs — so secure it early, don’t tender it late.",
        "governing": "Fragmented market, supplier and spend information was rebuilt into one decision-ready view of the category. Decomposing cost and lead time into their real drivers showed why it rewards partnership and early commitment over aggressive competitive tendering.",
        "facts": [
            ("Industry", "Energy &amp; utilities — grid power electronics"),
            ("Engagement context", "Consulting · large US investor-owned utility"),
            ("Role", "Category intelligence &amp; executive briefing"),
            ("Duration", "8 weeks"),
        ],
        "situation": [
            "The utility was building a category-intelligence capability; E-STATCOM — grid power electronics with integrated storage — was a priority.",
            "Supplier data, market intelligence, commodity trends and spend analytics lived separately.",
            "There was no structured view to support sourcing, capital planning and grid-stability investment.",
        ],
        "contribution": "Built the category-intelligence report end to end on one framework — market structure, spend, supplier concentration, cost model, commodity exposure, lead time, contracting approach and KPIs — and iterated the executive summary until every statement was fact-based.",
        "judgment": "The shift that mattered was from describing a market to saying what procurement should do about it: cost broken into its commodity and manufacturing inputs, and lead time separated into critical-path components rather than quoted as an average.",
        "exhibits": [
            {
                "title": "Roughly half of installed cost rides on supply-constrained inputs",
                "sub": "Share of installed E-STATCOM cost",
                "svg": C.stacked_bar(
                    [
                        {"pct": 30, "label": "Power semiconductors", "sub": "(IGBT / SiC stages)"},
                        {"pct": 24, "label": "Coupling transformer", "sub": "& magnetics"},
                        {"pct": 18, "label": "Control, protection", "sub": "& cooling"},
                        {"pct": 16, "label": "Engineering, install", "sub": "& commissioning"},
                        {"pct": 12, "label": "Enclosure", "sub": "& steel"},
                    ],
                    highlight={0, 1},
                    label="Share of installed E-STATCOM cost: power semiconductors 30 percent and coupling transformer and magnetics 24 percent are supply constrained, ahead of control at 18, engineering at 16 and enclosure at 12",
                    note="Supply-constrained: semiconductors allocated into 2027; copper-intensive magnetics with copper above $14,000/t through 2026.",
                ),
                "sowhat": "Price rides on inputs the supplier cannot fully control — an argument for locking contract length and production slots, not squeezing the quote.",
            },
            {
                "title": "Tendering late versus committing early",
                "sub": "Sourcing posture compared",
                "svg": C.compare_table(
                    [
                        {"k": "Production slots", "a": "Go to whoever committed first", "b": "Reserved ahead of need"},
                        {"k": "Price", "a": "Spot exposure to semiconductors and copper", "b": "Quotes challenged on the inputs that move price"},
                        {"k": "Supplier pool", "a": "Few qualified OEMs, stretched thin", "b": "A chosen partner with capacity planned"},
                        {"k": "Schedule", "a": "Long lead lands on the critical path", "b": "Lead time absorbed before the project starts"},
                    ],
                    heads=("Tender late", "Commit early"),
                    label="Comparison of tendering late against committing early across production slots, price, supplier pool and schedule",
                ),
                "sowhat": "In a strategic category — few qualified OEMs, long lead, grid-critical — positioning drives contract length as much as it drives price.",
            },
        ],
        "delivered": [
            "One intelligence base: market structure, supplier landscape, cost drivers and lead-time exposure in one comparable frame.",
            "A differentiated posture: partner and commit early, with production slots secured ahead of need.",
            "An executive-ready briefing that aligned procurement and engineering ahead of the sourcing decisions.",
        ],
        "metric": ("~50%", "of installed cost in supply-constrained inputs — the case for committing early"),
        "sources": "Cost shares from published cost-structure and commodity sources (accessed Sept 2026): semiconductor allocation into 2027; copper above $14,000/t through 2026.",
    },
]

ANON = (
    "<b>Anonymisation &amp; basis.</b> Client, supplier and peer identities withheld. "
    "Outcome figures are rounded from engagement results; exhibit internals are indexed "
    "or illustrative and show the analytical structure, not client data."
)

PAGE = """<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8" />
<title>{h1_plain} — Mohan Kholiya</title>
<style>{css}</style>
</head>
<body>
<div class="page">

  <header class="head">
    <span class="wordmark">Mohan Kholiya</span>
    <span class="head-right">{kicker} &nbsp;·&nbsp; <b>{num}</b> &nbsp;·&nbsp; {topic}</span>
  </header>

  <div class="title-block" data-region="title">
    <h1>{h1}</h1>
    <p class="governing">{governing}</p>
  </div>

  <div class="facts">{facts}</div>

  <div class="body">
    <div class="col-left" data-region="left">
      <section data-block="situation">
        <p class="sec-label">The situation</p>
        <ul>{situation}</ul>
      </section>
      <section data-block="contribution">
        <p class="sec-label">My contribution</p>
        <p>{contribution}</p>
      </section>
      <section class="judgment" data-block="judgment">
        <p class="sec-label">The judgment that mattered</p>
        <p>{judgment}</p>
      </section>
    </div>

    <div class="col-right" data-region="right">{exhibits}</div>
  </div>

  <div class="results" data-region="results">
    <div class="results-main">
      <p class="sec-label">What the work delivered</p>
      <div class="delivered">{delivered}</div>
    </div>
    <div class="metric">
      <span class="m-label">Headline</span>
      <span class="m-value">{m_value}</span>
      <span class="m-sub">{m_sub}</span>{award}
    </div>
  </div>

  <footer class="foot">
    <p class="note"><b>Sources.</b> {sources} {anon}</p>
    <p class="contact"><b>Mohan Kholiya</b> · mohan.kholiya@gmail.com · mohankholiya.co.in</p>
  </footer>

</div>
</body>
</html>
"""

EXHIBIT = """
    <figure class="exhibit" data-region="exhibit">
      <div class="ex-head">
        <span class="ex-num">{num}</span>
        <h3>{title}</h3>
        <p class="ex-sub">{sub}</p>
      </div>
      <div class="ex-body">
        <div class="ex-chart">{svg}</div>
        <aside class="ex-sowhat">
          <span class="sw-label">So what</span>
          <p>{sowhat}</p>
        </aside>
      </div>
    </figure>"""


def plain(s: str) -> str:
    """Entity-free text for the <title>, which is read by gen-case-pdfs.mjs."""
    return (
        s.replace("&amp;", "&").replace("&nbsp;", " ")
        .replace("’", "'").replace("—", "-").replace("–", "-")
    )


def render(case: dict) -> str:
    facts = "".join(
        f'<div class="fact"><span class="fact-k">{k}</span>'
        f'<span class="fact-v">{v}</span></div>'
        for k, v in case["facts"]
    )
    situation = "".join(f"<li>{s}</li>" for s in case["situation"])
    exhibits = "".join(
        EXHIBIT.format(num=f"Exhibit {i + 1}", **ex) for i, ex in enumerate(case["exhibits"])
    )
    delivered = "".join(f"<p>{d}</p>" for d in case["delivered"])
    award = (
        f'<span class="m-award">{case["award"]}</span>' if case.get("award") else ""
    )
    m_value, m_sub = case["metric"]
    return PAGE.format(
        css=CSS,
        h1=case["h1"],
        h1_plain=plain(case["h1"]),
        kicker=case["kicker"],
        num=case["num"],
        topic=case["topic"],
        governing=case["governing"],
        facts=facts,
        situation=situation,
        contribution=case["contribution"],
        judgment=case["judgment"],
        exhibits=exhibits,
        delivered=delivered,
        m_value=m_value,
        m_sub=m_sub,
        award=award,
        sources=case["sources"],
        anon=ANON,
    )


def main() -> None:
    OUT.mkdir(exist_ok=True)
    ids = [c["id"] for c in CASES]
    assert len(set(ids)) == len(ids), "duplicate case id"
    for case in CASES:
        assert len(case["exhibits"]) == 2, f'{case["id"]}: extract-exhibits.py requires exactly 2'
        assert len(case["delivered"]) == 3, f'{case["id"]}: the results band is a three-column grid'
        path = OUT / f'{case["id"]}.html'
        path.write_text(render(case), encoding="utf-8")
        print(f'  {case["id"]:32} {path.stat().st_size:>7,} bytes  "{plain(case["h1"])[:52]}"')
    print(f"\nwrote {len(CASES)} one-pagers to {OUT.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()
