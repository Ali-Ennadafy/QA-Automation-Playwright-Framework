export class RegistrationPage {
    constructor(page) {
        this.page = page;
        this .firstNameInput = page.getByLabel('First Name');
        this.lastNameInput = page.getByLabel('Last Name');
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.confirmPasswordInput = page.getByLabel('Confirm Password');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.companyNameInput = page.getByLabel('Company Name');
        this.NewsletterCheckbox = page.getByLabel('Subscribe to Newsletter');
         if (this.NewsletterCheckbox) {
            await this.NewsletterCheckbox.check();
        }
        this.GenderInput = page.getByLabel('Gender');
            if (this.GenderInput) {
                this.GenderInput.selectOption('Male');
            }
            else if (this.GenderInput) {
                this.GenderInput.selectOption('Female');
            }

            else {
                this.GenderInput.selectOption('Other');
            }
    }

    async register(firstName, lastName, email, password, confirmPassword) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword);
        await this.registerButton.click();
        await this.companyNameInput.fill('Test Company');
        await this.GenderInput.selectOption('Male');
        await this.NewsletterCheckbox.check();
    }
}