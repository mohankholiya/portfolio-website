export const siteConfig = {
  name: "Mohan Kholiya",
  title: "Mohan Kholiya | Procurement Leader & Supply Chain Consultant",
  description:
    "Procurement and supply chain leader with 16+ years across energy, utilities and telecom. Category ownership at BT Group and Jindal Drilling, supply-chain advisory at Wood Mackenzie and Accenture. Open to senior leadership roles in India, the GCC and globally.",
  url: "https://mohankholiya.co.in",
  email: "mohan.kholiya@gmail.com",
  phone: "+91 9990433916",
  location: "Gurugram, India",
  linkedin: "https://www.linkedin.com/in/mohankholiya/",
  resumeUrl: "/resume.pdf",
  resumeFileName: "Mohan_Kholiya_Consulting_Resume.pdf",
  positioning:
    "I lead procurement and supply chain for energy, infrastructure and telecom organisations, from category strategy and cost analysis through negotiation and delivery.",
};
export const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#case-studies", label: "Selected work" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#experience", label: "Experience" },
];
export const copy = {
  hero: {
    eyebrow: "Procurement & supply chain leadership",
    first: "Commercial insight.",
    second: "Operational impact.",
    intro: "Mohan Kholiya",
    footnote: "Energy & utilities / Oil & gas / Telecom",
    primary: "View selected work",
    secondary: "Download resume",
  },
  firms: ["Wood Mackenzie", "BT Group", "Accenture", "Jindal Drilling"],
  /* Two hiring tracks, not two customer segments. Both panels describe the
     kind of role Mohan is a candidate for; neither offers services for sale. */
  proof: {
    eyebrow: "Both sides of the table",
    heading: "Advisory depth.\nOperator accountability.",
    labels: ["In-house leadership", "Consulting firms"],
    panels: [
      {
        id: "leadership",
        heading: "Category ownership with delivery accountability",
        description:
          "Spend ownership, supplier programmes and team leadership inside operating businesses.",
        facts: [
          {
            value: "£100M",
            label: "Annual category spend owned at BT Group",
            href: "/case-studies/bt-contract-renewal/",
          },
          {
            value: "13+ years",
            label: "In-house across energy, drilling and telecom",
            href: "/#experience",
          },
        ],
        cta: "See the career record",
        href: "/#experience",
      },
      {
        id: "advisory",
        heading: "Client-facing rigour at principal level",
        description:
          "Capital benchmarking, cost diagnostics and operating-model work for global operators and utilities.",
        facts: [
          {
            value: "~$2B",
            label: "Upstream capital benchmark at Wood Mackenzie",
            href: "/#experience",
          },
          {
            value: "~$230M",
            label: "Contractor programme assessed transaction by transaction",
            href: "/case-studies/unit-rate-governance/",
          },
        ],
        cta: "See how I work",
        href: "/#capabilities",
      },
    ],
  },
  cases: {
    eyebrow: "Selected work",
    heading: "The work behind the numbers.",
    description:
      "Commercial outcomes and decision support across consulting and in-house roles. Each case explains the context, my contribution and the result.",
    more: "Browse by sector",
    read: "Read case study",
    all: "All work",
    filters: [
      { key: "all", label: "All sectors" },
      { key: "energy", label: "Energy & oil & gas" },
      { key: "utilities", label: "Utilities" },
      { key: "telecom", label: "Telecom" },
    ],
  },
  /* Capability areas, not a service menu. Each one names a problem Mohan has
     been accountable for and points at the case that evidences it. No pricing,
     no scope language, no availability signalling. */
  capabilities: {
    heading: "Four problems I am brought in to solve.",
    description:
      "The recurring shape of the work across sixteen years, in-house and in advisory. Each one links to the engagement that evidences it.",
    cta: "See the case",
    processTitle: "How I work a problem",
    steps: [
      {
        title: "Define the decision",
        body: "Establish the business question, the scope and the data it actually needs.",
      },
      {
        title: "Build the evidence",
        body: "Analyse costs, supply markets and commercial options on a comparable basis.",
      },
      {
        title: "Make it usable",
        body: "Hand over the model, the recommendation and the governance to sustain it.",
      },
    ],
  },
  experience: {
    eyebrow: "Career record",
    heading: "Consulting perspective.\nIn-house accountability.",
    description:
      "16+ years across six organisations, from drilling operations and capital sourcing to category leadership and energy supply-chain advisory.",
    downloadsTitle: "The full career record.",
    downloadsBody:
      "Category ownership, sourcing and supplier development alongside cost diagnostics, capital benchmarking and operating-model work.",
    /* Two artefacts a hiring manager can forward without opening the site
       again: the career record, and the evidence behind it. */
    downloads: [
      {
        note: "PDF · 2 pages",
        title: "Curriculum vitae",
        body: "Sixteen years across energy, utilities and telecom, in-house and in advisory.",
        href: "/resume.pdf",
        label: "Download resume",
      },
      {
        note: "PDF · 6 pages",
        title: "Case pack",
        body: "All six case studies, one page each, with the exhibits behind every verdict.",
        href: "/Mohan_Kholiya_Case_Studies.pdf",
        label: "Download case pack",
      },
    ],
  },
  about: {
    heading: "I connect the analysis\nto the decision.",
    paragraphs: [
      "My experience combines procurement ownership at BT Group, Jindal Drilling, Quippo and Shyama Power with supply-chain advisory at Wood Mackenzie and Accenture. I understand the analytical question and the operational responsibility behind it.",
      "Across energy, infrastructure and telecom, my focus is consistent: understand the cost drivers, make the commercial choices clear and leave the team with an approach they can run without me.",
    ],
    /* Framed as applied capability, which is what it is. Deliberately not
       framed as a product, a venture or anything a hiring manager could read
       as a competing commitment. */
    toolsTitle: "Hands-on with digital and AI procurement",
    toolsBody:
      "I build my own should-cost and category-intelligence models, combining structured cost calculations with AI-assisted market research. It keeps me fluent in the tooling I would be asking a team to adopt.",
    toolsCta: "Ask me about this",
    credentialsTitle: "Education & recognition",
  },
  contact: {
    heading: "What role are you\nlooking to fill?",
    description:
      "Tell me about the mandate, the organisation and the timing. I reply to every genuine enquiry.",
    emailLabel: "Email Mohan",
    linkedinLabel: "Connect on LinkedIn",
    location:
      "Based in Gurugram, India. Open to senior roles across India, the GCC and globally.",
    types: [
      "In-house leadership role",
      "Consulting firm role",
      "Something else",
    ],
    formTitle: "Tell me a little about it",
    labels: {
      type: "I'm getting in touch about",
      name: "Your name",
      email: "Your email",
      message: "The role",
    },
    placeholders: {
      name: "Name",
      email: "you@company.com",
      message: "The mandate, your organisation and any timing that matters.",
    },
    prepare: "Prepare email",
    send: "Send enquiry",
    sending: "Sending…",
    prepared:
      "Your email draft is ready. Send it from your email app, or use the direct email link.",
    success: "Thank you. Your enquiry has been sent.",
    error:
      "Your enquiry could not be sent. Please use the direct email link; your message is still here.",
    emailHelp:
      "This opens a draft in your email app. Nothing is sent until you send it.",
    formHelp: "Your details are used to respond to this enquiry.",
  },
  footer: {
    tagline: "Procurement leadership. Commercial clarity.",
    back: "Back to top",
    privacy: "Enquiry privacy",
    copyright: "Mohan Kholiya",
  },
  detail: {
    back: "All case studies",
    eyebrow: "Selected work",
    challenge: "The commercial question",
    role: "My contribution",
    approach: "How I approached it",
    judgment: "The decision that mattered",
    results: "What the work delivered",
    method: "A closer look at the method",
    ctaHeading: "Hiring for work like this?",
    ctaBody:
      "If this is the kind of problem your team is carrying, I would be glad to talk about the role.",
    cta: "Get in touch",
    next: "Next case study",
    scope: "Engagement context",
    status: "Outcome type",
    proof: "At a glance",
    engagementRole: "My role",
    duration: "Duration",
    exhibits: "Analytical exhibits",
    onePagerNote: "PDF · 1 page",
    onePagerTitle: "Take this case with you",
    onePagerBody:
      "The same engagement on a single page, with both exhibits, formatted to circulate.",
    onePagerLabel: "Download one-pager",
  },
};
/* Capability areas. `question` is the business question the capability answers;
   `deliverables` is what the work produces. Written as what Mohan does in a
   role, not as a scope of supply. */
