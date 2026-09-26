export class ProductPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.quantityInput = page.locator('.qty-input');
        this.successNotification = page.locator('.bar-notification.success');
    }

    async selectDropdownOption(labelName, optionText) {
        await this.page.getByLabel(labelName).selectOption({ label: optionText });
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
        await this.quantityInput.clear();
        await this.quantityInput.fill(qty);
    }
    async clickAddToCart() {
        await this.addToCartButton.click();
    }
}

