
const { test, expect } = require('@playwright/test');

const { SearchPage } = require('../../pages/SearchPage');

test.describe('Search UI Tests', () => {

    test('Should find a product by name', async ({ page }) => {

        const searchPage = new SearchPage(page);

        await page.goto('/');

        await searchPage.searchProduct('Build Your Own Computer');

        await expect(searchPage.searchResults.first()).toBeVisible();

        await expect(searchPage.searchResults.first()).toContainText(
            'Build Your Own Computer'
        );
    });

    test('Should display a message when no products are found', async ({ page }) => {
        const searchPage = new SearchPage(page);

        await page.goto('/');

        await searchPage.searchProduct('XYZProduct999NotFound');

        await expect(searchPage.searchResults).toHaveCount(0);

        await expect(searchPage.noResultsMessage.first()).toBeVisible();
    });

});
