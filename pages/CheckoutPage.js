
const { expect } = require('@playwright/test');

export class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Billing address locators
        this.firstNameInput = page.locator('#BillingNewAddress_FirstName');
        this.lastNameInput = page.locator('#BillingNewAddress_LastName');
        this.emailInput = page.locator('#BillingNewAddress_Email');
        this.countryDropdown = page.locator('#BillingNewAddress_CountryId');
        this.stateDropdown = page.locator('#BillingNewAddress_StateProvinceId');
        this.cityInput = page.locator('#BillingNewAddress_City');
        this.address1Input = page.locator('#BillingNewAddress_Address1');
        this.zipPostalCodeInput = page.locator('#BillingNewAddress_ZipPostalCode');
        this.phoneNumberInput = page.locator('#BillingNewAddress_PhoneNumber');

        // Billing continue button
        this.billingContinueButton = page
            .locator('#billing-buttons-container')
            .getByRole('button', {
                name: 'Continue',
                exact: true
            });

        // Shipping method locators
        this.shippingMethodSection = page.locator('#shipping-methods-form');
        this.groundShipping = page.locator('#shippingoption_0');

        this.shippingContinueButton = page
            .locator('#shipping-method-buttons-container')
            .getByRole('button', {
                name: 'Continue',
                exact: true
            });

        // Payment method locators
        this.checkMoneyOrder = page.locator('#paymentmethod_0');

        this.paymentMethodContinueButton = page
            .locator('#payment-method-buttons-container')
            .getByRole('button', {
                name: 'Continue',
                exact: true
            });

        // Payment information locators
        this.paymentInfoContinueButton = page
            .locator('#payment-info-buttons-container')
            .getByRole('button', {
                name: 'Continue',
                exact: true
            });

        // Confirm order locators
        this.confirmOrderButton = page
            .locator('#confirm-order-buttons-container')
            .getByRole('button', {
                name: 'Confirm',
                exact: true
            });

        // Order success locators
        this.orderSuccessMessage = page.getByText(
            'Your order has been successfully processed!'
        );

        this.orderNumber = page.locator('.order-number');

        // Confirm order section
        this.confirmOrderSection = page.locator(
            '#checkout-step-confirm-order'
        );
    }

    // Billing address
    async fillBillingAddress() {
        console.log('Filling billing address...');

        await this.firstNameInput.fill('Ali');
        await this.lastNameInput.fill('Test');
        await this.emailInput.fill('ali.qa.automation@example.com');

        await this.countryDropdown.selectOption({ label: 'Morocco' });
        await this.stateDropdown.selectOption({ label: 'Safi' });

        await this.cityInput.fill('Safi');
        await this.address1Input.fill('Test Address');
        await this.zipPostalCodeInput.fill('46000');
        await this.phoneNumberInput.fill('0612345678');

        console.log('Billing address completed.');
    }

    async continueFromBillingAddress() {
        console.log('Submitting billing address...');

        await this.billingContinueButton.waitFor({
            state: 'visible'
        });

        await this.billingContinueButton.click();

        await this.page.waitForURL(/#opc-shipping_method/);

        await this.shippingMethodSection.waitFor({
            state: 'visible'
        });

        console.log('Shipping method section loaded.');
    }

    // Shipping method
    async selectShippingMethod() {
        console.log('Selecting Ground shipping...');

        await this.shippingMethodSection.waitFor({
            state: 'visible'
        });

        await this.groundShipping.check();

        await this.shippingContinueButton.click();

        await this.page.waitForURL(/#opc-payment_method/);

        console.log('Shipping method selected.');
    }

    // Payment method
    async selectPaymentMethod() {
        console.log('Selecting Check / Money Order...');

        await this.checkMoneyOrder.check();

        await expect(this.paymentMethodContinueButton).toBeEnabled();

        await this.paymentMethodContinueButton.click();

        await this.paymentInfoContinueButton.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await expect(this.paymentInfoContinueButton).toBeEnabled();

        console.log('Payment method selected.');
    }

    // Payment information
    async continueFromPaymentInfo() {
        console.log('Submitting payment information...');

        await this.paymentInfoContinueButton.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await expect(this.paymentInfoContinueButton).toBeEnabled();

        await this.paymentInfoContinueButton.click();

        await this.page.waitForURL(/#opc-confirm_order/);

        await expect(this.confirmOrderSection).toBeVisible();

        console.log('Confirm Order section loaded.');
    }

    // Confirm order
    async confirmOrder() {
        console.log('Confirming order...');

        await this.confirmOrderButton.waitFor({
            state: 'visible'
        });

        await this.confirmOrderButton.click();

        await this.orderSuccessMessage.waitFor({
            state: 'visible',
            timeout: 30000
        });

        await expect(this.orderNumber).toBeVisible();
        await expect(this.orderNumber).not.toBeEmpty();

        console.log('Order successfully placed.');
    }
}
