/**
 * Locale-aware navigation utilities built on next-intl.
 * Import Link, useRouter, usePathname from here — NOT from next/navigation or next/link —
 * so that locale prefixes are handled automatically.
 */
import { createNavigation } from 'next-intl/navigation';
import { routing } from '@/i18n/routing';

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
