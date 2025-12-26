import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    screenshotOnRunFailure: true,
    videoCompression: 32,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    env: {
      username: 'Admin',
      password: 'admin123',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      return config;
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: 'Orange HRM Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
});
