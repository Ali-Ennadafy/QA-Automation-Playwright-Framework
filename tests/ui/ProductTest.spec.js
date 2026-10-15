const { test, expect } = require('@playwright/test');

const { ProductPage } = require('../../pages/ProductPage');
const { CartPage } = require('../../pages/CartPage');

test.describe('NopCommerce Data-Driven Product Tests', () => {

    
        test('Should display Laptop details and add it to cart', async ({ page }) => {
            const productPage = new ProductPage(page);

            await page.goto('/qa-laptop')

            await expect(
                page.getByRole('heading', { name: 'Laptop' })
            ).toBeVisible();

            await expect(
                page.getByText('$799.00', { exact: true })
            ).toBeVisible();

            await productPage.clickAddToCart();

            await expect(productPage.successNotification).toContainText(
                'The product has been added to your'
            );
        });


    const hddOptions = [
        {
            size: '320GB',
            unitPrice: '$285.00',
            totalPrice: '$570.00',
            testName: 'Should buy computer with 320GB HDD'
        },
        {
            size: '400 GB [+$100.00]',
            unitPrice: '$385.00',
            totalPrice: '$770.00',
            testName: 'Should buy computer with 400GB HDD'
        }
    ];

    for (const option of hddOptions) {

        test(option.testName, async ({ page }) => {

            test.setTimeout(120000);

            const productPage = new ProductPage(page);
            const cartPage = new CartPage(page);

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
            await expect(productPage.successNotification).toContainText(
                'The product has been added to your'
            );

            await expect(productPage.shoppingCartLink).toContainText('(2)');
            await productPage.openShoppingCart();

            await expect(cartPage.productName).toBeVisible();

            await expect(cartPage.cartAttributes).toContainText(
                'Processor: 2.5 GHz Intel Pentium Dual-Core E2200 [+$15.00]'
            );

            await expect(cartPage.cartAttributes).toContainText(
                'RAM: 8GB [+$60.00]'
            );

            await expect(cartPage.cartAttributes).toContainText(
                'Software: Vista Premium [+$60.00]'
            );

            await expect(cartPage.cartAttributes).toContainText(
                'Software: Microsoft Office [+$50.00]'
            );

            await expect(cartPage.quantityInput).toHaveValue('2');

            await expect(cartPage.unitPrice).toHaveText(option.unitPrice);

            await expect(cartPage.subtotal).toHaveText(option.totalPrice);

            await expect(cartPage.cartAttributes).toContainText(option.size);
        });
    }
});