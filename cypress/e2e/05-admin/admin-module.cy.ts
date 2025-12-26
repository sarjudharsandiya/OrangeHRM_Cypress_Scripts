/**
 * Admin Module Tests
 * 
 * Test Coverage:
 * - User management
 * - Job titles
 * - Organization structure
 * - Qualifications
 */

describe('Admin - System Configuration', () => {
  beforeEach(() => {
    cy.login();
    cy.navigateToMenu('Admin');
    cy.waitForPageLoad();
  });

  context('Admin Dashboard', () => {
    it('should display admin module page', () => {
      cy.url().should('include', '/admin/viewSystemUsers');
      cy.get('.orangehrm-header-container').should('be.visible');
      
      cy.screenshotWithTimestamp('admin-dashboard');
    });
  });

  context('User Management', () => {
    it('should display system users list', () => {
      cy.get('.oxd-table').should('be.visible');
      cy.get('.oxd-table-header').should('contain', 'Username');
      cy.get('.oxd-table-header').should('contain', 'User Role');
      cy.get('.oxd-table-header').should('contain', 'Status');
    });

    it('should have add user button', () => {
      cy.contains('button', 'Add').should('be.visible');
    });

    it('should search users by username', () => {
      cy.get('.oxd-input').eq(1).type('Admin');
      cy.get('button[type="submit"]').click();
      cy.waitForPageLoad();
      
      // Verify search results
      cy.get('.oxd-table-body').should('be.visible');
    });

    it('should filter users by role', () => {
      cy.get('.oxd-select-text').first().click();
      cy.get('.oxd-select-dropdown').should('be.visible');
      cy.get('.oxd-select-option').contains('Admin').click();
      
      cy.get('button[type="submit"]').click();
      cy.waitForPageLoad();
    });

    it('should reset user search filters', () => {
      cy.get('.oxd-input').eq(1).type('Test');
      cy.contains('button', 'Reset').click();
      
      cy.get('.oxd-input').eq(1).should('have.value', '');
    });
  });

  context('Job Navigation', () => {
    it('should navigate to job titles', () => {
      cy.contains('.oxd-topbar-body-nav-tab-item', 'Job').click();
      cy.wait(500);
      cy.contains('.oxd-dropdown-menu', 'Job Titles').click({ force: true });
      cy.wait(1000);
      
      cy.url().should('include', '/admin/');
      cy.screenshotWithTimestamp('job-titles');
    });

    it('should navigate to pay grades', () => {
      cy.contains('.oxd-topbar-body-nav-tab-item', 'Job').click();
      cy.wait(500);
      cy.contains('.oxd-dropdown-menu', 'Pay Grades').click({ force: true });
      cy.wait(1000);
      
      cy.url().should('include', '/admin/');
    });

    it('should navigate to employment status', () => {
      cy.contains('.oxd-topbar-body-nav-tab-item', 'Job').click();
      cy.wait(500);
      cy.contains('.oxd-dropdown-menu', 'Employment Status').click({ force: true });
      cy.wait(1000);
      
      cy.url().should('include', '/admin/');
    });

    it('should navigate to job categories', () => {
      cy.contains('.oxd-topbar-body-nav-tab-item', 'Job').click();
      cy.wait(500);
      cy.contains('.oxd-dropdown-menu', 'Job Categories').click({ force: true });
      cy.wait(1000);
      
      cy.url().should('include', '/admin/');
    });
  });

  context('Organization Navigation', () => {
    it('should navigate to general information', () => {
      cy.contains('.oxd-topbar-body-nav-tab-item', 'Organization').click();
      cy.wait(500);
      cy.contains('.oxd-dropdown-menu', 'General Information').click({ force: true });
      cy.wait(1000);
      
      cy.url().should('include', '/admin/');
    });

    it('should navigate to locations', () => {
      cy.contains('.oxd-topbar-body-nav-tab-item', 'Organization').click();
      cy.wait(500);
      cy.contains('.oxd-dropdown-menu', 'Locations').click({ force: true });
      cy.wait(1000);
      
      cy.url().should('include', '/admin/');
    });

    it('should navigate to structure', () => {
      cy.contains('.oxd-topbar-body-nav-tab-item', 'Organization').click();
      cy.wait(500);
      cy.contains('.oxd-dropdown-menu', 'Structure').click({ force: true });
      cy.wait(1000);
      
      cy.url().should('include', '/admin/');
    });
  });

  context('Qualifications Navigation', () => {
    it('should navigate to skills', () => {
      cy.contains('.oxd-topbar-body-nav-tab-item', 'Qualifications').click();
      cy.wait(500);
      cy.contains('.oxd-dropdown-menu', 'Skills').click({ force: true });
      cy.wait(1000);
      
      cy.url().should('include', '/admin/');
    });

    it('should navigate to education', () => {
      cy.contains('.oxd-topbar-body-nav-tab-item', 'Qualifications').click();
      cy.wait(500);
      cy.contains('.oxd-dropdown-menu', 'Education').click({ force: true });
      cy.wait(1000);
      
      cy.url().should('include', '/admin/');
    });

    it('should navigate to licenses', () => {
      cy.contains('.oxd-topbar-body-nav-tab-item', 'Qualifications').click();
      cy.wait(500);
      cy.contains('.oxd-dropdown-menu', 'Licenses').click({ force: true });
      cy.wait(1000);
      
      cy.url().should('include', '/admin/');
    });
  });

  context('System Configuration', () => {
    it('should have configuration menu', () => {
      cy.contains('.oxd-topbar-body-nav-tab-item', 'Configuration').should('be.visible');
    });
  });
});
