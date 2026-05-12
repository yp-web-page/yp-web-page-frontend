import { test, expect } from '@playwright/test';

const PAGES: Array<{ name: string; path: string }> = [
  { name: 'home', path: '/' },
  { name: 'inventories', path: '/inventarios' },
  { name: 'who-are', path: '/quienes-somos' },
  { name: 'contact', path: '/contactanos' },
];

for (const page of PAGES) {
  test(`screenshot ${page.name}`, async ({ page: p }, testInfo) => {
    await p.goto(page.path, { waitUntil: 'networkidle' }).catch(() => p.goto(page.path));
    await p.waitForTimeout(800);
    await expect(p).toHaveScreenshot(`${page.name}-${testInfo.project.name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 1,
    });
  });
}
