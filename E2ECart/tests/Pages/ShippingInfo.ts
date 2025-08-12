import { test, Page, expect, Locator, selectors } from "@playwright/test";
import { SELECTORS } from "../Utilities/Selectors";

export class ShippingInfo {
  private page: Page;
  private shippingInfoLocator: Locator;
  private OrderIDText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shippingInfoLocator = this.page.locator(SELECTORS.shipping.VerifyOrderMessage); 
    this.OrderIDText = this.page.locator(SELECTORS.shipping.orderIdLabel);
  }

  async CheckShipInfo() {
    await this.page.locator(SELECTORS.shipping.thankYouHeader).waitFor({ state: "visible" });

    const txt = await this.shippingInfoLocator.innerText();
    console.log("Order ID:", txt);

    const OrderID: any = await this.OrderIDText.textContent();
    const TrimID = await OrderID.replace(/[\s|]/g, "");
    console.log("Order ID from label:", TrimID);
  }
}
