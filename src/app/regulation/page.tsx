"use client";

import { useAppStore } from "@/store";
import {
  WORKSTREAMS,
  REGULATORY_DATES,
  TRUST_ARCHITECTURE,
  STAGE_GATES,
} from "@/data/compliance";
import type { ComplianceStatus } from "@/data/compliance";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { useState } from "react";
import { CheckCircle2, Clock, AlertTriangle, XCircle, Info } from "lucide-react";

const STATUS_ICONS: Record<ComplianceStatus, React.ReactNode> = {
  done: <CheckCircle2 size={14} style={{ color: "var(--lunar-green)" }} aria-hidden="true" />,
  in_progress: <Clock size={14} style={{ color: "var(--lunar-amber)" }} aria-hidden="true" />,
  pending: <Clock size={14} style={{ color: "var(--lunar-text-muted)" }} aria-hidden="true" />,
  blocked: <XCircle size={14} style={{ color: "var(--lunar-red)" }} aria-hidden="true" />,
  overdue: <AlertTriangle size={14} style={{ color: "#ef4444" }} aria-hidden="true" />,
};

const STATUS_CLASS: Record<ComplianceStatus, string> = {
  done: "status-done",
  in_progress: "status-in-progress",
  pending: "status-pending",
  blocked: "status-blocked",
  overdue: "status-blocked",
};

