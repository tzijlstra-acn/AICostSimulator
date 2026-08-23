import { z } from "zod";

export const ComplianceStatusSchema = z.enum([
  "pending",
  "in_progress",
  "done",
  "blocked",
  "overdue",
]);
export type ComplianceStatus = z.infer<typeof ComplianceStatusSchema>;

export const WorkstreamSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  requirementText: z.string(),
  status: ComplianceStatusSchema,
  category: z.string(),
  sourceIds: z.array(z.string()),
  owner: z.string().optional(),
  dueDate: z.string().optional(),
  legalNote: z.string().optional(),
  note: z.string().optional(),
});

export type Workstream = z.infer<typeof WorkstreamSchema>;

export const REGULATORY_DATES = [
  {
    date: "2025-02-02",
    label: "Prohibited practices + AI literacy",
    description:
      "AI Act Art. 5 prohibited practices (e.g. subliminal manipulation, social scoring) and Art. 4 AI literacy obligations apply to all providers.",
    sourceId: "S7",
  },
  {
    date: "2025-08-02",
    label: "GPAI obligations (new models)",
    description:
      "General-purpose AI model obligations apply (Arts. 53–55). Models placed on market after this date must comply with transparency, copyright, and (for systemic-risk models) safety obligations.",
    sourceId: "S7",
  },
  {
    date: "2025-09-12",
    label: "EU Data Act applicable",
    description:
      "Data Act enters application. Obligations on data sharing, cloud switching, and smart device data access apply.",
    sourceId: "S11",
  },
  {
    date: "2026-08-02",
    label: "AI Act generally applicable + GPAI enforcement",
    description:
      "Full AI Act application including transparency requirements for AI-generated content, chatbot disclosure, and GPAI compliance enforcement.",
    sourceId: "S7",
  },
  {
    date: "2026-08-02",
    label: "Annex III high-risk system obligations",
    description:
      "Obligations for high-risk AI systems listed in Annex III (e.g. critical infrastructure, employment, education, law enforcement) apply. Verify with EU counsel — dates per enacted text of Regulation (EU) 2024/1689.",
    sourceId: "S7",
  },
  {
    date: "2027-08-02",
    label: "Product-safety Annex I high-risk obligations",
    description:
      "High-risk AI systems covered by existing product safety legislation (Annex I) must comply. Verify with EU counsel — dates per enacted text of Regulation (EU) 2024/1689.",
    sourceId: "S7",
  },
];

