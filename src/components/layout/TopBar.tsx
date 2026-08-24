"use client";

import { useAppStore } from "@/store";
import type { ScenarioKey } from "@/data/market";
import { cn } from "@/lib/utils";
import { PanelLeft, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations } from "next-intl";


interface TopBarProps {
  onCommandPalette: () => void;
  isMobile?: boolean;
}

export function TopBar({ onCommandPalette, isMobile = false }: TopBarProps) {
  const { activeScenario, setScenario, setSidebarOpen, sidebarOpen } = useAppStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const tCommon = useTranslations("common");

  const SCENARIOS: { key: ScenarioKey; label: string; color: string }[] = [
    { key: "conservative", label: tCommon("scenarios.conservative"), color: "#7a90b0" },
    { key: "base", label: tCommon("scenarios.base"), color: "#00d4ff" },
    { key: "upside", label: tCommon("scenarios.upside"), color: "#10b981" },
  ];

  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center gap-3 px-4 py-2 border-b"
      style={{
        left: isMobile ? 0 : sidebarOpen ? "13rem" : "3.5rem",
        height: "3rem",
        background: "var(--lunar-surface)",
        borderColor: "var(--lunar-border-subtle)",
        transition: "left 0.2s",
      }}
      role="banner"
    >
      {/* Sidebar toggle — hamburger on mobile, panel icon on desktop */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-1.5 rounded hover:bg-white/5 transition-colors"
        aria-label="Toggle sidebar"
        style={{ color: "var(--lunar-text-secondary)" }}
      >
        {isMobile ? <Menu size={18} /> : <PanelLeft size={16} />}
      </button>

      {/* Title */}
      <div className="hidden md:flex flex-col mr-2 min-w-0 flex-shrink-0">
        <span className="text-xs font-bold tracking-widest uppercase whitespace-nowrap" style={{ color: 'var(--lunar-text-muted)' }}>
          Moonshot AI · Kimi EU Strategy
        </span>
        <span className="text-xs whitespace-nowrap" style={{ color: 'var(--lunar-text-muted)', fontSize: '0.6rem' }}>
          Thomas Zijlstra — Interview Analysis, Aug 2026
        </span>
      </div>

      {/* Scenario selector */}
      <div
        className="flex items-center gap-0.5 p-0.5 rounded-lg flex-shrink-0"
        style={{
          background: "var(--lunar-elevated)",
          border: "1px solid var(--lunar-border-subtle)",
        }}
        role="group"
        aria-label="Revenue scenario"
      >
        {SCENARIOS.map((s) => (
          <button
            key={s.key}
            onClick={() => setScenario(s.key)}
            className={cn(
              "px-2.5 py-1 rounded text-xs font-medium transition-all duration-150"
            )}
            style={{
              background:
                activeScenario === s.key ? s.color + "22" : "transparent",
              color:
                activeScenario === s.key ? s.color : "var(--lunar-text-muted)",
              border:
                activeScenario === s.key
                  ? `1px solid ${s.color}44`
                  : "1px solid transparent",
            }}
            aria-pressed={activeScenario === s.key}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {/* Language switcher */}
      <LanguageSwitcher />

      {/* Theme toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-1.5 rounded hover:bg-white/5 transition-colors"
        aria-label="Toggle theme"
        style={{ color: "var(--lunar-text-secondary)" }}
      >
        {mounted && (theme === "dark" ? <Moon size={15} /> : <Sun size={15} />)}
      </button>
    </header>
  );
}
