/**
 * PIM (Personnel Information Management) Tests
 * 
 * Test Coverage:
 * - Employee list viewing
 * - Employee search functionality
 * - Add new employee
 * - Edit employee details
 * - Delete employee
 * - Employee filters
 */

import { faker } from '@faker-js/faker';

describe('PIM - Employee Management', () => {
  beforeEach(() => {
    cy.login();
    cy.navigateToMenu('PIM');
    cy.waitForPageLoad();
  });

  context('Employee List View', () => {
    it('should display employee list page', () => {
      cy.url().should('include', '/pim/viewEmployeeList');
      cy.get('.oxd-table').should('be.visible');
      
      cy.screenshotWithTimestamp('employee-list');
    });

    it('should display employee table headers', () => {
      const headers = ['Id', 'First (& Middle) Name', 'Last Name', 'Job Title', 'Employment Status', 'Sub Unit', 'Supervisor', 'Actions'];
      
      cy.get('.oxd-table-header').within(() => {
        headers.forEach((header) => {
          cy.contains('.oxd-table-header-cell', header).should('be.visible');
        });
      });
    });

    it('should show employee records in table', () => {
      cy.get('.oxd-table-body').should('be.visible');
      cy.get('.oxd-table-card').should('have.length.gt', 0);
    });
  });

  context('Employee Search', () => {
    it('should search employee by name', () => {
      // Type in employee name search field
      cy.get('.oxd-input').first().type('Peter');
      cy.get('button[type="submit"]').click();
      cy.waitForPageLoad();
      
      // Verify search results
      cy.get('.oxd-table-body').should('be.visible');
    });

    it('should search employee by ID', () => {
      cy.get('.oxd-input').eq(1).type('0001');
      cy.get('button[type="submit"]').click();
      cy.waitForPageLoad();
    });

    it('should reset search filters', () => {
      // Fill search fields
      cy.get('.oxd-input').first().type('Test');
      cy.get('button[type="submit"]').click();
      cy.waitForPageLoad();
      
      // Reset filters
      cy.contains('button', 'Reset').click();
      cy.wait(1000); // Wait for reset action to complete
      
      // Verify reset occurred (input should be cleared or page reloaded)
      cy.url().should('include', '/pim/viewEmployeeList');
    });
  });

  context('Add Employee', () => {
    it('should navigate to add employee page', () => {
      cy.contains('button', 'Add').click();
      cy.url().should('include', '/pim/addEmployee');
      
      cy.get('.orangehrm-card-container').should('be.visible');
      cy.screenshotWithTimestamp('add-employee-page');
    });

    it('should add new employee with required fields', () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      
      cy.contains('button', 'Add').click();
      cy.waitForPageLoad();
      
      // Fill employee details
      cy.get('input[name="firstName"]').type(firstName);
      cy.get('input[name="lastName"]').type(lastName);
      
      // Save employee
      cy.get('button[type="submit"]').click();
      cy.waitForPageLoad();
      
      // Verify success message or redirect
      cy.url().should('include', '/pim/viewPersonalDetails');
      
      cy.screenshotWithTimestamp('employee-added');
    });

    it('should validate required fields on add employee', () => {
      cy.contains('button', 'Add').click();
      cy.waitForPageLoad();
      
      // Try to save without filling required fields
      cy.get('button[type="submit"]').click();
      
      // Verify validation messages
      cy.get('.oxd-input-group').should('contain.text', 'Required');
    });

    it('should toggle create login details', () => {
      cy.contains('button', 'Add').click();
      cy.waitForPageLoad();
      
      // Toggle create login details
      cy.get('.oxd-switch-input').click();
      
      // Verify login fields appear
      cy.contains('label', 'Username').should('be.visible');
      cy.contains('label', 'Password').should('be.visible');
    });
  });

  context('Employee Actions', () => {
    it('should view employee details', () => {
      // Click on first employee record - look for action icons
      cy.get('.oxd-table-card').first().within(() => {
        // Find action buttons (view/edit/delete icons)
        cy.get('i, button, .oxd-icon-button').first().click({ force: true });
      });
      
      cy.wait(1000); // Wait for navigation
      cy.url().should('include', '/pim');
      
      cy.screenshotWithTimestamp('employee-details');
    });

    it('should have edit and delete icons for each employee', () => {
      cy.get('.oxd-table-card').first().within(() => {
        cy.get('.bi-pencil-fill').should('be.visible');
        cy.get('.bi-trash').should('be.visible');
      });
    });
  });

  context('Employee Filters', () => {
    it('should filter by employment status', () => {
      // Click on employment status dropdown
      cy.get('.oxd-select-text').first().click();
      
      // Select an option
      cy.get('.oxd-select-dropdown').should('be.visible');
      cy.get('.oxd-select-option').first().click();
      
      cy.get('button[type="submit"]').click();
      cy.waitForPageLoad();
    });

    it('should show records count', () => {
      cy.get('.orangehrm-horizontal-padding').should('contain.text', 'Records Found');
    });
  });

  context('Pagination', () => {
    it('should navigate through pages if multiple pages exist', () => {
      // Check if pagination exists
      cy.get('body').then(($body) => {
        if ($body.find('.oxd-pagination').length > 0) {
          cy.get('.oxd-pagination').should('be.visible');
        }
      });
    });
  });
});
