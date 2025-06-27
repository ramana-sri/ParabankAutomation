// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 70*1000,   
  reporter: [['html'],['allure-playwright']],
  globalTeardown: require.resolve('./global-teardown.js'),
  use: { 
    viewport: { width: 1280, height: 680 },
    browserName:'chromium',
    baseURL: "https://parabank.parasoft.com/",
    headless:false,
    trace:'on',
    screenshot: 'on',
    video:'on',
    launchOptions:{
      args:["--start-fullscreen"]
    },
  },
   /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    
   
  ],
});

