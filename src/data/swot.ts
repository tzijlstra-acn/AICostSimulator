export interface SwotItem {
  title: string;
  body: string;
}

export const SWOT_ANALYSIS = {
  strengths: [
    { title: "Open-weight sovereignty", body: "K2.6, K2.7, K3 under Modified MIT. EU enterprises self-host on EU infrastructure — zero GDPR/Schrems II transfer risk." },
    { title: "1M-token context window", body: "8× GPT-5.6, 4× Claude. Genuine differentiator for legal documents, codebases, and clinical literature — no competitor matches this in open weights." },
    { title: "Cost-per-task efficiency", body: "$0.94 per Intelligence Index task vs. frontier alternatives at $2.75. Dollar-for-dollar output beats or matches the competition." },
    { title: "AWS Marketplace + EU infrastructure", body: "Immediate enterprise credibility. Procurement via existing AWS contracts — no new vendor onboarding required." },
    { title: "Agentic capabilities", body: "Native 300-sub-agent swarm (K2.6+), Kimi Work desktop agent. Ahead of most open-weight providers on agentic AI." },
    { title: "Capital position", body: ">$1.4B cash, $20B+ valuation. Signals long-term stability to risk-averse European procurement teams." },
    { title: "Proven Western traction", body: "Cursor, DoorDash, Coinbase, Airbnb, Thinking Machines Lab. Not 'cheap alternative' — 'better quality, lower cost.'" },
  ] as SwotItem[],
  weaknesses: [
    { title: "Geopolitical origin", body: "21+ US states banned Chinese AI apps. US House Committee subpoenaed Kimi customers. Triggers extra legal and security review in EU procurement cycles." },
    { title: "Compliance certification gap", body: "No published SOC 2, HITRUST, HIPAA BAA, or ISO 27001 for hosted API. Enterprise tier claims privacy but lacks independent attestation." },
    { title: "Hosted API data residency", body: "API operated by Moonshot AI PTE. LTD. (Singapore), data stored in Singapore. GDPR-blocking for EU-covered data without self-hosting." },
    { title: "Ecosystem immaturity", body: "Fewer tutorials, integrations, community resources than OpenAI/Anthropic. EU developer teams hit thinner support when edge-casing." },
    { title: "Language limitation", body: "Optimised for Chinese and English. French, German, Spanish, Italian output is less consistent than Mistral, which natively targets these markets." },
    { title: "Verbose reasoning = hidden cost", body: "K3 generates ~2× median output tokens of comparable reasoning models. At $15/M output, this erodes the headline price advantage on complex agent tasks." },
    { title: "Limited EU enterprise track record", body: "Not included in Gartner 2026 Enterprise AI Coding Agents evaluation. Short Western enterprise reference base outside tech startups." },
  ] as SwotItem[],
  opportunities: [
    { title: "Sovereign AI megatrend", body: "93% of executives consider AI sovereignty 'mission-critical' (up from 41% in 2024). EU AI Act + Schrems II forcing enterprises to seek self-hostable models." },
    { title: "European AI adoption gap", body: "EU enterprise AI adoption at 13.48% (2024). The gap is not lack of interest — it is data governance. Self-hosted open-weight models close this." },
    { title: "SI channel opportunity", body: "European SIs (Accenture, Capgemini, Deloitte) need competitive, sovereign AI models to build practices around. Open weights mean no vendor lock-in for them." },
    { title: "EU AI Act compliance window", body: "Phased enforcement beginning August 2026. Enterprises need audit trails, transparency, data control. Self-hosted Kimi + local logging = compliant architecture." },
    { title: "Price arbitrage vs. US incumbents", body: "K3 at $15/M output vs. frontier alternatives at $50/M. European enterprises under margin pressure — compelling CFO conversation." },
    { title: "AWS Marketplace acceleration", body: "European AWS customers discover and procure through existing cloud contracts, bypassing lengthy vendor onboarding processes." },
    { title: "Open-source ecosystem lock-in", body: "If Kimi becomes the default open-weight model for EU developers (via Ollama, vLLM, Hugging Face), creates stickiness that transcends geopolitical concerns." },
  ] as SwotItem[],
  threats: [
    { title: "Mistral: the 'safe' EU alternative", body: "French/German government framework agreements (2026–2030), HSBC, Stellantis, Veolia, Apache 2.0. For risk-averse CISOs, Mistral is the default sovereign choice." },
    { title: "EU AI Act systemic risk classification", body: "If K3 training run crosses 10^25 FLOP threshold, triggers additional compliance burdens — red-teaming, incident reporting — slowing enterprise adoption." },
    { title: "Geopolitical escalation", body: "If EU governments follow the US lead and restrict Chinese AI models on sensitive infrastructure, Moonshot faces de facto bans in public sector and critical infrastructure." },
    { title: "DeepSeek on price", body: "DeepSeek V4 Flash at $0.17/M tokens is the budget leader. For pure cost plays, Moonshot is vulnerable at the low end." },
    { title: "Open-weight monetisation challenge", body: "Enterprises self-hosting K3 pay $0 API fees. Must capture value through support, fine-tuning, or the $20M+ revenue-sharing clause — enforcement is untested." },
    { title: "Safety and reputation risk", body: "Open weights can be misused. One high-profile incident (deepfakes, cyberattack tooling) triggers regulatory backlash against all Chinese open-weight models." },
    { title: "US CLOUD Act perception", body: "Even when self-hosted, some European buyers conflate 'Chinese model' with 'foreign surveillance risk.' Mistral benefits from EU-native, no CLOUD Act exposure." },
  ] as SwotItem[],
};

export interface TacticalPlay {
  number: number;
  title: string;
  quote: string;
}

