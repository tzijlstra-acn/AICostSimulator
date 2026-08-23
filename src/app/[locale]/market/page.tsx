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
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function MarketPage() {
  const { activeScenario, marketAssumptions, setMarketAssumptions } = useAppStore();
  const t = useTranslations("market");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isZH = locale === "zh-CN";
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
    textStyle: { color: '#7a90b0' },
    tooltip: { trigger: "axis", backgroundColor: '#0d1420', borderColor: 'rgba(100,140,200,0.15)', textStyle: { color: '#e8eef8' }, formatter: (params: { name: string; value: number }[]) => `${params[0].name}: €${params[0].value.toFixed(2)}B` },
    grid: { left: isZH ? 70 : 60, right: 20, top: 20, bottom: isZH ? 60 : 40 },
    xAxis: {
      type: "category",
      data: [
        t("charts.waterfall.tam2030"),
        t("charts.waterfall.samFilter"),
        t("charts.waterfall.sam"),
        t("charts.waterfall.somFilter"),
        t("charts.waterfall.som"),
      ],
      axisLabel: { color: '#7a90b0', fontSize: isZH ? 10 : 11, overflow: "break" as const, width: isZH ? 70 : 90 },
      axisLine: { lineStyle: { color: '#4a5a7a' } },
      splitLine: { lineStyle: { color: '#1a2438' } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: '#7a90b0', fontSize: 11, formatter: (v: number) => `€${v}B` },
      axisLine: { lineStyle: { color: '#4a5a7a' } },
      splitLine: { lineStyle: { color: '#1a2438' } },
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
  const scenarioLegendLabels = {
    conservative: tCommon("scenarios.conservative"),
    base: tCommon("scenarios.base"),
    upside: tCommon("scenarios.upside"),
  };
  const revPathOption = {
    backgroundColor: "transparent",
    textStyle: { color: '#7a90b0' },
    tooltip: { trigger: "axis", backgroundColor: '#0d1420', borderColor: 'rgba(100,140,200,0.15)', textStyle: { color: '#e8eef8' } },
    legend: {
      data: [scenarioLegendLabels.conservative, scenarioLegendLabels.base, scenarioLegendLabels.upside],
      textStyle: { color: '#7a90b0', fontSize: 11 },
      bottom: 0,
      type: "scroll" as const,
    },
    grid: { left: 60, right: 20, top: 20, bottom: 50 },
    xAxis: {
      type: "category",
      data: years,
      axisLabel: { color: '#7a90b0' },
      axisLine: { lineStyle: { color: '#4a5a7a' } },
      splitLine: { lineStyle: { color: '#1a2438' } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: '#7a90b0', formatter: (v: number) => `€${v}M` },
      axisLine: { lineStyle: { color: '#4a5a7a' } },
      splitLine: { lineStyle: { color: '#1a2438' } },
    },
    series: Object.entries(REVENUE_SCENARIOS).map(([key, _s]) => ({
      name: scenarioLegendLabels[key as keyof typeof scenarioLegendLabels],
      type: "line",
      smooth: true,
      data: Object.values(REVENUE_SCENARIOS[key as keyof typeof REVENUE_SCENARIOS].path),
      lineStyle: { color: key === "conservative" ? "#7a90b0" : key === "base" ? "#00d4ff" : "#10b981", width: key === activeScenario ? 3 : 1.5 },
      itemStyle: { color: key === "conservative" ? "#7a90b0" : key === "base" ? "#00d4ff" : "#10b981" },
    })),
  };

  // Spend pool name translation map
  const poolNameMap: Record<string, string> = {
    workspace: t("pools.workspace"),
    api_inference: t("pools.api"),
    private_sovereign: t("pools.private"),
    oem_embedded: t("pools.oem"),
    services_customization: t("pools.services"),
  };
  const getPoolName = (pool: { id: string; name: string }) =>
    poolNameMap[pool.id] ?? pool.name;

  // Revenue composition donut — translated labels
  const compCompositionKeyMap: Record<string, string> = {
    api_committed: t("charts.compositionLabels.apiCommitted"),
    kimi_code: t("charts.compositionLabels.kimiCode"),
    private_sovereign: t("charts.compositionLabels.privateSovereign"),
    oem_channel: t("charts.compositionLabels.oemChannel"),
    services: t("charts.compositionLabels.services"),
  };
  const compLabels = Object.keys(scenario.composition).map(
    (key) => compCompositionKeyMap[key] || REVENUE_COMPOSITION_LABELS[key] || key
  );
  const compValues = Object.values(scenario.composition);
  const compColors = ["#00d4ff", "#a855f7", "#10b981", "#f59e0b", "#ef4444"];
  const donutOption = {
    backgroundColor: "transparent",
    textStyle: { color: '#7a90b0' },
    tooltip: { trigger: "item", backgroundColor: '#0d1420', borderColor: 'rgba(100,140,200,0.15)', textStyle: { color: '#e8eef8' }, formatter: "{b}: {d}%" },
    legend: { type: "scroll" as const, bottom: 0, textStyle: { color: '#7a90b0', fontSize: isZH ? 9 : 10 } },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "45%"],
        data: compLabels.map((label, i) => ({
          name: label,
          value: compValues[i],
          itemStyle: { color: compColors[i] },
        })),
        label: { show: false },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.5)" } },
      },
    ],
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

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lunar-card">
          <div className="stat-label">{t("tam2026")}</div>
          <div className="stat-number" style={{ color: "var(--lunar-text-secondary)" }}>€{TAM_2026_BASE.toFixed(2)}B</div>
          <EvidenceBadge type="MODEL" formula="Sum of 5 spend pools" />
        </div>
        <div className="lunar-card">
          <div className="stat-label">{t("tam2030")}</div>
          <div className="stat-number" style={{ color: "var(--lunar-cyan)" }}>€{TAM_2030_BASE.toFixed(1)}B</div>
          <EvidenceBadge type="MODEL" formula={`CAGR ~${marketAssumptions.tamGrowthRate}%`} />
        </div>
        <div className="lunar-card">
          <div className="stat-label">{t("sam2030")}</div>
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
          {t("samFilterAssumptions")}
          <EvidenceBadge type="ASSUMPTION" className="ml-2" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {([
            { key: "targetCountryPct" as const, label: t("assumptions.targetCountryCoverage"), desc: t("assumptions.targetCountryDesc") },
            { key: "productFitPct" as const, label: t("assumptions.productMarketFit"), desc: t("assumptions.productFitDesc") },
            { key: "procurementReachPct" as const, label: t("assumptions.procurementReachLabel"), desc: t("assumptions.procurementReachDesc") },
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
          {t("spendPools")}
          <EvidenceBadge type="MODEL" className="ml-2" sourceId="S6" />
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table" aria-label="AI spend pools by year and scenario">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                <th className="text-left py-2 pr-4 font-medium" style={{ color: "var(--lunar-text-muted)" }}>{t("spendPool")}</th>
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
                    {getPoolName(pool)}
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
                <td className="py-2 pr-4 font-semibold" style={{ color: "var(--lunar-text-primary)" }}>{t("total")}</td>
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
              {t("revenuePath")}
            </h2>
            <EvidenceBadge type="ASSUMPTION" />
          </div>
          <ReactECharts option={revPathOption} style={{ height: 260 }} />
        </div>

        <div className="lunar-card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
              {t("revenueMix")} ({scenario.label} 2030)
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
            {t("tamSamSomWaterfall")}
          </h2>
          <EvidenceBadge
            type="MODEL"
            formula={`SAM = TAM × ${marketAssumptions.targetCountryPct}% × ${marketAssumptions.productFitPct}% × ${marketAssumptions.procurementReachPct}% = €${sam.toFixed(2)}B`}
          />
        </div>
        <div className="flex gap-4 mb-4 text-xs" style={{ color: "var(--lunar-text-muted)" }}>
          <span style={{ color: "var(--lunar-cyan)" }}>■ {t("marketPool")}</span>
          <span style={{ color: "#ef4444" }}>■ {t("filteredOut")}</span>
          <span style={{ color: "var(--lunar-green)" }}>■ {t("serviceable")}</span>
        </div>
        <ReactECharts option={waterfallOption} style={{ height: 240 }} />
      </div>

      <div className="text-xs rounded-lg p-3" style={{ background: "var(--lunar-elevated)", color: "var(--lunar-text-muted)", border: "1px solid var(--lunar-border-subtle)" }}>
        <strong style={{ color: "var(--lunar-amber)" }}>{t("methodologyNote")}:</strong> TAM figures are analyst estimates based on Eurostat enterprise ICT spend data (S6) and EU AI adoption research (S15), adjusted for AI-specific segments. CAGR assumptions reflect observed cloud and AI market growth trajectories. All figures are working assumptions — not audited forecasts. SAM filter parameters are editable above.
      </div>
    </div>
  );
}
