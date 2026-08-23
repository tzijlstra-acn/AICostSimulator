"use client";

import { useTranslations } from "next-intl";
import { useAppStore } from "@/store";
import {
  REVENUE_LINES,
  DEFAULT_FINANCIALS_ASSUMPTIONS,
  calcSalesCapacity,
  calcTotalCost,
  REVENUE_BRIDGE_2027,
} from "@/data/financials";
import { REVENUE_SCENARIOS } from "@/data/market";
import { HEADCOUNT_PLAN } from "@/data/organization";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function FinancialsPage() {
  const { activeScenario, financialsAssumptions, setFinancialsAssumptions, resetFinancialsAssumptions } = useAppStore();
  const scenario = REVENUE_SCENARIOS[activeScenario];
  const t = useTranslations("financials");

  const capacity = calcSalesCapacity(financialsAssumptions);
  const midHeadcount = Math.round((HEADCOUNT_PLAN.h1_2027.low + HEADCOUNT_PLAN.h1_2027.high) / 2);
  const costs2027 = calcTotalCost(scenario.path[2027] * 1_000_000, midHeadcount, financialsAssumptions);

  // Revenue bridge chart
  const bridgeOption = {
    backgroundColor: "transparent",
    textStyle: { color: '#7a90b0' },
    tooltip: { trigger: "axis", backgroundColor: '#0d1420', borderColor: 'rgba(100,140,200,0.15)', textStyle: { color: '#e8eef8' } },
    grid: { left: 60, right: 20, top: 20, bottom: 40 },
    xAxis: {
      type: "category",
      data: Object.keys(scenario.path),
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
    series: [
      {
        type: "bar",
        data: Object.values(scenario.path).map((v) => ({
          value: v,
          itemStyle: {
            color: "rgba(0,212,255,0.6)",
            borderRadius: [4, 4, 0, 0],
          },
        })),
        barWidth: "40%",
        label: { show: true, position: "top", formatter: (p: { value: number }) => `€${p.value}M`, color: "var(--lunar-text-secondary)", fontSize: 10 },
      },
    ],
  };

  // Revenue mix chart by line
  const revColors = ["#00d4ff", "#a855f7", "#10b981", "#f59e0b", "#ef4444", "#06b6d4", "#8b5cf6", "#7a90b0"];
  const mixOption = {
    backgroundColor: "transparent",
    textStyle: { color: '#7a90b0' },
    tooltip: { trigger: "item", backgroundColor: '#0d1420', borderColor: 'rgba(100,140,200,0.15)', textStyle: { color: '#e8eef8' }, formatter: "{b}: {d}%" },
    legend: { textStyle: { color: '#7a90b0' } },
    series: [{
      type: "pie",
      radius: ["40%", "70%"],
      data: REVENUE_LINES.map((line, i) => ({
        name: line.label,
        value: financialsAssumptions[`${line.id.replace(/-/g, "_")}Pct` as keyof typeof financialsAssumptions] || line.defaultPct,
        itemStyle: { color: revColors[i] },
      })),
      label: { color: '#e8eef8', fontSize: 11, formatter: '{b}\n{d}%' },
      labelLine: { lineStyle: { color: '#4a5a7a' } },
    }],
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
            {t("title")}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
            {t("subtitle")}
            <EvidenceBadge type="ASSUMPTION" className="ml-2" />
          </p>
        </div>
        <button
          onClick={resetFinancialsAssumptions}
          className="px-3 py-1.5 rounded-lg text-xs"
          style={{ background: "var(--lunar-elevated)", border: "1px solid var(--lunar-border-subtle)", color: "var(--lunar-text-muted)" }}
        >
          Reset to defaults
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lunar-card">
          <div className="stat-label">Scenario</div>
          <div className="stat-number" style={{ color: "var(--lunar-cyan)" }}>{scenario.label}</div>
          <div className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>2030 target: €{scenario.revenue2030}M</div>
        </div>
        <div className="lunar-card">
          <div className="stat-label">Effective AEs (2027)</div>
          <div className="stat-number" style={{ color: "var(--lunar-violet)" }}>{capacity.effectiveAEs}</div>
          <div className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>After {financialsAssumptions.aeRampMonths}mo ramp</div>
        </div>
        <div className="lunar-card">
          <div className="stat-label">Projected ARR 2027</div>
          <div className="stat-number" style={{ color: "var(--lunar-green)" }}>€{(capacity.totalARR / 1_000_000).toFixed(1)}M</div>
          <div className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>incl. {financialsAssumptions.partnerContributionPct}% partner</div>
        </div>
        <div className="lunar-card">
          <div className="stat-label">Est. Total Cost 2027</div>
          <div className="stat-number" style={{ color: "var(--lunar-amber)" }}>€{(costs2027.total / 1_000_000).toFixed(1)}M</div>
          <div className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>All cost categories (assumption)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue path */}
        <div className="lunar-card">
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--lunar-text-primary)" }}>
            {scenario.label} Revenue Path
          </h2>
          <ReactECharts option={bridgeOption} style={{ height: 220 }} />
        </div>

        {/* Revenue mix */}
        <div className="lunar-card">
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--lunar-text-primary)" }}>
            Revenue Mix (editable)
          </h2>
          <ReactECharts option={mixOption} style={{ height: 220 }} />
        </div>
      </div>

      {/* Sales Capacity Inputs */}
      <div className="lunar-card">
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--lunar-text-primary)" }}>
          Sales Capacity Model
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { key: "aeCount2027" as const, label: "AEs (2027)", min: 1, max: 20, step: 1 },
            { key: "aeRampMonths" as const, label: "Ramp months", min: 3, max: 18, step: 1 },
            { key: "quotaPerAeEUR" as const, label: "Quota / AE (€)", min: 200000, max: 2000000, step: 100000 },
            { key: "attainmentPct" as const, label: "Attainment %", min: 30, max: 120, step: 5 },
            { key: "winRate" as const, label: "Win rate %", min: 5, max: 60, step: 5 },
            { key: "avgSalesCycleDays" as const, label: "Sales cycle (days)", min: 30, max: 365, step: 15 },
            { key: "pipelineCoverage" as const, label: "Pipeline coverage", min: 2, max: 8, step: 0.5 },
            { key: "avgAcvEUR" as const, label: "Avg ACV (€)", min: 50000, max: 1000000, step: 50000 },
            { key: "renewalRate" as const, label: "Renewal rate %", min: 50, max: 100, step: 5 },
            { key: "expansionRate" as const, label: "Expansion rate %", min: 100, max: 200, step: 5 },
            { key: "partnerContributionPct" as const, label: "Partner contribution %", min: 0, max: 60, step: 5 },
          ].map((field) => (
            <div key={field.key}>
              <div className="flex justify-between mb-1">
                <label className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>{field.label}</label>
                <span className="text-xs font-mono" style={{ color: "var(--lunar-cyan)" }}>
                  {typeof financialsAssumptions[field.key] === "number"
                    ? financialsAssumptions[field.key] >= 100000
                      ? `€${(financialsAssumptions[field.key] / 1000).toFixed(0)}K`
                      : financialsAssumptions[field.key]
                    : ""}
                </span>
              </div>
              <input
                type="range"
                min={field.min}
                max={field.max}
                step={field.step}
                value={financialsAssumptions[field.key] as number}
                onChange={(e) => setFinancialsAssumptions({ [field.key]: Number(e.target.value) })}
                className="w-full accent-cyan-400"
                aria-label={field.label}
              />
            </div>
          ))}
        </div>

        {/* Capacity output */}
        <div
          className="mt-4 pt-4 grid grid-cols-2 md:grid-cols-3 gap-3"
          style={{ borderTop: "1px solid var(--lunar-border-subtle)" }}
        >
          <div className="p-2 rounded" style={{ background: "var(--lunar-elevated)" }}>
            <div className="stat-label">Direct ARR</div>
            <div className="text-base font-bold font-mono" style={{ color: "var(--lunar-cyan)" }}>
              €{(capacity.directARR / 1_000_000).toFixed(1)}M
            </div>
          </div>
          <div className="p-2 rounded" style={{ background: "var(--lunar-elevated)" }}>
            <div className="stat-label">Partner ARR</div>
            <div className="text-base font-bold font-mono" style={{ color: "var(--lunar-violet)" }}>
              €{(capacity.partnerARR / 1_000_000).toFixed(1)}M
            </div>
          </div>
          <div className="p-2 rounded" style={{ background: "var(--lunar-elevated)" }}>
            <div className="stat-label">Pipeline Required</div>
            <div className="text-base font-bold font-mono" style={{ color: "var(--lunar-amber)" }}>
              €{(capacity.pipelineRequired / 1_000_000).toFixed(1)}M
            </div>
          </div>
        </div>
      </div>

      {/* 2027 Revenue Bridge */}
      <div className="lunar-card" style={{ borderLeft: "4px solid rgba(245,158,11,0.6)" }}>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
            2027 Revenue Bridge
          </h2>
          <EvidenceBadge type="ASSUMPTION" reasoning="Model assumption — not a committed forecast. Board approval required before treating as plan." />
        </div>
        <p className="text-xs mb-4" style={{ color: "var(--lunar-amber)" }}>
          {REVENUE_BRIDGE_2027.note}
        </p>
        <div className="space-y-2">
          {([
            REVENUE_BRIDGE_2027.aeDirectARR,
            REVENUE_BRIDGE_2027.plgSelfServe,
            REVENUE_BRIDGE_2027.partnerLed,
            REVENUE_BRIDGE_2027.committedConsumption,
            REVENUE_BRIDGE_2027.enterprisePilotConversions,
          ] as Array<{ label: string; value: number; unit: string; badge: "MODEL" | "ASSUMPTION"; note?: string }>).map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 rounded-lg"
              style={{ background: "var(--lunar-elevated)", border: "1px solid var(--lunar-border-subtle)" }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>{item.label}</span>
                  <EvidenceBadge type={item.badge} />
                </div>
                {item.note && (
                  <div className="text-xs mt-0.5" style={{ color: "var(--lunar-text-muted)" }}>{item.note}</div>
                )}
              </div>
              <span className="text-sm font-bold font-mono ml-3 flex-shrink-0" style={{ color: "var(--lunar-amber)" }}>
                {item.unit}{item.value.toFixed(1)}
              </span>
            </div>
          ))}
          {/* Total row */}
          <div
            className="flex items-center justify-between p-3 rounded-lg mt-2"
            style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)" }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold" style={{ color: "var(--lunar-text-primary)" }}>{REVENUE_BRIDGE_2027.total.label}</span>
                <EvidenceBadge type={REVENUE_BRIDGE_2027.total.badge} />
              </div>
              {REVENUE_BRIDGE_2027.total.note && (
                <div className="text-xs mt-0.5" style={{ color: "var(--lunar-text-muted)" }}>{REVENUE_BRIDGE_2027.total.note}</div>
              )}
            </div>
            <span className="text-base font-bold font-mono ml-3 flex-shrink-0" style={{ color: "var(--lunar-cyan)" }}>
              {REVENUE_BRIDGE_2027.total.unit}{REVENUE_BRIDGE_2027.total.value.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Cost assumptions */}
      <div className="lunar-card">
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--lunar-text-primary)" }}>
          Cost Assumptions
          <EvidenceBadge type="ASSUMPTION" className="ml-2" reasoning={t("costs.note")} />
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { key: "headcountCostEURPerHead" as const, label: "Fully-loaded cost / head (€)", min: 80000, max: 300000, step: 10000 },
            { key: "infrastructurePctOfRevenue" as const, label: "Infrastructure % of revenue", min: 5, max: 80, step: 5 },
            { key: "complianceCostEURPerYear" as const, label: "Compliance cost / year (€)", min: 100000, max: 10000000, step: 100000 },
            { key: "securityCostEURPerYear" as const, label: "Security cost / year (€)", min: 100000, max: 5000000, step: 100000 },
            { key: "smPctOfRevenue" as const, label: "S&M % of revenue", min: 5, max: 60, step: 5 },
            { key: "partnerMarginPct" as const, label: "Partner margin %", min: 10, max: 40, step: 5 },
            { key: "customerSupportPctOfRevenue" as const, label: "Customer support % of rev", min: 2, max: 20, step: 1 },
          ].map((field) => (
            <div key={field.key}>
              <div className="flex justify-between mb-1">
                <label className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>{field.label}</label>
                <span className="text-xs font-mono" style={{ color: "var(--lunar-amber)" }}>
                  {(financialsAssumptions[field.key] as number) >= 100000
                    ? `€${((financialsAssumptions[field.key] as number) / 1_000_000).toFixed(1)}M`
                    : `${financialsAssumptions[field.key]}${field.key.includes("Pct") || field.key.includes("pct") ? "%" : ""}`}
                </span>
              </div>
              <input
                type="range"
                min={field.min}
                max={field.max}
                step={field.step}
                value={financialsAssumptions[field.key] as number}
                onChange={(e) => setFinancialsAssumptions({ [field.key]: Number(e.target.value) })}
                className="w-full"
                style={{ accentColor: "var(--lunar-amber)" }}
                aria-label={field.label}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
