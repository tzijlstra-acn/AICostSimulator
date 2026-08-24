import { NextIntlClientProvider } from "next-intl";
import enMessages from "../../messages/en.json";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Fallback provider for non-locale pages — locale layout overrides this with its own provider */}
        <NextIntlClientProvider locale="en" messages={enMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
