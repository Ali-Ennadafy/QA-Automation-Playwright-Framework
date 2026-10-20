const {test, expect} = require('@playwright/test');
const { CheckoutPage } = require('../../../pages/CheckoutPage');
const { CartPage } = require('../../../pages/CartPage');


test.describe('checkout tests', () => {

    test('Should complete checkout process', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        const cartPage = new CartPage(page);

        await page.goto('/build-your-own-computer');

        await checkoutPage.selectDropdownOption(
            2,
            '2.5 GHz Intel Pentium Dual-Core E2200 [+$15.00]'
        );

        await checkoutPagr.selectDropdownOption(
            3,
            '8GB [+$60.00]'
        );
        