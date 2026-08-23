'use client';

interface CompanyLogoProps {
  domain: string;   // e.g. "hsbc.com", "sap.com"
  name: string;     // company name for alt text + fallback initials
  size?: number;    // display size in px, default 32
  className?: string;
}

export function CompanyLogo({ domain, name, size = 32, className }: CompanyLogoProps) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  return (
    <div
      style={{ width: size, height: size, flexShrink: 0 }}
      className={`relative rounded-md overflow-hidden ${className ?? ''}`}
    >
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        alt={name}
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: 'contain', background: '#1a2235', padding: 3, borderRadius: 6 }}
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          const sibling = target.nextElementSibling as HTMLElement;
          if (sibling) sibling.style.display = 'flex';
        }}
      />
      <div
        style={{
          display: 'none',
          width: size,
          height: size,
          background: 'var(--lunar-elevated)',
          border: '1px solid var(--lunar-border-subtle)',
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.3,
          fontWeight: 700,
          color: 'var(--lunar-text-muted)',
        }}
      >
        {initials}
      </div>
    </div>
  );
}
