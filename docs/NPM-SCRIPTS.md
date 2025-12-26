# NPM Scripts Reference

## 📚 Available Commands

### Test Execution

#### Interactive Mode
```bash
npm run cy:open
```
Opens Cypress Test Runner GUI for interactive test development and debugging.

#### Headless Mode
```bash
npm run cy:run
```
Runs all tests in headless mode (no GUI). Best for CI/CD and quick validation.

#### Browser-Specific Tests
```bash
npm run cy:run:chrome    # Run in Chrome
npm run cy:run:firefox   # Run in Firefox
npm run cy:run:edge      # Run in Edge
```

#### Headed Mode
```bash
npm run cy:run:headed
```
Runs tests in headed mode (browser visible) but still automated.

#### Run Specific Test
```bash
npm run cy:run:spec -- "cypress/e2e/01-auth/login.cy.ts"
```
Runs a single test specification file.

### CI/CD

```bash
npm run test
```
Alias for `cy:run` - used in CI/CD pipelines.

```bash
npm run test:ci
```
Runs tests optimized for CI with video and screenshots enabled.

### Reporting

```bash
npm run test:report
```
Runs tests with Mochawesome reporter generating JSON and HTML reports.

```bash
npm run merge:reports
```
Merges multiple JSON report files into a single report.

```bash
npm run generate:report
```
Generates final HTML report from merged JSON.

```bash
npm run clean:reports
```
Removes old report files and creates fresh report directory.

```bash
npm run full:test
```
**Complete testing workflow:**
1. Cleans old reports
2. Runs all tests with reporter
3. Merges reports
4. Generates final HTML report

### Code Quality

```bash
npm run lint
```
Runs ESLint to check code quality and find issues.

```bash
npm run format
```
Formats all code using Prettier.

## 🎯 Common Workflows

### Development Workflow
```bash
# 1. Open Cypress GUI
npm run cy:open

# 2. Write/modify tests interactively
# 3. Run specific test file
npm run cy:run:spec -- "path/to/test.cy.ts"

# 4. Format code
npm run format

# 5. Run lint
npm run lint
```

### Before Commit
```bash
# Run full test suite
npm run cy:run

# Check code quality
npm run lint

# Format code
npm run format
```

### Generate Report for Review
```bash
# Run tests and generate HTML report
npm run full:test

# Open report
open cypress/reports/mochawesome/report.html
```

### CI/CD Pipeline
```bash
# What GitHub Actions runs
npm ci                    # Clean install
npm run lint             # Lint check
npm run test:ci          # Run tests with artifacts
```

## 📋 Script Cheat Sheet

| Need to... | Command |
|------------|---------|
| Develop tests interactively | `npm run cy:open` |
| Quick test run | `npm run cy:run` |
| Run single test | `npm run cy:run:spec -- "path"` |
| Test in Chrome | `npm run cy:run:chrome` |
| Generate report | `npm run full:test` |
| Check code | `npm run lint` |
| Format code | `npm run format` |
| Clean reports | `npm run clean:reports` |

## 🔧 Advanced Usage

### Run with Environment Variables
```bash
CYPRESS_BASE_URL=https://other-site.com npm run cy:run
```

### Run with Custom Config
```bash
npx cypress run --config viewportWidth=1280,viewportHeight=720
```

### Debug Mode
```bash
DEBUG=cypress:* npm run cy:run
```

### Run with Tags (if implemented)
```bash
npm run cy:run -- --env grep="@smoke"
```

## 💡 Tips

1. **Use `cy:open` for development** - Live reload and time-travel debugging
2. **Use `cy:run` for validation** - Fast feedback on all tests
3. **Use `full:test` before PR** - Generate reports for review
4. **Run `lint` and `format`** - Keep code clean and consistent
5. **Use specific spec** - Faster iteration when working on one feature

## 🚀 Quick Commands

```bash
# Most common development cycle
npm run cy:open           # Write tests
npm run cy:run           # Validate
npm run format           # Clean up
npm run lint            # Check quality

# Before creating PR
npm run cy:run           # All tests pass
npm run full:test        # Generate report
npm run lint            # No issues

# After code review
npm run format           # Final cleanup
npm run cy:run          # Confirm still passing
```

## 📊 Performance Tips

- Use `cy:run:spec` to run single files - faster iteration
- Use parallel execution in CI - 3x speed improvement
- Clean reports periodically - saves disk space
- Use headed mode only when debugging - faster without GUI

```bash
# Add to ~/.zshrc or ~/.bashrc
alias cyo='npm run cy:open'
alias cyr='npm run cy:run'
alias cyf='npm run full:test'
```
