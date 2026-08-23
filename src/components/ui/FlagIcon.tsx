'use client';

interface FlagIconProps {
  iso2: string;       // ISO 3166-1 alpha-2, e.g. "GB", "DE"
  size?: number;      // displayed width in px (height auto), default 24
  className?: string;
}

export function FlagIcon({ iso2, size = 24, className }: FlagIconProps) {
  const code = iso2.toLowerCase();
  // flagcdn.com width buckets: 20, 40, 80, 160, 320, 640, 1280
  const cdnW = size <= 24 ? 40 : size <= 48 ? 80 : 160;
  return (
    <img
      src={`https://flagcdn.com/w${cdnW}/${code}.png`}
      srcSet={`https://flagcdn.com/w${cdnW * 2}/${code}.png 2x`}
      width={size}
      alt={iso2}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', objectFit: 'cover', borderRadius: 2 }}
    />
  );
}
