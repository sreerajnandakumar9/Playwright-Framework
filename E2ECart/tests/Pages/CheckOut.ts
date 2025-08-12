import { Page, Locator,expect } from '@playwright/test';
import { CartPage } from './AddCart.spec';


export class CheckOut {
  private page: Page;
   private BUTTONcLICK:string="button[type='button']"
   private item: Locator
   
  constructor(page: Page) {
    this.page = page;
    this.item = this.page.locator("div li")
  }
// This method constructs a locator for the product name based on the provided product name string.
  private productNameLocator(productName: string) {
    return `h3:has-text('${productName}')`;
  }

async navigateToCart(productName: string) {

   try {
    await this.item.first().waitFor({
      state: "visible",
      timeout: 10000,
    });
  } catch (error) {
    console.error("Element not found or not visible within the timeout:", error);
      }
        const bool = await this.page.locator(this.productNameLocator(productName)).isVisible();
        expect(bool).toBeTruthy();

  await this.page.locator(this.BUTTONcLICK).last().click();
  

      await this.page.waitForLoadState('networkidle');

       

         return;
  }


  
}