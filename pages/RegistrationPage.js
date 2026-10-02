export class RegistrationPage {

    constructor(page) {
        
        //locators
        this.page = page;
        this.firstNameInput = page.getByLabel('First Name');
        this.lastNameInput = page.getByLabel('Last Name');
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.confirmPasswordInput = page.getByLabel('Confirm Password');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.companyNameInput = page.getByLabel('AMZ');
        this.NewsletterCheckbox = page.getByLabel('Subscribe to Newsletter');     
        this.maleRadioButton = page.getByLabel('Male');
        this.femaleRadioButton = page.getByLabel('Female');
    
    }

    async register(firstName, lastName, email, password, confirmPassword, gender) {
   
        //interactions
        if (gender === 'male') {
            await this.maleRadioButton.check();
        }

        if (gender === 'female') {
            await this.femaleRadioButton.check();
        }
        
        await this.femaleRadioButton.click(gender === 'female');
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.companyNameInput.fill('AMZ');
        await this.NewsletterCheckbox.check();
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword);
        await this.registerButton.click();
    }
}