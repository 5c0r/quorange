import { Locator, Page } from "@playwright/test";


export class AdminPagePOM {
    public searchInput: Locator;
    public readonly listItem: Locator;

    constructor(readonly page: Page) {
        this.searchInput = page.locator('input.oxd-input');
        this.listItem = page.locator('ul.oxd-main-menu');
    }
    public async searchForItem(item: string) {
        await this.searchInput.fill(item);
    }

    public getListItems() {
        return this.listItem.locator('li.oxd-main-menu-item-wrapper').allTextContents();
    }
}

export class AdminPageMobilePOM extends AdminPagePOM {

    public readonly hamburgerButton: Locator;

    constructor(readonly page: Page) {
        super(page);
        this.searchInput = page.locator('input.oxd-input.oxd-input--active.toggled');
        this.hamburgerButton = page.locator('i.oxd-icon.bi-list.oxd-topbar-header-hamburger');
    }

    public clickHamburgerButton() {
        return this.hamburgerButton.click();
    }

}