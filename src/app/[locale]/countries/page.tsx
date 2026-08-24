'use client';

import { useState, useCallback, Suspense } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { COUNTRIES, PHASE_COLORS, PHASE_LABELS, COUNTRY_NAMES, COUNTRY_DETAIL, ISO2_TO_SLUG, COUNTRY_ID_TO_ISO2 } from '@/data/countries';
import { EvidenceBadge } from '@/components/EvidenceBadge';
import { FlagIcon } from '@/components/ui/FlagIcon';
import dynamic from 'next/dynamic';
import { Link } from '@/lib/navigation';
import { ChevronRight, ExternalLink, Plus, Shuffle } from 'lucide-react';

const EuropeDecisionMap = dynamic(
  () => import('@/components/maps/EuropeDecisionMap').then(m => ({ default: m.EuropeDecisionMap })),
  { ssr: false }
);

const PRIORITY_ISO2_ORDER = ['GB', 'DE', 'NL', 'FR', 'CH', 'SE', 'ES', 'IT', 'PL'];

function getISO2FromCountryId(id: string): string {
  return COUNTRY_ID_TO_ISO2[id] ?? id.toUpperCase();
}

function CountriesPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('countries');
  const tMapLayers = useTranslations('mapLayers');

  const rawCountryParam = searchParams.get('country');
  const [selectedISO2, setSelectedISO2] = useState<string | null>(
    rawCountryParam ? getISO2FromCountryId(rawCountryParam) : null
  );
  const [activeLayer, setActiveLayer] = useState<'priority' | 'score' | 'wave' | 'regulation'>(
    (searchParams.get('layer') as 'priority' | 'score' | 'wave' | 'regulation') ?? 'priority'
  );
  const [waveFilter, setWaveFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'phase' | 'name'>('score');

  const updateURL = useCallback((iso2: string | null, layer?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (iso2) params.set('country', iso2);
    else params.delete('country');
    if (layer) params.set('layer', layer);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const handleCountrySelect = (iso2: string) => {
    const next = selectedISO2 === iso2 ? null : iso2;
    setSelectedISO2(next);
    updateURL(next);
  };

  const handleLayerChange = (layer: 'priority' | 'score' | 'wave' | 'regulation') => {
    setActiveLayer(layer);
    updateURL(selectedISO2, layer);
  };

  // Sorted countries for table
  const sorted = [...COUNTRIES].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'phase') return a.launchPhase.localeCompare(b.launchPhase);
    return a.name.localeCompare(b.name);
  });

  const filteredSorted = waveFilter === 'all'
    ? sorted
    : sorted.filter(c => c.launchPhase === waveFilter);

  const selectedDetail = selectedISO2 ? COUNTRY_DETAIL[selectedISO2] : null;
  const selectedNames = selectedISO2 ? COUNTRY_NAMES[selectedISO2] : null;

  // Top 3 when nothing selected
  const top3 = COUNTRIES.slice(0, 3);

  return (
    <div className="flex flex-col h-full space-y-4 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--lunar-text-primary)' }}>
            {t('title')}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--lunar-text-secondary)' }}>
            {t('subtitle')}
          </p>
        </div>
        <EvidenceBadge
          type="RECOMMENDATION"
          reasoning="Country scoring based on market size, regulatory environment, AI readiness, and Kimi product fit"
        />
      </div>

      {/* Strategic View Callout */}
      <div className="p-5 rounded-xl" style={{ background: "rgba(0,212,255,0.03)", border: "1px solid rgba(0,212,255,0.15)", borderLeft: "4px solid var(--lunar-cyan)" }}>
        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--lunar-cyan)" }}>
          My Strategic View
        </div>
        <p className="text-sm italic mb-4" style={{ color: "var(--lunar-text-secondary)" }}>
          &ldquo;Market sequencing is the most consequential decision in any expansion — getting it wrong burns 12 months and credibility. I would start where regulatory friction is lowest and developer density is highest, then use that proof to enter the more complex, higher-value markets.&rdquo;
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-1">
            <div className="text-xs font-semibold" style={{ color: "var(--lunar-cyan)" }}>UK first, then Netherlands</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>GB scores 85/100 — Wave 1 entry (2027 H1). Netherlands is the EU compliance showcase: English-language business culture, strong fintech and pharma base, GDPR-native infrastructure.</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold" style={{ color: "#a855f7" }}>Germany is the prize, not the beachhead</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>At €45M revenue potential, Germany is the largest market — but the highest regulatory complexity. Enter third, backed by two reference customers from UK and NL.</p>
          </div>
          <div className="space-y-1">
            <div className="text-xs font-semibold" style={{ color: "var(--lunar-amber)" }}>Nordics move in a cluster</div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--lunar-text-secondary)" }}>Sweden, Denmark, Finland and Norway share procurement culture and AI governance posture. One partnership with a Nordic SI unlocks all four simultaneously.</p>
          </div>
        </div>
      </div>

      {/* 3-Panel Layout */}
      <div className="grid grid-cols-[220px_1fr_280px] gap-4 min-h-[500px]">
        {/* LEFT RAIL — controls */}
        <div className="flex flex-col gap-3">
          {/* Layer selector */}
          <div className="lunar-card p-3">
            <div className="stat-label mb-2">{t('mapLayerLabel')}</div>
            <div className="flex flex-col gap-1">
              {(['priority', 'wave', 'score', 'regulation'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => handleLayerChange(l)}
                  className="text-xs px-2 py-1.5 rounded text-left capitalize"
                  style={{
                    background: activeLayer === l ? 'rgba(0,212,255,0.1)' : 'transparent',
                    color: activeLayer === l ? 'var(--lunar-cyan)' : 'var(--lunar-text-muted)',
                    border: activeLayer === l ? '1px solid rgba(0,212,255,0.2)' : '1px solid transparent',
                  }}
                  aria-pressed={activeLayer === l}
                >
                  {tMapLayers(l as 'priority' | 'wave' | 'score' | 'regulation')}
                </button>
              ))}
            </div>
          </div>

          {/* Wave filter */}
          <div className="lunar-card p-3">
            <div className="stat-label mb-2">{t('waveFilterLabel')}</div>
            <div className="flex flex-col gap-1">
              {(['all', '2027H1', '2027H2', '2028', 'later'] as const).map(w => (
                <button
                  key={w}
                  onClick={() => setWaveFilter(w)}
                  className="text-xs px-2 py-1.5 rounded text-left"
                  style={{
                    background: waveFilter === w ? 'rgba(0,212,255,0.1)' : 'transparent',
                    color: waveFilter === w ? 'var(--lunar-cyan)' : 'var(--lunar-text-muted)',
                    border: waveFilter === w ? '1px solid rgba(0,212,255,0.2)' : '1px solid transparent',
                  }}
                  aria-pressed={waveFilter === w}
                >
                  {w === 'all' ? t('allWaves') : PHASE_LABELS[w as keyof typeof PHASE_LABELS] || w}
                </button>
              ))}
            </div>
          </div>

          {/* Compare link */}
          <Link
            href={`/countries/compare?countries=${PRIORITY_ISO2_ORDER.slice(0,3).join(',')}`}
            className="lunar-card p-3 flex items-center gap-2 text-xs hover:opacity-80 transition-opacity"
            style={{ color: 'var(--lunar-cyan)', border: '1px solid rgba(0,212,255,0.2)' }}
          >
            <Plus size={12} />
            {t('compareCountries')}
          </Link>

          {/* Sequence simulator link */}
          <Link
            href={`/countries/sequence`}
            className="lunar-card p-3 flex items-center gap-2 text-xs hover:opacity-80 transition-opacity"
            style={{ color: 'var(--lunar-violet)', border: '1px solid rgba(168,85,247,0.2)' }}
          >
            <Shuffle size={12} />
            {t('sequenceSimulator')}
          </Link>
        </div>

        {/* CENTER — Map */}
        <div className="lunar-card p-0 overflow-hidden">
          <EuropeDecisionMap
            layer={activeLayer}
            selectedCountry={selectedISO2 ?? undefined}
            onCountrySelect={handleCountrySelect}
            height={520}
            showControls={false}
            compact={false}
          />
        </div>

        {/* RIGHT PANEL — country detail or top 3 */}
        <div className="flex flex-col gap-3">
          {selectedISO2 && !selectedDetail && selectedNames ? (
            /* Country selected but no full detail — minimal card */
            <div className="lunar-card flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <FlagIcon iso2={selectedISO2} size={28} />
                  <div className="font-bold mt-1" style={{ color: 'var(--lunar-text-primary)' }}>
                    {selectedNames.en}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>
                    {selectedNames.local}
                  </div>
                </div>
                <button
                  onClick={() => handleCountrySelect(selectedISO2)}
                  className="text-xs px-2 py-1 rounded hover:opacity-70"
                  style={{ color: 'var(--lunar-text-muted)', border: '1px solid var(--lunar-border-subtle)' }}
                >
                  ✕
                </button>
              </div>
              <div
                className="p-3 rounded-lg mb-4 text-xs"
                style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)' }}
              >
                <div className="font-semibold mb-1" style={{ color: 'var(--lunar-cyan)' }}>
                  {t('extendedCoverage')}
                </div>
                <div style={{ color: 'var(--lunar-text-secondary)' }}>
                  {t('extendedCoverageDesc')}
                </div>
              </div>
              <Link
                href={`/countries/compare?countries=GB,DE,NL`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
                style={{ background: 'var(--lunar-elevated)', color: 'var(--lunar-text-muted)', border: '1px solid var(--lunar-border-subtle)' }}
              >
                <Plus size={12} />
                {t('comparePriorityMarkets')}
              </Link>
            </div>
          ) : selectedDetail && selectedNames ? (
            /* Country snapshot */
            <div className="lunar-card flex-1" style={{ border: `1px solid ${PHASE_COLORS[selectedDetail.wave as keyof typeof PHASE_COLORS] ?? '#4a5a7a'}40` }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <FlagIcon iso2={selectedISO2 ?? ''} size={28} />
                  <div className="font-bold mt-1" style={{ color: 'var(--lunar-text-primary)' }}>
                    {selectedNames.en}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>
                    {selectedNames.local}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="text-3xl font-mono font-bold"
                    style={{ color: 'var(--lunar-cyan)' }}
                  >
                    {selectedDetail.score}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>/100</div>
                </div>
              </div>

              <div
                className="text-xs px-2 py-0.5 rounded-full inline-block mb-3"
                style={{
                  background: `${PHASE_COLORS[selectedDetail.wave as keyof typeof PHASE_COLORS] ?? '#4a5a7a'}18`,
                  color: PHASE_COLORS[selectedDetail.wave as keyof typeof PHASE_COLORS] ?? '#4a5a7a',
                }}
              >
                <EvidenceBadge type="RECOMMENDATION" className="inline mr-1" />
                {t('waveLabel')}: {selectedDetail.wave}
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="stat-label">{t('columns.role')}</div>
                  <div style={{ color: 'var(--lunar-text-primary)' }}>{selectedDetail.role}</div>
                </div>
                <div>
                  <div className="stat-label">{t('revenuePotentialBase')}</div>
                  <div style={{ color: 'var(--lunar-green)' }}>
                    €{selectedDetail.revenuePotentialM.base}M {t('by2030')}
                  </div>
                </div>
                <div>
                  <div className="stat-label">{t('mainBlocker')}</div>
                  <div style={{ color: 'var(--lunar-amber)' }}>{selectedDetail.mainBlocker.slice(0, 80)}...</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                {ISO2_TO_SLUG[selectedISO2!] && (
                  <Link
                    href={`/countries/${ISO2_TO_SLUG[selectedISO2!]}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
                    style={{ background: 'rgba(0,212,255,0.1)', color: 'var(--lunar-cyan)', border: '1px solid rgba(0,212,255,0.2)' }}
                  >
                    <ExternalLink size={12} />
                    {t('openFullProfile')}
                  </Link>
                )}
                <Link
                  href={`/countries/compare?countries=${selectedISO2},DE,GB`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
                  style={{ background: 'var(--lunar-elevated)', color: 'var(--lunar-text-muted)', border: '1px solid var(--lunar-border-subtle)' }}
                >
                  <Plus size={12} />
                  {t('addToComparison')}
                </Link>
              </div>
            </div>
          ) : (
            /* Top 3 when nothing selected */
            <div className="lunar-card flex-1">
              <div className="stat-label mb-3">{t('topRankedCountries')}</div>
              <div className="space-y-3">
                {top3.map((c, idx) => {
                  const iso2 = COUNTRY_ID_TO_ISO2[c.id] ?? c.id.toUpperCase();
                  const names = COUNTRY_NAMES[iso2];
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleCountrySelect(iso2)}
                      className="w-full flex items-center gap-3 p-2 rounded-lg text-left hover:bg-white/5 transition-colors"
                      style={{ border: '1px solid var(--lunar-border-subtle)' }}
                    >
                      <span className="text-xs font-mono w-4" style={{ color: 'var(--lunar-text-muted)' }}>
                        #{idx + 1}
                      </span>
                      <FlagIcon iso2={iso2} size={22} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium" style={{ color: 'var(--lunar-text-primary)' }}>
                          {names?.en ?? c.name}
                        </div>
                        <div className="text-xs truncate" style={{ color: 'var(--lunar-text-muted)' }}>
                          {c.role}
                        </div>
                      </div>
                      <span
                        className="text-xs font-mono font-bold"
                        style={{ color: PHASE_COLORS[c.launchPhase] }}
                      >
                        {c.score}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 text-xs" style={{ color: 'var(--lunar-text-muted)' }}>
                {t('clickMapHint')}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ranking table below map */}
      <div className="lunar-card p-0 overflow-hidden">
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{ borderColor: 'var(--lunar-border-subtle)' }}
        >
          <span className="text-sm font-semibold" style={{ color: 'var(--lunar-text-primary)' }}>
            {t('table.title')}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>{t('table.sortBy')}</span>
            {(['score', 'phase', 'name'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className="text-xs px-2 py-1 rounded capitalize"
                style={{
                  background: sortBy === s ? 'rgba(0,212,255,0.1)' : 'transparent',
                  color: sortBy === s ? 'var(--lunar-cyan)' : 'var(--lunar-text-muted)',
                  border: sortBy === s ? '1px solid rgba(0,212,255,0.2)' : '1px solid transparent',
                }}
                aria-pressed={sortBy === s}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table" aria-label="Country priority scoring">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--lunar-border-subtle)' }}>
                <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: 'var(--lunar-text-muted)' }}>{t('columns.country')}</th>
                <th className="text-right px-3 py-2 font-medium text-xs" style={{ color: 'var(--lunar-text-muted)' }}>{t('columns.score')}</th>
                <th className="text-left px-3 py-2 font-medium text-xs" style={{ color: 'var(--lunar-text-muted)' }}>{t('columns.role')}</th>
                <th className="text-left px-3 py-2 font-medium text-xs hidden lg:table-cell" style={{ color: 'var(--lunar-text-muted)' }}>{t('columns.entryMode')}</th>
                <th className="text-left px-3 py-2 font-medium text-xs" style={{ color: 'var(--lunar-text-muted)' }}>{t('columns.phase')}</th>
                <th className="text-center px-3 py-2 font-medium text-xs" style={{ color: 'var(--lunar-text-muted)' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredSorted.map(c => {
                const iso2 = COUNTRY_ID_TO_ISO2[c.id] ?? c.id.toUpperCase();
                const names = COUNTRY_NAMES[iso2];
                const isSelected = selectedISO2 === iso2;
                const slug = ISO2_TO_SLUG[iso2];
                return (
                  <tr
                    key={c.id}
                    className="cursor-pointer transition-colors"
                    style={{
                      borderBottom: '1px solid var(--lunar-border-subtle)',
                      background: isSelected ? 'rgba(0,212,255,0.05)' : undefined,
                    }}
                    onClick={() => handleCountrySelect(iso2)}
                    role="row"
                    aria-selected={isSelected}
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && handleCountrySelect(iso2)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FlagIcon iso2={iso2} size={22} />
                        <span style={{ color: 'var(--lunar-text-primary)' }}>{names?.en ?? c.name}</span>
                      </div>
                    </td>
                    <td className="text-right px-3 py-3">
                      <span
                        className="font-mono text-sm font-bold px-2 py-0.5 rounded"
                        style={{
                          background: `${PHASE_COLORS[c.launchPhase]}18`,
                          color: PHASE_COLORS[c.launchPhase],
                        }}
                      >
                        {c.score}
                      </span>
                    </td>
                    <td className="px-3 py-3 max-w-[160px]">
                      <span className="text-xs" style={{ color: 'var(--lunar-text-secondary)' }}>
                        {c.role}
                      </span>
                    </td>
                    <td className="px-3 py-3 hidden lg:table-cell">
                      <span className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>
                        {c.entryMode}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: `${PHASE_COLORS[c.launchPhase]}18`,
                          color: PHASE_COLORS[c.launchPhase],
                        }}
                      >
                        {PHASE_LABELS[c.launchPhase]}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      {slug ? (
                        <Link
                          href={`/countries/${slug}`}
                          onClick={e => e.stopPropagation()}
                          className="inline-flex items-center"
                          aria-label={`Open ${names?.en ?? c.name} profile`}
                        >
                          <ChevronRight
                            size={14}
                            style={{ color: isSelected ? 'var(--lunar-cyan)' : 'var(--lunar-text-muted)' }}
                          />
                        </Link>
                      ) : (
                        <ChevronRight
                          size={14}
                          style={{ color: isSelected ? 'var(--lunar-cyan)' : 'var(--lunar-text-muted)' }}
                          aria-hidden="true"
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function CountriesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64" style={{ color: 'var(--lunar-text-muted)' }}>
        Loading country navigator…
      </div>
    }>
      <CountriesPageInner />
    </Suspense>
  );
}
