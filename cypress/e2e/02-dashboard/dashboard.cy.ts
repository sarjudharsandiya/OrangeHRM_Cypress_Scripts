/**
 * Dashboard Tests for Orange HRM
 * 
 * Test Coverage:
 * - Dashboard visibility after login
 * - Widget loading and display
 * - Quick launch menu
 * - Time at work widget
 * - Employee distribution chart
 * - Navigation from dashboard
 */

describe('Dashboard - Overview & Widgets', () => {
  beforeEach(() => {
    cy.login();
    cy.url().should('include', '/dashboard');
  });

  context('Dashboard Loading', () => {
    it('should display dashboard page with all core elements', () => {
      cy.waitForPageLoad();
      
      // Verify page title
      cy.get('.oxd-topbar-header-breadcrumb').should('contain', 'Dashboard');
      
      // Verify main dashboard container
      cy.get('.oxd-layout-context').should('be.visible');
      
      cy.screenshotWithTimestamp('dashboard-loaded');
    });

    it('should load without errors', () => {
      cy.waitForPageLoad();
      cy.get('.oxd-alert').should('not.exist');
    });
  });

  context('Dashboard Widgets', () => {
    it('should display Time at Work widget', () => {
      cy.waitForPageLoad();
      cy.contains('.orangehrm-dashboard-widget-name', 'Time at Work')
        .should('be.visible');
    });

    it('should display My Actions widget', () => {
      cy.waitForPageLoad();
      cy.contains('.orangehrm-dashboard-widget-name', 'My Actions')
        .should('be.visible');
    });

    it('should display Quick Launch section', () => {
      cy.waitForPageLoad();
      cy.contains('.orangehrm-dashboard-widget-name', 'Quick Launch')
        .should('be.visible');
    });

    it('should display Employee Distribution widget', () => {
      cy.waitForPageLoad();
      cy.contains('.orangehrm-dashboard-widget-name', 'Employee Distribution')
        .should('be.visible');
    });
  });

  context('Quick Launch Functionality', () => {
    it('should have quick launch action buttons', () => {
      cy.waitForPageLoad();
      
      // Check for quick launch buttons
      cy.get('.orangehrm-dashboard-widget').contains('Quick Launch')
        .parents('.orangehrm-dashboard-widget').first()
        .within(() => {
          cy.get('.orangehrm-dashboard-widget-body').should('be.visible');
        });
    });
  });

  context('Navigation from Dashboard', () => {
    it('should navigate to different modules from sidebar', () => {
      const modules = ['Admin', 'PIM', 'Leave', 'Time'];
      
      modules.forEach((module) => {
        cy.get('.oxd-main-menu').contains(module).should('be.visible');
      });
    });

    it('should highlight current page in navigation', () => {
      cy.get('.oxd-main-menu-item').should('exist').and('have.length.at.least', 1);
    });
  });

  context('User Information', () => {
    it('should display user profile in header', () => {
      cy.get('.oxd-userdropdown-name').should('be.visible');
    });

    it('should display user dropdown menu', () => {
      cy.get('.oxd-userdropdown-tab').click();
      
      cy.get('.oxd-userdropdown-link').should('have.length.gt', 0);
      cy.contains('.oxd-userdropdown-link', 'About').should('be.visible');
      cy.contains('.oxd-userdropdown-link', 'Support').should('be.visible');
      cy.contains('.oxd-userdropdown-link', 'Change Password').should('be.visible');
      cy.contains('.oxd-userdropdown-link', 'Logout').should('be.visible');
    });
  });

  context('Responsive Behavior', () => {
    it('should adapt to different viewport sizes', () => {
      const viewports: Cypress.ViewportPreset[] = ['ipad-2', 'iphone-x'];
      
      viewports.forEach((viewport) => {
        cy.viewport(viewport);
        cy.waitForPageLoad();
        cy.get('.oxd-topbar-header-breadcrumb').should('be.visible');
      });
      
      // Reset to default
      cy.viewport(1920, 1080);
    });
  });
});
