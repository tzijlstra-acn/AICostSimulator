"use client";

import { useState } from "react";
import { getSource } from "@/data/sources";
import { useTranslations } from "next-intl";

type EvidenceType =
  | "FACT"
  | "MODEL"
  | "ASSUMPTION"
  | "RECOMMENDATION"
  | "OPEN QUESTION";

interface EvidenceBadgeProps {
  type: EvidenceType;
  sourceId?: string;
  formula?: string;
  reasoning?: string;
  className?: string;
}

const TYPE_CLASSES: Record<EvidenceType, string> = {
  FACT: "badge-fact",
  MODEL: "badge-model",
  ASSUMPTION: "badge-assumption",
  RECOMMENDATION: "badge-recommendation",
  "OPEN QUESTION": "badge-open-question",
};

const TYPE_TO_KEY: Record<EvidenceType, string> = {
  FACT: "fact",
  MODEL: "model",
  ASSUMPTION: "assumption",
  RECOMMENDATION: "recommendation",
  "OPEN QUESTION": "openQuestion",
};

export function EvidenceBadge({
  type,
  sourceId,
  formula,
  reasoning,
  className,
}: EvidenceBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const source = sourceId ? getSource(sourceId) : undefined;
  const tCommon = useTranslations("common");
  const label = tCommon(TYPE_TO_KEY[type] as Parameters<typeof tCommon>[0]);

  return (
    <span className="relative inline-block">
      <span
        className={`${TYPE_CLASSES[type]} ${className || ""}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        role="note"
        aria-label={`${label}${sourceId ? ` — source ${sourceId}` : ""}${formula ? ` — ${formula}` : ""}`}
      >
        {label}
      </span>
      {showTooltip && (source || formula || reasoning) && (
        <div
          className="absolute bottom-full left-0 mb-2 w-64 p-3 rounded-lg z-50 text-xs shadow-xl"
          style={{
            background: "var(--lunar-panel)",
            border: "1px solid var(--lunar-border-strong)",
            color: "var(--lunar-text-primary)",
          }}
          role="tooltip"
        >
          {source && (
            <div>
              <div className="font-semibold mb-1" style={{ color: "var(--lunar-cyan)" }}>
                {sourceId}: {source.title}
              </div>
              <div style={{ color: "var(--lunar-text-secondary)" }}>
                {source.publisher} · {source.retrievalDate}
              </div>
              {source.excerpt && (
                <div className="mt-1" style={{ color: "var(--lunar-text-muted)" }}>
                  {source.excerpt}
                </div>
              )}
            </div>
          )}
          {formula && (
            <div
              className="font-mono mt-1 px-2 py-1 rounded"
              style={{
                background: "var(--lunar-elevated)",
                color: "var(--lunar-violet)",
              }}
            >
              {formula}
            </div>
          )}
          {reasoning && (
            <div className="mt-1" style={{ color: "var(--lunar-text-secondary)" }}>
              {reasoning}
            </div>
          )}
        </div>
      )}
    </span>
  );
}
