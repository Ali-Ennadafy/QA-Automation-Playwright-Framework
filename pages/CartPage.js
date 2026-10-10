export class CartPage {
    constructor(page) {
        this.page = page;

        this.productName = page.getByRole('link', {
            name: 'Build Your Own Computer',
            exact: true
        });

        this.cartAttributes = page.locator(
            '#shopping-cart-form .attributes'
        );

        this.quantityInput = page.locator(
            'input.qty-input[aria-label="Qty."]'
        );

        this.unitPrice = page.locator(
            '#shopping-cart-form .product-unit-price'
        );

        this.subtotal = page.locator(
            '#shopping-cart-form .product-subtotal'
        );

        this.removeButton = page.locator(
            'button.remove-btn[name="updatecart"]'
        );

        this.updateCartButton = page.getByRole('button', {
            name: 'Update shopping cart'
        });

        this.emptyCartMessage = page.locator(
            '.order-summary-content .no-data'
        );
    }

    async removeProduct() {
        await this.removeButton.click();
    }

    async updateQuantity(qty) {
        await this.quantityInput.fill(String(qty));
        await this.quantityInput.press('Enter');
    }

}