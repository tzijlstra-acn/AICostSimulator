import { z } from "zod";

export const RiskSeveritySchema = z.enum(["low", "medium", "high", "critical"]);
export type RiskSeverity = z.infer<typeof RiskSeveritySchema>;

export const RiskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  defaultSeverity: RiskSeveritySchema,
  likelihood: z.enum(["low", "medium", "high"]),
  mitigation: z.string(),
  mitigationStatus: z.string(),
  owner: z.string(),
  linkedWorkstreams: z.array(z.string()).optional(),
});

export type Risk = z.infer<typeof RiskSchema>;

export const RISKS: Risk[] = [
  {
    id: "r01",
    title: "Geopolitical & trust risk (Chinese-origin model)",
    description:
      "EU enterprise and government buyers perceive China-origin AI as high trust risk due to data sovereignty concerns and geopolitical tensions. This may limit addressable market particularly in government, defense-adjacent, and critical infrastructure sectors.",
    category: "Market",
    defaultSeverity: "critical",
    likelihood: "high",
    mitigation:
      "EU data boundary (all customer data processed in EU). Independent audit. Authorized EU representative. Clear contractual commitments. Do not target prohibited sectors. Position as technology platform, not data service.",
    mitigationStatus: "Architecture planned; not yet implemented",
    owner: "Trust & Legal",
    linkedWorkstreams: ["data_boundary", "international_transfers", "gpai_classification"],
  },
  {
    id: "r02",
    title: "AI Act GPAI systemic-risk classification",
    description:
      "If K3 is classified as a GPAI model with systemic risk (training compute >= 10^25 FLOPs), significantly heavier obligations apply: adversarial testing, incident reporting, cybersecurity measures, EU AI Office reporting.",
    category: "Regulatory",
    defaultSeverity: "high",
    likelihood: "medium",
    mitigation:
      "Obtain qualified legal opinion on K3 compute threshold. Prepare technical documentation regardless. Adopt GPAI Code of Practice. Engage proactively with EU AI Office. If systemic-risk: build compliance program before marketing to EU.",
    mitigationStatus: "Legal opinion in progress",
    owner: "Legal / Policy",
    linkedWorkstreams: ["gpai_classification", "technical_docs", "gpai_code_practice"],
  },
  {
    id: "r03",
    title: "EU data residency & GDPR compliance gap",
    description:
      "Until EU data boundary is implemented, Kimi cannot lawfully process EU personal data for enterprise use. No adequacy decision for China. SCCs require transfer impact assessment. A breach would trigger GDPR enforcement.",
    category: "Regulatory",
    defaultSeverity: "critical",
    likelihood: "high",
    mitigation:
      "Block personal data from EU API until data boundary live. Implement SCCs + TIA immediately. Hire DPO. EU-region infrastructure as Gate A prerequisite. Data boundary is Phase 0 critical path.",
    mitigationStatus: "Phase 0 critical path — not yet live",
    owner: "Legal / DPO / Engineering",
    linkedWorkstreams: ["data_protection", "international_transfers", "data_boundary"],
  },
  {
    id: "r04",
    title: "Competitive displacement by EU-native models",
    description:
      "Mistral (France), and potentially emerging EU models, benefit from EU-origin trust premium, regulatory familiarity, and political support. They may capture strategic accounts where China-origin risk is disqualifying.",
    category: "Competitive",
    defaultSeverity: "high",
    likelihood: "high",
    mitigation:
      "Compete on workload performance (K3 benchmark leadership, K2.7 Code), not cheapest price. Partner with EU-cloud providers. Invest in EU trust architecture faster than competitors expect. Target workloads where long-context (K3 1M) is differentiating.",
    mitigationStatus: "Ongoing competitive strategy",
    owner: "Strategy / Sales",
  },
  {
    id: "r05",
    title: "OpenAI / Google hyperscaler bundling",
    description:
      "Microsoft Copilot (powered by OpenAI) and Google Workspace AI bundle AI directly into productivity suites purchased by 90%+ of EU enterprises. Free or bundled models reduce willingness to pay for a separate AI platform.",
    category: "Competitive",
    defaultSeverity: "high",
    likelihood: "high",
    mitigation:
      "Target workloads where bundled models are insufficient: very-long-context, deep code migration, domain-specific tasks. Build ISV integrations to get into the workflow stack. Position K2.7 Code on price/performance for API-native developers.",
    mitigationStatus: "Ongoing; requires consistent differentiation messaging",
    owner: "Product / Marketing",
  },
  {
    id: "r06",
    title: "Enterprise sales cycle length & deal complexity",
    description:
      "EU enterprise procurement for AI platforms involves legal review, DPA, security questionnaire, IT approval, DPO sign-off, and often pilot before purchase. Cycles of 9–18 months are common. Revenue ramp slower than modelled.",
    category: "Go-to-Market",
    defaultSeverity: "medium",
    likelihood: "high",
    mitigation:
      "Product-led motion (API, Kimi Code) to generate bottom-up demand and compress enterprise cycles. Pre-built procurement pack (DPA, security questionnaire, trust doc). Lighthouse account programme with CEO-level sponsorship.",
    mitigationStatus: "Procurement pack in planning",
    owner: "Sales / Legal",
  },
  {
    id: "r07",
    title: "K3 license restrictions for commercial EU use",
    description:
      "Open-weight model licenses may restrict commercial use cases, revenue thresholds, OEM embedding, or private deployment. If K3 Community License does not permit EU commercial use, a separate commercial agreement is needed.",
    category: "Legal / Commercial",
    defaultSeverity: "high",
    likelihood: "medium",
    mitigation:
      "Obtain legal opinion on K3 Community License before any commercial deployment. Negotiate commercial license terms if required. Do not offer OEM or sovereign deployment until license terms confirmed.",
    mitigationStatus: "Review in progress",
    owner: "Legal",
    linkedWorkstreams: ["licensing"],
  },
  {
    id: "r08",
    title: "EU hosting capacity & latency constraints",
    description:
      "Serving K3 (large MoE model) in EU requires significant GPU infrastructure. EU GPU capacity is constrained. High latency from EU endpoints may disadvantage Kimi vs. US-hosted competitors. Cost of EU inference may exceed Asia-Pacific cost.",
    category: "Technical / Infrastructure",
    defaultSeverity: "high",
    likelihood: "medium",
    mitigation:
      "Partner with EU cloud providers or AI Gigafactory programme. Consider K3 distillation for lower-compute EU endpoint. K2.7 Code as efficient workhorse for EU cost-sensitive workloads. Transparent latency SLAs.",
    mitigationStatus: "Phase 0 critical path",
    owner: "Infrastructure Engineering",
    linkedWorkstreams: ["data_boundary"],
  },
  {
    id: "r09",
    title: "Talent acquisition for EU trust & compliance team",
    description:
      "Recruiting qualified EU AI law specialists, a DPO, enterprise security engineers, and senior AEs with AI platform experience in Europe is competitive and slow. Under-staffing delays Gate A/B milestones.",
    category: "Organization",
    defaultSeverity: "medium",
    likelihood: "medium",
    mitigation:
      "Engage specialist legal counsel immediately (external). Target VP Trust & Safety hire as first non-commercial employee. Partner with EU law firms for rapid GPAI advisory. Consider EU-based interim DPO service initially.",
    mitigationStatus: "Recruitment not yet started",
    owner: "People / Executive",
  },
  {
    id: "r10",
    title: "Evaluation benchmark credibility gap",
    description:
      "K3 benchmarks are published by Moonshot AI. EU enterprise and regulated-industry buyers increasingly require third-party or customer-specific evaluation before deployment. Self-reported benchmarks are insufficient for trust.",
    category: "Trust",
    defaultSeverity: "medium",
    likelihood: "high",
    mitigation:
      "Launch third-party evaluation programme with independent EU-based evaluators. Publish customer-specific benchmark results. Partner with academic institutions. Gate C requires evaluation programme to be active.",
    mitigationStatus: "Planned — not started",
    owner: "Safety / Sales",
    linkedWorkstreams: ["evaluation_program"],
  },
  {
    id: "r11",
    title: "Revenue concentration in UK / Germany",
    description:
      "Base case assumes UK + Germany contribute 60%+ of 2027–2028 revenue. Macroeconomic slowdown, regulatory setback, or competitive displacement in either market would materially impact overall revenue trajectory.",
    category: "Financial",
    defaultSeverity: "medium",
    likelihood: "medium",
    mitigation:
      "Diversify country entry to Netherlands, France, Switzerland as secondary markets in 2027H2. Build partner-contributed pipeline in adjacent markets. Maintain conservative headcount ramp tied to ARR milestones.",
    mitigationStatus: "Modelled in scenario planning",
    owner: "Finance / Sales",
  },
  {
    id: "r12",
    title: "EU AI Act high-risk use case mis-positioning",
    description:
      "Marketing or deploying Kimi into high-risk AI applications without appropriate governance (HR decisions, credit, healthcare) creates legal liability and reputational risk. Buyers may mis-apply the technology.",
    category: "Regulatory / Reputational",
    defaultSeverity: "high",
    likelihood: "medium",
    mitigation:
      "Explicit Acceptable Use Policy excluding prohibited use cases. Customer contracts include use-case restrictions. Sales training on AI Act high-risk classification. Product guardrails for highest-risk categories.",
    mitigationStatus: "AUP draft in progress",
    owner: "Legal / Product",
    linkedWorkstreams: ["gpai_classification", "human_oversight"],
  },
];

export const SEVERITY_COLORS: Record<RiskSeverity, string> = {
  low: "#10b981",
  medium: "#f59e0b",
  high: "#ef4444",
  critical: "#ef4444",
};

export const SEVERITY_BG: Record<RiskSeverity, string> = {
  low: "rgba(16,185,129,0.15)",
  medium: "rgba(245,158,11,0.15)",
  high: "rgba(239,68,68,0.15)",
  critical: "rgba(239,68,68,0.25)",
};
