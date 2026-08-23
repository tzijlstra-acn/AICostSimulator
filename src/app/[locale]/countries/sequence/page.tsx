'use client';

import { useState, Suspense } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/lib/navigation';
import { useAppStore } from '@/store';
import dynamic from 'next/dynamic';
import { ArrowLeft, Map, RotateCcw, Save } from 'lucide-react';
import { EvidenceBadge } from '@/components/EvidenceBadge';
import { FlagIcon } from '@/components/ui/FlagIcon';

const ReactECharts = dynamic(() => import('echarts-for-react'), { ssr: false });

const YEARS = [2027, 2028, 2029, 2030] as const;
type Year = typeof YEARS[number];

interface SequenceCountry {
  iso2: string;
  name: string;
  flag: string;
  score: number;
  wave: string;
  revM: Record<Year, number>;
}

const SEQUENCE_COUNTRIES_DEFAULT: SequenceCountry[] = [
  { iso2: 'GB', name: 'United Kingdom', flag: '🇬🇧', score: 84, wave: '2027H1', revM: { 2027: 8, 2028: 22, 2029: 45, 2030: 85 } },
  { iso2: 'DE', name: 'Germany', flag: '🇩🇪', score: 83, wave: '2027H1', revM: { 2027: 6, 2028: 18, 2029: 42, 2030: 90 } },
  { iso2: 'NL', name: 'Netherlands', flag: '🇳🇱', score: 79, wave: '2027H1', revM: { 2027: 4, 2028: 12, 2029: 25, 2030: 48 } },
  { iso2: 'FR', name: 'France', flag: '🇫🇷', score: 78, wave: '2027H1', revM: { 2027: 3, 2028: 10, 2029: 22, 2030: 50 } },
  { iso2: 'CH', name: 'Switzerland', flag: '🇨🇭', score: 76, wave: '2027H2', revM: { 2027: 0, 2028: 8, 2029: 18, 2030: 35 } },
  { iso2: 'SE', name: 'Sweden', flag: '🇸🇪', score: 75, wave: '2027H2', revM: { 2027: 0, 2028: 6, 2029: 14, 2030: 28 } },
  { iso2: 'ES', name: 'Spain', flag: '🇪🇸', score: 70, wave: '2028', revM: { 2027: 0, 2028: 2, 2029: 10, 2030: 30 } },
  { iso2: 'IT', name: 'Italy', flag: '🇮🇹', score: 68, wave: '2028', revM: { 2027: 0, 2028: 2, 2029: 9, 2030: 25 } },
  { iso2: 'PL', name: 'Poland', flag: '🇵🇱', score: 67, wave: '2028', revM: { 2027: 0, 2028: 2, 2029: 8, 2030: 22 } },
];

const BLOCKERS: Record<string, string> = {
  GB: 'Post-Brexit data adequacy uncertainty',
  DE: 'German procurement trust + GDPR enforcement',
  NL: 'Relatively small standalone market',
  FR: 'French AI sovereignty regulation risk',
  CH: 'Non-EU data sovereignty requirements',
  SE: 'Requires Nordic GTM localisation',
  ES: 'Multilingual support cost (ES/CA/eu)',
  IT: 'Longer enterprise sales cycles',
  PL: 'Price sensitivity, slower AI adoption curve',
};

function calcCumulativeRevenue(countries: SequenceCountry[]): Record<Year, number> {
  return YEARS.reduce((acc, yr) => {
    acc[yr] = countries.reduce((sum, c) => sum + (c.revM[yr] ?? 0), 0);
    return acc;
  }, {} as Record<Year, number>);
}

function calcTimeToTarget(countries: SequenceCountry[]): string {
  const cumRev = calcCumulativeRevenue(countries);
  for (const yr of YEARS) {
    if (cumRev[yr] >= 50) return `${yr}`;
  }
  return '>2030';
}