export const WORKSTREAMS: Workstream[] = [
  {
    id: "gpai_classification",
    title: "GPAI classification & systemic-risk assessment",
    description:
      "Determine whether K3 qualifies as a general-purpose AI model with or without systemic risk under the EU AI Act.",
    requirementText:
      "Art. 51 AI Act: A GPAI model is of systemic risk if it has high impact capabilities with >= 10^25 FLOPs training compute. Providers must notify the AI Office.",
    status: "in_progress",
    category: "AI Act",
    sourceIds: ["S7", "S9"],
    owner: "Legal / Policy",
    dueDate: "2026-09-30",
    legalNote:
      "Classification requires validation by qualified EU counsel. Open question whether K3 training compute threshold is met.",
  },
  {
    id: "authorized_rep",
    title: "EU Authorized Representative appointment",
    description:
      "Appoint an EU-established entity as authorized representative under Art. 54 AI Act for GPAI providers established outside the EU.",
    requirementText:
      "Art. 54 AI Act: Providers established outside the EU must appoint a representative in the EU.",
    status: "pending",
    category: "AI Act",
    sourceIds: ["S7"],
    owner: "Legal",
    dueDate: "2026-11-30",
    legalNote: "Must be an EU-established entity with appropriate mandate.",
  },
  {
    id: "technical_docs",
    title: "GPAI technical documentation",
    description:
      "Prepare and maintain technical documentation as required for GPAI model providers under Annex XI.",
    requirementText:
      "Art. 53 AI Act + Annex XI: Technical documentation including training data, capabilities, limitations, and evaluation results.",
    status: "in_progress",
    category: "AI Act",
    sourceIds: ["S7", "S8"],
    owner: "Engineering / Safety",
    dueDate: "2026-10-31",
  },
  {
    id: "copyright_policy",
    title: "Training data copyright policy",
    description:
      "Implement copyright compliance for training data, including text and data mining opt-out policy.",
    requirementText:
      "Art. 53(1)(c) AI Act: GPAI providers must implement a copyright policy including text and data mining opt-out under Art. 4(3) DSM Directive.",
    status: "in_progress",
    category: "AI Act",
    sourceIds: ["S7", "S8"],
    owner: "Legal",
    dueDate: "2026-10-31",
  },
  {
    id: "safety_evaluation",
    title: "Safety evaluations & adversarial testing",
    description:
      "Conduct and publish safety evaluations including red-teaming and adversarial testing for systemic-risk models.",
    requirementText:
      "Art. 55 AI Act (systemic risk): Conduct adversarial testing, report serious incidents, apply cybersecurity measures.",
    status: "pending",
    category: "AI Act",
    sourceIds: ["S7", "S9"],
    owner: "Safety Engineering",
    dueDate: "2027-01-31",
    legalNote:
      "Obligation level depends on systemic-risk classification. Regardless, safety evaluation is recommended best practice.",
  },
  {
    id: "transparency_requirements",
    title: "AI content transparency & disclosure",
    description:
      "Implement disclosure mechanisms for AI-generated content and chatbot interaction transparency.",
    requirementText:
      "Art. 50 AI Act: Disclose to users they are interacting with an AI system. Watermark or label AI-generated content.",
    status: "overdue",
    category: "AI Act",
    sourceIds: ["S7"],
    owner: "Product / Engineering",
    dueDate: "2026-08-02",
    note: "Deadline passed. Immediate action required.",
  },
  {
    id: "data_protection",
    title: "GDPR & data protection compliance",
    description:
      "GDPR compliance including lawful basis, privacy notices, DPA templates, and data subject rights implementation.",
    requirementText:
      "GDPR Art. 6 (lawful basis), Art. 13-14 (privacy notices), Art. 28 (processor agreements), Arts. 15-22 (data subject rights).",
    status: "in_progress",
    category: "Data Protection",
    sourceIds: ["S10"],
    owner: "Legal / DPO",
    dueDate: "2026-09-30",
  },
  {
    id: "international_transfers",
    title: "China–EU international data transfer mechanism",
    description:
      "Establish lawful mechanism for data transfer from EU to Moonshot AI infrastructure in China.",
    requirementText:
      "GDPR Chapter V: Standard Contractual Clauses (SCCs) or equivalent adequacy decision required for China-EU transfers.",
    status: "pending",
    category: "Data Protection",
    sourceIds: ["S10"],
    owner: "Legal",
    dueDate: "2026-11-30",
    legalNote:
      "No EU adequacy decision for China exists. SCCs must be accompanied by a Transfer Impact Assessment (TIA).",
  },
  {
    id: "enterprise_admin",
    title: "Enterprise admin controls (SSO, SCIM, RBAC, Audit)",
    description:
      "Implement enterprise identity management (SSO/SAML), SCIM provisioning, role-based access control, and audit logging.",
    requirementText:
      "Enterprise customer requirement. Also required for Gate B (broad enterprise) stage gate.",
    status: "pending",
    category: "Enterprise",
    sourceIds: ["S4"],
    owner: "Engineering",
    dueDate: "2027-06-30",
  },
  {
    id: "procurement",
    title: "EU enterprise procurement & DPA framework",
    description:
      "Develop Data Processing Agreement templates, security questionnaire responses, and procurement pack for EU enterprise buyers.",
    requirementText:
      "GDPR Art. 28 requires a DPA for processor relationships. Enterprise buyers expect ISO 27001, SOC 2, or equivalent.",
    status: "pending",
    category: "Enterprise",
    sourceIds: ["S10"],
    owner: "Legal / Sales",
    dueDate: "2027-01-31",
  },
  {
    id: "licensing",
    title: "K3 licensing terms for EU commercial use",
    description:
      "Ensure K3 model license permits EU commercial deployment, OEM embedding, and private VPC deployment.",
    requirementText:
      "Open-weight model licenses (e.g. Kimi K3 Community License) may restrict commercial use, revenue thresholds, or OEM use cases.",
    status: "in_progress",
    category: "Commercial",
    sourceIds: ["S1", "S5"],
    owner: "Legal",
    dueDate: "2026-10-31",
    legalNote:
      "License terms must be reviewed before any OEM or sovereign deployment. Open-weight != unrestricted commercial use.",
  },
  {
    id: "incident_process",
    title: "Serious incident reporting process",
    description:
      "Establish process for detecting, assessing, and reporting serious incidents or malfunctions to the EU AI Office.",
    requirementText:
      "Art. 73 AI Act: Providers of high-risk AI and GPAI models with systemic risk must report serious incidents without undue delay.",
    status: "pending",
    category: "AI Act",
    sourceIds: ["S7"],
    owner: "Safety Engineering / Legal",
    dueDate: "2027-01-31",
  },
  {
    id: "nis2_compliance",
    title: "NIS2 cybersecurity baseline",
    description:
      "Assess NIS2 applicability and implement required cybersecurity risk management measures.",
    requirementText:
      "NIS2 Directive applies to essential and important entities. AI infrastructure providers may qualify. Requires risk management, incident reporting, and supply chain security.",
    status: "pending",
    category: "Cybersecurity",
    sourceIds: ["S12"],
    owner: "Security Engineering",
    dueDate: "2027-06-30",
  },
  {
    id: "eu_data_act",
    title: "EU Data Act obligations",
    description:
      "Assess Data Act applicability for AI-generated data, cloud switching obligations, and smart product scenarios.",
    requirementText:
      "EU Data Act: Data portability, switching rights, and interoperability requirements for data processing services.",
    status: "pending",
    category: "Data Act",
    sourceIds: ["S11"],
    owner: "Legal / Product",
    dueDate: "2027-06-30",
  },
  {
    id: "uk_ai_framework",
    title: "UK AI governance framework",
    description:
      "Assess UK AI governance requirements, AI Safety Institute interactions, and sector-specific obligations.",
    requirementText:
      "UK diverging from EU AI Act. Sector-specific approach via existing regulators (FCA, ICO, CQC). UK GDPR (retained EU law) continues to apply for data protection.",
    status: "in_progress",
    category: "UK",
    sourceIds: ["S14"],
    owner: "Legal",
    dueDate: "2026-12-31",
  },
  {
    id: "evaluation_program",
    title: "Third-party evaluation program",
    description:
      "Establish independent evaluation program for capability assessment, safety evaluation, and customer trust-building.",
    requirementText:
      "Gate C requirement. Enterprise buyers increasingly require independent safety evaluation before regulated vertical deployment.",
    status: "pending",
    category: "Trust",
    sourceIds: ["S9"],
    owner: "Safety / Sales",
    dueDate: "2027-06-30",
  },
  {
    id: "data_boundary",
    title: "EU data boundary implementation",
    description:
      "Ensure all EU customer data is stored and processed within EU jurisdictions, with verifiable data residency.",
    requirementText:
      "Gate A requirement. Enterprise requirement for EU deployment. Required before broad sovereign claims.",
    status: "pending",
    category: "Infrastructure",
    sourceIds: ["S10", "S13"],
    owner: "Infrastructure Engineering",
    dueDate: "2026-12-31",
  },
  {
    id: "gpai_code_practice",
    title: "GPAI Code of Practice adoption",
    description:
      "Evaluate and adopt the voluntary GPAI Code of Practice as published by the EU AI Office.",
    requirementText:
      "Art. 56 AI Act: GPAI providers may adopt approved codes of practice. Non-adoption creates compliance risk.",
    status: "pending",
    category: "AI Act",
    sourceIds: ["S8"],
    owner: "Policy / Legal",
    dueDate: "2026-12-31",
    legalNote:
      "Adoption of GPAI Code creates rebuttable presumption of compliance with Art. 53–55 obligations. Strongly recommended.",
  },
  {
    id: "human_oversight",
    title: "Human oversight mechanisms for high-risk use cases",
    description:
      "Implement human oversight interfaces, override capabilities, and logging for high-risk AI deployments.",
    requirementText:
      "AI Act Art. 14 (high-risk): AI systems must allow natural persons to oversee, interpret, and override AI outputs. Gate C requirement.",
    status: "pending",
    category: "Product",
    sourceIds: ["S7"],
    owner: "Product / Engineering",
    dueDate: "2027-06-30",
  },
  {
    id: "retention_policy",
    title: "Data retention and deletion policy",
    description:
      "Implement granular data retention controls, customer-controlled deletion, and automated purge workflows.",
    requirementText:
      "GDPR Art. 5(1)(e) storage limitation. Enterprise requirement. Gate B requirement for broad enterprise.",
    status: "pending",
    category: "Data Protection",
    sourceIds: ["S10"],
    owner: "Engineering / Legal",
    dueDate: "2027-06-30",
  },
];

