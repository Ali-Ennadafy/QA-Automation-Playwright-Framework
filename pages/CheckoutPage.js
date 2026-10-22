
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
        this.cityInput = page.locator('#BillingNewAddress_City');
        this.address1Input = page.locator('#BillingNewAddress_Address1');
        this.zipPostalCodeInput = page.locator('#BillingNewAddress_ZipPostalCode');
        this.phoneNumberInput = page.locator('#BillingNewAddress_PhoneNumber');

        this.billingContinueButton = page.locator(
            '#billing-buttons-container'
        ).getByRole('button', {
            name: 'Continue',
            exact: true
        });
    }

    async selectDropdownOption(attributeId, optionText) {
        await this.page
            .locator(`#product_attribute_${attributeId}`)
            .selectOption({ label: optionText });
    }

    async selectShippingMethod() {
        await this.groundShipping.check();
        await this.continueButton.click();
    }

    async selectPaymentMethod() {
        await this.checkMoneyOrder.check();
        await this.continueButton.click();
    }

    async confirmOrder() {
        await this.confirmOrderButton.click();
    }


    async continueFromBillingAddress() {
        await this.billingContinueButton.waitFor({
            state: 'visible'
        });

        await this.billingContinueButton.click();

        await this.page.waitForTimeout(1500);

        console.log('URL:', this.page.url());

        console.log(
            'Billing section visible:',
            await this.page.locator('#checkout-step-billing').isVisible()
                .catch(() => false)
        );

        console.log(
            'Billing button text:',
            await this.billingContinueButton.textContent()
                .catch(() => 'Button not found')
        );

        console.log(
            'Visible errors:',
            await this.page.locator(
                '.message-error, .field-validation-error, .validation-summary-errors'
            ).allTextContents()
        );
    }

    async fillBillingAddress() {
        await this.firstNameInput.fill('Ali');
        await this.lastNameInput.fill('Test');
        await this.emailInput.fill('ali.qa.automation@example.com');

        await this.countryDropdown.selectOption({ label: 'Morocco' });

        await this.cityInput.fill('Safi');
        await this.address1Input.fill('Test Address');
        await this.zipPostalCodeInput.fill('46000');
        await this.phoneNumberInput.fill('0612345678');
    }

    async selectShippingMethod() {
        await this.groundShipping.check();
        await this.continueButton.click();
    }

}
