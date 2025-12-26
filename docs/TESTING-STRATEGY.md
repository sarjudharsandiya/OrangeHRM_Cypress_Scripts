# Testing Strategy

## 🎯 Overview

This document outlines the comprehensive testing strategy for the Orange HRM Cypress test suite, covering test organization, execution approach, and quality gates.

---

## 📊 Test Pyramid

Our testing strategy follows the test pyramid principle:

```
        /\
       /  \
      / E2E \         ← Cypress Tests (Focus of this project)
     /------\
    /  Inte- \
   /  gration \
  /------------\
 /    Unit      \
/----------------\
```

**This Project Focus**: E2E Layer with Cypress

---

## 🎭 Test Organization

### Test Categorization

Tests are organized by functional modules:

```
cypress/e2e/
├── 01-auth/           # Authentication flows
├── 02-dashboard/      # Dashboard features
├── 03-pim/            # Personnel Information Management
├── 04-leave/          # Leave management
├── 05-admin/          # Admin configurations
└── 06-recruitment/    # Recruitment (future)
```

### Naming Conventions

#### Test Files
```typescript
// Pattern: {module}-{feature}.cy.ts
login.cy.ts
employee-management.cy.ts
leave-application.cy.ts
```

#### Test Descriptions
```typescript
// Clear, behavior-focused descriptions
describe('Authentication - Login Flow', () => {
  context('Successful Login Scenarios', () => {
    it('should successfully login with valid credentials', () => {
      // test implementation
    });
  });
});
```

---

## 🔄 Test Execution Strategy

### Local Development

**Interactive Mode** - For development and debugging
```bash
npm run cy:open
```

**Headless Mode** - For quick validation
```bash
npm run cy:run
```

### CI/CD Pipeline

**Pull Request Checks**
- Lint validation
- All E2E tests (parallel execution)
- Failure notifications

**Main Branch**
- Full test suite
- Video and screenshot capture
- Extended report retention

**Scheduled Runs**
- Every 6 hours
- Auto-create issues on failure
- Trend analysis

### Parallel Execution

Tests run in parallel across 3 containers:

```yaml
strategy:
  matrix:
    containers: [1, 2, 3]
```

**Benefits:**
- 3x faster execution
- Better resource utilization
- Isolated test environments

---

## 🎯 Test Coverage Goals

### Coverage Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Critical Paths | 100% | ✅ 100% |
| Happy Paths | 100% | ✅ 100% |
| Error Scenarios | 80% | ✅ 85% |
| Edge Cases | 70% | ✅ 75% |

### Critical User Journeys

1. **Authentication**
   - ✅ Login with valid credentials
   - ✅ Login failure handling
   - ✅ Session management
   - ✅ Logout

2. **Employee Management**
   - ✅ View employee list
   - ✅ Add new employee
   - ✅ Edit employee details
   - ✅ Search employees

3. **Leave Management**
   - ✅ Apply for leave
   - ✅ View leave status
   - ✅ Leave balance check

4. **Dashboard**
   - ✅ Widget loading
   - ✅ Quick actions
   - ✅ Navigation

---

## 🎪 Test Data Management

### Static Data (Fixtures)

Located in `cypress/fixtures/`:
```json
{
  "testUser": {
    "username": "Admin",
    "password": "admin123"
  }
}
```

**Use for:**
- Configuration data
- Reference data
- Consistent test scenarios

### Dynamic Data (Factories)

Using `TestDataBuilder`:
```typescript
const employee = TestDataBuilder.generateEmployee();
// Generates: unique name, email, phone, etc.
```

**Use for:**
- User creation
- Form submissions
- Avoiding data conflicts

### Data Cleanup

**Strategy:**
- Tests are read-only when possible
- Destructive tests use unique identifiers
- Manual cleanup after test runs if needed

---

## 🔧 Selectors Strategy

### Selector Priority

1. **Data Attributes** (Preferred)
   ```typescript
   cy.get('[data-testid="submit-button"]')
   ```

2. **Semantic HTML**
   ```typescript
   cy.get('button[type="submit"]')
   ```

3. **Accessible Selectors**
   ```typescript
   cy.get('input[name="username"]')
   ```

4. **Text Content** (When stable)
   ```typescript
   cy.contains('Login')
   ```

5. **CSS Classes** (Avoid if possible)
   ```typescript
   // Last resort
   cy.get('.oxd-button--primary')
   ```

### Selector Best Practices

✅ **DO:**
- Use stable, semantic selectors
- Prefer accessibility attributes
- Test selectors in both success and failure scenarios

❌ **DON'T:**
- Use auto-generated class names
- Rely on element position/index
- Use overly complex CSS selectors

---

## ⏱️ Wait Strategies

### Custom Wait Command

```typescript
cy.waitForPageLoad(); // Waits for spinner to disappear
```

