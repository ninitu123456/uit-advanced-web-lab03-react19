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
- [ ] DeveloperCard implemented
- [ ] Metrics and skills rendered
- [ ] Responsive CSS Modules implemented
- [ ] Avatar fallback implemented
- [ ] Tests and audits completed
- [ ] At least 10 meaningful commits created