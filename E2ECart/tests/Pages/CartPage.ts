// Moved the CartPage class to a dedicated file
import { Page,expect } from '@playwright/test';

export class CartPage {
  private page: Page;

  private productCard: '.card-body'
   private cartLink: "[routerlink*='cart']"
  
  

  private productNameLocator(productName: string) {
    return `h3:has-text('${productName}')`;
  }

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToCart(productName: string) {
    try {
      const products = this.page.locator(this.productCard,);
      const count = await products.count();

      for (let i = 0; i < count; i++) {
        if ((await products.nth(i).locator('b').textContent()) === productName) {
               await this.page.t; // Adding a delay to ensure the page is fully loaded

          await products.nth(i).locator('text= Add To Cart').click();
          console.log(`${productName} added to cart`);
          return;
        }
      }
      console.error(`Product not found: ${productName}`);
    } catch (error) {
      console.error(`Error adding product to cart: ${productName}`, error);
      throw error;
    }
  }

  async verifyProductInCart(productName: string) {
    try {
      await this.page.locator(this.cartLink).click();
      const isVisible = await this.page.locator(this.productNameLocator(productName)).isVisible();
      console.log(`Is ${productName} visible in cart: ${isVisible}`);
      return isVisible;
    } catch (error) {
      console.error(`Error verifying product in cart: ${productName}`, error);
      throw error;
    }
  }
  
}