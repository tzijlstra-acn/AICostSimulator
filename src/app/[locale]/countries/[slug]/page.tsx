import { SLUG_TO_ISO2 } from '@/data/countries';
import CountryProfileClient from './CountryProfileClient';

export function generateStaticParams() {
  return Object.keys(SLUG_TO_ISO2).map((slug) => ({ slug }));
}

export default function CountryProfilePage() {
  return <CountryProfileClient />;
}
