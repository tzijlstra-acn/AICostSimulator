'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

const ISO2_TO_SLUG: Record<string, string> = {
  DE: 'germany',
  GB: 'united-kingdom',
  NL: 'netherlands',
  FR: 'france',
  CH: 'switzerland',
  SE: 'sweden',
  DK: 'denmark',
  FI: 'finland',
  NO: 'norway',
  ES: 'spain',
  IT: 'italy',
  PL: 'poland',
  AT: 'austria',
  BE: 'belgium',
  IE: 'ireland',
};

export function CountryLink({
  iso2,
  children,
  className,
}: {
  iso2: string;
  children: React.ReactNode;
  className?: string;
}) {
  const locale = useLocale();
  const slug = ISO2_TO_SLUG[iso2];
  if (!slug) return <span className={className}>{children}</span>;
  return (
    <Link
      href={`/${locale}/countries/${slug}`}
      className={`text-cyan-400 hover:text-cyan-300 underline-offset-2 hover:underline transition-colors ${className ?? ''}`}
    >
      {children}
    </Link>
  );
}
