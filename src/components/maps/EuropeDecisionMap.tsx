'use client';

import { useState, useCallback } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

// Fallback ISO-2 lookup for countries whose Natural Earth ISO_A2 field is '-99'
const NAME_TO_ISO2: Record<string, string> = {
  'France': 'FR',
  'Norway': 'NO',
  'Switzerland': 'CH',
  'Kosovo': 'XK',
  'Serbia': 'RS',
  'Bosnia and Herz.': 'BA',
  'North Macedonia': 'MK',
  'Montenegro': 'ME',
};

// Country data with scores and metadata
const COUNTRY_DATA: Record<string, {
  score: number;
  role: string;
  wave: string;
  color: string;
  inScope: boolean;
}> = {
  GB: { score: 84, role: 'API & Developer Growth', wave: '2027H1', color: '#00d4ff', inScope: true },
  DE: { score: 83, role: 'EU Enterprise Anchor', wave: '2027H1', color: '#00d4ff', inScope: true },
  NL: { score: 79, role: 'EU Operating Hub', wave: '2027H1', color: '#00d4ff', inScope: true },
  FR: { score: 78, role: 'Research & Strategic', wave: '2027H2', color: '#7c3aed', inScope: true },
  CH: { score: 76, role: 'Trust-Sensitive Market', wave: '2027H2', color: '#a855f7', inScope: true },
  SE: { score: 75, role: 'Nordic Expansion', wave: '2027H2', color: '#a855f7', inScope: true },
  DK: { score: 75, role: 'Nordic Expansion', wave: '2027H2', color: '#a855f7', inScope: true },
  FI: { score: 75, role: 'Nordic Expansion', wave: '2027H2', color: '#a855f7', inScope: true },
  NO: { score: 75, role: 'Nordic Expansion', wave: '2027H2', color: '#a855f7', inScope: true },
  ES: { score: 70, role: 'Multilingual Service', wave: '2028', color: '#f59e0b', inScope: true },
  IT: { score: 68, role: 'Industrial & Design', wave: '2028', color: '#f59e0b', inScope: true },
  PL: { score: 67, role: 'Dev-Center Base', wave: '2028', color: '#f59e0b', inScope: true },
  AT: { score: 60, role: 'DACH Expansion', wave: 'later', color: '#4a5a7a', inScope: true },
  BE: { score: 62, role: 'Benelux', wave: 'later', color: '#4a5a7a', inScope: true },
  PT: { score: 58, role: 'Iberia', wave: 'later', color: '#4a5a7a', inScope: true },
  IE: { score: 65, role: 'English-Speaking EU', wave: 'later', color: '#4a5a7a', inScope: true },
  LU: { score: 55, role: 'Financial Hub', wave: 'later', color: '#4a5a7a', inScope: true },
  IS: { score: 50, role: 'Nordic Scope', wave: 'later', color: '#4a5a7a', inScope: true },
  // Additional context countries (not in scope — visible on map but not interactive)
  CZ: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  SK: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  HU: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  RO: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  BG: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  HR: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  SI: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  EE: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  LV: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  LT: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  CY: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  MT: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  GR: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  AL: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  RS: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  BA: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  ME: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  MK: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  XK: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  MD: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  UA: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
  BY: { score: 0, role: 'Context', wave: 'context', color: '#1a2438', inScope: false },
};

const WAVE_COLORS: Record<string, string> = {
  '2027H1': '#00d4ff',
  '2027H2': '#a855f7',
  '2028': '#f59e0b',
  'later': '#4a5a7a',
  'context': '#1a2438',
};

const LAYER_LABELS: Record<string, string> = {
  priority: 'Strategic Priority',
  score: 'Country Attractiveness Score',
  wave: 'Launch Wave',
  regulation: 'Regulatory Complexity',
};

interface EuropeDecisionMapProps {
  layer?: 'priority' | 'score' | 'wave' | 'regulation';
  selectedCountry?: string;
  onCountrySelect?: (iso2: string) => void;
  height?: number;
  showControls?: boolean;
  compact?: boolean;
}

