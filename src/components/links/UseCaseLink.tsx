'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export function UseCaseLink({
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
      href={`/${locale}/use-cases?selected=${id}`}
      className={`text-cyan-400 hover:text-cyan-300 underline-offset-2 hover:underline transition-colors ${className ?? ''}`}
    >
      {children}
    </Link>
  );
}
