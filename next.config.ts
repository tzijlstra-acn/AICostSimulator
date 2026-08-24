import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isCI = Boolean(process.env.GITHUB_ACTIONS);

const basePath = isCI ? '/TZijlstra' : '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default withNextIntl(nextConfig);
