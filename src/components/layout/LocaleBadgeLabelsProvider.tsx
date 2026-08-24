"use client";

import { useTranslations } from "next-intl";
import { BadgeLabelsProvider } from "@/components/EvidenceBadge";

/**
 * Reads badge-type labels from next-intl and makes them available to all
 * EvidenceBadge instances in the locale subtree via React context.
 * Must be rendered inside a NextIntlClientProvider.
 */
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
  } as const;

  return <BadgeLabelsProvider labels={labels}>{children}</BadgeLabelsProvider>;
}
