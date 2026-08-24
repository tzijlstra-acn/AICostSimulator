"use client";

import { useAppStore } from "@/store";
import { REVENUE_SCENARIOS, TAM_2030_BASE, calcSAM } from "@/data/market";
import { COUNTRIES, COUNTRY_ID_TO_ISO2 } from "@/data/countries";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { WORKSTREAMS } from "@/data/compliance";
import { STRATEGIC_THESIS, COMPETITIVE_MOAT } from "@/data/strategy";
import { RISKS } from "@/data/risks";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { useTranslations, useLocale } from "next-intl";
import dynamic from "next/dynamic";
import { AlertTriangle, CheckCircle2, Clock, TrendingUp, Globe2, ShieldCheck, ArrowRight, Shield, HelpCircle } from "lucide-react";
import { Link } from "@/lib/navigation";

const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });
const EuropeDecisionMap = dynamic(
  () => import("@/components/maps/EuropeDecisionMap").then(m => ({ default: m.EuropeDecisionMap })),
  { ssr: false }
);

function StatCard({
  label,
  value,
  sub,
  evidenceType,
  sourceId,
  formula,
  color = "var(--lunar-cyan)",
}: {
  label: string;
  value: string;
  sub?: string;
  evidenceType: "FACT" | "MODEL" | "ASSUMPTION";
  sourceId?: string;
  formula?: string;
  color?: string;
}) {
  return (
    <div className="lunar-card flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="stat-label">{label}</span>
        <EvidenceBadge type={evidenceType} sourceId={sourceId} formula={formula} />
      </div>
      <div className="stat-number" style={{ color }}>
        {value}
      </div>
      {sub && (
        <div className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

const VIEW_MODE_COLORS = {
  board: 'var(--lunar-cyan)',
  operator: 'var(--lunar-violet)',
  compliance: 'var(--lunar-amber)',
  sales: 'var(--lunar-green)',
} as const;

export default function CockpitPage() {
  const { activeScenario, marketAssumptions, complianceStatuses, viewMode } = useAppStore();
  const t = useTranslations("cockpit");
  const tReg = useTranslations("regulation");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const scenario = REVENUE_SCENARIOS[activeScenario];
  const sam = calcSAM(TAM_2030_BASE, {
    targetCountryPct: marketAssumptions.targetCountryPct / 100,
    productFitPct: marketAssumptions.productFitPct / 100,
    procurementReachPct: marketAssumptions.procurementReachPct / 100,
  });

  const top3Countries = COUNTRIES.slice(0, 3);

  // Compliance status counts
  const statusCounts = Object.values(complianceStatuses).reduce(
    (acc, s) => {
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const pendingCount = (statusCounts.pending || 0) + (statusCounts.in_progress || 0);
  const blockedCount = statusCounts.blocked || 0;

  // Revenue scenario chart
  const years = ["2027", "2028", "2029", "2030"];
  const chartOption = {
    backgroundColor: "transparent",
    textStyle: { color: '#7a90b0' },
    tooltip: { trigger: "axis", backgroundColor: '#0d1420', borderColor: 'rgba(100,140,200,0.15)', textStyle: { color: '#e8eef8' } },
    legend: {
      data: [tCommon("scenarios.conservative"), tCommon("scenarios.base"), tCommon("scenarios.upside")],
      textStyle: { color: '#7a90b0', fontSize: 11 },
      bottom: 0,
    },
    grid: { left: 60, right: 20, top: 20, bottom: 40 },
    xAxis: {
      type: "category",
      data: years,
      axisLabel: { color: '#7a90b0', fontSize: 11 },
      axisLine: { lineStyle: { color: '#4a5a7a' } },
      splitLine: { lineStyle: { color: '#1a2438' } },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: '#7a90b0',
        fontSize: 11,
        formatter: (v: number) => `€${v}M`,
      },
      axisLine: { lineStyle: { color: '#4a5a7a' } },
      splitLine: { lineStyle: { color: '#1a2438' } },
    },
    series: [
      {
        name: tCommon("scenarios.conservative"),
        type: "line",
        smooth: true,
        data: Object.values(REVENUE_SCENARIOS.conservative.path),
        lineStyle: { color: "#7a90b0", width: 2 },
        itemStyle: { color: "#7a90b0" },
        areaStyle: { color: "rgba(122,144,176,0.05)" },
      },
      {
        name: tCommon("scenarios.base"),
        type: "line",
        smooth: true,
        data: Object.values(REVENUE_SCENARIOS.base.path),
        lineStyle: { color: "#00d4ff", width: 2.5 },
        itemStyle: { color: "#00d4ff" },
        areaStyle: { color: "rgba(0,212,255,0.07)" },
      },
      {
        name: tCommon("scenarios.upside"),
        type: "line",
        smooth: true,
        data: Object.values(REVENUE_SCENARIOS.upside.path),
        lineStyle: { color: "#10b981", width: 2 },
        itemStyle: { color: "#10b981" },
        areaStyle: { color: "rgba(16,185,129,0.05)" },
      },
    ],
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Personal attribution banner */}
      <div
        className="flex items-start gap-4 p-5 rounded-xl"
        style={{
          background: 'rgba(0,212,255,0.05)',
          border: '1px solid rgba(0,212,255,0.12)',
          borderLeft: '4px solid var(--lunar-cyan)',
        }}
      >
        <div className="flex-1">
          <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--lunar-cyan)', opacity: 0.8 }}>
            {t("personalBanner.label")}
          </div>
          <div className="text-sm font-bold mb-1" style={{ color: 'var(--lunar-text-primary)' }}>
            Thomas Zijlstra → Moonshot AI · August 2026
          </div>
          <div className="text-xs leading-relaxed" style={{ color: 'var(--lunar-text-secondary)' }}>
            {t("personalBanner.body")}
          </div>
        </div>
      </div>

      {/* View Mode Banner */}
      {viewMode !== 'board' && (
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm"
          style={{ background: `${VIEW_MODE_COLORS[viewMode]}10`, border: `1px solid ${VIEW_MODE_COLORS[viewMode]}30` }}>
          <span className="font-semibold text-xs" style={{ color: VIEW_MODE_COLORS[viewMode] }}>
            {tCommon(`viewMode.${viewMode}`)}
          </span>
          <span className="text-xs" style={{ color: 'var(--lunar-text-secondary)' }}>
            {t(`viewModeDesc.${viewMode}`)}
          </span>
        </div>
      )}

      {/* Verdict Banner */}
      <div
        className="rounded-xl px-6 py-4 flex items-center gap-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(168,85,247,0.06) 100%)",
          border: "1px solid rgba(0,212,255,0.2)",
        }}
        role="banner"
      >
        <div
          className="text-4xl font-mono"
          style={{ color: "var(--lunar-cyan)" }}
          aria-hidden="true"
        >
          ◎
        </div>
        <div>
          <div
            className="text-base font-bold tracking-wide"
            style={{ color: "var(--lunar-text-primary)" }}
          >
            {t("strategicVerdict")}
          </div>
          <div className="text-xs mb-2" style={{ color: 'var(--lunar-text-muted)' }}>{t("myRecommendation")}</div>
          <div
            className="text-2xl font-bold leading-snug"
            style={{
              background: 'linear-gradient(90deg, var(--lunar-cyan) 0%, var(--lunar-violet) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            &ldquo;{STRATEGIC_THESIS.headline}&rdquo;
          </div>
          <div
            className="text-sm mt-1"
            style={{ color: "var(--lunar-text-secondary)" }}
          >
            {STRATEGIC_THESIS.subheadline}
          </div>
        </div>
      </div>

      {/* Strategic View Callout */}
      <div className="p-5 rounded-xl" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.15)", borderLeft: "4px solid var(--lunar-cyan)" }}>
        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--lunar-cyan)" }}>
          {t("strategicView.title")}
        </div>
        <p className="text-sm italic mb-4" style={{ color: "var(--lunar-text-secondary)" }}>
          &ldquo;{t("strategicView.note")}&rdquo;
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-1">
            <div className="text-xs font-semibold" style={{ color: "var(--lunar-cyan)" }}>{t("strategicView.h1Label")}</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>{t("strategicView.h1Body")}</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold" style={{ color: "#a855f7" }}>{t("strategicView.h2Label")}</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>{t("strategicView.h2Body")}</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold" style={{ color: "var(--lunar-amber)" }}>{t("strategicView.h3Label")}</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>{t("strategicView.h3Body")}</p>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/market" className="hover:ring-1 hover:ring-cyan-400/30 transition-all cursor-pointer rounded-xl block">
          <StatCard
            label={t("kpis.euTam2030")}
            value={`€${TAM_2030_BASE.toFixed(1)}B`}
            sub={t("kpis.tam2030Sub")}
            evidenceType="MODEL"
            formula="workspace + api + private + oem + services"
            color="var(--lunar-cyan)"
          />
        </Link>
        <Link href="/countries" className="hover:ring-1 hover:ring-cyan-400/30 transition-all cursor-pointer rounded-xl block">
          <StatCard
            label={t("kpis.euSam2030")}
            value={`€${sam.toFixed(1)}B`}
            sub={`TAM × ${marketAssumptions.targetCountryPct}% × ${marketAssumptions.productFitPct}% × ${marketAssumptions.procurementReachPct}%`}
            evidenceType="MODEL"
            formula="TAM × country_pct × product_fit × procurement_reach"
            color="var(--lunar-violet)"
          />
        </Link>
        <Link href="/financials" className="hover:ring-1 hover:ring-cyan-400/30 transition-all cursor-pointer rounded-xl block">
          <StatCard
            label={`${scenario.label} Revenue 2030`}
            value={`€${scenario.revenue2030}M`}
            sub={`${scenario.samShare}% of SAM — ${activeScenario} scenario`}
            evidenceType="ASSUMPTION"
            formula="SAM × market_share_pct"
            color={activeScenario === "conservative" ? "#7a90b0" : activeScenario === "base" ? "var(--lunar-cyan)" : "var(--lunar-green)"}
          />
        </Link>
        <Link href="/roadmap" className="hover:ring-1 hover:ring-cyan-400/30 transition-all cursor-pointer rounded-xl block">
          <StatCard
            label={t("kpis.marketShare2030")}
            value="4.1%"
            sub="Of €13.3B SAM — base scenario"
            evidenceType="ASSUMPTION"
            color="var(--lunar-amber)"
          />
        </Link>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 lunar-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
              {t("revenueScenarios")}
            </h2>
            <EvidenceBadge type="MODEL" formula="Revenue = SAM × market_share × scenario_factor" />
          </div>
          <ReactECharts option={chartOption} style={{ height: 280 }} />
        </div>

        {/* Compliance Status */}
        <div className="lunar-card">
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--lunar-text-primary)" }}>
            {t("complianceStatus")}
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} style={{ color: "var(--lunar-green)" }} aria-hidden="true" />
                <span className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>{tReg("done")}</span>
              </div>
              <span className="font-mono text-sm" style={{ color: "var(--lunar-green)" }}>
                {statusCounts.done || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={14} style={{ color: "var(--lunar-amber)" }} aria-hidden="true" />
                <span className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>{tReg("inProgress")}</span>
              </div>
              <span className="font-mono text-sm" style={{ color: "var(--lunar-amber)" }}>
                {statusCounts.in_progress || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={14} style={{ color: "var(--lunar-text-muted)" }} aria-hidden="true" />
                <span className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>{tReg("pending")}</span>
              </div>
              <span className="font-mono text-sm" style={{ color: "var(--lunar-text-muted)" }}>
                {statusCounts.pending || 0}
              </span>
            </div>
            {blockedCount > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} style={{ color: "var(--lunar-red)" }} aria-hidden="true" />
                  <span className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>{tReg("blocked")}</span>
                </div>
                <span className="font-mono text-sm" style={{ color: "var(--lunar-red)" }}>
                  {blockedCount}
                </span>
              </div>
            )}
          </div>
          <div
            className="mt-4 pt-4 text-xs"
            style={{
              borderTop: "1px solid var(--lunar-border-subtle)",
              color: "var(--lunar-text-muted)",
            }}
          >
            {t("workstreamsNeedAttention", { count: pendingCount })}
          </div>
          <Link
            href="/regulation"
            className="mt-3 flex items-center gap-1 text-xs"
            style={{ color: "var(--lunar-cyan)" }}
          >
            {t("viewAllWorkstreams")} <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Top Countries + Strategic Principles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Countries */}
        <div className="lunar-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
              <Globe2 size={14} className="inline mr-2" aria-hidden="true" />
              {t("priorityCountries")}
            </h2>
            <Link href="/countries" className="text-xs" style={{ color: "var(--lunar-cyan)" }}>
              {t("priorityMarketsLink")}
            </Link>
          </div>
          <div className="space-y-3">
            {top3Countries.map((c) => (
              <Link
                key={c.id}
                href={`/countries?country=${c.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                style={{ border: "1px solid var(--lunar-border-subtle)" }}
              >
                <FlagIcon iso2={COUNTRY_ID_TO_ISO2[c.id] ?? c.id.toUpperCase()} size={28} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium" style={{ color: "var(--lunar-text-primary)" }}>
                      {c.name}
                    </span>
                    <span
                      className="text-xs font-mono px-1.5 py-0.5 rounded"
                      style={{
                        background: "rgba(0,212,255,0.1)",
                        color: "var(--lunar-cyan)",
                      }}
                    >
                      {c.score}
                    </span>
                  </div>
                  <div className="text-xs truncate" style={{ color: "var(--lunar-text-muted)" }}>
                    {c.role}
                  </div>
                  <div className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
                    {c.entryMode}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Strategic Principles */}
        <div className="lunar-card">
          <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--lunar-text-primary)" }}>
            {t("strategicPrinciples")}
          </h2>
          <div className="space-y-3">
            {STRATEGIC_THESIS.principles.map((p) => (
              <div key={p.number} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                  style={{
                    background: "rgba(0,212,255,0.1)",
                    color: "var(--lunar-cyan)",
                    border: "1px solid rgba(0,212,255,0.2)",
                  }}
                  aria-hidden="true"
                >
                  {p.number}
                </span>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
                    {p.title}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--lunar-text-secondary)" }}>
                    {p.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Europe Map Section */}
      <div className="lunar-card">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
              {t("europeMapTitle")}
            </h2>
            <p className="text-xs mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
              {t("europeMapDesc")}
            </p>
          </div>
          <Link href="/countries" className="text-xs flex items-center gap-1" style={{ color: "var(--lunar-cyan)" }}>
            {t("openCountryNavigator")} <ArrowRight size={12} />
          </Link>
        </div>
        <div className="w-full">
          <EuropeDecisionMap
            layer="priority"
            height={300}
            showControls={false}
            compact={true}
          />
        </div>
      </div>

      {/* Competitive Position / Strategic Moat */}
      <div
        className="lunar-card"
        style={{ borderLeft: "4px solid #8b5cf6" }}
      >
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)" }}
          >
            <Shield size={16} style={{ color: "#8b5cf6" }} aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h2 className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
                {t("competitivePosition")}
              </h2>
              <EvidenceBadge type="RECOMMENDATION" reasoning="Strategic positioning judgment — not a validated external benchmark." />
            </div>
            <p className="text-sm font-medium leading-snug" style={{ color: "#8b5cf6" }}>
              {COMPETITIVE_MOAT.headline}
            </p>
          </div>
        </div>
        <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--lunar-text-secondary)" }}>
          {COMPETITIVE_MOAT.body}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          {COMPETITIVE_MOAT.moatComponents.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-2.5 rounded-lg text-xs"
              style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)" }}
            >
              <span style={{ color: "#8b5cf6", flexShrink: 0 }}>▸</span>
              <span style={{ color: "var(--lunar-text-secondary)" }}>{item}</span>
            </div>
          ))}
        </div>
        <div
          className="flex items-start gap-2 p-3 rounded-lg mb-3 text-xs"
          style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)" }}
        >
          <AlertTriangle size={13} style={{ color: "var(--lunar-amber)", flexShrink: 0, marginTop: 1 }} aria-hidden="true" />
          <div>
            <span className="font-bold" style={{ color: "var(--lunar-amber)" }}>{t("notMoat")} </span>
            <span style={{ color: "var(--lunar-text-secondary)" }}>{COMPETITIVE_MOAT.notMoat}</span>
          </div>
        </div>
        <div
          className="flex items-start gap-2 p-3 rounded-lg text-xs"
          style={{ background: "rgba(168,85,247,0.07)", border: "1px solid rgba(168,85,247,0.2)" }}
        >
          <HelpCircle size={13} style={{ color: "#a855f7", flexShrink: 0, marginTop: 1 }} aria-hidden="true" />
          <div>
            <span className="font-bold" style={{ color: "#a855f7" }}>{t("openQuestionLabel")} </span>
            <span style={{ color: "var(--lunar-text-secondary)" }}>{COMPETITIVE_MOAT.openQuestion}</span>
          </div>
        </div>
      </div>

      {/* Decisions Required */}
      <div className="lunar-card">
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--lunar-text-primary)" }}>
          <AlertTriangle size={14} className="inline mr-2" style={{ color: "var(--lunar-amber)" }} aria-hidden="true" />
          {t("immediateDecisions")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {STRATEGIC_THESIS.immediateDecisions.map((d) => (
            <div
              key={d.priority}
              className="p-3 rounded-lg"
              style={{
                background: "var(--lunar-elevated)",
                border: "1px solid var(--lunar-border-subtle)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-mono px-1.5 py-0.5 rounded"
                  style={{
                    background: "rgba(245,158,11,0.1)",
                    color: "var(--lunar-amber)",
                  }}
                >
                  #{d.priority}
                </span>
                <span className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>
                  {d.deadline}
                </span>
              </div>
              <div className="text-sm font-medium" style={{ color: "var(--lunar-text-primary)" }}>
                {d.decision}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
                {t("owner")}: {d.owner}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--lunar-red)" }}>
                ⚠ {d.consequence}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
