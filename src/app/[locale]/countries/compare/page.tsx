'use client';

import { useState, useMemo, Suspense } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Link } from '@/lib/navigation';
import dynamic from 'next/dynamic';
import {
  COUNTRY_NAMES,
  COUNTRY_DETAIL,
  PHASE_COLORS,
  PHASE_LABELS,
  ISO2_TO_SLUG,
  SLUG_TO_ISO2,
} from '@/data/countries';
import { EvidenceBadge } from '@/components/EvidenceBadge';
import { FlagIcon } from '@/components/ui/FlagIcon';
import { X, Plus, ChevronLeft } from 'lucide-react';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

const ALL_COUNTRIES = [
  'GB', 'DE', 'NL', 'FR', 'CH', 'SE', 'DK', 'FI', 'NO', 'ES', 'IT', 'PL', 'AT', 'BE', 'IE',
];

const SCORE_DIMENSIONS = [
  { key: 'score', label: 'Overall Score' },
  { key: 'regulatoryComplexity', label: 'Regulatory (inverted)', isQualitative: true },
  { key: 'revBase', label: 'Revenue Potential (Base €M)' },
];

function getRegScore(complexity: 'low' | 'medium' | 'high'): number {
  return complexity === 'low' ? 90 : complexity === 'medium' ? 60 : 30;
}

function ComparePageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const initialCountries = (searchParams.get('countries') ?? 'GB,DE,NL')
    .split(',')
    .filter(c => COUNTRY_DETAIL[c])
    .slice(0, 4);

  const [selected, setSelected] = useState<string[]>(initialCountries);
  const [addInput, setAddInput] = useState('');

  const updateURL = (countries: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('countries', countries.join(','));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const removeCountry = (iso2: string) => {
    const next = selected.filter(c => c !== iso2);
    setSelected(next);
    updateURL(next);
  };

  const addCountry = (iso2: string) => {
    if (!iso2 || selected.includes(iso2) || !COUNTRY_DETAIL[iso2] || selected.length >= 4) return;
    const next = [...selected, iso2];
    setSelected(next);
    updateURL(next);
    setAddInput('');
  };

  // Build ECharts grouped bar chart
  const dimensions = [
    { key: 'score', label: 'Score', max: 100 },
    { key: 'regScore', label: 'Reg. Ease', max: 100 },
    { key: 'revBase', label: 'Rev. (€M)', max: 100 },
  ];

  const colors = ['#00d4ff', '#a855f7', '#f59e0b', '#10b981'];

  const chartOption = useMemo(() => {
    const series = selected.map((iso2, idx) => {
      const detail = COUNTRY_DETAIL[iso2];
      const names = COUNTRY_NAMES[iso2];
      if (!detail || !names) return null;
      const regScore = getRegScore(detail.regulatoryComplexity);
      const revNorm = Math.min(100, Math.round((detail.revenuePotentialM.base / 80) * 100));
      return {
        name: `${names.flag} ${names.en}`,
        type: 'bar',
        data: [detail.score, regScore, revNorm],
        itemStyle: { color: colors[idx] },
        label: { show: true, position: 'top', color: colors[idx], fontSize: 9 },
      };
    }).filter(Boolean);

    return {
      backgroundColor: 'transparent',
      textStyle: { color: '#7a90b0' },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#0d1420',
        borderColor: 'rgba(100,140,200,0.15)',
        textStyle: { color: '#e8eef8' },
      },
      legend: {
        data: selected.map(iso2 => {
          const names = COUNTRY_NAMES[iso2];
          return names ? `${names.flag} ${names.en}` : iso2;
        }),
        textStyle: { color: '#7a90b0', fontSize: 11 },
        bottom: 0,
      },
      grid: { left: 40, right: 20, top: 20, bottom: 60 },
      xAxis: {
        type: 'category',
        data: dimensions.map(d => d.label),
        axisLabel: { color: '#7a90b0', fontSize: 11 },
        axisLine: { lineStyle: { color: '#4a5a7a' } },
        splitLine: { lineStyle: { color: '#1a2438' } },
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: { color: '#7a90b0', fontSize: 11 },
        axisLine: { lineStyle: { color: '#4a5a7a' } },
        splitLine: { lineStyle: { color: '#1a2438' } },
      },
      series,
    };
  }, [selected]);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href={`/countries`} className="p-1 rounded hover:opacity-70 transition-opacity" style={{ color: 'var(--lunar-text-muted)' }}>
          <ChevronLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--lunar-text-primary)' }}>
            Country Comparison
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--lunar-text-secondary)' }}>
            Side-by-side analysis — up to 4 countries
          </p>
        </div>
        <EvidenceBadge type="RECOMMENDATION" reasoning="Comparison data based on analyst assessments" />
      </div>

      {/* Country selector */}
      <div className="lunar-card">
        <div className="flex flex-wrap gap-2 items-center">
          {selected.map((iso2, idx) => {
            const names = COUNTRY_NAMES[iso2];
            return (
              <div
                key={iso2}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                style={{ background: `${colors[idx]}20`, border: `1px solid ${colors[idx]}50`, color: colors[idx] }}
              >
                <FlagIcon iso2={iso2} size={20} />
                <span className="font-medium">{names?.en ?? iso2}</span>
                <button
                  onClick={() => removeCountry(iso2)}
                  className="hover:opacity-70 transition-opacity"
                  aria-label={`Remove ${names?.en ?? iso2}`}
                >
                  <X size={12} />
                </button>
              </div>
            );
          })}
          {selected.length < 4 && (
            <div className="flex items-center gap-2">
              <select
                value={addInput}
                onChange={e => {
                  setAddInput(e.target.value);
                  addCountry(e.target.value);
                }}
                className="text-xs px-2 py-1.5 rounded"
                style={{
                  background: 'var(--lunar-elevated)',
                  border: '1px solid var(--lunar-border-subtle)',
                  color: 'var(--lunar-text-muted)',
                }}
                aria-label="Add country to comparison"
              >
                <option value="">+ Add country</option>
                {ALL_COUNTRIES
                  .filter(c => !selected.includes(c))
                  .map(iso2 => {
                    const names = COUNTRY_NAMES[iso2];
                    return (
                      <option key={iso2} value={iso2}>
                        {names?.flag} {names?.en ?? iso2}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}
        </div>
      </div>

      {selected.length === 0 ? (
        <div className="lunar-card text-center py-12 text-sm" style={{ color: 'var(--lunar-text-muted)' }}>
          Add countries above to start comparing
        </div>
      ) : (
        <>
          {/* Executive snapshot table */}
          <div className="lunar-card p-0 overflow-hidden">
            <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--lunar-border-subtle)' }}>
              <h2 className="text-sm font-semibold" style={{ color: 'var(--lunar-text-primary)' }}>
                Executive Snapshot
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="Country comparison table">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--lunar-border-subtle)' }}>
                    <th className="text-left px-4 py-2 font-medium text-xs w-40" style={{ color: 'var(--lunar-text-muted)' }}>Dimension</th>
                    {selected.map((iso2, idx) => {
                      const names = COUNTRY_NAMES[iso2];
                      return (
                        <th key={iso2} className="text-center px-4 py-2 font-medium text-xs" style={{ color: colors[idx] }}>
                          <FlagIcon iso2={iso2} size={18} className="inline-block mr-1" /> {names?.en ?? iso2}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Score', render: (iso2: string) => {
                      const d = COUNTRY_DETAIL[iso2];
                      return d ? <span className="font-mono font-bold" style={{ color: 'var(--lunar-cyan)' }}>{d.score}/100</span> : '—';
                    }},
                    { label: 'Launch Wave', render: (iso2: string) => {
                      const d = COUNTRY_DETAIL[iso2];
                      if (!d) return '—';
                      const color = PHASE_COLORS[d.wave as keyof typeof PHASE_COLORS] ?? '#4a5a7a';
                      return <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${color}18`, color }}>{d.wave}</span>;
                    }},
                    { label: 'Strategic Role', render: (iso2: string) => {
                      const d = COUNTRY_DETAIL[iso2];
                      return <span className="text-xs" style={{ color: 'var(--lunar-text-secondary)' }}>{d?.role ?? '—'}</span>;
                    }},
                    { label: 'Rev. Potential (Base)', render: (iso2: string) => {
                      const d = COUNTRY_DETAIL[iso2];
                      return d ? <span className="font-mono text-xs" style={{ color: 'var(--lunar-green)' }}>€{d.revenuePotentialM.base}M</span> : '—';
                    }},
                    { label: 'Regulatory', render: (iso2: string) => {
                      const d = COUNTRY_DETAIL[iso2];
                      if (!d) return '—';
                      const color = d.regulatoryComplexity === 'high' ? 'var(--lunar-red)' : d.regulatoryComplexity === 'medium' ? 'var(--lunar-amber)' : 'var(--lunar-green)';
                      return <span className="text-xs capitalize" style={{ color }}>{d.regulatoryComplexity}</span>;
                    }},
                    { label: 'Main Blocker', render: (iso2: string) => {
                      const d = COUNTRY_DETAIL[iso2];
                      return <span className="text-xs" style={{ color: 'var(--lunar-amber)' }}>{d?.mainBlocker ? d.mainBlocker.slice(0, 60) + '...' : '—'}</span>;
                    }},
                  ].map(row => (
                    <tr key={row.label} style={{ borderBottom: '1px solid var(--lunar-border-subtle)' }}>
                      <td className="px-4 py-3 text-xs font-medium" style={{ color: 'var(--lunar-text-muted)' }}>{row.label}</td>
                      {selected.map(iso2 => (
                        <td key={iso2} className="px-4 py-3 text-center">{row.render(iso2)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Grouped bar chart */}
          <div className="lunar-card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold" style={{ color: 'var(--lunar-text-primary)' }}>
                Score Breakdown Comparison
              </h2>
              <EvidenceBadge type="ASSUMPTION" reasoning="Revenue normalized to 0-100 scale for comparison. Regulatory ease = inverted complexity (low=90, med=60, high=30)." />
            </div>
            <ReactECharts option={chartOption} style={{ height: 320 }} />
          </div>

          {/* Profile links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {selected.map((iso2, idx) => {
              const names = COUNTRY_NAMES[iso2];
              const slug = ISO2_TO_SLUG[iso2];
              if (!slug || !names) return null;
              return (
                <Link
                  key={iso2}
                  href={`/countries/${slug}`}
                  className="lunar-card text-center p-3 hover:opacity-80 transition-opacity"
                  style={{ border: `1px solid ${colors[idx]}30` }}
                >
                  <div className="mb-1"><FlagIcon iso2={iso2} size={28} /></div>
                  <div className="text-xs font-medium" style={{ color: colors[idx] }}>{names.en}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--lunar-text-muted)' }}>Open profile →</div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64" style={{ color: 'var(--lunar-text-muted)' }}>
        Loading comparison…
      </div>
    }>
      <ComparePageInner />
    </Suspense>
  );
}
