import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ScenarioKey } from "@/data/market";
import type { ComplianceStatus } from "@/data/compliance";
import type { RiskSeverity } from "@/data/risks";
import type { FinancialsAssumptions } from "@/data/financials";
import { DEFAULT_FINANCIALS_ASSUMPTIONS } from "@/data/financials";
import { SAM_DEFAULTS } from "@/data/market";

export type ViewMode = "board" | "operator" | "compliance" | "sales";

export interface Decision {
  id: string;
  text: string;
  status:
    | "proposed"
    | "under_review"
    | "approved"
    | "rejected"
    | "deferred"
    | "superseded";
  owner: string;
  date: string;
  rationale: string;
  scenario?: ScenarioKey;
  evidence?: string;
  relatedEntities?: string[];
  followUpDate?: string;
}

export interface MarketAssumptions {
  tamGrowthRate: number;
  targetCountryPct: number;
  productFitPct: number;
  procurementReachPct: number;
}

interface AppState {
  // Global
  activeScenario: ScenarioKey;
  viewMode: ViewMode;
  sidebarOpen: boolean;

  // Market assumptions
  marketAssumptions: MarketAssumptions;

  // Compliance
  complianceStatuses: Record<string, ComplianceStatus>;

  // Risks
  riskSeverities: Record<string, RiskSeverity>;

  // Financials
  financialsAssumptions: FinancialsAssumptions;

  // Decisions
  decisions: Decision[];

  // Selected entities
  selectedCountry: string | null;
  selectedCompetitors: string[];

  // Actions
  setScenario: (s: ScenarioKey) => void;
  setViewMode: (m: ViewMode) => void;
  setSidebarOpen: (open: boolean) => void;
  setMarketAssumptions: (a: Partial<MarketAssumptions>) => void;
  setComplianceStatus: (id: string, status: ComplianceStatus) => void;
  setRiskSeverity: (id: string, severity: RiskSeverity) => void;
  setFinancialsAssumptions: (a: Partial<FinancialsAssumptions>) => void;
  resetFinancialsAssumptions: () => void;
  addDecision: (d: Omit<Decision, "id">) => void;
  updateDecision: (id: string, d: Partial<Decision>) => void;
  removeDecision: (id: string) => void;
  setSelectedCountry: (id: string | null) => void;
  setSelectedCompetitors: (ids: string[]) => void;
  toggleCompetitor: (id: string) => void;
  resetAll: () => void;
}

const DEFAULT_MARKET_ASSUMPTIONS: MarketAssumptions = {
  tamGrowthRate: 37, // % CAGR 2026-2030
  targetCountryPct: SAM_DEFAULTS.targetCountryPct * 100,
  productFitPct: SAM_DEFAULTS.productFitPct * 100,
  procurementReachPct: SAM_DEFAULTS.procurementReachPct * 100,
};

const DEFAULT_COMPLIANCE_STATUSES: Record<string, ComplianceStatus> = {
  gpai_classification: "in_progress",
  authorized_rep: "pending",
  technical_docs: "in_progress",
  copyright_policy: "in_progress",
  safety_evaluation: "pending",
  transparency_requirements: "overdue",
  data_protection: "in_progress",
  international_transfers: "pending",
  enterprise_admin: "pending",
  procurement: "pending",
  licensing: "in_progress",
  incident_process: "pending",
  nis2_compliance: "pending",
  eu_data_act: "pending",
  uk_ai_framework: "in_progress",
  evaluation_program: "pending",
  data_boundary: "pending",
  gpai_code_practice: "pending",
  human_oversight: "pending",
  retention_policy: "pending",
};

const DEFAULT_RISK_SEVERITIES: Record<string, RiskSeverity> = {
  r01: "critical",
  r02: "high",
  r03: "critical",
  r04: "high",
  r05: "high",
  r06: "medium",
  r07: "high",
  r08: "high",
  r09: "medium",
  r10: "medium",
  r11: "medium",
  r12: "high",
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeScenario: "base",
      viewMode: "board",
      sidebarOpen: true,
      marketAssumptions: DEFAULT_MARKET_ASSUMPTIONS,
      complianceStatuses: DEFAULT_COMPLIANCE_STATUSES,
      riskSeverities: DEFAULT_RISK_SEVERITIES,
      financialsAssumptions: DEFAULT_FINANCIALS_ASSUMPTIONS,
      decisions: [],
      selectedCountry: null,
      selectedCompetitors: ["kimi_now", "kimi_target", "anthropic", "mistral"],

      setScenario: (s) => set({ activeScenario: s }),
      setViewMode: (m) => set({ viewMode: m }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setMarketAssumptions: (a) =>
        set((state) => ({
          marketAssumptions: { ...state.marketAssumptions, ...a },
        })),
      setComplianceStatus: (id, status) =>
        set((state) => ({
          complianceStatuses: {
            ...state.complianceStatuses,
            [id]: status,
          },
        })),
      setRiskSeverity: (id, severity) =>
        set((state) => ({
          riskSeverities: { ...state.riskSeverities, [id]: severity },
        })),
      setFinancialsAssumptions: (a) =>
        set((state) => ({
          financialsAssumptions: {
            ...state.financialsAssumptions,
            ...a,
          },
        })),
      resetFinancialsAssumptions: () =>
        set({ financialsAssumptions: DEFAULT_FINANCIALS_ASSUMPTIONS }),
      addDecision: (d) =>
        set((state) => ({
          decisions: [
            ...state.decisions,
            { ...d, id: `dec_${Date.now()}` },
          ],
        })),
      updateDecision: (id, d) =>
        set((state) => ({
          decisions: state.decisions.map((dec) =>
            dec.id === id ? { ...dec, ...d } : dec
          ),
        })),
      removeDecision: (id) =>
        set((state) => ({
          decisions: state.decisions.filter((d) => d.id !== id),
        })),
      setSelectedCountry: (id) => set({ selectedCountry: id }),
      setSelectedCompetitors: (ids) => set({ selectedCompetitors: ids }),
      toggleCompetitor: (id) =>
        set((state) => ({
          selectedCompetitors: state.selectedCompetitors.includes(id)
            ? state.selectedCompetitors.filter((c) => c !== id)
            : [...state.selectedCompetitors, id],
        })),
      resetAll: () =>
        set({
          activeScenario: "base",
          viewMode: "board",
          marketAssumptions: DEFAULT_MARKET_ASSUMPTIONS,
          complianceStatuses: DEFAULT_COMPLIANCE_STATUSES,
          riskSeverities: DEFAULT_RISK_SEVERITIES,
          financialsAssumptions: DEFAULT_FINANCIALS_ASSUMPTIONS,
          decisions: [],
          selectedCountry: null,
          selectedCompetitors: ["kimi_now", "kimi_target", "anthropic", "mistral"],
        }),
    }),
    {
      name: "kimi-expansion-os",
      partialize: (state) => ({
        activeScenario: state.activeScenario,
        viewMode: state.viewMode,
        marketAssumptions: state.marketAssumptions,
        complianceStatuses: state.complianceStatuses,
        riskSeverities: state.riskSeverities,
        financialsAssumptions: state.financialsAssumptions,
        decisions: state.decisions,
        selectedCountry: state.selectedCountry,
        selectedCompetitors: state.selectedCompetitors,
      }),
    }
  )
);
