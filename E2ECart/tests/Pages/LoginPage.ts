import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput= this.page.locator('#userEmail');
    this.passwordInput = this.page.locator('#userPassword');
    this.loginButton = this.page.locator('#login');

  }

  async navigateToLoginPage() {
    await this.page.goto('https://rahulshettyacademy.com/client');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}