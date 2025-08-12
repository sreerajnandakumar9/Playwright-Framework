import { LoginPage } from "../Pages/LoginPage";
import { CartPage } from "../Pages/AddCart.spec";
import { CheckOut } from "../Pages/CheckOut";
import { Payment } from "../Pages/Payment"; 
import { ShippingInfo } from "../Pages/ShippingInfo";
import { myorders } from "../MyOrders";

import { test, expect,Page } from "@playwright/test";

export class POManager {
  private loginPage: LoginPage;
  private cartPage: CartPage;
  private checkOut: CheckOut;
  private payment: Payment;
  private shippingInfo: ShippingInfo;
  private myOrders: myorders;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.cartPage = new CartPage(page);
    this.checkOut = new CheckOut(page);
    this.payment = new Payment(page);
    this.shippingInfo = new ShippingInfo(page);
    this.myOrders = new myorders(page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckOut() {
    return this.checkOut;
  }

  getPayment() {
    return this.payment;
  }

  getShippingInfo() {
    return this.shippingInfo;
  }

  getMyOrders() {
    return this.myOrders;
  }
}