import { z } from "zod";

export const HEADCOUNT_PLAN = {
  h1_2027: { low: 35, high: 45, label: "H1 2027" },
  end_2028: { low: 90, high: 110, label: "End 2028" },
  end_2029: { low: 160, high: 200, label: "End 2029" },
};

export const FUNCTIONAL_SPLIT = {
  trust_legal_compliance: { pct: 25, label: "Trust, Legal & Compliance" },
  engineering_infrastructure: { pct: 25, label: "Engineering & Infrastructure" },
  sales_cs: { pct: 30, label: "Sales & Customer Success" },
  devrel_marketing: { pct: 10, label: "DevRel & Marketing" },
  leadership_ops: { pct: 10, label: "Leadership & Operations" },
};

export const ROLES = [
  {
    id: "vp_trust",
    title: "VP Trust & Safety",
    function: "trust_legal_compliance",
    priority: "critical",
    hiringPhase: "Phase 0",
    rationale: "Needed before any EU engagement. Owns all Gate A deliverables.",
    reportingTo: "CEO",
    locationRequirement: "EU-based",
  },
  {
    id: "eu_legal_counsel",
    title: "EU Legal Counsel (AI / Data Protection)",
    function: "trust_legal_compliance",
    priority: "critical",
    hiringPhase: "Phase 0",
    rationale: "GPAI classification, GDPR, DPA templates. Can be external firm initially.",
    reportingTo: "VP Trust",
    locationRequirement: "EU-based",
  },
  {
    id: "dpo",
    title: "Data Protection Officer (DPO)",
    function: "trust_legal_compliance",
    priority: "critical",
    hiringPhase: "Phase 0",
    rationale: "GDPR Art. 37 requirement. Can be interim DPO service initially.",
    reportingTo: "VP Trust",
    locationRequirement: "EU-based",
  },
  {
    id: "infra_lead",
    title: "EU Infrastructure Lead",
    function: "engineering_infrastructure",
    priority: "critical",
    hiringPhase: "Phase 0",
    rationale: "Owns EU data centre setup and data boundary implementation.",
    reportingTo: "CTO (HQ)",
    locationRequirement: "EU-based",
  },
  {
    id: "ae_uk_1",
    title: "Account Executive — UK (Enterprise)",
    function: "sales_cs",
    priority: "high",
    hiringPhase: "Phase 1",
    rationale: "First enterprise revenue in UK. Target: 3 lighthouse accounts.",
    reportingTo: "VP Sales EMEA",
    locationRequirement: "UK (London preferred)",
  },
  {
    id: "ae_de_1",
    title: "Account Executive — Germany (Enterprise)",
    function: "sales_cs",
    priority: "high",
    hiringPhase: "Phase 1",
    rationale: "First enterprise revenue in Germany. Target: 2–3 lighthouse accounts.",
    reportingTo: "VP Sales EMEA",
    locationRequirement: "Germany (Berlin/Munich)",
  },
  {
    id: "vp_sales",
    title: "VP Sales EMEA",
    function: "sales_cs",
    priority: "critical",
    hiringPhase: "Phase 1",
    rationale: "Owns all EU revenue. Manages AEs and partner sales.",
    reportingTo: "CEO / CRO (HQ)",
    locationRequirement: "UK or Netherlands",
  },
  {
    id: "devrel_lead",
    title: "Developer Relations Lead — EU",
    function: "devrel_marketing",
    priority: "high",
    hiringPhase: "Phase 1",
    rationale: "PLG motion. Developer community, hackathons, open-source advocacy.",
    reportingTo: "VP Marketing (HQ)",
    locationRequirement: "EU-based (flexible)",
  },
  {
    id: "security_engineer",
    title: "Security Engineer (EU)",
    function: "trust_legal_compliance",
    priority: "high",
    hiringPhase: "Phase 1",
    rationale: "NIS2 compliance, security questionnaire responses, pen testing.",
    reportingTo: "VP Trust",
    locationRequirement: "EU-based",
  },
  {
    id: "cs_lead",
    title: "Customer Success Lead",
    function: "sales_cs",
    priority: "medium",
    hiringPhase: "Phase 1",
    rationale: "Manage lighthouse accounts, drive expansion, pilot success.",
    reportingTo: "VP Sales",
    locationRequirement: "UK or Germany",
  },
];

export const SKILL_GAP_HEATMAP = [
  { skill: "EU AI Law expertise", current: 1, target: 5, gap: 4, priority: "critical" },
  { skill: "GDPR / Data Protection", current: 2, target: 5, gap: 3, priority: "critical" },
  { skill: "EU Enterprise Sales", current: 1, target: 4, gap: 3, priority: "critical" },
  { skill: "EU Infrastructure engineering", current: 2, target: 5, gap: 3, priority: "critical" },
  { skill: "AI Safety evaluation", current: 3, target: 5, gap: 2, priority: "high" },
  { skill: "Enterprise procurement navigation", current: 1, target: 4, gap: 3, priority: "high" },
  { skill: "Developer relations (EU)", current: 2, target: 4, gap: 2, priority: "high" },
  { skill: "Partner ecosystem management", current: 1, target: 4, gap: 3, priority: "high" },
  { skill: "EU government/public sector relationships", current: 1, target: 3, gap: 2, priority: "medium" },
  { skill: "Multilingual customer success (DE/FR)", current: 1, target: 3, gap: 2, priority: "medium" },
];

export const TEAM_COST_ASSUMPTIONS = {
  avgSalaryEUR: {
    trust_legal_compliance: 150_000,
    engineering_infrastructure: 140_000,
    sales_cs: 130_000,
    devrel_marketing: 120_000,
    leadership_ops: 200_000,
  },
  onCostMultiplier: 1.35, // includes employer contributions, benefits
  officeCostPerHeadPerYear: 8_000,
  travelAndExpensePerHeadPerYear: 5_000,
};
