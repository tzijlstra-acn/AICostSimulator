"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/lib/navigation";
import { Command } from "cmdk";
import { COUNTRIES, COUNTRY_ID_TO_ISO2 } from "@/data/countries";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { COMPETITORS } from "@/data/competitors";
import { RISKS } from "@/data/risks";
import { OFFERS } from "@/data/offers";
import { SOURCES } from "@/data/sources";

const PAGES = [
  { href: "/", label: "Executive Cockpit", group: "Pages" },
  { href: "/strategy", label: "Strategic Thesis", group: "Pages" },
  { href: "/market", label: "Market Sizing Lab", group: "Pages" },
  { href: "/countries", label: "Country Navigator", group: "Pages" },
  { href: "/portfolio", label: "Product & Revenue Stack", group: "Pages" },
  { href: "/competition", label: "Competition Arena", group: "Pages" },
  { href: "/regulation", label: "Regulatory & Trust Center", group: "Pages" },
  { href: "/gtm", label: "Go-to-Market Playbooks", group: "Pages" },
  { href: "/partners", label: "Partner Ecosystem", group: "Pages" },
  { href: "/roadmap", label: "Roadmap & Stage Gates", group: "Pages" },
  { href: "/organization", label: "Organization & Skills Builder", group: "Pages" },
  { href: "/financials", label: "Revenue & Financials", group: "Pages" },
  { href: "/risks", label: "Risk Register", group: "Pages" },
  { href: "/sources", label: "Source Library", group: "Pages" },
  { href: "/memo", label: "Board Memo & Export", group: "Pages" },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const navigate = (href: string) => {
    router.push(href);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4"
      style={{ background: "rgba(7,11,20,0.85)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <Command
        className="w-full max-w-xl rounded-xl overflow-hidden shadow-2xl"
        style={{
          background: "var(--lunar-panel)",
          border: "1px solid var(--lunar-border-strong)",
        }}
      >
        <div
          className="flex items-center px-4 py-3 border-b"
          style={{ borderColor: "var(--lunar-border-subtle)" }}
        >
          <Command.Input
            autoFocus
            placeholder="Search pages, countries, competitors, risks..."
            value={search}
            onValueChange={setSearch}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-lunar-muted"
            style={{ color: "var(--lunar-text-primary)" }}
          />
          <kbd
            className="text-xs font-mono px-1.5 py-0.5 rounded ml-2"
            style={{
              background: "var(--lunar-elevated)",
              color: "var(--lunar-text-muted)",
              border: "1px solid var(--lunar-border-subtle)",
            }}
          >
            ESC
          </kbd>
        </div>
        <Command.List
          className="max-h-80 overflow-y-auto py-2"
          aria-label="Command results"
        >
          <Command.Empty
            className="py-8 text-center text-sm"
            style={{ color: "var(--lunar-text-muted)" }}
          >
            No results found
          </Command.Empty>

          <Command.Group
            heading="Pages"
            className="px-2"
          >
            {PAGES.map((page) => (
              <Command.Item
                key={page.href}
                value={page.label}
                onSelect={() => navigate(page.href)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm"
                style={{
                  color: "var(--lunar-text-primary)",
                }}
              >
                <span
                  className="w-4 h-4 rounded text-xs flex items-center justify-center font-mono"
                  style={{
                    background: "var(--lunar-elevated)",
                    color: "var(--lunar-cyan)",
                    fontSize: "0.6rem",
                  }}
                >
                  →
                </span>
                {page.label}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Countries" className="px-2">
            {COUNTRIES.map((c) => (
              <Command.Item
                key={c.id}
                value={`${c.name} country`}
                onSelect={() => navigate(`/countries?country=${c.id}`)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm"
                style={{ color: "var(--lunar-text-primary)" }}
              >
                <FlagIcon iso2={COUNTRY_ID_TO_ISO2[c.id] ?? c.id.toUpperCase()} size={18} />
                <span>{c.name}</span>
                <span className="ml-auto text-xs" style={{ color: "var(--lunar-text-muted)" }}>
                  Score {c.score}
                </span>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Competitors" className="px-2">
            {COMPETITORS.map((comp) => (
              <Command.Item
                key={comp.id}
                value={`${comp.name} competitor`}
                onSelect={() => navigate(`/competition`)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm"
                style={{ color: "var(--lunar-text-primary)" }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: comp.color }}
                />
                {comp.name}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Risks" className="px-2">
            {RISKS.map((r) => (
              <Command.Item
                key={r.id}
                value={`${r.title} risk`}
                onSelect={() => navigate(`/risks`)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm"
                style={{ color: "var(--lunar-text-primary)" }}
              >
                <span className="text-xs" style={{ color: "var(--lunar-red)" }}>
                  ⚠
                </span>
                <span className="truncate">{r.title}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
