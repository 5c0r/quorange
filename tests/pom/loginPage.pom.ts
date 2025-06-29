import { expect, type Locator, type Page, type Response } from '@playwright/test';

export class LoginPagePOM {
    public readonly usernameInput: Locator;
    public readonly passwordInput: Locator;
    public readonly loginButton: Locator;

    constructor(readonly page: Page) {
        this.usernameInput = page.getByRole('textbox', { name: 'Username' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
    }

    async fillLoginCredentials(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    clickLoginButton() {
        return this.loginButton.click();
    }

    expectSuccessLogin() {
        return this.page.waitForResponse(async (response: Response) => {
            return response.url() === "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate"
                && (await response.headerValue("Location")) === "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index";
        });
    }

    // TODO: Find form validation 
    async expectFailureLoginFromFormValidation() {
        const errorMessages = await this.page.locator('.oxd-input-field-error-message.oxd-input-group__message').all()
        expect(errorMessages.length).toBeGreaterThan(0);
    }

    expectFailureLoginFromWrongCredentials() {
        return this.page.waitForResponse(async (response: Response) => {
            return response.url() === "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate"
                && (await response.headerValue("Location")) === "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
        });
    }
}