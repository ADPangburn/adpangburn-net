import { test, expect } from '@playwright/test';

test('home page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('aaron pangburn');

  // body bg is the warm near-black token
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(10, 10, 10)');

  // prompt bar targeted by data-testid (robust to internal span composition)
  const promptBar = page.getByTestId('prompt-bar');
  await expect(promptBar).toBeVisible();
  await expect(promptBar).toContainText(/aaron@pangburn:~/);

  // cursor-blink class exists and has the correct animation duration
  const cursor = page.locator('.cursor-blink').first();
  await expect(cursor).toBeVisible();
  await expect(cursor).toHaveCSS('animation-duration', '1.05s');

  // hero section present
  await expect(page.getByTestId('hero-section')).toBeVisible();

  // footer present
  const footer = page.getByTestId('footer');
  await expect(footer).toBeVisible();
  await expect(footer).toContainText('aaron pangburn');
  await expect(footer).toContainText('2026');

  // favicon link in head
  const faviconSvgLink = page.locator('link[rel="icon"][href="/favicon.svg"]');
  await expect(faviconSvgLink).toHaveCount(1);
  const faviconResp = await page.request.get('/favicon.svg');
  expect(faviconResp.status()).toBe(200);

  // OG description set (image deferred)
  const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
  expect(ogDesc).toMatch(/HITL multi-agent/);

  await page.screenshot({ path: 'tests/screenshots/home.png', fullPage: true });
});

test('404 page', async ({ page }) => {
  // Static export emits 404.html at root; navigate directly for deterministic test
  await page.goto('/404.html');
  await expect(page.getByText(/command not found/i)).toBeVisible();
  await page.screenshot({ path: 'tests/screenshots/404.png', fullPage: true });
});

test('post list — mobile layout (375px)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  // Use exact post slug to avoid matching the nav "notes" link
  const postItem = page.locator('a[href="/notes/lorem-ipsum/"]');
  // At mobile, outer link is display:block (not grid)
  await expect(postItem).toHaveCSS('display', 'block');
});

test('post list — desktop grid (1280px)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  // Use exact post slug to avoid matching the nav "notes" link
  const postItem = page.locator('a[href="/notes/lorem-ipsum/"]');
  // At desktop, outer link is display:grid
  await expect(postItem).toHaveCSS('display', 'grid');
});

test('home page — hero prompt hidden on mobile (375px)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const heroPrompt = page.getByTestId('hero-prompt');
  await expect(heroPrompt).toHaveCSS('display', 'none');
  // Header prompt still visible
  await expect(page.locator('header')).toBeVisible();
});

test('home page — hero prompt visible on desktop (1280px)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  const heroPrompt = page.getByTestId('hero-prompt');
  await expect(heroPrompt).not.toHaveCSS('display', 'none');
});
