"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { GTM_MOTIONS, PILOT_DEFAULTS, EMPTY_PILOT } from "@/data/gtm";
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
                      <span className="stat-label">Target</span>
                      <div style={{ color: "var(--lunar-text-secondary)" }}>{motion.targetSegment}</div>
                    </div>
                    <div>
                      <span className="stat-label">Channels</span>
                      <div style={{ color: "var(--lunar-text-secondary)" }}>{motion.channels.join(", ")}</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="stat-label">KPIs</span>
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
                { key: "customer" as const, label: "Customer Name", type: "text" },
                { key: "country" as const, label: "Country", type: "text" },
                { key: "industry" as const, label: "Industry", type: "text" },
                { key: "workflow" as const, label: "Workflow Being Piloted", type: "text" },
                { key: "currentBaseline" as const, label: "Current Baseline Metric", type: "text" },
                { key: "humanReviewers" as const, label: "Human Reviewers (role + count)", type: "text" },
                { key: "productionDecisionDate" as const, label: "Production Decision Date", type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="stat-label mb-1 block">{field.label}</label>
                  <input
                    type={field.type}
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
                <label className="stat-label mb-1 block">Kimi Model</label>
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
                <label className="stat-label mb-1 block">Data Sensitivity</label>
                <select
                  value={pilot.dataSensitivity}
                  onChange={(e) => setPilot({ ...pilot, dataSensitivity: e.target.value as PilotSpec["dataSensitivity"] })}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ background: "var(--lunar-elevated)", border: "1px solid var(--lunar-border-subtle)", color: "var(--lunar-text-primary)" }}
                >
                  <option value="public">Public</option>
                  <option value="internal">Internal</option>
                  <option value="confidential">Confidential</option>
                  <option value="restricted">Restricted</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="stat-label">Duration (weeks)</label>
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
                  <label className="stat-label">Budget (€)</label>
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
                  <span style={{ color: "var(--lunar-text-muted)" }}>Customer</span>
                  <span style={{ color: "var(--lunar-text-primary)" }}>{pilot.customer || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--lunar-text-muted)" }}>Country</span>
                  <span style={{ color: "var(--lunar-text-primary)" }}>{pilot.country || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--lunar-text-muted)" }}>Model</span>
                  <span style={{ color: "var(--lunar-cyan)" }}>{pilot.kimiModel}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--lunar-text-muted)" }}>Duration</span>
                  <span style={{ color: "var(--lunar-text-primary)" }}>{pilot.durationWeeks} weeks</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--lunar-text-muted)" }}>Budget</span>
                  <span style={{ color: "var(--lunar-text-primary)" }}>€{pilot.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--lunar-text-muted)" }}>Data sensitivity</span>
                  <span
                    style={{
                      color: pilot.dataSensitivity === "restricted" ? "var(--lunar-red)" : pilot.dataSensitivity === "confidential" ? "var(--lunar-amber)" : "var(--lunar-green)",
                    }}
                  >
                    {pilot.dataSensitivity}
                  </span>
                </div>
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
    </div>
  );
}
