"use client";

import { useAppStore } from "@/store";
import {
  SPEND_POOLS,
  TAM_2026_BASE,
  TAM_2030_BASE,
  calcSAM,
  REVENUE_SCENARIOS,
  REVENUE_COMPOSITION_LABELS,
} from "@/data/market";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function MarketPage() {
  const { activeScenario, marketAssumptions, setMarketAssumptions } = useAppStore();
  const scenario = REVENUE_SCENARIOS[activeScenario];

  const sam = calcSAM(TAM_2030_BASE, {
    targetCountryPct: marketAssumptions.targetCountryPct / 100,
    productFitPct: marketAssumptions.productFitPct / 100,
    procurementReachPct: marketAssumptions.procurementReachPct / 100,
  });

  const som = scenario.revenue2030 / 1000; // in billions

  // Waterfall chart: TAM -> SAM -> SOM
  const waterfallOption = {
    backgroundColor: "transparent",
    tooltip: { trigger: "axis", backgroundColor: "var(--lunar-panel)", borderColor: "var(--lunar-border-strong)", textStyle: { color: "var(--lunar-text-primary)" }, formatter: (params: { name: string; value: number }[]) => `${params[0].name}: €${params[0].value.toFixed(2)}B` },
    grid: { left: 60, right: 20, top: 20, bottom: 40 },
    xAxis: {
      type: "category",
      data: ["2030 TAM", "→ SAM filter", "SAM", "→ SOM", "SOM (base)"],
      axisLabel: { color: "var(--lunar-text-secondary)", fontSize: 11 },
      axisLine: { lineStyle: { color: "var(--lunar-border-subtle)" } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "var(--lunar-text-secondary)", fontSize: 11, formatter: (v: number) => `€${v}B` },
      splitLine: { lineStyle: { color: "var(--lunar-border-subtle)" } },
    },
    series: [
      {
        type: "bar",
        data: [
          { value: TAM_2030_BASE, itemStyle: { color: "rgba(0,212,255,0.7)" } },
          { value: -(TAM_2030_BASE - sam), itemStyle: { color: "rgba(239,68,68,0.4)" } },
          { value: sam, itemStyle: { color: "rgba(168,85,247,0.7)" } },
          { value: -(sam - som), itemStyle: { color: "rgba(239,68,68,0.3)" } },
          { value: som, itemStyle: { color: "rgba(16,185,129,0.7)" } },
        ],
        barWidth: "50%",
        label: { show: true, position: "top", formatter: (p: { value: number }) => p.value > 0 ? `€${Math.abs(p.value).toFixed(1)}B` : "", color: "var(--lunar-text-secondary)", fontSize: 10 },
      },
    ],
  };

  // Revenue path chart
  const years = Object.keys(scenario.path);
  const revPathOption = {
    backgroundColor: "transparent",
    tooltip: { trigger: "axis", backgroundColor: "var(--lunar-panel)", borderColor: "var(--lunar-border-strong)", textStyle: { color: "var(--lunar-text-primary)" } },
    legend: { data: ["Conservative", "Base", "Upside"], textStyle: { color: "var(--lunar-text-secondary)", fontSize: 11 }, bottom: 0 },
    grid: { left: 50, right: 20, top: 20, bottom: 40 },
    xAxis: {
      type: "category",
      data: years,
      axisLabel: { color: "var(--lunar-text-secondary)" },
      axisLine: { lineStyle: { color: "var(--lunar-border-subtle)" } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "var(--lunar-text-secondary)", formatter: (v: number) => `€${v}M` },
      splitLine: { lineStyle: { color: "var(--lunar-border-subtle)" } },
    },
    series: Object.entries(REVENUE_SCENARIOS).map(([key, s]) => ({
      name: s.label,
      type: "line",
      smooth: true,
      data: Object.values(s.path),
      lineStyle: { color: key === "conservative" ? "#7a90b0" : key === "base" ? "#00d4ff" : "#10b981", width: key === activeScenario ? 3 : 1.5 },
      itemStyle: { color: key === "conservative" ? "#7a90b0" : key === "base" ? "#00d4ff" : "#10b981" },
    })),
  };

  // Revenue composition donut
  const compLabels = Object.entries(scenario.composition).map(
    ([key]) => REVENUE_COMPOSITION_LABELS[key] || key
  );
  const compValues = Object.values(scenario.composition);
  const compColors = ["#00d4ff", "#a855f7", "#10b981", "#f59e0b", "#ef4444"];
  const donutOption = {
    backgroundColor: "transparent",
    tooltip: { trigger: "item", backgroundColor: "var(--lunar-panel)", borderColor: "var(--lunar-border-strong)", textStyle: { color: "var(--lunar-text-primary)" }, formatter: "{b}: {d}%" },
    series: [
      {
        type: "pie",
        radius: ["45%", "75%"],
        data: compLabels.map((label, i) => ({
          name: label,
          value: compValues[i],
          itemStyle: { color: compColors[i] },
        })),
        label: { color: "var(--lunar-text-secondary)", fontSize: 10 },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.5)" } },
      },
    ],
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
          Market Sizing Lab
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
          TAM/SAM/SOM model for EU AI market 2026–2030. All assumptions are editable.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lunar-card">
          <div className="stat-label">2026 TAM</div>
          <div className="stat-number" style={{ color: "var(--lunar-text-secondary)" }}>€{TAM_2026_BASE.toFixed(2)}B</div>
          <EvidenceBadge type="MODEL" formula="Sum of 5 spend pools" />
        </div>
        <div className="lunar-card">
          <div className="stat-label">2030 TAM</div>
          <div className="stat-number" style={{ color: "var(--lunar-cyan)" }}>€{TAM_2030_BASE.toFixed(1)}B</div>
          <EvidenceBadge type="MODEL" formula={`CAGR ~${marketAssumptions.tamGrowthRate}%`} />
        </div>
        <div className="lunar-card">
          <div className="stat-label">2030 SAM</div>
          <div className="stat-number" style={{ color: "var(--lunar-violet)" }}>€{sam.toFixed(2)}B</div>
          <EvidenceBadge type="MODEL" formula="TAM × country × fit × procurement" />
        </div>
        <div className="lunar-card">
          <div className="stat-label">{scenario.label} Revenue 2030</div>
          <div className="stat-number" style={{ color: "var(--lunar-green)" }}>€{scenario.revenue2030}M</div>
          <EvidenceBadge type="ASSUMPTION" />
        </div>
      </div>

      {/* Assumption Sliders */}
      <div className="lunar-card">
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--lunar-text-primary)" }}>
          SAM Filter Assumptions
          <EvidenceBadge type="ASSUMPTION" className="ml-2" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {([
            { key: "targetCountryPct" as const, label: "Target Country Coverage", desc: "% of TAM in our 9 target countries" },
            { key: "productFitPct" as const, label: "Product-Market Fit", desc: "% of SAM where Kimi has relevant products" },
            { key: "procurementReachPct" as const, label: "Procurement Reach", desc: "% we can realistically win in procurement" },
          ]).map((item) => (
            <div key={item.key}>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-medium" style={{ color: "var(--lunar-text-secondary)" }}>
                  {item.label}
                </label>
                <span className="text-xs font-mono" style={{ color: "var(--lunar-cyan)" }}>
                  {marketAssumptions[item.key]}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={marketAssumptions[item.key]}
                onChange={(e) => setMarketAssumptions({ [item.key]: Number(e.target.value) })}
                className="w-full accent-cyan-400 cursor-pointer"
                aria-label={item.label}
              />
              <div className="text-xs mt-1" style={{ color: "var(--lunar-text-muted)" }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spend Pool Table */}
      <div className="lunar-card">
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--lunar-text-primary)" }}>
          EU AI Spend Pools
          <EvidenceBadge type="MODEL" className="ml-2" sourceId="S6" />
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table" aria-label="AI spend pools by year and scenario">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                <th className="text-left py-2 pr-4 font-medium" style={{ color: "var(--lunar-text-muted)" }}>Spend Pool</th>
                <th className="text-right py-2 px-3 font-medium" style={{ color: "var(--lunar-text-muted)" }}>2026 Low</th>
                <th className="text-right py-2 px-3 font-medium" style={{ color: "var(--lunar-cyan)" }}>2026 Base</th>
                <th className="text-right py-2 px-3 font-medium" style={{ color: "var(--lunar-text-muted)" }}>2026 High</th>
                <th className="text-right py-2 px-3 font-medium" style={{ color: "var(--lunar-text-muted)" }}>2030 Low</th>
                <th className="text-right py-2 px-3 font-medium" style={{ color: "var(--lunar-cyan)" }}>2030 Base</th>
                <th className="text-right py-2 px-3 font-medium" style={{ color: "var(--lunar-text-muted)" }}>2030 High</th>
              </tr>
            </thead>
            <tbody>
              {SPEND_POOLS.map((pool) => (
                <tr
                  key={pool.id}
                  style={{ borderBottom: "1px solid var(--lunar-border-subtle)" }}
                  className="hover:bg-white/3 transition-colors"
                >
                  <td className="py-2 pr-4" style={{ color: "var(--lunar-text-primary)" }}>
                    {pool.name}
                  </td>
                  <td className="text-right py-2 px-3 font-mono" style={{ color: "var(--lunar-text-muted)" }}>€{pool.tam2026Low}B</td>
                  <td className="text-right py-2 px-3 font-mono font-semibold" style={{ color: "var(--lunar-cyan)" }}>€{pool.tam2026Base}B</td>
                  <td className="text-right py-2 px-3 font-mono" style={{ color: "var(--lunar-text-muted)" }}>€{pool.tam2026High}B</td>
                  <td className="text-right py-2 px-3 font-mono" style={{ color: "var(--lunar-text-muted)" }}>€{pool.tam2030Low}B</td>
                  <td className="text-right py-2 px-3 font-mono font-semibold" style={{ color: "var(--lunar-cyan)" }}>€{pool.tam2030Base}B</td>
                  <td className="text-right py-2 px-3 font-mono" style={{ color: "var(--lunar-text-muted)" }}>€{pool.tam2030High}B</td>
                </tr>
              ))}
              <tr style={{ borderTop: "1px solid var(--lunar-border-strong)" }}>
                <td className="py-2 pr-4 font-semibold" style={{ color: "var(--lunar-text-primary)" }}>Total</td>
                <td className="text-right py-2 px-3 font-mono font-semibold" style={{ color: "var(--lunar-text-secondary)" }}>
                  €{SPEND_POOLS.reduce((s, p) => s + p.tam2026Low, 0).toFixed(2)}B
                </td>
                <td className="text-right py-2 px-3 font-mono font-bold" style={{ color: "var(--lunar-cyan)" }}>
                  €{TAM_2026_BASE.toFixed(2)}B
                </td>
                <td className="text-right py-2 px-3 font-mono font-semibold" style={{ color: "var(--lunar-text-secondary)" }}>
                  €{SPEND_POOLS.reduce((s, p) => s + p.tam2026High, 0).toFixed(2)}B
                </td>
                <td className="text-right py-2 px-3 font-mono font-semibold" style={{ color: "var(--lunar-text-secondary)" }}>
                  €{SPEND_POOLS.reduce((s, p) => s + p.tam2030Low, 0).toFixed(1)}B
                </td>
                <td className="text-right py-2 px-3 font-mono font-bold" style={{ color: "var(--lunar-cyan)" }}>
                  €{TAM_2030_BASE.toFixed(1)}B
                </td>
                <td className="text-right py-2 px-3 font-mono font-semibold" style={{ color: "var(--lunar-text-secondary)" }}>
                  €{SPEND_POOLS.reduce((s, p) => s + p.tam2030High, 0).toFixed(1)}B
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 lunar-card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
              Revenue Path 2027–2030
            </h2>
            <EvidenceBadge type="ASSUMPTION" />
          </div>
          <ReactECharts option={revPathOption} style={{ height: 260 }} />
        </div>

        <div className="lunar-card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
              Revenue Mix ({scenario.label} 2030)
            </h2>
            <EvidenceBadge type="ASSUMPTION" />
          </div>
          <ReactECharts option={donutOption} style={{ height: 260 }} />
        </div>
      </div>

      {/* Waterfall */}
      <div className="lunar-card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
            TAM → SAM → SOM Waterfall (2030)
          </h2>
          <EvidenceBadge
            type="MODEL"
            formula={`SAM = TAM × ${marketAssumptions.targetCountryPct}% × ${marketAssumptions.productFitPct}% × ${marketAssumptions.procurementReachPct}% = €${sam.toFixed(2)}B`}
          />
        </div>
        <div className="flex gap-4 mb-4 text-xs" style={{ color: "var(--lunar-text-muted)" }}>
          <span style={{ color: "var(--lunar-cyan)" }}>■ Market pool</span>
          <span style={{ color: "#ef4444" }}>■ Filtered out</span>
          <span style={{ color: "var(--lunar-green)" }}>■ Serviceable</span>
        </div>
        <ReactECharts option={waterfallOption} style={{ height: 240 }} />
      </div>

      <div className="text-xs rounded-lg p-3" style={{ background: "var(--lunar-elevated)", color: "var(--lunar-text-muted)", border: "1px solid var(--lunar-border-subtle)" }}>
        <strong style={{ color: "var(--lunar-amber)" }}>Methodology note:</strong> TAM figures are analyst estimates based on Eurostat enterprise ICT spend data (S6) and EU AI adoption research (S15), adjusted for AI-specific segments. CAGR assumptions reflect observed cloud and AI market growth trajectories. All figures are working assumptions — not audited forecasts. SAM filter parameters are editable above.
      </div>
    </div>
  );
}
