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
            value: "$2.2B",
            label: "Upstream capital benchmark at Wood Mackenzie",
            href: "/#experience",
          },
          {
            value: "$233M",
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
    download: {
      title: "Curriculum vitae",
      body: "Sixteen years across energy, utilities and telecom, in-house and in advisory.",
      href: "/resume.pdf",
      label: "Download resume",
    },
    downloadNote: "PDF · 2 pages",
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
    headline: "A defensible benchmark for a complex capital decision.",
    metric: "27 projects",
    metricLabel: "in the comparative peer set",
    status: "Decision support",
    description:
      "Top-down and component-level benchmarking to focus a pre-FEED cost-competitiveness review.",
    tags: ["Capital benchmarking", "Cost modelling"],
    scope: "Consulting · Global upstream energy operator",
    role: "My work contributed to the benchmarking, cost-driver analysis and executive synthesis within the independent competitiveness review team.",
    challenge:
      "A shallow-water gas development needed a credible cost comparison before the next design stage. Ideal peers were scarce, and a single headline cost ranking would not explain which systems were competitive or where the gaps originated.",
    approach: [
      {
        title: "Construct a useful peer set",
        body: "Widen the comparison criteria deliberately, then account for differences in location, timing and specification.",
      },
      {
        title: "Use complementary analytical views",
        body: "Combine project-level comparisons with a bottom-up examination of component costs and drivers.",
      },
      {
        title: "Focus the decision",
        body: "Distinguish structural constraints from commercially addressable drivers and translate the findings into a focused review agenda.",
      },
    ],
    judgment:
      "A first-quartile target is not automatically appropriate for every cost system. The value of the benchmark was to explain the differences and frame a realistic goal for each part of the project.",
    results: [
      "A 27-project peer set to inform the competitiveness review.",
      "System-level comparisons supported by component-level cost-driver analysis.",
      "A clearer agenda for evaluating cost gaps ahead of further project decisions.",
    ],
    note: "This case describes benchmarking and decision support. It does not claim ownership of the final investment decision or subsequent savings. Client and project details are anonymised.",
    chart: "benchmark",
  },
  {
    id: "unit-rate-governance",
    sector: "utilities",
    sectorLabel: "Utilities",
    headline: "Finding the value hidden in contractor billing.",
    metric: "$4.9M–$6M",
    metricLabel: "annual commercial opportunity identified",
    status: "Identified opportunity",
    description:
      "Transaction-level analysis of a $233M contractor programme, translated into practical contracting recommendations.",
    tags: ["Spend analytics", "Commercial governance"],
    scope: "Consulting · US electric utility",
    role: "I led the assessment methodology, rate-book gap analysis, commercial impact modelling and contracting recommendations, with junior consultants supporting analysis.",
    challenge:
      "Ahead of a major contractor renewal, the utility needed to understand inconsistent rates and billing practices across its programme. Ambiguous work descriptions and time-based billing made the commercial exposure difficult to quantify or govern.",
    approach: [
      {
        title: "Focus the investigation",
        body: "Use approximately 565,000 transactions across 482 rate codes to locate spend concentration and inconsistent billing.",
      },
      {
        title: "Quantify variance carefully",
        body: "Compare contractor-level rates and volumes against the selected reference, documenting assumptions and scope limitations.",
      },
      {
        title: "Translate analysis into contract rules",
        body: "Develop clearer scope definitions, billing governance and a pricing approach to support the RFP.",
      },
    ],
    judgment:
      "A rate comparison is useful only when the work and measurement units are comparable. I refined the model to weight contractor-specific rates by their own transaction volumes and kept the opportunity as one integrated finding.",
    results: [
      "A $4.9M–$6M annual opportunity identified against the assessment benchmark.",
      "Governance and contracting recommendations informed the client's RFP design.",
      "An analytical framework linking each recommendation to a specific commercial issue.",
    ],
    note: "This is an identified opportunity, not realised savings. The assessment uses a selected rate reference; an internal weighted-average rate does not, by itself, establish external market pricing. Realisation depends on validation and implementation.",
    chart: "governance",
  },
  {
    id: "supply-chain-benchmarking",
    sector: "utilities",
    sectorLabel: "Utilities",
    headline: "The right capacity, in the right parts of the function.",
    metric: "Role by role",
    metricLabel: "supply-chain capacity assessed",
    status: "Operating-model diagnostic",
    description:
      "Peer comparison and functional analysis to inform workforce and operating-model decisions.",
    tags: ["Operating models", "Workforce benchmarking"],
    scope: "Consulting · Regulated US utility",
    role: "I developed the comparison framework, assessed role allocation and workload, and synthesised the implications for supply-chain leadership.",
    challenge:
      "A growing utility wanted to understand whether its supply-chain organisation could sustain its workload. Raw headcount comparisons could obscure differences in role scope, process design and functional coverage.",
    approach: [
      {
        title: "Compare capabilities, not job titles",
        body: "Group work by the capability delivered so that differently named roles can be compared meaningfully.",
      },
      {
        title: "Consider workload and coverage",
        body: "Assess spend responsibility and functional capacity alongside scope, rather than treating spend per person as a standalone efficiency score.",
      },
      {
        title: "Translate findings into choices",
        body: "Identify where clearer ownership, execution support or enablement capacity could strengthen the operating model.",
      },
    ],
    judgment:
      "High spend per person can indicate a lean organisation or an overloaded one. The recommendation needs the context of scope, service expectations and how work is distributed.",
    results: [
      "A structured fact base for workforce and operating-model discussions.",
      "Visibility into workload distribution and functional coverage.",
      "Recommendations for targeted capacity and role-design decisions.",
    ],
    note: "The case describes a diagnostic and recommendations. Unconfirmed peer counts, pilot results, headcount changes and downstream savings are not presented as outcomes.",
    chart: "capacity",
  },
  {
    id: "bt-contract-renewal",
    sector: "telecom",
    sectorLabel: "Telecom",
    headline: "A stronger renewal. Service continuity protected.",
    metric: "~£2M",
    metricLabel: "total-cost optimisation secured",
    status: "Contracted optimisation",
    description:
      "Should-cost modelling and negotiation across a complex BT Group service-delivery renewal.",
    tags: ["Should-cost modelling", "Negotiation"],
    scope: "In-house category ownership · BT Group",
    role: "I led the renewal: developing the cost model, building the negotiation position and negotiating the commercial outcome.",
    challenge:
      "A multi-year field-services agreement was approaching renewal. Historical rates offered a weak negotiating baseline, while a supplier change could put service continuity at risk. The decision needed to account for the full cost of delivery.",
    approach: [
      {
        title: "Rebuild the baseline",
        body: "Decompose labour, productivity, materials, overhead and margin to understand the cost of the service.",
      },
      {
        title: "Look beyond the day rate",
        body: "Evaluate mobilisation, travel, rework and service-level commitments alongside quoted rates.",
      },
      {
        title: "Negotiate with continuity in mind",
        body: "Use the cost model to prioritise commercial asks and close a renewal with the incumbent.",
      },
    ],
    judgment:
      "The useful negotiation was about the complete service economics. A lower headline rate would have meant little if mobilisation, rework or delivery disruption increased the total cost.",
    results: [
      "Approximately £2M of total-cost optimisation secured in the renewal.",
      "Incumbent retained and field-service continuity protected.",
      "A reusable should-cost baseline and clearer view of cost levers.",
    ],
    note: "The £100M figure elsewhere describes annual category responsibility at BT Group, not this individual contract. The cost bridge is a synthetic method illustration, not the contract's actual cost baseline.",
    chart: "waterfall",
  },
  {
    id: "accenture-capex-sourcing",
    sector: "energy",
    sectorLabel: "Energy & oil & gas",
    headline: "Turning fragmented CapEx buying into category leverage.",
    metric: "~$4M",
    metricLabel: "CapEx savings delivered",
    status: "Sourcing outcome",
    description:
      "Category strategy and end-to-end sourcing across EPC, surface facilities, and drilling and completions.",
    tags: ["Strategic sourcing", "Category management"],
    scope: "Consulting · Indian upstream E&P operator",
    role: "Within Accenture's engagement team, I led category strategy and sourcing across major capital packages, from qualification and RFx through evaluation, negotiation and award.",
    challenge:
      "Project-by-project tendering fragmented demand and limited supplier leverage. The operator needed a coordinated category approach while maintaining attention to technical requirements, quality and delivery schedules.",
    approach: [
      {
        title: "Manage spend as categories",
        body: "Develop approaches for EPC, surface facilities, and drilling and completions based on their different supply markets.",
      },
      {
        title: "Aggregate demand and compete appropriately",
        body: "Consolidate requirements across projects and run structured qualification, RFx and technical-commercial evaluation.",
      },
      {
        title: "Carry the strategy through award",
        body: "Negotiate and award packages using total cost, quality and schedule considerations, then establish category playbooks.",
      },
    ],
    judgment:
      "Supplier leverage came from the structure of the process as well as the size of the package. Different categories needed different contracting approaches rather than a single tendering formula.",
    results: [
      "Approximately $4M in CapEx savings across the managed sourcing portfolio.",
      "Coordinated strategies across three major capital categories.",
      "Category playbooks and supplier-management routines for the in-house team.",
    ],
    note: "Client identity is withheld. Savings describe the sourcing portfolio; category proportions and supplier counts are omitted rather than reconstructed as project facts.",
    chart: "sourcing",
  },
  {
    id: "category-intelligence",
    sector: "energy",
    sectorLabel: "Energy & utilities",
    headline: "Different markets deserve different sourcing strategies.",
    metric: "2 categories",
    metricLabel: "one consistent intelligence framework",
    status: "Decision-support deliverables",
    description:
      "Connecting supplier markets, cost drivers and lead times to commercial choices for Lighting and E-STATCOM.",
    tags: ["Category intelligence", "Supply markets"],
    scope: "Consulting · Energy utility",
    role: "I developed the category-intelligence framework, market and cost-driver analysis, and executive synthesis for the two categories.",
    challenge:
      "Procurement needed a consolidated view of two very different markets. Fragmented supplier information, spend data and technical inputs made it difficult to connect market research to sourcing decisions.",
    approach: [
      {
        title: "Use one decision framework",
        body: "Structure both reports around market concentration, costs, lead times, contracting options and supply risk.",
      },
      {
        title: "Separate the underlying drivers",
        body: "Distinguish engineered equipment and long-lead components from lighting procurement through OEMs and distributors.",
      },
      {
        title: "Write for the commercial decision",
        body: "Link each finding to its sourcing implication and distil the result into an executive brief.",
      },
    ],
    judgment:
      "The important shift was from describing a market to explaining what procurement should consider doing about it. Common headings made the categories comparable without assuming they should be sourced identically.",
    results: [
      "Two executive-ready category-intelligence reports.",
      "A consistent framework connecting internal spend and external market information.",
      "Clearer visibility of category-specific cost, supply and contracting considerations.",
    ],
    note: "This is a description of the engagement method, not a current market forecast. It does not claim subsequent sourcing savings or implementation outcomes.",
    chart: "categories",
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
      "$2.2B upstream capital benchmark",
      "$233M contractor strategy",
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
