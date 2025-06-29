import { expect, test } from "@playwright/test";
import { AdminPagePOM } from "./pom/adminPage.pom";
import { LoginPagePOM } from "./pom/loginPage.pom";


test.describe("Admin Page Search", () => {
    let loginPage: LoginPagePOM;
    let adminPage: AdminPagePOM;
    let listItems: string[] = [];

    // Fixture
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.APP_URL, { waitUntil: "networkidle" })
        loginPage = new LoginPagePOM(page);

        await loginPage.fillLoginCredentials("Admin", "admin123")
        await loginPage.clickLoginButton();

        await page.waitForURL((url: URL) => url.href.endsWith("/dashboard/index"));
        await page.waitForLoadState("networkidle");

        adminPage = new AdminPagePOM(page);
        listItems = await adminPage.getListItems();
    })

    test("Smoke test", async () => {
        expect(adminPage.searchInput).toBeVisible();
        expect(listItems.length).toBeGreaterThan(0);
    })

    // Empty value test
    test("Empty value", async () => {
        await adminPage.searchForItem("");
        const items = await adminPage.getListItems();
        expect(items.length).toBeGreaterThan(0);
    })

    test("Search for item containing words", async () => {
        await adminPage.searchForItem("m");
        const shownItems = await adminPage.getListItems();
        const filteredItems = listItems.filter(item => item.toLowerCase().includes("m"));
        expect(shownItems.length).toBe(filteredItems.length);
    })

    // Invalid item
    test("Invalid item", async () => {
        await adminPage.searchForItem("Invalid Item");
        const items = await adminPage.getListItems();
        expect(items.length).toBe(0);
    })

    // Valid item
    test("Valid item", async () => {
        await adminPage.searchForItem("Admin");
        const items = await adminPage.getListItems();
        expect(items.length).toBe(1);
    })
})