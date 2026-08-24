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
