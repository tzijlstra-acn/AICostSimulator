import { z } from "zod";

export const PhaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  label: z.string(),
  dateRange: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  objective: z.string(),
  milestones: z.array(z.string()),
  exitGate: z.string(),
  status: z.enum(["active", "upcoming", "completed"]),
  color: z.string(),
});

export type Phase = z.infer<typeof PhaseSchema>;

export const PHASES: Phase[] = [
  {
    id: "phase_0",
    name: "Phase 0",
    label: "Foundation — Become Launchable",
    dateRange: "Sep–Dec 2026",
    startDate: "2026-09-01",
    endDate: "2026-12-31",
    objective:
      "Build the minimum legal, infrastructure, and commercial foundation required to launch in the EU/UK. No revenue target — this is a preparation phase.",
    milestones: [
      "EU data centre agreement signed (Amsterdam or Frankfurt target)",
      "GPAI classification legal opinion received",
      "K3 license EU commercial use confirmed",
      "Authorized EU representative appointed",
      "DPA template v1 approved by external counsel",
      "Technical documentation v1 drafted",
      "Core EU/UK enterprise team hired (legal, trust, first AE)",
      "ICP definition and top-20 account list finalized",
      "Pricing EUR denomination and billing entity established",
    ],
    exitGate:
      "Gate A satisfied: data boundary live, GPAI classification done, license confirmed, incident process running",
    status: "active",
    color: "#00d4ff",
  },
  {
    id: "phase_1",
    name: "Phase 1",
    label: "Initial Launch",
    dateRange: "Jan–Jun 2027",
    startDate: "2027-01-01",
    endDate: "2027-06-30",
    objective:
      "Launch in UK and DE/NL with targeted enterprise accounts and developer traction. Validate product-market fit and first revenue.",
    milestones: [
      "Public EU API launch (UK + DE + NL, EUR billing)",
      "Kimi Business EU SKU available",
      "10 lighthouse enterprise accounts signed (UK: 6, DE/NL: 4)",
      "Developer program launched (EU-region API access)",
      "K2.7 Code GA for coding use cases",
      "First ISV partner integration live",
      "Compliance portal v1 live (DPA, security questionnaire)",
      "Base revenue: €18M ARR by Jun 2027",
    ],
    exitGate:
      "Gate B satisfied: SSO, SCIM, RBAC, audit log, DPA, retention controls, security pen test complete",
    status: "upcoming",
    color: "#a855f7",
  },
  {
    id: "phase_2",
    name: "Phase 2",
    label: "Enterprise Expansion",
    dateRange: "Jul 2027–Jun 2028",
    startDate: "2027-07-01",
    endDate: "2028-06-30",
    objective:
      "Scale enterprise sales across all Phase 1 countries. Add FR, CH, Nordics. Launch first regulated vertical pilots.",
    milestones: [
      "FR, CH, Nordics market entry",
      "Sovereign/private deployment pilot with 2 anchor customers",
      "High-risk use case framework live (Gate C)",
      "Third-party evaluation program active",
      "OEM partner agreement signed (1+ ISV)",
      "Cloud marketplace listing (AWS/Azure/GCP EU)",
      "Base revenue: €75M ARR by Jun 2028",
      "Enterprise team: 90–110 headcount",
    ],
    exitGate:
      "Gate C satisfied: high-risk assessment, human oversight, audit logging, third-party evaluation",
    status: "upcoming",
    color: "#f59e0b",
  },
  {
    id: "phase_3",
    name: "Phase 3",
    label: "Sovereign & Vertical Scale",
    dateRange: "Jul 2028–Dec 2029",
    startDate: "2028-07-01",
    endDate: "2029-12-31",
    objective:
      "Build sovereign/private deployment business. Scale in all 9 priority countries. Achieve ecosystem velocity through partners and OEMs.",
    milestones: [
      "ES, IT, PL market entry",
      "Gate D satisfied: sovereignty claims validated",
      "Gate E satisfied: private K3 deployment offering live",
      "5+ OEM partnerships operational",
      "Revenue in all 9 target countries",
      "Partner-contributed pipeline > 30% of total",
      "Base revenue: €220M ARR by Dec 2029",
      "Team: 160–200 headcount",
    ],
    exitGate:
      "Gate D: sovereignty architecture validated. Gate E: private deployment offering live.",
    status: "upcoming",
    color: "#10b981",
  },
  {
    id: "phase_4",
    name: "Phase 4",
    label: "Ecosystem Scale",
    dateRange: "2030",
    startDate: "2030-01-01",
    endDate: "2030-12-31",
    objective:
      "Achieve ecosystem-level scale with self-reinforcing partner, developer, and customer flywheel. Target €550M base revenue.",
    milestones: [
      "Base revenue: €550M ARR",
      "Market share: 4.1% of EU SAM",
      "Ecosystem: 50+ active ISV/OEM integrations",
      "Developer community: 100K+ active EU API users",
      "Sovereign deployments: 5+ national/regional programs",
      "Evaluation program: trusted by 3+ EU regulators",
    ],
    exitGate: "Series B / growth financing decision; ecosystem partnership model assessment",
    status: "upcoming",
    color: "#8b5cf6",
  },
];

export const getCurrentPhase = (): Phase => {
  const now = new Date();
  for (const phase of PHASES) {
    const start = new Date(phase.startDate);
    const end = new Date(phase.endDate);
    if (now >= start && now <= end) return phase;
  }
  return PHASES[0];
};
