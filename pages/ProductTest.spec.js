const { test, expect } = require('@playwright/test');

const { chromium } = require('playwright-extra');
chromium.use(require('puppeteer-extra-plugin-stealth')());

const { ProductPage } = require('../pages/ProductPage');

test.describe('NopCommerce Stealth & Data-Driven Tests', () => {

    const hddOptions = [
        { size: '320 GB', testName: 'Should buy computer with 320GB HDD' },
        { size: '400 GB [+$100.00]', testName: 'Should buy computer with 400GB HDD' }
    ];

    for (const option of hddOptions) {
        
        test(option.testName, async ({ page }) => {
            test.setTimeout(120000); 

            const productPage = new ProductPage(page);

            await page.goto('https://demo.nopcommerce.com');
            await page.waitForTimeout(2000);

            await page.goto('https://demo.nopcommerce.com/build-your-own-computer');
            
            await productPage.selectDropdownOption('Processor *', '2.5 GHz Intel Pentium Dual-Core E2200 [+$15.00]');
            await productPage.selectDropdownOption('RAM *', '8GB [+$60.00]');

            await productPage.checkOption(option.size);

            await productPage.checkOption('Vista Premium [+$60.00]');
            await productPage.checkOption('Microsoft Office [+$50.00]');

            await productPage.setQuantity('2');
            await productPage.clickAddToCart();

            await expect(productPage.successNotification).toBeVisible();
        });
    }
});

