# Test Design

**Project:** nopCommerce QA Automation
**Related Documents:** `Requirements_Baseline.md`, `Test-strategy.md`
**Scope:** All 12 requirement domains / 101 requirements defined in the Requirements Baseline

---

## 1. Purpose

This document translates the requirements defined in the Requirements Baseline into concrete, traceable **test conditions**, and states the **test design technique(s)** used to derive them.

It is the bridge between:

* **Requirements Baseline** — *what* the system must do, and
* **Test Cases / Automated Scripts** — *how* each condition will be exercised, step by step.

Test Design does not specify test steps, test data values, or automation code. Its purpose is to ensure that every acceptance criterion in the baseline is deliberately covered by at least one identified test condition, using a recognized test design technique, before test cases are written.

## 2. Inputs

| Input | Source |
|---|---|
| Functional and framework requirements (101) | `Requirements_Baseline.md` |
| Test scope, objectives, risk model, priority definitions | `Test-strategy.md` (§1, §2, §7) |
| Actors | `actors.md` |
| Business-critical flows | `Business-Critical Flows.md`, `main-business-workflows.md` |
| Testable area taxonomy | `Testable Areas.md` |

## 3. Test Design Approach

Test conditions are derived directly from each requirement's **Acceptance Criteria**, since the Requirements Baseline already expresses acceptance criteria at a testable level of granularity. Each acceptance criterion becomes one or more test conditions, classified by the behavior it expresses, and mapped to the appropriate design technique(s):

| Condition Type | Meaning | Test Design Technique |
|---|---|---|
| Positive / Functional | Expected behavior under valid, supported use | Equivalence Partitioning (valid class) |
| Negative | Rejection, prevention, or error behavior under invalid/unexpected input or state | Equivalence Partitioning (invalid class) |
| Boundary | Behavior at field limits, thresholds, formats, quantities | Boundary Value Analysis |
| Access Control | Behavior that depends on role, permission, or authentication state | Decision Table (role/permission-based) |
| State-based | Behavior that depends on a sequence, session, or workflow state | State Transition Testing |
| Compatibility | Behavior that must hold across browsers/environments | Configuration / Compatibility Testing |

A single acceptance criterion may map to more than one type (e.g. "invalid password is rejected when password rules are not satisfied" is both **Negative** and **Boundary**), in which case more than one technique applies. Exploratory and error-guessing techniques (per `Test-strategy.md` §5.12) supplement this baseline coverage during execution rather than being enumerated per requirement.

## 4. Test Condition Identification

Each test condition is assigned a stable ID:

```
TD-<Requirement ID>-<sequence>
```

Example: `TD-AUTH-001-03` is the 3rd test condition derived from `AUTH-001`.

This ID is the anchor for downstream traceability: each `TD-*` condition will be covered by one or more test cases (`TC-*`) in the Test Case document, per the traceability chain defined in `Test-strategy.md` §8.1.

## 5. Test Design by Domain

The tables below enumerate, for every requirement in the Requirements Baseline, its test conditions, their type classification, and the applicable test design technique(s). Priority and Risk are inherited from the source requirement (`Test-strategy.md` §7.4 priority definitions apply).

## 1. Customer Account & Authentication

*14 requirement(s) — 83 test condition(s) derived from acceptance criteria.*

### AUTH-001 — Customer Registration

**Actor:** Guest Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-AUTH-001-01 | Guest customer can access the registration page. | Access Control | AC1 (AUTH-001) |
| TD-AUTH-001-02 | Required fields are validated. | Positive / Functional | AC2 (AUTH-001) |
| TD-AUTH-001-03 | Valid information creates an account. | Boundary | AC3 (AUTH-001) |
| TD-AUTH-001-04 | Invalid information prevents registration. | Negative, Boundary | AC4 (AUTH-001) |
| TD-AUTH-001-05 | Validation feedback is displayed. | Positive / Functional | AC5 (AUTH-001) |

### AUTH-002 — Registration Input Validation

**Actor:** Guest Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-AUTH-002-01 | Submission with missing required information is rejected. | Negative, Boundary | AC1 (AUTH-002) |
| TD-AUTH-002-02 | Submission with an invalid email format is rejected. | Negative, Boundary | AC2 (AUTH-002) |
| TD-AUTH-002-03 | Submission with an invalid password is rejected when password rules are not satisfied. | Negative | AC3 (AUTH-002) |
| TD-AUTH-002-04 | Submission with mismatched password confirmation is rejected. | Negative | AC4 (AUTH-002) |
| TD-AUTH-002-05 | Validation feedback identifies the relevant invalid input. | Negative | AC5 (AUTH-002) |
| TD-AUTH-002-06 | A registration containing valid required information can proceed successfully. | Boundary, State-based | AC6 (AUTH-002) |
| TD-AUTH-002-07 | No customer account is created when validation fails. | Negative | AC7 (AUTH-002) |

### AUTH-003 — Duplicate Customer Email Prevention

**Actor:** Guest Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-AUTH-003-01 | Registration with an unused email address can proceed when all other required information is valid. | Boundary, State-based | AC1 (AUTH-003) |
| TD-AUTH-003-02 | Registration with an email address already associated with an existing customer account is rejected. | Negative | AC2 (AUTH-003) |
| TD-AUTH-003-03 | Appropriate validation feedback is displayed when the email address is already in use. | Positive / Functional | AC3 (AUTH-003) |
| TD-AUTH-003-04 | No additional customer account is created after a duplicate email registration attempt. | Negative | AC4 (AUTH-003) |
| TD-AUTH-003-05 | The existing customer account remains accessible and unchanged. | Access Control | AC5 (AUTH-003) |
| TD-AUTH-003-06 | Repeated attempts using the same existing email continue to be rejected according to the configured registration rules. | Negative | AC6 (AUTH-003) |

### AUTH-004 — Customer Login

**Actor:** Registered Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-AUTH-004-01 | A registered customer can access the login page. | Access Control, State-based | AC1 (AUTH-004) |
| TD-AUTH-004-02 | Valid credentials result in successful authentication. | Positive / Functional | AC2 (AUTH-004) |
| TD-AUTH-004-03 | The customer is recognized as authenticated after successful login. | Access Control, State-based | AC3 (AUTH-004) |
| TD-AUTH-004-04 | The appropriate authenticated destination is displayed. | Access Control | AC4 (AUTH-004) |
| TD-AUTH-004-05 | Invalid credentials do not authenticate the customer. | Negative | AC5 (AUTH-004) |
| TD-AUTH-004-06 | Authentication failure provides appropriate feedback. | Negative | AC6 (AUTH-004) |
| TD-AUTH-004-07 | Empty required login fields are validated. | Negative, State-based | AC7 (AUTH-004) |
| TD-AUTH-004-08 | The authenticated session remains valid according to the configured session rules. | Access Control, State-based | AC8 (AUTH-004) |

### AUTH-005 — Invalid Login Handling

**Actor:** Registered Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-AUTH-005-01 | Incorrect password is rejected. | Negative | AC1 (AUTH-005) |
| TD-AUTH-005-02 | Unknown customer credentials are rejected. | Negative | AC2 (AUTH-005) |
| TD-AUTH-005-03 | Empty required login fields are rejected. | Negative, State-based | AC3 (AUTH-005) |
| TD-AUTH-005-04 | Failed authentication does not create an authenticated session. | Negative, Access Control, State-based | AC4 (AUTH-005) |
| TD-AUTH-005-05 | Appropriate error feedback is displayed. | Negative | AC5 (AUTH-005) |

### AUTH-006 — Customer Logout

**Actor:** Authenticated Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-AUTH-006-01 | An authenticated customer can log out successfully. | Access Control | AC1 (AUTH-006) |
| TD-AUTH-006-02 | The authentication state is cleared after logout. | State-based | AC2 (AUTH-006) |
| TD-AUTH-006-03 | Protected customer areas cannot be accessed using the terminated session. | Negative, Access Control, State-based | AC3 (AUTH-006) |
| TD-AUTH-006-04 | The customer can authenticate again using valid credentials. | Positive / Functional | AC4 (AUTH-006) |

### AUTH-007 — Authentication State Management

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-AUTH-007-01 | Successful login establishes an authenticated state. | Access Control, State-based | AC1 (AUTH-007) |
| TD-AUTH-007-02 | Authenticated state persists during supported navigation. | Access Control, State-based | AC2 (AUTH-007) |
| TD-AUTH-007-03 | Logout changes the customer to an unauthenticated state. | Access Control, State-based | AC3 (AUTH-007) |
| TD-AUTH-007-04 | Unauthenticated customers cannot access protected customer functionality. | Negative, Access Control | AC4 (AUTH-007) |
| TD-AUTH-007-05 | Authentication-dependent UI behavior reflects the current state. | State-based | AC5 (AUTH-007) |

### AUTH-008 — Session Management

**Actor:** Authenticated Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-AUTH-008-01 | An authenticated customer can access protected functionality during a valid session. | Access Control, State-based | AC1 (AUTH-008) |
| TD-AUTH-008-02 | The session remains active during supported customer interactions. | State-based | AC2 (AUTH-008) |
| TD-AUTH-008-03 | An expired session is no longer treated as authenticated. | Negative, Access Control, State-based | AC3 (AUTH-008) |
| TD-AUTH-008-04 | Protected functionality requires re-authentication after session expiration. | Access Control, State-based | AC4 (AUTH-008) |
| TD-AUTH-008-05 | Session behavior remains consistent across supported navigation. | State-based | AC5 (AUTH-008) |

### AUTH-009 — Session Expiration

**Actor:** Authenticated Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-AUTH-009-01 | An active customer session can expire according to the configured rules. | Negative, State-based | AC1 (AUTH-009) |
| TD-AUTH-009-02 | An expired session is no longer recognized as authenticated. | Negative, Access Control, State-based | AC2 (AUTH-009) |
| TD-AUTH-009-03 | Protected functionality cannot be accessed using the expired session. | Negative, Access Control, State-based | AC3 (AUTH-009) |
| TD-AUTH-009-04 | The customer can authenticate again using valid credentials. | Positive / Functional | AC4 (AUTH-009) |
| TD-AUTH-009-05 | Session expiration does not modify the customer's account data. | State-based | AC5 (AUTH-009) |

### AUTH-010 — Password Recovery

**Actor:** Registered Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-AUTH-010-01 | A customer can access the password recovery functionality. | Access Control | AC1 (AUTH-010) |
| TD-AUTH-010-02 | A valid registered email can initiate the recovery process. | Positive / Functional | AC2 (AUTH-010) |
| TD-AUTH-010-03 | An invalid or unsupported email does not authenticate the customer. | Negative | AC3 (AUTH-010) |
| TD-AUTH-010-04 | Appropriate feedback is displayed after submitting the recovery request. | Positive / Functional | AC4 (AUTH-010) |
| TD-AUTH-010-05 | The recovery process does not expose the customer's existing password. | Positive / Functional | AC5 (AUTH-010) |
| TD-AUTH-010-06 | A successfully recovered account can be used for authentication according to the configured recovery process. | Positive / Functional | AC6 (AUTH-010) |

### AUTH-011 — Customer Password Change

