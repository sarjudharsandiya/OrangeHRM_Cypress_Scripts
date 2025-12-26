# Guide

---

## 📋 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the project
- Show empathy towards others

---

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/OrangeHRM_Cypress_Scripts.git
cd OrangeHRM_Cypress_Scripts
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number
```

---

## 🎯 How to Contribute

### Types of Contributions

1. **Bug Fixes** - Fix failing or flaky tests
2. **New Tests** - Add test coverage
3. **Documentation** - Improve guides and comments
4. **Performance** - Optimize test execution
5. **Tools** - Enhance utilities and helpers

---

## ✅ Contribution Checklist

### Before You Start

- [ ] Check existing issues/PRs for duplicates
- [ ] Create or comment on an issue describing your change
- [ ] Get approval for large changes
- [ ] Read this contributing guide

### While Working

- [ ] Follow project code style
- [ ] Write meaningful commit messages
- [ ] Add tests for new features
- [ ] Update documentation
- [ ] Test locally before pushing

### Before Submitting PR

- [ ] Run all tests: `npm run cy:run`
- [ ] Run linter: `npm run lint`
- [ ] Run formatter: `npm run format`
- [ ] Update README if needed
- [ ] Add yourself to contributors

---

## 📝 Code Style Guide

### TypeScript

```typescript
// Use meaningful variable names
const employeeData = TestDataBuilder.generateEmployee(); // ✅
const data = TestDataBuilder.generateEmployee();         // ❌

// Prefer const over let
const username = 'Admin';  // ✅
let username = 'Admin';    // ❌

// Use arrow functions
const login = () => {      // ✅
  cy.login();
};
function login() {         // ❌
  cy.login();
}
```

### Test Structure

```typescript
describe('Module - Feature', () => {
  beforeEach(() => {
    // Setup
  });

  context('Scenario Category', () => {
    it('should do something specific', () => {
      // Arrange
      cy.visit('/page');
      
      // Act
      cy.get('button').click();
      
      // Assert
      cy.url().should('include', '/result');
    });
  });
});
```

### Naming Conventions

```typescript
// Test files
login.cy.ts                    // ✅
LoginTest.cy.ts               // ❌

// Page Objects
LoginPage.ts                  // ✅
login-page.ts                 // ❌

// Custom commands
cy.login()                    // ✅
cy.loginToApplication()       // ❌ (too verbose)

// Test descriptions
it('should login with valid credentials')     // ✅
it('login test')                              // ❌
```

---

## 🔧 Development Workflow

### 1. Write Tests

Create test file:
```bash
touch cypress/e2e/XX-module/feature.cy.ts
```

Write test:
```typescript
describe('Feature Name', () => {
  it('should work correctly', () => {
    // Test implementation
  });
});
```

### 2. Test Locally

```bash
# Interactive mode
npm run cy:open

# Headless mode
npm run cy:run:spec -- "cypress/e2e/XX-module/feature.cy.ts"
```

### 3. Run Quality Checks

```bash
# Lint
npm run lint

# Format
npm run format

# All tests
npm run cy:run
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add employee search tests"
```

**Commit Message Format:**
```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Test updates
- `chore`: Maintenance

**Examples:**
```
feat: add leave application tests
fix: resolve flaky dashboard test
docs: update README with new commands
refactor: migrate to Page Object Model
```

### 5. Push & Create PR

```bash
git push origin feature/your-feature-name
```

Then create Pull Request on GitHub.

---

## 📥 Pull Request Process

### PR Title Format

```
[Type] Brief description

Examples:
[Feature] Add recruitment module tests
[Fix] Resolve timeout in employee search
[Docs] Add API testing guide
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tests pass locally
- [ ] New tests added
- [ ] Existing tests updated

## Screenshots/Videos
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process

1. **Automated Checks**
   - Linting
   - Test execution
   - Build verification

2. **Code Review**
   - At least 1 approval required
   - Address all comments
   - Keep discussion constructive

3. **Merge**
   - Squash and merge preferred
   - Delete branch after merge

---

## 🧪 Testing Guidelines

### Test Quality Standards

#### Good Test Example

```typescript
it('should successfully create new employee', () => {
  // Arrange
  const employee = TestDataBuilder.generateEmployee();
  cy.navigateToMenu('PIM');
  cy.contains('button', 'Add').click();
  
  // Act
  cy.get('input[name="firstName"]').type(employee.firstName);
  cy.get('input[name="lastName"]').type(employee.lastName);
  cy.get('button[type="submit"]').click();
  
  // Assert
  cy.waitForPageLoad();
  cy.url().should('include', '/viewPersonalDetails');
  cy.verifyToast('Successfully Saved');
  
  cy.screenshotWithTimestamp('employee-created');
});
```

#### Checklist

- ✅ Clear test description
- ✅ Proper arrangement (setup)
- ✅ Single action being tested
- ✅ Meaningful assertions
- ✅ No hard-coded waits
- ✅ Uses helper functions
- ✅ Independent from other tests

### Anti-Patterns to Avoid

```typescript
// ❌ Don't use hard-coded waits
cy.wait(5000);

// ✅ Use proper waits
cy.waitForPageLoad();

// ❌ Don't use fragile selectors
cy.get('.css-abc123');

// ✅ Use stable selectors
cy.get('[data-testid="submit"]');

// ❌ Don't create test dependencies
it('test 1', () => { /* creates data */ });
it('test 2', () => { /* uses data from test 1 */ });

// ✅ Make tests independent
beforeEach(() => { /* setup data */ });
```

---

## 📚 Documentation

### When to Update Docs

Update documentation when:
- Adding new features
- Changing existing behavior
- Adding new commands
- Updating dependencies
- Fixing bugs that need explanation

### Documentation Files

- `README.md` - Main project overview
- `docs/GETTING-STARTED.md` - Setup guide
- `docs/TESTING-STRATEGY.md` - Test approach 
---

**Environment**
- OS: [e.g. macOS 13]
- Browser: [e.g. Chrome 120]
- Cypress: [e.g. 13.6.2]
- Node: [e.g. 20.10.0]

```

---

### Project-Specific

- Review existing tests in `cypress/e2e/`
- Study Page Objects in `cypress/support/pages/`
- Read custom commands in `cypress/support/commands.ts`

---
