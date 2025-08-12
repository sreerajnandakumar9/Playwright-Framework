import { test, Page, Browser, expect, Locator, chromium } from "@playwright/test";



test.describe.configure({ mode: "serial" });

let page: Page;
let br: Browser;

test.beforeAll(async ({ browser }) => {
  
  page = await browser.newPage();
  await page.setViewportSize({ width: 1536 , height: 864 });

  br = await chromium.launch({
    headless: false,  
    slowMo: 100,
    args: ["--start-maximized"],  
    channel: "chrome",
  });

})


test.beforeEach(async () => {
 
  await page.goto("https://rahulshettyacademy.com/client");
  await page.waitForLoadState("networkidle");

  //await page.login("sreeb416@gmail.com", "test1234");
  await page
    .locator(".form-group", { has: page.locator("input#userEmail") })
    .click();
  await page
    .locator(".form-group", { has: page.locator("input#userEmail") })
    .pressSequentially("sreeb416@gmail.com");
  await page.locator("#userPassword").fill("test1234");
 await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
})

test.afterEach(async () => {
  await page.locator(".fa.fa-sign-out").click()
  await page.waitForLoadState("networkidle");
  await page.close();
  

});

test.afterAll(async () => {
  await br.close();

  console.log("Browser closed");

});
test

("Sample Cart", async () => {
 
  const body = page.locator(".card-body");
  const productName = "IPHONE 13 PRO";


  await page.waitForSelector(".card-body", { state: "visible" });
  const titles: any = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const cn: any = await body.count();
  for (let i = 0; i < cn; ++i) {
    if ((await body.nth(i).locator("b").textContent()) === productName) {
      await body.nth(i).locator("text= Add To Cart").click();
      console.log("Added to Cart");

      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
 // await page.waitForSelector('div li', { state: 'visible' });

 
  try {
    await page.locator("div li").first().waitFor({
      state: "visible",
      timeout: 10000,
    });
  } catch (error) {
    console.error("Element not found or not visible within the timeout:", error);
  }
  const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
  expect(bool).toBeTruthy();

  await page.locator("button[type='button']").last().click();

  await expect(
    page.getByText(" Shipping Information ").filter({ visible: true })
  ).toBeVisible;

  await page
    .locator("input[placeholder='Select Country']")
    .pressSequentially("India");
  const fd = await page.locator("a:has-text('Place Order ')").isVisible();

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor({
    state: "visible", // Ensure the element is visible
    timeout: 5000,   // Optional: Increase timeout to 10 seconds
  });

  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  const button = page.locator('*:has-text("Place Order ")');

  await expect(fd).toBeTruthy;

  expect(page.locator("label[type='text']")).toHaveText("sreeb416@gmail.com");

  await page.locator(".action__submit").click();

  expect(
    page.getByText(" Shipping Information ").filter({ visible: true })
  ).toBeVisible();
  const OrderID: any = await page
    .locator("label[class='ng-star-inserted']")
    .textContent();
  const cleantext = await OrderID.replace(/[\s|]/g, "");
  console.log(cleantext);
  await page.locator("button[routerlink*='myorders']").click();

  //  await page.pause()
  await page.locator("tbody").waitFor();
  await page.waitForLoadState("networkidle");
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    console.log(rowOrderId);

    if (cleantext === rowOrderId) {
      await rows.nth(i).locator("button").first().click();
      break;
    } else console.log("No match element");
  }

  await page.locator(".col-text.-main").waitFor();

  const RetrieveId = await page.locator(".col-text.-main").textContent();

  expect(RetrieveId === cleantext).toBeTruthy();
});

// test("second Cart", async () => {

//   const body = page.locator(".card-body");
//   const productName = "IPHONE 13 PRO";

//   const titles: any = await page.locator(".card-body b").allTextContents();
//   console.log(titles);
//   const cn: any = await body.count();
//   for (let i = 0; i < cn; ++i) {
//     if ((await body.nth(i).locator("b").textContent()) === productName) {
//       await body.nth(i).locator("text= Add To Cart").click();
//       console.log("Added to Cart");

//       break;
//     }
//   }
//   await page.locator("[routerlink*='cart']").click();
//   try {
//     await page.locator("div li").first().waitFor({
//       state: "visible",
//       timeout: 10000,
//     });
//   } catch (error) {
//     console.error("Element not found or not visible within the timeout:", error);
//   }
//   const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
//   expect(bool).toBeTruthy();

//   await page.locator("button[type='button']").last().click();

//   await expect(
//     page.getByText(" Shipping Information ").filter({ visible: true })
//   ).toBeVisible;

//   await page
//     .locator("input[placeholder='Select Country']")
//     .pressSequentially("India");
//   const fd = await page.locator("a:has-text('Place Order ')").isVisible();

//   const dropdown = page.locator(".ta-results");
//   await dropdown.waitFor({
//     state: "visible", // Ensure the element is visible
//     timeout: 5000,   // Optional: Increase timeout to 10 seconds
//   });
//   const optionsCount = await dropdown.locator("button").count();
//   for (let i = 0; i < optionsCount; ++i) {
//     const text = await dropdown.locator("button").nth(i).textContent();
//     if (text === " India") {
//       await dropdown.locator("button").nth(i).click();
//       break;
//     }
//   }
//   const button = page.locator('*:has-text("Place Order ")');

//   await expect(fd).toBeTruthy;

//   expect(page.locator("label[type='text']")).toHaveText("sreeb416@gmail.com");

//   await page.locator(".action__submit").click();

//   expect(
//     page.getByText(" Shipping Information ").filter({ visible: true })
//   ).toBeVisible();
//   const OrderID: any = await page
//     .locator("label[class='ng-star-inserted']")
//     .textContent();
//   const cleantext = OrderID.replace(/[\s|]/g, "");
//   console.log(cleantext);
//   await page.locator("button[routerlink*='myorders']").click();

//   //  await page.pause()
//   await page.locator("tbody").waitFor();
//   await page.waitForLoadState("networkidle");
//   const rows = await page.locator("tbody tr");

//   for (let i = 0; i < (await rows.count()); ++i) {
//     const rowOrderId = await rows.nth(i).locator("th").textContent();
//     console.log(rowOrderId);

//     if (cleantext === rowOrderId) {
//       await rows.nth(i).locator("button").first().click();
//       break;
//     } else console.log("No match element");
//   }

//   await page.locator(".col-text.-main").waitFor();

//   const RetrieveId = await page.locator(".col-text.-main").textContent();

//   expect(RetrieveId === cleantext).toBeTruthy();
// });
