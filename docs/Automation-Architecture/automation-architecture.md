# Automation Architecture

## 1. Architecture Overview

This project uses a layered Playwright automation architecture
designed to support maintainability, reusability, scalability,
and separation of responsibilities.

The framework supports both UI and API automation.

---

## 2. Project Structure


QA-Automation-playwright-framework/
│
├── tests/
│   ├── ui/
│   │   ├── registration/
│   │   ├── login/
│   │   ├── product/
│   │   ├── search/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── account/
│   │
│   └── api/
│       ├── users/
│       ├── products/
│       └── orders/
│
├── pages/
│   ├── LoginPage.js
│   ├── RegistrationPage.js
│   ├── ProductPage.js
│   ├── SearchPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── AccountPage.js
│
├── components/
│   ├── Header.js
│   ├── Navigation.js
│   ├── SearchBox.js
│   ├── ProductCard.js
│   └── CartSummary.js
│
├── fixtures/
│   ├── test.js
│   ├── auth.fixture.js
│   └── api.fixture.js
│
├── api/
│   ├── clients/
│   ├── schemas/
│   └── helpers/
│
├── test-data/
│   ├── users/
│   ├── products/
│   └── checkout/
│
├── config/
│   ├── config.js
│   └── environments/
│
├── utils/
│   ├── logger.js
│   ├── date.util.js
│   ├── random.util.js
│   └── retry.util.js
│
├── reports/
├── screenshots/
├── videos/
├── traces/
│
├── docs/
│   ├── requirements/
│   ├── test-strategy/
│   ├── test-cases/
│   └── traceability/
│
├── .github/
│   └── workflows/
│       ├── smoke.yml
│       ├── regression.yml
│       └── scheduled.yml
│
├── playwright.config.js
├── docker/
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
