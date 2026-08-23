export const STRATEGIC_THESIS = {
  headline:
    "Lead with workload performance, not cheapest model",
  subheadline:
    "The EU AI market will not be won on price. It will be won by the provider that earns trust, delivers verifiable performance on real workloads, and builds the deepest EU-native ecosystem of partners, integrators, and sovereign deployments.",
  moonshot: {
    title: "The Moonshot",
    text: "Kimi becomes the EU's most trusted high-capability AI platform — the default choice for enterprises, governments, and developers seeking frontier AI with verifiable European data governance.",
  },
  principles: [
    {
      number: 1,
      title: "Trust is the product",
      description:
        "For EU enterprise and government buyers, trust architecture is not a feature — it is the purchase threshold. EU data boundary, GPAI compliance, and independent evaluation must be complete before revenue, not alongside it.",
    },
    {
      number: 2,
      title: "Workload performance over benchmark marketing",
      description:
        "Enterprise buyers make decisions on pilots, not press releases. Invest in verifiable performance on real customer workloads: long-document analysis (K3 1M context), code migration (K2.7 Code), agentic pipelines.",
    },
    {
      number: 3,
      title: "EU-native infrastructure unlocks the addressable market",
      description:
        "Without EU data residency, Kimi's addressable market in Europe is materially smaller. EU hosting is not a differentiator — it is a gate to the market. Prioritise it as Phase 0 critical path.",
    },
    {
      number: 4,
      title: "Partner ecosystem multiplies distribution",
      description:
        "Kimi cannot reach EU enterprise at scale through direct sales alone. SI partnerships (Capgemini, Deloitte), cloud marketplace listings, OEM embeddings (SAP, vertical SaaS), and telecom bundling multiply reach at lower marginal cost.",
    },
    {
      number: 5,
      title: "Open weight as ecosystem catalyst",
      description:
        "K3's open weight availability creates a developer ecosystem, academic community, and community benchmark trust that proprietary models cannot replicate. Channel open weight into EU developer programmes, academic partnerships, and community.",
    },
  ],
  immediateDecisions: [
    {
      priority: 1,
      decision: "Appoint EU legal counsel and initiate GPAI classification",
      deadline: "Sep 2026",
      owner: "CEO / Legal",
      consequence: "Cannot lawfully market or operate in EU without GPAI determination",
    },
    {
      priority: 2,
      decision: "Select EU infrastructure partner and sign data centre agreement",
      deadline: "Oct 2026",
      owner: "CTO / VP Trust",
      consequence: "Gate A blocked; no EU personal data can be processed without data boundary",
    },
    {
      priority: 3,
      decision: "Confirm K3 license terms for EU commercial and OEM use",
      deadline: "Oct 2026",
      owner: "Legal",
      consequence: "OEM and sovereign revenue lines at risk without license clarity",
    },
    {
      priority: 4,
      decision: "Hire VP Trust & Safety as first EU hire",
      deadline: "Sep 2026",
      owner: "CEO / People",
      consequence: "All compliance workstreams blocked without senior owner",
    },
    {
      priority: 5,
      decision: "Define lighthouse account ICP and top-20 target list for UK and Germany",
      deadline: "Oct 2026",
      owner: "VP Sales",
      consequence: "No enterprise pipeline without qualified account list",
    },
    {
      priority: 6,
      decision: "Adopt or engage with GPAI Code of Practice",
      deadline: "Nov 2026",
      owner: "Legal / Policy",
      consequence: "Non-engagement creates regulatory relationship risk with EU AI Office",
    },
  ],
};

export const COMPETITIVE_MOAT = {
  badge: 'RECOMMENDATION' as const,
  headline: 'Kimi\'s durable EU advantage is not raw capability — it is trust architecture + open-weight ecosystem depth.',
  body: 'Mistral, Qwen, and DeepSeek match or exceed Kimi on several raw capability dimensions per internal benchmarking. The defensible position is not to claim capability superiority across the board, but to build a position no US hyperscaler can occupy (open-weight, non-US sovereignty) and that Chinese-origin competitors cannot credibly claim (EU-native data residency, third-party audit trail, GPAI Code of Practice signatory). This position takes 18–24 months to build and is the real strategic asset.',
  moatComponents: [
    'EU-resident inference with verifiable data provenance (hard for US hyperscalers; hard for China-origin alternatives)',
    'Open-weight commercial licensing enabling SI and OEM distribution (Mistral is closest competitor here)',
    'GPAI Code of Practice voluntary commitment — early mover creates compliance differentiation',
    'Developer ecosystem lock-in via K3 open weights, enabling fine-tuning and embedding in EU-built products',
  ],
  notMoat: 'Raw long-context length, benchmark scores, or price alone — all of these are temporary and already matched by competitors.',
  openQuestion: 'Path to gross-margin positivity: EU inference costs likely exceed APAC due to GPU scarcity and data-residency requirements. A credible EU cost-to-serve model is needed before the board can approve the investment.',
};

