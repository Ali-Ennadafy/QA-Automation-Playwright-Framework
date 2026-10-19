# QA Automation Playwright Framework

**A maintainable UI test automation framework for e-commerce applications, built with JavaScript, Playwright, and Docker.**

<p align="center">
  <a href="https://github.com/Ali-Ennadafy/QA-Automation-Playwright-Framework">
    <img src="https://img.shields.io/badge/Project-Playwright%20Automation-2EAD33?logo=playwright&logoColor=white" alt="Playwright Automation"/>
  </a>
  <img src="https://img.shields.io/badge/Language-JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Runtime-Node.js-339933?logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Environment-Docker-2496ED?logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/Status-In%20Development-orange" alt="Project in development"/>
</p>

<p align="center">
  <a href="#overview">Overview</a> ·
  <a href="#the-problem">Problem</a> ·
  <a href="#the-solution">Solution</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#roadmap">Roadmap</a>
</p>

---

## Overview

This project is a hands-on QA Automation Engineering initiative focused on designing, implementing, and maintaining automated tests for a local [nopCommerce](https://www.nopcommerce.com/) e-commerce application.

It goes beyond individual test scripts by applying software testing principles throughout the automation lifecycle:

**Product Discovery → Requirements Analysis → Test Strategy → Test Design → Automation Architecture → Test Execution → Reporting → Maintenance**

The framework uses JavaScript and Playwright Test, with a locally hosted application environment running through Docker.

The objective is to create a structured, reusable, and extensible foundation for validating critical user journeys and business rules.

## The Problem

Reliable UI automation requires more than writing browser scripts.

- **Unreliable external environments:** CAPTCHA challenges and access restrictions can interfere with automated execution against public demo websites.
- **Poor maintainability:** duplicated test logic makes changes to selectors and workflows expensive.
- **Business-critical functionality:** authentication, product configuration, and cart calculations require meaningful assertions.
- **Test debugging:** failures need clear evidence and reproducible conditions.
- **Framework scalability:** adding features becomes difficult when tests, page interactions, configuration, and test data are tightly coupled.

## The Solution

The project addresses these challenges through a structured automation architecture and a controlled local test environment.

| Challenge | Engineering approach |
|---|---|
| External demo restrictions | Run nopCommerce locally using Docker |
| Duplicated UI interactions | Apply the Page Object Model (POM) |
| Difficult-to-maintain tests | Separate test scenarios from page interactions |
| E-commerce business rules | Validate product options, quantities, and cart totals |
| Growing test scope | Organize test scenarios by feature |
| Repeated execution | Prepare the framework for automated CI execution |

**Engineering principle:** test observable application behavior and business outcomes, not just whether a button can be clicked.

## Framework Demo

<!-- Add the actual recording at docs/assets/playwright-demo.gif before enabling this image. -->

<!--
<p align="center">
  <img src="docs/assets/playwright-demo.gif"
       alt="Playwright automated test execution against the local nopCommerce application"
       width="850"/>
</p>
-->

The planned demonstration will show the automated browser executing a representative e-commerce workflow, including product configuration, cart interaction, and test results.

**Planned asset:** `docs/assets/playwright-demo.gif`

The recording will be added after capturing a real execution from the local environment.

## Technology Stack

<p>
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Playwright-Browser%20Automation-2EAD33?logo=playwright&logoColor=white" alt="Playwright"/>
  <img src="https://img.shields.io/badge/Node.js-Runtime-339933?logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Docker-Containers-2496ED?logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/SQL%20Server-Database-CC2927?logo=microsoftsqlserver&logoColor=white" alt="SQL Server"/>
  <img src="https://img.shields.io/badge/Git-Version%20Control-F05032?logo=git&logoColor=white" alt="Git"/>
  <img src="https://img.shields.io/badge/GitHub-Repository-181717?logo=github&logoColor=white" alt="GitHub"/>
</p>

| Technology | Role in the project |
|---|---|
| JavaScript | Automation language |
| Node.js | Runtime and dependency management |
| Playwright Test | Browser automation, assertions, and test runner |
| Page Object Model | Reusable page interaction layer |
| nopCommerce | Application under test |
| Docker | Local application environment |
| SQL Server | Database for the local application |
| Git and GitHub | Version control and collaboration |
| GitHub Actions | CI workflow integration, subject to verification of the current pipeline |

## Architecture

The framework is designed to separate test scenarios from reusable page interactions and supporting infrastructure.

```text
QA-Automation-Playwright-Framework/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── .vscode/
│   └── settings.json
│
├── Automation-Architecture/
│   └── automation-architecture.md
│
├── product-discovery/
│   ├── actors.md
│   ├── admin-modules.md
│   ├── Business-Critical Flows.md
│   ├── frontend-modules.md
│   ├── Integrations-External Dependencies.md
│   ├── main-business-workflows.md
│   ├── product-overview.md
│   ├── Risks-Constraints.md
│   └── Testable Areas.md
│
├── Requirements/
│   ├── Requirements Baseline.md
│   └── Requirements Template.md
│
├── Test_Design/
│   └── Test_Design.md
│
├── Test_Strategy/
│   └── Test-strategy.md
│
├── node_modules/
│
├── nopcommerce-environment/
│   ├── db/
│   │   └── appsettings.json
│   ├── nop.bak
│   └── docker-compose.yml
│
├── Pages/
│   ├── CartPage.js
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── ProductPage.js
│   ├── RegistrationPage.js
│   ├── SearchPage.js
│   └── WishlistPage.js
│
├── test-data/
│
├── test-results/
│
├── tests/
│   ├── ui/
│   │   ├── CartQuantityTest.spec.js
│   │   ├── CartTest.spec.js
│   │   ├── Home.spec.js
│   │   ├── LoginTest.spec.js
│   │   ├── ProductTest.spec.js
│   │   ├── RegistrationTest.spec.js
│   │   └── SearchTest.spec.js
│   │   └── WishlistTest.spec.js
│   │
│   └── api/             
│
├── playwright-report/
├── screenshots/         
├── videos/              
├── traces/              
├── components/          
├── utils/               
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md



*This diagram represents the intended architecture. The final published tree should match the actual files in the repository; planned folders are not evidence of implemented functionality.*

### Design principles

- **Separation of concerns:** test scenarios and page interactions have distinct responsibilities.
- **Reusability:** shared page methods help avoid unnecessary duplication.
- **Readability:** tests describe user behavior and expected outcomes.
- **Maintainability:** centralized page interactions make UI changes easier to manage.
- **Extensibility:** the architecture provides a basis for additional UI and API test coverage.

## Test Coverage

The initial scope focuses on critical e-commerce user journeys.

| Area | Validation objective |
|---|---|
| Home page | Verify navigation and page title |
| Registration | Validate the customer registration flow |
| Login | Validate authentication behavior |
| Product details | Verify product information and configuration |
| Product attributes | Validate option selection and price changes |
| Shopping cart | Validate added products, quantities, and subtotals |
| Search | Validate product search behavior |
| Wishlist | Validate wishlist navigation and interactions |

Coverage is evolving. The presence of a feature in this table describes the intended scope and does not guarantee that every scenario is implemented or passing.

### Example: Business rule validation

Consider a product configuration with an expected unit price of `$285`.

For a quantity of two:

`Expected subtotal = 285 × 2 = $570`

An appropriate automated test should verify the actual application result against the expected value, using the correct product options, quantity, and pricing rules.

This is an example of validating business behavior rather than merely checking that the Add to Cart interaction succeeds.

## Local Test Environment

### Why Docker?

The public nopCommerce demo presented CAPTCHA and access-related obstacles during browser automation.

To obtain greater control over the application environment, the project uses a locally hosted nopCommerce instance with a SQL Server database running in Docker.

**Local environment**

- Application: `http://localhost:8080`
- Web application: nopCommerce
- Database: SQL Server
- Environment management: Docker

This approach reduces dependence on a public demo and makes it easier to manage application data and test conditions.

Docker does not automatically guarantee deterministic tests. Consistent data, environment configuration, and test isolation still need to be maintained.

## Getting Started

### Prerequisites

Install:

- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)

