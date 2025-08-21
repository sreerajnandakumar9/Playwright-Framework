import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/',  // ✅ Target only your spec files
  fullyParallel: false,
  retries: 2,
  forbidOnly: false,

  //timeout: 30 * 1000, // ✅ Set a reasonable timeout for each test
  
  
  workers:  1 ,
  reporter: 'html',
  

  projects: [
    // {
    //   name: 'chromium',
    //   use: {
    //     browserName: 'chromium',
    //     headless: false,
    //     trace: 'on',
    //     screenshot: 'on',
    //     viewport: { width: 1700, height: 1000 },
    //     navigationTimeout: 60000, // Increase navigation timeout to 60 seconds
    //     ignoreHTTPSErrors: true, // Ignore HTTPS errors
    //     colorScheme: 'light', // Set color scheme to dark
    //     video: 'on-first-retry', // Record video on failure
    //   },
    // },
    {
     name: 'Chrome Worker',
      use: {
        ...devices['Desktop Chrome'],
        headless: false, // Run in headful mode for debugging
        trace: 'on',
        screenshot: 'on',
        video: 'on-first-retry', // Record video on failure
        viewport: { width: 1700, height: 1000 },
        navigationTimeout: 60000, // Increase navigation timeout to 60 seconds
        ignoreHTTPSErrors: true, // Ignore HTTPS errors
        colorScheme: 'light', // Set color scheme to light
        channel: 'chrome', // ✅ Force actual Chrome (not just Chromium)
      launchOptions: {
          slowMo: 500, // 200ms delay between each action
          //args: ['--start-maximized']

      },
    },
  }
  ],
});