export function EuropeDecisionMap({
  layer = 'priority',
  selectedCountry,
  onCountrySelect,
  height = 480,
  showControls = true,
  compact = false,
}: EuropeDecisionMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState(layer);

  const getCountryFill = useCallback((iso2: string) => {
    const data = COUNTRY_DATA[iso2];
    if (!data) return 'rgba(26,36,56,0.8)';
    if (!data.inScope) return 'rgba(26,36,56,0.8)';

    if (iso2 === selectedCountry) return '#00d4ff';
    if (iso2 === hoveredCountry) return '#1a3a4a';

    switch (activeLayer) {
      case 'wave':
        return WAVE_COLORS[data.wave] ?? WAVE_COLORS.later;
      case 'score': {
        const intensity = Math.max(0, Math.min(1, (data.score - 50) / 35));
        const g = Math.round(80 + intensity * 132);
        const b = Math.round(100 + intensity * 155);
        return `rgb(0,${g},${b})`;
      }
      case 'priority':
      default:
        return data.color;
    }
  }, [activeLayer, selectedCountry, hoveredCountry]);

  const getCountryStroke = useCallback((iso2: string) => {
    if (iso2 === selectedCountry) return '#00d4ff';
    if (iso2 === hoveredCountry) return '#00d4ff';
    return 'rgba(100,140,200,0.15)';
  }, [selectedCountry, hoveredCountry]);

  const geoUrl = '/maps/europe.geojson';
  const EXCLUDED = new Set(['MA', 'DZ', 'TN']);

  return (
    <div className="relative" style={{ height }}>
      {/* Layer controls */}
      {showControls && !compact && (
        <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-1">
          {Object.entries(LAYER_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveLayer(key as 'priority' | 'score' | 'wave' | 'regulation')}
              className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                activeLayer === key
                  ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                  : 'bg-black/30 text-slate-400 border border-white/10 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Map */}
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-13, -52, 0],
          scale: compact ? 650 : 860,
          center: [0, 0],
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup zoom={1} minZoom={0.8} maxZoom={4}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const iso2 = (geo.properties.ISO_A2 && geo.properties.ISO_A2 !== '-99')
                  ? geo.properties.ISO_A2 as string
                  : NAME_TO_ISO2[geo.properties.NAME as string] ?? (geo.properties.ISO_A2 as string);
                if (EXCLUDED.has(iso2)) return null;
                const data = COUNTRY_DATA[iso2];
                const isInScope = data?.inScope;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getCountryFill(iso2)}
                    stroke={getCountryStroke(iso2)}
                    strokeWidth={iso2 === selectedCountry ? 1.5 : 0.5}
                    style={{
                      default: { outline: 'none', cursor: isInScope ? 'pointer' : 'default' },
                      hover: { outline: 'none', cursor: isInScope ? 'pointer' : 'default' },
                      pressed: { outline: 'none' },
                    }}
                    onMouseEnter={() => isInScope && setHoveredCountry(iso2)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => isInScope && onCountrySelect?.(iso2)}
                    tabIndex={isInScope ? 0 : -1}
                    aria-label={isInScope ? `${geo.properties.NAME} — Score: ${data?.score ?? 'N/A'}` : undefined}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if ((e.key === 'Enter' || e.key === ' ') && isInScope) {
                        onCountrySelect?.(iso2);
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Hover tooltip */}
      {hoveredCountry && COUNTRY_DATA[hoveredCountry] && (
        <div
          className="absolute bottom-2 left-2 z-20 p-3 rounded-lg text-xs"
          style={{ background: '#0d1420', border: '1px solid rgba(0,212,255,0.2)', maxWidth: 240 }}
        >
          <div className="flex items-center gap-2 font-bold text-white mb-1">
            <img
              src={`/flags/${hoveredCountry.toLowerCase()}.png`}
              width={24}
              height={16}
              className="rounded-sm inline"
              alt={hoveredCountry}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            {hoveredCountry}
          </div>
          <div className="text-cyan-400">Score: {COUNTRY_DATA[hoveredCountry].score}/100</div>
          <div className="text-slate-400">{COUNTRY_DATA[hoveredCountry].role}</div>
          <div className="text-slate-500 mt-1">Wave: {COUNTRY_DATA[hoveredCountry].wave}</div>
          {onCountrySelect && (
            <div className="text-cyan-400/70 text-xs mt-1">Click to open</div>
          )}
        </div>
      )}

      {/* Legend */}
      {!compact && (
        <div
          className="absolute bottom-2 right-2 z-10 p-2 rounded-lg text-xs space-y-1"
          style={{ background: 'rgba(7,11,20,0.85)', border: '1px solid rgba(100,140,200,0.1)' }}
        >
          {activeLayer === 'wave' && Object.entries({
            '2027H1': 'Launch now (H1 2027)',
            '2027H2': 'Build evidence (H2 2027)',
            '2028': 'Next expansion (2028)',
            'later': 'Channel / watchlist',
          }).map(([wave, label]) => (
            <div key={wave} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ background: WAVE_COLORS[wave] }} />
              <span className="text-slate-400">{label}</span>
            </div>
          ))}
          {(activeLayer === 'priority' || activeLayer === 'regulation') && Object.entries({
            '#00d4ff': 'Direct launch',
            '#7c3aed': 'Partner-led',
            '#f59e0b': 'Next wave',
            '#4a5a7a': 'Watchlist',
          }).map(([color, label]) => (
            <div key={color} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ background: color }} />
              <span className="text-slate-400">{label}</span>
            </div>
          ))}
          {activeLayer === 'score' && (
            <div className="text-slate-400 text-xs">Score 50–84: blue gradient</div>
          )}
        </div>
      )}
    </div>
  );
}
