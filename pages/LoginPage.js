
export class LoginPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', {
            name: 'Log in'
        });
        this.loginError = page.locator('.message-error');
        this.logoutLink = page.getByRole('link', {
            name: 'Log out'
        });
    }

    // Actions
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async logout() {
        await this.logoutLink.click();
    }
}

