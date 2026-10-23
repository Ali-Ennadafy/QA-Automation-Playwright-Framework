const { expect } = require('@playwright/test');

export class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Checkout navigation
        this.continueButton = page.getByRole('button', {
            name: 'Continue',
            exact: true
        });

        // Shipping method
        this.groundShipping = page.getByLabel(/Ground/);

        // Payment method
        this.checkMoneyOrder = page.getByLabel(/Check.*Money Order/i);

        // Order confirmation
        this.confirmOrderButton = page.getByRole('button', {
            name: /Confirm/
        });

        // Successful order
        this.orderSuccessMessage = page.getByText(
            'Your order has been successfully processed!'
        );

        this.orderNumber = page.locator('.order-number');

        // Billing address
        this.firstNameInput = page.locator('#BillingNewAddress_FirstName');
        this.lastNameInput = page.locator('#BillingNewAddress_LastName');
        this.emailInput = page.locator('#BillingNewAddress_Email');
        this.countryDropdown = page.locator('#BillingNewAddress_CountryId');

        this.stateDropdown = page.locator(
            '#BillingNewAddress_StateProvinceId'
        );

        this.cityInput = page.locator('#BillingNewAddress_City');
        this.address1Input = page.locator('#BillingNewAddress_Address1');
        this.zipPostalCodeInput = page.locator('#BillingNewAddress_ZipPostalCode');
        this.phoneNumberInput = page.locator('#BillingNewAddress_PhoneNumber');
        this.groundShipping = this.page.locator('#shippingoption_0');

        this.billingContinueButton = page.locator(
            '#billing-buttons-container'
        ).getByRole('button', {
            name: 'Continue',
            exact: true
        });

                // Payment method
        this.checkMoneyOrder = page.locator('#paymentmethod_0');

        this.paymentMethodContinueButton = page
            .locator('#payment-method-buttons-container')
            .getByRole('button', {
                name: 'Continue',
                exact: true
            });

        // Payment information
        this.paymentInfoSection = page.locator(
            '#checkout-step-payment-info'
        );
    }

    async selectDropdownOption(attributeId, optionText) {
        await this.page
            .locator(`#product_attribute_${attributeId}`)
            .selectOption({ label: optionText });
    }

    async selectShippingMethod() {
        await this.page.locator('#shipping-methods-form').waitFor({
            state: 'visible'
        });

        await this.groundShipping.check();

        const continueButton = this.page
            .locator('#shipping-method-buttons-container')
            .getByRole('button', {
                name: 'Continue',
                exact: true
            });

        await continueButton.click();

        await this.page.waitForURL(/#opc-payment_method/);
    }

    
    async selectPaymentMethod() {
        const paymentContinueButton = this.page
            .locator('#payment-method-buttons-container')
            .getByRole('button', {
                name: 'Continue',
                exact: true
            });

        await this.checkMoneyOrder.check();

        await expect(paymentContinueButton).toBeEnabled();
        await paymentContinueButton.click();

        const paymentInfoContinueButton = this.page
            .locator('#payment-info-buttons-container')
            .getByRole('button', {
                name: 'Continue',
                exact: true
            });

        await expect(paymentInfoContinueButton).toBeVisible();
        await expect(paymentInfoContinueButton).toBeEnabled();
    }

    async confirmOrder() {
        await this.confirmOrderButton.click();
    }


    async continueFromBillingAddress() {
        await this.billingContinueButton.waitFor({
            state: 'visible'
        });

        await this.billingContinueButton.click();

        // Wait until checkout advances to Shipping method
        await this.page.waitForURL(/#opc-shipping_method/);

        await this.page.locator('#shipping-methods-form').waitFor({
            state: 'visible'
        });
    }

   async fillBillingAddress() {

        await this.firstNameInput.fill('Ali');
        await this.lastNameInput.fill('Test');
        await this.emailInput.fill('ali.qa.automation@example.com');

        await this.countryDropdown.selectOption({ label: 'Morocco' });

        // Select the required state/province
        await this.stateDropdown.selectOption({ label: 'Safi' });

        await this.cityInput.fill('Safi');
        await this.address1Input.fill('Test Address');
        await this.zipPostalCodeInput.fill('46000');
        await this.phoneNumberInput.fill('0612345678');
    }

    async selectShippingMethod() {
        await this.groundShipping.check();
        await this.continueButton.click();
    }

    
    async continueFromPaymentInfo() {
        const continueButton = this.page
            .locator('#payment-info-buttons-container')
            .getByRole('button', {
                name: 'Continue',
                exact: true
            });

        await expect(continueButton).toBeVisible();
        await continueButton.click();
    }

    async confirmOrder() {
        const confirmButton = this.page.locator(
            '#confirm-order-buttons-container'
        ).getByRole('button', {
            name: 'Confirm',
            exact: true
        });

        await confirmButton.waitFor({ state: 'visible' });
        await confirmButton.click();

        await this.orderSuccessMessage.waitFor({
            state: 'visible',
            timeout: 30000
        });
    }
}
