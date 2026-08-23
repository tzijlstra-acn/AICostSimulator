"use client";

import { useState } from "react";
import { useAppStore } from "@/store";
import { COUNTRIES, PHASE_COLORS, PHASE_LABELS, COUNTRY_ID_TO_ISO2 } from "@/data/countries";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import dynamic from "next/dynamic";
import { ChevronRight, X } from "lucide-react";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function CountriesPage() {
  const { selectedCountry, setSelectedCountry } = useAppStore();
  const [sortBy, setSortBy] = useState<"score" | "phase" | "name">("score");

  const sorted = [...COUNTRIES].sort((a, b) => {
    if (sortBy === "score") return b.score - a.score;
    if (sortBy === "phase") return a.launchPhase.localeCompare(b.launchPhase);
    return a.name.localeCompare(b.name);
  });

  const selected = selectedCountry ? COUNTRIES.find((c) => c.id === selectedCountry) : null;

  // Radar chart for selected country
  const radarOption = selected
    ? {
        backgroundColor: "transparent",
        radar: {
          indicator: [
            { name: "Score", max: 100 },
            { name: "AI Readiness", max: 100 },
            { name: "Market Size", max: 100 },
            { name: "Workloads", max: 10 },
            { name: "Phase Priority", max: 4 },
          ],
          axisName: { color: "var(--lunar-text-secondary)", fontSize: 10 },
          splitArea: { areaStyle: { color: ["rgba(100,140,200,0.02)", "rgba(100,140,200,0.04)"] } },
          splitLine: { lineStyle: { color: "var(--lunar-border-subtle)" } },
          axisLine: { lineStyle: { color: "var(--lunar-border-subtle)" } },
        },
        series: [
          {
            type: "radar",
            data: [
              {
                name: selected.name,
                value: [
                  selected.score,
                  selected.aiReadiness || 70,
                  Math.min(100, (selected.gdpBn || 1000) / 40),
                  selected.workloads.length,
                  ["2027H1", "2027H2", "2028", "later"].indexOf(selected.launchPhase) === 0 ? 4 : ["2027H1", "2027H2", "2028", "later"].indexOf(selected.launchPhase) === 1 ? 3 : 2,
                ],
                lineStyle: { color: PHASE_COLORS[selected.launchPhase], width: 2 },
                areaStyle: { color: PHASE_COLORS[selected.launchPhase] + "18" },
                itemStyle: { color: PHASE_COLORS[selected.launchPhase] },
              },
            ],
          },
        ],
      }
    : null;

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
            Country Navigator
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
            9 priority markets scored by opportunity, readiness, and strategic fit
          </p>
        </div>
        <EvidenceBadge type="RECOMMENDATION" reasoning="Country scoring based on market size, regulatory environment, AI readiness, and Kimi product fit" />
      </div>

      {/* Phase Legend */}
      <div className="flex flex-wrap gap-3">
        {(Object.entries(PHASE_LABELS) as [keyof typeof PHASE_LABELS, string][]).map(([phase, label]) => (
          <div key={phase} className="flex items-center gap-2 text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: PHASE_COLORS[phase] }}
              aria-hidden="true"
            />
            {label}
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div className={selected ? "flex-1" : "w-full"}>
          <div className="lunar-card p-0 overflow-hidden">
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: "var(--lunar-border-subtle)" }}
            >
              <span className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
                Country Scoring
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>Sort by:</span>
                {(["score", "phase", "name"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    className="text-xs px-2 py-1 rounded capitalize"
                    style={{
                      background: sortBy === s ? "rgba(0,212,255,0.1)" : "transparent",
                      color: sortBy === s ? "var(--lunar-cyan)" : "var(--lunar-text-muted)",
                      border: sortBy === s ? "1px solid rgba(0,212,255,0.2)" : "1px solid transparent",
                    }}
                    aria-pressed={sortBy === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <table className="w-full text-sm" role="table" aria-label="Country priority scoring">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                  <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--lunar-text-muted)" }}>Country</th>
                  <th className="text-right px-3 py-2 font-medium text-xs" style={{ color: "var(--lunar-text-muted)" }}>Score</th>
                  <th className="text-left px-3 py-2 font-medium text-xs" style={{ color: "var(--lunar-text-muted)" }}>Role</th>
                  <th className="text-left px-3 py-2 font-medium text-xs hidden lg:table-cell" style={{ color: "var(--lunar-text-muted)" }}>Entry Mode</th>
                  <th className="text-left px-3 py-2 font-medium text-xs" style={{ color: "var(--lunar-text-muted)" }}>Phase</th>
                  <th className="text-center px-3 py-2 font-medium text-xs" style={{ color: "var(--lunar-text-muted)" }}></th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((c) => (
                  <tr
                    key={c.id}
                    className="cursor-pointer transition-colors"
                    style={{
                      borderBottom: "1px solid var(--lunar-border-subtle)",
                      background: selectedCountry === c.id ? "rgba(0,212,255,0.05)" : undefined,
                    }}
                    onClick={() => setSelectedCountry(selectedCountry === c.id ? null : c.id)}
                    role="row"
                    aria-selected={selectedCountry === c.id}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setSelectedCountry(selectedCountry === c.id ? null : c.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FlagIcon iso2={COUNTRY_ID_TO_ISO2[c.id] ?? c.id.toUpperCase()} size={22} />
                        <span style={{ color: "var(--lunar-text-primary)" }}>{c.name}</span>
                      </div>
                    </td>
                    <td className="text-right px-3 py-3">
                      <span
                        className="font-mono text-sm font-bold px-2 py-0.5 rounded"
                        style={{
                          background: `${PHASE_COLORS[c.launchPhase]}18`,
                          color: PHASE_COLORS[c.launchPhase],
                        }}
                      >
                        {c.score}
                      </span>
                    </td>
                    <td className="px-3 py-3 max-w-[160px]">
                      <span className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
                        {c.role}
                      </span>
                    </td>
                    <td className="px-3 py-3 hidden lg:table-cell">
                      <span className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>
                        {c.entryMode}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: `${PHASE_COLORS[c.launchPhase]}18`,
                          color: PHASE_COLORS[c.launchPhase],
                        }}
                      >
                        {PHASE_LABELS[c.launchPhase]}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <ChevronRight
                        size={14}
                        style={{ color: selectedCountry === c.id ? "var(--lunar-cyan)" : "var(--lunar-text-muted)" }}
                        aria-hidden="true"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-80 flex-shrink-0">
            <div
              className="lunar-card sticky top-20"
              style={{ border: `1px solid ${PHASE_COLORS[selected.launchPhase]}40` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FlagIcon iso2={COUNTRY_ID_TO_ISO2[selected.id] ?? selected.id.toUpperCase()} size={36} />
                  <div>
                    <div className="font-bold" style={{ color: "var(--lunar-text-primary)" }}>
                      {selected.name}
                    </div>
                    <div
                      className="text-xs px-2 py-0.5 rounded-full inline-block"
                      style={{
                        background: `${PHASE_COLORS[selected.launchPhase]}18`,
                        color: PHASE_COLORS[selected.launchPhase],
                      }}
                    >
                      {PHASE_LABELS[selected.launchPhase]}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="p-1 rounded"
                  style={{ color: "var(--lunar-text-muted)" }}
                  aria-label="Close country detail"
                >
                  <X size={14} />
                </button>
              </div>

              {radarOption && (
                <ReactECharts option={radarOption} style={{ height: 200 }} />
              )}

              <div className="space-y-3 mt-4">
                <div>
                  <div className="stat-label">Role</div>
                  <div className="text-sm" style={{ color: "var(--lunar-text-primary)" }}>
                    {selected.role}
                  </div>
                </div>
                <div>
                  <div className="stat-label">Entry Mode</div>
                  <div className="text-sm" style={{ color: "var(--lunar-text-primary)" }}>
                    {selected.entryMode}
                  </div>
                </div>
                <div>
                  <div className="stat-label">Priority Workloads</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selected.workloads.map((w) => (
                      <span
                        key={w}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "var(--lunar-elevated)",
                          color: "var(--lunar-text-secondary)",
                          border: "1px solid var(--lunar-border-subtle)",
                        }}
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
                {selected.notes && (
                  <div>
                    <div className="stat-label">Notes</div>
                    <div className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
                      {selected.notes}
                    </div>
                  </div>
                )}
                {selected.regulatoryComplexity && (
                  <div>
                    <div className="stat-label">Regulatory Complexity</div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: selected.regulatoryComplexity === "high" ? "rgba(239,68,68,0.15)" : selected.regulatoryComplexity === "medium" ? "rgba(245,158,11,0.15)" : "rgba(16,185,129,0.15)",
                        color: selected.regulatoryComplexity === "high" ? "var(--lunar-red)" : selected.regulatoryComplexity === "medium" ? "var(--lunar-amber)" : "var(--lunar-green)",
                      }}
                    >
                      {selected.regulatoryComplexity.charAt(0).toUpperCase() + selected.regulatoryComplexity.slice(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
