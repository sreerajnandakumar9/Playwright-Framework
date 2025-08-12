import { Page } from '@playwright/test';

export class CartPage {
  navigateToCart() {
    throw new Error('Method not implemented.');
  }
  private page: Page;
  private productCard = '.card-body';
  private cartLink = "[routerlink*='cart']";
  //private productName = "IPHONE 13 PRO";
  private productNameLocator = (productName: string) => `h3:has-text('${productName}')`;

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToCart(productName: string) {
    const products = this.page.locator(this.productCard);
    const count = await products.count();

    for (let i = 0; i < count; i++) {
      if ((await products.nth(i).locator('b').textContent()) === productName) {
        await products.nth(i).locator('text= Add To Cart').click();
        console.log(`${productName} added to cart`);
        break;
      }
    }
  }

  async verifyProductInCart(productName: string) {
    await this.page.locator(this.cartLink).click();
    try {
      await this.page.locator("div li").first().waitFor({
        state: "visible",
        timeout: 10000,
      });
    } catch (error) {
      console.error("Element not found or not visible within the timeout:", error);
    }
    const isVisible = await this.page.locator(this.productNameLocator(productName)).isVisible();
    console.log(`Is ${productName} visible in cart: ${isVisible}`);    
    return isVisible;
  }
}