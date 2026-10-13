
export class RegistrationPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.firstNameInput = page.getByLabel('First name');
        this.lastNameInput = page.getByLabel('Last name');
        this.emailInput = page.getByLabel('Email');
        
        this.passwordInput = page.getByRole('textbox', {
            name: 'Password:',
            exact: true
        });

        this.confirmPasswordInput = page.getByRole('textbox', {
            name: 'Confirm password:',
            exact: true
        });


        this.registerButton = page.getByRole('button', {
            name: 'Register'
        });

        this.companyNameInput = page.locator('#Company');
        this.newsletterCheckbox = page.getByRole('checkbox', {
            name: 'Newsletter',
            exact: true
        });
        this.maleRadioButton = page.getByRole('radio', {
            name: 'Male',
            exact: true
        });
        this.femaleRadioButton = page.getByRole('radio', {
            name: 'Female',
            exact: true
        });

        this.successMessage = page.locator('.result');
        this.errorMessage = page.locator('.message-error');
    }

    // Actions
    async register(firstName, lastName, email, password, confirmPassword, gender) {
        if (gender === 'male') {
            await this.maleRadioButton.check();
        } else if (gender === 'female') {
            await this.femaleRadioButton.check();
        }

        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);

        await this.companyNameInput.fill('AMZ');
        await this.newsletterCheckbox.check();

        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword);

        await this.registerButton.click();
    }
}