**Actor:** Authenticated Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-AUTH-011-01 | An authenticated customer can access the password-change functionality. | Access Control | AC1 (AUTH-011) |
| TD-AUTH-011-02 | Valid password information allows the password to be changed. | Boundary | AC2 (AUTH-011) |
| TD-AUTH-011-03 | Invalid password information is rejected. | Negative, Boundary | AC3 (AUTH-011) |
| TD-AUTH-011-04 | Password confirmation mismatch is rejected. | Negative | AC4 (AUTH-011) |
| TD-AUTH-011-05 | Appropriate validation feedback is displayed. | Positive / Functional | AC5 (AUTH-011) |
| TD-AUTH-011-06 | The new password can be used for subsequent authentication. | Positive / Functional | AC6 (AUTH-011) |
| TD-AUTH-011-07 | The previous password can no longer be used after a successful password change, according to the application's configured behavior. | Positive / Functional | AC7 (AUTH-011) |

### AUTH-012 — Customer Account Information Management

**Actor:** Authenticated Customer | **Priority:** High | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-AUTH-012-01 | An authenticated customer can access their account information. | Boundary, Access Control | AC1 (AUTH-012) |
| TD-AUTH-012-02 | Existing account information is displayed correctly. | Boundary | AC2 (AUTH-012) |
| TD-AUTH-012-03 | Valid changes can be saved successfully. | Positive / Functional | AC3 (AUTH-012) |
| TD-AUTH-012-04 | Invalid changes are rejected with appropriate feedback. | Negative | AC4 (AUTH-012) |
| TD-AUTH-012-05 | Saved changes are persisted. | Positive / Functional | AC5 (AUTH-012) |
| TD-AUTH-012-06 | Updated information is displayed after navigation or page refresh. | Boundary, State-based | AC6 (AUTH-012) |

### AUTH-013 — Customer Profile Management

**Actor:** Authenticated Customer | **Priority:** High | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-AUTH-013-01 | An authenticated customer can access their profile. | Access Control | AC1 (AUTH-013) |
| TD-AUTH-013-02 | Existing profile information is displayed correctly. | Boundary | AC2 (AUTH-013) |
| TD-AUTH-013-03 | Valid profile changes can be saved. | Positive / Functional | AC3 (AUTH-013) |
| TD-AUTH-013-04 | Invalid profile information is rejected. | Negative, Boundary | AC4 (AUTH-013) |
| TD-AUTH-013-05 | Appropriate validation feedback is displayed. | Positive / Functional | AC5 (AUTH-013) |
| TD-AUTH-013-06 | Saved changes persist after navigation or page refresh. | State-based | AC6 (AUTH-013) |

### AUTH-014 — Customer Address Management

**Actor:** Authenticated Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-AUTH-014-01 | An authenticated customer can access address management. | Access Control | AC1 (AUTH-014) |
| TD-AUTH-014-02 | Existing addresses are displayed correctly. | Positive / Functional | AC2 (AUTH-014) |
| TD-AUTH-014-03 | A valid address can be added successfully. | Positive / Functional | AC3 (AUTH-014) |
| TD-AUTH-014-04 | An existing address can be updated successfully. | Positive / Functional | AC4 (AUTH-014) |
| TD-AUTH-014-05 | An address can be removed where the application permits removal. | Positive / Functional | AC5 (AUTH-014) |
| TD-AUTH-014-06 | Invalid or incomplete address information is rejected. | Negative, Boundary | AC6 (AUTH-014) |
| TD-AUTH-014-07 | Saved address changes persist after navigation or page refresh. | State-based | AC7 (AUTH-014) |
| TD-AUTH-014-08 | Address information belongs only to the authenticated customer's account. | Boundary, Access Control | AC8 (AUTH-014) |


## 2. Product Catalog

*8 requirement(s) — 36 test condition(s) derived from acceptance criteria.*

### CAT-001 — Product Listing

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CAT-001-01 | Customer can access a product listing. | Access Control | AC1 (CAT-001) |
| TD-CAT-001-02 | Products are displayed correctly. | Positive / Functional | AC2 (CAT-001) |
| TD-CAT-001-03 | Product information is displayed for each listed product. | Boundary | AC3 (CAT-001) |
| TD-CAT-001-04 | Customer can open a product from the listing. | Positive / Functional | AC4 (CAT-001) |

### CAT-002 — Category Navigation

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CAT-002-01 | Customer can access available categories. | Access Control | AC1 (CAT-002) |
| TD-CAT-002-02 | Selecting a category displays its associated products. | Positive / Functional | AC2 (CAT-002) |
| TD-CAT-002-03 | Category navigation works across supported category levels. | State-based | AC3 (CAT-002) |
| TD-CAT-002-04 | Customer can navigate from a category to product details. | State-based | AC4 (CAT-002) |

### CAT-003 — Product Details

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CAT-003-01 | Customer can open a product details page. | Positive / Functional | AC1 (CAT-003) |
| TD-CAT-003-02 | Product name and relevant information are displayed correctly. | Boundary | AC2 (CAT-003) |
| TD-CAT-003-03 | Product price is displayed where applicable. | Positive / Functional | AC3 (CAT-003) |
| TD-CAT-003-04 | Product availability is displayed where applicable. | Positive / Functional | AC4 (CAT-003) |
| TD-CAT-003-05 | Configured attributes or variants are available for selection where applicable. | Positive / Functional | AC5 (CAT-003) |
| TD-CAT-003-06 | Customer can add an eligible product to the cart. | Positive / Functional | AC6 (CAT-003) |

### CAT-004 — Product Attributes & Variants

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CAT-004-01 | Configured product attributes are displayed. | Positive / Functional | AC1 (CAT-004) |
| TD-CAT-004-02 | Customer can select valid options. | Positive / Functional | AC2 (CAT-004) |
| TD-CAT-004-03 | Invalid or unavailable combinations are prevented. | Negative | AC3 (CAT-004) |
| TD-CAT-004-04 | Relevant product information updates after selection. | Boundary | AC4 (CAT-004) |
| TD-CAT-004-05 | Variant-specific price or availability is displayed correctly where applicable. | Positive / Functional | AC5 (CAT-004) |

### CAT-005 — Product Availability

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CAT-005-01 | Available products can be selected and purchased. | Positive / Functional | AC1 (CAT-005) |
| TD-CAT-005-02 | Unavailable products display the appropriate availability state. | Negative, State-based | AC2 (CAT-005) |
| TD-CAT-005-03 | Unavailable products cannot be added to the cart when purchase is not permitted. | Negative | AC3 (CAT-005) |
| TD-CAT-005-04 | Availability information is consistent across supported customer flows. | Boundary | AC4 (CAT-005) |

### CAT-006 — Product Sorting

**Actor:** Customer | **Priority:** Medium | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CAT-006-01 | Customer can access the available sorting options. | Access Control | AC1 (CAT-006) |
| TD-CAT-006-02 | Selecting a sorting option reorders the product listing correctly. | Positive / Functional | AC2 (CAT-006) |
| TD-CAT-006-03 | Sorting does not remove valid products from the current result set. | Positive / Functional | AC3 (CAT-006) |
| TD-CAT-006-04 | The selected sorting behavior is applied consistently. | Positive / Functional | AC4 (CAT-006) |

### CAT-007 — Product Comparison

**Actor:** Customer | **Priority:** Medium | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CAT-007-01 | Customer can add an eligible product to comparison. | Positive / Functional | AC1 (CAT-007) |
| TD-CAT-007-02 | Multiple supported products can be compared. | Positive / Functional | AC2 (CAT-007) |
| TD-CAT-007-03 | Product information is displayed correctly. | Boundary | AC3 (CAT-007) |
| TD-CAT-007-04 | Customer can remove a product from comparison. | Positive / Functional | AC4 (CAT-007) |
| TD-CAT-007-05 | The comparison view updates after product removal. | Positive / Functional | AC5 (CAT-007) |

### CAT-008 — Customer-Facing Product Pricing

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CAT-008-01 | Product prices are displayed correctly in product listings. | Positive / Functional | AC1 (CAT-008) |
| TD-CAT-008-02 | Product prices are displayed correctly on product details. | Positive / Functional | AC2 (CAT-008) |
| TD-CAT-008-03 | Applicable variant pricing is reflected where configured. | Positive / Functional | AC3 (CAT-008) |
| TD-CAT-008-04 | Customer-facing pricing remains consistent across supported views. | Positive / Functional | AC4 (CAT-008) |


## 3. Product Search

*8 requirement(s) — 39 test condition(s) derived from acceptance criteria.*

### SEARCH-001 — Product Search

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-SEARCH-001-01 | Customer can enter and submit a search term. | Positive / Functional | AC1 (SEARCH-001) |
| TD-SEARCH-001-02 | Relevant products are returned for a valid search. | Positive / Functional | AC2 (SEARCH-001) |
| TD-SEARCH-001-03 | Search results display appropriate product information. | Boundary | AC3 (SEARCH-001) |
| TD-SEARCH-001-04 | Customer can navigate from a search result to product details. | State-based | AC4 (SEARCH-001) |
| TD-SEARCH-001-05 | Invalid or unsupported search terms are handled appropriately. | Negative | AC5 (SEARCH-001) |

### SEARCH-002 — Search Results

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-SEARCH-002-01 | Matching products are displayed for a valid query. | Positive / Functional | AC1 (SEARCH-002) |
| TD-SEARCH-002-02 | Relevant product information is displayed. | Boundary | AC2 (SEARCH-002) |
| TD-SEARCH-002-03 | Non-matching products are not incorrectly presented as matching results. | Positive / Functional | AC3 (SEARCH-002) |
| TD-SEARCH-002-04 | Customer can open a product from the results. | Positive / Functional | AC4 (SEARCH-002) |
| TD-SEARCH-002-05 | Search results remain consistent after supported navigation. | State-based | AC5 (SEARCH-002) |

### SEARCH-003 — Search Suggestions

**Actor:** Customer | **Priority:** Medium | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-SEARCH-003-01 | Suggestions are displayed when applicable. | Positive / Functional | AC1 (SEARCH-003) |
| TD-SEARCH-003-02 | Suggestions correspond to the entered search terms. | Positive / Functional | AC2 (SEARCH-003) |
| TD-SEARCH-003-03 | Suggestions update when the search query changes. | Positive / Functional | AC3 (SEARCH-003) |
| TD-SEARCH-003-04 | Customer can select a supported suggestion. | Positive / Functional | AC4 (SEARCH-003) |
| TD-SEARCH-003-05 | No suggestion is displayed when no suitable result exists, according to the configured behavior. | Positive / Functional | AC5 (SEARCH-003) |

### SEARCH-004 — Search Input Validation & Query Handling

**Actor:** Customer | **Priority:** High | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-SEARCH-004-01 | Valid search terms return the expected results. | Positive / Functional | AC1 (SEARCH-004) |
| TD-SEARCH-004-02 | Empty search input is handled correctly. | Negative | AC2 (SEARCH-004) |
| TD-SEARCH-004-03 | Unsupported or non-matching terms are handled correctly. | Positive / Functional | AC3 (SEARCH-004) |
| TD-SEARCH-004-04 | Search does not produce unexpected errors. | Negative | AC4 (SEARCH-004) |
| TD-SEARCH-004-05 | Results remain consistent with the submitted query. | Positive / Functional | AC5 (SEARCH-004) |

### SEARCH-005 — Search Filtering

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-SEARCH-005-01 | Customer can access available filters. | Access Control | AC1 (SEARCH-005) |
| TD-SEARCH-005-02 | Applying a filter updates the search results. | Positive / Functional | AC2 (SEARCH-005) |
| TD-SEARCH-005-03 | Products that do not match the selected criteria are excluded. | Positive / Functional | AC3 (SEARCH-005) |
| TD-SEARCH-005-04 | Matching products remain visible. | Positive / Functional | AC4 (SEARCH-005) |
| TD-SEARCH-005-05 | Multiple supported filters work according to the configured behavior. | Positive / Functional | AC5 (SEARCH-005) |
| TD-SEARCH-005-06 | Removing a filter restores the corresponding results. | Positive / Functional | AC6 (SEARCH-005) |

