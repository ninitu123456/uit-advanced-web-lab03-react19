# TASK DECOMPOSITION – LAB 03

## Exercise 1: Semantic Engineer & Pro-Gamer Profile Card

### 1. Objective

Build a reusable, accessible and responsive developer profile card using React 19 functional components.

The exercise must demonstrate semantic JSX, component composition, stable list keys, CSS Modules and secure image rendering.

### 2. Technical Constraints

- React 19 and Vite
- Functional components only
- Zero `<div>` elements in `DeveloperCard.jsx`
- Semantic `<article>`, `<header>`, `<dl>`, `<dt>`, `<dd>`, `<ul>` and `<li>`
- CSS Modules
- Responsive at 375px
- HTTPS image sources
- Explicit image dimensions
- Avatar fallback
- Stable IDs for dynamic collections

### 3. Component Contracts

#### DeveloperCard

**Inputs (Props):**

- `fullName`: string
- `role`: string
- `avatarUrl`: string
- `metrics`: record of metric labels and values
- `skills`: array of skill objects

**Outputs:**

- Semantic profile card
- Avatar or fallback initials
- Developer name and role
- Metrics description list
- Accessible skills list

#### SkillBadge

**Inputs (Props):**

- `name`: string
- `tier`: string

**Outputs:**

- Styled skill label
- Accessible text representation

#### Skill Data Schema

```js
{
  id: "skill-01",
  name: "React 19",
  tier: "Core"
}
```

### 4. Work Breakdown Structure

#### EX1-T01 – Initialize React Application

- Configure Vite and React 19.
- Verify development server.
- Run build and lint.

Acceptance Criteria:
- React 19 is installed.
- Application starts successfully.
- Build and lint pass.

Commit: `chore(ex1): initialize React 19 Vite application`

#### EX1-T02 – Define Project Rules

- Create `project-rules.md`.
- Establish React 19 and AI usage rules.

Acceptance Criteria:
- Rules document exists.
- Forbidden legacy patterns are documented.

Commit: `docs(ex1): establish React 19 project and AI governance rules`

#### EX1-T03 – Define Task Decomposition

- Create this document.
- Define components, inputs and outputs.
- Define verification requirements.

Acceptance Criteria:
- All planned tasks have acceptance criteria.
- Component contracts are documented before implementation.

Commit: `docs(ex1): define task decomposition and component contracts`

#### EX1-T04 – Create Developer Dataset

- Create `src/data/developer.js`.
- Define developer information.
- Define metrics and skills.
- Assign stable skill IDs.

Acceptance Criteria:
- Dataset follows the component contract.
- Every skill has a unique stable ID.
- No UI code is mixed into the dataset.

Verification:
- Dataset imported successfully with Node.js.
- All skill IDs are unique.
- npm run lint: PASS.
- npm run build: PASS.
Commit: `feat(ex1): define developer profile dataset and skill schema`

#### EX1-T05 – Implement SkillBadge

- Create `SkillBadge.jsx`.
- Implement reusable functional component.
- Accept name and tier props.

Acceptance Criteria:
- SkillBadge renders correct information.
- Component has no internal mutable state.
- Default props use JavaScript parameter defaults.

Verification:
- SkillBadge renders name and tier correctly.
- Default parameters work.
- Stable keys are provided by the parent list.
- No React console warnings.
- npm run lint: PASS.
- npm run build: PASS.
Commit: `feat(ex1): implement reusable SkillBadge component`

#### EX1-T06 – Implement DeveloperCard Structure

- Create `DeveloperCard.jsx`.
- Use semantic article and header elements.
- Render developer name, role and avatar.

Acceptance Criteria:
- No `<div>` elements.
- Correct heading hierarchy.
- Props are rendered correctly.

Verification:
- DeveloperCard renders fullName, role and avatarUrl.
- Semantic article and header elements are used.
- hgroup contains developer heading and role.
- useId provides an accessible heading reference.
- Zero div elements in DeveloperCard.jsx.
- npm run lint: PASS.
- npm run build: PASS.
Commit: `feat(ex1): implement semantic DeveloperCard structure`

#### EX1-T07 – Render Metrics and Skills

- Render metrics using `Object.entries()`.
- Use `<dl>`, `<dt>` and `<dd>`.
- Render skills using `SkillBadge`.
- Use stable keys.

