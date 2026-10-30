## 3. AI Failure Tracking Table

This table tracks potential AI-generated issues and their verification status throughout Lab 03. A passed checkpoint does not represent a confirmed AI failure.

| ID | Exercise | Potential Failure | Status | Evidence |
|---|---|---|---|---|
| AF-01 | Exercise 1 | Legacy React defaultProps | Checked - Not observed | src/components/SkillBadge.jsx |
| AF-02 | Exercise 1 | Unstable list keys | Checked - Not observed | EX1-T05 commit, src/data/developer.js |
| AF-03 | Exercise 1 | Unnecessary component state | Checked - Not observed | src/components/SkillBadge.jsx |
| AF-04 | Exercise 2 | Redundant derived state in useEffect | Pending | Not yet tested |
| AF-05 | Exercise 3 | Missing AbortController cleanup | Pending | Not yet tested |
| AF-06 | Exercise 1 | Non-semantic DeveloperCard structure | Checked - Not observed | src/components/DeveloperCard.jsx |

**Total checkpoints:** 6

**Verified checkpoints:** 4

**Pending checkpoints:** 2

**Confirmed AI failures:** 0

---

## 4. Exercise 1 – Semantic Developer Profile Card

### 4.1. EX1-T05 – SkillBadge Component Audit

#### Audit Checkpoint AF-01: Legacy React API

**Task:** EX1-T05 – Implement SkillBadge

**Potential issue:** AI uses legacy `defaultProps` instead of JavaScript default parameters.

**Expected behavior:**
- SkillBadge uses React 19 functional component syntax.
- Optional props use JavaScript default parameters.
- No legacy `defaultProps` are introduced.

**Verification method:**
- Inspected `src/components/SkillBadge.jsx`.
- Checked for legacy `defaultProps`.
- Verified JavaScript default parameters.

**Current status:** Checked – Not observed.

**Verification result:** PASS. SkillBadge correctly uses JavaScript default parameters. No legacy `defaultProps` were found.

**Evidence:** `src/components/SkillBadge.jsx`

---

#### Audit Checkpoint AF-02: Unstable React Keys

**Task:** EX1-T05 – Render SkillBadge Collection

**Potential issue:** AI uses array indices as React keys instead of stable identifiers.

**Expected behavior:**
- Each skill has a unique identifier.
- The parent list uses `key={skill.id}`.
- No index-based keys are used.

**Verification method:**
- Inspected the skills collection in `src/App.jsx` during EX1-T05.
- Verified that `key={skill.id}` was used.
- Checked unique skill IDs in `src/data/developer.js`.

**Current status:** Checked – Not observed.

**Verification result:** PASS. All skill elements used stable identifiers. No index-based keys were detected.

**Evidence:**
- `src/App.jsx` at EX1-T05
- `src/data/developer.js`
- EX1-T05 Git commit

---

#### Audit Checkpoint AF-03: Unnecessary React State

**Task:** EX1-T05 – Implement SkillBadge

**Potential issue:** AI introduces unnecessary `useState` or `useEffect` for values already available through props.

**Expected behavior:**
- SkillBadge remains a pure functional component.
- Name and tier are read directly from props.
- No unnecessary React state or effects are introduced.

**Verification method:**
- Inspected `src/components/SkillBadge.jsx`.
- Checked for unnecessary `useState` and `useEffect`.
- Verified that the component renders directly from props.

**Current status:** Checked – Not observed.

**Verification result:** PASS. SkillBadge is implemented as a stateless functional component. No unnecessary React Hooks were found.

**Evidence:** `src/components/SkillBadge.jsx`

---

### 4.2. EX1-T05 – Audit Summary

| Checkpoint | Verification | Result |
|---|---|---|
| AF-01 | JavaScript default parameters | PASS |
| AF-02 | Stable React list keys | PASS |
| AF-03 | Stateless functional component | PASS |

**Total checkpoints reviewed:** 3

**Passed checkpoints:** 3

**Failed checkpoints:** 0

**Confirmed AI failures:** 0

**Conclusion:** All three checkpoints passed source code inspection. The SkillBadge implementation follows the defined React 19 component contract. No confirmed AI-generated failures were observed during EX1-T05.

---

### 4.3. EX1-T06 – DeveloperCard Component Audit

#### Audit Checkpoint AF-06: DeveloperCard Semantic HTML

**Task:** EX1-T06 – Implement DeveloperCard Structure

**Potential issue:** AI generates unnecessary `<div>` wrappers, uses non-semantic HTML, or omits accessibility attributes.

**Expected behavior:**
- DeveloperCard uses `<article>` as its root element.
- `<header>` contains the developer's avatar and identity.
- `<hgroup>` groups the developer's name and role.
- React `useId()` generates a unique heading ID.
- `aria-labelledby` references the correct heading.
- The avatar includes meaningful alternative text and explicit dimensions.
- DeveloperCard contains zero `<div>` elements.

**Verification method:**
- Inspected `src/components/DeveloperCard.jsx`.
- Verified semantic HTML elements.
- Searched for `<div>` and confirmed zero matches.
- Inspected the rendered DOM using browser DevTools.
- Verified the heading association through `aria-labelledby`.
- Checked image `alt`, `width`, and `height` attributes.
- Executed ESLint and production build.

**Current status:** Checked – Not observed.

**Verification result:** PASS. DeveloperCard uses the required semantic HTML structure, correctly associates its accessible heading, provides appropriate avatar attributes, and contains zero `<div>` elements.

**Evidence:**
- `src/components/DeveloperCard.jsx`
- `src/App.jsx`
- Browser DevTools inspection

**Related task:** EX1-T06

**Confirmed AI failures:** 0

---

### 4.4. EX1-T06 – Audit Summary

| Checkpoint | Verification | Result |
|---|---|---|
| AF-06 | Semantic HTML structure | PASS |
| AF-06 | Zero `<div>` elements | PASS |
| AF-06 | Accessible heading association | PASS |
| AF-06 | Avatar attributes | PASS |

**Total checkpoints reviewed:** 1

**Passed checkpoints:** 1

**Failed checkpoints:** 0

**Confirmed AI failures:** 0

**Conclusion:** DeveloperCard passed the semantic structure and accessibility checks. No confirmed AI-generated failures were observed during EX1-T06.

---

### 4.5. Exercise 1 – Overall Audit Summary

| Metric | Result |
|---|---|
| Tasks audited | EX1-T05, EX1-T06 |
| Total audit checkpoints | 4 |
| Passed checkpoints | 4 |
| Failed checkpoints | 0 |
| Confirmed AI failures | 0 |
| Audit status | PASS – Current checkpoints |
| Remaining tasks | EX1-T07 to EX1-T10 |

**Overall conclusion:** All four audit checkpoints completed for EX1-T05 and EX1-T06 passed verification. The implementation follows the defined React 19 rules for component composition, stable keys, semantic HTML, and accessibility. No confirmed AI-generated failures have been identified so far. Further auditing will continue during the remaining Exercise 1 tasks.