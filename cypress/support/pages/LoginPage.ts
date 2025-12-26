/**
 * Page Object Model for Login Page
 * This follows the Page Object pattern for better test maintainability
 */

export class LoginPage {
  // Selectors
  private selectors = {
    usernameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    submitButton: 'button[type="submit"]',
    forgotPasswordLink: '.orangehrm-login-forgot',
    loginLogo: '.orangehrm-login-logo',
    errorAlert: '.oxd-alert-content',
    validationMessage: '.oxd-text--span',
  };

  // Actions
  visit() {
    cy.visit('/web/index.php/auth/login');
  }

  fillUsername(username: string) {
    cy.get(this.selectors.usernameInput).clear().type(username);
  }

  fillPassword(password: string) {
    cy.get(this.selectors.passwordInput).clear().type(password);
  }

  clickSubmit() {
    cy.get(this.selectors.submitButton).click();
  }

  login(username: string, password: string) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickSubmit();
  }

  // Assertions
  shouldShowErrorMessage(message: string) {
    cy.get(this.selectors.errorAlert)
      .should('be.visible')
      .and('contain.text', message);
  }

  shouldShowValidationError() {
    cy.get(this.selectors.validationMessage).should('contain.text', 'Required');
  }

  shouldRedirectToDashboard() {
    cy.url().should('include', '/dashboard');
  }
}