export const TACTICAL_PLAYS: TacticalPlay[] = [
  {
    number: 1,
    title: "The Frankfurt Self-Host Narrative",
    quote: "For every Tier 2 and 3 prospect, the first meeting should end with a technical workshop on running K3 on AWS Frankfurt — not a pricing discussion. Once they see it running on their own VPC, the geopolitical objection evaporates.",
  },
  {
    number: 2,
    title: "The London–Paris–Berlin Triangle",
    quote: "These three cities contain 60%+ of ideal prospects. Own three markets deeply rather than diluting across 15 cities. London for developers and LegalTech. Paris for enterprise and government. Munich/Berlin for industrial and Mittelstand.",
  },
  {
    number: 3,
    title: "The SI Channel as Force Multiplier",
    quote: "A single Capgemini or Accenture partnership could deliver 50+ enterprise clients. BD should be 40% direct sales, 60% channel enablement in Year 1. SIs need margin they can mark up and a story that beats 'we use Azure OpenAI.'",
  },
  {
    number: 4,
    title: "The Mistral Defense",
    quote: "When prospects say 'but we're talking to Mistral,' respond: 'Mistral is excellent for French chat and government framework deals. For 1M-token document analysis, coding agents, and multimodal industrial use cases, K3 benchmarks higher — and unlike Mistral's largest models, K3 is available as open weights today.'",
  },
  {
    number: 5,
    title: "License Nuance for Big Accounts",
    quote: "K3's Modified MIT license requires revenue sharing for inference providers earning >$20M/year from the model. For ASML, Siemens, or Capgemini, this clause matters. Have a clear enterprise licensing track ready before the first enterprise meeting.",
  },
];

export interface RegionalCity {
  region: string;
  priority: "P0" | "P1" | "P2";
  why: string;
  verticals: string;
  density: "Highest" | "High" | "Medium-High" | "Medium" | "Low-Medium";
}

export const REGIONAL_MATRIX: RegionalCity[] = [
  { region: "London, UK", priority: "P0", why: "Densest LegalTech, FinTech, AI startup, and SI cluster in Europe. English-native market.", verticals: "LegalTech, RegTech, DevTools, SIs", density: "Highest" },
  { region: "Paris, France", priority: "P0", why: "Enterprise HQ density (CAC40). Government AI framework opportunities. Mistral's backyard — must compete here.", verticals: "Enterprise, Luxury, Government, AI Research", density: "Highest" },
  { region: "Munich / Berlin, Germany", priority: "P0", why: "Industrial giants (Siemens, BMW, Bosch). Mittelstand manufacturing. Strong self-hosting culture.", verticals: "Industrial, Automotive, SaaS", density: "Highest" },
  { region: "Amsterdam, Netherlands", priority: "P1", why: "EU HQ for US tech — ideal for 'sovereign alternative' pitch. AWS EU-West-1 region. Fintech hub.", verticals: "FinTech, SaaS, Enterprise EU HQs", density: "High" },
  { region: "Zurich / Geneva, Switzerland", priority: "P1", why: "Pharma (Roche, Novartis), banking, high ACV, privacy-obsessed. Not EU — different regulatory frame.", verticals: "Pharma, Banking, Research", density: "High" },
  { region: "Stockholm / Copenhagen, Nordics", priority: "P1", why: "SaaS unicorn factory (Spotify, Klarna legacy). English-fluent. Early tech adopters.", verticals: "SaaS, FinTech, Industrial", density: "Medium-High" },
  { region: "Dublin, Ireland", priority: "P1", why: "EU HQ for US RegTech/Fintech. AWS/Azure EU presence. Low corporate tax = high enterprise density.", verticals: "RegTech, Enterprise EU HQs", density: "Medium" },
  { region: "Cambridge / Oxford, UK", priority: "P1", why: "DeepTech, biotech, AI research. University spinouts with venture funding.", verticals: "Biotech, Research, LegalTech", density: "Medium" },
  { region: "Barcelona / Madrid, Spain", priority: "P2", why: "Growing tech scene. Lower cost base. Latin American market bridge.", verticals: "SaaS, Design Tools", density: "Medium" },
  { region: "Tallinn, Estonia", priority: "P2", why: "Digital government, e-Residency, crypto/RegTech hub. Small but agile market.", verticals: "RegTech, Crypto, Government", density: "Low-Medium" },
  { region: "Heidelberg / Mannheim, Germany", priority: "P2", why: "Aleph Alpha territory. AI research and Mittelstand manufacturing corridor.", verticals: "Research, Industrial", density: "Medium" },
];

export interface NoFitSegment {
  name: string;
  reason: string;
}

export const NO_FIT_SEGMENTS: NoFitSegment[] = [
  { name: "EU Defense / Military", reason: "Mistral has French Armed Forces framework agreement through 2030. Procurement is politically and commercially locked down." },
  { name: "EU Government Critical Infrastructure", reason: "Likely to face de facto bans on Chinese-origin AI models in sensitive sectors. National security review will block." },
  { name: "Small Startups Without MLOps", reason: "K3 requires 64+ accelerators to self-host. Without that capability, hosted API at $15/M output is premium pricing — they default to cheaper APIs." },
  { name: "Pure-Play Multilingual EU Content", reason: "If the primary use case is French legal drafting or German customer service, Mistral outperforms Kimi. Do not compete where you are weakest." },
  { name: "Healthcare Providers (Patient-Facing)", reason: "No HIPAA BAA, no HITRUST, no EU health data compliance certification. Until Moonshot publishes these, patient data is a no-go for hosted API." },
  { name: "US Government Contractors (EU Subsidiaries)", reason: "US export controls and FAR/DFARS clauses may prohibit use of Chinese-origin models. Procurement compliance will block." },
];
