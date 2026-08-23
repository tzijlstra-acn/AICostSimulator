"use client";

import { useAppStore } from "@/store";
import {
  COMPETITORS,
  COMPETITOR_DIMENSIONS,
  DIMENSION_LABELS,
} from "@/data/competitors";
import { MODEL_PRICING } from "@/data/pricing";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function CompetitionPage() {
  const { selectedCompetitors, toggleCompetitor } = useAppStore();

  const visibleCompetitors = COMPETITORS.filter((c) =>
    selectedCompetitors.includes(c.id)
  );

  // Radar chart option
  const radarOption = {
    backgroundColor: "transparent",
    legend: {
      data: visibleCompetitors.map((c) => c.shortName),
      textStyle: { color: "var(--lunar-text-secondary)", fontSize: 10 },
      bottom: 0,
      type: "scroll",
    },
    radar: {
      indicator: COMPETITOR_DIMENSIONS.map((d) => ({
        name: DIMENSION_LABELS[d],
        max: 5,
      })),
      axisName: { color: "var(--lunar-text-secondary)", fontSize: 9 },
      splitArea: {
        areaStyle: {
          color: ["rgba(100,140,200,0.02)", "rgba(100,140,200,0.04)"],
        },
      },
      splitLine: { lineStyle: { color: "var(--lunar-border-subtle)" } },
      axisLine: { lineStyle: { color: "var(--lunar-border-subtle)" } },
    },
    series: [
      {
        type: "radar",
        data: visibleCompetitors.map((c) => ({
          name: c.shortName,
          value: COMPETITOR_DIMENSIONS.map((d) => c.scores[d] ?? 0),
          lineStyle: { color: c.color, width: 2 },
          areaStyle: { color: c.color + "15" },
          itemStyle: { color: c.color },
        })),
      },
    ],
  };

  // Heatmap data
  const heatmapCells: { dim: string; comp: string; value: number }[] = [];
  COMPETITOR_DIMENSIONS.forEach((dim) => {
    COMPETITORS.forEach((comp) => {
      heatmapCells.push({ dim, comp: comp.id, value: comp.scores[dim] ?? 0 });
    });
  });

  function scoreColor(v: number): string {
    if (v >= 4.5) return "rgba(16,185,129,0.6)";
    if (v >= 3.5) return "rgba(0,212,255,0.4)";
    if (v >= 2.5) return "rgba(245,158,11,0.4)";
    return "rgba(239,68,68,0.4)";
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
          Competition Arena
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
          Directional capability assessments and price comparison. All scores are analyst estimates.
          <EvidenceBadge type="RECOMMENDATION" className="ml-2" reasoning="Directional analyst assessments — not independently verified benchmarks" />
        </p>
      </div>

      {/* Competitor selector */}
      <div className="lunar-card">
        <h2 className="stat-label mb-3">Select competitors for radar</h2>
        <div className="flex flex-wrap gap-2">
          {COMPETITORS.map((c) => (
            <button
              key={c.id}
              onClick={() => toggleCompetitor(c.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: selectedCompetitors.includes(c.id)
                  ? c.color + "20"
                  : "var(--lunar-elevated)",
                border: selectedCompetitors.includes(c.id)
                  ? `1px solid ${c.color}50`
                  : "1px solid var(--lunar-border-subtle)",
                color: selectedCompetitors.includes(c.id)
                  ? c.color
                  : "var(--lunar-text-muted)",
              }}
              aria-pressed={selectedCompetitors.includes(c.id)}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: c.color }}
                aria-hidden="true"
              />
              {c.shortName}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar chart */}
        <div className="lunar-card">
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--lunar-text-primary)" }}>
            Capability Radar
          </h2>
          {visibleCompetitors.length === 0 ? (
            <div
              className="h-64 flex items-center justify-center text-sm"
              style={{ color: "var(--lunar-text-muted)" }}
            >
              Select competitors above to display radar
            </div>
          ) : (
            <ReactECharts option={radarOption} style={{ height: 380 }} />
          )}
        </div>

        {/* Price table */}
        <div className="lunar-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
              API Pricing ($ per million tokens)
            </h2>
            <EvidenceBadge type="FACT" reasoning="Sources S3, S16, S17, S18, S19, S20" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs" aria-label="API pricing comparison">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                  <th className="text-left py-2 pr-4 font-medium" style={{ color: "var(--lunar-text-muted)" }}>Model</th>
                  <th className="text-right px-2 py-2 font-medium" style={{ color: "var(--lunar-text-muted)" }}>Cached In</th>
                  <th className="text-right px-2 py-2 font-medium" style={{ color: "var(--lunar-text-muted)" }}>Input</th>
                  <th className="text-right px-2 py-2 font-medium" style={{ color: "var(--lunar-text-muted)" }}>Output</th>
                  <th className="text-left px-2 py-2 font-medium" style={{ color: "var(--lunar-text-muted)" }}>Context</th>
                </tr>
              </thead>
              <tbody>
                {MODEL_PRICING.map((m) => {
                  const isKimi = m.provider.includes("Kimi") || m.provider.includes("Moonshot");
                  const refInput = MODEL_PRICING[0].inputPer1M; // K3 as reference
                  const cheaperThanK3 = m.inputPer1M < refInput;
                  return (
                    <tr
                      key={m.id}
                      style={{
                        borderBottom: "1px solid var(--lunar-border-subtle)",
                        background: isKimi ? "rgba(0,212,255,0.04)" : undefined,
                      }}
                    >
                      <td className="py-2 pr-4">
                        <div className="font-medium" style={{ color: isKimi ? "var(--lunar-cyan)" : "var(--lunar-text-primary)" }}>
                          {m.name}
                        </div>
                        <div style={{ color: "var(--lunar-text-muted)" }}>{m.provider}</div>
                      </td>
                      <td className="text-right px-2 py-2 font-mono" style={{ color: "var(--lunar-text-secondary)" }}>
                        {m.cachedInputPer1M != null ? `$${m.cachedInputPer1M}` : "—"}
                      </td>
                      <td className="text-right px-2 py-2 font-mono" style={{ color: cheaperThanK3 && !isKimi ? "var(--lunar-green)" : "var(--lunar-text-primary)" }}>
                        ${m.inputPer1M}
                      </td>
                      <td className="text-right px-2 py-2 font-mono" style={{ color: "var(--lunar-text-primary)" }}>
                        ${m.outputPer1M}
                      </td>
                      <td className="px-2 py-2" style={{ color: "var(--lunar-text-muted)" }}>
                        {m.contextWindow || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-xs" style={{ color: "var(--lunar-text-muted)" }}>
            ⚠ Prices change frequently. Always verify with provider. Last retrieved: Aug 2026.
          </div>
        </div>
      </div>

      {/* Score Heatmap */}
      <div className="lunar-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
            Capability Score Heatmap (1–5 scale)
          </h2>
          <EvidenceBadge
            type="RECOMMENDATION"
            reasoning="Directional analyst assessments. Not independently benchmarked. Scores reflect current state (Aug 2026)."
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs" aria-label="Capability score heatmap">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                <th
                  className="text-left py-2 pr-4 font-medium min-w-[160px]"
                  style={{ color: "var(--lunar-text-muted)" }}
                >
                  Dimension
                </th>
                {COMPETITORS.map((c) => (
                  <th
                    key={c.id}
                    className="text-center py-2 px-2 font-medium"
                    style={{ color: c.isKimi ? "var(--lunar-cyan)" : "var(--lunar-text-muted)", minWidth: "70px" }}
                  >
                    {c.shortName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPETITOR_DIMENSIONS.map((dim) => (
                <tr
                  key={dim}
                  style={{ borderBottom: "1px solid var(--lunar-border-subtle)" }}
                >
                  <td className="py-2 pr-4" style={{ color: "var(--lunar-text-secondary)" }}>
                    {DIMENSION_LABELS[dim]}
                  </td>
                  {COMPETITORS.map((c) => {
                    const v = c.scores[dim] ?? 0;
                    return (
                      <td key={c.id} className="text-center py-2 px-2">
                        <span
                          className="inline-block px-2 py-0.5 rounded font-mono text-xs font-medium"
                          style={{
                            background: scoreColor(v),
                            color: "var(--lunar-text-primary)",
                          }}
                          title={`${c.name}: ${v}`}
                        >
                          {v.toFixed(1)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-4 mt-3 text-xs" style={{ color: "var(--lunar-text-muted)" }}>
          <span style={{ color: "var(--lunar-green)" }}>■ 4.5+ (leading)</span>
          <span style={{ color: "var(--lunar-cyan)" }}>■ 3.5+ (strong)</span>
          <span style={{ color: "var(--lunar-amber)" }}>■ 2.5+ (moderate)</span>
          <span style={{ color: "var(--lunar-red)" }}>■ &lt;2.5 (gap)</span>
        </div>
      </div>

      {/* Notes */}
      {COMPETITORS.map((c) => (
        c.notes && (
          <div
            key={c.id}
            className="text-xs px-3 py-2 rounded"
            style={{ background: "var(--lunar-elevated)", color: "var(--lunar-text-muted)", border: "1px solid var(--lunar-border-subtle)" }}
          >
            <span style={{ color: c.color }}>{c.name}:</span> {c.notes}
          </div>
        )
      ))}
    </div>
  );
}
