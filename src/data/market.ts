import { z } from "zod";

export const SpendPoolSchema = z.object({
  id: z.string(),
  name: z.string(),
  tam2026Base: z.number(),
  tam2030Base: z.number(),
  tam2026Low: z.number(),
  tam2026High: z.number(),
  tam2030Low: z.number(),
  tam2030High: z.number(),
  sourceIds: z.array(z.string()),
  notes: z.string().optional(),
});

export type SpendPool = z.infer<typeof SpendPoolSchema>;

export const SPEND_POOLS: SpendPool[] = [
  {
    id: "workspace",
    name: "Workspace & coding seats",
    tam2026Base: 1.56,
    tam2030Base: 7.29,
    tam2026Low: 1.32,
    tam2026High: 1.85,
    tam2030Low: 5.80,
    tam2030High: 9.20,
    sourceIds: ["S6", "S15"],
    notes: "Seat-based productivity tools, coding assistants, copilots",
  },
  {
    id: "api_inference",
    name: "API & agent inference",
    tam2026Base: 3.83,
    tam2030Base: 12.00,
    tam2026Low: 3.20,
    tam2026High: 4.60,
    tam2030Low: 9.50,
    tam2030High: 15.50,
    sourceIds: ["S6"],
    notes: "Token consumption via API and agentic pipelines",
  },
  {
    id: "private_sovereign",
    name: "Private & sovereign",
    tam2026Base: 1.35,
    tam2030Base: 4.50,
    tam2026Low: 1.10,
    tam2026High: 1.65,
    tam2030Low: 3.20,
    tam2030High: 6.20,
    sourceIds: ["S13"],
    notes: "On-premise, VPC, and sovereign AI deployments",
  },
  {
    id: "oem_embedded",
    name: "OEM & embedded",
    tam2026Base: 1.10,
    tam2030Base: 3.60,
    tam2026Low: 0.85,
    tam2026High: 1.40,
    tam2030Low: 2.70,
    tam2030High: 4.80,
    sourceIds: ["S6"],
    notes: "Embedded AI in software products and devices",
  },
  {
    id: "services_customization",
    name: "Services & customization",
    tam2026Base: 1.10,
    tam2030Base: 4.11,
    tam2026Low: 0.90,
    tam2026High: 1.35,
    tam2030Low: 3.00,
    tam2030High: 5.50,
    sourceIds: ["S6"],
    notes: "Professional services, fine-tuning, evaluation, and integration",
  },
];

export const TAM_2026_BASE = SPEND_POOLS.reduce(
  (sum, p) => sum + p.tam2026Base,
  0
); // 8.94B
export const TAM_2030_BASE = SPEND_POOLS.reduce(
  (sum, p) => sum + p.tam2030Base,
  0
); // 31.50B

// SAM calculation: TAM × target_country_pct × product_fit_pct × procurement_reach_pct
export const SAM_DEFAULTS = {
  targetCountryPct: 0.78,
  productFitPct: 0.72,
  procurementReachPct: 0.75,
};

export function calcSAM(
  tam: number,
  overrides?: Partial<typeof SAM_DEFAULTS>
): number {
  const params = { ...SAM_DEFAULTS, ...overrides };
  return (
    tam *
    params.targetCountryPct *
    params.productFitPct *
    params.procurementReachPct
  );
}
// 31.50 × 0.78 × 0.72 × 0.75 = 13.27B

export const REVENUE_SCENARIOS = {
  conservative: {
    label: "Conservative",
    revenue2030: 250,
    samShare: 1.9,
    path: { 2027: 8, 2028: 40, 2029: 110, 2030: 250 },
    composition: {
      api_committed: 30,
      kimi_code: 18,
      private_sovereign: 22,
      oem_channel: 15,
      services: 15,
    },
  },
  base: {
    label: "Base",
    revenue2030: 550,
    samShare: 4.1,
    path: { 2027: 18, 2028: 75, 2029: 220, 2030: 550 },
    composition: {
      api_committed: 35,
      kimi_code: 20,
      private_sovereign: 25,
      oem_channel: 12,
      services: 8,
    },
  },
  upside: {
    label: "Upside",
    revenue2030: 950,
    samShare: 7.2,
    path: { 2027: 32, 2028: 130, 2029: 390, 2030: 950 },
    composition: {
      api_committed: 38,
      kimi_code: 22,
      private_sovereign: 20,
      oem_channel: 12,
      services: 8,
    },
  },
} as const;

export type ScenarioKey = keyof typeof REVENUE_SCENARIOS;

export const REVENUE_COMPOSITION_LABELS: Record<string, string> = {
  api_committed: "API & committed consumption",
  kimi_code: "Kimi Business & Code",
  private_sovereign: "Private & sovereign",
  oem_channel: "OEM & channel",
  services: "Services & evaluation",
};
