#!/bin/bash

# Orange HRM Cypress Test Suite Setup Script
# This script will set up the project and run initial validation

set -e  # Exit on error

echo "🚀 Orange HRM Cypress Test Suite Setup"
echo "========================================"
echo ""

# Check Node.js installation
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Verify Cypress installation
echo "🔧 Verifying Cypress installation..."
npx cypress verify
echo "✅ Cypress verified"
echo ""

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p cypress/screenshots
mkdir -p cypress/videos
mkdir -p cypress/reports/mochawesome
mkdir -p cypress/downloads
echo "✅ Directories created"
echo ""

# Run lint check
echo "🔍 Running lint check..."
npm run lint || echo "⚠️  Linting completed with warnings (non-blocking)"
echo ""

# Run a quick smoke test
echo "🧪 Running smoke test..."
echo "Testing login functionality..."
npm run cy:run:spec -- "cypress/e2e/01-auth/login.cy.ts" || {
    echo "⚠️  Smoke test failed. This might be due to network issues or the demo site being down."
    echo "You can still proceed with development."
}
echo ""

# Setup complete
echo "✅ Setup Complete!"
echo ""
echo "📚 Next Steps:"
echo "  1. Run tests interactively:  npm run cy:open"
echo "  2. Run all tests:            npm run cy:run"
echo "  3. Generate HTML report:     npm run full:test"
echo "  4. Read documentation:       docs/GETTING-STARTED.md"
echo ""
echo "🎉 Happy Testing!"
