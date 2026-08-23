"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { USE_CASES, getTierLabel } from "@/data/usecases";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const TIER_COLORS: Record<string, string> = {
  tier1: "#10b981",
  tier2: "#f59e0b",
  tier3: "#a855f7",
  excluded: "#ef4444",
};

const WAVE_COLORS: Record<string, string> = {
  wave1: "#00d4ff",
  wave2: "#f59e0b",
  wave3: "#a855f7",
  excluded: "#ef4444",
};

export default function UseCasesPage() {
  const [filterTier, setFilterTier] = useState<string>("all");
  const [selectedUC, setSelectedUC] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const t = useTranslations("useCases");

  const filtered = USE_CASES.filter((uc) => {
    const matchesTier = filterTier === "all" || uc.tier === filterTier;
    if (!matchesTier) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      uc.title.toLowerCase().includes(q) ||
      (uc.notes?.toLowerCase().includes(q) ?? false) ||
      uc.buyer.toLowerCase().includes(q) ||
      uc.sector.toLowerCase().includes(q)
    );
  });
  const selected = selectedUC ? USE_CASES.find((u) => u.id === selectedUC) : null;

  // Scatter chart: readiness vs differentiation
  const scatterOption = {
    backgroundColor: "transparent",
    textStyle: { color: '#7a90b0' },
    tooltip: {
      trigger: "item",
      backgroundColor: '#0d1420',
      borderColor: 'rgba(100,140,200,0.15)',
      textStyle: { color: '#e8eef8' },
      formatter: (p: { data: [number, number, string, string] }) =>
        `${p.data[2]}<br/>Readiness: ${p.data[0]} / Differentiation: ${p.data[1]}`,
    },
    grid: { left: 50, right: 30, top: 30, bottom: 50 },
    xAxis: {
      type: "value",
      name: "Readiness",
      min: 0,
      max: 5,
      nameTextStyle: { color: '#7a90b0' },
      axisLabel: { color: '#7a90b0' },
      axisLine: { lineStyle: { color: '#4a5a7a' } },
      splitLine: { lineStyle: { color: '#1a2438' } },
    },
    yAxis: {
      type: "value",
      name: "Differentiation",
      min: 0,
      max: 5,
      nameTextStyle: { color: '#7a90b0' },
      axisLabel: { color: '#7a90b0' },
      axisLine: { lineStyle: { color: '#4a5a7a' } },
      splitLine: { lineStyle: { color: '#1a2438' } },
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

  const tierLabels: Record<string, string> = {
    tier1: t("tier1"),
    tier2: t("tier2"),
    tier3: t("tier3"),
    excluded: t("excluded"),
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
          {t("title")}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
          {t("subtitle", {
            prioritised: USE_CASES.filter((u) => u.tier !== "excluded").length,
            excluded: USE_CASES.filter((u) => u.tier === "excluded").length,
          })}
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
          {t("excludedTitle")}
        </div>
        <div className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
          {t("excludedNote")}
        </div>
      </div>

      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search use cases by name, sector, buyer…"
          className="w-full px-3 py-2 rounded-lg text-sm"
          style={{
            background: "var(--lunar-elevated)",
            border: "1px solid var(--lunar-border-subtle)",
            color: "var(--lunar-text-primary)",
            outline: "none",
          }}
          aria-label="Search use cases"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-1"
            style={{ color: "var(--lunar-text-muted)" }}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {["all", "tier1", "tier2", "tier3", "excluded"].map((tier) => (
          <button
            key={tier}
            onClick={() => setFilterTier(tier)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{
              background: filterTier === tier ? 'rgba(0,212,255,0.1)' : 'var(--lunar-elevated)',
              color: filterTier === tier ? 'var(--lunar-cyan)' : 'var(--lunar-text-secondary)',
              border: filterTier === tier ? '1px solid rgba(0,212,255,0.2)' : '1px solid var(--lunar-border-subtle)',
            }}
            aria-pressed={filterTier === tier}
          >
            {tier === "all" ? t("all") : tierLabels[tier]}
            <span className="ml-1 font-mono">({tier === "all" ? USE_CASES.length : USE_CASES.filter((u) => u.tier === tier).length})</span>
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
                {tierLabels[tier]?.split("—")[0].trim() ?? getTierLabel(tier as "tier1" | "tier2" | "tier3" | "excluded").split("—")[0].trim()}
              </span>
            ))}
          </div>
          <ReactECharts option={scatterOption} style={{ height: 280 }} />
        </div>

        {/* Use case list */}
        <div className="lg:col-span-2">
          {filtered.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-12 rounded-lg text-center"
              style={{
                background: "var(--lunar-elevated)",
                border: "1px solid var(--lunar-border-subtle)",
                color: "var(--lunar-text-muted)",
              }}
            >
              <div className="text-2xl mb-2">🔍</div>
              <div className="text-sm font-medium">No use cases match your search</div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-3 text-xs px-3 py-1.5 rounded-lg"
                  style={{ background: "rgba(0,212,255,0.1)", color: "var(--lunar-cyan)", border: "1px solid rgba(0,212,255,0.2)" }}
                >
                  Clear search
                </button>
              )}
            </div>
          )}
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