The local nopCommerce application must be running before executing UI tests.

### 1. Clone the repository

```bash
git clone https://github.com/Ali-Ennadafy/QA-Automation-Playwright-Framework.git

cd QA-Automation-Playwright-Framework
```

### 2. Install project dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

On Linux CI environments, additional browser system dependencies may be required.

### 4. Verify the application

Open `http://localhost:8080` and confirm that the application is accessible.

Ensure the configured `baseURL` in `playwright.config.js` matches the local environment.

### 5. Execute the tests

Run the suite:

```bash
npx playwright test
```

Run with the browser visible:

```bash
npx playwright test --headed
```

Open the HTML report when one has been generated:

```bash
npx playwright show-report
```

**Important:** these commands assume that Playwright Test is installed and the configuration is valid. Starting the browser tests does not automatically start the Docker containers or initialize the application database.

## Test Strategy and Quality Engineering

The project follows a testing lifecycle that connects test design with automation implementation.

- Product discovery and requirements analysis
- Risk-based testing and prioritization
- Test strategy and scenario design
- Identification of critical customer journeys
- Test data and environment planning
- Defect investigation and failure analysis
- Automation architecture and maintainability
- Validation of functional behavior and business rules

The objective is to build automation around meaningful quality risks rather than simply maximizing the number of test scripts.

## Roadmap

The project is being developed incrementally.

- [x] Product discovery and requirements analysis
- [x] Initial test strategy and test design
- [x] Local nopCommerce environment using Docker
- [x] Initial Playwright UI automation and page objects
- [ ] Stabilize configuration and consolidate the test structure
- [ ] Expand negative and boundary-value scenarios
- [ ] Complete and stabilize cart and checkout validation
- [ ] Implement and verify API automation within this framework
- [ ] Improve reusable fixtures and environment configuration
- [ ] Verify and stabilize GitHub Actions execution
- [ ] Improve reporting and failure artifacts
- [ ] Capture a representative test execution GIF
- [ ] Document verified test results and maintenance practices

Checklist items should only be marked complete once the corresponding implementation has been verified.

## Project Status

**Status: In development**

The current focus is on establishing a maintainable automation structure, implementing critical UI workflows, and controlling the local application environment.

The roadmap reflects further work needed to expand coverage, stabilize execution, and improve CI/CD and reporting.

## Author

**Ali Ennadafy**

QA Automation  | Software Testing | JavaScript | Playwright

- **GitHub Profile:** [Ali-Ennadafy](https://github.com/Ali-Ennadafy)
- **Project Repository:** [QA-Automation-Playwright-Framework](https://github.com/Ali-Ennadafy/QA-Automation-Playwright-Framework)
- **Portfolio:** [ali-ennadafy-portfolio.netlify.app](https://ali-ennadafy-portfolio.netlify.app)

---

*Built to apply software testing principles and develop practical skills in maintainable test automation engineering.*
