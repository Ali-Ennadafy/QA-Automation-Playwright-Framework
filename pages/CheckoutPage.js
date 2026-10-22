
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
        await this.continueButton.click();
    }

}
