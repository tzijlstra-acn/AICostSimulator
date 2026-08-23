export type SupportedLocale = 'en' | 'zh-CN';

/**
 * Format a currency value with locale-appropriate representation.
 * For zh-CN: values >= 1B are shown as "NNN 亿欧元"
 * For en: values >= 1B shown as "€NNB", >= 1M as "€NNM"
 */
export function formatCurrency(value: number, locale: SupportedLocale): string {
  if (locale === 'zh-CN') {
    if (value >= 1_000_000_000) {
      const billions = value / 1_000_000_000;
      const yi = billions * 10; // 1B = 10亿
      return `${yi % 1 === 0 ? yi.toFixed(0) : yi.toFixed(1)} 亿欧元`;
    }
    if (value >= 1_000_000) {
      const millions = value / 1_000_000;
      return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)} 百万欧元`;
    }
    return `${value.toLocaleString('zh-CN')} 欧元`;
  }

  // English
  if (value >= 1_000_000_000) {
    const billions = value / 1_000_000_000;
    return `€${billions % 1 === 0 ? billions.toFixed(0) : billions.toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `€${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
  }
  return `€${value.toLocaleString('en-EU')}`;
}

/**
 * Format a date string (YYYY-MM-DD) with locale-appropriate representation.
 * For zh-CN: "2026 年 8 月 22 日"
 * For en: "22 August 2026"
 */
export function formatDate(date: string | Date, locale: SupportedLocale): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (locale === 'zh-CN') {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year} 年 ${month} 月 ${day} 日`;
  }
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