function SequencePageInner() {
  const locale = useLocale();
  const { addDecision } = useAppStore();

  const [countries, setCountries] = useState<SequenceCountry[]>([...SEQUENCE_COUNTRIES_DEFAULT]);
  const [scenarioLabel, setScenarioLabel] = useState('Custom Sequence');
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const cumRev = calcCumulativeRevenue(countries);
  const timeToTarget = calcTimeToTarget(countries);
  const firstMarketRisk = BLOCKERS[countries[0]?.iso2] ?? 'Unknown';

  // Chart option
  const chartOption = {
    backgroundColor: 'transparent',
    textStyle: { color: '#7a90b0' },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#0d1420',
      borderColor: 'rgba(100,140,200,0.15)',
      textStyle: { color: '#e8eef8' },
      formatter: (params: { name: string; value: number }[]) =>
        params.map(p => `${p.name}: €${p.value}M`).join('<br/>'),
    },
    grid: { left: 50, right: 20, top: 20, bottom: 30 },
    xAxis: {
      type: 'category',
      data: YEARS.map(String),
      axisLabel: { color: '#7a90b0', fontSize: 11 },
      axisLine: { lineStyle: { color: '#4a5a7a' } },
      splitLine: { lineStyle: { color: '#1a2438' } },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#7a90b0',
        fontSize: 11,
        formatter: (v: number) => `€${v}M`,
      },
      axisLine: { lineStyle: { color: '#4a5a7a' } },
      splitLine: { lineStyle: { color: '#1a2438' } },
    },
    series: [
      {
        name: 'Cumulative Revenue',
        type: 'bar',
        data: YEARS.map(yr => cumRev[yr]),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#00d4ff' },
              { offset: 1, color: '#a855f7' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
        label: {
          show: true,
          position: 'top',
          formatter: (p: { value: number }) => `€${p.value}M`,
          color: 'var(--lunar-text-secondary)',
          fontSize: 10,
        },
      },
    ],
  };

  // Drag-and-drop handlers
  const handleDragStart = (idx: number) => (e: React.DragEvent) => {
    setDragIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (targetIdx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === targetIdx) return;
    setCountries(prev => {
      const next = [...prev];
      const [moved] = next.splice(dragIdx, 1);
      next.splice(targetIdx, 0, moved);
      return next;
    });
    setDragIdx(null);
  };

  const handleDragEnd = () => setDragIdx(null);

  const handleReset = () => {
    setCountries([...SEQUENCE_COUNTRIES_DEFAULT]);
  };

  const handleSaveToLog = () => {
    const sequenceStr = countries.map((c, i) => `${i + 1}. ${c.flag} ${c.name}`).join(', ');
    addDecision({
      text: `Entry Sequence: ${scenarioLabel} — ${sequenceStr}`,
      status: 'proposed',
      owner: 'Strategy Team',
      date: new Date().toISOString().slice(0, 10),
      rationale: `Projected cumulative revenue by 2030: €${cumRev[2030]}M. Estimated time to €50M ARR: ${timeToTarget}. First market risk: ${firstMarketRisk}.`,
      evidence: 'S1, S3, S6',
    });
  };

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs" style={{ color: 'var(--lunar-text-muted)' }} aria-label="Breadcrumb">
        <Link href={`/${locale}/countries`} className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
          <Map size={12} />
          Countries
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--lunar-text-primary)' }}>Sequence Simulator</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--lunar-text-primary)' }}>
              Entry Sequence Simulator
            </h1>
            <EvidenceBadge type="RECOMMENDATION" reasoning="Recommended sequence is based on the country scoring model" />
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--lunar-text-secondary)' }}>
            Drag to reorder. The simulator calculates cumulative revenue and risk exposure for each scenario.
          </p>
        </div>
        <Link
          href={`/${locale}/countries`}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs flex-shrink-0"
          style={{ background: 'rgba(0,212,255,0.1)', color: 'var(--lunar-cyan)', border: '1px solid rgba(0,212,255,0.2)' }}
        >
          <ArrowLeft size={12} />
          Back to map
        </Link>
      </div>

      {/* Main 2-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4">
        {/* LEFT PANEL — draggable country list */}
        <div className="lunar-card p-0 overflow-hidden">
          <div
            className="px-4 py-3 border-b text-xs font-semibold"
            style={{ borderColor: 'var(--lunar-border-subtle)', color: 'var(--lunar-text-muted)' }}
          >
            Drag to reorder — priority sequence
          </div>
          <ol className="divide-y" style={{ borderColor: 'var(--lunar-border-subtle)' }}>
            {countries.map((country, idx) => (
              <li
                key={country.iso2}
                draggable={true}
                onDragStart={handleDragStart(idx)}
                onDragOver={handleDragOver(idx)}
                onDrop={handleDrop(idx)}
                onDragEnd={handleDragEnd}
                className="flex items-center gap-3 px-4 py-3 transition-colors"
                style={{
                  background: dragIdx === idx
                    ? 'rgba(0,212,255,0.07)'
                    : undefined,
                  opacity: dragIdx === idx ? 0.4 : 1,
                  cursor: 'grab',
                  borderLeft: idx === 0 ? '3px solid var(--lunar-cyan)' : '3px solid transparent',
                }}
                aria-label={`${idx + 1}. ${country.name} — drag to reorder`}
              >
                {/* Rank */}
                <span
                  className="w-5 h-5 flex items-center justify-center rounded-full text-xs font-mono font-bold flex-shrink-0"
                  style={{
                    background: idx === 0 ? 'rgba(0,212,255,0.15)' : 'var(--lunar-elevated)',
                    color: idx === 0 ? 'var(--lunar-cyan)' : 'var(--lunar-text-muted)',
                    border: idx === 0 ? '1px solid rgba(0,212,255,0.3)' : '1px solid var(--lunar-border-subtle)',
                  }}
                >
                  {idx + 1}
                </span>

                {/* Flag */}
                <FlagIcon iso2={country.iso2} size={24} className="flex-shrink-0" />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate" style={{ color: 'var(--lunar-text-primary)' }}>
                      {country.name}
                    </span>
                    <span
                      className="text-xs font-mono px-1 rounded flex-shrink-0"
                      style={{ background: 'rgba(0,212,255,0.1)', color: 'var(--lunar-cyan)' }}
                    >
                      {country.score}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs" style={{ color: 'var(--lunar-text-muted)' }}>
                    <span>Wave: {country.wave}</span>
                    <span>·</span>
                    <span style={{ color: 'var(--lunar-green)' }}>€{country.revM[2030]}M by 2030</span>
                  </div>
                </div>

                {/* Drag handle */}
                <span
                  className="text-xs flex-shrink-0 select-none"
                  style={{ color: 'var(--lunar-text-muted)' }}
                  aria-hidden="true"
                >
                  ⠿
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* RIGHT PANEL — live scenario output */}
        <div className="space-y-4">
          {/* Scenario name */}
          <div className="lunar-card">
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold flex-shrink-0" style={{ color: 'var(--lunar-text-muted)' }}>
                Scenario name
              </label>
              <input
                type="text"
                value={scenarioLabel}
                onChange={(e) => setScenarioLabel(e.target.value)}
                className="flex-1 px-2 py-1 rounded text-sm"
                style={{
                  background: 'var(--lunar-elevated)',
                  border: '1px solid var(--lunar-border-subtle)',
                  color: 'var(--lunar-text-primary)',
                  outline: 'none',
                }}
                placeholder="Custom Sequence"
              />
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="lunar-card">
              <div className="stat-label mb-1">First market risk</div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--lunar-amber)' }}>
                ⚠ {firstMarketRisk}
              </p>
              <div className="text-xs mt-2 flex items-center gap-1" style={{ color: 'var(--lunar-text-muted)' }}>
                {countries[0] && <FlagIcon iso2={countries[0].iso2} size={16} />}
                {countries[0]?.name} — #{1} in sequence
              </div>
            </div>
            <div className="lunar-card">
              <div className="stat-label mb-1">Time to €50M ARR (est.)</div>
              <div className="text-2xl font-mono font-bold" style={{ color: timeToTarget === '>2030' ? 'var(--lunar-red)' : 'var(--lunar-green)' }}>
                {timeToTarget}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--lunar-text-muted)' }}>
                Based on current sequence order
              </div>
              <EvidenceBadge type="MODEL" className="mt-1" formula="Sum of annual revenue by country across sequence" />
            </div>
          </div>

          {/* Revenue chart */}
          <div className="lunar-card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold" style={{ color: 'var(--lunar-text-primary)' }}>
                Cumulative Revenue by Year
              </h2>
              <EvidenceBadge type="ASSUMPTION" reasoning="Revenue based on hardcoded per-country base case estimates" />
            </div>
            <ReactECharts option={chartOption} style={{ height: 200 }} />
            <div className="grid grid-cols-4 gap-2 mt-3">
              {YEARS.map(yr => (
                <div key={yr} className="text-center">
                  <div className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>{yr}</div>
                  <div className="text-sm font-mono font-bold" style={{ color: 'var(--lunar-cyan)' }}>
                    €{cumRev[yr]}M
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current sequence summary */}
          <div className="lunar-card">
            <div className="stat-label mb-2">Current Sequence</div>
            <div className="flex flex-wrap gap-1.5">
              {countries.map((c, idx) => (
                <span
                  key={c.iso2}
                  className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
                  style={{
                    background: idx === 0 ? 'rgba(0,212,255,0.12)' : 'var(--lunar-elevated)',
                    color: idx === 0 ? 'var(--lunar-cyan)' : 'var(--lunar-text-muted)',
                    border: idx === 0 ? '1px solid rgba(0,212,255,0.25)' : '1px solid var(--lunar-border-subtle)',
                  }}
                >
                  <span>{idx + 1}.</span>
                  <FlagIcon iso2={c.iso2} size={16} />
                  <span>{c.iso2}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex items-center justify-between gap-4 p-4 rounded-xl"
        style={{
          background: 'var(--lunar-surface)',
          border: '1px solid var(--lunar-border-subtle)',
        }}
      >
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors"
          style={{
            background: 'var(--lunar-elevated)',
            color: 'var(--lunar-text-secondary)',
            border: '1px solid var(--lunar-border-subtle)',
          }}
        >
          <RotateCcw size={14} />
          Reset to recommended
        </button>

        <button
          onClick={handleSaveToLog}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            background: 'rgba(0,212,255,0.12)',
            color: 'var(--lunar-cyan)',
            border: '1px solid rgba(0,212,255,0.25)',
          }}
        >
          <Save size={14} />
          Save to Decision Log
        </button>
      </div>
    </div>
  );
}

export default function EntrySequencePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64" style={{ color: 'var(--lunar-text-muted)' }}>
        Loading sequence simulator…
      </div>
    }>
      <SequencePageInner />
    </Suspense>
  );
}
