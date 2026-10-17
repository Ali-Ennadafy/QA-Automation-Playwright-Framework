
const { test, expect } = require('@playwright/test');

const { SearchPage } = require('../../pages/SearchPage');

test.describe('Search UI Tests', () => {

    test('Should find a product by name', async ({ page }) => {

        const searchPage = new SearchPage(page);

        await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 });

        await searchPage.searchProduct('Build Your Own Computer');

        await expect(searchPage.searchResults.first()).toBeVisible();

        await expect(searchPage.searchResults.first()).toContainText(
            'Build Your Own Computer'
        );
    });

    test('Should display a message when no products are found', async ({ page }) => {
        const searchPage = new SearchPage(page);

        await page.goto('/', {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });

        await searchPage.searchProduct('XYZProduct999NotFound');

        await expect(searchPage.searchResults).toHaveCount(0);

        await expect(searchPage.noResultsMessage.first()).toBeVisible();
    });

    
    test('Should find an existing product in the store', async ({ page }) => {
        await page.goto('/', {
            waitUntil: 'domcontentloaded',
            timeout: 15000
        });

        await page.getByRole('textbox', { name: /search/i })
            .fill('Build Your Own Computer');

        await page.locator('#small-search-box-form')
            .getByRole('button', { name: 'Search' })
            .click();

        await expect(
            page.getByRole('link', { name: /Build Your Own Computer/i }).first()
        ).toBeVisible({ timeout: 10000 });
    });


});

