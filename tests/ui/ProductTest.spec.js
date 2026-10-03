const { test, expect } = require('@playwright/test');

const { ProductPage } = require('../../pages/ProductPage');

test.describe('NopCommerce Data-Driven Product Tests', () => {

    const hddOptions = [
        {
            size: '320GB',
            testName: 'Should buy computer with 320GB HDD'
        },
        {
            size: '400 GB [+$100.00]',
            testName: 'Should buy computer with 400GB HDD'
        }
    ];

    for (const option of hddOptions) {

        test(option.testName, async ({ page }) => {

            test.setTimeout(120000);

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

            await productPage.selectDropdownOption(
                1,
                option.size
            );

            await productPage.checkOption(
                'Vista Premium [+$60.00]'
            );

            await productPage.checkOption(
                'Microsoft Office [+$50.00]'
            );

            await productPage.setQuantity('2');

            await productPage.clickAddToCart();
            

            await expect(productPage.shoppingCartLink).toContainText('(2)');
            await productPage.openShoppingCart();
            await expect(
                page.getByRole('link', {
                    name: 'Build Your Own Computer',
                    exact: true
                })
            ).toBeVisible();
        });
    }
});