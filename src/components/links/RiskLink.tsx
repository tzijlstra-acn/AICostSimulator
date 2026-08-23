'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export function RiskLink({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}/risks?selected=${id}`}
      className={`text-amber-400 hover:text-amber-300 underline-offset-2 hover:underline transition-colors ${className ?? ''}`}
    >
      {children}
    </Link>
  );
}
