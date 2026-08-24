"use client";

import { useTranslations } from "next-intl";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import {
  Trophy,
  Target,
  AlertTriangle,
  AlertCircle,
  Users,
  TrendingUp,
  Flag,
} from "lucide-react";

interface ActionItem {
  text: string;
  badgeType: "FACT" | "ASSUMPTION" | "RECOMMENDATION" | "OPEN QUESTION";
}

interface Phase {
  number: number;
  name: string;
  days: string;
  dayNumber: string;
  mission: string;
  accentColor: string;
  actions: ActionItem[];
  deliverable: string;
  risk: string;
}

const BADGE_COLORS: Record<ActionItem["badgeType"], string> = {
  FACT: "#10b981",
  ASSUMPTION: "#f59e0b",
  RECOMMENDATION: "#00d4ff",
  "OPEN QUESTION": "#a855f7",
};

export default function NinetyDaysPage() {
  const t = useTranslations("ninetyDays");

  const PHASES: Phase[] = [
    {
      number: 1,
      name: t("phases.1.name"),
      days: t("phases.1.days"),
      dayNumber: "30",
      mission: t("phases.1.mission"),
      accentColor: "#00d4ff",
      actions: [
        { text: t("phases.1.action1"), badgeType: "RECOMMENDATION" },
        { text: t("phases.1.action2"), badgeType: "RECOMMENDATION" },
        { text: t("phases.1.action3"), badgeType: "ASSUMPTION" },
        { text: t("phases.1.action4"), badgeType: "RECOMMENDATION" },
        { text: t("phases.1.action5"), badgeType: "ASSUMPTION" },
        { text: t("phases.1.action6"), badgeType: "RECOMMENDATION" },
        { text: t("phases.1.action7"), badgeType: "OPEN QUESTION" },
      ],
      deliverable: t("phases.1.deliverable"),
      risk: t("phases.1.risk"),
    },
    {
      number: 2,
      name: t("phases.2.name"),
      days: t("phases.2.days"),
      dayNumber: "60",
      mission: t("phases.2.mission"),
      accentColor: "#a855f7",
      actions: [
        { text: t("phases.2.action1"), badgeType: "RECOMMENDATION" },
        { text: t("phases.2.action2"), badgeType: "ASSUMPTION" },
        { text: t("phases.2.action3"), badgeType: "RECOMMENDATION" },
        { text: t("phases.2.action4"), badgeType: "ASSUMPTION" },
        { text: t("phases.2.action5"), badgeType: "RECOMMENDATION" },
        { text: t("phases.2.action6"), badgeType: "RECOMMENDATION" },
        { text: t("phases.2.action7"), badgeType: "OPEN QUESTION" },
      ],
      deliverable: t("phases.2.deliverable"),
      risk: t("phases.2.risk"),
    },
    {
      number: 3,
      name: t("phases.3.name"),
      days: t("phases.3.days"),
      dayNumber: "90",
      mission: t("phases.3.mission"),
      accentColor: "#10b981",
      actions: [
        { text: t("phases.3.action1"), badgeType: "RECOMMENDATION" },
        { text: t("phases.3.action2"), badgeType: "RECOMMENDATION" },
        { text: t("phases.3.action3"), badgeType: "ASSUMPTION" },
        { text: t("phases.3.action4"), badgeType: "RECOMMENDATION" },
        { text: t("phases.3.action5"), badgeType: "RECOMMENDATION" },
        { text: t("phases.3.action6"), badgeType: "ASSUMPTION" },
        { text: t("phases.3.action7"), badgeType: "OPEN QUESTION" },
      ],
      deliverable: t("phases.3.deliverable"),
      risk: t("phases.3.risk"),
    },
  ];

  const PHASE_HYPOTHESIS: Record<number, { label: string; killCriteria: string }> = {
    1: {
      label: t("phases.1.hyp"),
      killCriteria: t("phases.1.killCriteria"),
    },
    2: {
      label: t("phases.2.hyp"),
      killCriteria: t("phases.2.killCriteria"),
    },
    3: {
      label: t("phases.3.hyp"),
      killCriteria: t("phases.3.killCriteria"),
    },
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(0,212,255,0.1)",
            border: "1px solid rgba(0,212,255,0.2)",
          }}
        >
          <Trophy size={22} style={{ color: "var(--lunar-cyan)" }} />
        </div>
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--lunar-text-primary)" }}
            >
              {t("title")}
            </h1>
            <EvidenceBadge
              type="RECOMMENDATION"
              reasoning="Structured 90-day onboarding plan for the strategic EU expansion role. Phases are sequential — don't skip to Phase 3."
            />
          </div>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--lunar-text-secondary)" }}
          >
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* First-person rationale — callout box */}
      <div
        className="max-w-3xl rounded-xl p-5"
        style={{
          background: 'rgba(0, 212, 255, 0.04)',
          border: '1px solid rgba(0, 212, 255, 0.18)',
          borderLeft: '4px solid var(--lunar-cyan)',
        }}
      >
        <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--lunar-cyan)' }}>
          {t("rationaleLabel")}
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--lunar-text-secondary)' }}
        >
          {t("rationale")}
        </p>
      </div>

      {/* Key Takeaways Callout */}
      <div className="p-5 rounded-xl" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.15)", borderLeft: "4px solid var(--lunar-cyan)" }}>
        <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--lunar-cyan)" }}>
          Key Takeaways
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-1">
            <div className="text-xs font-semibold" style={{ color: "var(--lunar-cyan)" }}>The sequence is non-negotiable</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>Phase 1 listening must happen before Phase 2 decisions. Any strategy that skips the listening tour is based on assumptions about a market we haven&apos;t tested — and those assumptions will be wrong in at least one critical dimension.</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold" style={{ color: "#a855f7" }}>LOIs before the board</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>The Phase 3 board presentation is only credible if Phase 2 produced real signed LOIs. Modelled revenue projections without customer commitments will not survive a serious board challenge.</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold" style={{ color: "var(--lunar-amber)" }}>Kill criteria are the most important lines</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>If any phase&apos;s kill criterion is triggered, the right move is to stop and reorient — not to push through. The exit conditions are not pessimism; they are intellectual honesty built into the plan.</p>
          </div>
        </div>
      </div>

      {/* Phase progress arc */}
      <div className="flex items-center justify-center py-2">
        {PHASES.map((phase, idx) => (
          <div key={phase.number} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2"
                style={{
                  background: `${phase.accentColor}18`,
                  borderColor: phase.accentColor,
                  color: phase.accentColor,
                }}
              >
                {phase.number}
              </div>
              <span
                className="text-xs font-mono whitespace-nowrap"
                style={{ color: phase.accentColor }}
              >
                {phase.days}
              </span>
            </div>
            {idx < PHASES.length - 1 && (
              <div
                className="w-16 sm:w-24 mx-2 mb-5 flex-shrink-0"
                style={{
                  height: '2px',
                  background: `linear-gradient(90deg, ${PHASES[idx].accentColor}, ${PHASES[idx + 1].accentColor})`,
                  boxShadow: `0 0 6px ${PHASES[idx].accentColor}60`,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            value: "5",
            label: t("stats.decisions"),
            sub: t("stats.decisionsSub"),
            color: "var(--lunar-cyan)",
            bg: "rgba(0,212,255,0.08)",
            border: "rgba(0,212,255,0.2)",
            accentBorder: "#00d4ff",
            icon: Flag,
          },
          {
            value: "3",
            label: t("stats.lois"),
            sub: t("stats.loisSub"),
            color: "#a855f7",
            bg: "rgba(168,85,247,0.08)",
            border: "rgba(168,85,247,0.2)",
            accentBorder: "#a855f7",
            icon: Users,
          },
          {
            value: "1",
            label: t("stats.board"),
            sub: t("stats.boardSub"),
            color: "var(--lunar-green)",
            bg: "rgba(16,185,129,0.08)",
            border: "rgba(16,185,129,0.2)",
            accentBorder: "#10b981",
            icon: TrendingUp,
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="lunar-card flex items-center gap-4"
              style={{ borderLeft: `3px solid ${stat.accentBorder}` }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: stat.bg, border: `1px solid ${stat.border}` }}
              >
                <Icon size={18} style={{ color: stat.color }} />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span
                    className="text-3xl font-bold font-mono"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--lunar-text-primary)" }}
                  >
                    {stat.label}
                  </span>
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--lunar-text-muted)" }}
                >
                  {stat.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Phase cards — 3-column management grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {PHASES.map((phase) => (
          <div
            key={phase.number}
            className="lunar-card flex flex-col"
            style={{ borderTop: `3px solid ${phase.accentColor}` }}
          >
            {/* Phase header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm font-mono flex-shrink-0"
                  style={{
                    background: `${phase.accentColor}18`,
                    color: phase.accentColor,
                    border: `2px solid ${phase.accentColor}40`,
                  }}
                >
                  {phase.number}
                </span>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded-full"
                  style={{
                    background: `${phase.accentColor}10`,
                    color: phase.accentColor,
                    border: `1px solid ${phase.accentColor}25`,
                  }}
                >
                  {phase.days}
                </span>
              </div>
              <h2 className="font-bold text-base mb-1.5" style={{ color: "var(--lunar-text-primary)" }}>
                {phase.name}
              </h2>
              <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>
                {phase.mission}
              </p>
            </div>

            {/* Hypothesis label */}
            {PHASE_HYPOTHESIS[phase.number] && (
              <div
                className="flex items-start gap-1.5 mb-3 text-xs"
                style={{ color: "var(--lunar-text-muted)" }}
              >
                <span
                  className="font-mono px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5"
                  style={{ background: `${phase.accentColor}18`, color: phase.accentColor, fontSize: "0.65rem" }}
                >
                  {t("hypLabel")}
                </span>
                <span>{PHASE_HYPOTHESIS[phase.number].label}</span>
              </div>
            )}

            {/* Action items — simple colour-coded list */}
            <ul className="space-y-2 mb-5 flex-1">
              {phase.actions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: BADGE_COLORS[action.badgeType] }}
                  />
                  <span className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>
                    {action.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Deliverable + Risk — side by side */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2.5 rounded-lg" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)" }}>
                <div className="flex items-center gap-1 mb-1">
                  <Target size={11} style={{ color: "var(--lunar-green)" }} />
                  <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--lunar-green)", fontSize: "0.6rem" }}>{t("delivers")}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>{phase.deliverable}</p>
              </div>
              <div className="p-2.5 rounded-lg" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}>
                <div className="flex items-center gap-1 mb-1">
                  <AlertTriangle size={11} style={{ color: "var(--lunar-amber)" }} />
                  <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--lunar-amber)", fontSize: "0.6rem" }}>{t("watchOut")}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>{phase.risk}</p>
              </div>
            </div>

            {/* Exit criteria — slim */}
            {PHASE_HYPOTHESIS[phase.number] && (
              <div
                className="px-2.5 py-2 rounded-lg mb-3 flex items-start gap-1.5"
                style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}
              >
                <AlertCircle size={11} style={{ color: "#ef4444", flexShrink: 0, marginTop: 2 }} />
                <span className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-muted)" }}>
                  <span className="font-semibold" style={{ color: "#ef4444" }}>{t("exitLabel")}: </span>
                  {PHASE_HYPOTHESIS[phase.number].killCriteria}
                </span>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* North Star CTA */}
      <div
        className="lunar-card"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(168,85,247,0.04) 50%, rgba(16,185,129,0.04) 100%)",
          border: "1px solid rgba(0,212,255,0.2)",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.25)",
            }}
          >
            <Flag size={20} style={{ color: "var(--lunar-green)" }} />
          </div>
          <div className="flex-1">
            <h3
              className="text-lg font-bold mb-2"
              style={{ color: "var(--lunar-text-primary)" }}
            >
              {t("northStar.title")}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--lunar-text-secondary)" }}
            >
              {t("northStar.body")}
            </p>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div
        className="text-xs p-4 rounded-xl"
        style={{
          background: "var(--lunar-elevated)",
          border: "1px solid var(--lunar-border-subtle)",
          color: "var(--lunar-text-muted)",
        }}
      >
        {t("footer")}
      </div>
    </div>
  );
}
