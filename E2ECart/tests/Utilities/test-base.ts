import { test as base } from "@playwright/test";

// Custom fixture for test data
type TestData = {
  username: string;
  password: string;
  product1: string;
  Country: string;
};

export const Customtest = base.extend<{
  testDataForOrder: TestData;
}>({
  page: async ({ page }, use) => {
    await page.setViewportSize({ width: 1536, height: 864 });
    await use(page);
  },
  testDataForOrder: async ({}, use) => {
    // You can load from JSON or define here
    const testData: TestData = {
      username: "sreeb416@gmail.com",
      password: "test1234",
      product1: "IPHONE 13 PRO",
      Country: "India"
    };
     

    await use(testData);
  }
});
