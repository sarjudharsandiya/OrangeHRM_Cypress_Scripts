/**
 * Logout Flow Tests
 *
 * Test Coverage:
 * - Successful logout
 * - Session termination
 * - Protected route access after logout
 */

describe('Authentication - Logout Flow', () => {
  beforeEach(() => {
    // Handle uncaught exceptions from the application
    cy.on('uncaught:exception', (err) => {
      // Return false to prevent test failure on this specific error
      if (err.message.includes('Cannot read properties of undefined')) {
        return false;
      }
      return true;
    });

    cy.login();
  });

  it('should successfully logout and redirect to login page', () => {
    cy.logout();

    // Verify redirected to login page
    cy.url().should('include', '/auth/login');
    cy.get('input[name="username"]').should('be.visible');

    cy.screenshotWithTimestamp('successful-logout');
  });

  it('should clear session after logout', () => {
    cy.logout();

    // Try to access protected route
    cy.visit('/web/index.php/dashboard/index');

    // Should redirect to login
    cy.url().should('include', '/auth/login');
  });

  it('should display user dropdown before logout', () => {
    cy.get('.oxd-userdropdown-tab').click();
    cy.get('.oxd-userdropdown-link').should('have.length.gt', 0);
    cy.contains('.oxd-userdropdown-link', 'Logout').should('be.visible');
  });

  it('should close dropdown when clicking elsewhere', () => {
    cy.get('.oxd-userdropdown-tab').click();
    cy.get('.oxd-userdropdown-link').should('be.visible');
    // Close dropdown by clicking elsewhere (avoids triggering cross-origin listeners)
    cy.get('body').click({ force: true });
    // small wait to allow UI to update
    cy.wait(300);
    // Dropdown links should no longer be visible
    cy.get('body').then(($body) => {
      if ($body.find('.oxd-userdropdown-link').length > 0) {
        cy.get('.oxd-userdropdown-link').should('not.be.visible');
      } else {
        // If the DOM node was removed, that's acceptable
        expect($body.find('.oxd-userdropdown-link').length).to.equal(0);
      }
    });
  });
});
