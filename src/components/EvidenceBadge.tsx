"use client";

import { createContext, useContext, useState } from "react";
import { getSource } from "@/data/sources";

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

// English defaults — used when no BadgeLabelsProvider is in the tree (e.g., non-locale pages)
export const DEFAULT_BADGE_LABELS = {
  fact: "FACT",
  model: "MODEL",
  assumption: "ASSUMPTION",
  recommendation: "RECOMMENDATION",
  openQuestion: "OPEN QUESTION",
} as const;

type BadgeLabels = typeof DEFAULT_BADGE_LABELS;

const BadgeLabelsContext = createContext<BadgeLabels>(DEFAULT_BADGE_LABELS);

/**
 * Provide translated badge labels inside a NextIntlClientProvider tree.
 * Wrap [locale]/layout children with this so EvidenceBadge picks up translations.
 */
export function BadgeLabelsProvider({
  labels,
  children,
}: {
  labels: BadgeLabels;
  children: React.ReactNode;
}) {
  return (
    <BadgeLabelsContext.Provider value={labels}>
      {children}
    </BadgeLabelsContext.Provider>
  );
}

const TYPE_TO_KEY: Record<EvidenceType, keyof BadgeLabels> = {
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
  const labels = useContext(BadgeLabelsContext);
  const label = labels[TYPE_TO_KEY[type]];

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