export const TRUST_ARCHITECTURE = {
  dataBoundary: [
    "EU-region-only data processing (AMS, FRA, PAR targets)",
    "Encrypted storage at rest (AES-256) and in transit (TLS 1.3)",
    "No training on customer data without explicit opt-in",
    "Verifiable data residency attestation",
  ],
  enterpriseControlPlane: [
    "SSO / SAML 2.0 + OIDC integration",
    "SCIM 2.0 automated provisioning",
    "Role-based access control (RBAC) with custom roles",
    "Audit log export (SIEM-compatible)",
    "Customer-managed encryption keys (CMEK) — roadmap",
    "IP allowlist and VPC peering",
  ],
  evaluationProgram: [
    "Third-party capability evaluation",
    "Red-team adversarial testing",
    "Performance benchmarking on customer-representative tasks",
    "Ongoing regression monitoring",
    "Published evaluation results (customer-accessible)",
  ],
};

export const STAGE_GATES = [
  {
    id: "gate_a",
    label: "Gate A — EU GA",
    condition: "Before EU General Availability",
    requirements: [
      "Data boundary implemented and verified",
      "GPAI classification determination complete",
      "K3 license confirmed for EU commercial use",
      "Incident reporting process live",
      "Basic technical documentation complete",
    ],
  },
  {
    id: "gate_b",
    label: "Gate B — Broad Enterprise",
    condition: "Before broad enterprise sales motion",
    requirements: [
      "SSO + SCIM + RBAC implemented",
      "Audit log export live",
      "DPA templates reviewed and approved",
      "Data retention controls implemented",
      "Security penetration testing complete",
    ],
  },
  {
    id: "gate_c",
    label: "Gate C — Regulated Verticals",
    condition: "Before deploying into regulated industries",
    requirements: [
      "Risk assessment framework for high-risk use cases",
      "Human oversight mechanisms implemented",
      "Comprehensive audit logging with tamper-proof storage",
      "Third-party evaluation program active",
    ],
  },
  {
    id: "gate_d",
    label: "Gate D — Sovereignty Claim",
    condition: "Before making sovereignty marketing claims",
    requirements: [
      "Technical data residency verification",
      "Contractual commitments to EU-only processing",
      "Operational procedures for government requests",
      "Independent validation of sovereignty architecture",
    ],
  },
  {
    id: "gate_e",
    label: "Gate E — Private K3 Deployment",
    condition: "Before offering on-premise or private VPC K3",
    requirements: [
      "Compute infrastructure agreement with EU partner",
      "Capacity planning and SLA framework",
      "TCO model for private deployment",
      "24/7 support model confirmed",
      "License terms for private deployment confirmed",
    ],
  },
];
