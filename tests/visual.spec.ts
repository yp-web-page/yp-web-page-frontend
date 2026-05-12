import { test, expect } from '@playwright/test';

test('screenshot login-modal', async ({ page }, testInfo) => {
  await page.goto('/', { waitUntil: 'networkidle' }).catch(() => page.goto('/'));
  await page.waitForTimeout(500);
  // Header profile button is the only button with size-9 + rounded-full in the nav
  await page.locator('header button.size-9.rounded-full').first().click();
  await page.waitForTimeout(800);
  await expect(page).toHaveScreenshot(`login-modal-${testInfo.project.name}.png`, {
    fullPage: false,
    maxDiffPixelRatio: 1,
  });
});

const PAGES: Array<{ name: string; path: string }> = [
  { name: 'home', path: '/' },
  { name: 'inventories', path: '/inventarios' },
  { name: 'inventory-detail', path: '/inventario/1' },
  { name: 'product-view', path: '/producto/1' },
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
