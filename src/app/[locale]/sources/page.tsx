"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SOURCES } from "@/data/sources";
import { ExternalLink } from "lucide-react";

export default function SourcesPage() {
  const [filter, setFilter] = useState("");
  const t = useTranslations("sources");

  const filtered = SOURCES.filter(
    (s) =>
      !filter ||
      s.title.toLowerCase().includes(filter.toLowerCase()) ||
      s.publisher.toLowerCase().includes(filter.toLowerCase()) ||
      s.id.toLowerCase().includes(filter.toLowerCase()) ||
      s.entities.some((e) => e.toLowerCase().includes(filter.toLowerCase()))
  );

  const CONFIDENCE_COLORS: Record<string, string> = {
    high: "var(--lunar-green)",
    medium: "var(--lunar-amber)",
    low: "var(--lunar-red)",
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--lunar-text-primary)" }}>
          {t("title")}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
          {t("subtitle", { count: SOURCES.length, total: SOURCES.length })}
        </p>
      </div>

      {/* Search */}
      <input
        type="search"
        placeholder="Search sources by ID, title, publisher, or entity..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full px-4 py-2 rounded-lg text-sm"
        style={{
          background: "var(--lunar-elevated)",
          border: "1px solid var(--lunar-border-subtle)",
          color: "var(--lunar-text-primary)",
        }}
        aria-label="Search sources"
      />

      <div className="space-y-3">
        {filtered.map((source) => (
          <div key={source.id} className="lunar-card">
            <div className="flex items-start gap-4">
              <span
                className="flex-shrink-0 text-xs font-mono font-bold px-2 py-1 rounded"
                style={{
                  background: "rgba(0,212,255,0.1)",
                  color: "var(--lunar-cyan)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  minWidth: "3rem",
                  textAlign: "center",
                }}
              >
                {source.id}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:underline flex items-center gap-1"
                    style={{ color: "var(--lunar-text-primary)" }}
                    aria-label={`${source.title} (opens in new tab)`}
                  >
                    {source.title}
                    <ExternalLink size={11} style={{ color: "var(--lunar-text-muted)" }} aria-hidden="true" />
                  </a>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded capitalize"
                    style={{ background: `${CONFIDENCE_COLORS[source.confidence]}15`, color: CONFIDENCE_COLORS[source.confidence] }}
                  >
                    {source.confidence} {t("confidenceLabel")}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: "var(--lunar-text-muted)" }}>
                  <span>{source.publisher}</span>
                  <span>·</span>
                  <span>{t("retrievedLabel")} {source.retrievalDate}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
                  {source.excerpt}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {source.entities.map((entity) => (
                    <span
                      key={entity}
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ background: "var(--lunar-elevated)", color: "var(--lunar-text-muted)", border: "1px solid var(--lunar-border-subtle)" }}
                    >
                      {entity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12" style={{ color: "var(--lunar-text-muted)" }}>
          No sources match &ldquo;{filter}&rdquo;
        </div>
      )}

      <div className="text-xs p-3 rounded" style={{ background: "var(--lunar-elevated)", color: "var(--lunar-text-muted)" }}>
        All URLs were verified accessible as of the retrieval date shown. Verify currency before use in presentations or documents.
        Data from Chinese-origin government or academic sources should be treated with appropriate data provenance assessment.
      </div>
    </div>
  );
}
