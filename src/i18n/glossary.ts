/**
 * Controlled bilingual terminology for the Kimi Europe Expansion OS.
 * These terms must be used consistently throughout the application.
 */

export interface GlossaryEntry {
  en: string;
  zhCN: string;
  context?: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  { en: 'Total Addressable Market', zhCN: '可寻址市场总量', context: 'TAM' },
  { en: 'Serviceable Addressable Market', zhCN: '可触达市场', context: 'SAM' },
  { en: 'Serviceable Obtainable Market', zhCN: '可获得市场', context: 'SOM' },
  { en: 'CAGR', zhCN: '年均复合增长率', context: 'Compound Annual Growth Rate' },
  { en: 'EU AI Act', zhCN: '欧盟《人工智能法案》' },
  { en: 'General Purpose AI', zhCN: '通用人工智能', context: 'GPAI' },
  { en: 'Stage Gate', zhCN: '阶段门槛' },
  { en: 'Go-to-Market', zhCN: '市场进入与商业化', context: 'GTM' },
  { en: 'Annual Contract Value', zhCN: '年均合同金额', context: 'ACV' },
  { en: 'OEM', zhCN: 'OEM（原始设备制造商）' },
  { en: 'Inference', zhCN: '推理' },
  { en: 'Sovereign Deployment', zhCN: '主权部署' },
  { en: 'Data Residency', zhCN: '数据驻留' },
  { en: 'Knowledge Worker', zhCN: '知识工作者' },
  { en: 'Enterprise', zhCN: '企业客户' },
  { en: 'Developer', zhCN: '开发者' },
  { en: 'Regulatory Readiness', zhCN: '监管就绪度' },
  { en: 'Board Memo', zhCN: '董事会备忘录' },
  { en: 'Decision Log', zhCN: '决策日志' },
  { en: 'Risk Register', zhCN: '风险清单' },
  { en: 'Use Case', zhCN: '应用场景' },
  { en: 'Pilot', zhCN: '试点' },
  { en: 'Partner Ecosystem', zhCN: '合作伙伴生态' },
  { en: 'Workstream', zhCN: '工作流' },
  { en: 'Market Share', zhCN: '市场份额' },
];
