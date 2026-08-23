import { z } from "zod";

export const FinancialsAssumptionsSchema = z.object({
  // Revenue assumptions
  apiSelfServicePct: z.number(), // % of total
  apiCommittedPct: z.number(),
  kimiCodePct: z.number(),
  kimiBusinessPct: z.number(),
  managedVpcPct: z.number(),
  sovereignPct: z.number(),
  oemPct: z.number(),
  servicesPct: z.number(),
  // Sales capacity
  aeCount2027: z.number(),
  aeRampMonths: z.number(),
  quotaPerAeEUR: z.number(),
  attainmentPct: z.number(),
  winRate: z.number(),
  avgSalesCycleDays: z.number(),
  pipelineCoverage: z.number(),
  avgAcvEUR: z.number(),
  renewalRate: z.number(),
  expansionRate: z.number(),
  partnerContributionPct: z.number(),
  // Cost assumptions (all editable — no gross margin claimed as fact)
  headcountCostEURPerHead: z.number(),
  infrastructurePctOfRevenue: z.number(),
  complianceCostEURPerYear: z.number(),
  securityCostEURPerYear: z.number(),
  evaluationCostEURPerYear: z.number(),
  smPctOfRevenue: z.number(),
  partnerMarginPct: z.number(),
  customerSupportPctOfRevenue: z.number(),
  professionalServicesCostPct: z.number(),
});

export type FinancialsAssumptions = z.infer<typeof FinancialsAssumptionsSchema>;

export const DEFAULT_FINANCIALS_ASSUMPTIONS: FinancialsAssumptions = {
  // Revenue mix (base scenario — all editable)
  apiSelfServicePct: 5,
  apiCommittedPct: 30,
  kimiCodePct: 12,
  kimiBusinessPct: 8,
  managedVpcPct: 18,
  sovereignPct: 7,
  oemPct: 12,
  servicesPct: 8,
  // Sales capacity
  aeCount2027: 4,
  aeRampMonths: 6,
  quotaPerAeEUR: 800_000,
  attainmentPct: 75,
  winRate: 25,
  avgSalesCycleDays: 120,
  pipelineCoverage: 4,
  avgAcvEUR: 250_000,
  renewalRate: 90,
  expansionRate: 120,
  partnerContributionPct: 20,
  // Costs — ASSUMPTION category, not facts
  headcountCostEURPerHead: 170_000,
  infrastructurePctOfRevenue: 35,
  complianceCostEURPerYear: 2_000_000,
  securityCostEURPerYear: 1_500_000,
  evaluationCostEURPerYear: 500_000,
  smPctOfRevenue: 25,
  partnerMarginPct: 20,
  customerSupportPctOfRevenue: 8,
  professionalServicesCostPct: 60,
};

export const REVENUE_LINES = [
  { id: "api_self_service", label: "API Self-Service", defaultPct: 5 },
  { id: "api_committed", label: "API Committed Consumption", defaultPct: 30 },
  { id: "kimi_code", label: "Kimi Code (seat)", defaultPct: 12 },
  { id: "kimi_business", label: "Kimi Business (seat)", defaultPct: 8 },
  { id: "managed_vpc", label: "Managed VPC", defaultPct: 18 },
  { id: "sovereign", label: "Sovereign / Private", defaultPct: 7 },
  { id: "oem", label: "OEM / Embedded API", defaultPct: 12 },
  { id: "services", label: "Services & Evaluation", defaultPct: 8 },
];

export const REVENUE_BRIDGE_2027 = {
  note: 'ASSUMPTION: Revenue bridge from 0 to €18M base in 2027. Direct AE-led ARR is c.€2-3M at ramp; remaining €15-16M requires significant PLG/API, partner, and committed consumption contribution.',
  aeDirectARR: { label: 'Direct AE-led (4 AEs at 75% attainment)', value: 2.4, unit: '€M', badge: 'MODEL' as const },
  plgSelfServe: { label: 'PLG / API self-serve developers', value: 4.0, unit: '€M', badge: 'ASSUMPTION' as const, note: 'Requires public EU API endpoint and developer marketing from Day 1' },
  partnerLed: { label: 'Partner / SI-led pipeline', value: 5.0, unit: '€M', badge: 'ASSUMPTION' as const, note: 'Requires signed SI co-sell agreements by Q1 2027' },
  committedConsumption: { label: 'Committed consumption (design partners)', value: 3.6, unit: '€M', badge: 'ASSUMPTION' as const, note: '3 design partners × avg €1.2M committed ARR' },
  enterprisePilotConversions: { label: 'Pilot-to-full conversions (H2 2027)', value: 3.0, unit: '€M', badge: 'ASSUMPTION' as const },
  total: { label: 'Total base 2027 ARR', value: 18.0, unit: '€M', badge: 'MODEL' as const, note: 'Base case requires all four levers operating simultaneously. Conservative scenario (€8M) reflects AE-direct + one partner + minimal PLG only.' },
};

export function calcSalesCapacity(
  assumptions: Pick<
    FinancialsAssumptions,
    | "aeCount2027"
    | "aeRampMonths"
    | "quotaPerAeEUR"
    | "attainmentPct"
    | "winRate"
    | "avgSalesCycleDays"
    | "pipelineCoverage"
    | "avgAcvEUR"
    | "renewalRate"
    | "expansionRate"
    | "partnerContributionPct"
  >
) {
  const effectiveAEs =
    assumptions.aeCount2027 * (1 - assumptions.aeRampMonths / 24);
  const directARR =
    effectiveAEs *
    assumptions.quotaPerAeEUR *
    (assumptions.attainmentPct / 100);
  const partnerARR =
    directARR * (assumptions.partnerContributionPct / 100);
  const totalARR = directARR + partnerARR;
  const pipelineRequired = totalARR * assumptions.pipelineCoverage;
  const leadsRequired = Math.ceil(
    pipelineRequired / assumptions.avgAcvEUR / (assumptions.winRate / 100)
  );
  return {
    effectiveAEs: Math.round(effectiveAEs * 10) / 10,
    directARR,
    partnerARR,
    totalARR,
    pipelineRequired,
    leadsRequired,
  };
}

export function calcTotalCost(
  revenue: number,
  headcount: number,
  assumptions: FinancialsAssumptions
): Record<string, number> {
  const headcountCost = headcount * assumptions.headcountCostEURPerHead;
  const infrastructureCost = revenue * (assumptions.infrastructurePctOfRevenue / 100);
  const smCost = revenue * (assumptions.smPctOfRevenue / 100);
  const supportCost = revenue * (assumptions.customerSupportPctOfRevenue / 100);
  const total =
    headcountCost +
    infrastructureCost +
    assumptions.complianceCostEURPerYear +
    assumptions.securityCostEURPerYear +
    assumptions.evaluationCostEURPerYear +
    smCost +
    supportCost;
  return {
    headcount: headcountCost,
    infrastructure: infrastructureCost,
    compliance: assumptions.complianceCostEURPerYear,
    security: assumptions.securityCostEURPerYear,
    evaluation: assumptions.evaluationCostEURPerYear,
    salesMarketing: smCost,
    customerSupport: supportCost,
    total,
  };
}
