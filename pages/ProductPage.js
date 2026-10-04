export class ProductPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.quantityInput = page.locator('.qty-input');

        this.successNotification = page.locator('#bar-notification');

        this.shoppingCartLink = page.getByRole('link', {
            name: /Shopping cart \(\d+\)/
        });

        this.cartQuantityInput = page.locator(
            'input.qty-input[aria-label="Qty."]'
        );

        this.cartAttributes = page.locator(
            '#shopping-cart-form .attributes'
        );
    }

    async selectDropdownOption(attributeId, optionText) {
        await this.page
            .locator(`#product_attribute_${attributeId}`)
            .selectOption({
                label: optionText
            });
    }

    async checkOption(optionLabel) {
        await this.page.getByLabel(optionLabel).check();
    }

    async fillCustomTextInput(labelName, textValue) {
        await this.page.getByLabel(labelName).fill(textValue);
    }

    async uploadProductFile(labelName, filePath) {
        await this.page.getByLabel(labelName).setInputFiles(filePath);
    }

    async setQuantity(qty) {
        await this.quantityInput.fill(String(qty));
    }

    async clickAddToCart() {
        await this.addToCartButton.click();
    }

    async openShoppingCart() {
        await this.successNotification.waitFor({ state: 'hidden' });
        await this.shoppingCartLink.click();
    }
}
