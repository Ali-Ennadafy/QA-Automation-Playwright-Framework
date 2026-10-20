
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');
const { userData } = require('../../../test-data/userData');

test.describe('Login UI Tests', () => {

    test('Should log in successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto('/login');
        await loginPage.login(userData.email, userData.password);

        await expect(loginPage.logoutLink).toBeVisible();
    });

    test('Should display an error with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto('/login');
        await loginPage.login(
            'invalid-user@example.com',
            'WrongPassword123!'
        );

        await expect(loginPage.loginError).toContainText(
            'Login was unsuccessful'
        );
    });

    test('Should log out successfully after login', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto('/login');
        await loginPage.login(userData.email, userData.password);

        await expect(loginPage.logoutLink).toBeVisible();

        await loginPage.logout();

        await expect(
            page.getByRole('link', { name: 'Log in', exact: true })
        ).toBeVisible();
    });

});
