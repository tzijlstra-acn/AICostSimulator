import { SLUG_TO_ISO2 } from '@/data/countries';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import CountryProfileClient from './CountryProfileClient';

export const dynamic = 'force-static';

export function generateStaticParams() {
  const slugs = Object.keys(SLUG_TO_ISO2);
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export default async function CountryProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CountryProfileClient />;
}