Acceptance Criteria:
- All metrics and skills render correctly.
- No index-based list keys.
- No unnecessary wrapper elements.

Commit: `feat(ex1): render profile metrics and skill collection`

#### EX1-T08 – Implement Responsive Styling

- Create component CSS Modules.
- Use CSS Custom Properties.
- Implement responsive layout.

Acceptance Criteria:
- Layout works at 375px and 1440px.
- No horizontal scrolling at 375px.
- Styles are locally scoped.

Commit: `style(ex1): implement responsive profile card CSS modules`

#### EX1-T09 – Implement Avatar Fallback

- Validate image source.
- Provide fallback initials.
- Define image width and height.
- Check image accessibility.

Acceptance Criteria:
- Broken images display initials.
- External image URLs use HTTPS.
- Image dimensions are explicitly defined.
- Accessible alternative text is provided.

Commit: `feat(ex1): add accessible avatar fallback and image safeguards`

#### EX1-T10 – Verify and Audit

- Add or run component tests.
- Run lint and build.
- Inspect semantic DOM.
- Verify 375px responsiveness.
- Update `AI_FAILURE_AUDIT.md`.
- Record evidence and complete README.

Acceptance Criteria:
- Build and lint pass.
- Core component tests pass.
- Evidence is available.
- Actual AI failures are documented accurately.
- At least 10 meaningful Exercise 1 commits exist.

Commit: `test(ex1): verify profile card and document audit evidence`

### 5. AI Workflow

For each implementation task:

1. Select exactly one task ID.
2. Provide AI with the relevant project rules and component contract.
3. Request only the selected task.
4. Review generated code.
5. Run verification.
6. Record actual failures.
7. Commit the verified change.

### 6. Completion Checklist

- [x] React 19 and Vite initialized
- [x] Project rules documented
- [x] Task decomposition completed
- [x] Developer dataset implemented
- [x] SkillBadge implemented
- [x] DeveloperCard implemented
- [x] Metrics and skills rendered
- [x] Responsive CSS Modules implemented
- [x] Avatar fallback implemented
- [x] Tests and audits completed
- [x] At least 10 meaningful commits created




## Exercise 2: Interactive Scientist & Pioneer Directory

### 1. Objective

Build an interactive scientist directory using React 19 functional components, controlled form inputs, derived state, immutable array operations, and accessible UI controls.

The directory supports searching, minimum IQ filtering, sorting, deleting scientists, and restoring the original dataset.

### 2. Technical Constraints

- React 19 functional components and Hooks.
- Dataset contains six scientists with stable IDs.
- Store only independent values in React state.
- Compute the visible list directly during rendering.
- Do not use `useEffect` to synchronize filtered or sorted results.
- Use `.filter()` and `.toSorted()` without mutating the source array.
- Delete scientists using their stable IDs.
- Reset the dataset and all controls to their defaults.
- Use `useId()` for accessible form-control associations.
- Provide a live result counter using `role="status"` and `aria-live="polite"`.
- Use locally scoped CSS Modules.
- Preserve all Exercise 1 functionality.

### 3. Component Contracts

#### ScientistDirectory

**Inputs:**
- `SMART_PEOPLE`: original scientist dataset imported from `src/data/scientists.js`.

**Internal independent state:**
- `people`: current scientist collection.
- `query`: search text.
- `minIq`: minimum IQ threshold.
- `sortBy`: selected sorting method.

**Derived values:**
- `visiblePeople`: filtered and sorted scientist collection.

**Outputs:**
- Search input.
- Minimum IQ input.
- Sorting dropdown.
- Reset button.
- Accessible result counter.
- Scientist list with Delete buttons.
- Empty-state message when no results match.

#### Scientist Data Schema

```js
{
  id: "sp-1",
  name: "Johann Goethe",
  age: 82,
  iq: 210
}
```

### 4. Work Breakdown Structure

#### EX2-T01 – Create Scientist Dataset

- Create `src/data/scientists.js`.
- Define six scientist records.
- Assign unique, stable IDs.

Acceptance Criteria:
- Six valid records exist.
- All IDs are unique.
- Data is separate from UI logic.

Commit: `feat(ex2): add scientist dataset with stable IDs`

#### EX2-T02 – Create ScientistDirectory Component

