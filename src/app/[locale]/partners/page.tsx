"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PARTNERS, CATEGORY_LABELS, STAGE_LABELS } from "@/data/partners";
import type { PartnerCategory, PartnerStage } from "@/data/partners";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { AlertTriangle } from "lucide-react";

const LOGO_CATEGORY_COLORS: Record<string, string> = {
  cloud: '#00d4ff',
  gpu_inference: '#a855f7',
  telecom: '#00d4ff',
  si: '#f59e0b',
  msp: '#f59e0b',
  developer_tools: '#10b981',
  data_analytics: '#10b981',
  productivity: '#10b981',
  security: '#ef4444',
  industry_software: '#a855f7',
  university_research: '#7a90b0',
  marketplace: '#4a5a7a',
  reseller: '#4a5a7a',
};

const CDN_LOGO_MAP: Record<string, string> = {
  'aws.png': 'aws',
  'microsoft.png': 'microsoft-azure',
  'google.png': 'google-cloud',
  'sap.png': 'sap',
  'github.png': 'github',
  'snowflake.png': 'snowflake',
};
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@main/logos';

function PartnerLogo({ name, category, logoFile }: { name: string; category: string; logoFile?: string }) {
  const [imgError, setImgError] = useState(false);
  const color = LOGO_CATEGORY_COLORS[category] ?? '#4a5a7a';
  const initials = name
    .split(/[\s&/]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  const cdnSlug = logoFile ? CDN_LOGO_MAP[logoFile] : undefined;
  const logoSrc = cdnSlug ? `${CDN_BASE}/${cdnSlug}.svg` : undefined;

  if (logoSrc && !imgError) {
    return (
      <div
        className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shrink-0"
        style={{ background: '#ffffff', border: '1px solid rgba(255,255,255,0.15)', padding: 4 }}
        aria-hidden="true"
      >
        <img
          src={logoSrc}
          alt={name}
          width={28}
          height={28}
          className="object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Fallback: letter avatar
  return (
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
      style={{
        background: `${color}18`,
        border: `1px solid ${color}40`,
        color: color,
        fontFamily: 'monospace',
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

const STRATEGIC_FIT_COLORS: Record<string, string> = {
  critical: "var(--lunar-red)",
  high: "var(--lunar-amber)",
  medium: "var(--lunar-cyan)",
  low: "var(--lunar-text-muted)",
};

const STAGE_COLORS: Record<PartnerStage, string> = {
  target: "var(--lunar-text-muted)",
  outreach: "var(--lunar-amber)",
  discovery: "var(--lunar-violet)",
  pilot: "var(--lunar-cyan)",
  active: "var(--lunar-green)",
  signed: "var(--lunar-green)",
};

export default function PartnersPage() {
  const [filterCat, setFilterCat] = useState<string>("all");
  const t = useTranslations("partners");

  const categories = ["all", ...Array.from(new Set(PARTNERS.map((p) => p.category)))];
  const filtered = PARTNERS.filter((p) => filterCat === "all" || p.category === filterCat);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
          {t("title")}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
          {t("subtitle")}
        </p>
      </div>

      {/* Disclaimer */}
      <div
        className="flex items-start gap-3 p-4 rounded-lg"
        style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)" }}
        role="note"
      >
        <AlertTriangle size={16} style={{ color: "var(--lunar-amber)", flexShrink: 0 }} aria-hidden="true" />
        <div className="text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
          <strong style={{ color: "var(--lunar-amber)" }}>Disclaimer:</strong> {t("disclaimer")}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className="px-3 py-1 rounded-lg text-xs"
            style={{
              background: filterCat === cat ? "rgba(0,212,255,0.1)" : "var(--lunar-elevated)",
              color: filterCat === cat ? "var(--lunar-cyan)" : "var(--lunar-text-muted)",
              border: filterCat === cat ? "1px solid rgba(0,212,255,0.2)" : "1px solid var(--lunar-border-subtle)",
            }}
            aria-pressed={filterCat === cat}
          >
            {cat === "all" ? "All" : CATEGORY_LABELS[cat as PartnerCategory]}
          </button>
        ))}
      </div>

      {/* Partner grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((partner) => (
          <div key={partner.id} className="lunar-card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <PartnerLogo name={partner.name} category={partner.category} logoFile={partner.logoFile} />
                <div>
                  <div className="text-sm font-semibold" style={{ color: "var(--lunar-text-primary)" }}>
                    {partner.name}
                  </div>
                  <div className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>
                    {CATEGORY_LABELS[partner.category]}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{
                    background: `${STAGE_COLORS[partner.stage]}15`,
                    color: STAGE_COLORS[partner.stage],
                  }}
                >
                  {STAGE_LABELS[partner.stage]}
                </span>
                <span
                  className="text-xs"
                  style={{ color: STRATEGIC_FIT_COLORS[partner.strategicFit] }}
                >
                  {partner.strategicFit} fit
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs" style={{ color: "var(--lunar-text-secondary)" }}>
              <div>
                <span className="font-medium" style={{ color: "var(--lunar-text-muted)" }}>Geography:</span>{" "}
                {partner.geography.join(", ")}
              </div>
              <div>
                <span className="font-medium" style={{ color: "var(--lunar-text-muted)" }}>Model:</span>{" "}
                {partner.commercialModel}
              </div>
              {partner.notes && (
                <div className="pt-1" style={{ color: "var(--lunar-text-muted)" }}>
                  {partner.notes}
                </div>
              )}
            </div>

            <div
              className="mt-3 pt-3 flex items-center justify-between"
              style={{ borderTop: "1px solid var(--lunar-border-subtle)" }}
            >
              <div className="flex gap-2">
                {partner.infrastructureCapability && (
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.1)", color: "var(--lunar-cyan)" }}>
                    Infra
                  </span>
                )}
                {partner.regulatedIndustryReach && (
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(168,85,247,0.1)", color: "var(--lunar-violet)" }}>
                    Regulated
                  </span>
                )}
              </div>
              <div className="text-xs" style={{ color: "var(--lunar-text-muted)" }}>
                Owner: {partner.owner}
              </div>
            </div>

            {partner.nextAction && (
              <div
                className="mt-2 text-xs px-2 py-1.5 rounded"
                style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", color: "var(--lunar-amber)" }}
              >
                Next: {partner.nextAction}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
