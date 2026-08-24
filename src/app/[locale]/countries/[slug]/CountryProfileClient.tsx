'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

const SCORE_BREAKDOWN: Record<string, [number, number, number, number]> = {
  GB: [22, 21, 18, 23],
  DE: [21, 20, 18, 24],
  NL: [19, 20, 20, 20],
  FR: [20, 18, 17, 23],
  CH: [18, 20, 19, 19],
  SE: [17, 20, 20, 18],
  DK: [17, 19, 21, 18],
  FI: [16, 20, 21, 18],
  NO: [16, 19, 21, 19],
  ES: [19, 17, 18, 16],
  IT: [18, 16, 17, 17],
  PL: [16, 17, 18, 16],
};
import { useParams, notFound } from 'next/navigation';
import { Link } from '@/lib/navigation';
import dynamic from 'next/dynamic';
import {
  SLUG_TO_ISO2,
  ISO2_TO_SLUG,
  COUNTRY_NAMES,
  COUNTRY_DETAIL,
  PHASE_COLORS,
  PHASE_LABELS,
  COUNTRIES,
  COUNTRY_ID_TO_ISO2,
} from '@/data/countries';
import { USE_CASES } from '@/data/usecases';
import { TARGET_COMPANIES } from '@/data/targetCompanies';
import { EvidenceBadge } from '@/components/EvidenceBadge';
import { FlagIcon } from '@/components/ui/FlagIcon';
import { CompanyLogo } from '@/components/ui/CompanyLogo';
import { UseCaseLink } from '@/components/links/UseCaseLink';
import { ChevronLeft, ChevronRight, ArrowLeft, Map } from 'lucide-react';

const EuropeDecisionMap = dynamic(
  () => import('@/components/maps/EuropeDecisionMap').then(m => ({ default: m.EuropeDecisionMap })),
  { ssr: false }
);

const TABS = [
  { id: 'executive', label: 'Executive Summary' },
  { id: 'market', label: 'Market & Industries' },
  { id: 'usecases', label: 'Use Cases' },
  { id: 'commercial', label: 'Product & Commercial' },
  { id: 'regulation', label: 'Regulation & Trust' },
  { id: 'economics', label: 'Economics' },
  { id: 'roadmap', label: 'Roadmap & Team' },
  { id: 'evidence', label: 'Evidence & Sources' },
] as const;

type TabId = typeof TABS[number]['id'];

// Ordered list of slugs for prev/next navigation
const SLUG_ORDER = [
  'united-kingdom', 'germany', 'netherlands', 'france', 'switzerland',
  'sweden', 'spain', 'italy', 'poland',
];