- Create `ScientistDirectory.jsx`.
- Import and render the dataset.
- Integrate the directory into `App.jsx`.
- Preserve Exercise 1.

Acceptance Criteria:
- Six scientists render.
- Each list item uses `key={person.id}`.
- Exercise 1 remains functional.

Commit: `feat(ex2): create ScientistDirectory component`

#### EX2-T03 – Implement Name Search

- Create controlled search input.
- Implement case-insensitive matching.
- Derive filtered results during render.

Acceptance Criteria:
- Search works regardless of letter case.
- Clearing search restores matching results.
- No redundant filtered-list state.

Commit: `feat(ex2): implement case-insensitive name search`

#### EX2-T04 – Implement Minimum IQ Filter

- Create controlled numeric input.
- Read numeric input using `valueAsNumber`.
- Handle `NaN` and negative values.
- Combine IQ filtering with name search.

Acceptance Criteria:
- IQ threshold filtering works.
- Search and IQ filters work together.
- Empty numeric input does not cause invalid filtering.

Commit: `feat(ex2): add numeric minimum IQ filter`

#### EX2-T05 – Implement Immutable Sorting

- Add four sorting options.
- Sort by IQ ascending/descending.
- Sort by age ascending/descending.
- Use `.toSorted()`.

Acceptance Criteria:
- All four sorting modes work.
- Source dataset is not mutated.
- Sorting works with active filters.

Commit: `feat(ex2): implement immutable sorting with toSorted`

#### EX2-T06 – Implement Scientist Deletion

- Add Delete buttons.
- Remove scientists by stable ID.
- Use functional state updates and `.filter()`.

Acceptance Criteria:
- Correct scientist is removed.
- Other scientists remain unchanged.
- Deletion works after searching or sorting.

Commit: `feat(ex2): add immutable scientist deletion`

#### EX2-T07 – Implement Directory Reset

- Restore the original scientist collection.
- Clear search.
- Reset minimum IQ to zero.
- Restore default IQ descending sorting.

Acceptance Criteria:
- All six scientists return.
- All controls return to their defaults.

Commit: `feat(ex2): implement scientist list reset`

#### EX2-T08 – Improve Accessibility

- Generate input IDs using `useId()`.
- Associate labels with controls.
- Add an accessible live result counter.
- Add an empty-state message.
- Give Delete buttons descriptive accessible names.

Acceptance Criteria:
- Labels correctly reference controls.
- Result counter updates with visible results.
- All controls are keyboard accessible.

Commit: `feat(ex2): improve form accessibility and live count`

#### EX2-T09 – Implement Responsive CSS Module

- Create `ScientistDirectory.module.css`.
- Style controls, list items, and buttons.
- Implement mobile layout.
- Preserve Exercise 1 styles.

Acceptance Criteria:
- CSS is locally scoped.
- Layout works at 375px and desktop widths.
- No horizontal overflow caused by the directory.
- Exercise 1 remains visually functional.

Commit: `style(ex2): add responsive directory layout`

#### EX2-T10 – Final Verification and AI Audit

- Verify all directory interactions.
- Run ESLint and production build.
- Check Exercise 1 regression.
- Update `AI_FAILURE_AUDIT.md`.
- Update Task Decomposition and README.
- Record genuine evidence and any confirmed AI failures.

Acceptance Criteria:
- All core Exercise 2 scenarios pass.
- Lint and build pass.
- Audit statuses match verification evidence.
- At least 10 meaningful Exercise 2 commits exist.
- Exercise 1 remains intact.

Commit: `docs(ex2): finalize task decomposition and AI audit`

### 5. AI Workflow

1. Select one task ID.
2. Provide AI with the relevant requirements.
3. Review the generated code.
4. Run the relevant verification.
5. Record observed failures or passed checkpoints accurately.
6. Commit the verified changes.

### 6. Completion Checklist

- [x] Scientist dataset created.
- [x] ScientistDirectory component implemented.
- [x] Case-insensitive search implemented.
- [x] Minimum IQ filter implemented.
- [x] Immutable sorting implemented.
- [x] Scientist deletion implemented.
- [x] Reset functionality implemented.
- [x] Accessibility requirements implemented.
- [x] Responsive CSS Module implemented.
- [x] Final verification and audit completed.
- [x] At least 10 meaningful Exercise 2 commits created.

Mark each item complete only after verification.