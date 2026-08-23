import { z } from "zod";

export const ModelPricingSchema = z.object({
  id: z.string(),
  name: z.string(),
  provider: z.string(),
  cachedInputPer1M: z.number().optional(),
  inputPer1M: z.number(),
  outputPer1M: z.number(),
  contextWindow: z.string().optional(),
  sourceId: z.string(),
  lastVerified: z.string(),
  priceWarning: z.string().optional(),
  notes: z.string().optional(),
});

export type ModelPricing = z.infer<typeof ModelPricingSchema>;

export const MODEL_PRICING: ModelPricing[] = [
  {
    id: "k3",
    name: "K3",
    provider: "Moonshot AI / Kimi",
    cachedInputPer1M: 0.30,
    inputPer1M: 3.00,
    outputPer1M: 15.00,
    contextWindow: "1M",
    sourceId: "S3",
    lastVerified: "2026-08-22",
    priceWarning: "API prices change frequently. Always verify on platform.kimi.ai before quoting.",
    notes: "Frontier reasoning model. 1M token context.",
  },
  {
    id: "k27_code",
    name: "K2.7 Code",
    provider: "Moonshot AI / Kimi",
    cachedInputPer1M: 0.19,
    inputPer1M: 0.95,
    outputPer1M: 4.00,
    contextWindow: "256K",
    sourceId: "S3",
    lastVerified: "2026-08-22",
    priceWarning: "API prices change frequently. Always verify on platform.kimi.ai before quoting.",
    notes: "Optimised for coding tasks. Strong price/performance ratio.",
  },
  {
    id: "k26",
    name: "K2.6",
    provider: "Moonshot AI / Kimi",
    cachedInputPer1M: 0.16,
    inputPer1M: 0.95,
    outputPer1M: 4.00,
    contextWindow: "256K",
    sourceId: "S3",
    lastVerified: "2026-08-22",
    priceWarning: "API prices change frequently. Always verify on platform.kimi.ai before quoting.",
    notes: "General-purpose model. Competitive mid-tier pricing.",
  },
  {
    id: "claude_sonnet5",
    name: "Claude Sonnet 5",
    provider: "Anthropic",
    cachedInputPer1M: 0.20,
    inputPer1M: 2.00,
    outputPer1M: 10.00,
    sourceId: "S16",
    lastVerified: "2026-08-22",
    priceWarning: "Anthropic prices subject to change. Verify on platform.claude.com.",
  },
  {
    id: "gpt56_sonnet",
    name: "GPT-5.6",
    provider: "OpenAI",
    cachedInputPer1M: 0.40,
    inputPer1M: 4.00,
    outputPer1M: 20.00,
    sourceId: "S17",
    lastVerified: "2026-08-22",
    priceWarning: "OpenAI prices subject to change. Verify on platform.openai.com.",
  },
  {
    id: "gemini35_flash",
    name: "Gemini 3.5 Flash",
    provider: "Google",
    cachedInputPer1M: 0.15,
    inputPer1M: 1.50,
    outputPer1M: 9.00,
    sourceId: "S18",
    lastVerified: "2026-08-22",
    priceWarning: "Google prices subject to change. Verify on ai.google.dev.",
  },
  {
    id: "mistral_large",
    name: "Mistral Large",
    provider: "Mistral AI",
    inputPer1M: 0.50,
    outputPer1M: 1.50,
    sourceId: "S19",
    lastVerified: "2026-08-22",
    priceWarning: "Mistral prices subject to change. Verify on mistral.ai.",
    notes: "EU-hosted. Strongest EU data residency story.",
  },
  {
    id: "qwen37_max",
    name: "Qwen3.7 Max",
    provider: "Alibaba / Qwen",
    inputPer1M: 1.65,
    outputPer1M: 4.95,
    contextWindow: "1M",
    sourceId: "S20",
    lastVerified: "2026-08-22",
    priceWarning: "Alibaba Cloud prices subject to change. Verify on alibabacloud.com.",
    notes: "China-origin data concern for EU enterprise.",
  },
];

export const getModelPricing = (id: string): ModelPricing | undefined =>
  MODEL_PRICING.find((m) => m.id === id);

// Task cost calculator types
export interface TaskCostInputs {
  modelId: string;
  inputTokens: number;
  outputTokens: number;
  cachedPct: number; // 0-100
  requestsPerDay: number;
  retryRate: number; // 0-100 %
  successRate: number; // 0-100 %
  contractDiscount: number; // 0-100 %
}

export interface TaskCostResult {
  costPerRequest: number;
  costPerCompletedTask: number;
  dailyCost: number;
  monthlyCost: number;
  annualCost: number;
  savingsFromCaching: number;
  effectiveInputRate: number;
  effectiveOutputRate: number;
}

export function calcTaskCost(
  inputs: TaskCostInputs
): TaskCostResult | null {
  const model = getModelPricing(inputs.modelId);
  if (!model) return null;

  const discount = 1 - inputs.contractDiscount / 100;
  const cachedFraction = inputs.cachedPct / 100;
  const retryMultiplier = 1 + inputs.retryRate / 100;

  const inputRate =
    (model.cachedInputPer1M !== undefined
      ? cachedFraction * model.cachedInputPer1M +
        (1 - cachedFraction) * model.inputPer1M
      : model.inputPer1M) * discount;

  const outputRate = model.outputPer1M * discount;

  const costPerRequest =
    (inputRate * inputs.inputTokens + outputRate * inputs.outputTokens) / 1_000_000;

  const effectiveCostPerRequest = costPerRequest * retryMultiplier;

  const costPerCompletedTask =
    inputs.successRate > 0
      ? effectiveCostPerRequest / (inputs.successRate / 100)
      : effectiveCostPerRequest;

  const dailyCost = inputs.requestsPerDay * effectiveCostPerRequest;

  const noCacheCostPerRequest =
    (model.inputPer1M * inputs.inputTokens +
      model.outputPer1M * inputs.outputTokens) /
    1_000_000;
  const savingsFromCaching =
    (noCacheCostPerRequest - costPerRequest) *
    inputs.requestsPerDay *
    30;

  return {
    costPerRequest: effectiveCostPerRequest,
    costPerCompletedTask,
    dailyCost,
    monthlyCost: dailyCost * 30,
    annualCost: dailyCost * 365,
    savingsFromCaching: Math.max(0, savingsFromCaching),
    effectiveInputRate: inputRate,
    effectiveOutputRate: outputRate,
  };
}
