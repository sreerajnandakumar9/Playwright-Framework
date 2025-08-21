import {test,expect } from "@playwright/test";
import {Customtest} from "../Utilities/test-base";
import { USERS } from "../Utilities/constants";
import { POManager } from "../PageRepo/POManager";
import DatasetJson from "../Utilities/TestSet.json";
const Dataset = JSON.parse(JSON.stringify(DatasetJson));
//parallel or serial execution
//test.describe.configure({ mode: 'serial' }); 
// // Ensure tests run in serial to avoid conflicts
test.describe.configure({ mode: 'serial' }); 
 
Customtest(`E KART test`, async ({page,testDataForOrder}) => {

  const manager = new POManager(page);
  const loginPage = manager.getLoginPage();
  const cartPage = manager.getCartPage();
  const chk = manager.getCheckOut();
  const ship = manager.getPayment();
  const shipInfo = manager.getShippingInfo();
  const orders = manager.getMyOrders();

  // Step 1: Login
  //await page.setViewportSize({ width: 1536, height: 864 });
  await loginPage.navigateToLoginPage();

  try {
    await loginPage.login(testDataForOrder.username,testDataForOrder.password);
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }

  // Step 2: Add product to cart
  const productName = testDataForOrder.product1;
  await cartPage.addProductToCart(productName);

  // Step 3: Verify product in cart
  await page.waitForLoadState('networkidle');
  const isProductInCart = await cartPage.verifyProductInCart(productName);
  console.log(`Is ${productName} in cart: ${isProductInCart}`);
  expect(isProductInCart).toBeTruthy();

  console.log(`Attempting to add product: ${productName}`);
  // Step 4: Navigate to checkout
  await chk.navigateToCart(productName);
  await expect(
    page.getByText(USERS.CHOOSEPRODUCT.title).filter({ visible: true })
  ).toBeVisible();
  await ship.fillShippingInfo(testDataForOrder.Country,testDataForOrder.username);
  // Step 5: Place order
  await ship.PlaceOrder();
  await page.waitForLoadState("networkidle");
  await shipInfo.CheckShipInfo();
  // Step 6: Check order history
  await orders.checkOrderHistory();
  
});

for(const data of Dataset) {
test.only(`@E-KART Test for ${data.product1}`, async ({ page}) => {

  const manager = new POManager(page);
  const loginPage = manager.getLoginPage();
  const cartPage = manager.getCartPage();
  const chk = manager.getCheckOut();
  const ship = manager.getPayment();
  const shipInfo = manager.getShippingInfo();
  const orders = manager.getMyOrders();

  // Step 1: Login
  //await page.setViewportSize({ width: 1536, height: 864 });
  await loginPage.navigateToLoginPage();

  try {
    await loginPage.login(data.username,data.password);
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }

  // Step 2: Add product to cart
  const productName = data.product1;
  await cartPage.addProductToCart(productName);

  // Step 3: Verify product in cart
  const isProductInCart = await cartPage.verifyProductInCart(productName);
  console.log(`Is ${productName} in cart: ${isProductInCart}`);
  expect(isProductInCart).toBeTruthy();

  console.log(`Attempting to add product: ${productName}`);
  // Step 4: Navigate to checkout
  await chk.navigateToCart(productName);
  await expect(
    page.getByText(USERS.CHOOSEPRODUCT.title).filter({ visible: true })
  ).toBeVisible();
  await ship.fillShippingInfo(data.Country,data.username);
  // Step 5: Place order
  await ship.PlaceOrder();
  await page.waitForLoadState("networkidle");
  await shipInfo.CheckShipInfo();
  // Step 6: Check order history
  await orders.checkOrderHistory();
});
 }