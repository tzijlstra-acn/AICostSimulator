"use client";

import { useTranslations } from "next-intl";
import { useAppStore } from "@/store";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import {
  Trophy,
  Target,
  CheckCircle2,
  Lightbulb,
  HelpCircle,
  AlertTriangle,
  AlertCircle,
  Users,
  TrendingUp,
  Flag,
} from "lucide-react";
import React from "react";

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
  logLabel: string;
}

const PHASES: Phase[] = [
  {
    number: 1,
    name: "Listen, Map, and Build Trust",
    days: "Days 1–30",
    dayNumber: "30",
    mission:
      "Develop a ground-truth view of the European opportunity before proposing any strategy.",
    accentColor: "#00d4ff",
    actions: [
      {
        text: "Meet the top 3 internal teams (Product, Engineering, Legal) within week 1 — understand current EU state",
        badgeType: "RECOMMENDATION",
      },
      {
        text: "Map all existing EU relationships, MoUs, data-processing agreements, and cloud contracts",
        badgeType: "RECOMMENDATION",
      },
      {
        text: "Identify 5–10 potential European enterprise design partners willing to run a confidential pilot by Q3 2027",
        badgeType: "ASSUMPTION",
      },
      {
        text: "Attend 1 major EU AI or enterprise tech event (VivaTech, Web Summit, or equivalent) to build network",
        badgeType: "RECOMMENDATION",
      },
      {
        text: "Complete a personal listening tour — 20 conversations with EU prospects, analysts, and ecosystem stakeholders",
        badgeType: "ASSUMPTION",
      },
      {
        text: "Review the AI Act implementation status and identify which Annex III use cases Kimi likely hits",
        badgeType: "RECOMMENDATION",
      },
      {
        text: "Does Moonshot AI have an existing EU legal entity, or is one needed before any commercial activity?",
        badgeType: "OPEN QUESTION",
      },
    ],
    deliverable:
      "Stakeholder map + EU readiness gap assessment (internal memo, 10 pages)",
    risk: "Announcing strategy before understanding internal constraints and partner landscape",
    logLabel: "Phase 1: Listen, Map, Trust — 90-Day Thesis",
  },
  {
    number: 2,
    name: "Validate, Decide, and Build the Machine",
    days: "Days 31–60",
    dayNumber: "60",
    mission:
      "Validate the market entry thesis against real buyer intent and make the first binding decisions.",
    accentColor: "#a855f7",
    actions: [
      {
        text: "Lock in the primary market entry mode for the UK and Germany — direct-led vs partner-led requires a committed decision, not a hedge",
        badgeType: "RECOMMENDATION",
      },
      {
        text: "Run the first 3 design-partner workshops — get signed LOIs or walk away",
        badgeType: "ASSUMPTION",
      },
      {
        text: "Draft and socialise the Legal Entity Architecture: UK Ltd + Netherlands BV + trust framework (Subject to Phase 1 legal-entity review — UK Ltd + Netherlands BV is the recommended structure pending counsel validation)",
        badgeType: "RECOMMENDATION",
      },
      {
        text: "Hire the first 3 EU team members: VP Legal/Compliance, Head of Enterprise Sales, Solutions Engineer",
        badgeType: "ASSUMPTION",
      },
      {
        text: "Establish the EU Pricing Committee with CFO involvement — pricing must be committed before any public commercial announcement",
        badgeType: "RECOMMENDATION",
      },
      {
        text: "Submit the EU AI Act Article 6 self-assessment for the product categories you plan to sell",
        badgeType: "RECOMMENDATION",
      },
      {
        text: "Is a third-party EU audit of Kimi's training data provenance required before enterprise go-to-market?",
        badgeType: "OPEN QUESTION",
      },
    ],
    deliverable:
      "Signed design-partner LOIs (at least 2) + legal entity decision approved by CEO",
    risk: "Scaling sales motion before compliance architecture is confirmed",
    logLabel: "Phase 2: Validate, Decide, Build — 90-Day Thesis",
  },
  {
    number: 3,
    name: "Anchor the Position and Declare",
    days: "Days 61–90",
    dayNumber: "90",
    mission:
      "Translate the work of the first 60 days into a committed, board-ready European market plan.",
    accentColor: "#10b981",
    actions: [
      {
        text: "Present a board-ready European expansion business case — investment ask, phased revenue model, headcount plan",
        badgeType: "RECOMMENDATION",
      },
      {
        text: "Publish a developer-facing EU roadmap (what regions, what compliance posture, what SLAs)",
        badgeType: "RECOMMENDATION",
      },
      {
        text: "Announce first EU design partnership publicly (with partner consent) — builds credibility and triggers inbound",
        badgeType: "ASSUMPTION",
      },
      {
        text: "Establish a monthly EU Executive Review with CEO — keep Europe visible at the top",
        badgeType: "RECOMMENDATION",
      },
      {
        text: "Complete GDPR DPA templates and EU-standard data processing addenda — pre-negotiated versions ready for sales",
        badgeType: "RECOMMENDATION",
      },
      {
        text: "Close first paid pilot (even at nominal price) — real commercial signal outweighs 100 LOIs",
        badgeType: "ASSUMPTION",
      },
      {
        text: "Which EU AI governance frameworks (EU AI Office, ISO 42001) will Moonshot AI seek formal certification for?",
        badgeType: "OPEN QUESTION",
      },
    ],
    deliverable:
      "Board presentation approved + first public EU announcement + first paid pilot signed",
    risk:
      "Over-committing to a country or partner before having operational capacity to deliver",
    logLabel: "Phase 3: Anchor, Declare — 90-Day Thesis",
  },
];

