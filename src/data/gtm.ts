import { z } from "zod";

export const GTM_MOTIONS = [
  {
    id: "plg",
    name: "Product-Led Growth (PLG)",
    description:
      "Self-service API + Kimi Code freemium/trial. Developers discover, try, and expand without sales involvement. Primary motion for UK developer community and EU startup ecosystem.",
    priority: "primary",
    phase: "Phase 1",
    targetSegment: "Developers, startups, researchers",
    channels: ["API self-service", "Developer portal", "GitHub integrations", "Hackathons"],
    kpis: ["Monthly active API users", "Trial-to-paid conversion rate", "Time-to-first-API-call"],
  },
  {
    id: "enterprise_sales",
    name: "Direct Enterprise Sales",
    description:
      "Senior AE-led strategic accounts. 8–12 lighthouse accounts in UK + Germany (2027 H1). Target: 3+ enterprise accounts per AE per year.",
    priority: "primary",
    phase: "Phase 1",
    targetSegment: "Enterprise (1000+ employees), regulated industries",
    channels: ["Direct AE outreach", "Executive dinners", "Lighthouse programme"],
    kpis: ["Enterprise ARR", "Average ACV", "Win rate vs. OpenAI/Anthropic", "Sales cycle days"],
  },
  {
    id: "paid_pilots",
    name: "Paid Proof-of-Value Pilots",
    description:
      "6–8 week structured pilots with defined success criteria. €20–50K pilot fee. Converts to platform subscription on success. Reduces procurement cycle risk.",
    priority: "primary",
    phase: "Phase 1",
    targetSegment: "Mid-market and enterprise buyers with procurement complexity",
    channels: ["AE-led", "Partner-delivered", "Consulting-backed"],
    kpis: ["Pilot conversion rate", "Average pilot-to-contract value", "Pilot NPS"],
  },
  {
    id: "oem_embed",
    name: "OEM / ISV Embedding",
    description:
      "Embed Kimi models into ISV products. Revenue share or wholesale token pricing. Multiplies distribution without direct sales cost.",
    priority: "secondary",
    phase: "Phase 2",
    targetSegment: "SaaS ISVs, productivity tool vendors, vertical software companies",
    channels: ["Partner portal", "Tech partnership team", "Marketplace listings"],
    kpis: ["Active ISV integrations", "OEM-contributed revenue", "Partner ecosystem NPS"],
  },
  {
    id: "cloud_marketplace",
    name: "Cloud Marketplace (AWS/Azure/GCP)",
    description:
      "List Kimi on AWS Marketplace, Azure Marketplace, and Google Cloud Marketplace for EU regions. Enables enterprise procurement via existing cloud spend commitments.",
    priority: "secondary",
    phase: "Phase 2",
    targetSegment: "Enterprise cloud customers with spend commitments",
    channels: ["AWS Marketplace EU", "Azure Marketplace", "GCP Marketplace"],
    kpis: ["Marketplace-sourced ARR", "Listing click-through rate", "Committed draw-down rate"],
  },
  {
    id: "telecom",
    name: "Telecom & MNO Partnership",
    description:
      "Partner with major European telcos (BT, Deutsche Telekom, Orange, Vodafone, Telefónica) to embed Kimi as enterprise AI offering.",
    priority: "secondary",
    phase: "Phase 2",
    targetSegment: "Telco enterprise customers",
    channels: ["Telco B2B sales teams", "Bundled enterprise offers"],
    kpis: ["Telco-contributed ARR", "Active telco partnerships", "Customer reach via telco"],
  },
  {
    id: "si_partnerships",
    name: "Systems Integrator (SI) Programme",
    description:
      "Partner with major SIs (Accenture, Capgemini, Deloitte, KPMG, PwC, Infosys) to deliver Kimi-powered solutions. SI handles implementation, Kimi gets platform revenue.",
    priority: "secondary",
    phase: "Phase 2",
    targetSegment: "Large enterprise buying via SI relationships",
    channels: ["SI partnership programme", "Joint GTM", "Co-sell"],
    kpis: ["SI-influenced ARR", "Active certified SI partners", "SI-delivered pilots"],
  },
  {
    id: "research_academic",
    name: "Research & Academic Programme",
    description:
      "Subsidised or free API credits for EU universities and research institutions. Builds goodwill, generates publications, and seeds future commercial talent.",
    priority: "supporting",
    phase: "Phase 1",
    targetSegment: "EU universities, research institutes, think tanks",
    channels: ["Academic portal", "Research grant programme", "Conference sponsorships"],
    kpis: ["Active research institutions", "Publications citing Kimi", "Student-to-commercial conversion"],
  },
  {
    id: "open_source",
    name: "Open-Source & Developer Community",
    description:
      "K3 open-weight availability drives community adoption, benchmarking, and ecosystem integrations. Support EU developer communities and open-source projects.",
    priority: "supporting",
    phase: "Phase 1",
    targetSegment: "Open-source developers, AI/ML practitioners",
    channels: ["GitHub", "Hugging Face", "Discord", "Developer newsletters"],
    kpis: ["GitHub stars/forks", "Community model downloads", "Developer forum activity"],
  },
  {
    id: "kimi_academy",
    name: "Kimi Academy",
    description:
      "Training and certification programme for EU enterprise teams. Builds AI literacy, increases product adoption, and creates partner certification pathway.",
    priority: "supporting",
    phase: "Phase 2",
    targetSegment: "Enterprise learners, SI consultants, developer community",
    channels: ["Online learning platform", "Certification exams", "Partner training"],
    kpis: ["Certified practitioners", "Completion rate", "Certification-to-adoption correlation"],
  },
];

export const PILOT_DEFAULTS = {
  duration: "6–8 weeks",
  weeklyMethodology: [
    { week: 1, activity: "Baseline measurement & stakeholder alignment" },
    { week: 2, activity: "Environment setup & integration, initial prompting" },
    { week: 3, activity: "Pilot workload processing — first results" },
    { week: 4, activity: "Iteration on prompts, workflows, and human oversight" },
    { week: 5, activity: "Scale workload volume, secondary use cases" },
    { week: 6, activity: "Evaluation against success KPIs, cost analysis" },
    { week: 7, activity: "Stakeholder review, business case refinement" },
    { week: 8, activity: "Production decision, contract negotiation" },
  ],
};

export interface PilotSpec {
  customer: string;
  country: string;
  industry: string;
  workflow: string;
  currentBaseline: string;
  kimiModel: string;
  comparator: string;
  dataSensitivity: "public" | "internal" | "confidential" | "restricted";
  deployment: "cloud" | "private_vpc" | "on_premise";
  durationWeeks: number;
  humanReviewers: string;
  successKPIs: string[];
  budget: number;
  productionDecisionDate: string;
}

export const EMPTY_PILOT: PilotSpec = {
  customer: "",
  country: "",
  industry: "",
  workflow: "",
  currentBaseline: "",
  kimiModel: "K3",
  comparator: "",
  dataSensitivity: "internal",
  deployment: "cloud",
  durationWeeks: 8,
  humanReviewers: "",
  successKPIs: [],
  budget: 25000,
  productionDecisionDate: "",
};
