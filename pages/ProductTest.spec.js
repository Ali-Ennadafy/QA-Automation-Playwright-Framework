import {test, expect} from '@playwright/test';
import {ProductPage} from './ProductPage';

test.describe('product page tests', () => {
    test('should add computer to cart with selected options', async ({page}) => {
        const prductPage = new ProductPage(page);

        await page.goto('https://demo.nopcommerce.com/build-your-own-computer');

        await prductPage.selectDropdownOption('Processor', '2.5 GHz Intel Pentium Dual-Core E2200 [+$15.00]');
        await prductPage.selectDropdownOption('RAM', '8GB [+$60.00]');
        await prductPage.checkOption('HDD 400 GB [+$100.00]');
        await prductPage.checkOption('Vista Premium [+$60.00]');
        await prductPage.checkOption('Microsoft Office [+$50.00]');
        await prductPage.fillCustomTextInput('Enter your text', 'My Custom Text');
        await prductPage.uploadProductFile('Upload your file', 'path/to/file.txt');
        await prductPage.setQuantity('2');
        await prductPage.clickAddToCart();
        await expect(prductPage.successNotification).toBeVisible();
    });
})