const PHASE_HYPOTHESIS: Record<number, { label: string; killCriteria: string }> = {
  1: {
    label: 'Hypothesis discovery: Are H1/H2/H3 viable at all? The listening tour is the experiment.',
    killCriteria: 'If zero of 20 listening-tour conversations produce any buying signal, the EU market timing hypothesis is wrong — recommend delaying 12 months and revisiting.',
  },
  2: {
    label: 'Testing H1 — do UK developers pay? Testing H2 — do EU enterprises cite compliance as a driver?',
    killCriteria: 'If H1 produces fewer than 3 paying developer teams after 30 qualified conversations, exit the UK beachhead and redirect resources to NL enterprise via H2.',
  },
  3: {
    label: 'Scaling: Apply learnings from H1/H2. Kill what failed; double down on what shows signal.',
    killCriteria: 'If the board case cannot be supported by real LOIs — only modelled projections — delay the board presentation. It will not survive scrutiny.',
  },
};

const BADGE_ICONS: Record<ActionItem["badgeType"], React.ElementType> = {
  FACT: CheckCircle2,
  ASSUMPTION: AlertCircle,
  RECOMMENDATION: Lightbulb,
  "OPEN QUESTION": HelpCircle,
};

const BADGE_COLORS: Record<ActionItem["badgeType"], string> = {
  FACT: "#10b981",
  ASSUMPTION: "#f59e0b",
  RECOMMENDATION: "#00d4ff",
  "OPEN QUESTION": "#a855f7",
};

const BADGE_TYPE_MAP: Record<
  ActionItem["badgeType"],
  "FACT" | "MODEL" | "ASSUMPTION" | "RECOMMENDATION" | "OPEN QUESTION"
> = {
  FACT: "FACT",
  ASSUMPTION: "ASSUMPTION",
  RECOMMENDATION: "RECOMMENDATION",
  "OPEN QUESTION": "OPEN QUESTION",
};