export const COMMERCIALIZATION_HYPOTHESES = [
  {
    id: 'H1',
    label: 'First Breakthrough',
    title: 'UK Developer Beachhead',
    thesis: 'The UK developer community is the fastest path to first commercial signal — English-language, highest developer density in Europe, sovereign AI sentiment post-Brexit, and outside EU AI Act jurisdiction in 2026, removing the compliance gate for initial traction.',
    proofMetric: '10 API-paying developer teams and €80K ARR within 90 days of UK launch',
    killSignal: 'Fewer than 3 teams express payment intent after 30 qualified conversations — indicates the UK developer hypothesis is wrong and attention should shift to NL enterprise.',
    nonStandardAngle: 'Co-build with 2 London API-first startups as design partners: they get early access + influence on roadmap; we get commercial reference + product signal simultaneously. Not a standard customer relationship.',
    color: '#00d4ff',
    badge: 'ASSUMPTION' as const,
  },
  {
    id: 'H2',
    label: 'Commercial Moat',
    title: 'EU AI Act Compliance as Revenue Accelerator',
    thesis: 'Being the first hyperscaler-grade AI API to publish a full EU AI Act compliance architecture turns a regulatory burden into a commercial filter. Every EU enterprise that needs compliant AI will narrow its shortlist to Kimi — at a time when all US hyperscalers are still adjusting.',
    proofMetric: '2 signed enterprise LOIs explicitly citing EU compliance architecture as a primary decision factor by Q2 2027',
    killSignal: 'EU enterprise procurement timelines slip past Q3 2027, or EU AI Office delays enforcement — compliance moat has no near-term commercial value; hypothesis is premature.',
    nonStandardAngle: 'Offer EU AI Act compliance co-design as a non-standard transaction: enterprises contribute use-case data and design input; Kimi provides early API access + public reference rights. Revenue-equivalent even without cash.',
    color: '#a855f7',
    badge: 'ASSUMPTION' as const,
  },
  {
    id: 'H3',
    label: 'Ecosystem Multiplier',
    title: 'Open-Weight Lock-In via SI Ecosystem',
    thesis: 'Enterprise buyers burned by OpenAI/Azure lock-in will pay premium for an open-weight model, even at comparable price. Partnering with 3 EU System Integrators who embed Kimi into their delivery practice creates distribution no direct sales team can match — SIs need a non-US AI option to offer clients.',
    proofMetric: '3 SI partnership agreements with pipeline commitments by Q4 2027, generating €5M in partner-sourced ARR',
    killSignal: 'SIs decline to invest in a Kimi-specific practice due to uncertain roadmap or low client demand signal — pivot to cloud marketplace listing instead.',
    nonStandardAngle: 'Co-construction of a Kimi-native delivery toolkit with Capgemini, Deloitte, and Atos/Eviden — prompt libraries, EU AI Act compliance templates, vertical fine-tunes — in exchange for pipeline commitments and co-marketing. Ecosystem value, not just reseller margin.',
    color: '#10b981',
    badge: 'ASSUMPTION' as const,
  },
] as const;

export type CommercializationHypothesis = typeof COMMERCIALIZATION_HYPOTHESES[number];

export const STRATEGIC_NARRATIVES = {
  forBoard:
    "Kimi enters Europe at the right moment: the EU AI market is large, growing, and structurally underserved by providers willing to commit to EU data sovereignty. K3's technical differentiation (1M context, open weight, frontier coding) is real. But the path to €550M base revenue requires executing on trust architecture before revenue — a €5–8M Phase 0 investment to unlock a €13B SAM.",
  forEnterpriseBuyer:
    "Kimi gives European enterprises access to frontier AI capability — including the industry's leading long-context model — with EU data residency, GPAI-compliant governance, and the transparency of open weights. Unlike US-only providers, Kimi is designed for European regulatory requirements from day one.",
  forDeveloper:
    "K2.7 Code delivers the best coding price/performance ratio in the market, and K3 gives you 1M tokens of context to analyse entire codebases in a single call. Open weights mean you can run, evaluate, and customise models without depending on one provider's API availability.",
};
