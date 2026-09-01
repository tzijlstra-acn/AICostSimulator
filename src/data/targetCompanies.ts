export interface TargetCompany {
  name: string;
  domain: string;
  sector: string;
  why: string;
  tier: 'A' | 'B';
}

export const TARGET_COMPANIES: Record<string, TargetCompany[]> = {
  GB: [
    { name: 'HSBC', domain: 'hsbc.com', sector: 'Financial Services', why: 'Largest EU-headquartered bank — long-document analysis (contracts, compliance) is a natural K3 workload.', tier: 'A' },
    { name: 'BT Group', domain: 'bt.com', sector: 'Telecom', why: 'Potential telco bundling partner and direct enterprise AI buyer for network operations.', tier: 'A' },
    { name: 'Rolls-Royce', domain: 'rolls-royce.com', sector: 'Aerospace & Defence', why: 'Complex engineering documentation and regulatory filings — high-context analysis use case.', tier: 'A' },
    { name: 'AstraZeneca', domain: 'astrazeneca.com', sector: 'Pharma & Life Sciences', why: 'Clinical trial documentation, regulatory submissions — sovereign AI requirement due to MHRA data rules.', tier: 'A' },
    { name: 'Lloyds Banking Group', domain: 'lloydsbankinggroup.com', sector: 'Financial Services', why: 'UK retail banking leader — AI-assisted compliance and customer communication automation.', tier: 'A' },
    { name: 'Vodafone UK', domain: 'vodafone.co.uk', sector: 'Telecom', why: 'AI-first telco initiative in progress — Kimi API could power internal automation.', tier: 'B' },
    { name: 'BAE Systems', domain: 'baesystems.com', sector: 'Defence', why: 'Defence procurement documentation — non-US AI provider preferred for sovereign reasons.', tier: 'B' },
    { name: 'Sage Group', domain: 'sage.com', sector: 'SME Software', why: 'Embedded AI in SME accounting — high volume, lower complexity Kimi API integration opportunity.', tier: 'B' },
    { name: 'Arm Holdings', domain: 'arm.com', sector: 'Semiconductor', why: 'Developer community hub — Kimi Code partnership or design-partner opportunity.', tier: 'B' },
    { name: 'University of Cambridge', domain: 'cam.ac.uk', sector: 'Research & Higher Education', why: 'Top research university — grant writing, literature analysis, research automation at scale. Pay via institutional API contracts.', tier: 'B' },
    { name: 'Imperial College London', domain: 'imperial.ac.uk', sector: 'Research & Higher Education', why: 'STEM research powerhouse — coding assistance, paper analysis, lab documentation. Natural early adopter.', tier: 'B' },
    { name: 'University College London', domain: 'ucl.ac.uk', sector: 'Research & Higher Education', why: 'Large research base with strong industry links — AI adoption among fastest in UK academia.', tier: 'B' },
  ],
  DE: [
    { name: 'SAP', domain: 'sap.com', sector: 'Enterprise Software', why: 'SAP embedded AI (Joule) — OEM or ISV integration path for Kimi into 400K+ enterprise customers.', tier: 'A' },
    { name: 'Siemens', domain: 'siemens.com', sector: 'Industrial & Manufacturing', why: 'Industrial AI adoption leader — long-document processing for engineering specs and compliance.', tier: 'A' },
    { name: 'Volkswagen Group', domain: 'volkswagen-group.com', sector: 'Automotive', why: 'Automotive sector investing heavily in AI for manufacturing — EU data residency is a hard requirement.', tier: 'A' },
    { name: 'Deutsche Bank', domain: 'db.com', sector: 'Financial Services', why: 'Major EU bank with strict data sovereignty requirements — Kimi compliance architecture is a differentiator.', tier: 'A' },
    { name: 'Allianz', domain: 'allianz.com', sector: 'Insurance', why: 'Insurance claims processing and policy documentation — high-volume AI workload with EU data residency need.', tier: 'A' },
    { name: 'Bosch', domain: 'bosch.com', sector: 'Industrial / IoT', why: 'Industrial AI and IoT — embedded inference and edge AI use cases for manufacturing.', tier: 'B' },
    { name: 'Bayer', domain: 'bayer.com', sector: 'Pharma', why: 'Pharmaceutical regulatory documentation — EU AI Act compliance profile matches Kimi positioning.', tier: 'B' },
    { name: 'Deutsche Telekom', domain: 'telekom.com', sector: 'Telecom', why: 'Strategic telco partner for T-Systems — direct enterprise AI buyer and distribution channel.', tier: 'B' },
    { name: 'BASF', domain: 'basf.com', sector: 'Chemicals', why: 'Chemical industry compliance documentation and R&D — long-context analysis is core workload.', tier: 'B' },
  ],
  NL: [
    { name: 'ASML', domain: 'asml.com', sector: 'Semiconductor Equipment', why: 'Critical EU technology company — complex engineering documentation; non-US AI preference for sovereign reasons.', tier: 'A' },
    { name: 'ING Group', domain: 'ing.com', sector: 'Financial Services', why: 'Progressive EU bank known for AI adoption — strong data residency requirements under DORA.', tier: 'A' },
    { name: 'Philips', domain: 'philips.com', sector: 'Health Technology', why: 'Medical AI applications require EU data residency — natural fit for Kimi with compliance architecture.', tier: 'A' },
    { name: 'Booking.com', domain: 'booking.com', sector: 'Travel Technology', why: 'High-volume NLP workloads (customer service, content generation) — Kimi API price/performance advantage.', tier: 'A' },
    { name: 'Wolters Kluwer', domain: 'wolterskluwer.com', sector: 'Legal & Financial Software', why: 'Legal document AI is a core product priority — long-context analysis is the primary K3 differentiator.', tier: 'A' },
    { name: 'ABN AMRO', domain: 'abnamro.com', sector: 'Financial Services', why: 'NL retail bank under ECB AI governance rules — EU-native AI compliance is a procurement requirement.', tier: 'B' },
    { name: 'Shell', domain: 'shell.com', sector: 'Energy', why: 'Energy sector documentation and regulatory filings — global operations but EU data boundary required.', tier: 'B' },
    { name: 'NXP Semiconductors', domain: 'nxp.com', sector: 'Semiconductor', why: 'Developer tools and embedded AI — Kimi Code API for engineering automation.', tier: 'B' },
    { name: 'TU Delft', domain: 'tudelft.nl', sector: 'Research & Higher Education', why: 'Top European engineering university — research documentation, simulation analysis. Institutional API access model scales well.', tier: 'B' },
    { name: 'University of Amsterdam', domain: 'uva.nl', sector: 'Research & Higher Education', why: 'Strong AI/NLP research group — potential design partner for multilingual European use cases.', tier: 'B' },
  ],
  FR: [
    { name: 'BNP Paribas', domain: 'bnpparibas.com', sector: 'Financial Services', why: 'Largest EU bank by assets — enterprise AI procurement under DORA and EU AI Act.', tier: 'A' },
    { name: 'Airbus', domain: 'airbus.com', sector: 'Aerospace & Defence', why: 'Aerospace documentation, safety compliance filings — sovereign AI requirement; non-US preference.', tier: 'A' },
    { name: 'AXA', domain: 'axa.com', sector: 'Insurance', why: 'Pan-European insurer — claims automation and policy analysis; EU data residency mandatory.', tier: 'A' },
    { name: 'TotalEnergies', domain: 'totalenergies.com', sector: 'Energy', why: 'Energy transition documentation and regulatory compliance — large-context AI workload.', tier: 'A' },
    { name: "L'Oréal", domain: 'loreal.com', sector: 'Consumer Goods', why: 'Marketing content generation and product documentation — high volume, multilingual Kimi advantage.', tier: 'B' },
    { name: 'Orange', domain: 'orange.com', sector: 'Telecom', why: 'French telco — potential distribution partner and direct enterprise AI buyer.', tier: 'B' },
    { name: 'Schneider Electric', domain: 'se.com', sector: 'Industrial Automation', why: 'Industrial AI and energy management — embedded AI use cases in building and grid management.', tier: 'B' },
    { name: 'Société Générale', domain: 'societegenerale.com', sector: 'Financial Services', why: 'Major French bank — EU AI Act compliance buyer; complex financial documentation analysis.', tier: 'B' },
  ],
  CH: [
    { name: 'UBS', domain: 'ubs.com', sector: 'Banking', why: 'Post-CS merger — massive documentation and compliance workload; strict Swiss data sovereignty.', tier: 'A' },
    { name: 'Roche', domain: 'roche.com', sector: 'Pharma & Life Sciences', why: 'Clinical documentation and regulatory submissions — EU/Swiss data residency a hard requirement.', tier: 'A' },
    { name: 'Novartis', domain: 'novartis.com', sector: 'Pharma & Life Sciences', why: 'Same profile as Roche — pharma regulatory AI is a major Kimi use case.', tier: 'A' },
    { name: 'Zurich Insurance', domain: 'zurich.com', sector: 'Insurance', why: 'Global insurance — claims and policy analysis; EU + Swiss data residency.', tier: 'B' },
    { name: 'ABB', domain: 'abb.com', sector: 'Industrial Automation', why: 'Industrial AI for robotics and grid — embedded inference use case.', tier: 'B' },
    { name: 'Nestlé', domain: 'nestle.com', sector: 'Consumer Goods', why: 'Content generation and supply chain documentation at scale — multilingual Kimi advantage.', tier: 'B' },
    { name: 'ETH Zurich', domain: 'ethz.ch', sector: 'Research & Higher Education', why: 'World-top technical university — AI research, scientific document analysis. Strong paying capacity; institutional contracts common.', tier: 'B' },
    { name: 'EPFL', domain: 'epfl.ch', sector: 'Research & Higher Education', why: 'Francophone Swiss research powerhouse with active AI lab — early adopter profile, multilingual advantage.', tier: 'B' },
  ],
  SE: [
    { name: 'Ericsson', domain: 'ericsson.com', sector: 'Telecom Equipment', why: 'Telecom AI — embedded inference in network infrastructure; non-US AI provider preference.', tier: 'A' },
    { name: 'Volvo Group', domain: 'volvo.com', sector: 'Automotive & Industrial', why: 'Manufacturing AI and autonomous systems documentation; EU data residency standard.', tier: 'A' },
    { name: 'Nordea', domain: 'nordea.com', sector: 'Financial Services', why: 'Largest Nordic bank — AI governance under EU financial regulations; EU data residency.', tier: 'A' },
    { name: 'H&M Group', domain: 'hmgroup.com', sector: 'Retail', why: 'Fashion retail — content generation, product descriptions, customer service AI at scale.', tier: 'B' },
    { name: 'Spotify', domain: 'spotify.com', sector: 'Consumer Tech', why: 'Developer-first company — Kimi Code API design partner candidate; Swedish AI Act alignment.', tier: 'B' },
    { name: 'Atlas Copco', domain: 'atlascopco.com', sector: 'Industrial', why: 'Industrial equipment documentation and technical support AI — long-context use case.', tier: 'B' },
    { name: 'KTH Royal Institute', domain: 'kth.se', sector: 'Research & Higher Education', why: 'Leading Nordic technical university — AI-assisted research, code generation. Institutional buyer with EU data residency needs.', tier: 'B' },
  ],
  ES: [
    { name: 'Santander', domain: 'santander.com', sector: 'Financial Services', why: 'Largest Spanish bank — EU AI Act compliance buyer; pan-European footprint.', tier: 'A' },
    { name: 'Telefónica', domain: 'telefonica.com', sector: 'Telecom', why: 'Pan-European telco — distribution partner and direct AI buyer; customer service automation.', tier: 'A' },
    { name: 'BBVA', domain: 'bbva.com', sector: 'Financial Services', why: 'Digital-first bank with significant AI investment — EU data residency under DORA.', tier: 'A' },
    { name: 'Iberdrola', domain: 'iberdrola.com', sector: 'Energy', why: 'European energy leader — regulatory documentation and ESG reporting AI.', tier: 'B' },
    { name: 'Inditex (Zara)', domain: 'inditex.com', sector: 'Retail', why: 'Largest fashion retailer — content and supply chain AI at scale.', tier: 'B' },
  ],
  IT: [
    { name: 'UniCredit', domain: 'unicredit.eu', sector: 'Financial Services', why: 'Major EU bank with pan-European operations — EU AI Act compliance and DORA requirements.', tier: 'A' },
    { name: 'Generali', domain: 'generali.com', sector: 'Insurance', why: 'Largest Italian insurer — claims processing and policy documentation AI.', tier: 'A' },
    { name: 'Leonardo', domain: 'leonardo.com', sector: 'Defence & Aerospace', why: 'Defence — sovereign AI requirement; non-US provider preference for sensitive documentation.', tier: 'A' },
    { name: 'Enel', domain: 'enel.com', sector: 'Energy', why: 'European energy utility — grid management AI and ESG documentation.', tier: 'B' },
    { name: 'Intesa Sanpaolo', domain: 'intesasanpaolo.com', sector: 'Financial Services', why: 'Second largest Italian bank — EU AI Act compliance buyer.', tier: 'B' },
  ],
  PL: [
    { name: 'PKO Bank Polski', domain: 'pkobp.pl', sector: 'Financial Services', why: 'Largest Polish bank — EU AI Act compliance and digital transformation investment.', tier: 'A' },
    { name: 'CD Projekt', domain: 'cdprojekt.com', sector: 'Gaming / Developer', why: 'Major European game studio — Kimi Code API design partner; developer community signal.', tier: 'A' },
    { name: 'Allegro', domain: 'allegro.pl', sector: 'E-commerce', why: 'Largest CEE e-commerce platform — content generation, customer service AI at scale.', tier: 'B' },
    { name: 'PKN Orlen', domain: 'orlen.pl', sector: 'Energy', why: 'Energy sector documentation and compliance — EU data residency requirement.', tier: 'B' },
  ],
};

