import { z } from "zod";

export const COMPETITOR_DIMENSIONS = [
  "frontier_quality",
  "agentic_coding",
  "long_context",
  "task_economics",
  "open_deployment",
  "eu_hosting",
  "enterprise_controls",
  "distribution",
  "trust_compliance",
  "eu_partnerability",
] as const;

export type CompetitorDimension = (typeof COMPETITOR_DIMENSIONS)[number];

export const DIMENSION_LABELS: Record<CompetitorDimension, string> = {
  frontier_quality: "Frontier Quality",
  agentic_coding: "Agentic / Coding",
  long_context: "Long Context",
  task_economics: "Task Economics",
  open_deployment: "Open Deployment",
  eu_hosting: "EU Hosting",
  enterprise_controls: "Enterprise Controls",
  distribution: "Distribution",
  trust_compliance: "Trust & Compliance",
  eu_partnerability: "EU Partnerability",
};

export const CompetitorSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string(),
  color: z.string(),
  scores: z.record(z.string(), z.number()),
  isKimi: z.boolean().default(false).optional(),
  isKimiTarget: z.boolean().default(false).optional(),
  notes: z.string().optional(),
});

export type Competitor = z.infer<typeof CompetitorSchema>;

function buildScores(vals: number[]): Record<string, number> {
  return Object.fromEntries(
    COMPETITOR_DIMENSIONS.map((dim, i) => [dim, vals[i]])
  );
}

export const COMPETITORS: Competitor[] = [
  {
    id: "kimi_now",
    name: "Kimi (current)",
    shortName: "Kimi Now",
    color: "#00d4ff",
    isKimi: true,
    scores: buildScores([4.2, 4.7, 5.0, 3.6, 5.0, 1.5, 2.4, 2.8, 2.0, 2.0]),
    notes:
      "Current state. EU hosting not yet live. Enterprise controls and trust compliance to be built out.",
  },
  {
    id: "kimi_target",
    name: "Kimi (target — 2027)",
    shortName: "Kimi Target",
    color: "#a855f7",
    isKimi: true,
    isKimiTarget: true,
    scores: buildScores([4.6, 4.9, 5.0, 4.2, 5.0, 5.0, 4.6, 4.0, 4.5, 4.0]),
    notes:
      "Target state by end-2027. Assumes EU hosting, enterprise SSO/RBAC, DPA templates, and GPAI compliance workstreams complete.",
  },
  {
    id: "openai",
    name: "OpenAI / GPT",
    shortName: "OpenAI",
    color: "#10b981",
    scores: buildScores([5.0, 4.8, 4.5, 3.4, 2.0, 4.5, 5.0, 5.0, 4.7, 4.0]),
    notes: "Dominant distribution. Strong enterprise. EU Azure hosting. Weaker open deployment.",
  },
  {
    id: "anthropic",
    name: "Anthropic / Claude",
    shortName: "Anthropic",
    color: "#f59e0b",
    scores: buildScores([5.0, 5.0, 4.5, 3.2, 1.5, 4.3, 4.8, 4.6, 5.0, 4.2]),
    notes: "Best-in-class safety and trust. Agentic coding leader. Premium pricing. Via AWS EU regions.",
  },
  {
    id: "google",
    name: "Google / Gemini",
    shortName: "Google",
    color: "#3b82f6",
    scores: buildScores([4.6, 4.2, 4.6, 4.3, 2.0, 4.7, 5.0, 5.0, 4.8, 4.5]),
    notes: "Strong EU cloud footprint (GCP). Highly competitive pricing via Flash. Best multimodal.",
  },
  {
    id: "mistral",
    name: "Mistral AI",
    shortName: "Mistral",
    color: "#ef4444",
    scores: buildScores([4.0, 4.1, 4.0, 5.0, 5.0, 5.0, 4.5, 3.8, 4.8, 5.0]),
    notes: "French company. EU-native. Best EU hosting story. Open weights. Price leader. Home turf advantage in France.",
  },
  {
    id: "qwen",
    name: "Alibaba / Qwen",
    shortName: "Qwen",
    color: "#06b6d4",
    scores: buildScores([4.2, 4.3, 5.0, 4.7, 5.0, 3.7, 3.2, 4.0, 3.1, 2.8]),
    notes: "Strong long-context. Open-weight variants. China data concern. Limited EU go-to-market.",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    shortName: "DeepSeek",
    color: "#8b5cf6",
    scores: buildScores([4.1, 4.3, 4.2, 5.0, 5.0, 2.5, 2.5, 3.8, 2.5, 2.5]),
    notes: "Price leader on open weights. China-origin trust concern. Limited EU infrastructure or enterprise controls.",
  },
];

export const getCompetitor = (id: string): Competitor | undefined =>
  COMPETITORS.find((c) => c.id === id);

export const DEFAULT_SELECTED_COMPETITORS = [
  "kimi_now",
  "kimi_target",
  "anthropic",
  "mistral",
];
