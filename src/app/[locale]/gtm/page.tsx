"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { GTM_MOTIONS, PILOT_DEFAULTS, EMPTY_PILOT } from "@/data/gtm";
import { TACTICAL_PLAYS, REGIONAL_MATRIX, NO_FIT_SEGMENTS } from "@/data/swot";
import type { PilotSpec } from "@/data/gtm";
import { MODEL_PRICING } from "@/data/pricing";
import { EvidenceBadge } from "@/components/EvidenceBadge";

const PRIORITY_COLORS: Record<string, string> = {
  primary: "var(--lunar-cyan)",
  secondary: "var(--lunar-violet)",
  supporting: "var(--lunar-text-muted)",
};

export default function GTMPage() {
  const [pilot, setPilot] = useState<PilotSpec>(EMPTY_PILOT);
  const [activeTab, setActiveTab] = useState<"motions" | "pilot">("motions");
  const t = useTranslations("gtm");

  const kimiModels = MODEL_PRICING.filter((m) => m.provider.includes("Kimi") || m.provider.includes("Moonshot"));
  const selectedModel = kimiModels.find((m) => m.name === pilot.kimiModel) ?? kimiModels[0];
  const budgetPerWeek = pilot.durationWeeks > 0 ? Math.round(pilot.budget / pilot.durationWeeks) : 0;
  const inputTokenBudget = selectedModel ? Math.round((pilot.budget / selectedModel.inputPer1M) * 1_000_000) : 0;
  const outputTokenBudget = selectedModel ? Math.round((pilot.budget * 0.3 / selectedModel.outputPer1M) * 1_000_000) : 0;

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
          {t("title")}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
          {t("subtitle")}
        </p>
      </div>

      {/* Strategic View Callout */}
      <div className="p-5 rounded-xl" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.15)", borderLeft: "4px solid var(--lunar-cyan)" }}>
        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--lunar-cyan)" }}>
          My Strategic View
        </div>
        <p className="text-sm italic mb-4" style={{ color: "var(--lunar-text-secondary)" }}>
          &ldquo;The mistake most AI companies make entering Europe is leading with enterprise sales. I would not. I would generate proof points first — paying pilot customers, signed LOIs, university reference cases — then use that evidence to make SI partnerships credible and enterprise sales cycles shorter.&rdquo;
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-1">
            <div className="text-xs font-semibold" style={{ color: "var(--lunar-cyan)" }}>PLG and paid pilots before direct sales</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>Product-led growth creates the customer references that make every subsequent enterprise conversation faster. A single paid pilot at a recognisable company is worth ten cold outreach sequences.</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold" style={{ color: "#a855f7" }}>Academic licensing is underrated</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>Universities at KTH, ETH Zurich, TU Delft and Imperial pay £5–50K/year for institutional API access and generate peer-reviewed citations — the highest-credibility reference in enterprise AI procurement.</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold" style={{ color: "var(--lunar-amber)" }}>SI embedding is the scaling lever</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>Once two reference customers exist, SI partners will embed Kimi in their delivery practices. That multiplies reach without multiplying headcount — the only way to win enterprise distribution before a large EU sales team exists.</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["motions", "pilot"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded-lg text-sm capitalize"
            style={{
              background: activeTab === tab ? "rgba(0,212,255,0.1)" : "var(--lunar-elevated)",
              color: activeTab === tab ? "var(--lunar-cyan)" : "var(--lunar-text-muted)",
              border: activeTab === tab ? "1px solid rgba(0,212,255,0.2)" : "1px solid var(--lunar-border-subtle)",
            }}
            aria-selected={activeTab === tab}
          >
            {tab === "motions" ? t("tabMotions") : t("tabPilot")}
          </button>
        ))}
      </div>

      {activeTab === "motions" && (
        <div className="space-y-4">
          {GTM_MOTIONS.map((motion) => (
            <div
              key={motion.id}
              className="lunar-card"
              style={{
                borderLeft: `3px solid ${PRIORITY_COLORS[motion.priority]}`,
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
                      {motion.name}
                    </h2>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded capitalize"
                      style={{
                        background: `${PRIORITY_COLORS[motion.priority]}15`,
                        color: PRIORITY_COLORS[motion.priority],
                      }}
                    >
                      {motion.priority}
                    </span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{
                        background: "var(--lunar-elevated)",
                        color: "var(--lunar-text-muted)",
                      }}
                    >
                      {motion.phase}
                    </span>
                  </div>
                  <p className="text-sm mb-2" style={{ color: "var(--lunar-text-secondary)" }}>
                    {motion.description}
                  </p>
                  <div className="flex gap-4 text-xs">
                    <div>
                      <span className="stat-label">{t("target")}</span>
                      <div style={{ color: "var(--lunar-text-secondary)" }}>{motion.targetSegment}</div>
                    </div>
                    <div>
                      <span className="stat-label">{t("channels")}</span>
                      <div style={{ color: "var(--lunar-text-secondary)" }}>{motion.channels.join(", ")}</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="stat-label">{t("kpis")}</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {motion.kpis.map((kpi) => (
                        <span
                          key={kpi}
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ background: "var(--lunar-elevated)", color: "var(--lunar-text-muted)" }}
                        >
                          {kpi}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "pilot" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pilot form */}
          <div className="lunar-card">
            <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--lunar-text-primary)" }}>
              {t("buildPilot")}
              <EvidenceBadge type="ASSUMPTION" className="ml-2" reasoning="Illustrative pilot template — adapt to each customer" />
            </h2>
            <div className="space-y-4">
              {[
                { key: "customer" as const, label: t("pilot.customer") },
                { key: "country" as const, label: t("pilot.country") },
                { key: "industry" as const, label: t("pilot.industry") },
                { key: "workflow" as const, label: t("pilot.workflow") },
                { key: "currentBaseline" as const, label: t("pilot.currentBaseline") },
                { key: "humanReviewers" as const, label: t("pilot.humanReviewers") },
                { key: "productionDecisionDate" as const, label: t("pilot.productionDecisionDate") },
              ].map((field) => (
                <div key={field.key}>
                  <label className="stat-label mb-1 block">{field.label}</label>
                  <input
                    type="text"
                    value={pilot[field.key]}
                    onChange={(e) => setPilot({ ...pilot, [field.key]: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: "var(--lunar-elevated)",
                      border: "1px solid var(--lunar-border-subtle)",
                      color: "var(--lunar-text-primary)",
                    }}
                    aria-label={field.label}
                  />
                </div>
              ))}

              <div>
                <label className="stat-label mb-1 block">{t("pilot.kimiModelLabel")}</label>
                <select
                  value={pilot.kimiModel}
                  onChange={(e) => setPilot({ ...pilot, kimiModel: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ background: "var(--lunar-elevated)", border: "1px solid var(--lunar-border-subtle)", color: "var(--lunar-text-primary)" }}
                >
                  {MODEL_PRICING.filter((m) => m.provider.includes("Kimi") || m.provider.includes("Moonshot")).map((m) => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="stat-label mb-1 block">{t("pilot.dataSensitivity")}</label>
                <select
                  value={pilot.dataSensitivity}
                  onChange={(e) => setPilot({ ...pilot, dataSensitivity: e.target.value as PilotSpec["dataSensitivity"] })}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ background: "var(--lunar-elevated)", border: "1px solid var(--lunar-border-subtle)", color: "var(--lunar-text-primary)" }}
                >
                  <option value="public">{t("pilot.dataSensitivityPublic")}</option>
                  <option value="internal">{t("pilot.dataSensitivityInternal")}</option>
                  <option value="confidential">{t("pilot.dataSensitivityConfidential")}</option>
                  <option value="restricted">{t("pilot.dataSensitivityRestricted")}</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="stat-label">{t("pilot.duration")}</label>
                  <span className="text-xs font-mono" style={{ color: "var(--lunar-cyan)" }}>{pilot.durationWeeks}</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={16}
                  value={pilot.durationWeeks}
                  onChange={(e) => setPilot({ ...pilot, durationWeeks: Number(e.target.value) })}
                  className="w-full accent-cyan-400"
                  aria-label="Pilot duration in weeks"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="stat-label">{t("pilot.budget")}</label>
                  <span className="text-xs font-mono" style={{ color: "var(--lunar-cyan)" }}>€{pilot.budget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={200000}
                  step={5000}
                  value={pilot.budget}
                  onChange={(e) => setPilot({ ...pilot, budget: Number(e.target.value) })}
                  className="w-full accent-cyan-400"
                  aria-label="Pilot budget"
                />
              </div>
            </div>
          </div>

          {/* Pilot summary + methodology */}
          <div className="space-y-4">
            {/* Summary card */}
            <div
              className="rounded-xl p-5"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(168,85,247,0.04) 100%)",
                border: "1px solid var(--lunar-border-strong)",
              }}
            >
              <h3 className="stat-label mb-3">{t("pilotSummary")}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "var(--lunar-text-muted)" }}>{t("pilot.customerLabel")}</span>
                  <span style={{ color: "var(--lunar-text-primary)" }}>{pilot.customer || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--lunar-text-muted)" }}>{t("pilot.countryLabel")}</span>
                  <span style={{ color: "var(--lunar-text-primary)" }}>{pilot.country || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--lunar-text-muted)" }}>{t("pilot.modelLabel")}</span>
                  <span style={{ color: "var(--lunar-cyan)" }}>{pilot.kimiModel}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--lunar-text-muted)" }}>{t("pilot.durationLabel")}</span>
                  <span style={{ color: "var(--lunar-text-primary)" }}>{pilot.durationWeeks} {t("pilot.weeksUnit")}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--lunar-text-muted)" }}>{t("pilot.budgetLabel")}</span>
                  <span style={{ color: "var(--lunar-text-primary)" }}>€{pilot.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--lunar-text-muted)" }}>{t("pilot.dataSensitivityLabel")}</span>
                  <span
                    style={{
                      color: pilot.dataSensitivity === "restricted" ? "var(--lunar-red)" : pilot.dataSensitivity === "confidential" ? "var(--lunar-amber)" : "var(--lunar-green)",
                    }}
                  >
                    {pilot.dataSensitivity}
                  </span>
                </div>
              </div>

              {/* Cost estimate */}
              <div
                className="mt-4 pt-4 space-y-2 text-sm"
                style={{ borderTop: "1px solid var(--lunar-border-subtle)" }}
              >
                <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--lunar-cyan)" }}>
                  {t("pilot.costEstimate")}
                </div>
                <div className="flex justify-between text-xs">
                  <span style={{ color: "var(--lunar-text-muted)" }}>{t("pilot.budgetPerWeek")}</span>
                  <span style={{ color: "var(--lunar-text-primary)" }}>€{budgetPerWeek.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span style={{ color: "var(--lunar-text-muted)" }}>{t("pilot.inputTokenBudget")}</span>
                  <span style={{ color: "var(--lunar-text-primary)" }}>{(inputTokenBudget / 1_000_000).toFixed(1)}M tokens</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span style={{ color: "var(--lunar-text-muted)" }}>{t("pilot.outputTokenBudget")}</span>
                  <span style={{ color: "var(--lunar-text-primary)" }}>{(outputTokenBudget / 1_000_000).toFixed(1)}M tokens</span>
                </div>
                {selectedModel && (
                  <div className="text-xs pt-1" style={{ color: "var(--lunar-text-muted)" }}>
                    Rate: ${selectedModel.inputPer1M}/1M in · ${selectedModel.outputPer1M}/1M out ({selectedModel.name})
                  </div>
                )}
              </div>
            </div>

            {/* Week-by-week methodology */}
            <div className="lunar-card">
              <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--lunar-text-primary)" }}>
                {t("defaultMethodology")}
              </h3>
              <div className="space-y-2">
                {PILOT_DEFAULTS.weeklyMethodology
                  .slice(0, Math.min(pilot.durationWeeks, PILOT_DEFAULTS.weeklyMethodology.length))
                  .map((week) => (
                    <div key={week.week} className="flex items-start gap-3 text-xs">
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono"
                        style={{
                          background: "rgba(0,212,255,0.1)",
                          color: "var(--lunar-cyan)",
                          border: "1px solid rgba(0,212,255,0.2)",
                        }}
                        aria-label={`Week ${week.week}`}
                      >
                        {week.week}
                      </span>
                      <span style={{ color: "var(--lunar-text-secondary)" }}>{week.activity}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tactical BD Plays */}
      <div>
        <h2 className="text-sm font-semibold mb-1 section-header">Tactical BD Plays</h2>
        <p className="text-xs mb-4" style={{ color: "var(--lunar-text-muted)" }}>
          Five execution-ready plays for the first 90 days in Europe.
        </p>
        <div className="space-y-3">
          {TACTICAL_PLAYS.map((play) => (
            <div
              key={play.number}
              className="lunar-card"
              style={{ borderLeft: "3px solid var(--lunar-cyan)" }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="w-7 h-7 rounded flex items-center justify-center text-xs font-mono font-bold flex-shrink-0"
                  style={{ background: "rgba(0,212,255,0.1)", color: "var(--lunar-cyan)", border: "1px solid rgba(0,212,255,0.2)" }}
                >
                  {play.number}
                </span>
                <div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "var(--lunar-text-primary)" }}>
                    {play.title}
                  </div>
                  <p className="text-xs italic leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>
                    &ldquo;{play.quote}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Prioritisation Matrix */}
      <div>
        <h2 className="text-sm font-semibold mb-1 section-header">Regional Prioritisation Matrix</h2>
        <p className="text-xs mb-4" style={{ color: "var(--lunar-text-muted)" }}>
          City-level priorities for the first 12 months of European expansion.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ borderCollapse: "separate", borderSpacing: "0 4px" }}>
            <thead>
              <tr>
                {["Region", "Priority", "Density", "Key Verticals", "Why"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-3 py-2"
                    style={{ color: "var(--lunar-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REGIONAL_MATRIX.map((city) => {
                const priorityColor = city.priority === "P0" ? "var(--lunar-red)" : city.priority === "P1" ? "var(--lunar-amber)" : "var(--lunar-text-muted)";
                return (
                  <tr key={city.region} className="rounded-lg" style={{ background: "var(--lunar-elevated)" }}>
                    <td className="px-3 py-2 font-semibold rounded-l-lg" style={{ color: "var(--lunar-text-primary)" }}>{city.region}</td>
                    <td className="px-3 py-2">
                      <span className="px-1.5 py-0.5 rounded text-xs font-mono font-bold" style={{ background: `${priorityColor}15`, color: priorityColor }}>
                        {city.priority}
                      </span>
                    </td>
                    <td className="px-3 py-2" style={{ color: "var(--lunar-text-secondary)" }}>{city.density}</td>
                    <td className="px-3 py-2" style={{ color: "var(--lunar-text-secondary)" }}>{city.verticals}</td>
                    <td className="px-3 py-2 rounded-r-lg" style={{ color: "var(--lunar-text-muted)" }}>{city.why}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* No-Fit Segments */}
      <div>
        <h2 className="text-sm font-semibold mb-1 section-header">Do Not Pursue: No-Fit Segments</h2>
        <p className="text-xs mb-4" style={{ color: "var(--lunar-text-muted)" }}>
          Segments where geopolitical, compliance, or competitive constraints make near-term wins unlikely.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {NO_FIT_SEGMENTS.map((seg) => (
            <div
              key={seg.name}
              className="rounded-xl p-4"
              style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.15)" }}
            >
              <div className="text-xs font-semibold mb-1" style={{ color: "var(--lunar-red)" }}>{seg.name}</div>
              <div className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>{seg.reason}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
