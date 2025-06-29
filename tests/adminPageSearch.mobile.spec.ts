import test, { expect } from "@playwright/test";
import { AdminPageMobilePOM } from "./pom/adminPage.pom";
import { LoginPagePOM } from "./pom/loginPage.pom";

test.describe("Admin Page Search - Mobile View", () => {
    let loginPage: LoginPagePOM;
    let adminPage: AdminPageMobilePOM;
    let listItems: string[];

    // Fixture
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 340, height: 667 }); // Set viewport to mobile size
        await page.goto(process.env.APP_URL, { waitUntil: "networkidle" });
        loginPage = new LoginPagePOM(page);

        await loginPage.fillLoginCredentials("Admin", "admin123");
        await loginPage.clickLoginButton();

        await page.waitForURL((url: URL) => url.href.endsWith("/dashboard/index"));
        await page.waitForLoadState("networkidle");

        adminPage = new AdminPageMobilePOM(page);
        await adminPage.clickHamburgerButton();
        await adminPage.searchInput.waitFor({ state: "visible" });
        listItems = await adminPage.getListItems();
    });

    test("Smoke Test", async () => {
        expect(adminPage.searchInput).toBeVisible();
        expect(await adminPage.searchInput.isVisible()).toBe(true);
    });

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