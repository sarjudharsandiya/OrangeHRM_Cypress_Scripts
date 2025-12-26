# Cypress Testing Suite for Orange HRM

![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

An AI-assisted, production-ready Cypress testing suite for Orange HRM that demonstrates best practices in E2E test automation with comprehensive coverage, stability, and CI/CD integration.

## 🎯 Project Overview

This project implements a comprehensive testing strategy for the [Orange HRM Demo Site](https://opensource-demo.orangehrmlive.com) using Cypress with TypeScript, following AI-assisted development practices to maximize test quality, reduce flakiness, and improve maintainability.

### Key Features

- ✅ **AI-Generated Test Scenarios** - Comprehensive test coverage generated with AI assistance
- 🔄 **Automated CI/CD Pipeline** - GitHub Actions workflows with parallel execution
- 📊 **Rich Test Reports** - Mochawesome HTML reports with screenshots and videos
- 🎭 **Page Object Model** - Maintainable test architecture
- 🏭 **Test Data Factories** - Dynamic test data generation with Faker.js
- 🔍 **TypeScript Support** - Full type safety and IntelliSense
- 🚀 **Retry Mechanism** - Automatic retry for flaky tests
- 📸 **Visual Evidence** - Screenshots on failure, videos for all tests
- ⚡ **Parallel Execution** - Faster test runs with multiple containers

## 📁 Project Structure

```
OrangeHRM_Cypress_Scripts/
├── .github/
│   └── workflows/
│       ├── cypress-tests.yml        # Main CI/CD workflow
│       └── cypress-scheduled.yml    # Scheduled test runs
├── cypress/
│   ├── e2e/
│   │   ├── 01-auth/
│   │   │   ├── login.cy.ts         # Login flow tests
│   │   │   └── logout.cy.ts        # Logout flow tests
│   │   ├── 02-dashboard/
│   │   │   └── dashboard.cy.ts     # Dashboard tests
│   │   ├── 03-pim/
│   │   │   └── employee-management.cy.ts
│   │   ├── 04-leave/
│   │   │   └── leave-management.cy.ts
│   │   └── 05-admin/
│   │       └── admin-module.cy.ts
│   ├── fixtures/
│   │   └── test-data.json          # Static test data
│   ├── support/
│   │   ├── commands.ts             # Custom Cypress commands
│   │   ├── e2e.ts                  # Test configuration
│   │   ├── pages/                  # Page Object Models
│   │   │   ├── LoginPage.ts
│   │   │   ├── DashboardPage.ts
│   │   │   └── PIMPage.ts
│   │   └── utils/                  # Utility functions
│   │       ├── TestDataBuilder.ts
│   │       └── TestUtils.ts
│   ├── screenshots/                # Auto-generated on failure
│   ├── videos/                     # Auto-generated for all tests
│   └── reports/                    # Test reports
├── cypress.config.ts               # Cypress configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies and scripts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd OrangeHRM_Cypress_Scripts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npx cypress verify
   ```

### Running Tests

#### Interactive Mode (Development)
```bash
npm run cy:open
```

#### Headless Mode (CI/Local)
```bash
npm run test
# or
npm run cy:run
```

#### Browser-Specific Tests
```bash
npm run cy:run:chrome
npm run cy:run:firefox
npm run cy:run:edge
```

#### With HTML Reports
```bash
npm run full:test
```

#### Run Specific Test File
```bash
npm run cy:run:spec -- "cypress/e2e/01-auth/login.cy.ts"
```

## 🤖 AI-Assisted Testing Workflow

### How AI Was Used

1. **Test Generation**
   - Used AI prompts to generate comprehensive test scenarios
   - Generated edge cases and negative test scenarios
   - Created realistic test data patterns

2. **Test Refactoring**
   - AI suggestions for code optimization
   - Improved test readability and maintainability
   - Identified anti-patterns and suggested fixes

3. **Documentation**
   - Auto-generated code comments
   - Test case descriptions
   - Setup instructions

### Sample AI Prompts Used

```
"Generate comprehensive Cypress tests for Orange HRM login page including 
positive, negative, and edge cases with proper assertions and error handling"

"Create Page Object Model for Orange HRM dashboard with TypeScript support 
and custom wait strategies"

"Generate test data factory using Faker.js for employee management tests"
```

## 📊 Test Coverage

### Modules Tested

| Module | Test Files | Test Cases | Status |
|--------|-----------|------------|--------|
| Authentication | 2 | 15+ | ✅ Complete |
| Dashboard | 1 | 10+ | ✅ Complete |
| PIM (Employee) | 1 | 12+ | ✅ Complete |
| Leave Management | 1 | 8+ | ✅ Complete |
| Admin | 1 | 10+ | ✅ Complete |

### Test Categories

- ✅ **Positive Scenarios** - Happy path flows
- ✅ **Negative Scenarios** - Invalid inputs, error handling
- ✅ **Edge Cases** - Boundary conditions, empty states
- ✅ **UI/UX Validation** - Element visibility, navigation
- ✅ **Security** - Password masking, session management
- ✅ **Accessibility** - ARIA labels, keyboard navigation

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### Main Workflow (`cypress-tests.yml`)
- **Triggers**: Push to main/develop, Pull Requests, Manual dispatch
- **Jobs**:
  1. Install dependencies
  2. Lint code
  3. Run Cypress tests (parallel across 3 containers)
  4. Process test results
  5. Notify status

#### Scheduled Workflow (`cypress-scheduled.yml`)
- **Frequency**: Every 6 hours
- **Features**:
  - Auto-creates GitHub issue on failure
  - Extended artifact retention (14 days)

### Workflow Features

- 🔄 Parallel execution across multiple containers
- 📦 Artifact uploads (screenshots, videos, reports)
- 📝 Test summary in GitHub Actions UI
- 🔔 Automatic issue creation on failure
- 📊 Test results accessible for 30 days

### Setting Up CI/CD

1. Push code to GitHub repository
2. Workflows automatically run on push to `main` or `develop`
3. View results in **Actions** tab
4. Download artifacts for failed tests

### Environment Variables (Optional)

Create repository secrets for:
- `CYPRESS_RECORD_KEY` - For Cypress Dashboard (optional)

## 📈 Test Reports

### Mochawesome Reports

After running tests with `npm run full:test`, open:
```
cypress/reports/mochawesome/report.html
```

**Report Features:**
- Pass/fail statistics
- Test duration metrics
- Embedded screenshots
- Test hierarchy visualization
- Charts and graphs

### GitHub Actions Summary

Each workflow run creates a summary with:
- Test execution status
- Branch and commit information
- Links to artifacts
- Failure notifications

## 🛠️ Custom Commands

### Login Command
```typescript
cy.login(); // Uses default credentials
cy.login('Admin', 'admin123'); // Custom credentials
```

### Navigation Command
```typescript
cy.navigateToMenu('PIM');
```

### Wait for Page Load
```typescript
cy.waitForPageLoad();
```

### Screenshot with Timestamp
```typescript
cy.screenshotWithTimestamp('test-name');
```

### Form Filling
```typescript
cy.fillByPlaceholder('Username', 'Admin');
```

### Toast Verification
```typescript
cy.verifyToast('Successfully Saved');
```

## 🏗️ Page Object Model

### Example Usage

```typescript
import { LoginPage } from '@support/pages/LoginPage';

const loginPage = new LoginPage();

loginPage.visit();
loginPage.login('Admin', 'admin123');
loginPage.shouldRedirectToDashboard();
```

## 🎲 Test Data Generation

### Using Test Data Builder

```typescript
import { TestDataBuilder } from '@support/utils/TestDataBuilder';

const employee = TestDataBuilder.generateEmployee();
// { firstName: 'John', lastName: 'Doe', email: '...' }

const credentials = TestDataBuilder.getCredentials();
```

## 🔧 Configuration

### Cypress Config Highlights

```typescript
{
  baseUrl: 'https://opensource-demo.orangehrmlive.com',
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: true,
  screenshotOnRunFailure: true,
  retries: {
    runMode: 2,
    openMode: 0
  }
}
```

### TypeScript Path Aliases

```typescript
@support/*  → cypress/support/*
@fixtures/* → cypress/fixtures/*
@pages/*    → cypress/support/pages/*
@utils/*    → cypress/support/utils/*
```

## 📋 Best Practices Implemented

### 1. **Test Stability**
- ✅ Proper wait strategies (`cy.waitForPageLoad()`)
- ✅ Retry mechanism for flaky tests
- ✅ Explicit waits over hard-coded delays
- ✅ Network idle detection

### 2. **Test Maintainability**
- ✅ Page Object Model pattern
- ✅ Custom commands for reusable actions
- ✅ Test data factories
- ✅ TypeScript for type safety

### 3. **CI/CD Integration**
- ✅ Parallel execution
- ✅ Artifact collection
- ✅ Test reporting
- ✅ Failure notifications

### 4. **Code Quality**
- ✅ ESLint configuration
- ✅ Prettier formatting
- ✅ TypeScript strict mode
- ✅ Comprehensive error handling

## 🐛 Troubleshooting

### Common Issues

**Issue**: Cypress binary not found
```bash
npx cypress install
```

**Issue**: Tests fail due to timeout
- Increase timeout in `cypress.config.ts`
- Check network connectivity

**Issue**: Element not found
- Verify selectors are correct
- Add proper wait commands
- Check if element is in viewport