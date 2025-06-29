import { expect, test } from "@playwright/test";
import { LoginPagePOM } from "./pom/loginPage.pom";

test.describe("Login Page Test", () => {
    let loginPage: LoginPagePOM;

    test.beforeEach(async ({ page, browser }) => {
        await page.goto(process.env.APP_URL, { waitUntil: "networkidle" })
        loginPage = new LoginPagePOM(page);
    });

    test("Smoke test", async ({ page }) => {

        expect(loginPage.usernameInput).toBeDefined();
        expect(await loginPage.usernameInput.isEnabled()).toBe(true);
        expect(await loginPage.usernameInput.isVisible()).toBe(true);

        expect(loginPage.passwordInput).toBeDefined();
        expect(await loginPage.passwordInput.isEnabled()).toBe(true);
        expect(await loginPage.passwordInput.isVisible()).toBe(true);
        expect(loginPage.loginButton).toBeDefined();
        expect(await loginPage.loginButton.isEnabled()).toBe(true);

    })
    test("Test Successful Login", async ({ page }) => {
        await loginPage.fillLoginCredentials("Admin", "admin123");

        await Promise.all([
            loginPage.clickLoginButton(),
            loginPage.expectSuccessLogin()
        ])

        await page.waitForURL((url: URL) => url.href.endsWith("/dashboard/index"));

        expect(page.url()).toBe(`${process.env.APP_URL}/web/index.php/dashboard/index`);
    });

    [
        { username: "", password: "" },
        { username: "     ", password: "      " },
    ].forEach(({ username, password }) => {
        test(`Test Failure Login - Trigger validation - username: ${username} and password: ${password}`, async ({ page }) => {
            await loginPage.fillLoginCredentials(username, password);
            await loginPage.clickLoginButton();

            await loginPage.expectFailureLoginFromFormValidation();

            expect(page.url()).toBe(`${process.env.APP_URL}/web/index.php/auth/login`);
        });
    });

    [
        { username: "InvalidUser", password: "admin123" },
        { username: "Admin", password: "InvalidPassword" }
    ].forEach(({ username, password }) => {
        test(`Test Failure Login - Wrong credentials - username: ${username} and password: ${password}`, async ({ page }) => {
            await loginPage.fillLoginCredentials(username, password);
            await Promise.all([
                loginPage.clickLoginButton(),
                loginPage.expectFailureLoginFromWrongCredentials()
            ])

            expect(page.url()).toBe(`${process.env.APP_URL}web/index.php/auth/login`);
        });
    });
})