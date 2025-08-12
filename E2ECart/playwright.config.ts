import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/',  // ✅ Target only your spec files
  fullyParallel: true,
  retries: 2,
  forbidOnly: false,

  //timeout: 30 * 1000, // ✅ Set a reasonable timeout for each test
  
  
  workers:  2 ,
  reporter: 'html',

  projects: [
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        trace: 'on',
        screenshot: 'on',
        viewport: { width: 1700, height: 1000 },
        navigationTimeout: 60000, // Increase navigation timeout to 60 seconds
        ignoreHTTPSErrors: true, // Ignore HTTPS errors
        permissions: ['geolocation'], // Allow geolocation permissions
        colorScheme: 'light', // Set color scheme to dark
        video: 'on-first-retry', // Record video on failure
      },
    },
    {
     name: 'Chrome Worker',
      use: {
        ...devices['Desktop Chrome'],
        headless: false, // Run in headful mode for debugging
        trace: 'on',
        screenshot: 'on',
        viewport: { width: 1920, height: 1080 },
        navigationTimeout: 60000, // Increase navigation timeout to 60 seconds
        ignoreHTTPSErrors: true, // Ignore HTTPS errors
        permissions: ['geolocation'], // Allow geolocation permissions
        colorScheme: 'light', // Set color scheme to light
        channel: 'chrome', // ✅ Force actual Chrome (not just Chromium)


      },
    },
    
  ],
});
