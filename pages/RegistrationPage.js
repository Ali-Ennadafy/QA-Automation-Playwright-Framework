export class RegistrationPage {
    constructor(page) {
        this.page = page;
        this .firstNameInput = page.getByLabel('First Name');
        this.lastNameInput = page.getByLabel('Last Name');
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.confirmPasswordInput = page.getByLabel('Confirm Password');
        this.registerButton = page.getByRole('button', { name: 'Register' });
    }

    async register(firstName, lastName, email, password, confirmPassword) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword);
        await this.registerButton.click();
    }
}