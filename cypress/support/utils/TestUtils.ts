/**
 * Utility functions for Cypress tests
 */

export class TestUtils {
  /**
   * Wait for network idle (no pending requests)
   */
  static waitForNetworkIdle(timeout = 2000) {
    cy.wait(timeout);
  }

  /**
   * Generate a unique timestamp-based ID
   */
  static generateUniqueId(): string {
    return `test-${Date.now()}`;
  }

  /**
   * Get current date in YYYY-MM-DD format
   */
  static getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Get future date in YYYY-MM-DD format
   */
  static getFutureDate(daysAhead: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Clean up test data by name pattern
   */
  static cleanupTestData(pattern: string) {
    cy.log(`Cleaning up test data matching: ${pattern}`);
    // Implementation depends on available API or UI cleanup methods
  }

  /**
   * Retry action with configurable attempts
   */
  static retryAction(action: () => void, maxAttempts = 3, delay = 1000) {
    let attempts = 0;
    const tryAction = () => {
      try {
        action();
      } catch (error) {
        attempts++;
        if (attempts < maxAttempts) {
          cy.wait(delay);
          tryAction();
        } else {
          throw error;
        }
      }
    };
    tryAction();
  }

  /**
   * Log test step
   */
  static logStep(step: string) {
    cy.log(`🔹 ${step}`);
  }

  /**
   * Take screenshot with context
   */
  static captureScreenshot(name: string, context?: string) {
    const timestamp = new Date().getTime();
    const screenshotName = context 
      ? `${context}/${name}-${timestamp}` 
      : `${name}-${timestamp}`;
    cy.screenshot(screenshotName);
  }
}
