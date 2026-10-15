const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../../pages/ProductPage');
const { CartPage } = require('../../pages/CartPage');

test.describe('Shopping Cart Quantity Tests', () => {

    test('Should update quantity and recalculate subtotal', async ({ page }) => {
        const productPage = new ProductPage(page);
        const cartPage = new CartPage(page);

        await page.goto('/build-your-own-computer', {
            waitUntil: 'domcontentloaded'
        });

        await productPage.selectDropdownOption(
            2,
            '2.5 GHz Intel Pentium Dual-Core E2200 [+$15.00]'
        );

        await productPage.selectDropdownOption(3, '8GB [+$60.00]');
        await productPage.selectDropdownOption(1, '320GB');

        await productPage.checkOption('Vista Premium [+$60.00]');
        await productPage.checkOption('Microsoft Office [+$50.00]');

        await productPage.setQuantity('1');
        await productPage.clickAddToCart();

        await page.waitForTimeout(2000);
        console.log(await productPage.successNotification.innerText());

        await expect(productPage.successNotification).toContainText(
            'The product has been added to your'
        );

        await productPage.openShoppingCart();

        await expect(cartPage.productName).toBeVisible();

        await cartPage.updateQuantity(2);

        await expect(cartPage.quantityInput).toHaveValue('2');
        await expect(cartPage.subtotal).toContainText('$570.00');
    });

});