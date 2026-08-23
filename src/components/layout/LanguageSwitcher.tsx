'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div
      className="flex items-center gap-1 text-sm font-medium"
      role="group"
      aria-label="Language selection"
    >
      <button
        onClick={() => switchLocale('en')}
        aria-pressed={locale === 'en'}
        aria-label="Change language to English"
        className={`px-2 py-1 rounded transition-colors ${
          locale === 'en'
            ? 'text-cyan-400 bg-cyan-400/10'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        EN
      </button>
      <span className="text-slate-600" aria-hidden="true">
        |
      </span>
      <button
        onClick={() => switchLocale('zh-CN')}
        aria-pressed={locale === 'zh-CN'}
        aria-label="将语言切换为简体中文"
        className={`px-2 py-1 rounded transition-colors ${
          locale === 'zh-CN'
            ? 'text-cyan-400 bg-cyan-400/10'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        中文
      </button>
    </div>
  );
}
