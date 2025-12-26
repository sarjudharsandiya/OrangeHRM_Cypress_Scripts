/**
 * Page Object Model for PIM (Employee Management) Page
 */

export class PIMPage {
  private selectors = {
    addButton: 'button:contains("Add")',
    searchButton: 'button[type="submit"]',
    resetButton: 'button:contains("Reset")',
    employeeTable: '.oxd-table',
    employeeNameInput: '.oxd-input',
    firstNameInput: 'input[name="firstName"]',
    lastNameInput: 'input[name="lastName"]',
    saveButton: 'button[type="submit"]',
    deleteIcon: '.bi-trash',
    editIcon: '.bi-pencil-fill',
  };

  visit() {
    cy.visit('/web/index.php/pim/viewEmployeeList');
  }

  clickAddEmployee() {
    cy.contains('button', 'Add').click();
  }

  fillEmployeeName(firstName: string, lastName: string) {
    cy.get(this.selectors.firstNameInput).type(firstName);
    cy.get(this.selectors.lastNameInput).type(lastName);
  }

  clickSave() {
    cy.get(this.selectors.saveButton).click();
  }

  searchByName(name: string) {
    cy.get(this.selectors.employeeNameInput).first().type(name);
    cy.get(this.selectors.searchButton).click();
  }

  resetSearch() {
    cy.contains('button', 'Reset').click();
  }

  shouldShowEmployeeTable() {
    cy.get(this.selectors.employeeTable).should('be.visible');
  }
}
