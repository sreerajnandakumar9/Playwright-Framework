import { SELECTORS } from "./Utilities/Selectors";
import { USERS } from "./Utilities/constants";
import { Page, Locator, expect } from "@playwright/test";

export class myorders {
  private page: Page;
  private MyOrderButton: Locator;
  private Title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.MyOrderButton = this.page.locator(SELECTORS.myOrders.MyOrder);
    this.Title = this.page.locator(SELECTORS.myOrders.CheckTitle);
  }

  async checkOrderHistory() {
    await this.MyOrderButton.waitFor({ state: "visible" });
    await this.MyOrderButton.click();
    await this.Title.waitFor({ state: "visible" });
    const titleText = await this.Title.textContent();
    if (titleText) {
      console.log("Page Title:", titleText);
    }


  }
}