export default function CountryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<TabId>('executive');
  const [scoreExpanded, setScoreExpanded] = useState(false);

  const iso2 = SLUG_TO_ISO2[slug];
  if (!iso2) {
    notFound();
    return null;
  }

  const detail = COUNTRY_DETAIL[iso2];
  const names = COUNTRY_NAMES[iso2];

  if (!detail || !names) {
    notFound();
    return null;
  }

  const phaseColor = PHASE_COLORS[detail.wave as keyof typeof PHASE_COLORS] ?? '#4a5a7a';
  const phaseLabel = PHASE_LABELS[detail.wave as keyof typeof PHASE_LABELS] ?? detail.wave;

  // Prev/Next navigation
  const currentIndex = SLUG_ORDER.indexOf(slug);
  const prevSlug = currentIndex > 0 ? SLUG_ORDER[currentIndex - 1] : null;
  const nextSlug = currentIndex < SLUG_ORDER.length - 1 ? SLUG_ORDER[currentIndex + 1] : null;
  const prevISO2 = prevSlug ? SLUG_TO_ISO2[prevSlug] : null;
  const nextISO2 = nextSlug ? SLUG_TO_ISO2[nextSlug] : null;
  const prevNames = prevISO2 ? COUNTRY_NAMES[prevISO2] : null;
  const nextNames = nextISO2 ? COUNTRY_NAMES[nextISO2] : null;

  // Use cases for this country
  const relevantUseCases = USE_CASES.filter(uc => detail.useCaseIds.includes(uc.id));

  // Country data from COUNTRIES array (for additional fields)
  const countryData = COUNTRIES.find(c => COUNTRY_ID_TO_ISO2[c.id] === iso2);

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs" style={{ color: 'var(--lunar-text-muted)' }} aria-label="Breadcrumb">
        <Link href={`/countries`} className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
          <Map size={12} />
          Country Navigator
        </Link>
        <ChevronRight size={12} />
        <span style={{ color: 'var(--lunar-text-primary)' }}>{names.en}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-2">
            <FlagIcon iso2={iso2} size={56} />
          </div>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--lunar-text-primary)' }}>
              {names.en}
            </h1>
            <div className="text-sm" style={{ color: 'var(--lunar-text-muted)' }}>{names.local}</div>
            <div className="flex items-center gap-2 mt-2">
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: `${phaseColor}18`, color: phaseColor }}
              >
                {phaseLabel}
              </span>
              <EvidenceBadge type="RECOMMENDATION" reasoning="Country score based on analyst assessment of market size, AI readiness, regulatory complexity, and Kimi product fit" />
              <span
                className="text-xl font-mono font-bold"
                style={{ color: 'var(--lunar-cyan)' }}
              >
                {detail.score}/100
              </span>
            </div>
          </div>
        </div>

        {/* Prev/Next navigation */}
        <div className="flex items-center gap-2">
          {prevSlug && prevNames && (
            <Link
              href={`/countries/${prevSlug}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs"
              style={{ background: 'var(--lunar-elevated)', color: 'var(--lunar-text-muted)', border: '1px solid var(--lunar-border-subtle)' }}
            >
              <ChevronLeft size={12} />
              {prevISO2 && <FlagIcon iso2={prevISO2} size={18} className="inline-block" />} {prevNames.en}
            </Link>
          )}
          {nextSlug && nextNames && (
            <Link
              href={`/countries/${nextSlug}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs"
              style={{ background: 'var(--lunar-elevated)', color: 'var(--lunar-text-muted)', border: '1px solid var(--lunar-border-subtle)' }}
            >
              {nextISO2 && <FlagIcon iso2={nextISO2} size={18} className="inline-block" />} {nextNames.en}
              <ChevronRight size={12} />
            </Link>
          )}
          <Link
            href={`/countries`}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs"
            style={{ background: 'rgba(0,212,255,0.1)', color: 'var(--lunar-cyan)', border: '1px solid rgba(0,212,255,0.2)' }}
          >
            <ArrowLeft size={12} />
            Back to map
          </Link>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 overflow-x-auto pb-1" role="tablist">
        {TABS.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
            style={{
              background: activeTab === tab.id ? 'rgba(0,212,255,0.1)' : 'var(--lunar-elevated)',
              color: activeTab === tab.id ? 'var(--lunar-cyan)' : 'var(--lunar-text-muted)',
              border: activeTab === tab.id ? '1px solid rgba(0,212,255,0.2)' : '1px solid var(--lunar-border-subtle)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div role="tabpanel">
        {activeTab === 'executive' && (
          <div className="space-y-5">

            {/* Full-width map */}
            <div className="lunar-card p-0 overflow-hidden">
              <EuropeDecisionMap
                layer="priority"
                selectedCountry={iso2}
                focusCountry={iso2}
                height={340}
                showControls={false}
                compact={false}
              />
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="lunar-card text-center">
                <div className="stat-label mb-1">Attractiveness score</div>
                <div className="text-3xl font-mono font-bold" style={{ color: 'var(--lunar-cyan)' }}>{detail.score}<span className="text-base font-normal" style={{ color: 'var(--lunar-text-muted)' }}>/100</span></div>
                <button
                  onClick={() => setScoreExpanded(!scoreExpanded)}
                  className="text-xs mt-1 transition-colors"
                  style={{ color: 'var(--lunar-cyan)' }}
                  aria-expanded={scoreExpanded}
                >
                  {scoreExpanded ? 'Hide breakdown ↑' : 'Explain →'}
                </button>
              </div>
              <div className="lunar-card text-center">
                <div className="stat-label mb-1">Launch wave</div>
                <div className="text-sm font-semibold px-2 py-1 rounded-full inline-block mt-1" style={{ background: `${phaseColor}18`, color: phaseColor }}>{phaseLabel}</div>
              </div>
              <div className="lunar-card text-center">
                <div className="stat-label mb-1">Regulatory</div>
                <div className="text-sm font-semibold px-2 py-1 rounded-full inline-block mt-1 capitalize"
                  style={{
                    background: detail.regulatoryComplexity === 'high' ? 'rgba(239,68,68,0.15)' : detail.regulatoryComplexity === 'medium' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
                    color: detail.regulatoryComplexity === 'high' ? 'var(--lunar-red)' : detail.regulatoryComplexity === 'medium' ? 'var(--lunar-amber)' : 'var(--lunar-green)',
                  }}
                >{detail.regulatoryComplexity} complexity</div>
              </div>
              <div className="lunar-card text-center">
                <div className="stat-label mb-1">Base revenue 2030</div>
                <div className="text-3xl font-mono font-bold" style={{ color: 'var(--lunar-green)' }}>€{detail.revenuePotentialM.base}M</div>
                <EvidenceBadge type="ASSUMPTION" className="mt-1" />
              </div>
            </div>

            {/* Score breakdown (collapsible) */}
            <div
              className="overflow-hidden transition-all duration-200"
              style={{ maxHeight: scoreExpanded ? '200px' : '0px', opacity: scoreExpanded ? 1 : 0 }}
            >
              <div className="lunar-card space-y-1.5">
                <div className="flex items-center gap-1 mb-2">
                  <EvidenceBadge type="ASSUMPTION" />
                  <span className="text-xs font-semibold" style={{ color: 'var(--lunar-text-muted)' }}>Score breakdown</span>
                </div>
                {SCORE_BREAKDOWN[iso2] ? (
                  <>
                    {[
                      { label: 'Market Size & TAM fit', value: SCORE_BREAKDOWN[iso2][0], max: 25 },
                      { label: 'AI Readiness & Developer Ecosystem', value: SCORE_BREAKDOWN[iso2][1], max: 25 },
                      { label: 'Regulatory Environment (inverted)', value: SCORE_BREAKDOWN[iso2][2], max: 25 },
                      { label: 'Kimi Product-Market Fit', value: SCORE_BREAKDOWN[iso2][3], max: 25 },
                    ].map(d => (
                      <div key={d.label} className="flex items-center justify-between text-xs">
                        <span style={{ color: 'var(--lunar-text-secondary)' }}>• {d.label}</span>
                        <span className="font-mono font-bold ml-2 flex-shrink-0" style={{ color: 'var(--lunar-cyan)' }}>{d.value}/{d.max}</span>
                      </div>
                    ))}
                    <div className="pt-1.5 mt-1 text-xs" style={{ borderTop: '1px solid var(--lunar-border-subtle)', color: 'var(--lunar-text-muted)' }}>
                      Source: Internal scoring model (IDC S1, AI Index S3, EU AI Act S6)
                    </div>
                  </>
                ) : (
                  <div className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>Breakdown not available for this country</div>
                )}
              </div>
            </div>

            {/* Strategic verdict */}
            <div className="lunar-card" style={{ borderLeft: `3px solid ${phaseColor}` }}>
              <div className="flex items-center gap-2 mb-2">
                <EvidenceBadge type="RECOMMENDATION" />
                <span className="text-xs font-semibold" style={{ color: 'var(--lunar-text-muted)' }}>STRATEGIC VERDICT</span>
              </div>
              <blockquote className="text-lg font-semibold italic" style={{ color: 'var(--lunar-text-primary)' }}>
                &ldquo;{detail.headline}&rdquo;
              </blockquote>
            </div>

            {/* Why now / Right to win / Blocker */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="lunar-card">
                <div className="stat-label mb-2">Why now</div>
                <p className="text-xs" style={{ color: 'var(--lunar-text-secondary)' }}>{detail.whyNow}</p>
              </div>
              <div className="lunar-card">
                <div className="stat-label mb-2">Right to win</div>
                <p className="text-xs" style={{ color: 'var(--lunar-text-secondary)' }}>{detail.rightToWin}</p>
              </div>
              <div className="lunar-card" style={{ borderLeft: '3px solid var(--lunar-amber)' }}>
                <div className="stat-label mb-2" style={{ color: 'var(--lunar-amber)' }}>Main blocker</div>
                <p className="text-xs" style={{ color: 'var(--lunar-amber)' }}>{detail.mainBlocker}</p>
              </div>
            </div>

            {/* Revenue scenarios */}
            <div className="lunar-card">
              <div className="stat-label mb-3">Revenue Potential by 2030</div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Conservative', value: detail.revenuePotentialM.conservative, color: '#7a90b0' },
                  { label: 'Base', value: detail.revenuePotentialM.base, color: 'var(--lunar-cyan)' },
                  { label: 'Upside', value: detail.revenuePotentialM.upside, color: 'var(--lunar-green)' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="stat-label text-xs">{s.label}</div>
                    <div className="text-2xl font-mono font-bold" style={{ color: s.color }}>€{s.value}M</div>
                  </div>
                ))}
              </div>
              <EvidenceBadge type="ASSUMPTION" className="mt-3" reasoning="Revenue estimates are analyst planning assumptions based on market size, AI readiness, and competitive positioning" />
            </div>

            {/* Top target accounts (Tier A only) */}
            {TARGET_COMPANIES[iso2] && TARGET_COMPANIES[iso2].filter(c => c.tier === 'A').length > 0 && (
              <div className="lunar-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="stat-label">Top Target Accounts</div>
                  <button onClick={() => setActiveTab('market')} className="text-xs" style={{ color: 'var(--lunar-cyan)' }}>
                    View all + Tier B →
                  </button>
                </div>
                <div className="space-y-2">
                  {TARGET_COMPANIES[iso2].filter(c => c.tier === 'A').map(company => (
                    <div key={company.name} className="flex items-center gap-3 p-2 rounded-lg" style={{ background: 'var(--lunar-elevated)', border: '1px solid var(--lunar-border-subtle)' }}>
                      <CompanyLogo domain={company.domain} name={company.name} size={32} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold" style={{ color: 'var(--lunar-text-primary)' }}>{company.name}</span>
                          <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--lunar-surface)', color: 'var(--lunar-text-muted)', border: '1px solid var(--lunar-border-subtle)' }}>{company.sector}</span>
                        </div>
                        <p className="text-xs truncate" style={{ color: 'var(--lunar-text-secondary)' }}>{company.why}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-xs" style={{ color: 'var(--lunar-text-muted)' }}>Illustrative targets — not confirmed customers</div>
              </div>
            )}

            {/* What would change */}
            <div className="lunar-card">
              <div className="stat-label mb-2">What would change our recommendation?</div>
              <p className="text-sm" style={{ color: 'var(--lunar-text-secondary)' }}>{detail.whatWouldChange}</p>
            </div>

            {/* Compare link */}
            <Link href={`/countries/compare?countries=${iso2},DE,GB`} className="lunar-card block p-3 text-xs text-center" style={{ color: 'var(--lunar-cyan)', border: '1px solid rgba(0,212,255,0.2)' }}>
              Compare {names.en} with other markets →
            </Link>
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-4">
            <div className="lunar-card">
              <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--lunar-text-primary)' }}>
                Market & Industries — {names.en}
              </h2>
              {countryData && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {countryData.gdpBn && (
                    <div>
                      <div className="stat-label">GDP</div>
                      <div className="stat-number" style={{ color: 'var(--lunar-cyan)' }}>€{countryData.gdpBn}B</div>
                      <EvidenceBadge type="FACT" sourceId="S6" />
                    </div>
                  )}
                  {countryData.aiReadiness && (
                    <div>
                      <div className="stat-label">AI Readiness Score</div>
                      <div className="stat-number" style={{ color: 'var(--lunar-violet)' }}>{countryData.aiReadiness}/100</div>
                      <EvidenceBadge type="MODEL" />
                    </div>
                  )}
                  <div>
                    <div className="stat-label">Country Attractiveness</div>
                    <div className="stat-number" style={{ color: PHASE_COLORS[detail.wave as keyof typeof PHASE_COLORS] ?? '#4a5a7a' }}>
                      {detail.score}/100
                    </div>
                    <EvidenceBadge type="RECOMMENDATION" />
                  </div>
                </div>
              )}
              {countryData && countryData.workloads && (
                <div>
                  <div className="stat-label mb-2">Priority Workloads</div>
                  <div className="flex flex-wrap gap-2">
                    {countryData.workloads.map(w => (
                      <span
                        key={w}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background: 'var(--lunar-elevated)',
                          color: 'var(--lunar-text-secondary)',
                          border: '1px solid var(--lunar-border-subtle)',
                        }}
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {countryData?.notes && (
                <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: 'var(--lunar-elevated)', color: 'var(--lunar-text-secondary)' }}>
                  {countryData.notes}
                </div>
              )}
            </div>
            {TARGET_COMPANIES[iso2] && (
              <div className="lunar-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold" style={{ color: 'var(--lunar-text-primary)' }}>
                    Priority Target Accounts
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                    Illustrative — not confirmed customers
                  </span>
                </div>
                {/* Tier A */}
                <div className="mb-4">
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--lunar-cyan)' }}>Tier A — Top Priority</div>
                  <div className="space-y-2">
                    {TARGET_COMPANIES[iso2].filter(c => c.tier === 'A').map(company => (
                      <div
                        key={company.name}
                        className="flex items-start gap-3 p-3 rounded-lg"
                        style={{ background: 'var(--lunar-elevated)', border: '1px solid var(--lunar-border-subtle)' }}
                      >
                        <CompanyLogo domain={company.domain} name={company.name} size={36} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-semibold" style={{ color: 'var(--lunar-text-primary)' }}>{company.name}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--lunar-elevated)', color: 'var(--lunar-text-muted)', border: '1px solid var(--lunar-border-subtle)' }}>{company.sector}</span>
                          </div>
                          <p className="text-xs" style={{ color: 'var(--lunar-text-secondary)' }}>{company.why}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Tier B */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--lunar-text-muted)' }}>Tier B — Secondary</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {TARGET_COMPANIES[iso2].filter(c => c.tier === 'B').map(company => (
                      <div
                        key={company.name}
                        className="flex items-center gap-2 p-2 rounded-lg"
                        style={{ background: 'var(--lunar-elevated)', border: '1px solid var(--lunar-border-subtle)' }}
                      >
                        <CompanyLogo domain={company.domain} name={company.name} size={28} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold truncate" style={{ color: 'var(--lunar-text-primary)' }}>{company.name}</div>
                          <div className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>{company.sector}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'usecases' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold" style={{ color: 'var(--lunar-text-primary)' }}>
                Relevant Use Cases for {names.en}
              </h2>
              <Link href={`/use-cases`} className="text-xs" style={{ color: 'var(--lunar-cyan)' }}>
                View all use cases →
              </Link>
            </div>
            {relevantUseCases.length === 0 ? (
              <div className="lunar-card text-center py-8 text-sm" style={{ color: 'var(--lunar-text-muted)' }}>
                Use case data not available for this country yet
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relevantUseCases.map(uc => (
                  <div
                    key={uc.id}
                    className="lunar-card"
                    style={{
                      borderLeft: `3px solid ${
                        uc.tier === 'tier1' ? 'var(--lunar-green)'
                        : uc.tier === 'tier2' ? 'var(--lunar-cyan)'
                        : 'var(--lunar-amber)'
                      }`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <UseCaseLink id={uc.id} className="text-sm font-semibold">
                        {uc.title}
                      </UseCaseLink>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded ml-2 flex-shrink-0"
                        style={{
                          background: uc.tier === 'tier1' ? 'rgba(16,185,129,0.15)' : 'rgba(0,212,255,0.15)',
                          color: uc.tier === 'tier1' ? 'var(--lunar-green)' : 'var(--lunar-cyan)',
                        }}
                      >
                        {uc.tier}
                      </span>
                    </div>
                    <div className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>
                      {uc.sector} · {uc.buyer}
                    </div>
                    <div className="text-xs mt-1" style={{ color: 'var(--lunar-text-secondary)' }}>
                      Model: {uc.modelRecommendation} · Readiness: {uc.readiness}/5
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'commercial' && (
          <div className="space-y-4">
            <div className="lunar-card">
              <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--lunar-text-primary)' }}>
                Product & Commercial — {names.en}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="stat-label mb-2">Recommended Entry Mode</div>
                  <p className="text-sm" style={{ color: 'var(--lunar-text-primary)' }}>
                    {countryData?.entryMode ?? 'See executive summary'}
                  </p>
                </div>
                <div>
                  <div className="stat-label mb-2">Revenue Potential (Base 2030)</div>
                  <div className="text-2xl font-mono font-bold" style={{ color: 'var(--lunar-cyan)' }}>
                    €{detail.revenuePotentialM.base}M
                  </div>
                  <EvidenceBadge type="ASSUMPTION" />
                </div>
              </div>
              <div className="mt-4">
                <div className="stat-label mb-2">Right to Win</div>
                <p className="text-sm" style={{ color: 'var(--lunar-text-secondary)' }}>{detail.rightToWin}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'regulation' && (
          <div className="space-y-4">
            <div className="lunar-card">
              <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--lunar-text-primary)' }}>
                Regulation & Trust — {names.en}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="stat-label mb-2">Regulatory Complexity</div>
                  <span
                    className="text-sm px-3 py-1.5 rounded-full capitalize"
                    style={{
                      background: detail.regulatoryComplexity === 'high'
                        ? 'rgba(239,68,68,0.15)'
                        : detail.regulatoryComplexity === 'medium'
                        ? 'rgba(245,158,11,0.15)'
                        : 'rgba(16,185,129,0.15)',
                      color: detail.regulatoryComplexity === 'high'
                        ? 'var(--lunar-red)'
                        : detail.regulatoryComplexity === 'medium'
                        ? 'var(--lunar-amber)'
                        : 'var(--lunar-green)',
                    }}
                  >
                    {detail.regulatoryComplexity}
                  </span>
                </div>
                <div>
                  <div className="stat-label mb-2">Main Compliance Blocker</div>
                  <p className="text-sm" style={{ color: 'var(--lunar-amber)' }}>{detail.mainBlocker}</p>
                </div>
              </div>
              <div className="mt-4 p-3 rounded text-xs" style={{ background: 'var(--lunar-elevated)', color: 'var(--lunar-text-muted)', border: '1px solid var(--lunar-border-subtle)' }}>
                <strong style={{ color: 'var(--lunar-amber)' }}>Disclaimer:</strong> This content is a strategic planning assessment and does not constitute legal advice. Regulatory obligations must be validated by qualified EU counsel.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'economics' && (
          <div className="space-y-4">
            <div className="lunar-card">
              <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--lunar-text-primary)' }}>
                Economics — {names.en}
              </h2>
              <EvidenceBadge type="ASSUMPTION" reasoning="All values are editable planning assumptions" />
              <div className="grid grid-cols-3 gap-6 mt-4">
                {[
                  { label: 'Conservative', value: detail.revenuePotentialM.conservative, color: '#7a90b0' },
                  { label: 'Base Case', value: detail.revenuePotentialM.base, color: 'var(--lunar-cyan)' },
                  { label: 'Upside', value: detail.revenuePotentialM.upside, color: 'var(--lunar-green)' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="stat-label mb-1">{s.label}</div>
                    <div className="text-3xl font-mono font-bold" style={{ color: s.color }}>
                      €{s.value}M
                    </div>
                    <div className="text-xs mt-1" style={{ color: 'var(--lunar-text-muted)' }}>
                      by 2030
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-3 rounded text-xs" style={{ background: 'var(--lunar-elevated)', color: 'var(--lunar-text-muted)' }}>
                Revenue estimates assume a {phaseLabel} market entry. Adjust global scenario assumptions in the Market Sizing Lab to update these figures.
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-4">
            <div className="lunar-card">
              <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--lunar-text-primary)' }}>
                Roadmap & Team — {names.en}
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="stat-label mb-1">Planned Entry</div>
                  <span className="text-sm px-2 py-1 rounded" style={{ background: `${phaseColor}18`, color: phaseColor }}>
                    {phaseLabel}
                  </span>
                </div>
                <div>
                  <div className="stat-label mb-2">Decision trigger</div>
                  <p className="text-sm" style={{ color: 'var(--lunar-text-secondary)' }}>
                    {detail.whatWouldChange}
                  </p>
                </div>
                <div className="p-3 rounded text-xs" style={{ background: 'var(--lunar-elevated)', color: 'var(--lunar-text-muted)' }}>
                  Full roadmap sequencing is in the{' '}
                  <Link href={`/roadmap`} className="text-cyan-400 hover:underline">
                    Roadmap & Gates
                  </Link>{' '}
                  module. Team hiring plan is in{' '}
                  <Link href={`/organization`} className="text-cyan-400 hover:underline">
                    Organization
                  </Link>.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="space-y-4">
            <div className="lunar-card">
              <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--lunar-text-primary)' }}>
                Evidence & Sources — {names.en}
              </h2>
              <p className="text-sm" style={{ color: 'var(--lunar-text-secondary)' }}>
                Country assessments draw from the following source categories:
              </p>
              <ul className="mt-3 space-y-2 text-xs" style={{ color: 'var(--lunar-text-secondary)' }}>
                <li>• Eurostat enterprise ICT and AI spend data (S6)</li>
                <li>• EU AI adoption research and GPAI Observatory reports (S15)</li>
                <li>• OECD AI Policy Observatory country profiles</li>
                <li>• National AI strategy documents and government publications</li>
                <li>• Analyst assessments of enterprise procurement patterns</li>
              </ul>
              <Link
                href={`/sources`}
                className="mt-4 inline-flex items-center gap-1 text-xs"
                style={{ color: 'var(--lunar-cyan)' }}
              >
                View full source library →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
