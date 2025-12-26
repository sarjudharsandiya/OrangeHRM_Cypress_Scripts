// ***********************************************
// Custom Cypress Commands
// ***********************************************

// Login command
Cypress.Commands.add('login', (username?: string, password?: string) => {
  const user = username || Cypress.env('username');
  const pass = password || Cypress.env('password');

  cy.visit('/web/index.php/auth/login');
  cy.get('input[name="username"]').clear().type(user);
  cy.get('input[name="password"]').clear().type(pass);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
  cy.get('.oxd-topbar-header-breadcrumb').should('be.visible');
});

// Logout command
Cypress.Commands.add('logout', () => {
  cy.get('.oxd-userdropdown-tab').click();
  cy.get('a[href="/web/index.php/auth/logout"]').click();
  cy.url().should('include', '/auth/login');
});

// Navigate to menu command
Cypress.Commands.add('navigateToMenu', (menuName: string) => {
  cy.get('.oxd-main-menu').contains(menuName).click();
  cy.waitForPageLoad();
});

// Wait for page load command
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('.oxd-loading-spinner', { timeout: 10000 }).should('not.exist');
  cy.wait(500); // Small buffer for stability
});

// Screenshot with timestamp
Cypress.Commands.add('screenshotWithTimestamp', (name: string) => {
  const timestamp = new Date().getTime();
  cy.screenshot(`${name}-${timestamp}`);
});

// Fill by placeholder
Cypress.Commands.add('fillByPlaceholder', (placeholder: string, value: string) => {
  cy.get(`input[placeholder*="${placeholder}"]`).clear().type(value);
});

// Verify toast message
Cypress.Commands.add('verifyToast', (message: string) => {
  cy.get('.oxd-toast-content').should('contain.text', message);
});