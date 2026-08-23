"use client";

import { useAppStore } from "@/store";
import { RISKS, SEVERITY_COLORS, SEVERITY_BG } from "@/data/risks";
import type { RiskSeverity } from "@/data/risks";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { useState } from "react";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

const LIKELIHOOD_ORDER = { low: 1, medium: 2, high: 3 };

export default function RisksPage() {
  const { riskSeverities, setRiskSeverity } = useAppStore();
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState("all");

  const categories = ["all", ...Array.from(new Set(RISKS.map((r) => r.category)))];
  const filtered = RISKS.filter((r) => filterCat === "all" || r.category === filterCat);

  const selectedRiskData = selectedRisk ? RISKS.find((r) => r.id === selectedRisk) : null;

  // Risk matrix scatter
  const scatterOption = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      backgroundColor: "var(--lunar-panel)",
      borderColor: "var(--lunar-border-strong)",
      textStyle: { color: "var(--lunar-text-primary)" },
      formatter: (p: { data: [number, number, string, string] }) =>
        `<b>${p.data[2]}</b><br/>Likelihood: ${["Low","Medium","High"][p.data[0]-1]} · Severity: ${p.data[3]}`,
    },
    grid: { left: 60, right: 30, top: 30, bottom: 50 },
    xAxis: {
      type: "value",
      name: "Likelihood",
      min: 0.5,
      max: 3.5,
      interval: 1,
      axisLabel: {
        color: "var(--lunar-text-secondary)",
        formatter: (v: number) => ["", "Low", "Medium", "High"][v] || "",
      },
      splitLine: { lineStyle: { color: "var(--lunar-border-subtle)" } },
    },
    yAxis: {
      type: "value",
      name: "Severity",
      min: 0.5,
      max: 4.5,
      interval: 1,
      axisLabel: {
        color: "var(--lunar-text-secondary)",
        formatter: (v: number) => ["", "Low", "Medium", "High", "Critical"][v] || "",
      },
      splitLine: { lineStyle: { color: "var(--lunar-border-subtle)" } },
    },
    series: [
      {
        type: "scatter",
        data: RISKS.map((r) => {
          const sev = riskSeverities[r.id] as RiskSeverity ?? r.defaultSeverity;
          const sevMap: Record<RiskSeverity, number> = { low: 1, medium: 2, high: 3, critical: 4 };
          return [
            LIKELIHOOD_ORDER[r.likelihood],
            sevMap[sev],
            r.title.slice(0, 25) + "...",
            sev,
          ];
        }),
        symbolSize: 16,
        itemStyle: {
          color: (params: { data: [number, number, string, string] }) =>
            SEVERITY_COLORS[params.data[3] as RiskSeverity] || "#7a90b0",
          opacity: 0.85,
        },
        label: {
          show: false,
        },
      },
    ],
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
          Risk Register
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
          12 principal risks. Severity is editable — changes are persisted to localStorage.
          <EvidenceBadge type="RECOMMENDATION" className="ml-2" reasoning="Risk assessments are analyst judgments as of Aug 2026" />
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk matrix */}
        <div className="lunar-card">
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--lunar-text-primary)" }}>
            Risk Matrix (Likelihood × Severity)
          </h2>
          <ReactECharts option={scatterOption} style={{ height: 280 }} />
          <div className="flex gap-3 mt-2 text-xs flex-wrap">
            {(["low", "medium", "high", "critical"] as RiskSeverity[]).map((s) => (
              <span key={s} className="flex items-center gap-1" style={{ color: "var(--lunar-text-muted)" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: SEVERITY_COLORS[s] }} aria-hidden="true" />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Selected risk detail */}
        <div className="lunar-card">
          {selectedRiskData ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
                  {selectedRiskData.title}
                </h2>
                <button
                  onClick={() => setSelectedRisk(null)}
                  className="text-xs"
                  style={{ color: "var(--lunar-text-muted)" }}
                  aria-label="Deselect risk"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="stat-label">Description</div>
                  <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>{selectedRiskData.description}</p>
                </div>
                <div>
                  <div className="stat-label">Mitigation</div>
                  <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>{selectedRiskData.mitigation}</p>
                </div>
                <div>
                  <div className="stat-label">Mitigation Status</div>
                  <p className="text-sm" style={{ color: "var(--lunar-amber)" }}>{selectedRiskData.mitigationStatus}</p>
                </div>
                <div className="flex gap-3">
                  <div>
                    <div className="stat-label">Owner</div>
                    <div className="text-sm" style={{ color: "var(--lunar-text-primary)" }}>{selectedRiskData.owner}</div>
                  </div>
                  <div>
                    <div className="stat-label">Category</div>
                    <div className="text-sm" style={{ color: "var(--lunar-text-primary)" }}>{selectedRiskData.category}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-sm" style={{ color: "var(--lunar-text-muted)", minHeight: 200 }}>
              Select a risk from the table to see details
            </div>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className="px-3 py-1 rounded-lg text-xs"
            style={{
              background: filterCat === cat ? "rgba(0,212,255,0.1)" : "var(--lunar-elevated)",
              color: filterCat === cat ? "var(--lunar-cyan)" : "var(--lunar-text-muted)",
              border: filterCat === cat ? "1px solid rgba(0,212,255,0.2)" : "1px solid var(--lunar-border-subtle)",
            }}
            aria-pressed={filterCat === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Risk table */}
      <div className="space-y-3">
        {filtered.map((risk) => {
          const severity = riskSeverities[risk.id] as RiskSeverity ?? risk.defaultSeverity;
          return (
            <div
              key={risk.id}
              className="lunar-card cursor-pointer transition-colors"
              style={{
                borderLeft: `3px solid ${SEVERITY_COLORS[severity]}`,
                background: selectedRisk === risk.id ? SEVERITY_BG[severity] : undefined,
              }}
              onClick={() => setSelectedRisk(selectedRisk === risk.id ? null : risk.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedRisk(selectedRisk === risk.id ? null : risk.id)}
              aria-expanded={selectedRisk === risk.id}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
                      {risk.title}
                    </span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ background: "var(--lunar-elevated)", color: "var(--lunar-text-muted)" }}
                    >
                      {risk.category}
                    </span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded capitalize"
                      style={{ background: SEVERITY_BG[severity], color: SEVERITY_COLORS[severity] }}
                    >
                      {risk.likelihood} likelihood
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
                    {risk.description}
                  </p>
                  {selectedRisk === risk.id && (
                    <div className="mt-2 space-y-2">
                      <div className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
                        <strong style={{ color: "var(--lunar-text-primary)" }}>Mitigation:</strong> {risk.mitigation}
                      </div>
                      <div className="text-xs" style={{ color: "var(--lunar-amber)" }}>
                        <strong>Status:</strong> {risk.mitigationStatus}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <select
                    value={severity}
                    onChange={(e) => {
                      e.stopPropagation();
                      setRiskSeverity(risk.id, e.target.value as RiskSeverity);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      background: "var(--lunar-elevated)",
                      border: "1px solid var(--lunar-border-subtle)",
                      color: SEVERITY_COLORS[severity],
                    }}
                    aria-label={`Severity for ${risk.title}`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                  <span className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>
                    {risk.owner}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
