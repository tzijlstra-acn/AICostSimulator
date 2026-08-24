"use client";

import { useTranslations } from "next-intl";
import { BadgeLabelsProvider, DEFAULT_BADGE_LABELS } from "@/components/EvidenceBadge";

type BadgeLabels = typeof DEFAULT_BADGE_LABELS;

export function LocaleBadgeLabelsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const tCommon = useTranslations("common");

  const labels = {
    fact: tCommon("fact"),
    model: tCommon("model"),
    assumption: tCommon("assumption"),
    recommendation: tCommon("recommendation"),
    openQuestion: tCommon("openQuestion"),
  } as BadgeLabels;

  return <BadgeLabelsProvider labels={labels}>{children}</BadgeLabelsProvider>;
}
