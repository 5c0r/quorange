import { Page } from '@playwright/test';
import { LoginPagePOM } from "./pom/loginPage.pom";
import dotenv from 'dotenv';
import path from 'node:path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export const config = {
    target: process.env.APP_URL,
    engines: {
        playwright: {}
    }
};

export const scenarios = [{
    engine: 'playwright',
    testFunction: loginPagePerformanceTest
}];

async function loginPagePerformanceTest(page: Page) {

    await page.goto(process.env.APP_URL);
    const loginPage = new LoginPagePOM(page);

    await loginPage.fillLoginCredentials("Admin", "admin123");
}