"use client";

import { STRATEGIC_THESIS, STRATEGIC_NARRATIVES } from "@/data/strategy";
import { SWOT_ANALYSIS } from "@/data/swot";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function StrategyPage() {
  const t = useTranslations("strategy");
  const tCockpit = useTranslations("cockpit");

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
          &ldquo;A single message will not land across a board, an enterprise procurement team, and a developer community simultaneously. I have designed three distinct narratives — each true, each tailored, each pointing at the same underlying strategic reality.&rdquo;
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-1">
            <div className="text-xs font-semibold" style={{ color: "var(--lunar-cyan)" }}>Board: first-mover in a defined window</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>The EU enterprise AI API market is €2.8B by 2028. Kimi has a 12–18 month window to establish a compliance moat before US hyperscalers complete their EU Act adjustments. This is the investment case.</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold" style={{ color: "#a855f7" }}>Enterprise buyer: compliant by design</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>EU procurement teams are not buying AI — they are managing risk. The narrative is not &apos;best model&apos; but &apos;only model with a native EU data trust architecture that procurement can sign off without a 6-month legal review.&apos;</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold" style={{ color: "var(--lunar-amber)" }}>Developer: best context per dollar</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>1M-token context window at sub-GPT-4o pricing. For developers building document-intensive applications — legal, financial, pharma — this is not a marginal improvement; it is the only model that makes their use case technically feasible.</p>
          </div>
        </div>
      </div>

      {/* Headline thesis */}
      <div
        className="rounded-xl p-6"
        style={{
          background: "linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(168,85,247,0.04) 100%)",
          border: "1px solid rgba(0,212,255,0.15)",
        }}
      >
        <div className="flex items-start gap-4">
          <div className="text-5xl" aria-hidden="true">◎</div>
          <div>
            <div className="stat-label mb-2">{tCockpit("strategicVerdict")}</div>
            <div className="text-2xl font-bold mb-3" style={{ color: "var(--lunar-cyan)" }}>
              &ldquo;{STRATEGIC_THESIS.headline}&rdquo;
            </div>
            <p className="text-base" style={{ color: "var(--lunar-text-secondary)" }}>
              {STRATEGIC_THESIS.subheadline}
            </p>
          </div>
        </div>
      </div>

      {/* Moonshot */}
      <div className="lunar-card">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "var(--lunar-cyan)" }}>
            {STRATEGIC_THESIS.moonshot.title}
          </h2>
          <EvidenceBadge type="RECOMMENDATION" reasoning="Analyst synthesis of market opportunity and Kimi differentiators" />
        </div>
        <p className="text-sm" style={{ color: "var(--lunar-text-primary)" }}>
          {STRATEGIC_THESIS.moonshot.text}
        </p>
      </div>

      {/* Principles */}
      <div>
        <h2 className="text-sm font-semibold mb-4 section-header">{tCockpit("strategicPrinciples")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STRATEGIC_THESIS.principles.map((p) => (
            <div
              key={p.number}
              className="lunar-card hover:border-cyan-500/20 transition-colors"
              style={{
                border: "1px solid var(--lunar-border-subtle)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-mono flex-shrink-0"
                  style={{
                    background: "rgba(0,212,255,0.1)",
                    color: "var(--lunar-cyan)",
                    border: "1px solid rgba(0,212,255,0.25)",
                  }}
                >
                  {p.number}
                </span>
                <h3 className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
                  {p.title}
                </h3>
              </div>
              <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Narrative cards by audience */}
      <div>
        <h2 className="section-header mb-4">{t("narrativesTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="lunar-card">
            <div className="stat-label mb-2" style={{ color: "var(--lunar-violet)" }}>{t("boardNarrative")}</div>
            <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
              {STRATEGIC_NARRATIVES.forBoard}
            </p>
          </div>
          <div className="lunar-card">
            <div className="stat-label mb-2" style={{ color: "var(--lunar-cyan)" }}>{t("enterpriseBuyer")}</div>
            <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
              {STRATEGIC_NARRATIVES.forEnterpriseBuyer}
            </p>
          </div>
          <div className="lunar-card">
            <div className="stat-label mb-2" style={{ color: "var(--lunar-green)" }}>{t("developerCommunity")}</div>
            <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
              {STRATEGIC_NARRATIVES.forDeveloper}
            </p>
          </div>
        </div>
      </div>

      {/* Immediate Decisions */}
      <div className="lunar-card">
        <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--lunar-text-primary)" }}>
          {tCockpit("immediateDecisions")}
        </h2>
        <div className="space-y-3">
          {STRATEGIC_THESIS.immediateDecisions.map((d) => (
            <div
              key={d.priority}
              className="flex items-start gap-4 p-3 rounded-lg"
              style={{
                background: "var(--lunar-elevated)",
                border: "1px solid var(--lunar-border-subtle)",
              }}
            >
              <span
                className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center text-xs font-mono font-bold"
                style={{ background: "rgba(245,158,11,0.1)", color: "var(--lunar-amber)" }}
              >
                {d.priority}
              </span>
              <div className="flex-1">
                <div className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
                  {d.decision}
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs" style={{ color: "var(--lunar-text-muted)" }}>
                  <span>{t("deadline")}: {d.deadline}</span>
                  <span>{tCockpit("owner")}: {d.owner}</span>
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--lunar-red)" }}>
                  ⚠ {d.consequence}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SWOT Analysis */}
      <div>
        <h2 className="text-sm font-semibold mb-1 section-header">SWOT Analysis</h2>
        <p className="text-xs mb-4" style={{ color: "var(--lunar-text-muted)" }}>
          Source: Moonshot AI Europe Target Account Intelligence
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(
            [
              { key: "strengths" as const, label: "Strengths", accent: "var(--lunar-green)", bg: "rgba(16,185,129,0.04)" },
              { key: "weaknesses" as const, label: "Weaknesses", accent: "var(--lunar-red)", bg: "rgba(239,68,68,0.04)" },
              { key: "opportunities" as const, label: "Opportunities", accent: "var(--lunar-cyan)", bg: "rgba(0,212,255,0.04)" },
              { key: "threats" as const, label: "Threats", accent: "var(--lunar-amber)", bg: "rgba(245,158,11,0.04)" },
            ] as const
          ).map(({ key, label, accent, bg }) => (
            <div
              key={key}
              className="rounded-xl p-4"
              style={{ background: bg, border: `1px solid ${accent}30` }}
            >
              <div
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: accent }}
              >
                {label}
              </div>
              <div className="space-y-2">
                {SWOT_ANALYSIS[key].map((item) => (
                  <div key={item.title}>
                    <div className="text-xs font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
                      {item.title}
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>
                      {item.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation links */}
      <div className="flex gap-3 flex-wrap">
        {[
          { href: "/market" as const, label: t("navLinks.marketSizing") },
          { href: "/countries" as const, label: t("navLinks.countryNavigator") },
          { href: "/regulation" as const, label: t("navLinks.regulatoryRoadmap") },
          { href: "/roadmap" as const, label: t("navLinks.phaseRoadmap") },
          { href: "/risks" as const, label: t("navLinks.riskRegister") },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors"
            style={{
              background: "var(--lunar-elevated)",
              border: "1px solid var(--lunar-border-subtle)",
              color: "var(--lunar-cyan)",
            }}
          >
            {link.label} <ArrowRight size={12} />
          </Link>
        ))}
      </div>
    </div>
  );
}