### SEARCH-006 — Search Sorting

**Actor:** Customer | **Priority:** Medium | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-SEARCH-006-01 | Customer can access the available sorting options. | Access Control | AC1 (SEARCH-006) |
| TD-SEARCH-006-02 | Selecting a sorting option reorders the results correctly. | Positive / Functional | AC2 (SEARCH-006) |
| TD-SEARCH-006-03 | Sorting preserves the current search criteria. | Positive / Functional | AC3 (SEARCH-006) |
| TD-SEARCH-006-04 | Sorting works correctly together with supported filters. | Positive / Functional | AC4 (SEARCH-006) |
| TD-SEARCH-006-05 | Removing or changing sorting returns results according to the newly selected behavior. | Positive / Functional | AC5 (SEARCH-006) |

### SEARCH-007 — No-Result Search Handling

**Actor:** Customer | **Priority:** Medium | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-SEARCH-007-01 | A non-matching query displays the appropriate no-results behavior. | Positive / Functional | AC1 (SEARCH-007) |
| TD-SEARCH-007-02 | No unrelated products are incorrectly displayed as search matches. | Positive / Functional | AC2 (SEARCH-007) |
| TD-SEARCH-007-03 | Customer can perform another search after receiving no results. | Negative | AC3 (SEARCH-007) |
| TD-SEARCH-007-04 | The application remains functional after a no-results search. | Positive / Functional | AC4 (SEARCH-007) |

### SEARCH-008 — Search Result to Product Details Navigation

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-SEARCH-008-01 | Customer can select a product from search results. | Positive / Functional | AC1 (SEARCH-008) |
| TD-SEARCH-008-02 | The correct product details page is displayed. | Positive / Functional | AC2 (SEARCH-008) |
| TD-SEARCH-008-03 | Product identity remains consistent with the selected result. | Positive / Functional | AC3 (SEARCH-008) |
| TD-SEARCH-008-04 | Customer can perform supported product actions from the details page. | Positive / Functional | AC4 (SEARCH-008) |


## 4. Shopping Cart

*8 requirement(s) — 42 test condition(s) derived from acceptance criteria.*

### CART-001 — Add Product to Cart

**Actor:** Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CART-001-01 | Customer can add an eligible product to the cart. | Positive / Functional | AC1 (CART-001) |
| TD-CART-001-02 | The correct product is displayed in the cart. | Positive / Functional | AC2 (CART-001) |
| TD-CART-001-03 | The selected quantity is reflected correctly. | Boundary | AC3 (CART-001) |
| TD-CART-001-04 | Required product options are validated. | Positive / Functional | AC4 (CART-001) |
| TD-CART-001-05 | The applicable product price is displayed correctly in the cart. | Positive / Functional | AC5 (CART-001) |
| TD-CART-001-06 | The cart count/state is updated after adding the product. | State-based | AC6 (CART-001) |

### CART-002 — Remove Product from Cart

**Actor:** Customer | **Priority:** High | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CART-002-01 | Customer can remove a product from the cart. | Positive / Functional | AC1 (CART-002) |
| TD-CART-002-02 | The removed product is no longer displayed. | Positive / Functional | AC2 (CART-002) |
| TD-CART-002-03 | Remaining cart items are preserved. | Positive / Functional | AC3 (CART-002) |
| TD-CART-002-04 | Cart totals are recalculated after removal. | Positive / Functional | AC4 (CART-002) |
| TD-CART-002-05 | The cart state reflects the removal after navigation or refresh. | State-based | AC5 (CART-002) |

### CART-003 — Update Cart Quantity

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CART-003-01 | Customer can increase a product quantity. | Boundary | AC1 (CART-003) |
| TD-CART-003-02 | Customer can decrease a product quantity where permitted. | Boundary | AC2 (CART-003) |
| TD-CART-003-03 | Updated quantity is displayed correctly. | Boundary | AC3 (CART-003) |
| TD-CART-003-04 | Item subtotal is recalculated correctly. | Positive / Functional | AC4 (CART-003) |
| TD-CART-003-05 | Cart totals are recalculated correctly. | Positive / Functional | AC5 (CART-003) |
| TD-CART-003-06 | Invalid quantities are handled according to the configured rules. | Negative | AC6 (CART-003) |

### CART-004 — Cart Totals Calculation

**Actor:** Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CART-004-01 | Cart subtotal reflects the current products and quantities. | Positive / Functional | AC1 (CART-004) |
| TD-CART-004-02 | Changing quantity updates the corresponding subtotal. | Boundary | AC2 (CART-004) |
| TD-CART-004-03 | Removing an item updates the cart total. | Positive / Functional | AC3 (CART-004) |
| TD-CART-004-04 | Displayed totals remain consistent with the current cart state. | State-based | AC4 (CART-004) |
| TD-CART-004-05 | Cart calculations are preserved when proceeding to checkout. | State-based | AC5 (CART-004) |

### CART-005 — Cart Product Price Calculation

**Actor:** Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Configuration / Compatibility Testing, Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CART-005-01 | Correct product price is displayed in the cart. | Positive / Functional | AC1 (CART-005) |
| TD-CART-005-02 | Variant-specific pricing is reflected where applicable. | Positive / Functional | AC2 (CART-005) |
| TD-CART-005-03 | Changing quantity updates the calculated price correctly. | Boundary | AC3 (CART-005) |
| TD-CART-005-04 | Selected product configuration is reflected in the price. | Compatibility | AC4 (CART-005) |
| TD-CART-005-05 | Cart pricing remains consistent with the applicable product pricing. | Positive / Functional | AC5 (CART-005) |

### CART-006 — Cart Persistence

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Configuration / Compatibility Testing, Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CART-006-01 | Cart contents remain available after page refresh where persistence is supported. | Positive / Functional | AC1 (CART-006) |
| TD-CART-006-02 | Product quantities remain correct. | Positive / Functional | AC2 (CART-006) |
| TD-CART-006-03 | Selected product configurations remain correct. | Compatibility | AC3 (CART-006) |
| TD-CART-006-04 | Cart totals remain consistent with persisted contents. | Positive / Functional | AC4 (CART-006) |
| TD-CART-006-05 | Cart data is associated with the correct customer/session. | State-based | AC5 (CART-006) |

### CART-007 — Cart Product Availability Validation

**Actor:** Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CART-007-01 | Available products can be added to and retained in the cart. | Positive / Functional | AC1 (CART-007) |
| TD-CART-007-02 | Unavailable products are prevented from being purchased where required. | Negative | AC2 (CART-007) |
| TD-CART-007-03 | Changes in product availability are handled correctly. | Positive / Functional | AC3 (CART-007) |
| TD-CART-007-04 | Appropriate feedback is displayed when a cart item becomes unavailable. | Negative | AC4 (CART-007) |
| TD-CART-007-05 | Cart behavior remains consistent before checkout. | State-based | AC5 (CART-007) |

### CART-008 — Authenticated Customer Cart Behavior

**Actor:** Authenticated Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CART-008-01 | Authenticated customer can add products to their cart. | Access Control | AC1 (CART-008) |
| TD-CART-008-02 | Cart contents remain associated with the correct customer. | Positive / Functional | AC2 (CART-008) |
| TD-CART-008-03 | Cart changes are reflected correctly after supported navigation. | State-based | AC3 (CART-008) |
| TD-CART-008-04 | Customer cannot access another customer's cart data. | Negative, Access Control | AC4 (CART-008) |
| TD-CART-008-05 | Cart behavior remains consistent with authentication and session state. | State-based | AC5 (CART-008) |


## 5. Product to Wishlist

*4 requirement(s) — 20 test condition(s) derived from acceptance criteria.*

### WISH-001 — Add Product to Wishlist

**Actor:** Authenticated Customer | **Priority:** Medium | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-WISH-001-01 | Authenticated customer can add an eligible product to the wishlist. | Access Control | AC1 (WISH-001) |
| TD-WISH-001-02 | The added product appears in the wishlist. | Positive / Functional | AC2 (WISH-001) |
| TD-WISH-001-03 | The correct product is added. | Positive / Functional | AC3 (WISH-001) |
| TD-WISH-001-04 | Wishlist data remains associated with the authenticated customer. | Access Control | AC4 (WISH-001) |
| TD-WISH-001-05 | Adding a product does not affect another customer's wishlist. | Positive / Functional | AC5 (WISH-001) |

### WISH-002 — Remove Product from Wishlist

**Actor:** Authenticated Customer | **Priority:** Medium | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-WISH-002-01 | Customer can remove a product from the wishlist. | Positive / Functional | AC1 (WISH-002) |
| TD-WISH-002-02 | Removed product no longer appears in the wishlist. | Positive / Functional | AC2 (WISH-002) |
| TD-WISH-002-03 | Remaining products remain unchanged. | Positive / Functional | AC3 (WISH-002) |
| TD-WISH-002-04 | Wishlist state is updated correctly after removal. | State-based | AC4 (WISH-002) |
| TD-WISH-002-05 | Removal does not affect another customer's wishlist. | Positive / Functional | AC5 (WISH-002) |

### WISH-003 — Wishlist Persistence

**Actor:** Authenticated Customer | **Priority:** Medium | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-WISH-003-01 | Wishlist items remain available after supported navigation or refresh. | State-based | AC1 (WISH-003) |
| TD-WISH-003-02 | Persisted products are displayed correctly. | Positive / Functional | AC2 (WISH-003) |
| TD-WISH-003-03 | Wishlist contents remain associated with the correct customer. | Positive / Functional | AC3 (WISH-003) |
| TD-WISH-003-04 | Removing a wishlist item updates the persisted state. | State-based | AC4 (WISH-003) |
| TD-WISH-003-05 | Wishlist state remains consistent across supported customer sessions. | State-based | AC5 (WISH-003) |

### WISH-004 — Authenticated Customer Wishlist Behavior

**Actor:** Authenticated Customer | **Priority:** Medium | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-WISH-004-01 | Authenticated customer can access their wishlist. | Access Control | AC1 (WISH-004) |
| TD-WISH-004-02 | Customer can add and remove eligible products. | Positive / Functional | AC2 (WISH-004) |
| TD-WISH-004-03 | Wishlist contents belong to the correct customer. | Positive / Functional | AC3 (WISH-004) |
| TD-WISH-004-04 | Wishlist changes persist according to the configured behavior. | Positive / Functional | AC4 (WISH-004) |
| TD-WISH-004-05 | Customer cannot access another customer's wishlist data. | Negative, Access Control | AC5 (WISH-004) |


## 6. Checkout

*10 requirement(s) — 54 test condition(s) derived from acceptance criteria.*

### CHECK-001 — Checkout Initiation

**Actor:** Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CHECK-001-01 | Customer can initiate checkout from a valid cart. | State-based | AC1 (CHECK-001) |
| TD-CHECK-001-02 | Customer is directed to the checkout process. | State-based | AC2 (CHECK-001) |
| TD-CHECK-001-03 | Current cart items are retained. | Positive / Functional | AC3 (CHECK-001) |
| TD-CHECK-001-04 | Checkout reflects the correct cart information. | Boundary, State-based | AC4 (CHECK-001) |
| TD-CHECK-001-05 | Invalid cart conditions prevent checkout initiation with appropriate feedback. | Negative, State-based | AC5 (CHECK-001) |

