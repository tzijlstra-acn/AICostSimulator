import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppShell } from "@/components/layout/AppShell";
import { LocaleBadgeLabelsProvider } from "@/components/layout/LocaleBadgeLabelsProvider";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import enMessages from "../../../messages/en.json";
import zhMessages from "../../../messages/zh-CN.json";

const MESSAGES: Record<string, object> = { en: enMessages, "zh-CN": zhMessages };

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  preload: false,
});

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh-CN' }];
}

export const metadata: Metadata = {
  title: "Moonshot AI · Kimi Europe Expansion OS",
  description:
    "Strategic operating system for Kimi's European market expansion. Includes market sizing, country analysis, competitive positioning, regulatory compliance, and financial modelling.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "zh-CN")) {
    notFound();
  }

  // Set locale from path so next-intl doesn't need to read headers (required for static export)
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={MESSAGES[locale] ?? enMessages}>
      <LocaleBadgeLabelsProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <div className={`${inter.variable} ${notoSansSC.variable}`} lang={locale}>
            <a href="#main-content" className="skip-nav">
              Skip to main content
            </a>
            <AppShell>{children}</AppShell>
          </div>
        </ThemeProvider>
      </LocaleBadgeLabelsProvider>
    </NextIntlClientProvider>
  );
}
