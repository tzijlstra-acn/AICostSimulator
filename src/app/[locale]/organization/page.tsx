"use client";

import { useTranslations } from "next-intl";
import {
  HEADCOUNT_PLAN,
  FUNCTIONAL_SPLIT,
  ROLES,
  SKILL_GAP_HEATMAP,
  TEAM_COST_ASSUMPTIONS,
} from "@/data/organization";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import dynamic from "next/dynamic";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });

export default function OrganizationPage() {
  const t = useTranslations("organization");

  const headcountPhases = [
    { label: "H1 2027", low: HEADCOUNT_PLAN.h1_2027.low, high: HEADCOUNT_PLAN.h1_2027.high },
    { label: "End 2028", low: HEADCOUNT_PLAN.end_2028.low, high: HEADCOUNT_PLAN.end_2028.high },
    { label: "End 2029", low: HEADCOUNT_PLAN.end_2029.low, high: HEADCOUNT_PLAN.end_2029.high },
  ];

  const funcColors = ["#00d4ff", "#a855f7", "#10b981", "#f59e0b", "#7a90b0"];
  const funcKeys = Object.keys(FUNCTIONAL_SPLIT) as (keyof typeof FUNCTIONAL_SPLIT)[];

  const funcChartOption = {
    backgroundColor: "transparent",
    textStyle: { color: '#7a90b0' },
    tooltip: { trigger: "item", backgroundColor: '#0d1420', borderColor: 'rgba(100,140,200,0.15)', textStyle: { color: '#e8eef8' }, formatter: "{b}: {d}%" },
    legend: { textStyle: { color: '#7a90b0' } },
    series: [{
      type: "pie",
      radius: ["40%", "70%"],
      data: funcKeys.map((k, i) => ({
        name: FUNCTIONAL_SPLIT[k].label,
        value: FUNCTIONAL_SPLIT[k].pct,
        itemStyle: { color: funcColors[i] },
      })),
      label: { color: '#7a90b0', fontSize: 10 },
    }],
  };

  const PRIORITY_COLORS: Record<string, string> = {
    critical: "var(--lunar-red)",
    high: "var(--lunar-amber)",
    medium: "var(--lunar-cyan)",
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
          {t("title")}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
          {t("subtitle")}
          <EvidenceBadge type="ASSUMPTION" className="ml-2" reasoning="Headcount ranges are planning estimates, not commitments" />
        </p>
      </div>

      {/* Headcount KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {headcountPhases.map((p) => (
          <div key={p.label} className="lunar-card text-center">
            <div className="stat-label">{p.label}</div>
            <div className="stat-number" style={{ color: "var(--lunar-cyan)" }}>
              {p.low}–{p.high}
            </div>
            <div className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>headcount</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Functional split chart */}
        <div className="lunar-card">
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--lunar-text-primary)" }}>
            Functional Allocation
          </h2>
          <ReactECharts option={funcChartOption} style={{ height: 240 }} />
          <div className="space-y-1 mt-2">
            {funcKeys.map((k, i) => (
              <div key={k} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: funcColors[i] }} aria-hidden="true" />
                  <span style={{ color: "var(--lunar-text-secondary)" }}>{FUNCTIONAL_SPLIT[k].label}</span>
                </div>
                <span className="font-mono" style={{ color: "var(--lunar-text-primary)" }}>{FUNCTIONAL_SPLIT[k].pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill gap heatmap */}
        <div className="lunar-card">
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--lunar-text-primary)" }}>
            Skill Gap Heatmap
          </h2>
          <div className="space-y-2">
            {SKILL_GAP_HEATMAP.map((item) => (
              <div key={item.skill} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>{item.skill}</span>
                  <span
                    className="text-xs font-mono"
                    style={{ color: item.priority === "critical" ? "var(--lunar-red)" : item.priority === "high" ? "var(--lunar-amber)" : "var(--lunar-cyan)" }}
                  >
                    gap: {item.gap}/5
                  </span>
                </div>
                <div className="flex gap-1 h-1.5">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <div
                      key={v}
                      className="flex-1 rounded-sm"
                      style={{
                        background: v <= item.current ? "var(--lunar-green)" : v <= item.target ? "rgba(239,68,68,0.4)" : "var(--lunar-border-subtle)",
                      }}
                      aria-label={`Level ${v}: ${v <= item.current ? "current" : v <= item.target ? "gap" : "not needed"}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-3 text-xs">
            <span className="flex items-center gap-1" style={{ color: "var(--lunar-text-muted)" }}>
              <span className="w-3 h-1.5 rounded-sm" style={{ background: "var(--lunar-green)" }} /> Current
            </span>
            <span className="flex items-center gap-1" style={{ color: "var(--lunar-text-muted)" }}>
              <span className="w-3 h-1.5 rounded-sm" style={{ background: "rgba(239,68,68,0.4)" }} /> Gap
            </span>
          </div>
        </div>
      </div>

      {/* Priority Roles */}
      <div>
        <h2 className="section-header mb-4">Priority Hires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ROLES.map((role) => (
            <div
              key={role.id}
              className="lunar-card"
              style={{ borderLeft: `3px solid ${PRIORITY_COLORS[role.priority]}` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
                    {role.title}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-xs px-1.5 py-0.5 rounded capitalize"
                      style={{ background: `${PRIORITY_COLORS[role.priority]}15`, color: PRIORITY_COLORS[role.priority] }}
                    >
                      {role.priority}
                    </span>
                    <span className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>{role.hiringPhase}</span>
                  </div>
                </div>
                <div className="text-xs text-right" style={{ color: "var(--lunar-text-muted)" }}>
                  <div>{role.locationRequirement}</div>
                  <div>→ {role.reportingTo}</div>
                </div>
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--lunar-text-secondary)" }}>
                {role.rationale}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Cost assumptions */}
      <div className="lunar-card">
        <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--lunar-text-primary)" }}>
          Team Cost Assumptions
          <EvidenceBadge type="ASSUMPTION" className="ml-2" reasoning="Fully-loaded cost estimates for planning only — market rates vary by location and seniority" />
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-2 rounded" style={{ background: "var(--lunar-elevated)" }}>
            <div className="stat-label">On-cost multiplier</div>
            <div className="font-mono" style={{ color: "var(--lunar-cyan)" }}>{TEAM_COST_ASSUMPTIONS.onCostMultiplier}×</div>
          </div>
          <div className="p-2 rounded" style={{ background: "var(--lunar-elevated)" }}>
            <div className="stat-label">Office / head / year</div>
            <div className="font-mono" style={{ color: "var(--lunar-cyan)" }}>€{TEAM_COST_ASSUMPTIONS.officeCostPerHeadPerYear.toLocaleString()}</div>
          </div>
          <div className="p-2 rounded" style={{ background: "var(--lunar-elevated)" }}>
            <div className="stat-label">T&E / head / year</div>
            <div className="font-mono" style={{ color: "var(--lunar-cyan)" }}>€{TEAM_COST_ASSUMPTIONS.travelAndExpensePerHeadPerYear.toLocaleString()}</div>
          </div>
          {Object.entries(TEAM_COST_ASSUMPTIONS.avgSalaryEUR).map(([fn, sal]) => (
            <div key={fn} className="p-2 rounded" style={{ background: "var(--lunar-elevated)" }}>
              <div className="stat-label capitalize">{fn.replace(/_/g, " ")} avg salary</div>
              <div className="font-mono" style={{ color: "var(--lunar-cyan)" }}>€{(sal / 1000).toFixed(0)}K</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
