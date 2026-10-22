
const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../../../pages/ProductPage');
const { CartPage } = require('../../../pages/CartPage');
const { CheckoutPage } = require('../../../pages/CheckoutPage');

test.describe('Checkout tests', () => {
    test('Should add configured product to cart and proceed to checkout', async ({ page }) => {
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await page.goto('/build-your-own-computer');

        await productPage.selectDropdownOption(
            2,
            '2.5 GHz Intel Pentium Dual-Core E2200 [+$15.00]'
        );

        await productPage.selectDropdownOption(
            3,
            '8GB [+$60.00]'
        );

        await productPage.selectDropdownOption(
            1,
            '320GB'
        );

        await productPage.checkOption(
            'Vista Premium [+$60.00]'
        );

        await productPage.checkOption(
            'Microsoft Office [+$50.00]'
        );

        await productPage.clickAddToCart();

        await expect(
            page.locator('.bar-notification.success')
        ).toContainText('The product has been added to your');

        await productPage.openShoppingCart();

        await expect(page).toHaveURL(/\/cart(?:\?.*)?$/);
        await expect(cartPage.productName).toBeVisible();

        await cartPage.acceptTermsOfService();
        await cartPage.proceedToCheckout();

        // Guest checkout page
        await expect(page).toHaveURL(/\/login\/checkoutasguest/);

        await page.getByRole('button', {
            name: /Checkout as Guest/i
        }).click();

        // One-page checkout
        await expect(page).toHaveURL(/\/onepagecheckout/);

        // Step 1: Continue from Billing Address
        await checkoutPage.continueFromBillingAddress();
    });
});
