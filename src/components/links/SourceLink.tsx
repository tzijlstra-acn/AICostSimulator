'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export function SourceLink({
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
      href={`/${locale}/sources?selected=${id}`}
      className={`text-slate-400 hover:text-slate-300 underline-offset-2 hover:underline transition-colors ${className ?? ''}`}
    >
      {children}
    </Link>
  );
}
