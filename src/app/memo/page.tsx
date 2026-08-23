"use client";

import { useAppStore } from "@/store";
import { REVENUE_SCENARIOS, TAM_2030_BASE, calcSAM } from "@/data/market";
import { COUNTRIES, COUNTRY_ID_TO_ISO2 } from "@/data/countries";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { STRATEGIC_THESIS } from "@/data/strategy";
import { PHASES } from "@/data/timeline";
import { RISKS } from "@/data/risks";
import { WORKSTREAMS } from "@/data/compliance";
import type { ComplianceStatus } from "@/data/compliance";
import type { RiskSeverity } from "@/data/risks";
import { useState } from "react";
import { Printer, Download } from "lucide-react";

export default function MemoPage() {
  const {
    activeScenario,
    marketAssumptions,
    complianceStatuses,
    riskSeverities,
    decisions,
  } = useAppStore();
  const scenario = REVENUE_SCENARIOS[activeScenario];
  const sam = calcSAM(TAM_2030_BASE, {
    targetCountryPct: marketAssumptions.targetCountryPct / 100,
    productFitPct: marketAssumptions.productFitPct / 100,
    procurementReachPct: marketAssumptions.procurementReachPct / 100,
  });

  const [sections, setSections] = useState({
    decision: true,
    recommendation: true,
    market: true,
    countries: true,
    revenue: true,
    competition: true,
    regulation: true,
    roadmap: true,
    risks: true,
    decisions_log: true,
    assumptions: true,
  });

  const toggleSection = (key: keyof typeof sections) => {
    setSections((s) => ({ ...s, [key]: !s[key] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const data = {
      metadata: { exportDate: new Date().toISOString(), scenario: activeScenario },
      market: { tam2030: TAM_2030_BASE, sam, scenario },
      decisions,
      complianceStatuses,
      riskSeverities,
      marketAssumptions,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kimi-eu-expansion-os-${activeScenario}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const criticalRisks = RISKS.filter(
    (r) => (riskSeverities[r.id] as RiskSeverity ?? r.defaultSeverity) === "critical"
  );
  const highRisks = RISKS.filter(
    (r) => (riskSeverities[r.id] as RiskSeverity ?? r.defaultSeverity) === "high"
  );

  const pendingWorkstreams = WORKSTREAMS.filter(
    (w) => (complianceStatuses[w.id] as ComplianceStatus ?? w.status) !== "done"
  );

  return (
    <div className="max-w-[1000px] mx-auto space-y-6">
      {/* Controls (no-print) */}
      <div className="flex items-center justify-between no-print">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
            Board Memo & Export
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
            Print-ready summary for board and executive review. Scenario: {scenario.label}.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
            style={{ background: "var(--lunar-elevated)", border: "1px solid var(--lunar-border-subtle)", color: "var(--lunar-text-muted)" }}
          >
            <Download size={14} aria-hidden="true" />
            JSON
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
            style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", color: "var(--lunar-cyan)" }}
          >
            <Printer size={14} aria-hidden="true" />
            Print
          </button>
        </div>
      </div>

      {/* Section toggles */}
      <div className="flex flex-wrap gap-2 no-print">
        {Object.entries(sections).map(([key, on]) => (
          <button
            key={key}
            onClick={() => toggleSection(key as keyof typeof sections)}
            className="text-xs px-2 py-1 rounded"
            style={{
              background: on ? "rgba(0,212,255,0.1)" : "var(--lunar-elevated)",
              color: on ? "var(--lunar-cyan)" : "var(--lunar-text-muted)",
              border: on ? "1px solid rgba(0,212,255,0.2)" : "1px solid var(--lunar-border-subtle)",
            }}
            aria-pressed={on}
          >
            {key.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Memo content */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--lunar-border-strong)", background: "var(--lunar-surface)" }}
      >
        {/* Header */}
        <div
          className="px-8 py-6"
          style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.08) 0%, rgba(168,85,247,0.06) 100%)", borderBottom: "1px solid var(--lunar-border-subtle)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="kimi-mark" aria-hidden="true" />
            <div>
              <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--lunar-text-muted)" }}>
                Moonshot AI / Kimi
              </div>
              <div className="text-xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
                EU Market Expansion — Board Memorandum
              </div>
            </div>
          </div>
          <div className="flex gap-6 text-xs" style={{ color: "var(--lunar-text-muted)" }}>
            <span>Date: {new Date().toISOString().slice(0, 10)}</span>
            <span>Scenario: {scenario.label}</span>
            <span>Classification: CONFIDENTIAL — INTERNAL</span>
          </div>
        </div>

        <div className="px-8 py-6 space-y-8">
          {/* Decision Required */}
          {sections.decision && (
            <section aria-labelledby="memo-decision">
              <h2 id="memo-decision" className="text-base font-bold mb-3 pb-1" style={{ color: "var(--lunar-cyan)", borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                Decision Required
              </h2>
              <div
                className="p-4 rounded-lg"
                style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}
              >
                <p className="text-sm" style={{ color: "var(--lunar-text-primary)" }}>
                  Approve the Kimi EU Expansion programme and Phase 0 investment (estimated €5–8M) to build the legal, infrastructure, and commercial foundations required to launch in the EU/UK market by H1 2027, targeting €{scenario.revenue2030}M ARR by 2030 ({scenario.samShare}% of the €{sam.toFixed(1)}B SAM).
                </p>
              </div>
            </section>
          )}

          {/* Executive Recommendation */}
          {sections.recommendation && (
            <section aria-labelledby="memo-recommendation">
              <h2 id="memo-recommendation" className="text-base font-bold mb-3 pb-1" style={{ color: "var(--lunar-cyan)", borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                Executive Recommendation
              </h2>
              <p className="text-sm mb-3" style={{ color: "var(--lunar-text-secondary)" }}>
                <strong style={{ color: "var(--lunar-text-primary)" }}>Strategic verdict:</strong> {STRATEGIC_THESIS.headline}
              </p>
              <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
                {STRATEGIC_THESIS.subheadline}
              </p>
            </section>
          )}

          {/* Market Opportunity */}
          {sections.market && (
            <section aria-labelledby="memo-market">
              <h2 id="memo-market" className="text-base font-bold mb-3 pb-1" style={{ color: "var(--lunar-cyan)", borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                Market Opportunity
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded" style={{ background: "var(--lunar-elevated)" }}>
                  <div className="text-xl font-bold font-mono" style={{ color: "var(--lunar-cyan)" }}>€{TAM_2030_BASE.toFixed(0)}B</div>
                  <div className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>2030 EU TAM</div>
                </div>
                <div className="p-3 rounded" style={{ background: "var(--lunar-elevated)" }}>
                  <div className="text-xl font-bold font-mono" style={{ color: "var(--lunar-violet)" }}>€{sam.toFixed(1)}B</div>
                  <div className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>2030 SAM</div>
                </div>
                <div className="p-3 rounded" style={{ background: "var(--lunar-elevated)" }}>
                  <div className="text-xl font-bold font-mono" style={{ color: "var(--lunar-green)" }}>€{scenario.revenue2030}M</div>
                  <div className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>{scenario.label} 2030 revenue</div>
                </div>
              </div>
            </section>
          )}

          {/* Country Sequence */}
          {sections.countries && (
            <section aria-labelledby="memo-countries">
              <h2 id="memo-countries" className="text-base font-bold mb-3 pb-1" style={{ color: "var(--lunar-cyan)", borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                Country Sequence
              </h2>
              <div className="space-y-2">
                {COUNTRIES.slice(0, 5).map((c) => (
                  <div key={c.id} className="flex items-center gap-3 text-sm">
                    <FlagIcon iso2={COUNTRY_ID_TO_ISO2[c.id] ?? c.id.toUpperCase()} size={20} />
                    <span className="font-medium" style={{ color: "var(--lunar-text-primary)" }}>{c.name}</span>
                    <span style={{ color: "var(--lunar-text-muted)" }}>·</span>
                    <span style={{ color: "var(--lunar-text-secondary)" }}>{c.role}</span>
                    <span style={{ color: "var(--lunar-text-muted)" }}>·</span>
                    <span style={{ color: "var(--lunar-cyan)" }}>{c.launchPhase}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Roadmap */}
          {sections.roadmap && (
            <section aria-labelledby="memo-roadmap">
              <h2 id="memo-roadmap" className="text-base font-bold mb-3 pb-1" style={{ color: "var(--lunar-cyan)", borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                Roadmap
              </h2>
              <div className="space-y-2">
                {PHASES.map((phase) => (
                  <div key={phase.id} className="flex items-start gap-3 text-sm">
                    <span className="text-xs font-mono w-24 flex-shrink-0 pt-0.5" style={{ color: phase.color }}>
                      {phase.dateRange}
                    </span>
                    <div>
                      <span className="font-medium" style={{ color: "var(--lunar-text-primary)" }}>{phase.label}</span>
                      <span className="text-xs ml-2" style={{ color: "var(--lunar-text-muted)" }}>{phase.objective.slice(0, 80)}...</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Financial Scenarios */}
          {sections.revenue && (
            <section aria-labelledby="memo-revenue">
              <h2 id="memo-revenue" className="text-base font-bold mb-3 pb-1" style={{ color: "var(--lunar-cyan)", borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                Financial Scenarios (2030 ARR)
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(REVENUE_SCENARIOS).map(([key, s]) => (
                  <div
                    key={key}
                    className="p-3 rounded text-center"
                    style={{
                      background: key === activeScenario ? "rgba(0,212,255,0.08)" : "var(--lunar-elevated)",
                      border: key === activeScenario ? "1px solid rgba(0,212,255,0.2)" : "1px solid var(--lunar-border-subtle)",
                    }}
                  >
                    <div className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>{s.label}</div>
                    <div className="text-xl font-bold font-mono" style={{ color: "var(--lunar-text-primary)" }}>€{s.revenue2030}M</div>
                    <div className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>{s.samShare}% SAM</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Regulation */}
          {sections.regulation && (
            <section aria-labelledby="memo-regulation">
              <h2 id="memo-regulation" className="text-base font-bold mb-3 pb-1" style={{ color: "var(--lunar-cyan)", borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                Regulatory Readiness
              </h2>
              <p className="text-sm mb-2" style={{ color: "var(--lunar-text-secondary)" }}>
                {pendingWorkstreams.length} of {WORKSTREAMS.length} compliance workstreams pending or in progress. Gate A (EU GA) requires: data boundary, GPAI classification, license confirmation, incident process, and basic technical documentation.
              </p>
              <div className="text-xs" style={{ color: "var(--lunar-amber)" }}>
                ⚠ Timelines and classifications require validation by qualified EU and UK counsel. This is a strategy tool, not legal advice.
              </div>
            </section>
          )}

          {/* Principal Risks */}
          {sections.risks && (
            <section aria-labelledby="memo-risks">
              <h2 id="memo-risks" className="text-base font-bold mb-3 pb-1" style={{ color: "var(--lunar-cyan)", borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                Principal Risks
              </h2>
              {criticalRisks.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs font-semibold mb-2" style={{ color: "var(--lunar-red)" }}>Critical</div>
                  {criticalRisks.map((r) => (
                    <div key={r.id} className="text-sm mb-1" style={{ color: "var(--lunar-text-secondary)" }}>
                      <span style={{ color: "var(--lunar-red)" }}>● </span>
                      <strong style={{ color: "var(--lunar-text-primary)" }}>{r.title}:</strong> {r.mitigation.slice(0, 100)}...
                    </div>
                  ))}
                </div>
              )}
              {highRisks.length > 0 && (
                <div>
                  <div className="text-xs font-semibold mb-2" style={{ color: "var(--lunar-amber)" }}>High</div>
                  {highRisks.map((r) => (
                    <div key={r.id} className="text-sm mb-1" style={{ color: "var(--lunar-text-secondary)" }}>
                      <span style={{ color: "var(--lunar-amber)" }}>● </span>
                      <strong style={{ color: "var(--lunar-text-primary)" }}>{r.title}:</strong> {r.mitigation.slice(0, 80)}...
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Decision Log */}
          {sections.decisions_log && decisions.length > 0 && (
            <section aria-labelledby="memo-decisions-log">
              <h2 id="memo-decisions-log" className="text-base font-bold mb-3 pb-1" style={{ color: "var(--lunar-cyan)", borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                Decision Log ({decisions.length} recorded)
              </h2>
              <div className="space-y-2">
                {decisions.map((d) => (
                  <div key={d.id} className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded mr-2 capitalize"
                      style={{ background: "var(--lunar-elevated)", color: "var(--lunar-text-muted)" }}
                    >
                      {d.status.replace("_", " ")}
                    </span>
                    <strong style={{ color: "var(--lunar-text-primary)" }}>{d.text}</strong>
                    {d.owner && <span> — {d.owner}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Assumptions */}
          {sections.assumptions && (
            <section aria-labelledby="memo-assumptions">
              <h2 id="memo-assumptions" className="text-base font-bold mb-3 pb-1" style={{ color: "var(--lunar-cyan)", borderBottom: "1px solid var(--lunar-border-subtle)" }}>
                Key Assumptions
              </h2>
              <div className="text-xs space-y-1" style={{ color: "var(--lunar-text-muted)" }}>
                <div>SAM filter: {marketAssumptions.targetCountryPct}% country coverage × {marketAssumptions.productFitPct}% product fit × {marketAssumptions.procurementReachPct}% procurement reach</div>
                <div>Revenue scenario: {scenario.label} — {scenario.samShare}% of SAM by 2030</div>
                <div>Market figures are planning estimates. Source: Eurostat SBS (S6), EU AI Act (S7), Moonshot AI (S1–S5). All values are working assumptions.</div>
                <div>This document does not constitute legal advice. Regulatory assessments require qualified counsel review.</div>
              </div>
            </section>
          )}

          {/* Footer */}
          <div
            className="pt-4 text-xs"
            style={{ borderTop: "1px solid var(--lunar-border-subtle)", color: "var(--lunar-text-muted)" }}
          >
            Generated by Kimi Europe Expansion OS · {new Date().toISOString()} · {scenario.label} scenario · CONFIDENTIAL
          </div>
        </div>
      </div>
    </div>
  );
}
