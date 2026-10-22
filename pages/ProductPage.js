export class ProductPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = page.locator(
            '#product-details-form button.add-to-cart-button'
        );
        this.addToWishlistButton = page.getByRole('button', { name: /Add to wishlist/i });
        this.quantityInput = page.locator('.qty-input');

        this.successNotification = page.locator('#bar-notification');
        this.notificationCloseButton = page.locator('#bar-notification .close');

        this.shoppingCartLink = page.getByRole('link', {
            name: /Shopping cart \(\d+\)/
        });

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
        await this.shoppingCartLink.waitFor({ state: 'visible' });

        if (await this.notificationCloseButton.isVisible()) {
            await this.notificationCloseButton.click();
        }

        await this.shoppingCartLink.click();

        await this.page.waitForURL(/\/cart(?:\?.*)?$/);
    }
    async clickAddToWishlist() {
        await this.addToWishlistButton.click();
    }
}
