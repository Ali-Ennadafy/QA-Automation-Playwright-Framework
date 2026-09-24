export class ProductPage {

    constructor(page) {
        this.page = page;
        this.productNameInput = page.getByLabel('Product Name');
        this.productDescriptionInput = page.getByLabel('Product Description');
        this.productPriceInput = page.getByLabel('Product Price');
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    }

    async addProductToCart(productName, productDescription, productPrice) {
        await this.productNameInput.fill(productName);
        await this.productDescriptionInput.fill(productDescription);
        await this.productPriceInput.fill(productPrice);
        await this.addToCartButton.click();
    }
}