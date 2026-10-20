
const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../../../pages/ProductPage');

test.describe('Wishlist UI Tests', () => {

    test('Should add a configured product to the wishlist', async ({ page }) => {
        
        const productPage = new ProductPage(page);

        await page.goto('/build-your-own-computer');

        
        await productPage.selectDropdownOption(
            2,
            '2.5 GHz Intel Pentium Dual-Core E2200 [+$15.00]'
        );

        await productPage.selectDropdownOption(
            3,
            '8GB [+$60.00]'
        );

        await productPage.selectDropdownOption(1, '320GB');

        // Listen for the server response before clicking.
        const wishlistRequest = page.waitForResponse(response =>
            response.url().includes('/addproducttocart/details/1/2')
        );

        await productPage.clickAddToWishlist();

        const response = await wishlistRequest;
        const result = await response.json();

        expect(response.status()).toBe(200);
        expect(result.success).toBe(true);

        await expect(
            page.locator('.ico-wishlist')
        ).toContainText('(1)');
    });
});
