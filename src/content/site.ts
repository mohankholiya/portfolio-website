export const siteConfig = {
  name: "Mohan Kholiya",
  title: "Mohan Kholiya — Procurement & Supply Chain Leader",
  description:
    "Procurement and supply chain leader with 16+ years across energy, oil & gas, utilities, and telecom. $12M+ in verified savings on $400M+ of annual spend influenced. Consulting advisory (Wood Mackenzie, Accenture) and in-house category leadership (BT Group, Jindal Drilling).",
  url: "https://mohankholiya.co.in",
  email: "mohan.kholiya@gmail.com",
  phone: "+91 9990433916",
  location: "Gurugram, India",
  linkedin: "https://www.linkedin.com/in/mohankholiya/",
  resumeUrl: "/resume.pdf",
  resumeFileName: "Mohan_Kholiya_Resume_2026.pdf",
  positioning:
    "Procurement & supply chain leader who turns category strategy and supplier programs into measurable cost-out and resilience — across consulting and in-house roles.",
};

export const navLinks = [
  { href: "#about",        label: "About" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#experience",   label: "Experience" },
  { href: "#competencies", label: "Competencies" },
  { href: "#credentials",  label: "Credentials" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact",      label: "Contact" },
];

/* Hero — the three quick facts */
export const heroStats = [
  { display: "16+", numeric: 16, suffix: "+", label: "Years experience" },
  { display: "4",   numeric: 4,  suffix: "",  label: "Sectors" },
  { display: "3",   numeric: 3,  suffix: "",  label: "Continents" },
];

/* Hero signature strip — board-pack headline metrics (all verified on the CV) */
export const heroMetrics = [
  { value: "$400M+", label: "Annual spend influenced" },
  { value: "$12M+",  label: "Verified savings delivered" },
  { value: "$2.2B",  label: "Largest capital benchmark" },
  { value: "27",     label: "Peer projects benchmarked" },
];

export const caseStudies = [
  {
    id: "ntgm-cost-competitiveness",
    sector: "energy",
    sectorLabel: "Energy & O&G",
    headline: "Independent cost competitiveness review for a near-term gas development.",
    metric: "~$0.8m",
    metricLabel: "rig-rate gap quantified per well, Q2→Q4 verdict delivered",
    description:
      "Benchmarked an international shallow-water gas project for a global E&P operator against 27 global peers to establish where it stands and why — delivering a clear Q2→Q4 verdict by cost system and quantifying the rig-rate gap while schedule held near median.",
    tags: ["Capital Cost Benchmarking", "Pre-FEED Review"],
  },
  {
    id: "unit-rate-governance",
    sector: "utilities",
    sectorLabel: "Utilities",
    headline: "Unit-rate governance & contracting strategy for a $233M contractor programme.",
    metric: "$4.9M–$6M",
    metricLabel: "above-market exposure quantified and addressable",
    description:
      "Diagnosed above-market billing across a $233M overhead-construction programme and showed it was entirely addressable through rate-book enforcement — delivering a five-year value of $20M–$28M through structural contract reform ahead of the 2026 renewal.",
    tags: ["Contract Strategy", "Commercial Governance"],
  },
  {
    id: "supply-chain-benchmarking",
    sector: "utilities",
    sectorLabel: "Utilities",
    headline: "Supply chain workforce benchmarking & operating model assessment.",
    metric: "Above peer Q3",
    metricLabel: "spend supported per FTE — lean structure confirmed",
    description:
      "Benchmarked a U.S. energy utility's supply chain organisation against peers on spend supported per FTE, confirming a lean, broad-scope structure and defining the targeted reinforcement needed to sustain governance as spend scales.",
    tags: ["Operating Model", "Workforce Benchmarking"],
  },
  {
    id: "category-intelligence",
    sector: "energy",
    sectorLabel: "Energy & Utilities",
    headline: "Category intelligence for two opposite markets: Lighting and E-STATCOM.",
    metric: "Opposite dynamics",
    metricLabel: "diverging cost structures and price paths identified",
    description:
      "Built a cost-driver-backed intelligence base across Lighting (commoditizing, deflationary) and E-STATCOM (engineered, inflationary) — enabling differentiated sourcing postures: competitive leverage for Lighting, strategic partnership for E-STATCOM.",
    tags: ["Category Intelligence", "Cost-Driver Analysis"],
  },
  {
    id: "bt-contract-renewal",
    sector: "telecom",
    sectorLabel: "Telecom",
    headline: "Service delivery contract renewal & total cost optimisation — BT Group.",
    metric: "~£2M",
    metricLabel: "total-cost optimisation locked into renewed contract",
    description:
      "Renewed a multi-year service-delivery contract at BT Group using should-cost modelling and total-cost analysis to negotiate ~£2M of optimisation across rates, travel, mobilisation, SLAs, and rework — with the incumbent retained and service continuity protected.",
    tags: ["Strategic Sourcing", "Should-Cost Modelling"],
  },
  {
    id: "accenture-capex-sourcing",
    sector: "energy",
    sectorLabel: "Energy & O&G",
    headline: "End-to-end capex sourcing & category management for an Indian E&P operator.",
    metric: "3 major categories",
    metricLabel: "category strategies established, demand aggregated",
    description:
      "Led end-to-end capex sourcing and category management across EPC, surface facilities, and drilling & completions for an Indian E&P operator — turning fragmented, project-by-project buying into a coordinated programme with aggregated demand and structured supplier leverage.",
    tags: ["Capex Sourcing", "Category Management"],
  },
];

/* ── Career history (sourced from the CV — employer names stated, end-clients anonymised) ── */
export const experience = [
  {
    company: "Wood Mackenzie",
    role: "Principal Consultant — Supply Chain Consulting (Energy)",
    period: "Feb 2025 – May 2026",
    location: "Gurugram, India",
    type: "Consulting",
    summary:
      "Capital benchmarking, category strategy, and supply-chain operating-model design for global energy operators and utilities.",
    highlights: ["$2.2B upstream capital benchmark", "$233M contractor strategy", "10-peer utility operating model"],
  },
  {
    company: "BT Group (British Telecom)",
    role: "Category Manager — Procurement",
    period: "Mar 2023 – Feb 2025",
    location: "Gurugram, India",
    type: "In-house",
    summary:
      "Owned £100M of annual civil-infrastructure spend; led should-cost contract renewal and source-to-pay digital transformation.",
    highlights: ["£100M spend owned", "£2M+ total-cost optimisation", "S2P digital transformation"],
  },
  {
    company: "Accenture",
    role: "Senior Analyst & Team Lead — Sourcing & Category Enablement",
    period: "Oct 2021 – Mar 2023",
    location: "Gurugram, India",
    type: "Consulting",
    summary:
      "Capex sourcing and category enablement for a leading upstream O&G operator across EPC, surface facilities, and drilling & completions.",
    highlights: ["~$4M capex savings", "3 major categories", "Business Partner Award"],
  },
  {
    company: "Jindal Drilling & Industries",
    role: "Manager — Procurement",
    period: "Sep 2017 – Jul 2021",
    location: "Gurugram, India",
    type: "In-house",
    summary:
      "Offshore drilling procurement for ONGC and OIL India jack-up rig and MWD contracts; built a 50-vendor ecosystem from scratch.",
    highlights: ["~$100M annual portfolio", "50-vendor ecosystem", "Zero rig downtime"],
  },
  {
    company: "Quippo Oil & Gas Infrastructure",
    role: "Assistant Manager — Supply Chain Management",
    period: "May 2013 – Aug 2017",
    location: "Gurugram, India",
    type: "In-house",
    summary:
      "Directed global sourcing for 2,000 HP onshore drilling rigs serving ONGC and OIL India across five geographies.",
    highlights: ["~$50M annual sourcing", "$30M rig-equipment contract", "5-geography supplier network"],
  },
  {
    company: "Shyama Power India",
    role: "Assistant Manager — Procurement",
    period: "Sep 2009 – May 2013",
    location: "Gurugram, India",
    type: "In-house",
    summary:
      "EPC procurement for RGGVY Power Grid turnkey projects — BOQs, technical approvals, contractor selection, and quality compliance.",
    highlights: ["Turnkey EPC procurement", "Power Grid projects", "On-time completion"],
  },
];

export const competencies = [
  {
    title: "Strategic Sourcing & Category Management",
    description:
      "End-to-end category strategy, market analysis, and sourcing execution across complex, high-value spend areas in energy and infrastructure.",
  },
  {
    title: "Contract Strategy & Negotiation",
    description:
      "Commercial structuring, risk allocation, and negotiation for complex multi-year service and supply agreements — anchored in should-cost and TCO.",
  },
  {
    title: "Supplier Development & Performance",
    description:
      "Structured SRM frameworks, KPI governance, and joint value-creation programmes across strategic supplier relationships.",
  },
  {
    title: "Capital Benchmarking & Cost Modelling",
    description:
      "Peer-set benchmarking, should-cost baselines, and cost-driver analysis that turn fragmented cost pictures into defensible, board-ready verdicts.",
  },
  {
    title: "Supply Chain Risk & Resilience",
    description:
      "Dependency mapping, supplier risk tiering, and resilience programme design for critical supply chains under regulatory and market pressure.",
  },
  {
    title: "Digital Procurement & Spend Analytics",
    description:
      "Deployment of e-procurement platforms, spend analytics, and AI-enabled category intelligence across procurement functions.",
  },
];

export const credentials = [
  {
    category: "Education",
    entries: [
      {
        title: "MBA — Power Management",
        body: "University of Petroleum & Energy Studies (UPES), Dehradun, 2009.",
      },
      {
        title: "B.Sc. — Physics, Chemistry & Mathematics",
        body: "Kumaun University, Nainital, 2006.",
      },
    ],
  },
  {
    category: "Certifications",
    entries: [
      {
        title: "MITx SCx — Supply Chain Management",
        body: "MIT SC0x (Supply Chain Analytics, 2026) and SC1x (Fundamentals, 2025) — completed courses in the MITx MicroMasters programme.",
      },
      {
        title: "MSME — Supply Chain Management",
        body: "Ministry of Micro, Small & Medium Enterprises certification, 2013.",
      },
    ],
  },
  {
    category: "Awards & recognition",
    entries: [
      {
        title: "Q3 Innovation Award — Wood Mackenzie (2025)",
        body: "$2.2B capital benchmarking across a multi-geography team.",
      },
      {
        title: "Business Partner Employee Award (FY 2022–23)",
        body: "Recognised for a high-value contract turnaround during consulting advisory.",
      },
      {
        title: "Distinguished Contributor Award — Quippo Oil & Gas (2015–16)",
        body: "Zero rig-downtime record across onshore drilling operations.",
      },
    ],
  },
];
