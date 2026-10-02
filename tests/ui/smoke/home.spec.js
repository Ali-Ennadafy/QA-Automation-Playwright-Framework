import { test, expect } from '@playwright/test';

test('nopCommerce home page loads successfully', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Your store. Home page title');
});