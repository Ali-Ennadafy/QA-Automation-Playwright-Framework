
export class SearchPage {
    constructor(page) {
        this.page = page;

        this.searchInput = page.getByRole('textbox', {
            name: 'Search store'
        });

        
        this.searchButton = page.locator('#small-search-box-form').getByRole('button', {
            name: 'Search'
        });


        this.searchResults = page.locator('.product-item');
        this.noResultsMessage = page.locator(
            '.no-result, .no-products, .search-results .warning'
        );
    }

    async searchProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }
}