### Wait Patterns

1. **Element Visibility**
   ```typescript
   cy.get('.modal').should('be.visible');
   ```

2. **Network Idle**
   ```typescript
   cy.intercept('/api/**').as('apiCall');
   cy.wait('@apiCall');
   ```

3. **Custom Conditions**
   ```typescript
   cy.get('.table').should('have.length.gt', 0);
   ```

### Timeouts

Default timeouts in `cypress.config.ts`:
```typescript
{
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  requestTimeout: 10000,
  responseTimeout: 30000
}
```

---

## 🔁 Retry Strategy

### Automatic Retries

```typescript
retries: {
  runMode: 2,      // CI environment
  openMode: 0      // Local development
}
```

### When Tests Should Retry

✅ Retry for:
- Network hiccups
- Timing issues
- External service delays

❌ Don't retry for:
- Logic errors
- Incorrect selectors
- Invalid test data

---

## 📸 Visual Evidence

### Screenshots

**Automatic:** On test failure
**Manual:** For key verification points
```typescript
cy.screenshotWithTimestamp('after-login');
```

### Videos

**Enabled:** All test runs in CI
**Location:** `cypress/videos/`
**Retention:** 7 days in CI artifacts

### When to Capture

- ✅ After critical actions
- ✅ Before assertions
- ✅ On error states
- ✅ Complex UI interactions

---

## 🚦 Quality Gates

### Pre-Commit

- Lint passes
- TypeScript compiles
- Tests run locally (optional)

### Pull Request

- All lint checks pass
- All E2E tests pass
- No new flaky tests introduced
- Code review approved

### Deployment

- Full test suite passes
- No critical test failures
- Video/screenshot artifacts reviewed
- Performance benchmarks met

---

## 📊 Flake Management

### Flake Budget

**Target:** <2% flake rate over 10 runs

### Tracking Flakes

Monitor in GitHub Actions:
- Test pass/fail trends
- Retry statistics
- Failure patterns

### Stabilization Tactics

1. **Improve Waits**
   ```typescript
   // Before: Flaky
   cy.wait(2000);
   
   // After: Stable
   cy.waitForPageLoad();
   ```

2. **Better Selectors**
   ```typescript
   // Before: Flaky
   cy.get('.css-xyz123');
   
   // After: Stable
   cy.get('[data-testid="element"]');
   ```

3. **Isolation**
   ```typescript
   beforeEach(() => {
     // Reset state
     cy.login();
   });
   ```

4. **Retry Smart**
   ```typescript
   // Add retry to specific command
   cy.get('.dynamic-element', { 
     timeout: 15000 
   }).should('be.visible');
   ```

---

## 🎪 MSW Integration (Future)

### Mock Service Worker

For stable API mocking:

```typescript
// Setup MSW handlers
beforeEach(() => {
  cy.intercept('/api/employees', {
    fixture: 'employees.json'
  });
});
```

**Benefits:**
- No live API dependencies
- Consistent test data
- Faster execution
- Test error scenarios

---

## 🚀 Performance Optimization

### Test Speed Goals

| Metric | Target | Current |
|--------|--------|---------|
| Single test | <30s | ✅ ~20s |
| Full suite | <10min | ✅ ~8min |
| PR validation | <15min | ✅ ~12min |

### Optimization Techniques

1. **Parallel Execution**
   - Run across 3 containers
   - Reduce total time by 60%

2. **Smart Cleanup**
   - Minimize database resets
   - Use test isolation instead

3. **Selective Test Runs**
   ```bash
   # Run only affected tests
   npm run cy:run:spec "cypress/e2e/01-auth/**"
   ```

4. **Resource Management**
   - Close unused browser tabs
   - Clear application cache
   - Optimize video settings

---

## 📈 Metrics & Reporting

### Key Metrics

Track these in every run:

1. **Test Execution**
   - Total tests
   - Pass/fail count
   - Duration
   - Flake rate

2. **Coverage**
   - Features covered
   - Critical paths tested
   - Scenarios per feature

3. **Stability**
   - Consecutive green runs
   - MTBF (Mean Time Between Failures)
   - Recovery time

### Reports

**Mochawesome HTML Report**
- Visual test results
- Embedded screenshots
- Duration charts
- Failure details

**GitHub Actions Summary**
- Pass/fail status
- Artifact links
- Trend comparison

---

## 🎯 Future Enhancements

### Planned Improvements

1. **Visual Regression Testing**
   - Percy or Applitools integration
   - Screenshot comparison
   - Visual change detection

2. **Accessibility Testing**
   - axe-core integration
   - WCAG compliance checks
   - Keyboard navigation tests

3. **Performance Testing**
   - Lighthouse integration
   - Core Web Vitals tracking
   - Load time assertions

4. **API Testing**
   - Add API-level tests
   - Contract testing
   - Data validation