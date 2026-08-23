"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { CommandPalette } from "@/components/CommandPalette";
import { useAppStore } from "@/store";
import { useRouter } from "@/lib/navigation";

const G_CHORD_MAP: Record<string, string> = {
  e: "/",
  m: "/market",
  c: "/countries",
  r: "/regulation",
  f: "/financials",
  t: "/roadmap",
  p: "/partners",
  k: "/risks",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const router = useRouter();

  // G-chord tracking
  const lastKeyRef = useRef<string | null>(null);
  const lastKeyTimeRef = useRef<number>(0);

  // Mobile detection
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
      if (e.matches) setSidebarOpen(false);
    };
    update(mq);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [setSidebarOpen]);

  // Global keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((o) => !o);
        return;
      }

      // ESC closes command palette
      if (e.key === "Escape" && commandPaletteOpen) {
        setCommandPaletteOpen(false);
        return;
      }

      // Don't trigger shortcuts when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as Element)?.getAttribute?.("contenteditable") === "true"
      ) {
        return;
      }

      // Single-key shortcuts
      if (e.key === "d" || e.key === "D") {
        router.push("/decisions");
        lastKeyRef.current = null;
        return;
      }

      // G-chord: press 'g', then a letter within 1 second
      if (e.key === "g" || e.key === "G") {
        lastKeyRef.current = "g";
        lastKeyTimeRef.current = Date.now();
        return;
      }

      // Check if this is the second key of a g-chord
      if (
        lastKeyRef.current === "g" &&
        Date.now() - lastKeyTimeRef.current < 1000
      ) {
        const dest = G_CHORD_MAP[e.key.toLowerCase()];
        if (dest) {
          e.preventDefault();
          router.push(dest);
        }
        lastKeyRef.current = null;
        return;
      }

      lastKeyRef.current = null;
    },
    [commandPaletteOpen, router]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Close sidebar on mobile when overlay backdrop is clicked
  const handleBackdropClick = () => {
    if (isMobile && sidebarOpen) setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--lunar-bg)" }}>
      {/* Mobile backdrop */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-30"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      <Sidebar
        open={sidebarOpen}
        isMobile={isMobile}
        onNavClick={() => { if (isMobile) setSidebarOpen(false); }}
      />
      <TopBar
        onCommandPalette={() => setCommandPaletteOpen(true)}
        isMobile={isMobile}
      />
      <main
        id="main-content"
        className="transition-all duration-200"
        style={{
          marginLeft: isMobile ? 0 : sidebarOpen ? "13rem" : "3.5rem",
          marginTop: "3rem",
          minHeight: "calc(100vh - 3rem)",
          padding: "1.5rem",
        }}
        tabIndex={-1}
      >
        {children}
      </main>
      <CommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}