export const services = [
  {
    title: "Spend & contract diagnostics",
    question: "Where is value being lost?",
    body: "Finding the commercial exposure sitting inside contractor spend, rate inconsistency and billing rules, before the next renewal.",
    deliverables: [
      "Spend and rate-variance analysis",
      "Quantified opportunity with stated assumptions",
      "Contract-governance priorities",
    ],
    caseId: "unit-rate-governance",
  },
  {
    title: "Should-cost & negotiation",
    question: "What should this really cost?",
    body: "Rebuilding supplier economics from the cost drivers up, then carrying that model into the negotiation.",
    deliverables: [
      "Cost-driver and total-cost models",
      "Commercial scenarios and sensitivities",
      "A negotiation position that holds",
    ],
    caseId: "bt-contract-renewal",
  },
  {
    title: "Category strategy & intelligence",
    question: "How should we approach this market?",
    body: "Turning supplier markets, cost drivers and supply risk into a sourcing posture that fits the category.",
    deliverables: [
      "Market and supplier landscape",
      "Cost and lead-time drivers",
      "Sourcing options and decision brief",
    ],
    caseId: "category-intelligence",
  },
  {
    title: "Supply-chain operating models",
    question: "Is the function ready for what is next?",
    body: "Assessing workload, role design and functional coverage so capacity decisions rest on evidence rather than headcount ratios.",
    deliverables: [
      "Workload and peer comparisons",
      "Role and capability assessment",
      "Prioritised operating-model roadmap",
    ],
    caseId: "supply-chain-benchmarking",
  },
];
export const caseStudies = [
  {
    id: "capital-cost-competitiveness",
    sector: "energy",
    sectorLabel: "Energy & oil & gas",
    headline:
      "Benchmarking system by system replaced a blanket cost mandate with a focused agenda.",
    metric: "2 of 3",
    metricLabel: "cost systems in the fourth quartile",
    status: "Decision support",
    scope: "Consulting · Wood Mackenzie · supermajor, $2B+ gas development",
    engagementRole: "Independent competitiveness review (pre-FEED)",
    duration: "4 months",
    description:
      "A pre-FEED gas development had been told it was not first quartile, with no evidence of where or why. Two independent benchmarks — top-down against 27 peers and bottom-up to component level — put the gap in pipeline and rig rate, and cleared production facilities.",
    tags: ["Capital benchmarking", "Cost modelling"],
    role: "Led the benchmarking workstream: built the 27-peer set, normalised cost top-down by system and bottom-up by component, and turned a fragmented cost picture into an independent, board-ready verdict for the gap-to-goal workshop.",
    challenge:
      "An internal review placed costs outside first quartile, with no like-for-like evidence of where. Comparable shallow-water gas peers were scarce, so a credible peer set was the first problem to solve rather than an input to it — and without isolating the systems driving the gap, the default response would be to cut everywhere.",
    approach: [
      {
        title: "Construct a defensible peer set",
        body: "Widen the comparison criteria deliberately — production year, water depth, adjacent basins — then normalise every peer cost for scope, water depth and first-production year.",
      },
      {
        title: "Run two complementary benchmarks",
        body: "Top-down comparison locates where the project is uncompetitive; bottom-up component analysis explains why. Each catches what the other misses.",
      },
      {
        title: "Test the goal, not just the gap",
        body: "Separate structural constraints from commercially addressable drivers, and ask what the defensible target is for each cost system before setting one.",
      },
    ],
    judgment:
      "First quartile is not the right goal for every system. Separating structural gaps — tie-back distance, seabed conditions, a thin regional contracting market — from commercially addressable ones such as rig rate made the benchmark actionable rather than merely damning.",
    results: [
      "The first credible like-for-like cost view: a 27-project peer set built where few ideal comparators existed.",
      "A system-level verdict: second quartile on facilities, fourth quartile on pipeline and on drilling & completions.",
      "The pre-FEED agenda reframed from cutting everywhere to two evidence-backed levers: pipeline and rig rate.",
    ],
    note: "Sources: operator cost submission benchmarked against an independent project-cost database; n=27 peers, normalised for scope, water depth and first-production year. Component shares from transactional benchmarking; ~52% of drilling and completions rebuilt bottom-up. Client, supplier and peer identities are withheld, and exhibit internals are indexed or illustrative — they show the analytical structure, not client data. This case describes benchmarking and decision support; it does not claim ownership of the final investment decision or of subsequent savings.",
  },
  {
    id: "unit-rate-governance",
    sector: "utilities",
    sectorLabel: "Utilities",
    headline:
      "One governance gap repeating six times, not six expensive contractors.",
    metric: "~$5–6M",
    metricLabel: "a year above benchmark — about 2–3% of annual contractor spend",
    status: "Identified opportunity",
    scope: "Consulting · large US investor-owned utility",
    engagementRole: "Independent commercial assessment (pre-RFP)",
    duration: "6 weeks",
    description:
      "A ~$230M contractor programme was billing roughly $5–6M a year above the assessment benchmark. The cause was not who held the work but the absence of rate-book enforcement — so replacing contractors would have reproduced it.",
    tags: ["Spend analytics", "Contract strategy"],
    role: "Led the assessment end to end: analysed ~565,000 transactions from twelve months of approved spend, quantified above-market billing, isolated its structural root cause, and converted it into a five-pillar contracting framework tied to the RFP critical path.",
    challenge:
      "A five-year renewal of the overhead-construction contracts was approaching, against a rate book five years out of date. Ambiguous work descriptions and time-based billing made the exposure real but unquantified, and spend ran across 482 rate-book items and six contractors — so the diagnosis had to find the few that mattered.",
    approach: [
      {
        title: "Concentrate the field",
        body: "A Pareto of 482 rate-book items showed 45 of them driving roughly 80% of annual spend, which put the whole problem inside one renewal cycle.",
      },
      {
        title: "Classify every gap, MECE",
        body: "Sort the top-45 items into missing definition, urgent upgrade, monitor and clean, so the reform list is finite and sequenced.",
      },
      {
        title: "Quantify only what is defensible",
        body: "Identify who sits above the volume-weighted average rate, then size exposure by that contractor's own volume, floored at zero.",
      },
    ],
    judgment:
      "A rate comparison only holds when the work and its units are genuinely comparable. Weighting each contractor's rates by its own volumes, and keeping the finding as one integrated opportunity, stopped it being split into individually deniable line items.",
    results: [
      "A ~$5–6M annual opportunity, addressable through one structural lever: rate-book enforcement.",
      "A costly contractor reshuffle avoided — it would not have fixed the cause.",
      "An RFP-ready toolkit: five-pillar contract framework, work-description standard and pricing template.",
    ],
    note: "Sources: twelve months of client-approved contractor spend — ~565,000 transactions across ~$230M, 482 rate-book items and six contractors. Variance is weighted by each contractor's own transaction volume against the volume-weighted average rate and floored at zero, which totals ~$5.0M: the conservative end of the ~$5–6M range. This is an identified opportunity, not realised savings; realisation depends on validation and implementation. Client and contractor identities are withheld and figures are rounded.",
  },
  {
    id: "supply-chain-benchmarking",
    sector: "utilities",
    sectorLabel: "Utilities",
    headline:
      "The supply-chain team wasn't oversized. Its load sat on managers, with no execution layer beneath them.",
    metric: "~70%",
    metricLabel: "more spend per FTE than the peer median",
    status: "Operating-model diagnostic",
    scope: "Consulting · US energy utility",
    engagementRole: "Organisational benchmarking & operating model",
    duration: "12 weeks",
    description:
      "Headcount ratios would have called this function efficient. Assessing workload role by role showed a lean structure carrying ~70% more spend per FTE than the peer median, with no planning function and no headroom for the growth it was asked to absorb.",
    tags: ["Operating models", "Benchmarking"],
    role: "Led the assessment across structure, roles and capacity: defined the peer framework, normalised spend and headcount by workload, clustered roles by capability rather than title, and translated the findings into structural implications.",
    challenge:
      "Leadership needed to know whether the supply-chain organisation could support current spend and planned growth. Raw headcount comparisons would obscure real differences in role scope and functional coverage between peers, and the goal was a fact base for workforce decisions rather than a headcount verdict in either direction.",
    approach: [
      {
        title: "Compare capabilities, not job titles",
        body: "Every utility names supply-chain roles differently, so cluster roles by the capability they deliver, then normalise each function by a workload denominator.",
      },
      {
        title: "Map the outliers",
        body: "Plot load-adjusted spend per FTE against the peer distribution to find which functions sit off the line, and in which direction.",
      },
      {
        title: "Rule out the alternatives first",
        body: "Test turnover, geographic scope and workload growth before attributing a gap to organisation and process design.",
      },
    ],
    judgment:
      "High spend per person can mean a lean organisation or an overloaded one, and the two call for opposite responses. Reading the number alongside scope and how execution work was distributed turned a benchmark into a recommendation rather than a headline.",
    results: [
      "A structured fact base on supply-chain sizing relative to peers, usable directly in workforce planning.",
      "Two structural gaps identified: lean enablement and no standalone planning function.",
      "A prioritised reinforcement roadmap, de-risked through a single-region pilot with tracked KPIs.",
    ],
    note: "Sources: client function and role-level spend and FTE data, normalised by workload (assets served, spend under management) and clustered by delivered capability rather than job title, benchmarked against comparable regulated utilities. The deliverable was a diagnostic and a recommended operating model; headcount changes, pilot results and downstream savings are not presented as outcomes of this work. Peer identities and counts are withheld, and distributions are indexed.",
  },
  {
    id: "bt-contract-renewal",
    sector: "telecom",
    sectorLabel: "Telecom",
    headline:
      "The negotiable gap was never in the labour rates — it sat in overhead and margin.",
    metric: "~£2M",
    metricLabel: "a year — about 18% of annual contract value",
    status: "Contracted optimisation",
    scope: "In-house category ownership · BT Group",
    engagementRole: "Category & sourcing manager — renewal and negotiation",
    duration: "6 months",
    description:
      "A field-services renewal was set to roll forward historical rates. Rebuilding the supplier's economics from the cost drivers up moved the negotiation onto what the service should cost, and secured ~£2M a year with the incumbent retained.",
    tags: ["Should-cost modelling", "Negotiation"],
    role: "Led the renewal end to end: built the should-cost model from first principles, priced the total cost of mobilisation, travel, service credits and rework, set the negotiation strategy and walk-away position, and led the supplier negotiation to close.",
    challenge:
      "A multi-year regional service-delivery contract was nearing renewal with no refreshed cost baseline behind it. Rates had been accepted for years without visibility of the supplier's cost build-up, and pressing a regional incumbent too hard would put field-service delivery at risk.",
    approach: [
      {
        title: "Rebuild the baseline",
        body: "Deconstruct the contract into a should-cost model — labour, productivity, materials, overhead recovery and a fair margin — built independently of the quote.",
      },
      {
        title: "Look beyond the day rate",
        body: "Price what the rate card hides: mobilisation, travel and standing time, service-level credits and rework.",
      },
      {
        title: "Sequence the ask",
        body: "Order the commercial asks by evidence strength and continuity risk, so the strongest argument leads and delivery is never the bargaining chip.",
      },
    ],
    judgment:
      "The negotiation that mattered was total service economics, not the headline day rate. A lower rate means little if mobilisation or rework push cost back up, so the ask was sequenced to take the margin gap while protecting continuity.",
    results: [
      "~£2M a year locked into the renewed contract, with the incumbent retained and delivery uninterrupted.",
      "Total-cost visibility across rates, travel, mobilisation, service levels and rework.",
      "A defensible should-cost baseline left with the team to anchor the next renewal cycle.",
    ],
    note: "Sources: a should-cost model built from first principles — labour and productivity, materials, overhead recovery and fair margin — indexed to the quoted renewal = 100, with the total-cost build covering rates, mobilisation, travel, service credits and rework. BT Group is named as engagement context; the supplier is withheld. The £100M figure elsewhere describes annual category responsibility at BT Group, not this contract.",
  },
  {
    id: "accenture-capex-sourcing",
    sector: "energy",
    sectorLabel: "Energy & oil & gas",
    headline:
      "Matching each CapEx category to its own supply market turned scattered tenders into ~$4M of savings.",
    metric: "~$4M",
    metricLabel: "CapEx savings delivered",
    status: "Sourcing outcome",
    scope: "Consulting · Accenture · upstream E&P operator",
    engagementRole: "CapEx category & sourcing lead",
    duration: "12 months",
    description:
      "A large upstream capital programme was bought package by package, leaking leverage at every award. Managing it as three categories, each with its own sourcing posture, delivered ~$4M of CapEx savings and a governance model embedded in the client's own team.",
    tags: ["Strategic sourcing", "Category management"],
    role: "Within Accenture's team, led CapEx sourcing and category management: built strategies for EPC, surface facilities and drilling & completions, aggregated demand across projects, ran sourcing from qualification to award, and embedded category governance in the client's team.",
    challenge:
      "A large upstream capital programme was sourced project by project, each package tendered in isolation. With no category strategy and no aggregated demand view, leverage against a concentrated contractor base was limited — and any consolidation had to keep technical, quality and schedule requirements intact.",
    approach: [
      {
        title: "Manage spend as categories",
        body: "Segment the programme into managed categories and size each by share of programme value — EPC alone is roughly half the total.",
      },
      {
        title: "Match posture to supply market",
        body: "Structured competition for EPC, frame agreements for recurring surface-facilities work, rate and availability management in a constrained rig market.",
      },
      {
        title: "Build tension through stage-gates",
        body: "Narrow a wide qualified field through formal gates, so competition comes from the discipline of the process rather than the length of the bidder list.",
      },
    ],
    judgment:
      "Leverage came from the structure of the process as much as the size of the package. A concentrated market does not reward a longer bidder list; it rewards disciplined stage-gates — so each category earned its own contracting approach.",
    results: [
      "~$4M in CapEx savings across the managed sourcing portfolio.",
      "Category strategies for EPC, surface facilities and drilling & completions, replacing project-by-project buying.",
      "Category playbooks and supplier-management routines embedded with the in-house team.",
    ],
    note: "Sources: the managed capital programme segmented into sourcing categories and sized by share of programme value. No split of the ~$4M saving across categories is implied. Accenture is named as engagement context; the E&P client and all contractors are withheld, and category splits are directional.",
  },
  {
    id: "category-intelligence",
    sector: "energy",
    sectorLabel: "Energy & utilities",
    headline:
      "Half of E-STATCOM cost sits in supply-constrained inputs — so secure it early, don't tender it late.",
    metric: "~50%",
    metricLabel: "of installed cost in supply-constrained inputs",
    status: "Decision-support deliverables",
    scope: "Consulting · large US investor-owned utility",
    engagementRole: "Category intelligence & executive briefing",
    duration: "8 weeks",
    description:
      "Fragmented market, supplier and spend information was rebuilt into one decision-ready view of the category. Decomposing cost and lead time into their real drivers showed why it rewards partnership and early commitment over aggressive competitive tendering.",
    tags: ["Category intelligence", "Supply markets"],
    role: "Built the category-intelligence report end to end on one framework — market structure, spend, supplier concentration, cost model, commodity exposure, lead time, contracting approach and KPIs — and iterated the executive summary until every statement was fact-based.",
    challenge:
      "The utility was building a category-intelligence capability, and E-STATCOM — grid power electronics with integrated storage — was a priority. Supplier data, market intelligence, commodity trends and spend analytics all lived separately, with no structured view to support sourcing, capital planning and grid-stability investment.",
    approach: [
      {
        title: "Use one decision framework",
        body: "Structure the report around a fixed set of decision questions — market structure, concentration, cost drivers, lead times, contracting options, risk and supplier KPIs — so it stays comparable to the next category.",
      },
      {
        title: "Decompose drivers, not aggregates",
        body: "Break cost into its commodity and manufacturing inputs, and separate lead time into its critical-path components, rather than quoting a blended figure or an average.",
      },
      {
        title: "Write for the commercial decision",
        body: "Tie every risk to its procurement implication, and distil the result into a brief an executive can act on.",
      },
    ],
    judgment:
      "The shift that mattered was from describing a market to saying what procurement should do about it. An average lead time is not actionable, but a critical path running through power semiconductors and the coupling transformer points to a specific action: reserve production slots, do not simply order early.",
    results: [
      "One intelligence base: market structure, supplier landscape, cost drivers and lead-time exposure in one comparable frame.",
      "A differentiated posture: partner and commit early, with production slots secured ahead of need.",
      "An executive-ready briefing that aligned procurement and engineering ahead of the sourcing decisions.",
    ],
    note: "Sources: cost shares from published cost-structure and commodity sources (accessed September 2026) — semiconductor allocation into 2027, and copper above $14,000/t through 2026. This is decision-support intelligence, not a current market forecast, and it claims no subsequent sourcing savings or implementation outcomes. The client's own supplier panel, concentration and spend are withheld.",
  },
];
export const experience = [
  {
    company: "Wood Mackenzie",
    role: "Principal Consultant — Supply Chain Consulting (Energy)",
    period: "Feb 2025 – May 2026",
    location: "Gurugram, India",
    type: "Consulting",
    summary:
      "Capital benchmarking, category strategy, and supply-chain operating-model design for global energy operators and utilities.",
    highlights: [
      "~$2B upstream capital benchmark",
      "~$230M contractor strategy",
      "Supply-chain operating model",
    ],
  },
  {
    company: "BT Group (British Telecom)",
    role: "Category Manager — Procurement",
    period: "Mar 2023 – Feb 2025",
    location: "Gurugram, India",
    type: "In-house",
    summary:
      "Owned £100M of annual civil-infrastructure spend; led should-cost contract renewal and source-to-pay digital transformation.",
    highlights: [
      "£100M spend owned",
      "£2M+ total-cost optimisation",
      "S2P digital transformation",
    ],
  },
  {
    company: "Accenture",
    role: "Senior Analyst & Team Lead — Sourcing & Category Enablement",
    period: "Oct 2021 – Mar 2023",
    location: "Gurugram, India",
    type: "Consulting",
    summary:
      "Capex sourcing and category enablement for a leading upstream O&G operator across EPC, surface facilities, and drilling & completions.",
    highlights: [
      "~$4M capex savings",
      "3 major categories",
      "Business Partner Award",
    ],
  },
  {
    company: "Jindal Drilling & Industries",
    role: "Manager — Procurement",
    period: "Sep 2017 – Jul 2021",
    location: "Gurugram, India",
    type: "In-house",
    summary:
      "Offshore drilling procurement for ONGC and OIL India jack-up rig and MWD contracts; built a 50-vendor ecosystem from scratch.",
    highlights: [
      "~$100M annual portfolio",
      "50-vendor ecosystem",
      "Supply continuity",
    ],
  },
  {
    company: "Quippo Oil & Gas Infrastructure",
    role: "Assistant Manager — Supply Chain Management",
    period: "May 2013 – Aug 2017",
    location: "Gurugram, India",
    type: "In-house",
    summary:
      "Directed global sourcing for 2,000 HP onshore drilling rigs serving ONGC and OIL India across five geographies.",
    highlights: [
      "~$50M annual sourcing",
      "$30M rig-equipment contract",
      "5-geography supplier network",
    ],
  },
  {
    company: "Shyama Power India",
    role: "Assistant Manager — Procurement",
    period: "Sep 2009 – May 2013",
    location: "Gurugram, India",
    type: "In-house",
    summary:
      "EPC procurement for RGGVY Power Grid turnkey projects — BOQs, technical approvals, contractor selection, and quality compliance.",
    highlights: [
      "Turnkey EPC procurement",
      "Power Grid projects",
      "On-time completion",
    ],
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
        body: "MIT SC0x (Supply Chain Analytics, 2026) and SC1x (Fundamentals, 2025), completed courses in the MITx MicroMasters programme.",
      },
    ],
  },
  {
    category: "Awards & recognition",
    entries: [
      {
        title: "Q3 Innovation Award — Wood Mackenzie (2025)",
        body: "~$2B capital benchmarking across a multi-geography team.",
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

export const methods: Record<
  string,
  { title: string; note: string; steps: { title: string; body: string }[] }
> = {
  waterfall: {
    title: "Illustrative total-cost bridge",
    note: "Synthetic example in £M: 11.0 − 0.9 − 0.6 − 0.5 = 9.0. This demonstrates the method; these are not the actual contract values or a breakdown of the reported result.",
    steps: [],
  },
  governance: {
    title: "From transactions to a commercial decision",
    note: "Method schematic. Each finding needs comparable work definitions, a defensible rate reference and explicit assumptions.",
    steps: [
      {
        title: "Understand the spend",
        body: "Identify high-value work items and how they are billed.",
      },
      {
        title: "Explain the variance",
        body: "Compare rates and volumes on a consistent basis.",
      },
      {
        title: "Define the response",
        body: "Connect evidence to billing rules and RFP requirements.",
      },
    ],
  },
  sourcing: {
    title: "Category strategy carried through to award",
    note: "Process schematic, not project-stage counts. Technical requirements, total cost and schedule inform each decision.",
    steps: [
      {
        title: "Segment & aggregate",
        body: "Coordinate demand around managed categories.",
      },
      {
        title: "Evaluate & negotiate",
        body: "Build comparable offers and commercial options.",
      },
      {
        title: "Award & govern",
        body: "Establish contracts and supplier-management routines.",
      },
    ],
  },
  benchmark: {
    title: "Two complementary views of competitiveness",
    note: "Method schematic. Project-level comparisons locate the gap; component analysis explains its drivers.",
    steps: [
      {
        title: "Construct the peer set",
        body: "Balance relevance, data quality and coverage.",
      },
      {
        title: "Normalise the comparison",
        body: "Account for location, timing and specification.",
      },
      {
        title: "Explain the drivers",
        body: "Link system-level findings to component costs.",
      },
    ],
  },
  capacity: {
    title: "A workload-informed operating-model assessment",
    note: "Method schematic. Spend per FTE is one input, interpreted alongside scope, processes and service requirements.",
    steps: [
      {
        title: "Map capabilities",
        body: "Group work by function rather than job title.",
      },
      {
        title: "Assess workload",
        body: "Consider scope and capacity on a comparable basis.",
      },
      {
        title: "Prioritise changes",
        body: "Connect functional gaps to practical role decisions.",
      },
    ],
  },
  categories: {
    title: "One framework, category-specific decisions",
    note: "Analytical framework, not a current market forecast. Sourcing choices depend on the category and decision context.",
    steps: [
      {
        title: "Supply-market structure",
        body: "Understand OEMs, distributors and concentration.",
      },
      {
        title: "Costs & constraints",
        body: "Separate input costs, engineering and lead-time drivers.",
      },
      {
        title: "Commercial implications",
        body: "Evaluate contracting options and supply exposure.",
      },
    ],
  },
};
export const privacyCopy = {
  title: "Enquiry privacy",
  intro:
    "This page explains how information you choose to share through this portfolio is used.",
  sections: [
    {
      heading: "Contacting Mohan",
      body: "Your name, email and message are used to understand and respond to your enquiry about a role. Please avoid sending confidential client or candidate information in an initial message.",
    },
    {
      heading: "When the form prepares an email",
      body: "The form opens a draft in your own email app. Preparing the draft does not send the message. Your email provider handles it when you choose to send it.",
    },
    {
      heading: "When direct form delivery is enabled",
      body: "Enquiry details are transmitted to Web3Forms to deliver the message. The form states whether it sends an enquiry or prepares an email. You can always use the direct email link instead.",
    },
    {
      heading: "Questions about your information",
      body: "Contact mohan.kholiya@gmail.com to ask about information you have shared or to request deletion of your enquiry correspondence.",
    },
  ],
  provider: "Web3Forms privacy information",
  updated: "Last updated: September 2026",
};
