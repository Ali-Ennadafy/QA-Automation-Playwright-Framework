const { test, expect } = require('@playwright/test');
const { randomUUID } = require('node:crypto');
const { RegistrationPage } = require('../../pages/RegistrationPage');
const { userData } = require('../../test-data/userData');

test.describe('Registration UI Tests', () => {
    test('Should register a new user successfully', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        const email = `ali-${randomUUID()}@example.com`;

        await page.goto('/register');

        await registrationPage.register(
            userData.firstName,
            userData.lastName,
            email,
            userData.password,
            userData.confirmPassword,
            userData.gender
        );

        await expect(registrationPage.successMessage).toContainText(
            'Your registration completed'
        );
    });
});