// ─── Qualified Accounts: Tier 1 / 2 / 3 ──────────────────────────────────────
// Source: Moonshot AI Europe Target Account Intelligence, September 2026

export interface QualifiedAccount {
  name: string;
  location: string;
  subVertical: string;
  pitch: string;
  useCases: string[];
  tier: 1 | 2 | 3;
}

export const QUALIFIED_ACCOUNTS: QualifiedAccount[] = [
  // ── TIER 1: European DevTools & AI-Native SaaS ───────────────────────────
  { tier: 1, subVertical: "DevTools & AI-Native SaaS", name: "Snyk", location: "London, UK", pitch: "Security code review across entire repos; vulnerability explanation via 1M-token codebase ingestion", useCases: ["Full-repo vulnerability scanning without chunking", "Cross-file dependency analysis", "Automated security report generation"] },
  { tier: 1, subVertical: "DevTools & AI-Native SaaS", name: "SonarSource", location: "Geneva, CH", pitch: "Static analysis augmentation; technical debt reports across multi-million-line legacy code", useCases: ["Legacy codebase modernisation assessment", "Architecture drift detection", "Multi-language code quality scoring"] },
  { tier: 1, subVertical: "DevTools & AI-Native SaaS", name: "GitLab", location: "Amsterdam, NL", pitch: "AI-powered merge request summaries across entire monorepos; CI/CD failure analysis with full log context", useCases: ["Monorepo-wide MR impact analysis", "CI/CD log intelligence and root cause", "Documentation generation from code"] },
  { tier: 1, subVertical: "DevTools & AI-Native SaaS", name: "DeepL", location: "Cologne, DE", pitch: "Context-aware document translation using 1M-token windows for literary/legal texts", useCases: ["Full-document literary translation", "Legal contract nuance preservation", "Multi-chapter consistency enforcement"] },
  { tier: 1, subVertical: "DevTools & AI-Native SaaS", name: "Miro", location: "Amsterdam, NL", pitch: "AI whiteboard synthesis from 100-page strategy decks; multi-document RAG without chunking", useCases: ["Strategy deck to visual framework generation", "Cross-document insight extraction", "Meeting output to structured board"] },
  { tier: 1, subVertical: "DevTools & AI-Native SaaS", name: "Personio", location: "Munich, DE", pitch: "HR policy analysis; automated handbook generation from 500-page regulatory frameworks", useCases: ["Multi-jurisdiction policy harmonisation", "Employee query to policy clause retrieval", "Handbook auto-generation from legislation"] },
  { tier: 1, subVertical: "DevTools & AI-Native SaaS", name: "Pleo", location: "Copenhagen, DK", pitch: "Expense policy enforcement; receipt-to-ledger matching with multimodal vision and long context", useCases: ["Multimodal receipt parsing and categorisation", "Policy violation flagging across history", "Automated ledger reconciliation"] },
  { tier: 1, subVertical: "DevTools & AI-Native SaaS", name: "Typeform", location: "Barcelona, ES", pitch: "AI form generation from 200-page research briefs; survey response thematic analysis", useCases: ["Research brief to question bank generation", "Long-form response thematic clustering", "Cross-survey longitudinal analysis"] },
  { tier: 1, subVertical: "DevTools & AI-Native SaaS", name: "Kittl", location: "Berlin, DE", pitch: "AI design assistant with 1M-token brand guideline ingestion; multimodal asset generation", useCases: ["Brand guideline to design system enforcement", "Multimodal asset variation generation", "Cross-campaign visual consistency"] },
  { tier: 1, subVertical: "DevTools & AI-Native SaaS", name: "Penpot", location: "Madrid, ES", pitch: "Open-source design tool AI layer; on-premise deployment with sovereign weights", useCases: ["Open-source AI design copilot", "Self-hosted enterprise design intelligence", "Design system compliance checking"] },

  // ── TIER 1: System Integrators ───────────────────────────────────────────
  { tier: 1, subVertical: "System Integrators", name: "Accenture", location: "Dublin, IE", pitch: "Custom enterprise AI deployments; vertical-specific fine-tuning for clients", useCases: ["Enterprise AI transformation at scale", "Vertical model fine-tuning (finance, pharma)", "Legacy system AI augmentation"] },
  { tier: 1, subVertical: "System Integrators", name: "Capgemini", location: "Paris, FR", pitch: "Sovereign AI offerings for French government and enterprise clients", useCases: ["French public sector AI transformation", "EU AI Act-compliant implementations", "Sovereign cloud AI stacks"] },
  { tier: 1, subVertical: "System Integrators", name: "Sopra Steria", location: "Paris, FR", pitch: "Public sector AI transformation; EU AI Act-compliant implementations", useCases: ["Government digital services AI layer", "Healthcare system modernisation", "Defense-adjacent secure deployments"] },
  { tier: 1, subVertical: "System Integrators", name: "Eviden (ex-Atos)", location: "Paris, FR", pitch: "Critical infrastructure AI; air-gapped deployments for defense-adjacent clients", useCases: ["Air-gapped sovereign AI deployments", "Critical infrastructure monitoring AI", "Defense sector secure inference"] },
  { tier: 1, subVertical: "System Integrators", name: "Netcompany", location: "Copenhagen, DK", pitch: "Nordic government digitalisation; healthcare AI on sovereign infrastructure", useCases: ["Nordic digital health AI", "E-government service automation", "Cross-border public data intelligence"] },
  { tier: 1, subVertical: "System Integrators", name: "Endava", location: "London, UK", pitch: "Financial services AI; legacy modernisation with code-intelligent agents", useCases: ["Banking core system modernisation", "Trading platform AI augmentation", "Insurance claims automation"] },
  { tier: 1, subVertical: "System Integrators", name: "SoftwareONE", location: "Stans, CH", pitch: "Microsoft/Azure ecosystem AI add-ons; hybrid cloud deployments", useCases: ["Microsoft 365 AI augmentation", "Hybrid cloud AI orchestration", "Enterprise license optimisation and AI"] },
  { tier: 1, subVertical: "System Integrators", name: "Bechtle", location: "Neckarsulm, DE", pitch: "German Mittelstand AI automation; on-premise server and Kimi bundling", useCases: ["Mittelstand ERP AI layer", "On-premise AI appliance bundles", "Regional manufacturing AI"] },
  { tier: 1, subVertical: "System Integrators", name: "Cancom", location: "Munich, DE", pitch: "IT infrastructure and AI model resale; private cloud AI stacks", useCases: ["Private cloud AI infrastructure", "GPU-as-a-service and model bundling", "Enterprise AI helpdesk automation"] },
  { tier: 1, subVertical: "System Integrators", name: "BCG Gamma / QuantumBlack", location: "London, UK / Paris, FR", pitch: "Strategy consulting AI augmentation; due diligence automation", useCases: ["Due diligence document synthesis", "Market research intelligence at scale", "Client deliverable AI acceleration"] },

  // ── TIER 1: LegalTech & Contract Intelligence ────────────────────────────
  { tier: 1, subVertical: "LegalTech & Contract Intelligence", name: "Luminance", location: "London, UK", pitch: "Due diligence automation; cross-contractual clause detection across 10,000+ pages", useCases: ["Full data room ingestion and risk scoring", "Cross-deal precedent analysis", "Regulatory clause gap detection"] },
  { tier: 1, subVertical: "LegalTech & Contract Intelligence", name: "ThoughtRiver", location: "Cambridge, UK", pitch: "Contract pre-screening; regulatory mapping against EU directive texts", useCases: ["EU directive to contract compliance mapping", "Third-party risk assessment at scale", "Automated contract risk scoring"] },
  { tier: 1, subVertical: "LegalTech & Contract Intelligence", name: "Juro", location: "London, UK", pitch: "Contract lifecycle management; AI negotiation support with full precedent ingestion", useCases: ["Negotiation playbook AI coaching", "Precedent bank intelligent retrieval", "Contract version diff intelligence"] },
  { tier: 1, subVertical: "LegalTech & Contract Intelligence", name: "Robin AI", location: "London, UK", pitch: "Legal copilot for in-house teams; automated NDA and vendor agreement review", useCases: ["In-house legal workload automation", "High-volume contract triage", "Vendor agreement standardisation"] },
  { tier: 1, subVertical: "LegalTech & Contract Intelligence", name: "Legartis", location: "Zurich, CH", pitch: "Swiss/German contract analysis; GDPR clause extraction and risk scoring", useCases: ["GDPR compliance clause detection", "Swiss Code of Obligations mapping", "German BGB contract standardisation"] },
  { tier: 1, subVertical: "LegalTech & Contract Intelligence", name: "ContractPodAi", location: "London, UK", pitch: "Enterprise CLM AI layer; legacy contract migration and analysis", useCases: ["Legacy contract portfolio migration", "Enterprise CLM AI augmentation", "Obligation extraction across 100K+ docs"] },
  { tier: 1, subVertical: "LegalTech & Contract Intelligence", name: "iManage", location: "London, UK", pitch: "Knowledge management RAG; 1M-token search across entire matter files", useCases: ["Matter file intelligent search", "Cross-matter precedent discovery", "Expertise location and staffing AI"] },
  { tier: 1, subVertical: "LegalTech & Contract Intelligence", name: "Big 4 Legal Arms", location: "London / Frankfurt / Paris", pitch: "PwC Legal, Deloitte Legal, EY Law, KPMG Law — internal AI tooling for alternative legal services", useCases: ["ALS document production automation", "Regulatory horizon scanning", "Client-facing legal AI products"] },

  // ── TIER 1: RegTech & Compliance Automation ──────────────────────────────
  { tier: 1, subVertical: "RegTech & Compliance Automation", name: "ComplyAdvantage", location: "London, UK", pitch: "AML screening; adverse media analysis across multi-language source corpora", useCases: ["Adverse media multilingual synthesis", "Sanctions list cross-reference intelligence", "PEP relationship network analysis"] },
  { tier: 1, subVertical: "RegTech & Compliance Automation", name: "Napier", location: "London, UK", pitch: "Transaction monitoring; regulatory change management with 1M-token directive ingestion", useCases: ["Regulatory change to control mapping", "Transaction narrative analysis", "Alert investigation acceleration"] },
  { tier: 1, subVertical: "RegTech & Compliance Automation", name: "Fenergo", location: "Dublin, IE", pitch: "Client lifecycle management; regulatory onboarding document analysis", useCases: ["Onboarding document intelligence", "CLM regulatory compliance checking", "Cross-jurisdiction KYC automation"] },
  { tier: 1, subVertical: "RegTech & Compliance Automation", name: "Sumsub", location: "London, UK", pitch: "Identity verification; document fraud detection with vision and text", useCases: ["Multimodal document fraud detection", "Biometric and document cross-validation", "Global ID document intelligence"] },
  { tier: 1, subVertical: "RegTech & Compliance Automation", name: "Alyne (OneTrust)", location: "Munich, DE", pitch: "GRC platform AI layer; control-to-regulation mapping", useCases: ["Control library to regulation mapping", "GRC assessment automation", "Third-party risk intelligence"] },
  { tier: 1, subVertical: "RegTech & Compliance Automation", name: "Shift Technology", location: "Paris, FR", pitch: "Insurance fraud detection; claims narrative analysis", useCases: ["Claims narrative fraud detection", "Medical report intelligence", "Subrogation document analysis"] },

  // ── TIER 1: AI-Native Startups ───────────────────────────────────────────
  { tier: 1, subVertical: "AI-Native Startups", name: "Gitpod", location: "Berlin, DE", pitch: "Cloud development environment AI; workspace-wide code intelligence", useCases: ["Workspace-wide code understanding", "Dev environment AI configuration", "Onboarding to productive code faster"] },
  { tier: 1, subVertical: "AI-Native Startups", name: "CodeScene", location: "Malmö, SE", pitch: "Code quality visualisation; architectural analysis with 1M-token repo ingestion", useCases: ["Full-repo architectural analysis", "Technical debt prioritisation AI", "Team productivity correlation"] },
  { tier: 1, subVertical: "AI-Native Startups", name: "Sourcery", location: "London, UK", pitch: "AI code review; automated refactoring across entire Python/Java codebases", useCases: ["Cross-file refactoring suggestions", "Pattern-based code improvement", "Legacy code modernisation"] },
  { tier: 1, subVertical: "AI-Native Startups", name: "Poolside", location: "Paris, FR", pitch: "AI for software engineering; foundation model training data curation", useCases: ["Training data quality curation", "Code model evaluation at scale", "Synthetic data generation"] },
  { tier: 1, subVertical: "AI-Native Startups", name: "Aleph Alpha", location: "Heidelberg, DE", pitch: "German sovereign AI stack; long-context document analysis for government clients", useCases: ["German government document AI", "Sovereign AI stack integration", "EU public sector AI deployment"] },

  // ── TIER 2: Tech-Forward Mid-Market Banks & Fintechs ─────────────────────
  { tier: 2, subVertical: "Mid-Market Banks & Fintechs", name: "Revolut", location: "London, UK", pitch: "Internal coding copilot; financial crime investigation narrative analysis", useCases: ["Developer productivity AI", "SAR narrative generation", "Transaction pattern intelligence"] },
  { tier: 2, subVertical: "Mid-Market Banks & Fintechs", name: "Monzo", location: "London, UK", pitch: "Customer support AI; transaction dispute analysis with full conversation history", useCases: ["Support ticket intelligent routing", "Dispute evidence synthesis", "Customer conversation analysis"] },
  { tier: 2, subVertical: "Mid-Market Banks & Fintechs", name: "N26", location: "Berlin, DE", pitch: "KYC document processing; multilingual customer support", useCases: ["Pan-European KYC automation", "Multilingual support intelligence", "Regulatory filing preparation"] },
  { tier: 2, subVertical: "Mid-Market Banks & Fintechs", name: "Trade Republic", location: "Berlin, DE", pitch: "Investment research synthesis; regulatory filing analysis", useCases: ["Research report synthesis", "BaFin filing preparation", "Portfolio commentary generation"] },
  { tier: 2, subVertical: "Mid-Market Banks & Fintechs", name: "Qonto", location: "Paris, FR", pitch: "Expense categorisation; financial report generation for SMB clients", useCases: ["Automated expense categorisation", "Financial report generation", "Tax preparation assistance"] },
  { tier: 2, subVertical: "Mid-Market Banks & Fintechs", name: "Bunq", location: "Amsterdam, NL", pitch: "Transaction categorisation; savings advice with full account history", useCases: ["Transaction intelligence", "Personal finance coaching", "Subscription management AI"] },
  { tier: 2, subVertical: "Mid-Market Banks & Fintechs", name: "Lunar", location: "Copenhagen, DK", pitch: "Nordic SME banking AI; cross-border trade document analysis", useCases: ["Nordic trade document processing", "SME cash flow forecasting", "Cross-border compliance checking"] },
  { tier: 2, subVertical: "Mid-Market Banks & Fintechs", name: "Swedbank", location: "Stockholm, SE", pitch: "Legacy code modernisation; internal developer productivity", useCases: ["Core banking modernisation", "Developer copilot deployment", "Regulatory report automation"] },

  // ── TIER 2: Biotech & Research-Stage Pharma ──────────────────────────────
  { tier: 2, subVertical: "Biotech & Research-Stage Pharma", name: "BenevolentAI", location: "London, UK", pitch: "Drug target identification; biomedical literature synthesis", useCases: ["Literature-based target discovery", "Knowledge graph construction", "Hypothesis generation from papers"] },
  { tier: 2, subVertical: "Biotech & Research-Stage Pharma", name: "Exscientia", location: "Oxford, UK", pitch: "AI-driven drug design; patient stratification document analysis", useCases: ["Patient stratification intelligence", "Protocol optimisation", "Biomarker discovery from literature"] },
  { tier: 2, subVertical: "Biotech & Research-Stage Pharma", name: "BioNTech", location: "Mainz, DE", pitch: "mRNA research; regulatory submission drafting", useCases: ["Regulatory document drafting", "mRNA sequence analysis", "Manufacturing deviation analysis"] },
  { tier: 2, subVertical: "Biotech & Research-Stage Pharma", name: "Evotec", location: "Hamburg, DE", pitch: "Drug discovery platform AI; partnership agreement analysis", useCases: ["Partnership agreement intelligence", "Platform data analysis", "HTS result interpretation"] },
  { tier: 2, subVertical: "Biotech & Research-Stage Pharma", name: "Galapagos", location: "Leiden, NL", pitch: "R&D pipeline analysis; patent landscape mapping", useCases: ["Patent landscape intelligence", "Pipeline prioritisation AI", "Competitive intelligence synthesis"] },
  { tier: 2, subVertical: "Biotech & Research-Stage Pharma", name: "Argenx", location: "Ghent, BE", pitch: "Immunology research; investigator brochure generation", useCases: ["Investigator brochure drafting", "Clinical protocol optimisation", "Regulatory correspondence AI"] },

  // ── TIER 2: Industrial & Manufacturing ───────────────────────────────────
  { tier: 2, subVertical: "Industrial & Manufacturing", name: "Siemens", location: "Munich / Berlin, DE", pitch: "Industrial knowledge management; predictive maintenance RAG", useCases: ["Equipment manual intelligence", "Predictive maintenance documentation", "Service technician copilot"] },
  { tier: 2, subVertical: "Industrial & Manufacturing", name: "Bosch", location: "Stuttgart, DE", pitch: "Manufacturing SOP analysis; quality control document intelligence", useCases: ["SOP compliance checking", "Quality deviation root cause", "Supplier document analysis"] },
  { tier: 2, subVertical: "Industrial & Manufacturing", name: "Trumpf", location: "Ditzingen, DE", pitch: "Laser machine troubleshooting; service manual multimodal QA", useCases: ["Machine fault diagnosis from manual", "Multimodal diagram understanding", "Service ticket resolution AI"] },
  { tier: 2, subVertical: "Industrial & Manufacturing", name: "Schneider Electric", location: "Rueil-Malmaison, FR", pitch: "Energy management AI; building automation system documentation", useCases: ["BAS documentation intelligence", "Energy audit report synthesis", "Retrofit recommendation AI"] },
  { tier: 2, subVertical: "Industrial & Manufacturing", name: "ABB", location: "Zurich, CH", pitch: "Power grid documentation; industrial automation troubleshooting", useCases: ["Grid operations manual intelligence", "Automation fault diagnosis", "Technical training content generation"] },
  { tier: 2, subVertical: "Industrial & Manufacturing", name: "Atlas Copco", location: "Stockholm, SE", pitch: "Compressor maintenance AI; spare parts identification from manuals", useCases: ["Parts catalog intelligence", "Maintenance interval optimisation", "Field service documentation"] },
  { tier: 2, subVertical: "Industrial & Manufacturing", name: "Volvo", location: "Gothenburg, SE", pitch: "Vehicle service documentation; warranty claim analysis", useCases: ["Warranty claim intelligence", "Service bulletin synthesis", "Recall impact assessment"] },
  { tier: 2, subVertical: "Industrial & Manufacturing", name: "Philips", location: "Amsterdam, NL", pitch: "Medical device field service; installation guide multimodal analysis", useCases: ["Field service guide intelligence", "Installation troubleshooting AI", "Device configuration automation"] },

  // ── TIER 2: Research Universities & HPC Centers ───────────────────────────
  { tier: 2, subVertical: "Research Universities", name: "University of Oxford", location: "Oxford, UK", pitch: "AI safety research; mechanistic interpretability on open weights", useCases: ["Mechanistic interpretability studies", "AI alignment research", "Red-teaming and evaluation"] },
  { tier: 2, subVertical: "Research Universities", name: "University of Cambridge", location: "Cambridge, UK", pitch: "NLP research; long-context evaluation benchmarking", useCases: ["Long-context benchmark leadership", "Multilingual evaluation frameworks", "Agent architecture research"] },
  { tier: 2, subVertical: "Research Universities", name: "Imperial College London", location: "London, UK", pitch: "Climate modelling; scientific literature synthesis", useCases: ["Climate report synthesis", "Scientific literature mining", "Policy impact assessment AI"] },
  { tier: 2, subVertical: "Research Universities", name: "ETH Zurich", location: "Zurich, CH", pitch: "Robotics AI; European sovereign AI initiative participation", useCases: ["Robotics foundation model research", "Swiss AI strategy contribution", "Distributed systems AI"] },
  { tier: 2, subVertical: "Research Universities", name: "EPFL", location: "Lausanne, CH", pitch: "Machine learning theory; distributed training research", useCases: ["MoE architecture research", "Distributed training optimisation", "Efficient inference research"] },
  { tier: 2, subVertical: "Research Universities", name: "TU Munich", location: "Munich, DE", pitch: "Automotive AI; German industry partnership programmes", useCases: ["Autonomous driving AI research", "Industry-academia partnerships", "Manufacturing AI optimisation"] },
  { tier: 2, subVertical: "Research Universities", name: "Max Planck Institutes", location: "Tübingen / Saarbrücken, DE", pitch: "Fundamental AI research; cognitive science modelling", useCases: ["Cognitive architecture modelling", "Neuroscience-AI intersection", "Foundational model theory"] },
  { tier: 2, subVertical: "Research Universities", name: "INRIA", location: "Paris / Sophia Antipolis, FR", pitch: "French sovereign AI; open-source ecosystem development", useCases: ["French AI sovereignty research", "Open-source tooling development", "EU digital sovereignty frameworks"] },
  { tier: 2, subVertical: "Research Universities", name: "TU Delft", location: "Delft, NL", pitch: "Engineering AI; technical document automation", useCases: ["Engineering design AI", "Technical documentation automation", "Structural analysis intelligence"] },

  // ── TIER 3: Large European Enterprises (Self-Hosted Only) ─────────────────
  { tier: 3, subVertical: "Large Enterprises (Self-Hosted)", name: "Allianz", location: "Munich, DE", pitch: "Internal knowledge management; claims document analysis", useCases: ["Claims narrative intelligence", "Underwriting document analysis", "Internal policy knowledge base"] },
  { tier: 3, subVertical: "Large Enterprises (Self-Hosted)", name: "Munich Re", location: "Munich, DE", pitch: "Risk assessment report synthesis; catastrophe modelling narrative", useCases: ["Catastrophe model report generation", "Risk assessment document synthesis", "Reinsurance contract analysis"] },
  { tier: 3, subVertical: "Large Enterprises (Self-Hosted)", name: "Deutsche Telekom", location: "Bonn, DE", pitch: "Network operations AI; customer support automation", useCases: ["Network operations manual intelligence", "Customer support automation", "Technical documentation synthesis"] },
  { tier: 3, subVertical: "Large Enterprises (Self-Hosted)", name: "Mercedes-Benz", location: "Stuttgart, DE", pitch: "Engineering document intelligence; supplier contract analysis", useCases: ["Supplier contract intelligence", "Engineering specification analysis", "Quality management document AI"] },
  { tier: 3, subVertical: "Large Enterprises (Self-Hosted)", name: "BMW", location: "Munich, DE", pitch: "R&D knowledge management; regulatory compliance checking", useCases: ["R&D document intelligence", "Homologation compliance checking", "Patent landscape analysis"] },
  { tier: 3, subVertical: "Large Enterprises (Self-Hosted)", name: "TotalEnergies", location: "Paris, FR", pitch: "Engineering knowledge base; safety procedure analysis", useCases: ["Safety procedure compliance", "Engineering standard intelligence", "Environmental reporting synthesis"] },
  { tier: 3, subVertical: "Large Enterprises (Self-Hosted)", name: "LVMH", location: "Paris, FR", pitch: "Luxury brand content generation; multimodal marketing asset creation", useCases: ["Brand guideline enforcement AI", "Multimodal asset generation", "Heritage document intelligence"] },
  { tier: 3, subVertical: "Large Enterprises (Self-Hosted)", name: "Shell", location: "London, UK", pitch: "Engineering standards AI; environmental compliance checking", useCases: ["Engineering standard intelligence", "Environmental compliance automation", "Operational safety documentation"] },
  { tier: 3, subVertical: "Large Enterprises (Self-Hosted)", name: "ASML", location: "Veldhoven, NL", pitch: "Semiconductor process documentation; technical training AI", useCases: ["Process documentation intelligence", "Technical training content", "Equipment troubleshooting AI"] },

  // ── TIER 3: Government-Adjacent / Sovereign Cloud ─────────────────────────
  { tier: 3, subVertical: "Government-Adjacent / Sovereign Cloud", name: "OVHcloud", location: "Roubaix, FR", pitch: "French sovereign cloud AI offering; government model-as-a-service", useCases: ["French government AI stack", "Sovereign model-as-a-service", "EU public sector AI hosting"] },
  { tier: 3, subVertical: "Government-Adjacent / Sovereign Cloud", name: "Scaleway", location: "Paris, FR", pitch: "Startup/scale-up AI infrastructure; EU-native GPU cloud", useCases: ["GPU cloud and model bundling", "Startup AI infrastructure", "EU-native inference hosting"] },
  { tier: 3, subVertical: "Government-Adjacent / Sovereign Cloud", name: "Ionos", location: "Montabaur, DE", pitch: "German Mittelstand AI hosting; GDPR-compliant model deployment", useCases: ["German SME AI hosting", "GDPR-compliant inference", "On-premise AI appliance"] },
  { tier: 3, subVertical: "Government-Adjacent / Sovereign Cloud", name: "T-Systems", location: "Frankfurt, DE", pitch: "Deutsche Telekom cloud; public sector AI", useCases: ["German public sector AI", "Telecom infrastructure AI", "Enterprise sovereign cloud"] },
];