### CHECK-002 — Customer Information

**Actor:** Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CHECK-002-01 | Customer can enter the required checkout information. | Boundary, State-based | AC1 (CHECK-002) |
| TD-CHECK-002-02 | Required fields are validated. | Positive / Functional | AC2 (CHECK-002) |
| TD-CHECK-002-03 | Valid information is accepted. | Boundary | AC3 (CHECK-002) |
| TD-CHECK-002-04 | Invalid or incomplete information is rejected appropriately. | Negative, Boundary | AC4 (CHECK-002) |
| TD-CHECK-002-05 | Entered information is retained when moving through supported checkout steps. | Boundary, State-based | AC5 (CHECK-002) |

### CHECK-003 — Billing Address

**Actor:** Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CHECK-003-01 | Customer can enter or select a billing address. | Positive / Functional | AC1 (CHECK-003) |
| TD-CHECK-003-02 | Required billing address fields are validated. | Positive / Functional | AC2 (CHECK-003) |
| TD-CHECK-003-03 | Valid billing information is accepted. | Boundary | AC3 (CHECK-003) |
| TD-CHECK-003-04 | Invalid or incomplete billing information is rejected appropriately. | Negative, Boundary | AC4 (CHECK-003) |
| TD-CHECK-003-05 | The selected billing address is retained in the checkout flow. | State-based | AC5 (CHECK-003) |

### CHECK-004 — Shipping Address

**Actor:** Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CHECK-004-01 | Customer can enter or select a shipping address. | Positive / Functional | AC1 (CHECK-004) |
| TD-CHECK-004-02 | Required shipping address fields are validated. | Positive / Functional | AC2 (CHECK-004) |
| TD-CHECK-004-03 | Valid shipping information is accepted. | Boundary | AC3 (CHECK-004) |
| TD-CHECK-004-04 | Invalid or incomplete shipping information is rejected appropriately. | Negative, Boundary | AC4 (CHECK-004) |
| TD-CHECK-004-05 | The selected shipping address is retained during checkout. | State-based | AC5 (CHECK-004) |

### CHECK-005 — Shipping Method Selection

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CHECK-005-01 | Available shipping methods are displayed correctly. | Positive / Functional | AC1 (CHECK-005) |
| TD-CHECK-005-02 | Customer can select an applicable shipping method. | Positive / Functional | AC2 (CHECK-005) |
| TD-CHECK-005-03 | The selected method remains selected during the checkout flow. | State-based | AC3 (CHECK-005) |
| TD-CHECK-005-04 | Applicable shipping charges are reflected correctly. | Positive / Functional | AC4 (CHECK-005) |
| TD-CHECK-005-05 | An unavailable shipping method cannot be selected. | Negative | AC5 (CHECK-005) |

### CHECK-006 — Payment Method Selection

**Actor:** Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CHECK-006-01 | Available payment methods are displayed correctly. | Positive / Functional | AC1 (CHECK-006) |
| TD-CHECK-006-02 | Customer can select an applicable payment method. | Positive / Functional | AC2 (CHECK-006) |
| TD-CHECK-006-03 | The selected method remains associated with the checkout. | State-based | AC3 (CHECK-006) |
| TD-CHECK-006-04 | Required payment information is validated. | Boundary | AC4 (CHECK-006) |
| TD-CHECK-006-05 | Unavailable or disabled payment methods cannot be selected. | Negative | AC5 (CHECK-006) |

### CHECK-007 — Order Review

**Actor:** Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CHECK-007-01 | Order products and quantities are displayed correctly. | Positive / Functional | AC1 (CHECK-007) |
| TD-CHECK-007-02 | Product prices are displayed correctly. | Positive / Functional | AC2 (CHECK-007) |
| TD-CHECK-007-03 | Billing and shipping information are correct. | Boundary | AC3 (CHECK-007) |
| TD-CHECK-007-04 | Selected shipping and payment methods are displayed. | Positive / Functional | AC4 (CHECK-007) |
| TD-CHECK-007-05 | Applicable charges are calculated correctly. | Positive / Functional | AC5 (CHECK-007) |
| TD-CHECK-007-06 | Final order total is consistent with the checkout data. | State-based | AC6 (CHECK-007) |
| TD-CHECK-007-07 | Customer can proceed to checkout completion after reviewing the order. | State-based | AC7 (CHECK-007) |

### CHECK-008 — Required-Field Validation

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CHECK-008-01 | Empty required fields are detected. | Negative | AC1 (CHECK-008) |
| TD-CHECK-008-02 | Invalid required-field values are rejected. | Negative | AC2 (CHECK-008) |
| TD-CHECK-008-03 | Appropriate validation messages are displayed. | Positive / Functional | AC3 (CHECK-008) |
| TD-CHECK-008-04 | Customer cannot proceed while required information is invalid or missing. | Negative, Boundary, State-based | AC4 (CHECK-008) |
| TD-CHECK-008-05 | Customer can continue after correcting the validation errors. | Negative | AC5 (CHECK-008) |

### CHECK-009 — Checkout Navigation

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CHECK-009-01 | Customer can progress through the configured checkout steps. | State-based | AC1 (CHECK-009) |
| TD-CHECK-009-02 | Customer cannot proceed when the current step contains invalid required information. | Negative, Boundary, State-based | AC2 (CHECK-009) |
| TD-CHECK-009-03 | Previously entered valid information is retained during supported navigation. | Boundary, State-based | AC3 (CHECK-009) |
| TD-CHECK-009-04 | Mandatory checkout steps cannot be incorrectly bypassed. | Negative, State-based | AC4 (CHECK-009) |
| TD-CHECK-009-05 | Checkout state remains consistent when navigating between steps. | State-based | AC5 (CHECK-009) |

### CHECK-010 — Checkout Completion

**Actor:** Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-CHECK-010-01 | Customer can complete checkout with valid information. | Boundary, State-based | AC1 (CHECK-010) |
| TD-CHECK-010-02 | A new order is created successfully. | Positive / Functional | AC2 (CHECK-010) |
| TD-CHECK-010-03 | The order contains the expected products and quantities. | Positive / Functional | AC3 (CHECK-010) |
| TD-CHECK-010-04 | The order total matches the validated checkout total. | State-based | AC4 (CHECK-010) |
| TD-CHECK-010-05 | Customer receives an appropriate order confirmation. | Positive / Functional | AC5 (CHECK-010) |
| TD-CHECK-010-06 | Invalid checkout conditions prevent order creation. | Negative, State-based | AC6 (CHECK-010) |
| TD-CHECK-010-07 | The resulting order is available through the customer's order history. | Positive / Functional | AC7 (CHECK-010) |


## 7. Order Management

*10 requirement(s) — 55 test condition(s) derived from acceptance criteria.*

### ORDER-001 — Order Placement

**Actor:** Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ORDER-001-01 | Customer can place an order with valid checkout information. | Boundary, State-based | AC1 (ORDER-001) |
| TD-ORDER-001-02 | A new order is created after successful checkout. | State-based | AC2 (ORDER-001) |
| TD-ORDER-001-03 | The order contains the correct products and quantities. | Positive / Functional | AC3 (ORDER-001) |
| TD-ORDER-001-04 | The order total matches the validated checkout total. | State-based | AC4 (ORDER-001) |
| TD-ORDER-001-05 | The order is associated with the correct customer. | Positive / Functional | AC5 (ORDER-001) |
| TD-ORDER-001-06 | Customer receives an order confirmation. | Positive / Functional | AC6 (ORDER-001) |
| TD-ORDER-001-07 | The order is visible in the customer's order history. | Positive / Functional | AC7 (ORDER-001) |

### ORDER-002 — Order Confirmation

**Actor:** Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ORDER-002-01 | Successful order placement results in an order confirmation. | Positive / Functional | AC1 (ORDER-002) |
| TD-ORDER-002-02 | Confirmation indicates successful order creation. | Positive / Functional | AC2 (ORDER-002) |
| TD-ORDER-002-03 | The displayed order information corresponds to the created order. | Boundary | AC3 (ORDER-002) |
| TD-ORDER-002-04 | The order can subsequently be found in the customer's order history. | Positive / Functional | AC4 (ORDER-002) |
| TD-ORDER-002-05 | Failed order creation does not produce a false success confirmation. | Negative | AC5 (ORDER-002) |

### ORDER-003 — Order History

**Actor:** Authenticated Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ORDER-003-01 | Authenticated customer can access order history. | Access Control | AC1 (ORDER-003) |
| TD-ORDER-003-02 | Existing customer orders are displayed. | Positive / Functional | AC2 (ORDER-003) |
| TD-ORDER-003-03 | Order summary information is displayed correctly. | Boundary | AC3 (ORDER-003) |
| TD-ORDER-003-04 | Orders belong to the authenticated customer. | Access Control | AC4 (ORDER-003) |
| TD-ORDER-003-05 | Customer can select an order from the history. | Positive / Functional | AC5 (ORDER-003) |
| TD-ORDER-003-06 | Another customer's orders are not accessible. | Access Control | AC6 (ORDER-003) |

### ORDER-004 — Order Details

**Actor:** Authenticated Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ORDER-004-01 | Customer can open an order from order history. | Positive / Functional | AC1 (ORDER-004) |
| TD-ORDER-004-02 | Correct order details are displayed. | Positive / Functional | AC2 (ORDER-004) |
| TD-ORDER-004-03 | Products and quantities are displayed correctly. | Positive / Functional | AC3 (ORDER-004) |
| TD-ORDER-004-04 | Order pricing and totals are displayed correctly. | Positive / Functional | AC4 (ORDER-004) |
| TD-ORDER-004-05 | The displayed order belongs to the authenticated customer. | Access Control | AC5 (ORDER-004) |
| TD-ORDER-004-06 | Customer cannot access another customer's order details. | Negative, Access Control | AC6 (ORDER-004) |

### ORDER-005 — Order Status Visibility