export default function RegulationPage() {
  const { complianceStatuses, setComplianceStatus } = useAppStore();
  const [filterCat, setFilterCat] = useState("all");
  const [showLegal, setShowLegal] = useState<string | null>(null);

  const categories = ["all", ...Array.from(new Set(WORKSTREAMS.map((w) => w.category)))];

  const filtered = WORKSTREAMS.filter(
    (w) => filterCat === "all" || w.category === filterCat
  );

  const counts = {
    done: WORKSTREAMS.filter((w) => complianceStatuses[w.id] === "done").length,
    in_progress: WORKSTREAMS.filter((w) => complianceStatuses[w.id] === "in_progress").length,
    pending: WORKSTREAMS.filter((w) => complianceStatuses[w.id] === "pending").length,
    blocked: WORKSTREAMS.filter((w) => complianceStatuses[w.id] === "blocked").length,
    overdue: WORKSTREAMS.filter((w) => complianceStatuses[w.id] === "overdue").length,
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
          Regulatory & Trust Center
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
          EU AI Act, GPAI, GDPR, and NIS2 compliance workstreams. Update statuses to track progress.
        </p>
      </div>

      {/* Legal disclaimer */}
      <div
        className="flex items-start gap-3 p-4 rounded-lg"
        style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)" }}
        role="note"
      >
        <Info size={16} style={{ color: "var(--lunar-amber)", flexShrink: 0 }} aria-hidden="true" />
        <div className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
          <strong style={{ color: "var(--lunar-amber)" }}>Legal notice:</strong> Timelines and classifications shown are based on published EU legislation and require validation by qualified EU and UK counsel. This product is a strategy tool, not legal advice. Open-weight model status under GPAI obligations is not automatically exempt and requires legal assessment.
        </div>
      </div>

      {/* Regulatory timeline */}
      <div className="lunar-card">
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--lunar-text-primary)" }}>
          Regulatory Enforcement Timeline
          <EvidenceBadge type="FACT" sourceId="S7" className="ml-2" />
        </h2>
        <div className="relative">
          <div
            className="absolute left-16 top-0 bottom-0 w-px"
            style={{ background: "var(--lunar-border-subtle)" }}
            aria-hidden="true"
          />
          <div className="space-y-4">
            {REGULATORY_DATES.map((rd) => {
              const date = new Date(rd.date);
              const isPast = date < new Date();
              const isNow = Math.abs(date.getTime() - Date.now()) < 1000 * 60 * 60 * 24 * 90;
              return (
                <div key={rd.date} className="flex items-start gap-4">
                  <div
                    className="w-14 text-right flex-shrink-0 text-xs font-mono"
                    style={{ color: isPast ? "var(--lunar-text-muted)" : isNow ? "var(--lunar-amber)" : "var(--lunar-text-secondary)" }}
                  >
                    {rd.date.slice(0, 7)}
                  </div>
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0 mt-1 z-10"
                    style={{
                      background: isPast ? "var(--lunar-green)" : isNow ? "var(--lunar-amber)" : "var(--lunar-border-strong)",
                      border: "2px solid var(--lunar-surface)",
                    }}
                    aria-hidden="true"
                  />
                  <div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: isNow ? "var(--lunar-amber)" : "var(--lunar-text-primary)" }}
                    >
                      {rd.label}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--lunar-text-secondary)" }}>
                      {rd.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-5 gap-3">
        {(["done", "in_progress", "pending", "blocked", "overdue"] as const).map((s) => (
          <div key={s} className="lunar-card text-center">
            <div className="flex justify-center mb-2">{STATUS_ICONS[s]}</div>
            <div className="text-2xl font-bold font-mono" style={{ color: s === "done" ? "var(--lunar-green)" : s === "in_progress" ? "var(--lunar-amber)" : s === "blocked" || s === "overdue" ? "var(--lunar-red)" : "var(--lunar-text-muted)" }}>
              {counts[s]}
            </div>
            <div className="text-xs capitalize mt-1" style={{ color: "var(--lunar-text-muted)" }}>
              {s.replace("_", " ")}
            </div>
          </div>
        ))}
      </div>

      {/* Filter categories */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className="px-3 py-1 rounded-lg text-xs capitalize"
            style={{
              background: filterCat === cat ? "rgba(0,212,255,0.1)" : "var(--lunar-elevated)",
              color: filterCat === cat ? "var(--lunar-cyan)" : "var(--lunar-text-muted)",
              border: filterCat === cat ? "1px solid rgba(0,212,255,0.2)" : "1px solid var(--lunar-border-subtle)",
            }}
            aria-pressed={filterCat === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Workstreams */}
      <div className="space-y-3">
        {filtered.map((ws) => {
          const status = complianceStatuses[ws.id] as ComplianceStatus ?? ws.status;
          return (
            <div
              key={ws.id}
              className="lunar-card"
              style={{
                borderLeft: `3px solid ${status === "done" ? "var(--lunar-green)" : status === "in_progress" ? "var(--lunar-amber)" : status === "blocked" || status === "overdue" ? "var(--lunar-red)" : "var(--lunar-border-subtle)"}`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {STATUS_ICONS[status]}
                    <span className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
                      {ws.title}
                    </span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{
                        background: "var(--lunar-elevated)",
                        color: "var(--lunar-text-muted)",
                      }}
                    >
                      {ws.category}
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "var(--lunar-text-secondary)" }}>
                    {ws.description}
                  </p>
                  <div
                    className="text-xs px-3 py-2 rounded font-mono"
                    style={{ background: "var(--lunar-elevated)", color: "var(--lunar-text-secondary)" }}
                  >
                    {ws.requirementText}
                  </div>
                  {ws.legalNote && (
                    <button
                      onClick={() => setShowLegal(showLegal === ws.id ? null : ws.id)}
                      className="mt-2 text-xs flex items-center gap-1"
                      style={{ color: "var(--lunar-amber)" }}
                    >
                      <AlertTriangle size={11} aria-hidden="true" />
                      Legal note {showLegal === ws.id ? "(hide)" : "(show)"}
                    </button>
                  )}
                  {showLegal === ws.id && ws.legalNote && (
                    <div
                      className="mt-2 text-xs p-2 rounded"
                      style={{
                        background: "rgba(245,158,11,0.08)",
                        border: "1px solid rgba(245,158,11,0.2)",
                        color: "var(--lunar-text-secondary)",
                      }}
                    >
                      {ws.legalNote}
                    </div>
                  )}
                  {ws.note && (
                    <div
                      className="mt-2 text-xs p-2 rounded flex items-start gap-1.5"
                      style={{
                        background: "rgba(239,68,68,0.08)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        color: "var(--lunar-red)",
                      }}
                    >
                      <AlertTriangle size={11} style={{ flexShrink: 0, marginTop: 1 }} aria-hidden="true" />
                      {ws.note}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <select
                    value={status}
                    onChange={(e) => setComplianceStatus(ws.id, e.target.value as ComplianceStatus)}
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      background: "var(--lunar-elevated)",
                      border: "1px solid var(--lunar-border-subtle)",
                      color: "var(--lunar-text-primary)",
                    }}
                    aria-label={`Status for ${ws.title}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="blocked">Blocked</option>
                    <option value="overdue">Overdue</option>
                  </select>
                  {ws.owner && (
                    <span className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>
                      {ws.owner}
                    </span>
                  )}
                  {ws.dueDate && (
                    <span className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>
                      Due: {ws.dueDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage Gates */}
      <div>
        <h2 className="section-header mb-4">Stage Gates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STAGE_GATES.map((gate) => (
            <div key={gate.id} className="lunar-card">
              <div className="font-semibold text-sm mb-1" style={{ color: "var(--lunar-cyan)" }}>
                {gate.label}
              </div>
              <div className="text-xs mb-3" style={{ color: "var(--lunar-text-muted)" }}>
                {gate.condition}
              </div>
              <ul className="space-y-1">
                {gate.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2 text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
                    <span style={{ color: "var(--lunar-text-muted)", flexShrink: 0 }}>→</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Architecture */}
      <div>
        <h2 className="section-header mb-4">Trust Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Data Boundary", items: TRUST_ARCHITECTURE.dataBoundary, color: "var(--lunar-cyan)" },
            { title: "Enterprise Control Plane", items: TRUST_ARCHITECTURE.enterpriseControlPlane, color: "var(--lunar-violet)" },
            { title: "Evaluation Program", items: TRUST_ARCHITECTURE.evaluationProgram, color: "var(--lunar-green)" },
          ].map((section) => (
            <div key={section.title} className="lunar-card">
              <h3 className="text-sm font-semibold mb-3" style={{ color: section.color }}>
                {section.title}
              </h3>
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
                    <span style={{ color: section.color, flexShrink: 0 }}>✓</span>
                    {item}
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
