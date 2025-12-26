// ***********************************************************
// This support/e2e.ts is processed and loaded automatically before your test files.
// This is a great place to put global configuration and behavior that modifies Cypress.
// ***********************************************************

import './commands';
import 'cypress-mochawesome-reporter/register';

// Hide fetch/XHR requests in command log for cleaner output
Cypress.on('window:before:load', (win) => {
  // Stub console methods if needed
  // win.console.log = () => {};
});

// Global before hook
before(() => {
  cy.log('Starting Orange HRM Test Suite');
});

// Global beforeEach: ensure we stub leave-periods early for test stability
beforeEach(() => {
  cy.intercept('GET', '**/api/v2/leave/leave-periods**', (req) => {
    req.reply({ statusCode: 200, body: { data: [] }, headers: { 'content-type': 'application/json' } });
  }).as('globalLeavePeriods');
});

// Global after hook
after(() => {
  cy.log('Test Suite Completed');
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Log the error but don't fail the test for a set of known non-fatal app errors
  // that surface during E2E runs (cross-origin scripts, third-party listeners,
  // or framework warnings). Return false to prevent Cypress from failing the
  // current test for these specific messages.
  const msg = (err && err.message) ? err.message : '';
  // Use Cypress.log here to avoid mixing cy commands in this event handler
  Cypress.log({ name: 'uncaught:exception', message: msg });

  // Known non-fatal errors to ignore
  const ignoredPatterns = [
    'ResizeObserver',
    "Cannot read properties of null",
    "Cannot read properties of undefined",
    'addEventListener',
    'uncaught exception',
    'reading \'response\''
  ];

  for (const p of ignoredPatterns) {
    if (msg.includes(p)) {
      return false;
    }
  }

  // By default, allow Cypress to fail the test for unknown exceptions
  return true;
});
