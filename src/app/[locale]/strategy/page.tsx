"use client";

import { STRATEGIC_THESIS, STRATEGIC_NARRATIVES } from "@/data/strategy";
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
        <h2 className="section-header mb-4">Strategic Narratives by Audience</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="lunar-card">
            <div className="stat-label mb-2" style={{ color: "var(--lunar-violet)" }}>Board Narrative</div>
            <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
              {STRATEGIC_NARRATIVES.forBoard}
            </p>
          </div>
          <div className="lunar-card">
            <div className="stat-label mb-2" style={{ color: "var(--lunar-cyan)" }}>Enterprise Buyer</div>
            <p className="text-sm" style={{ color: "var(--lunar-text-secondary)" }}>
              {STRATEGIC_NARRATIVES.forEnterpriseBuyer}
            </p>
          </div>
          <div className="lunar-card">
            <div className="stat-label mb-2" style={{ color: "var(--lunar-green)" }}>Developer Community</div>
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
                  <span>Deadline: {d.deadline}</span>
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

      {/* Navigation links */}
      <div className="flex gap-3 flex-wrap">
        {[
          { href: "/market" as const, label: "Market Sizing" },
          { href: "/countries" as const, label: "Country Navigator" },
          { href: "/regulation" as const, label: "Regulatory Roadmap" },
          { href: "/roadmap" as const, label: "Phase Roadmap" },
          { href: "/risks" as const, label: "Risk Register" },
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
