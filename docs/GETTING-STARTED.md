# Getting Started Guide

## 🚀 Quick Start

This guide will help you set up and run the Orange HRM Cypress testing suite in under 10 minutes.

---

## 📋 Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended

### Verify Installation

```bash
node --version  # Should show v18+
npm --version   # Should show v8+
git --version   # Should show v2+
```

---

## ⚙️ Installation

### Step 1: Clone Repository

```bash
cd ~/Documents/Learn/OrangeHRM_Cypress_Scripts
# Repository is already set up in this directory
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- Cypress
- TypeScript
- Testing utilities
- Reporting tools
- All dependencies

**Installation time:** ~2-3 minutes

### Step 3: Verify Cypress Installation

```bash
npx cypress verify
```

Expected output:
```
✓ Verified Cypress! /Users/.../Cypress/13.6.2/Cypress.app
```

---

## 🎮 Running Tests

### Interactive Mode (Recommended for Development)

Open Cypress Test Runner:

```bash
npm run cy:open
```

This will:
1. Open Cypress GUI
2. Show all test files
3. Allow you to run tests with live reload
4. Provide time-travel debugging

**Choose E2E Testing → Select a browser → Pick a test file**

### Headless Mode (For CI/Quick Validation)

Run all tests in terminal:

```bash
npm run cy:run
```

Run specific test file:

```bash
npm run cy:run:spec -- "cypress/e2e/01-auth/login.cy.ts"
```

Run tests in specific browser:

```bash
npm run cy:run:chrome
npm run cy:run:firefox
```

---

## 📊 Generating Reports

### Run Tests with HTML Report

```bash
npm run full:test
```

This will:
1. Clean old reports
2. Run all tests
3. Generate Mochawesome HTML report
4. Open report location

### View Report

```bash
open cypress/reports/mochawesome/report.html
```

---

## 🗂️ Project Structure Overview

```
OrangeHRM_Cypress_Scripts/
├── cypress/
│   ├── e2e/                    # Test files
│   │   ├── 01-auth/           # Authentication tests
│   │   ├── 02-dashboard/      # Dashboard tests
│   │   ├── 03-pim/            # Employee management tests
│   │   ├── 04-leave/          # Leave management tests
│   │   └── 05-admin/          # Admin tests
│   ├── fixtures/              # Test data
│   ├── support/               # Custom commands & utilities
│   │   ├── commands.ts        # Custom Cypress commands
│   │   ├── pages/             # Page Object Models
│   │   └── utils/             # Helper functions
│   ├── screenshots/           # Auto-generated on failure
│   └── videos/                # Test execution videos
├── .github/workflows/         # CI/CD pipelines
├── docs/                      # Documentation
├── cypress.config.ts          # Cypress configuration
├── package.json               # Dependencies & scripts
└── README.md                  # Main documentation
```

---

## ✅ Verify Setup

Run this quick smoke test:

```bash
npm run cy:run:spec -- "cypress/e2e/01-auth/login.cy.ts"
```

**Expected output:**
```
  Authentication - Login Flow
    ✓ should successfully login with valid credentials (2345ms)
    ✓ should show error for invalid username (1234ms)
    ...
  
  15 passing (25s)
```

---

## 🎯 Writing Your First Test

### 1. Create Test File

```bash
touch cypress/e2e/06-custom/my-first-test.cy.ts
```

### 2. Add Basic Test

```typescript
describe('My First Test', () => {
  it('should visit Orange HRM login page', () => {
    cy.visit('/web/index.php/auth/login');
    cy.get('.orangehrm-login-logo').should('be.visible');
  });

  it('should login successfully', () => {
    cy.login(); // Using custom command
    cy.url().should('include', '/dashboard');
  });
});
```

### 3. Run Your Test

```bash
npm run cy:run:spec -- "cypress/e2e/06-custom/my-first-test.cy.ts"
```

---

### Test Data Builder

Generate realistic test data:

```typescript
import { TestDataBuilder } from '@support/utils/TestDataBuilder';

const employee = TestDataBuilder.generateEmployee();
// { firstName: 'John', lastName: 'Doe', email: '...' }
```

---

## 🐛 Troubleshooting

### Common Issues

#### Issue 1: Cypress binary not found

```bash
npx cypress install
```

#### Issue 2: Tests timeout

Increase timeout in `cypress.config.ts`:

```typescript
defaultCommandTimeout: 15000, // Increase from 10000
```

#### Issue 3: Element not found

Add proper wait:

```typescript
cy.waitForPageLoad();
cy.get('[data-testid="element"]', { timeout: 10000 })
  .should('be.visible');
```

#### Issue 4: npm install fails

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Getting Help

- 📚 [Cypress Documentation](https://docs.cypress.io)
- 💬 [Cypress Discord](https://discord.com/invite/cypress)
- 🐛 Create issue in this repository

---

## 🚀 Next Steps

Now that you're set up:

1. **Explore Existing Tests**
   ```bash
   npm run cy:open
   ```
   - Open test files
   - See how they work
   - Run them interactively

2. **Read Documentation**
   - `docs/TESTING-STRATEGY.md` - Testing approach

3. **Write Your Own Tests**
   - Start with simple scenarios
   - Use Page Object Models
   - Follow naming conventions

4. **Set Up CI/CD**
   - Push to GitHub
   - Workflows run automatically
   - View results in Actions tab

---

## 📝 Cheat Sheet

### Essential Commands

```bash
# Interactive mode
npm run cy:open

# Run all tests
npm run cy:run

# Run specific test
npm run cy:run:spec -- "path/to/test.cy.ts"

# Generate HTML report
npm run full:test

# Lint code
npm run lint

# Format code
npm run format
```

### Useful Cypress Commands

```typescript
// Navigation
cy.visit('/path')

// Finding elements
cy.get('selector')
cy.contains('text')

// Interactions
.click()
.type('text')
.select('option')

// Assertions
.should('be.visible')
.should('have.text', 'text')
.should('have.value', 'value')

// Waiting
cy.wait(1000)
cy.waitForPageLoad()
```