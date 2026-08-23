import { test, expect } from '@playwright/test';

test('EN cockpit loads', async ({ page }) => {
  const r = await page.goto('/en');
  expect(r?.status()).toBeLessThan(400);
});

test('zh-CN cockpit contains Chinese text', async ({ page }) => {
  await page.goto('/zh-CN');
  const body = await page.content();
  expect(body).toMatch(/高管|决策|简体/);
});

test('html lang attribute updates per locale', async ({ page }) => {
  await page.goto('/en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goto('/zh-CN');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
});

test('all EN routes load', async ({ page }) => {
  for (const route of ['/en', '/en/market', '/en/countries', '/en/competition', '/en/regulation', '/en/memo', '/en/risks', '/en/sources', '/en/decisions']) {
    const r = await page.goto(route);
    expect(r?.status()).toBeLessThan(400);
  }
});

test('all zh-CN routes load', async ({ page }) => {
  for (const route of ['/zh-CN', '/zh-CN/market', '/zh-CN/countries', '/zh-CN/competition', '/zh-CN/regulation', '/zh-CN/memo', '/zh-CN/risks', '/zh-CN/sources', '/zh-CN/decisions']) {
    const r = await page.goto(route);
    expect(r?.status()).toBeLessThan(400);
  }
});

test('memo has bilingual export button', async ({ page }) => {
  await page.goto('/en/memo');
  await expect(page.getByText(/bilingual|双语/i)).toBeVisible();
});
