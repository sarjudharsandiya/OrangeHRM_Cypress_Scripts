/**
 * Login Flow Tests for Orange HRM
 * 
 * Test Coverage:
 * - Successful login with valid credentials
 * - Failed login with invalid credentials
 * - Empty credentials validation
 * - Session persistence
 * - Password visibility toggle
 * - Forgot password link
 * 
 */

describe('Authentication - Login Flow', () => {
  beforeEach(() => {
    cy.visit('/web/index.php/auth/login');
  });

  context('Successful Login Scenarios', () => {
    it('should successfully login with valid credentials', () => {
      cy.login();
      
      // Verify dashboard elements
      cy.get('.oxd-topbar-header-breadcrumb').should('contain', 'Dashboard');
      cy.get('.oxd-userdropdown-name').should('be.visible');
      
      // Verify navigation menu is visible
      cy.get('.oxd-main-menu').should('be.visible');
      
      
      cy.screenshotWithTimestamp('successful-login');
    });

    it('should maintain session after page reload', () => {
      cy.login();
      cy.reload();
      
      // Should still be logged in
      cy.url().should('include', '/dashboard');
      cy.get('.oxd-userdropdown-name').should('be.visible');
    });
  });

  context('Failed Login Scenarios', () => {
    it('should show error for invalid username', () => {
      cy.get('input[name="username"]').type('InvalidUser');
      cy.get('input[name="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
      
      cy.get('.oxd-alert-content').should('be.visible')
        .and('contain.text', 'Invalid credentials');
      
      cy.screenshotWithTimestamp('invalid-username');
    });

    it('should show error for invalid password', () => {
      cy.get('input[name="username"]').type('Admin');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      
      cy.get('.oxd-alert-content').should('be.visible')
        .and('contain.text', 'Invalid credentials');
    });

    it('should show validation for empty username', () => {
      cy.get('input[name="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
      
      cy.get('.oxd-input-group').first()
        .find('.oxd-text--span').should('contain.text', 'Required');
    });

    it('should show validation for empty password', () => {
      cy.get('input[name="username"]').type('Admin');
      cy.get('button[type="submit"]').click();
      
      cy.get('.oxd-input-group').eq(1)
        .find('.oxd-text--span').should('contain.text', 'Required');
    });

    it('should show validation for both empty fields', () => {
      cy.get('button[type="submit"]').click();
      
      cy.get('.oxd-text--span').should('have.length.at.least', 2)
        .and('contain.text', 'Required');
    });
  });

  context('UI/UX Features', () => {
    it('should have visible forgot password link', () => {
      cy.get('.orangehrm-login-forgot')
        .should('be.visible')
        .and('contain.text', 'Forgot your password');
    });

    it('should display login page logo and branding', () => {
      cy.get('.orangehrm-login-logo').should('be.visible');
      cy.get('.orangehrm-login-branding').should('be.visible');
    });

    it('should have proper input placeholders', () => {
      cy.get('input[name="username"]')
        .should('have.attr', 'placeholder', 'Username');
      cy.get('input[name="password"]')
        .should('have.attr', 'placeholder', 'Password');
    });
  });

  context('Security Features', () => {
    it('should mask password input', () => {
      cy.get('input[name="password"]')
        .should('have.attr', 'type', 'password');
    });

    it('should clear credentials on failed login', () => {
      cy.get('input[name="username"]').type('Admin');
      cy.get('input[name="password"]').type('wrong');
      cy.get('button[type="submit"]').click();
      
      cy.get('.oxd-alert-content').should('be.visible');
      // Credentials are cleared after failed login
      cy.get('input[name="username"]').should('have.value', '');
      cy.get('input[name="password"]').should('have.value', '');
    });
  });
});
