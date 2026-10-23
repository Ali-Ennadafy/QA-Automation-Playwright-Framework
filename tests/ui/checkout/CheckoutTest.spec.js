
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

        // Configure product
        await productPage.selectDropdownOption(
            2,
            '2.5 GHz Intel Pentium Dual-Core E2200 [+$15.00]'
        );

        await productPage.selectDropdownOption(3, '8GB [+$60.00]');
        await productPage.selectDropdownOption(1, '320GB');

        await productPage.checkOption('Vista Premium [+$60.00]');
        await productPage.checkOption('Microsoft Office [+$50.00]');

        await productPage.clickAddToCart();

        await expect(
            page.locator('.bar-notification.success')
        ).toContainText('The product has been added to your');

        // Shopping cart
        await productPage.openShoppingCart();

        await expect(page).toHaveURL(/\/cart(?:\?.*)?$/);
        await expect(cartPage.productName).toBeVisible();

        await cartPage.acceptTermsOfService();
        await cartPage.proceedToCheckout();

        // Guest checkout
        await expect(page).toHaveURL(/\/login\/checkoutasguest/);

        await page.getByRole('button', {
            name: /Checkout as Guest/i
        }).click();

        // One-page checkout
        await expect(page).toHaveURL(/\/onepagecheckout/);

        // Billing address
        await checkoutPage.fillBillingAddress();

        // Capture the Billing response for diagnostics
        page.on('response', async response => {
            if (response.url().includes('/checkout/OpcSaveBilling/')) {
                console.log('Billing response status:', response.status());

                try {
                    console.log(
                        'Billing response body:',
                        await response.text()
                    );
                } catch (error) {
                    console.log(
                        'Could not read billing response:',
                        error.message
                    );
                }
            }
        });

        await checkoutPage.continueFromBillingAddress();

        await expect(
            page.locator('#shipping-methods-form')
        ).toBeVisible();

        // Shipping method
        await checkoutPage.selectShippingMethod();

        await expect(page).toHaveURL(/#opc-payment_method/);

        // Payment method
        await expect(
            page.locator('#checkout-step-payment-method')
        ).toBeVisible();

        await checkoutPage.selectPaymentMethod();


        const paymentInfoContinueButton = page
            .locator('#payment-info-buttons-container')
            .getByRole('button', {
                name: 'Continue',
                exact: true
            });

        page.on('response', async response => {
            if (response.url().includes('/checkout/OpcSavePaymentInfo/')) {
                console.log(
                    'Payment info response status:',
                    response.status()
                );

                try {
                    console.log(
                        'Payment info response body:',
                        await response.text()
                    );
                } catch (error) {
                    console.log('Could not read response:', error.message);
                }
            }
        });

        console.log(
            'Payment info Continue disabled:',
            await paymentInfoContinueButton.isDisabled()
        );

        console.log(
            'Payment info loading indicator:',
            await page.locator('#payment-info-please-wait').isVisible()
        );
        await checkoutPage.continueFromPaymentInfo();

        const confirmOrderSection = page.locator(
            '#checkout-step-confirm-order'
        );

        await expect(confirmOrderSection).toBeVisible();

        await expect(
            confirmOrderSection.locator('.order-summary-content')
        ).toBeVisible();

        console.log('Confirm Order section is visible.');

        console.log('URL after Payment information:', page.url());

        console.log(
            'Confirm order section count:',
            await page.locator('#checkout-step-confirm-order').count()
        );

        console.log(
            'Confirm order HTML:',
            await page.locator('#checkout-step-confirm-order')
                .evaluate(element => element.outerHTML)
                .catch(() => 'Selector not found')
        );

        // Inspect Payment information
        console.log('URL after Payment method:', page.url());

        console.log(
            'Payment information section count:',
            await page.locator('#checkout-step-payment-info').count()
        );

        console.log(
            'Payment information HTML:',
            await page.locator('#checkout-step-payment-info')
                .evaluate(element => element.outerHTML)
                .catch(() => 'Selector not found')
        );

        // Diagnostic: inspect Payment method section
        console.log('Current URL:', page.url());

        const paymentSection = page.locator(
            '#checkout-step-payment-method'
        );

        console.log(
            'Payment method section count:',
            await paymentSection.count()
        );

        console.log(
            'Payment method HTML:',
            await paymentSection
                .evaluate(element => element.outerHTML)
                .catch(() => 'Selector not found')
        );

        await checkoutPage.confirmOrder();

        await expect(checkoutPage.orderSuccessMessage).toBeVisible();
        await expect(checkoutPage.orderNumber).toBeVisible();
        await expect(checkoutPage.orderNumber).not.toBeEmpty();

        console.log('Order completed successfully.');
    });
});

