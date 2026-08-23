import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value: number,
  decimals = 1,
  suffix = ""
): string {
  if (value >= 1_000_000_000) {
    return `€${(value / 1_000_000_000).toFixed(decimals)}B${suffix}`;
  }
  if (value >= 1_000_000) {
    return `€${(value / 1_000_000).toFixed(decimals)}M${suffix}`;
  }
  if (value >= 1_000) {
    return `€${(value / 1_000).toFixed(decimals)}K${suffix}`;
  }
  return `€${value.toFixed(decimals)}${suffix}`;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString("en-EU", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
