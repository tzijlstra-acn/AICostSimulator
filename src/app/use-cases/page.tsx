"use client";

import { useState } from "react";
import { USE_CASES, getTierLabel } from "@/data/usecases";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const TIER_COLORS: Record<string, string> = {
  tier1: "var(--lunar-green)",
  tier2: "var(--lunar-amber)",
  tier3: "var(--lunar-violet)",
  excluded: "var(--lunar-red)",
};

const WAVE_COLORS: Record<string, string> = {
  wave1: "var(--lunar-cyan)",
  wave2: "var(--lunar-amber)",
  wave3: "var(--lunar-violet)",
  excluded: "var(--lunar-red)",
};

export default function UseCasesPage() {
  const [filterTier, setFilterTier] = useState<string>("all");
  const [selectedUC, setSelectedUC] = useState<string | null>(null);

  const filtered = USE_CASES.filter(
    (uc) => filterTier === "all" || uc.tier === filterTier
  );
  const selected = selectedUC ? USE_CASES.find((u) => u.id === selectedUC) : null;

  // Scatter chart: readiness vs differentiation
  const scatterOption = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      backgroundColor: "var(--lunar-panel)",
      borderColor: "var(--lunar-border-strong)",
      textStyle: { color: "var(--lunar-text-primary)" },
      formatter: (p: { data: [number, number, string, string] }) =>
        `${p.data[2]}<br/>Readiness: ${p.data[0]} / Differentiation: ${p.data[1]}`,
    },
    grid: { left: 50, right: 30, top: 30, bottom: 50 },
    xAxis: {
      type: "value",
      name: "Readiness",
      min: 0,
      max: 5,
      nameTextStyle: { color: "var(--lunar-text-secondary)" },
      axisLabel: { color: "var(--lunar-text-secondary)" },
      splitLine: { lineStyle: { color: "var(--lunar-border-subtle)" } },
    },
    yAxis: {
      type: "value",
      name: "Differentiation",
      min: 0,
      max: 5,
      nameTextStyle: { color: "var(--lunar-text-secondary)" },
      axisLabel: { color: "var(--lunar-text-secondary)" },
      splitLine: { lineStyle: { color: "var(--lunar-border-subtle)" } },
    },
    series: [
      {
        type: "scatter",
        data: USE_CASES.filter((u) => u.tier !== "excluded").map((u) => [
          u.readiness,
          u.differentiation,
          u.title.slice(0, 30),
          u.tier,
        ]),
        symbolSize: 12,
        itemStyle: {
          color: (params: { data: [number, number, string, string] }) =>
            TIER_COLORS[params.data[3]] || "#7a90b0",
          opacity: 0.8,
        },
      },
    ],
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
          Use-Case Atlas
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
          {USE_CASES.filter((u) => u.tier !== "excluded").length} prioritised use cases across 3 tiers +{" "}
          {USE_CASES.filter((u) => u.tier === "excluded").length} excluded categories
        </p>
      </div>

      {/* Do Not Launch Warning */}
      <div
        className="rounded-xl p-4"
        style={{
          background: "rgba(239,68,68,0.07)",
          border: "1px solid rgba(239,68,68,0.2)",
        }}
        role="alert"
      >
        <div className="text-sm font-semibold mb-1" style={{ color: "var(--lunar-red)" }}>
          ⛔ Do Not Launch Initially
        </div>
        <div className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
          The following use case categories must not be launched: automated recruitment ranking (autonomous), credit approval, insurance eligibility, clinical diagnosis, public-benefit eligibility, immigration decisions, biometric categorisation, emotion recognition, predictive policing, autonomous critical-infrastructure operation. These are prohibited or high-risk under EU AI Act Art. 5 and Annex III.
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {["all", "tier1", "tier2", "tier3", "excluded"].map((t) => (
          <button
            key={t}
            onClick={() => setFilterTier(t)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{
              background: filterTier === t ? (t === "all" ? "rgba(0,212,255,0.15)" : `${TIER_COLORS[t]}20`) : "var(--lunar-elevated)",
              color: filterTier === t ? (t === "all" ? "var(--lunar-cyan)" : TIER_COLORS[t]) : "var(--lunar-text-muted)",
              border: filterTier === t ? `1px solid ${t === "all" ? "rgba(0,212,255,0.3)" : TIER_COLORS[t] + "40"}` : "1px solid var(--lunar-border-subtle)",
            }}
            aria-pressed={filterTier === t}
          >
            {t === "all" ? "All" : getTierLabel(t as "tier1" | "tier2" | "tier3" | "excluded")}
            <span className="ml-1 font-mono">({t === "all" ? USE_CASES.length : USE_CASES.filter((u) => u.tier === t).length})</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scatter chart */}
        <div className="lunar-card">
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--lunar-text-primary)" }}>
            Readiness vs. Differentiation
          </h2>
          <div className="flex gap-3 mb-2 text-xs flex-wrap">
            {Object.entries(TIER_COLORS).map(([tier, color]) => (
              <span key={tier} className="flex items-center gap-1" style={{ color: "var(--lunar-text-muted)" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                {getTierLabel(tier as "tier1" | "tier2" | "tier3" | "excluded").split("—")[0].trim()}
              </span>
            ))}
          </div>
          <ReactECharts option={scatterOption} style={{ height: 280 }} />
        </div>

        {/* Use case list */}
        <div className="lg:col-span-2">
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {filtered.map((uc) => (
              <button
                key={uc.id}
                onClick={() => setSelectedUC(selectedUC === uc.id ? null : uc.id)}
                className="w-full text-left p-3 rounded-lg transition-colors"
                style={{
                  background: selectedUC === uc.id ? `${TIER_COLORS[uc.tier]}10` : "var(--lunar-surface)",
                  border: `1px solid ${selectedUC === uc.id ? TIER_COLORS[uc.tier] + "40" : "var(--lunar-border-subtle)"}`,
                }}
                aria-expanded={selectedUC === uc.id}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 text-xs px-1.5 py-0.5 rounded font-mono mt-0.5"
                    style={{
                      background: `${TIER_COLORS[uc.tier]}20`,
                      color: TIER_COLORS[uc.tier],
                    }}
                  >
                    {uc.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium" style={{ color: "var(--lunar-text-primary)" }}>
                        {uc.title}
                      </span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{ background: `${WAVE_COLORS[uc.launchWave]}15`, color: WAVE_COLORS[uc.launchWave] }}
                      >
                        {uc.launchWave}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: "var(--lunar-text-muted)" }}>
                      <span>{uc.sector}</span>
                      <span>•</span>
                      <span style={{ color: "var(--lunar-cyan)" }}>{uc.modelRecommendation}</span>
                      <span>•</span>
                      <span
                        style={{
                          color: uc.riskLevel === "unacceptable" ? "var(--lunar-red)" : uc.riskLevel === "high" ? "var(--lunar-amber)" : "var(--lunar-text-muted)",
                        }}
                      >
                        {uc.riskLevel} risk
                      </span>
                    </div>
                    {selectedUC === uc.id && (
                      <div className="mt-3 space-y-2 text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
                        <div><strong style={{ color: "var(--lunar-text-primary)" }}>AI Act:</strong> {uc.aiActClassification}</div>
                        <div><strong style={{ color: "var(--lunar-text-primary)" }}>Buyer:</strong> {uc.buyer}</div>
                        <div><strong style={{ color: "var(--lunar-text-primary)" }}>Deployment:</strong> {uc.deployment.replace("_", " ")}</div>
                        <div><strong style={{ color: "var(--lunar-text-primary)" }}>Human oversight:</strong> {uc.humanOversightRequired ? "Required" : "Not required"}</div>
                        {uc.successKPIs.length > 0 && (
                          <div>
                            <strong style={{ color: "var(--lunar-text-primary)" }}>Success KPIs:</strong>{" "}
                            {uc.successKPIs.join(" · ")}
                          </div>
                        )}
                        {uc.pilotDesign && (
                          <div><strong style={{ color: "var(--lunar-text-primary)" }}>Pilot:</strong> {uc.pilotDesign}</div>
                        )}
                        {uc.notes && (
                          <div className="italic" style={{ color: "var(--lunar-text-muted)" }}>{uc.notes}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
