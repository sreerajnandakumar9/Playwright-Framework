import { Page, Locator, expect } from "@playwright/test";
import { SELECTORS } from "../Utilities/Selectors";

export class Payment {
  private page: Page;
  private Country: Locator;
  private ChkOrderButton: Locator;
  private orderButtontxt: Locator;
  private mail: Locator;
  private orderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.Country = this.page.locator(SELECTORS.payment.choose_Country);
    this.mail = this.page.locator(SELECTORS.payment.mail);
    this.orderButton = this.page.locator(SELECTORS.payment.OrderButton);
  }

  async fillShippingInfo(Country: string, mail: string) {
    await this.page
      .locator(SELECTORS.payment.choose_Country)
      .pressSequentially(Country);

    await this.page.waitForLoadState("networkidle");
    const dropdown = this.page.locator(SELECTORS.payment.ViewCountries);
    await this.page.waitForSelector(SELECTORS.payment.ViewCountries, {
      state: "visible", // Ensure the dropdown is visible
      timeout: 5000, // Optional: Increase timeout to 5 seconds   
  })
  
   
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i <  optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text?.includes(Country) ) {
         await dropdown.locator("button").nth(i).waitFor({
          state: "visible", 
          timeout:4000// Ensure the option is visible before clicking 
        });
        await dropdown.locator("button").nth(i).click();
        break;
      }
    }
    await expect( this.mail).toHaveText(mail);
    console.log(mail);
  }

  async verifyShippingInfoFilled(Country: string, mail: string) {}
  async PlaceOrder() {
    console.log("Order button is visible.");
    await this.orderButton.click();

    console.log("Order placed successfully.");
  }
}