**Actor:** Authenticated Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (invalid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ORDER-005-01 | Customer can view the status of an existing order. | State-based | AC1 (ORDER-005) |
| TD-ORDER-005-02 | The displayed status is correct. | State-based | AC2 (ORDER-005) |
| TD-ORDER-005-03 | Order status is consistent between order history and order details where applicable. | State-based | AC3 (ORDER-005) |
| TD-ORDER-005-04 | Status changes are reflected according to the application's behavior. | State-based | AC4 (ORDER-005) |
| TD-ORDER-005-05 | Customer cannot view the status of another customer's order. | Negative, State-based | AC5 (ORDER-005) |

### ORDER-006 — Order History to Order Details Navigation

**Actor:** Authenticated Customer | **Priority:** High | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ORDER-006-01 | Customer can select an order from order history. | Positive / Functional | AC1 (ORDER-006) |
| TD-ORDER-006-02 | The corresponding order details are displayed. | Positive / Functional | AC2 (ORDER-006) |
| TD-ORDER-006-03 | The correct order is opened. | Positive / Functional | AC3 (ORDER-006) |
| TD-ORDER-006-04 | Order information remains consistent between history and details. | Boundary | AC4 (ORDER-006) |
| TD-ORDER-006-05 | Customer cannot navigate to another customer's order details. | Negative, State-based | AC5 (ORDER-006) |

### ORDER-007 — Customer Order Data Isolation

**Actor:** Authenticated Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ORDER-007-01 | Customer can view their own orders. | Positive / Functional | AC1 (ORDER-007) |
| TD-ORDER-007-02 | Customer cannot view another customer's orders. | Negative | AC2 (ORDER-007) |
| TD-ORDER-007-03 | Another customer's order does not appear in the customer's order history. | Positive / Functional | AC3 (ORDER-007) |
| TD-ORDER-007-04 | Unauthorized access to another customer's order is prevented. | Negative, Access Control | AC4 (ORDER-007) |
| TD-ORDER-007-05 | Order information remains associated with the correct customer account. | Boundary | AC5 (ORDER-007) |

### ORDER-008 — Order Information Consistency

**Actor:** Authenticated Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ORDER-008-01 | Products displayed in the order match the products submitted during checkout. | State-based | AC1 (ORDER-008) |
| TD-ORDER-008-02 | Quantities remain correct. | Positive / Functional | AC2 (ORDER-008) |
| TD-ORDER-008-03 | Product prices and applicable charges are consistent with the completed order. | Positive / Functional | AC3 (ORDER-008) |
| TD-ORDER-008-04 | Final order total matches the confirmed checkout total. | State-based | AC4 (ORDER-008) |
| TD-ORDER-008-05 | Customer and shipping information correspond to the created order. | Boundary | AC5 (ORDER-008) |
| TD-ORDER-008-06 | Order history and order details display consistent information. | Boundary | AC6 (ORDER-008) |

### ORDER-009 — Order Persistence

**Actor:** Customer | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ORDER-009-01 | Successfully placed order appears in order history. | Positive / Functional | AC1 (ORDER-009) |
| TD-ORDER-009-02 | Order remains available after page refresh or supported navigation. | State-based | AC2 (ORDER-009) |
| TD-ORDER-009-03 | Order remains associated with the correct customer. | Positive / Functional | AC3 (ORDER-009) |
| TD-ORDER-009-04 | Persisted order details match the original order. | Positive / Functional | AC4 (ORDER-009) |
| TD-ORDER-009-05 | Order is not duplicated unexpectedly as a result of supported navigation or refresh. | Negative, State-based | AC5 (ORDER-009) |

### ORDER-010 — Order History Refresh Consistency

**Actor:** Authenticated Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ORDER-010-01 | Existing orders remain visible after page refresh. | Positive / Functional | AC1 (ORDER-010) |
| TD-ORDER-010-02 | Order information remains consistent after supported navigation. | Boundary, State-based | AC2 (ORDER-010) |
| TD-ORDER-010-03 | No unexpected duplicate orders are displayed. | Negative | AC3 (ORDER-010) |
| TD-ORDER-010-04 | Order status remains consistent with the persisted order state. | State-based | AC4 (ORDER-010) |
| TD-ORDER-010-05 | Orders belonging to other customers remain inaccessible. | Access Control | AC5 (ORDER-010) |


## 8. Admin

*22 requirement(s) — 150 test condition(s) derived from acceptance criteria.*

### ADMIN-001 — Administrator Login

**Actor:** Administrator | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-001-01 | Administrator can access the administration login page. | Access Control, State-based | AC1 (ADMIN-001) |
| TD-ADMIN-001-02 | Valid administrator credentials result in successful authentication. | Access Control | AC2 (ADMIN-001) |
| TD-ADMIN-001-03 | Successful authentication grants access to the administration area. | Access Control | AC3 (ADMIN-001) |
| TD-ADMIN-001-04 | Invalid credentials prevent administrator authentication. | Negative, Access Control | AC4 (ADMIN-001) |
| TD-ADMIN-001-05 | Appropriate authentication feedback is displayed for invalid credentials. | Negative | AC5 (ADMIN-001) |
| TD-ADMIN-001-06 | Authenticated administrator can access only the administration functionality permitted by the assigned role. | Access Control | AC6 (ADMIN-001) |

### ADMIN-002 — Administrator Logout

**Actor:** Authenticated Administrator | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-002-01 | Authenticated administrator can log out successfully. | Access Control | AC1 (ADMIN-002) |
| TD-ADMIN-002-02 | Administrator is returned to the expected unauthenticated state. | Access Control, State-based | AC2 (ADMIN-002) |
| TD-ADMIN-002-03 | Previously accessible protected administration pages cannot be accessed after logout without re-authentication. | Negative, Access Control, State-based | AC3 (ADMIN-002) |
| TD-ADMIN-002-04 | Administrator cannot continue performing protected actions using the terminated session. | Negative, Access Control, State-based | AC4 (ADMIN-002) |
| TD-ADMIN-002-05 | Administrator can access the administration area again after successful re-authentication. | Access Control | AC5 (ADMIN-002) |

### ADMIN-003 — Administrator Authentication State

**Actor:** Authenticated Administrator | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-003-01 | Authenticated administrator can navigate between permitted protected pages. | Access Control, State-based | AC1 (ADMIN-003) |
| TD-ADMIN-003-02 | Administrator remains authenticated during a valid session. | Access Control, State-based | AC2 (ADMIN-003) |
| TD-ADMIN-003-03 | Protected pages require authentication. | Access Control | AC3 (ADMIN-003) |
| TD-ADMIN-003-04 | Logout invalidates the authentication state. | Negative, State-based | AC4 (ADMIN-003) |
| TD-ADMIN-003-05 | An expired or invalid session cannot access protected administration functionality. | Negative, Access Control, State-based | AC5 (ADMIN-003) |
| TD-ADMIN-003-06 | Administrator can regain access after successful re-authentication. | Access Control | AC6 (ADMIN-003) |

### ADMIN-004 — Role-Based Access

**Actor:** Administrator | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-004-01 | Administrator with the required permission can access the corresponding functionality. | Access Control | AC1 (ADMIN-004) |
| TD-ADMIN-004-02 | Administrator without the required permission cannot access that functionality. | Negative, Access Control | AC2 (ADMIN-004) |
| TD-ADMIN-004-03 | Unauthorized direct access to protected administration pages is prevented. | Negative, Access Control | AC3 (ADMIN-004) |
| TD-ADMIN-004-04 | Access restrictions are consistent with the administrator's assigned role. | Access Control | AC4 (ADMIN-004) |
| TD-ADMIN-004-05 | Appropriate access-denied behavior is displayed for unauthorized actions. | Negative, Access Control | AC5 (ADMIN-004) |

### ADMIN-005 — Customer Role Permissions

**Actor:** Administrator | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-005-01 | Customer role with the required permission can access the corresponding functionality. | Access Control | AC1 (ADMIN-005) |
| TD-ADMIN-005-02 | Customer role without the required permission cannot access it. | Negative, Access Control | AC2 (ADMIN-005) |
| TD-ADMIN-005-03 | Removing a role permission removes the corresponding access. | Access Control | AC3 (ADMIN-005) |
| TD-ADMIN-005-04 | Adding a role permission grants the corresponding access where applicable. | Access Control | AC4 (ADMIN-005) |
| TD-ADMIN-005-05 | Direct access to unauthorized protected areas is prevented. | Negative, Access Control | AC5 (ADMIN-005) |
| TD-ADMIN-005-06 | Role permissions are enforced consistently across the administration area. | Access Control | AC6 (ADMIN-005) |

### ADMIN-006 — Protected Administration Area Access

**Actor:** Administrator | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-006-01 | Authorized administrator can access protected administration areas. | Access Control | AC1 (ADMIN-006) |
| TD-ADMIN-006-02 | Unauthenticated users cannot access protected administration areas. | Negative, Access Control | AC2 (ADMIN-006) |
| TD-ADMIN-006-03 | Authenticated users without the required permission cannot access restricted areas. | Negative, Access Control | AC3 (ADMIN-006) |
| TD-ADMIN-006-04 | Direct navigation to a protected URL does not bypass access control. | Access Control, State-based | AC4 (ADMIN-006) |
| TD-ADMIN-006-05 | Appropriate authentication or access-denied behavior is displayed. | Access Control | AC5 (ADMIN-006) |
| TD-ADMIN-006-06 | Protected administration functionality becomes available again after valid authentication and authorization. | Access Control | AC6 (ADMIN-006) |

### ADMIN-007 — Product Creation

**Actor:** Administrator | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-007-01 | Authorized administrator can access product creation. | Access Control | AC1 (ADMIN-007) |
| TD-ADMIN-007-02 | Required product fields are validated. | Positive / Functional | AC2 (ADMIN-007) |
| TD-ADMIN-007-03 | Valid product information creates a product successfully. | Boundary | AC3 (ADMIN-007) |
| TD-ADMIN-007-04 | Invalid or incomplete information prevents product creation. | Negative, Boundary | AC4 (ADMIN-007) |
| TD-ADMIN-007-05 | Created product contains the submitted information. | Boundary | AC5 (ADMIN-007) |
| TD-ADMIN-007-06 | Product publication/availability reflects the configured settings. | Positive / Functional | AC6 (ADMIN-007) |
| TD-ADMIN-007-07 | Unauthorized users cannot create products. | Negative, Access Control | AC7 (ADMIN-007) |

### ADMIN-008 — Product Editing

**Actor:** Administrator | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-008-01 | Authorized administrator can open an existing product for editing. | Access Control | AC1 (ADMIN-008) |
| TD-ADMIN-008-02 | Product information is displayed correctly before editing. | Boundary | AC2 (ADMIN-008) |
| TD-ADMIN-008-03 | Valid changes are saved successfully. | Positive / Functional | AC3 (ADMIN-008) |
| TD-ADMIN-008-04 | Invalid or incomplete changes are rejected appropriately. | Negative | AC4 (ADMIN-008) |
| TD-ADMIN-008-05 | Updated information is persisted after saving. | Boundary | AC5 (ADMIN-008) |
| TD-ADMIN-008-06 | Updated product information is reflected in the relevant catalog views. | Boundary | AC6 (ADMIN-008) |
| TD-ADMIN-008-07 | Unauthorized users cannot modify products. | Negative, Access Control | AC7 (ADMIN-008) |

### ADMIN-009 — Product Activation/Deactivation

**Actor:** Administrator | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-009-01 | Authorized administrator can activate an eligible product. | Access Control | AC1 (ADMIN-009) |
| TD-ADMIN-009-02 | Authorized administrator can deactivate an active product. | Access Control | AC2 (ADMIN-009) |
| TD-ADMIN-009-03 | Activated product is displayed according to its configured publication settings. | Positive / Functional | AC3 (ADMIN-009) |
| TD-ADMIN-009-04 | Deactivated product is no longer normally available to customers. | Positive / Functional | AC4 (ADMIN-009) |
| TD-ADMIN-009-05 | Product state persists after saving and refreshing. | State-based | AC5 (ADMIN-009) |
| TD-ADMIN-009-06 | Unauthorized users cannot change the product activation state. | Negative, Access Control, State-based | AC6 (ADMIN-009) |

### ADMIN-010 — Category Management

**Actor:** Administrator | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-010-01 | Authorized administrator can access category management. | Access Control | AC1 (ADMIN-010) |
| TD-ADMIN-010-02 | Administrator can create a valid category. | Access Control | AC2 (ADMIN-010) |
| TD-ADMIN-010-03 | Administrator can edit an existing category. | Access Control | AC3 (ADMIN-010) |
| TD-ADMIN-010-04 | Invalid or incomplete category information is rejected appropriately. | Negative, Boundary | AC4 (ADMIN-010) |
| TD-ADMIN-010-05 | Category changes are persisted after saving. | Positive / Functional | AC5 (ADMIN-010) |
| TD-ADMIN-010-06 | Category publication state is respected by the storefront. | State-based | AC6 (ADMIN-010) |
| TD-ADMIN-010-07 | Products assigned to the category are associated with the correct category. | Positive / Functional | AC7 (ADMIN-010) |
| TD-ADMIN-010-08 | Unauthorized users cannot modify categories. | Negative, Access Control | AC8 (ADMIN-010) |

### ADMIN-011 — Product Availability Configuration

**Actor:** Administrator | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Configuration / Compatibility Testing, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-011-01 | Authorized administrator can access product availability settings. | Access Control | AC1 (ADMIN-011) |
| TD-ADMIN-011-02 | Valid availability settings can be saved successfully. | Positive / Functional | AC2 (ADMIN-011) |
| TD-ADMIN-011-03 | Invalid availability configuration is rejected appropriately. | Negative, Compatibility | AC3 (ADMIN-011) |
| TD-ADMIN-011-04 | Updated availability settings persist after saving. | Positive / Functional | AC4 (ADMIN-011) |
| TD-ADMIN-011-05 | Storefront behavior reflects the configured product availability. | Positive / Functional | AC5 (ADMIN-011) |
| TD-ADMIN-011-06 | Unavailable products cannot be treated as normally purchasable where the configured rules prohibit purchase. | Negative | AC6 (ADMIN-011) |
| TD-ADMIN-011-07 | Unauthorized users cannot modify product availability settings. | Negative, Access Control | AC7 (ADMIN-011) |

### ADMIN-012 — Inventory-Related Configuration

**Actor:** Administrator | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Configuration / Compatibility Testing, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-012-01 | Authorized administrator can access inventory-related product settings. | Access Control | AC1 (ADMIN-012) |
| TD-ADMIN-012-02 | Valid inventory configuration can be saved successfully. | Compatibility | AC2 (ADMIN-012) |
| TD-ADMIN-012-03 | Invalid inventory configuration is rejected appropriately. | Negative, Compatibility | AC3 (ADMIN-012) |
| TD-ADMIN-012-04 | Updated inventory settings persist after saving. | Positive / Functional | AC4 (ADMIN-012) |
| TD-ADMIN-012-05 | Applicable storefront behavior reflects the configured inventory state. | State-based | AC5 (ADMIN-012) |
| TD-ADMIN-012-06 | Inventory constraints are respected when customers interact with the product. | Positive / Functional | AC6 (ADMIN-012) |
| TD-ADMIN-012-07 | Unauthorized users cannot modify inventory-related configuration. | Negative, Access Control, Compatibility | AC7 (ADMIN-012) |

### ADMIN-013 — Customer Search

**Actor:** Administrator | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-013-01 | Authorized administrator can access customer search. | Access Control | AC1 (ADMIN-013) |
| TD-ADMIN-013-02 | Administrator can search using supported search criteria. | Access Control | AC2 (ADMIN-013) |
| TD-ADMIN-013-03 | Matching customers are returned correctly. | Positive / Functional | AC3 (ADMIN-013) |
| TD-ADMIN-013-04 | Non-matching customers are excluded from the results. | Positive / Functional | AC4 (ADMIN-013) |
| TD-ADMIN-013-05 | Searching with no matching customer displays an appropriate empty-result state. | Negative, State-based | AC5 (ADMIN-013) |
| TD-ADMIN-013-06 | Search results reflect the correct customer information. | Boundary | AC6 (ADMIN-013) |
| TD-ADMIN-013-07 | Unauthorized users cannot access customer search functionality. | Negative, Access Control | AC7 (ADMIN-013) |

### ADMIN-014 — Customer Creation & Editing

**Actor:** Administrator | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-014-01 | Authorized administrator can access customer management. | Access Control | AC1 (ADMIN-014) |
| TD-ADMIN-014-02 | Administrator can create a valid customer account where supported. | Access Control | AC2 (ADMIN-014) |
| TD-ADMIN-014-03 | Administrator can edit an existing customer account. | Access Control | AC3 (ADMIN-014) |
| TD-ADMIN-014-04 | Required customer information is validated. | Boundary | AC4 (ADMIN-014) |
| TD-ADMIN-014-05 | Invalid customer information is rejected appropriately. | Negative, Boundary | AC5 (ADMIN-014) |
| TD-ADMIN-014-06 | Valid changes are persisted successfully. | Positive / Functional | AC6 (ADMIN-014) |
| TD-ADMIN-014-07 | Updated customer information is displayed correctly after saving. | Boundary | AC7 (ADMIN-014) |
| TD-ADMIN-014-08 | Unauthorized users cannot create or modify customer accounts. | Negative, Access Control | AC8 (ADMIN-014) |

### ADMIN-015 — Customer Roles

**Actor:** Administrator | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-015-01 | Authorized administrator can view the customer's assigned roles. | Access Control | AC1 (ADMIN-015) |
| TD-ADMIN-015-02 | Administrator can assign an available customer role. | Access Control | AC2 (ADMIN-015) |
| TD-ADMIN-015-03 | Administrator can remove an applicable customer role. | Access Control | AC3 (ADMIN-015) |
| TD-ADMIN-015-04 | Valid role changes are persisted successfully. | Access Control | AC4 (ADMIN-015) |
| TD-ADMIN-015-05 | Updated roles are displayed correctly after saving. | Access Control | AC5 (ADMIN-015) |
| TD-ADMIN-015-06 | Role-associated permissions are enforced after the role change. | Access Control | AC6 (ADMIN-015) |
| TD-ADMIN-015-07 | Unauthorized administrators cannot manage customer roles. | Negative, Access Control | AC7 (ADMIN-015) |

### ADMIN-016 — Customer Status Management

**Actor:** Administrator | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Decision Table (role/permission-based), Equivalence Partitioning (invalid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-016-01 | Authorized administrator can view the current customer status. | Access Control, State-based | AC1 (ADMIN-016) |
| TD-ADMIN-016-02 | Administrator can change the supported customer status. | Access Control, State-based | AC2 (ADMIN-016) |
| TD-ADMIN-016-03 | Valid status changes are saved successfully. | State-based | AC3 (ADMIN-016) |
| TD-ADMIN-016-04 | Updated status persists after saving and refreshing. | State-based | AC4 (ADMIN-016) |
| TD-ADMIN-016-05 | Applicable customer behavior reflects the configured status. | State-based | AC5 (ADMIN-016) |
| TD-ADMIN-016-06 | Invalid or unsupported status changes are rejected. | Negative, State-based | AC6 (ADMIN-016) |
| TD-ADMIN-016-07 | Unauthorized users cannot modify customer status. | Negative, Access Control, State-based | AC7 (ADMIN-016) |

### ADMIN-017 — Customer Information Management

**Actor:** Administrator | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-017-01 | Authorized administrator can view customer information. | Boundary, Access Control | AC1 (ADMIN-017) |
| TD-ADMIN-017-02 | Customer information is displayed accurately. | Boundary | AC2 (ADMIN-017) |
| TD-ADMIN-017-03 | Administrator can update supported customer information. | Boundary, Access Control | AC3 (ADMIN-017) |
| TD-ADMIN-017-04 | Required fields are validated. | Positive / Functional | AC4 (ADMIN-017) |
| TD-ADMIN-017-05 | Invalid customer information is rejected appropriately. | Negative, Boundary | AC5 (ADMIN-017) |
| TD-ADMIN-017-06 | Valid changes are persisted successfully. | Positive / Functional | AC6 (ADMIN-017) |
| TD-ADMIN-017-07 | Updated information is displayed correctly after saving. | Boundary | AC7 (ADMIN-017) |
| TD-ADMIN-017-08 | Unauthorized users cannot access or modify protected customer information. | Negative, Boundary, Access Control | AC8 (ADMIN-017) |

### ADMIN-018 — Order Search

**Actor:** Administrator | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-018-01 | Authorized administrator can access order search. | Access Control | AC1 (ADMIN-018) |
| TD-ADMIN-018-02 | Administrator can search using supported order criteria. | Access Control | AC2 (ADMIN-018) |
| TD-ADMIN-018-03 | Matching orders are returned correctly. | Positive / Functional | AC3 (ADMIN-018) |
| TD-ADMIN-018-04 | Non-matching orders are excluded. | Positive / Functional | AC4 (ADMIN-018) |
| TD-ADMIN-018-05 | No-result searches display an appropriate empty state. | Negative, State-based | AC5 (ADMIN-018) |
| TD-ADMIN-018-06 | Search results contain accurate order information. | Boundary | AC6 (ADMIN-018) |
| TD-ADMIN-018-07 | Unauthorized users cannot access order search functionality. | Negative, Access Control | AC7 (ADMIN-018) |

### ADMIN-019 — Order Details

**Actor:** Administrator | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-019-01 | Authorized administrator can open an order from the order-management interface. | Access Control | AC1 (ADMIN-019) |
| TD-ADMIN-019-02 | Correct order details are displayed. | Positive / Functional | AC2 (ADMIN-019) |
| TD-ADMIN-019-03 | Products and quantities are displayed correctly. | Positive / Functional | AC3 (ADMIN-019) |
| TD-ADMIN-019-04 | Customer information is associated with the correct order. | Boundary | AC4 (ADMIN-019) |
| TD-ADMIN-019-05 | Billing and shipping information are displayed correctly where applicable. | Boundary | AC5 (ADMIN-019) |
| TD-ADMIN-019-06 | Order pricing and totals are displayed consistently. | Positive / Functional | AC6 (ADMIN-019) |
| TD-ADMIN-019-07 | Available order-management actions respect administrator permissions. | Access Control | AC7 (ADMIN-019) |
| TD-ADMIN-019-08 | Unauthorized users cannot access protected order details. | Negative, Access Control | AC8 (ADMIN-019) |

### ADMIN-020 — Order Status Management

**Actor:** Administrator | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-020-01 | Authorized administrator can view the current order status. | Access Control, State-based | AC1 (ADMIN-020) |
| TD-ADMIN-020-02 | Administrator can update the supported order status. | Access Control, State-based | AC2 (ADMIN-020) |
| TD-ADMIN-020-03 | Valid status changes are saved successfully. | State-based | AC3 (ADMIN-020) |
| TD-ADMIN-020-04 | Updated status persists after refresh. | State-based | AC4 (ADMIN-020) |
| TD-ADMIN-020-05 | The correct order is updated. | Positive / Functional | AC5 (ADMIN-020) |
| TD-ADMIN-020-06 | Applicable customer-facing order information reflects the updated status. | Boundary, State-based | AC6 (ADMIN-020) |
| TD-ADMIN-020-07 | Invalid or unsupported status changes are rejected. | Negative, State-based | AC7 (ADMIN-020) |
| TD-ADMIN-020-08 | Unauthorized users cannot modify order status. | Negative, Access Control, State-based | AC8 (ADMIN-020) |

### ADMIN-021 — Order Management Workflows

**Actor:** Administrator | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-021-01 | Authorized administrator can perform supported order-management actions. | Access Control | AC1 (ADMIN-021) |
| TD-ADMIN-021-02 | Unauthorized administrators cannot perform restricted actions. | Negative, Access Control | AC2 (ADMIN-021) |
| TD-ADMIN-021-03 | Actions are applied to the correct order. | Positive / Functional | AC3 (ADMIN-021) |
| TD-ADMIN-021-04 | Valid changes are persisted successfully. | Positive / Functional | AC4 (ADMIN-021) |
| TD-ADMIN-021-05 | Order state remains consistent after management actions. | State-based | AC5 (ADMIN-021) |
| TD-ADMIN-021-06 | Invalid or unsupported actions are rejected appropriately. | Negative | AC6 (ADMIN-021) |
| TD-ADMIN-021-07 | Relevant order information is updated after a successful action. | Boundary | AC7 (ADMIN-021) |
| TD-ADMIN-021-08 | Customer-facing order information reflects applicable changes. | Boundary | AC8 (ADMIN-021) |

### ADMIN-022 — Customer/Order Relationship Validation

**Actor:** Administrator | **Priority:** Critical | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ADMIN-022-01 | Administrator can identify the customer associated with an order. | Access Control | AC1 (ADMIN-022) |
| TD-ADMIN-022-02 | Displayed customer information matches the order's persisted customer relationship. | Boundary | AC2 (ADMIN-022) |
| TD-ADMIN-022-03 | Orders belonging to different customers are not incorrectly associated. | Positive / Functional | AC3 (ADMIN-022) |
| TD-ADMIN-022-04 | Customer/order relationship remains consistent after supported order updates. | Positive / Functional | AC4 (ADMIN-022) |
| TD-ADMIN-022-05 | Order history and customer-related order information remain consistent where applicable. | Boundary | AC5 (ADMIN-022) |
| TD-ADMIN-022-06 | Invalid customer/order relationships are not exposed as valid data. | Negative | AC6 (ADMIN-022) |


## 9. Promotions & Pricing

*6 requirement(s) — 44 test condition(s) derived from acceptance criteria.*

### PROMO-001 — Product Pricing

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-PROMO-001-01 | Customer can view the configured price for a product. | Positive / Functional | AC1 (PROMO-001) |
| TD-PROMO-001-02 | The displayed price matches the applicable configured product price. | Positive / Functional | AC2 (PROMO-001) |
| TD-PROMO-001-03 | Product listing and product details display the applicable price consistently. | Positive / Functional | AC3 (PROMO-001) |
| TD-PROMO-001-04 | Applicable variant pricing is reflected where configured. | Positive / Functional | AC4 (PROMO-001) |
| TD-PROMO-001-05 | The applicable product price is correctly carried into subsequent cart and checkout calculations. | State-based | AC5 (PROMO-001) |

### PROMO-002 — Discount Application

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-PROMO-002-01 | Eligible products or orders receive the configured discount. | Positive / Functional | AC1 (PROMO-002) |
| TD-PROMO-002-02 | Ineligible products or orders do not receive the discount. | Positive / Functional | AC2 (PROMO-002) |
| TD-PROMO-002-03 | The calculated discount amount is correct. | Positive / Functional | AC3 (PROMO-002) |
| TD-PROMO-002-04 | The discounted price or total is displayed correctly. | Positive / Functional | AC4 (PROMO-002) |
| TD-PROMO-002-05 | The discount is reflected correctly in the shopping cart. | Positive / Functional | AC5 (PROMO-002) |
| TD-PROMO-002-06 | The discount is reflected correctly during checkout. | State-based | AC6 (PROMO-002) |
| TD-PROMO-002-07 | Discount behavior remains consistent through the order journey. | Positive / Functional | AC7 (PROMO-002) |

### PROMO-003 — Coupon Application

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-PROMO-003-01 | Customer can enter a coupon code. | Positive / Functional | AC1 (PROMO-003) |
| TD-PROMO-003-02 | A valid eligible coupon is accepted. | Positive / Functional | AC2 (PROMO-003) |
| TD-PROMO-003-03 | The correct discount is applied. | Positive / Functional | AC3 (PROMO-003) |
| TD-PROMO-003-04 | The updated cart/order total reflects the coupon discount. | Positive / Functional | AC4 (PROMO-003) |
| TD-PROMO-003-05 | Invalid coupon codes are rejected. | Negative | AC5 (PROMO-003) |
| TD-PROMO-003-06 | Expired or ineligible coupons are rejected. | Negative, State-based | AC6 (PROMO-003) |
| TD-PROMO-003-07 | Appropriate feedback is displayed when a coupon cannot be applied. | Negative | AC7 (PROMO-003) |
| TD-PROMO-003-08 | Coupon behavior remains consistent through checkout. | State-based | AC8 (PROMO-003) |

### PROMO-004 — Tier Pricing

**Actor:** Customer | **Priority:** Medium | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-PROMO-004-01 | Customer receives the configured tier price when the required quantity is reached. | Boundary | AC1 (PROMO-004) |
| TD-PROMO-004-02 | Quantity below the threshold does not incorrectly receive the tier price. | Boundary | AC2 (PROMO-004) |
| TD-PROMO-004-03 | The correct price is applied when multiple tiers are configured. | Positive / Functional | AC3 (PROMO-004) |
| TD-PROMO-004-04 | The updated unit price is displayed correctly. | Positive / Functional | AC4 (PROMO-004) |
| TD-PROMO-004-05 | Cart totals reflect the applicable tier price. | Positive / Functional | AC5 (PROMO-004) |
| TD-PROMO-004-06 | Checkout totals remain consistent with the tier pricing. | State-based | AC6 (PROMO-004) |
| TD-PROMO-004-07 | Tier pricing is not applied to products where it is not configured. | Positive / Functional | AC7 (PROMO-004) |

### PROMO-005 — Promotional Pricing Validation

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-PROMO-005-01 | Eligible products display the configured promotional price. | Positive / Functional | AC1 (PROMO-005) |
| TD-PROMO-005-02 | Ineligible products do not receive the promotional price. | Positive / Functional | AC2 (PROMO-005) |
| TD-PROMO-005-03 | Promotional pricing is correctly applied during the active promotion period. | Positive / Functional | AC3 (PROMO-005) |
| TD-PROMO-005-04 | Promotional pricing is not incorrectly applied outside the configured promotion period. | Positive / Functional | AC4 (PROMO-005) |
| TD-PROMO-005-05 | The correct price is reflected in the shopping cart. | Positive / Functional | AC5 (PROMO-005) |
| TD-PROMO-005-06 | The correct price is reflected during checkout. | State-based | AC6 (PROMO-005) |
| TD-PROMO-005-07 | Promotional pricing remains consistent throughout the shopping journey. | Positive / Functional | AC7 (PROMO-005) |

### PROMO-006 — Price Calculation Throughout Shopping Journey

**Actor:** Customer | **Priority:** Critical | **Risk:** Critical | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-PROMO-006-01 | Product price is calculated correctly when the product is selected. | Positive / Functional | AC1 (PROMO-006) |
| TD-PROMO-006-02 | Cart item price matches the applicable product pricing. | Positive / Functional | AC2 (PROMO-006) |
| TD-PROMO-006-03 | Applicable discounts are reflected correctly. | Positive / Functional | AC3 (PROMO-006) |
| TD-PROMO-006-04 | Applicable coupons are reflected correctly. | Positive / Functional | AC4 (PROMO-006) |
| TD-PROMO-006-05 | Applicable tier pricing is reflected correctly. | Positive / Functional | AC5 (PROMO-006) |
| TD-PROMO-006-06 | Promotional pricing is reflected correctly. | Positive / Functional | AC6 (PROMO-006) |
| TD-PROMO-006-07 | Cart subtotal and total are calculated correctly. | Positive / Functional | AC7 (PROMO-006) |
| TD-PROMO-006-08 | Checkout pricing matches the applicable cart pricing. | State-based | AC8 (PROMO-006) |
| TD-PROMO-006-09 | Order confirmation reflects the correct final amount. | Positive / Functional | AC9 (PROMO-006) |
| TD-PROMO-006-10 | No unexpected price discrepancy occurs between product, cart, checkout, and order confirmation. | State-based | AC10 (PROMO-006) |


## 10. Reviews & Subscriptions

*4 requirement(s) — 29 test condition(s) derived from acceptance criteria.*

### REVIEW-001 — Product Review Submission

**Actor:** Customer | **Priority:** Medium | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-REVIEW-001-01 | Eligible customer can access product review submission. | Access Control | AC1 (REVIEW-001) |
| TD-REVIEW-001-02 | Customer can submit a valid review. | Positive / Functional | AC2 (REVIEW-001) |
| TD-REVIEW-001-03 | Required review information is validated. | Boundary | AC3 (REVIEW-001) |
| TD-REVIEW-001-04 | Invalid review information is rejected appropriately. | Negative, Boundary | AC4 (REVIEW-001) |
| TD-REVIEW-001-05 | Valid review submission is stored successfully. | Positive / Functional | AC5 (REVIEW-001) |
| TD-REVIEW-001-06 | Submitted review is associated with the correct product. | Positive / Functional | AC6 (REVIEW-001) |
| TD-REVIEW-001-07 | Submitted review is associated with the correct customer where applicable. | Positive / Functional | AC7 (REVIEW-001) |
| TD-REVIEW-001-08 | Ineligible customers cannot submit reviews when review restrictions are configured. | Negative, Access Control | AC8 (REVIEW-001) |

### REVIEW-002 — Review Visibility

**Actor:** Customer | **Priority:** Medium | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Configuration / Compatibility Testing, Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-REVIEW-002-01 | Customer can view reviews for a product when reviews are available and visible. | Positive / Functional | AC1 (REVIEW-002) |
| TD-REVIEW-002-02 | Published/approved reviews are displayed according to configuration. | Compatibility | AC2 (REVIEW-002) |
| TD-REVIEW-002-03 | Reviews that are not eligible for display are not shown. | Positive / Functional | AC3 (REVIEW-002) |
| TD-REVIEW-002-04 | Displayed reviews belong to the correct product. | Positive / Functional | AC4 (REVIEW-002) |
| TD-REVIEW-002-05 | Review content and applicable metadata are displayed correctly. | Positive / Functional | AC5 (REVIEW-002) |
| TD-REVIEW-002-06 | Review visibility reflects changes to the review state where applicable. | State-based | AC6 (REVIEW-002) |
| TD-REVIEW-002-07 | No review from another product is incorrectly displayed. | Positive / Functional | AC7 (REVIEW-002) |

### REVIEW-003 — Review Validation

**Actor:** Customer | **Priority:** Medium | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-REVIEW-003-01 | Valid review information can be submitted successfully. | Boundary | AC1 (REVIEW-003) |
| TD-REVIEW-003-02 | Required review fields are validated. | Positive / Functional | AC2 (REVIEW-003) |
| TD-REVIEW-003-03 | Empty or incomplete required fields are rejected. | Negative | AC3 (REVIEW-003) |
| TD-REVIEW-003-04 | Invalid review information is rejected appropriately. | Negative, Boundary | AC4 (REVIEW-003) |
| TD-REVIEW-003-05 | Appropriate validation feedback is displayed. | Positive / Functional | AC5 (REVIEW-003) |
| TD-REVIEW-003-06 | Valid review data follows the configured review workflow. | State-based | AC6 (REVIEW-003) |
| TD-REVIEW-003-07 | Invalid review data is not incorrectly stored or published. | Negative | AC7 (REVIEW-003) |

### REVIEW-004 — Newsletter Subscription

**Actor:** Customer | **Priority:** Medium | **Risk:** Low | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Decision Table (role/permission-based), Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-REVIEW-004-01 | Customer can access newsletter subscription when enabled. | Access Control | AC1 (REVIEW-004) |
| TD-REVIEW-004-02 | Customer can successfully subscribe using valid information. | Boundary | AC2 (REVIEW-004) |
| TD-REVIEW-004-03 | Invalid or incomplete subscription information is rejected appropriately. | Negative, Boundary | AC3 (REVIEW-004) |
| TD-REVIEW-004-04 | The customer's subscription state is updated successfully. | State-based | AC4 (REVIEW-004) |
| TD-REVIEW-004-05 | Appropriate confirmation or feedback is displayed. | Positive / Functional | AC5 (REVIEW-004) |
| TD-REVIEW-004-06 | Newsletter subscription is not available when the feature is disabled. | Positive / Functional | AC6 (REVIEW-004) |
| TD-REVIEW-004-07 | Duplicate subscription behavior follows the configured rules. | Negative | AC7 (REVIEW-004) |


## 11. Shipping & Payment Integration Boundaries

*5 requirement(s) — 36 test condition(s) derived from acceptance criteria.*

### INTEG-001 — Shipping Method Availability

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-INTEG-001-01 | Customer can view available shipping methods during checkout. | State-based | AC1 (INTEG-001) |
| TD-INTEG-001-02 | Available shipping methods are displayed correctly. | Positive / Functional | AC2 (INTEG-001) |
| TD-INTEG-001-03 | Unavailable shipping methods are not incorrectly displayed as selectable. | Negative | AC3 (INTEG-001) |
| TD-INTEG-001-04 | Shipping availability reflects the customer's shipping information. | Boundary | AC4 (INTEG-001) |
| TD-INTEG-001-05 | Shipping-method availability reflects the configured rules. | Positive / Functional | AC5 (INTEG-001) |
| TD-INTEG-001-06 | Integration failures are handled appropriately. | Negative | AC6 (INTEG-001) |
| TD-INTEG-001-07 | The customer cannot select a shipping method that is unavailable. | Negative | AC7 (INTEG-001) |

### INTEG-002 — Shipping Option Selection

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-INTEG-002-01 | Customer can select an available shipping method. | Positive / Functional | AC1 (INTEG-002) |
| TD-INTEG-002-02 | Selected shipping method is clearly identified. | Positive / Functional | AC2 (INTEG-002) |
| TD-INTEG-002-03 | Applicable shipping cost is calculated correctly. | Positive / Functional | AC3 (INTEG-002) |
| TD-INTEG-002-04 | Order total reflects the selected shipping cost. | Positive / Functional | AC4 (INTEG-002) |
| TD-INTEG-002-05 | Selected shipping option persists when navigating through checkout. | State-based | AC5 (INTEG-002) |
| TD-INTEG-002-06 | Customer cannot select an unavailable shipping method. | Negative | AC6 (INTEG-002) |
| TD-INTEG-002-07 | Changing the shipping method updates the applicable shipping cost and total. | Positive / Functional | AC7 (INTEG-002) |
| TD-INTEG-002-08 | Shipping selection remains consistent with the final order. | Positive / Functional | AC8 (INTEG-002) |

### INTEG-003 — Payment Method Availability

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Configuration / Compatibility Testing, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-INTEG-003-01 | Customer can view available payment methods during checkout. | State-based | AC1 (INTEG-003) |
| TD-INTEG-003-02 | Available payment methods are displayed correctly. | Positive / Functional | AC2 (INTEG-003) |
| TD-INTEG-003-03 | Unavailable payment methods are not incorrectly displayed as selectable. | Negative | AC3 (INTEG-003) |
| TD-INTEG-003-04 | Payment availability reflects the applicable configuration. | Compatibility | AC4 (INTEG-003) |
| TD-INTEG-003-05 | Integration failures are handled appropriately. | Negative | AC5 (INTEG-003) |
| TD-INTEG-003-06 | Customer cannot select a payment method that is unavailable. | Negative | AC6 (INTEG-003) |

### INTEG-004 — Payment Method Selection

**Actor:** Customer | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-INTEG-004-01 | Customer can select an available payment method. | Positive / Functional | AC1 (INTEG-004) |
| TD-INTEG-004-02 | Selected payment method is clearly identified. | Positive / Functional | AC2 (INTEG-004) |
| TD-INTEG-004-03 | The selected method remains associated with the order during checkout. | State-based | AC3 (INTEG-004) |
| TD-INTEG-004-04 | Customer cannot select an unavailable payment method. | Negative | AC4 (INTEG-004) |
| TD-INTEG-004-05 | Changing the payment method updates the selected payment state correctly. | State-based | AC5 (INTEG-004) |
| TD-INTEG-004-06 | Checkout can continue after a valid payment method is selected. | State-based | AC6 (INTEG-004) |
| TD-INTEG-004-07 | The selected payment method is reflected in the applicable order information. | Boundary | AC7 (INTEG-004) |

### INTEG-005 — Integration Boundary Behavior

**Actor:** Customer | **Priority:** Critical | **Risk:** Critical | **Automation Candidate:** Yes

**Test Design Technique(s):** Boundary Value Analysis, Equivalence Partitioning (invalid class), Equivalence Partitioning (valid class), State Transition Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-INTEG-005-01 | Successful shipping/payment integration responses are processed correctly. | Positive / Functional | AC1 (INTEG-005) |
| TD-INTEG-005-02 | Failed integration responses are handled appropriately. | Negative | AC2 (INTEG-005) |
| TD-INTEG-005-03 | Appropriate error or feedback information is presented to the customer. | Negative, Boundary | AC3 (INTEG-005) |
| TD-INTEG-005-04 | Checkout does not incorrectly complete after an integration failure. | Negative, State-based | AC4 (INTEG-005) |
| TD-INTEG-005-05 | No invalid order is created after a failed payment or shipping operation. | Negative | AC5 (INTEG-005) |
| TD-INTEG-005-06 | Customer can recover or retry where the application supports it. | Positive / Functional | AC6 (INTEG-005) |
| TD-INTEG-005-07 | Application remains in a valid checkout state after an integration error. | Negative, State-based | AC7 (INTEG-005) |
| TD-INTEG-005-08 | Unexpected integration responses do not cause incorrect order or pricing behavior. | Positive / Functional | AC8 (INTEG-005) |


## 12. Cross-Browser & Environment Coverage

*2 requirement(s) — 12 test condition(s) derived from acceptance criteria.*

### ENV-001 — Cross-Browser Execution

**Actor:** QA Automation Framework | **Priority:** High | **Risk:** High | **Automation Candidate:** Yes

**Test Design Technique(s):** Configuration / Compatibility Testing, Equivalence Partitioning (invalid class)

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ENV-001-01 | Automated tests execute successfully on Chromium. | Compatibility | AC1 (ENV-001) |
| TD-ENV-001-02 | Automated tests execute successfully on Firefox. | Compatibility | AC2 (ENV-001) |
| TD-ENV-001-03 | Automated tests execute successfully on WebKit. | Compatibility | AC3 (ENV-001) |
| TD-ENV-001-04 | The same test scenarios can be executed across supported browsers. | Compatibility | AC4 (ENV-001) |
| TD-ENV-001-05 | Browser-specific failures are reported clearly. | Negative, Compatibility | AC5 (ENV-001) |
| TD-ENV-001-06 | Browser configuration does not require changes to the underlying test logic. | Compatibility | AC6 (ENV-001) |

### ENV-002 — Configurable Environment Execution

**Actor:** QA Automation Framework | **Priority:** High | **Risk:** Medium | **Automation Candidate:** Yes

**Test Design Technique(s):** Configuration / Compatibility Testing

| Test Condition ID | Test Condition | Condition Type | Source |
|---|---|---|---|
| TD-ENV-002-01 | Tests can be executed against the configured environments. | Compatibility | AC1 (ENV-002) |
| TD-ENV-002-02 | The target environment can be selected through configuration. | Compatibility | AC2 (ENV-002) |
| TD-ENV-002-03 | The correct application URL/configuration is loaded for each environment. | Compatibility | AC3 (ENV-002) |
| TD-ENV-002-04 | Test logic remains unchanged when switching environments. | Compatibility | AC4 (ENV-002) |
| TD-ENV-002-05 | Environment-specific configuration is not hardcoded inside individual tests. | Compatibility | AC5 (ENV-002) |
| TD-ENV-002-06 | Incorrect or missing environment configuration is handled appropriately. | Compatibility | AC6 (ENV-002) |


## 6. Consolidated Coverage Summary

| # | Domain | Requirements | Test Conditions | Critical/High Priority | Automation Candidates |
|---|---|---|---|---|---|
| 1 | Customer Account & Authentication | 14 | 83 | 14 | 14 |
| 2 | Product Catalog | 8 | 36 | 6 | 8 |
| 3 | Product Search | 8 | 39 | 5 | 8 |
| 4 | Shopping Cart | 8 | 42 | 8 | 8 |
| 5 | Product to Wishlist | 4 | 20 | 0 | 4 |
| 6 | Checkout | 10 | 54 | 10 | 10 |
| 7 | Order Management | 10 | 55 | 10 | 10 |
| 8 | Admin | 22 | 150 | 22 | 22 |
| 9 | Promotions & Pricing | 6 | 44 | 5 | 6 |
| 10 | Reviews & Subscriptions | 4 | 29 | 0 | 4 |
| 11 | Shipping & Payment Integration Boundaries | 5 | 36 | 5 | 5 |
| 12 | Cross-Browser & Environment Coverage | 2 | 12 | 2 | 2 |
| — | **Total** | **101** | **600** | **87** | **101** |
**Read as:** 101 baseline requirements yield 600 identified test conditions. 87 requirements carry Critical or High priority/risk and should receive first pass at test case authoring and automation, per the risk-based prioritization in `Test-strategy.md` §7. All 101 requirements are flagged as automation candidates in the baseline; final automation-vs-manual assignment per condition follows the UI-vs-API and risk-based rules in `Test-strategy.md` §3.

## 7. Traceability

Each `TD-*` test condition traces back to exactly one requirement ID and forward to one or more test cases once authored:

```
Requirement (Requirements_Baseline.md)
        ↓
Test Condition (TD-<REQ>-<n>)  ← this document
        ↓
Test Case (TC-<REQ>-<n>)  ← Test Cases document (next deliverable)
        ↓
Automated Script / Manual Execution Record
```

No test case should be authored without a corresponding `TD-*` entry, and no `TD-*` entry should remain without at least one downstream test case at the point the Test Cases document is completed — see coverage analysis categories (`Covered` / `Partially Covered` / `Not Covered` / `Blocked`) in `Test-strategy.md` §8.10.

## 8. Out-of-Design Items

Consistent with the Out-of-Scope items in `Test-strategy.md` §2 (Section "2. Out of Scope"), the following are intentionally **not** decomposed into test conditions in this document:

* Internal behavior of external payment, shipping, and authentication providers (only the nopCommerce-side integration boundary is designed, per `INTEG-001` through `INTEG-005`).
* Performance, load, and stress conditions — reserved for the dedicated Performance Testing project (`Test-strategy.md` §17).
* Security penetration scenarios, accessibility compliance, and visual/usability evaluation — out of scope per `Test-strategy.md` §2.5–2.7.
* Unit-level/source-code test conditions — out of scope per `Test-strategy.md` §2.9.

## 9. Test Design Completion Criteria

Test Design for a given domain is considered complete when:

* Every requirement in the domain has at least one `TD-*` test condition per acceptance criterion.
* Every test condition has an assigned test design technique.
* Every test condition inherits a priority/risk classification from its source requirement.
* Ambiguous or missing acceptance criteria have been flagged back to the Requirements Baseline for clarification (none outstanding in this pass — all 101 requirements had usable acceptance criteria).

---

*This document is derived programmatically and by review from `Requirements_Baseline.md` to guarantee 1:1 coverage of all stated acceptance criteria. It supersedes ad-hoc test-condition identification during test case authoring.*