export default function NinetyDaysPage() {
  const t = useTranslations("ninetyDays");
  const { addDecision } = useAppStore();

  const handleAddToLog = (phase: Phase) => {
    addDecision({
      text: phase.logLabel,
      status: "proposed",
      owner: "Thomas Zijlstra",
      date: new Date().toISOString().slice(0, 10),
      rationale: `Phase ${phase.number} (${phase.days}): ${phase.mission} Key deliverable: ${phase.deliverable}`,
      evidence: "90-Day Thesis",
    });
  };

  const handleSaveNorthStar = () => {
    addDecision({
      text: "North Star: Committed European Expansion Plan by Day 90",
      status: "proposed",
      owner: "CEO / EU Strategy Lead",
      date: new Date().toISOString().slice(0, 10),
      rationale:
        "By Day 90, Moonshot AI has a committed European expansion plan, signed design partners, a legal entity architecture, and a board-approved investment case. The first Kimi EU customer conversation has happened.",
      evidence: "90-Day Thesis",
    });
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
          My strategic rationale
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--lunar-text-secondary)' }}
        >
          The sequence is deliberate. The first 30 days are dedicated to internal listening — a credible European
          strategy cannot be written without first understanding Moonshot AI&apos;s actual constraints, relationships, and
          priorities. Phase 2 flows directly from Phase 1&apos;s stakeholder map: the LOI targets emerge from the listening
          tour, not from assumptions. Phase 3&apos;s board presentation carries weight only if it rests on real signed
          commitments — not modelled projections. Every phase gate is a genuine go/no-go checkpoint.
        </p>
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
            label: "binding decisions",
            sub: "Key decisions to make in 90 days",
            color: "var(--lunar-cyan)",
            bg: "rgba(0,212,255,0.08)",
            border: "rgba(0,212,255,0.2)",
            accentBorder: "#00d4ff",
            icon: Flag,
          },
          {
            value: "3",
            label: "signed LOIs",
            sub: "Design-partner commitments target",
            color: "#a855f7",
            bg: "rgba(168,85,247,0.08)",
            border: "rgba(168,85,247,0.2)",
            accentBorder: "#a855f7",
            icon: Users,
          },
          {
            value: "1",
            label: "board presentation",
            sub: "The strategic deliverable",
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

      {/* Phase cards with timeline spine */}
      <div className="relative">
        {/* Vertical spine — desktop only */}
        <div
          className="absolute left-5 top-8 bottom-8 hidden md:block"
          style={{
            width: '2px',
            background: "linear-gradient(180deg, #00d4ff 0%, #a855f7 50%, #10b981 100%)",
            boxShadow: '0 0 8px rgba(0, 212, 255, 0.25)',
          }}
        />

        <div className="space-y-6">
          {PHASES.map((phase) => {
            return (
              <div key={phase.number} className="flex gap-0 md:gap-6">
                {/* Timeline node — desktop only */}
                <div className="hidden md:flex flex-col items-center flex-shrink-0 w-10 pt-5 z-10">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-mono text-sm border-2"
                    style={{
                      background: "var(--lunar-bg)",
                      borderColor: phase.accentColor,
                      color: phase.accentColor,
                    }}
                  >
                    {phase.dayNumber}
                  </div>
                </div>

                {/* Phase card */}
                <div
                  className="flex-1 lunar-card"
                  style={{ borderLeft: `4px solid ${phase.accentColor}` }}
                >
                  {/* Phase header */}
                  <div className="flex items-start justify-between mb-5 gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-3">
                        <span
                          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg font-mono flex-shrink-0"
                          style={{
                            background: `${phase.accentColor}18`,
                            color: phase.accentColor,
                            border: `2px solid ${phase.accentColor}55`,
                            boxShadow: `0 0 10px ${phase.accentColor}25`,
                          }}
                        >
                          {phase.number}
                        </span>
                        <span
                          className="text-xs font-mono px-3 py-1 rounded-full font-bold"
                          style={{
                            background: `${phase.accentColor}12`,
                            color: phase.accentColor,
                            border: `1px solid ${phase.accentColor}28`,
                          }}
                        >
                          {phase.days}
                        </span>
                      </div>
                      <h2
                        className="font-bold leading-snug mb-2"
                        style={{
                          color: "var(--lunar-text-primary)",
                          fontSize: "1.125rem",
                        }}
                      >
                        {phase.name}
                      </h2>
                      <p
                        className="leading-relaxed font-medium"
                        style={{
                          color: "var(--lunar-text-secondary)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {phase.mission}
                      </p>
                    </div>
                    {/* Ghost day counter */}
                    <div
                      className="text-6xl font-bold font-mono flex-shrink-0 leading-none hidden lg:block select-none"
                      style={{ color: `${phase.accentColor}20` }}
                    >
                      {phase.dayNumber}
                    </div>
                  </div>

                  {/* Action items grid — 2 cols desktop, 1 mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                    {phase.actions.map((action, idx) => {
                      const Icon = BADGE_ICONS[action.badgeType];
                      const iconColor = BADGE_COLORS[action.badgeType];
                      return (
                        <div
                          key={idx}
                          className="p-3 rounded-lg"
                          style={{
                            background: "var(--lunar-elevated)",
                            border: "1px solid var(--lunar-border-subtle)",
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <Icon
                              size={14}
                              style={{
                                color: iconColor,
                                flexShrink: 0,
                                marginTop: 2,
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <EvidenceBadge
                                type={BADGE_TYPE_MAP[action.badgeType]}
                                className="mb-1.5"
                              />
                              <p
                                className="text-xs leading-relaxed"
                                style={{ color: "var(--lunar-text-secondary)" }}
                              >
                                {action.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Deliverable box */}
                  <div
                    className="flex items-start gap-3 p-3 rounded-lg mb-3"
                    style={{
                      background: "rgba(16,185,129,0.08)",
                      border: "1px solid rgba(16,185,129,0.25)",
                    }}
                  >
                    <Target
                      size={16}
                      style={{
                        color: "var(--lunar-green)",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    />
                    <div>
                      <div
                        className="text-xs font-bold uppercase tracking-wide mb-0.5"
                        style={{ color: "var(--lunar-green)" }}
                      >
                        Key Deliverable
                      </div>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "var(--lunar-text-secondary)" }}
                      >
                        {phase.deliverable}
                      </p>
                    </div>
                  </div>

                  {/* Risk box */}
                  <div
                    className="flex items-start gap-3 p-3 rounded-lg mb-4"
                    style={{
                      background: "rgba(245,158,11,0.07)",
                      border: "1px solid rgba(245,158,11,0.2)",
                    }}
                  >
                    <AlertTriangle
                      size={16}
                      style={{
                        color: "var(--lunar-amber)",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    />
                    <div>
                      <div
                        className="text-xs font-bold uppercase tracking-wide mb-0.5"
                        style={{ color: "var(--lunar-amber)" }}
                      >
                        Risk to Avoid
                      </div>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "var(--lunar-text-secondary)" }}
                      >
                        {phase.risk}
                      </p>
                    </div>
                  </div>

                  {/* Hypothesis label */}
                  {PHASE_HYPOTHESIS[phase.number] && (
                    <>
                      <div
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg mb-2"
                        style={{
                          background: `${phase.accentColor}0a`,
                          border: `1px solid ${phase.accentColor}20`,
                        }}
                      >
                        <span
                          className="text-xs font-mono font-bold px-1 rounded"
                          style={{ background: `${phase.accentColor}18`, color: phase.accentColor }}
                        >
                          HYP
                        </span>
                        <span className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>
                          {PHASE_HYPOTHESIS[phase.number].label}
                        </span>
                      </div>
                      {/* Kill criteria */}
                      <div
                        className="flex items-start gap-3 p-3 rounded-lg mb-4"
                        style={{
                          background: 'rgba(239,68,68,0.06)',
                          border: '1px solid rgba(239,68,68,0.2)',
                        }}
                      >
                        <AlertCircle
                          size={14}
                          style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }}
                        />
                        <div>
                          <div
                            className="text-xs font-bold uppercase tracking-wide mb-0.5"
                            style={{ color: '#ef4444' }}
                          >
                            Exit Criteria
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--lunar-text-secondary)' }}>
                            {PHASE_HYPOTHESIS[phase.number].killCriteria}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Add to Decision Log */}
                  <button
                    onClick={() => handleAddToLog(phase)}
                    className="w-full py-2 rounded-lg text-xs font-medium transition-colors"
                    style={{
                      background: `${phase.accentColor}12`,
                      color: phase.accentColor,
                      border: `1px solid ${phase.accentColor}30`,
                    }}
                  >
                    Add Phase {phase.number} to Decision Log
                  </button>
                </div>
              </div>
            );
          })}
        </div>
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
              The North Star for Day 90
            </h3>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "var(--lunar-text-secondary)" }}
            >
              By Day 90, Moonshot AI has a committed European expansion plan,
              signed design partners, a legal entity architecture, and a
              board-approved investment case. The first Kimi EU customer
              conversation has happened.
            </p>
            <button
              onClick={handleSaveNorthStar}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: "rgba(16,185,129,0.15)",
                color: "var(--lunar-green)",
                border: "1px solid rgba(16,185,129,0.3)",
              }}
            >
              Save this plan to my Decision Log
            </button>
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
        <strong style={{ color: "var(--lunar-amber)" }}>
          Note on evidence labels:
        </strong>{" "}
        RECOMMENDATION items are commitments the strategy lead is making.
        ASSUMPTION items require validation before committing resources. OPEN
        QUESTION items must be resolved before the phase ends. FACT items are
        verified external facts about the regulatory or market environment.
      </div>
    </div>
  );
}
