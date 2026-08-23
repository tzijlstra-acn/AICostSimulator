"use client";

import { usePathname } from "@/lib/navigation";
import { Link } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Target,
  BarChart2,
  Globe,
  Swords,
  Shield,
  Route,
  Users,
  Trophy,
  Info,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  isMobile?: boolean;
  onNavClick?: () => void;
}

function SectionHeader({ label, open }: { label: string; open: boolean }) {
  if (!open) return <div className="my-1 border-t" style={{ borderColor: 'var(--lunar-border-subtle)' }} />;
  return (
    <div className="px-3 pt-3 pb-1">
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--lunar-text-muted)', fontSize: '0.6rem' }}>
        {label}
      </span>
    </div>
  );
}

export function Sidebar({ open, isMobile = false, onNavClick }: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  const NAV_GROUPS = [
    {
      header: null,
      items: [
        { href: "/" as const, label: t("cockpit"), icon: LayoutDashboard },
        { href: "/strategy" as const, label: t("strategy"), icon: Target },
      ],
    },
    {
      header: "MARKET",
      items: [
        { href: "/market" as const, label: t("market"), icon: BarChart2 },
        { href: "/countries" as const, label: t("countries"), icon: Globe },
      ],
    },
    {
      header: "COMPETITIVE",
      items: [
        { href: "/competition" as const, label: t("competition"), icon: Swords },
        { href: "/regulation" as const, label: t("regulation"), icon: Shield },
      ],
    },
    {
      header: "GO-TO-MARKET",
      items: [
        { href: "/gtm" as const, label: t("gtm"), icon: Route },
        { href: "/partners" as const, label: t("partners"), icon: Users },
      ],
    },
    {
      header: "PERSONAL",
      items: [
        { href: "/intro" as const, label: 'About this Analysis', icon: Info },
        { href: "/90-days" as const, label: t("ninetyDays"), icon: Trophy },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full flex flex-col transition-all duration-200 pointer-events-auto",
        "border-r",
        isMobile
          ? cn("z-50 w-52", open ? "translate-x-0" : "-translate-x-full")
          : cn("z-40", open ? "w-52" : "w-14")
      )}
      style={{
        background: "var(--lunar-surface)",
        borderColor: "var(--lunar-border-subtle)",
        zIndex: isMobile ? 50 : 40,
      }}
      aria-label="Main navigation"
      role={isMobile ? "dialog" : undefined}
      aria-modal={isMobile ? true : undefined}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-3 py-4 border-b"
        style={{ borderColor: "var(--lunar-border-subtle)" }}
      >
        <div className="kimi-mark" aria-hidden="true" />
        {open && (
          <div>
            <div className="text-xs font-bold tracking-wider text-cyan">
              MOONSHOT AI
            </div>
            <div
              className="text-xs font-medium"
              style={{ color: "var(--lunar-text-muted)" }}
            >
              Kimi EU Strategy OS
            </div>
            <div className="mt-1.5 flex items-center gap-1.5">
              <div
                className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center font-bold"
                style={{
                  background: 'rgba(0,212,255,0.15)',
                  border: '1px solid rgba(0,212,255,0.35)',
                  color: 'var(--lunar-cyan)',
                  fontSize: '0.42rem',
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                TZ
              </div>
              <span style={{ color: 'var(--lunar-text-muted)', fontSize: '0.6rem' }}>
                Thomas Zijlstra · Candidate
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-hidden relative">
      <nav className="h-full overflow-y-auto py-3 px-2" aria-label="Pages">
        {NAV_GROUPS.map((group, groupIdx) => (
          <div key={groupIdx}>
            {group.header !== null && (
              <SectionHeader label={group.header} open={open} />
            )}
            {group.items.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              const isPersonal = item.href === "/intro";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavClick}
                  className={cn(
                    "nav-item mb-0.5",
                    isActive && "active",
                    !open && "justify-center",
                    isPersonal && !isActive && "nav-item-personal"
                  )}
                  aria-label={!open ? item.label : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon
                    size={16}
                    className="flex-shrink-0"
                    aria-hidden="true"
                  />
                  {open && (
                    <span className="flex-1 text-sm truncate">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      {/* Bottom scroll-fade indicator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--lunar-surface))' }}
        aria-hidden="true"
      />
      </div>

    </aside>
  );
}
