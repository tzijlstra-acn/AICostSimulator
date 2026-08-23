"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAppStore } from "@/store";
import { OFFERS, MODEL_ROUTING } from "@/data/offers";
import { MODEL_PRICING, calcTaskCost } from "@/data/pricing";
import { REVENUE_SCENARIOS, REVENUE_COMPOSITION_LABELS } from "@/data/market";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function PortfolioPage() {
  const { activeScenario } = useAppStore();
  const scenario = REVENUE_SCENARIOS[activeScenario];
  const t = useTranslations("portfolio");

  const [calc, setCalc] = useState({
    modelId: "k3",
    inputTokens: 10000,
    outputTokens: 2000,
    cachedPct: 30,
    requestsPerDay: 1000,
    retryRate: 5,
    successRate: 95,
    contractDiscount: 0,
  });

  const result = calcTaskCost(calc);

  const tierColors: Record<string, string> = {
    developer: "#7a90b0",
    business: "var(--lunar-cyan)",
    enterprise: "var(--lunar-violet)",
    sovereign: "var(--lunar-amber)",
  };

  // Composition chart
  const compColors = ["#00d4ff", "#a855f7", "#10b981", "#f59e0b", "#ef4444"];
  const compLabels = Object.entries(scenario.composition).map(([k]) => REVENUE_COMPOSITION_LABELS[k] || k);
  const compValues = Object.values(scenario.composition);
  const donutOption = {
    backgroundColor: "transparent",
    tooltip: { trigger: "item", backgroundColor: "var(--lunar-panel)", borderColor: "var(--lunar-border-strong)", textStyle: { color: "var(--lunar-text-primary)" }, formatter: "{b}: {d}%" },
    series: [{
      type: "pie",
      radius: ["45%", "75%"],
      data: compLabels.map((label, i) => ({ name: label, value: compValues[i], itemStyle: { color: compColors[i] } })),
      label: { color: "var(--lunar-text-secondary)", fontSize: 10 },
    }],
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
          {t("title")}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
          {t("subtitle")}
        </p>
      </div>

      {/* Offer Ladder */}
      <div className="lunar-card">
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--lunar-text-primary)" }}>
          Commercial Offer Ladder
          <EvidenceBadge type="ASSUMPTION" className="ml-2" reasoning="Illustrative price ranges — subject to market validation" />
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label="Commercial offer ladder">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                <th className="text-left py-2 pr-4 font-medium text-xs" style={{ color: "var(--lunar-text-muted)" }}>Offer</th>
                <th className="text-left py-2 px-3 font-medium text-xs" style={{ color: "var(--lunar-text-muted)" }}>Tier</th>
                <th className="text-left py-2 px-3 font-medium text-xs" style={{ color: "var(--lunar-text-muted)" }}>Buyer</th>
                <th className="text-left py-2 px-3 font-medium text-xs" style={{ color: "var(--lunar-text-muted)" }}>Revenue Model</th>
                <th className="text-right py-2 px-3 font-medium text-xs" style={{ color: "var(--lunar-text-muted)" }}>Price Range</th>
                <th className="text-left py-2 px-3 font-medium text-xs" style={{ color: "var(--lunar-text-muted)" }}>Launch</th>
                <th className="text-left py-2 px-3 font-medium text-xs" style={{ color: "var(--lunar-text-muted)" }}>Gate</th>
              </tr>
            </thead>
            <tbody>
              {OFFERS.map((offer) => (
                <tr
                  key={offer.id}
                  style={{ borderBottom: "1px solid var(--lunar-border-subtle)" }}
                  className="hover:bg-white/3 transition-colors"
                >
                  <td className="py-2 pr-4">
                    <div className="font-medium" style={{ color: "var(--lunar-text-primary)" }}>{offer.name}</div>
                    <div className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>{offer.description.slice(0, 60)}...</div>
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full capitalize"
                      style={{ background: `${tierColors[offer.tier]}20`, color: tierColors[offer.tier] }}
                    >
                      {offer.tier}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-xs" style={{ color: "var(--lunar-text-secondary)" }}>{offer.buyer}</td>
                  <td className="py-2 px-3 text-xs" style={{ color: "var(--lunar-text-secondary)" }}>{offer.revenueModel}</td>
                  <td className="py-2 px-3 text-right font-mono text-xs" style={{ color: "var(--lunar-cyan)" }}>{offer.priceRange}</td>
                  <td className="py-2 px-3 text-xs" style={{ color: "var(--lunar-text-secondary)" }}>{offer.launchDate}</td>
                  <td className="py-2 px-3 text-xs" style={{ color: "var(--lunar-amber)" }}>{offer.gateRequired || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Composition */}
        <div className="lunar-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
              Revenue Mix — {scenario.label} 2030
            </h2>
            <EvidenceBadge type="ASSUMPTION" />
          </div>
          <ReactECharts option={donutOption} style={{ height: 220 }} />
          <div className="mt-3 space-y-1">
            {compLabels.map((label, i) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: compColors[i] }} />
                  <span style={{ color: "var(--lunar-text-secondary)" }}>{label}</span>
                </div>
                <span className="font-mono" style={{ color: "var(--lunar-text-primary)" }}>
                  {compValues[i]}% — €{((compValues[i] / 100) * scenario.revenue2030).toFixed(0)}M
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Model Routing */}
        <div className="lunar-card">
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--lunar-text-primary)" }}>
            Model Routing Guide
            <EvidenceBadge type="RECOMMENDATION" className="ml-2" />
          </h2>
          <div className="space-y-2">
            {MODEL_ROUTING.map((r, i) => (
              <div key={i} className="p-2 rounded-lg" style={{ background: "var(--lunar-elevated)", border: "1px solid var(--lunar-border-subtle)" }}>
                <div className="text-xs font-medium" style={{ color: "var(--lunar-text-primary)" }}>{r.workload}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-1.5 py-0.5 rounded font-mono" style={{ background: "rgba(0,212,255,0.1)", color: "var(--lunar-cyan)" }}>
                    {r.recommended}
                  </span>
                  <span className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>↗ {r.escalation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Cost Calculator */}
      <div className="lunar-card">
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--lunar-text-primary)" }}>
          Task-Cost Calculator
          <EvidenceBadge
            type="MODEL"
            className="ml-2"
            formula="cost = (cached_pct × cached_rate + (1-cached_pct) × input_rate) × input_tokens + output_rate × output_tokens"
          />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="stat-label mb-1 block">Model</label>
              <select
                value={calc.modelId}
                onChange={(e) => setCalc({ ...calc, modelId: e.target.value })}
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{
                  background: "var(--lunar-elevated)",
                  border: "1px solid var(--lunar-border-subtle)",
                  color: "var(--lunar-text-primary)",
                }}
                aria-label="Select model"
              >
                {MODEL_PRICING.map((m) => (
                  <option key={m.id} value={m.id}>{m.name} — {m.provider}</option>
                ))}
              </select>
            </div>
            {([
              { key: "inputTokens" as const, label: "Input Tokens / Request", min: 100, max: 500000, step: 1000 },
              { key: "outputTokens" as const, label: "Output Tokens / Request", min: 50, max: 50000, step: 500 },
              { key: "cachedPct" as const, label: "Cached Input %", min: 0, max: 100, step: 5 },
              { key: "requestsPerDay" as const, label: "Requests / Day", min: 1, max: 1000000, step: 100 },
              { key: "retryRate" as const, label: "Retry Rate %", min: 0, max: 50, step: 1 },
              { key: "successRate" as const, label: "Task Success Rate %", min: 50, max: 100, step: 1 },
              { key: "contractDiscount" as const, label: "Contract Discount %", min: 0, max: 50, step: 5 },
            ]).map((field) => (
              <div key={field.key}>
                <div className="flex justify-between mb-1">
                  <label className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>{field.label}</label>
                  <span className="text-xs font-mono" style={{ color: "var(--lunar-cyan)" }}>{calc[field.key].toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={calc[field.key]}
                  onChange={(e) => setCalc({ ...calc, [field.key]: Number(e.target.value) })}
                  className="w-full accent-cyan-400"
                  aria-label={field.label}
                />
              </div>
            ))}
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-3">
              <h3 className="stat-label">Results</h3>
              {[
                { label: "Cost per request", value: `$${result.costPerRequest.toFixed(4)}` },
                { label: "Cost per completed task", value: `$${result.costPerCompletedTask.toFixed(4)}` },
                { label: "Daily cost", value: `$${result.dailyCost.toFixed(2)}` },
                { label: "Monthly cost", value: `$${result.monthlyCost.toFixed(2)}` },
                { label: "Annual cost", value: `$${result.annualCost.toFixed(2)}` },
                { label: "Monthly savings from caching", value: `$${result.savingsFromCaching.toFixed(2)}`, highlight: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{
                    background: item.highlight ? "rgba(16,185,129,0.08)" : "var(--lunar-elevated)",
                    border: `1px solid ${item.highlight ? "rgba(16,185,129,0.2)" : "var(--lunar-border-subtle)"}`,
                  }}
                >
                  <span className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
                    {item.label}
                  </span>
                  <span
                    className="font-mono text-sm font-semibold"
                    style={{ color: item.highlight ? "var(--lunar-green)" : "var(--lunar-text-primary)" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
              <div className="text-xs mt-2" style={{ color: "var(--lunar-text-muted)" }}>
                Effective input rate: ${result.effectiveInputRate.toFixed(4)}/1M · Output: ${result.effectiveOutputRate.toFixed(4)}/1M
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
