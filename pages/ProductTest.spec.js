import {test, expect} from '@playwright/test';
import {ProductPage} from './ProductPage';

test.describe('product page tests'), () => {
    test('should add computer to cart with selected options', async ({page}) => {
        const prductPage = new ProductPage(page);

        await page.goto('https://demo.nopcommerce.com/build-your-own-computer');

        await prductpage.selectDropdownOption('Processor', '2.5 GHz Intel Pentium Dual-Core E2200 [+$15.00]');
        await prductpage.selectDropdownOption('RAM', '8GB [+$60.00]');
        await prductpage.checkOption('HDD 400 GB [+$100.00]');
        await prductpage.checkOption('Vista Premium [+$60.00]');
        await productpage.checkOption('Microsoft Office [+$50.00]');
        await productpage.fillCustomTextInput('Enter your text', 'My Custom Text');
        await productpage.uploadProductFile('Upload your file', 'path/to/file.txt');
        await productpage.setQuantity('2');
        await productpage.clickAddToCart();
        await expect(productpage.successNotification).toBeVisible();
    });
}