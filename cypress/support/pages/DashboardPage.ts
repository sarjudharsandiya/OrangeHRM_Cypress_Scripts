/**
 * Page Object Model for Dashboard Page
 */

export class DashboardPage {
  private selectors = {
    breadcrumb: '.oxd-topbar-header-breadcrumb',
    mainMenu: '.oxd-main-menu',
    userDropdown: '.oxd-userdropdown-tab',
    dashboardWidgets: '.orangehrm-dashboard-widget',
    loadingSpinner: '.oxd-loading-spinner',
  };

  visit() {
    cy.visit('/web/index.php/dashboard/index');
  }

  waitForLoad() {
    cy.get(this.selectors.loadingSpinner, { timeout: 10000 }).should('not.exist');
  }

  shouldBeVisible() {
    cy.url().should('include', '/dashboard');
    cy.get(this.selectors.breadcrumb).should('contain', 'Dashboard');
  }

  navigateToModule(moduleName: string) {
    cy.get(this.selectors.mainMenu).contains(moduleName).click();
    this.waitForLoad();
  }

  openUserDropdown() {
    cy.get(this.selectors.userDropdown).click();
  }

  shouldShowWidgets() {
    cy.get(this.selectors.dashboardWidgets).should('have.length.gt', 0);
  }
}
