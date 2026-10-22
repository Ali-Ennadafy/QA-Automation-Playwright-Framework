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

        // Fill Billing Address
        await checkoutPage.fillBillingAddress();

        // Continue from Billing Address
        await checkoutPage.continueFromBillingAddress();
        
        await page.waitForTimeout(1000);

        console.log('URL after Continue:', page.url());

        console.log(
            'Validation errors:',
            await page.locator('.field-validation-error, .validation-summary-errors')
                .allTextContents()
        );

        console.log(
            'Visible checkout step:',
            await page.locator('.step-title, .section-title')
                .allTextContents()
        );

        // Inspect the next checkout step
        await page.waitForTimeout(1500);

        console.log('Current URL:', page.url());

        console.log(
            'Page title:',
            await page.title().catch(() => 'Page closed')
        );

        console.log(
            'Ground visible:',
            await page.getByLabel(/Ground/).isVisible().catch(() => false)
        );

        console.log(
            'Continue buttons:',
            await page.getByRole('button', {
                name: 'Continue',
                exact: true
            }).count().catch(() => 0)
        );

    });
});
