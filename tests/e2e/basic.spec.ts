import { test, expect } from '@playwright/test';

test.describe('Pizza App E2E', () => {
  test('should load the home page and have correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/PIZZA/);
  });

  test('should display sender name in title when "from" is in search params', async ({ page }) => {
    const sender = 'John';
    await page.goto(`/?from=${sender}`);
    
    // The title logic in page.tsx is: `${sender.charAt(0).toUpperCase() + sender.slice(1).toLowerCase()} sent you a message`
    const expectedTitle = 'John sent you a message';
    await expect(page).toHaveTitle(expectedTitle);
  });

  test('should render the pizza app container', async ({ page }) => {
    await page.goto('/');
    // Check if the main container is rendered
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });
});
