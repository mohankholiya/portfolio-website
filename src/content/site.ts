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
    headline: "Benchmarking system by system replaced a blanket cost mandate.",
    metric: "27 projects",
    metricLabel: "in the comparative peer set",
    status: "Decision support",
    description:
      "Two independent benchmarks — top-down against 27 peers and bottom-up to component level — located the gap in pipeline and rig rate, and left production facilities alone.",
    tags: ["Capital benchmarking", "Cost modelling"],
    scope: "Consulting · Supermajor upstream operator",
    role: "I led the benchmarking workstream feeding a joint gap-to-goal workshop: building the peer set, normalising costs at system and component level, quantifying the variance, and synthesising a fragmented cost picture into a board-ready verdict.",
    challenge:
      "An internal review had flagged costs as outside first quartile, with no like-for-like evidence of where the project actually sat. Comparable shallow-water gas peers were scarce, so a credible comparison set was the first problem to solve rather than an input to it.",
    approach: [
      {
        title: "Construct a defensible peer set",
        body: "Widen the comparison criteria deliberately — production year, water depth, adjacent basins — then normalise every peer cost for time, region and specification.",
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
      "First quartile is not automatically the right goal for every cost system. Separating structural gaps — tie-back distance, seabed conditions, a thin regional contracting market — from addressable ones such as rig rate is what made the benchmark actionable rather than merely damning.",
    results: [
      "A 27-project peer set built where fewer than five clean comparators existed.",
      "A system-level verdict: second quartile on production facilities, fourth quartile on pipeline and on drilling and completions.",
      "The dominant lever isolated — rig rate, roughly 41% of drilling and completions cost.",
    ],
    note: "This case describes benchmarking and decision support. It does not claim ownership of the final investment decision or subsequent savings. Client, project and peer identities are anonymised, and exhibit internals are directional.",
  },
  {
    id: "unit-rate-governance",
    sector: "utilities",
    sectorLabel: "Utilities",
    headline: "One governance gap repeating six times, not six expensive contractors.",
    metric: "~$5–6M",
    metricLabel: "annual opportunity identified",
    status: "Identified opportunity",
    description:
      "Transaction-level analysis of a ~$230M contractor programme, translated into a five-pillar contracting framework tied to the renewal critical path.",
    tags: ["Spend analytics", "Contract strategy"],
    scope: "Consulting · Large US investor-owned utility",
    role: "I led the assessment end to end — designing the three-step commercial-impact method, analysing twelve months of approved spend across roughly 565,000 transactions, isolating the structural root cause, and converting the diagnosis into a contracting framework and phased roadmap.",
    challenge:
      "A five-year renewal of the overhead-construction contracts was approaching, against a rate book five years out of date. Ambiguous work descriptions and time-based billing made the exposure real but unquantified, with no competitive-tension mechanism in the contract.",
    approach: [
      {
        title: "Concentrate the field",
        body: "A Pareto of 482 rate-book items showed 45 of them driving roughly 80% of spend — and that the three largest items were not unit-billed at all.",
      },
      {
        title: "Classify every gap, MECE",
        body: "Sort the top-45 items into missing definition, urgent upgrade, monitor and clean, so the reform list fits inside one renewal cycle.",
      },
      {
        title: "Quantify only what is defensible",
        body: "Flag the item on rate variance, identify who sits above the volume-weighted average rate, then size exposure by that contractor's own volume, floored at zero.",
      },
    ],
    judgment:
      "A rate comparison is only useful when the work and its measurement units are genuinely comparable. I weighted each contractor's rates by their own transaction volumes, and held the finding together as one integrated opportunity rather than splitting it into individually deniable line items.",
    results: [
      "A ~$5–6M annual opportunity quantified bottom-up, with every assumption logged.",
      "Rate-book enforcement identified as the single structural lever — avoiding a contractor reshuffle that would not have fixed the cause.",
      "An RFP-ready package: a five-pillar contract framework, an upgraded work-description standard and a standardised pricing template.",
    ],
    note: "This is an identified opportunity, not realised savings; realisation depends on validation and implementation. Client and contractor identities are withheld and figures are rounded. The 75–80% unit-billing reference is a directional maturity range observed across comparable programmes, not a published industry standard.",
  },
  {
    id: "supply-chain-benchmarking",
    sector: "utilities",
    sectorLabel: "Utilities",
    headline: "The organisation did not have a level problem. It had a distribution problem.",
    metric: "Role by role",
    metricLabel: "supply-chain capacity assessed",
    status: "Operating-model diagnostic",
    description:
      "Headcount ratios would have called this function efficient. Assessing workload role by role showed a lean structure carrying peer-topping spend per person, with no headroom for the growth it was being asked to absorb.",
    tags: ["Operating models", "Benchmarking"],
    scope: "Consulting · Regulated US electric & gas utility",
    role: "I led the benchmarking assessment across structure, role allocation and functional capacity — defining the peer-comparison framework, normalising spend and headcount by workload, clustering roles by capability rather than title, and translating the findings into structural implications.",
    challenge:
      "Leadership needed to know whether the supply-chain organisation was structured to support current spend and planned growth. Raw headcount comparisons risked obscuring real differences in role scope and functional coverage between peers.",
    approach: [
      {
        title: "Compare capabilities, not job titles",
        body: "Every utility names supply-chain roles differently, so cluster roles by the capability they deliver, then normalise each function by a workload denominator.",
      },
      {
        title: "Map the outliers",
        body: "Plot load-adjusted spend per FTE against workload to find which functions sit off the peer line, and in which direction.",
      },
      {
        title: "Rule out the alternatives first",
        body: "Test turnover, geographic scope and workload growth before attributing a gap to organisation and process design.",
      },
    ],
    judgment:
      "High spend per person can mean a lean organisation or an overloaded one, and the two call for opposite responses. Reading the number alongside scope, service expectations and how execution work was distributed is what turned a benchmark into a recommendation rather than a headline.",
    results: [
      "A load-adjusted fact base usable directly in workforce and operating-model decisions.",
      "Two structural gaps identified: thin execution capacity beneath manager roles, and no standalone planning capability.",
      "A phased reallocation plan de-risked through a single-region pilot with tracked KPIs before any wider change.",
    ],
    note: "The deliverable was a diagnostic and a recommended operating model. Headcount changes, pilot results and downstream savings are not presented as outcomes of this work. Peer identities and counts are withheld; distributions are indexed and directional.",
  },
  {
    id: "bt-contract-renewal",
    sector: "telecom",
    sectorLabel: "Telecom",
    headline: "The negotiable gap was never in the labour rates.",
    metric: "~£2M",
    metricLabel: "total-cost optimisation secured",
    status: "Contracted optimisation",
    description:
      "Should-cost modelling and total-cost negotiation across a BT Group field-services renewal, with the incumbent retained and service continuity protected.",
    tags: ["Should-cost modelling", "Negotiation"],
    scope: "In-house category ownership · BT Group",
    role: "I led the renewal end to end: building the should-cost model from first principles, constructing a total-cost view that priced mobilisation, travel, service-level credits and rework, setting the negotiation strategy and walk-away position, and leading the supplier negotiation to close.",
    challenge:
      "A multi-year regional service-delivery contract was approaching renewal with no refreshed cost baseline behind it. Rates had been accepted historically, and savings could not come at the cost of continuity — pressing a regional incumbent too hard put field-service delivery at risk.",
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
      "The negotiation that mattered was about complete service economics, not the headline day rate. A lower rate would have meant little if mobilisation, rework or disruption pushed total cost back up — so the ask was sequenced to protect continuity while still taking the margin gap.",
    results: [
      "Approximately £2M of total-cost optimisation locked into the renewed contract across four levers, only one of which was the rate itself.",
      "The gap located in overhead and margin above a defensible build-up, not in labour rates.",
      "A reusable should-cost baseline left with the team to anchor the next renewal cycle.",
    ],
    note: "BT Group is named as engagement context; the supplier is withheld. The £100M figure elsewhere describes annual category responsibility at BT Group, not this contract. Cost build-ups and the bridge are directional method illustrations, not the contract's actual baseline.",
  },
  {
    id: "accenture-capex-sourcing",
    sector: "energy",
    sectorLabel: "Energy & oil & gas",
    headline: "A capital programme tendered package by package leaks leverage at every award.",
    metric: "~$4M",
    metricLabel: "CapEx savings delivered",
    status: "Sourcing outcome",
    description:
      "Managing the programme as three categories — each matched to its own supply market rather than to one tendering formula — converted scattered tenders into roughly $4M of CapEx savings.",
    tags: ["Strategic sourcing", "Category management"],
    scope: "Consulting · Accenture, upstream E&P operator",
    role: "Within Accenture's engagement team I led CapEx sourcing and category management across the major spend categories — building category strategies, aggregating demand across projects, running sourcing end to end from qualification through award, and embedding category governance in the client's own team.",
    challenge:
      "A large upstream capital programme was being sourced project by project, each package tendered in isolation. There was no category strategy and no aggregated demand view, which left limited leverage against a concentrated contractor base.",
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
        body: "Narrow a wide qualified field through formal gates — roughly one in twenty qualified suppliers reaches award.",
      },
    ],
    judgment:
      "Leverage came from the structure of the process as much as from the size of the package. A concentrated market does not reward a longer bidder list — it rewards disciplined stage-gates, which is why each category earned a different contracting approach rather than one tendering formula.",
    results: [
      "Approximately $4M in CapEx savings delivered across the managed sourcing portfolio.",
      "Category strategies established across EPC, surface facilities and drilling and completions, replacing project-by-project buying.",
      "Category playbooks and supplier-management routines embedded with the in-house team.",
    ],
    note: "Accenture is named as engagement context; the E&P client and all contractors are withheld. Category splits and the sourcing funnel are directional; no split of the ~$4M saving across categories is implied.",
  },
  {
    id: "category-intelligence",
    sector: "energy",
    sectorLabel: "Energy & utilities",
    headline: "E-STATCOM is a category you secure early, not one you tender late.",
    metric: "Commit early",
    metricLabel: "the category posture the intelligence pointed to",
    status: "Decision-support deliverables",
    description:
      "Market structure, supplier landscape, cost drivers and lead times for E-STATCOM — grid power electronics with integrated energy storage — connected to the sourcing posture they imply.",
    tags: ["Category intelligence", "Supply markets"],
    scope: "Consulting · Large US investor-owned utility",
    role: "I built the category-intelligence report end to end on a single analytical framework — market structure, spend profile, supplier landscape and concentration, cost model, commodity exposure, lead-time analysis, contracting approach, risk and supplier KPIs — and iterated the executive summary until every statement was fact-based and decision-relevant.",
    challenge:
      "The utility was building a category-intelligence capability, and E-STATCOM was a priority category. The information decision-makers needed was fragmented: supplier data, market intelligence, commodity trends and spend analytics all lived separately, with no structured view to support sourcing and capital planning.",
    approach: [
      {
        title: "Use one decision framework",
        body: "Structure the report around a fixed set of decision questions — market structure, concentration, cost drivers, lead times, contracting options, risk and supplier KPIs — so it stays comparable to the next category.",
      },
      {
        title: "Decompose drivers, not aggregates",
        body: "Break cost into its commodity and manufacturing inputs, and separate lead time into its critical-path components, rather than quoting a blended inflation figure or an average.",
      },
      {
        title: "Write for the commercial decision",
        body: "Tie every risk to its procurement implication, and distil the result into a brief an executive can act on.",
      },
    ],
    judgment:
      "The shift that mattered was from describing a market to saying what procurement should do about it. Decomposition is what made that possible: an average lead time is not actionable, but a critical path running through power semiconductors and the coupling transformer inside the package points to a specific action — reserve production slots, do not simply order early.",
    results: [
      "One decision-ready intelligence base holding market structure, supplier landscape, cost drivers, lead times, contracting and risk in a single comparable frame.",
      "Roughly half of installed cost traced to two supply-constrained inputs — power semiconductors and copper-intensive magnetics — giving procurement evidence to challenge a supplier quote.",
      "A differentiated category posture: partner and commit early, with production slots reserved ahead of need rather than competed at the point of requirement.",
    ],
    note: "This is decision-support intelligence, not a current market forecast, and it claims no subsequent sourcing savings or implementation outcomes. The client's own supplier panel, concentration and spend are withheld; where the supply market is described from public sources, the source is cited on the exhibit.",
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
