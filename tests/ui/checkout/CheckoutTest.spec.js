
const { test, expect } = require('@playwright/test');

test.describe('Checkout tests', () => {
    test('Should open the product page', async ({ page }) => {
        await page.goto('/build-your-own-computer');

        await expect(
            page.getByRole('button', { name: 'Add to cart' })
        ).toBeVisible();
    });
});