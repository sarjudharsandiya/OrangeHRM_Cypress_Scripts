/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to login to Orange HRM
     * @param username - Username for login
     * @param password - Password for login
     * @example cy.login('Admin', 'admin123')
     */
    login(username?: string, password?: string): Chainable<void>;

    /**
     * Custom command to logout from Orange HRM
     * @example cy.logout()
     */
    logout(): Chainable<void>;

    /**
     * Custom command to navigate to a specific menu item
     * @param menuName - Name of the menu item
     * @example cy.navigateToMenu('PIM')
     */
    navigateToMenu(menuName: string): Chainable<void>;

    /**
     * Custom command to wait for page load
     * @example cy.waitForPageLoad()
     */
    waitForPageLoad(): Chainable<void>;

    /**
     * Custom command to take a screenshot with timestamp
     * @param name - Screenshot name
     * @example cy.screenshotWithTimestamp('login-page')
     */
    screenshotWithTimestamp(name: string): Chainable<void>;

    /**
     * Custom command to fill form field by placeholder
     * @param placeholder - Placeholder text
     * @param value - Value to type
     * @example cy.fillByPlaceholder('Username', 'Admin')
     */
    fillByPlaceholder(placeholder: string, value: string): Chainable<void>;

    /**
     * Custom command to verify toast/notification message
     * @param message - Expected message text
     * @example cy.verifyToast('Successfully Saved')
     */
    verifyToast(message: string): Chainable<void>;
  }
}
