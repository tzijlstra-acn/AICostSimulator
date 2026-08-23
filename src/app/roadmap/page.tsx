"use client";

import { PHASES, getCurrentPhase } from "@/data/timeline";
import { STAGE_GATES } from "@/data/compliance";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { CheckCircle2, Circle } from "lucide-react";

export default function RoadmapPage() {
  const currentPhase = getCurrentPhase();

  return (
    <div className="space-y-6 max-w-[1000px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
          Roadmap & Stage Gates
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
          5-phase programme from Foundation (Sep 2026) to Ecosystem Scale (2030)
        </p>
      </div>

      <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)" }}>
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--lunar-cyan)" }} aria-hidden="true" />
        <span className="text-sm" style={{ color: "var(--lunar-cyan)" }}>
          Current phase: <strong>{currentPhase.label}</strong> ({currentPhase.dateRange})
        </span>
        <EvidenceBadge type="MODEL" formula="Phase determined by current date (Aug 2026)" />
      </div>

      {/* Phase Timeline */}
      <div className="space-y-6">
        {PHASES.map((phase, idx) => {
          const isActive = phase.id === currentPhase.id;
          return (
            <div
              key={phase.id}
              className="relative"
            >
              {/* Vertical connector */}
              {idx < PHASES.length - 1 && (
                <div
                  className="absolute left-6 top-full w-px h-6 z-0"
                  style={{ background: "var(--lunar-border-subtle)" }}
                  aria-hidden="true"
                />
              )}

              <div
                className="rounded-xl p-5"
                style={{
                  background: isActive ? "var(--lunar-surface)" : "var(--lunar-elevated)",
                  border: `1px solid ${isActive ? phase.color + "40" : "var(--lunar-border-subtle)"}`,
                  boxShadow: isActive ? `0 0 0 1px ${phase.color}15, inset 0 0 30px ${phase.color}05` : undefined,
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Phase indicator */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold font-mono"
                    style={{
                      background: `${phase.color}20`,
                      border: `2px solid ${phase.color}60`,
                      color: phase.color,
                    }}
                    aria-label={`${phase.name} status: ${isActive ? "active" : "upcoming"}`}
                  >
                    {isActive ? (
                      <span className="relative flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75" style={{ background: phase.color }} aria-hidden="true" />
                        <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: phase.color }} />
                      </span>
                    ) : (
                      phase.name.replace("Phase ", "P")
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-base font-bold" style={{ color: phase.color }}>
                            {phase.label}
                          </h2>
                          {isActive && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ background: `${phase.color}20`, color: phase.color }}
                            >
                              Active
                            </span>
                          )}
                        </div>
                        <div className="text-xs mt-0.5 font-mono" style={{ color: "var(--lunar-text-muted)" }}>
                          {phase.dateRange}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm mt-2" style={{ color: "var(--lunar-text-secondary)" }}>
                      {phase.objective}
                    </p>

                    {/* Milestones */}
                    <div className="mt-3">
                      <div className="stat-label mb-2">Key Milestones</div>
                      <ul className="space-y-1.5">
                        {phase.milestones.map((m) => (
                          <li key={m} className="flex items-start gap-2 text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
                            <Circle size={10} className="mt-0.5 flex-shrink-0" style={{ color: phase.color }} aria-hidden="true" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exit gate */}
                    <div
                      className="mt-3 p-2 rounded text-xs"
                      style={{
                        background: `${phase.color}10`,
                        border: `1px solid ${phase.color}25`,
                        color: "var(--lunar-text-secondary)",
                      }}
                    >
                      <span className="font-semibold" style={{ color: phase.color }}>Exit gate: </span>
                      {phase.exitGate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage Gates reference */}
      <div>
        <h2 className="section-header mb-4">Stage Gate Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STAGE_GATES.map((gate) => (
            <div key={gate.id} className="lunar-card">
              <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--lunar-cyan)" }}>{gate.label}</h3>
              <div className="text-xs mb-2" style={{ color: "var(--lunar-text-muted)" }}>{gate.condition}</div>
              <ul className="space-y-1">
                {gate.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2 text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
                    <CheckCircle2 size={11} className="mt-0.5 flex-shrink-0" style={{ color: "var(--lunar-text-muted)" }} aria-hidden="true" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
