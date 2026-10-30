# UIT Advanced Web – Lab 03 Project Rules

## 1. Project Information

- Course: Advanced Web Development
- Lab: Lab 03 – Production React 19, Fiber Hooks & Concurrent UI
- Framework: React 19
- Build Tool: Vite
- Language: JavaScript (ES2024) + JSX
- Styling: CSS Modules and CSS Custom Properties
- Version Control: Git and GitHub

## 2. Development Workflow

All exercises must follow the Contract-First Development Workflow:

1. Decompose the exercise into small tasks in `TASK_DECOMPOSITION.md`.
2. Define the component's props, data schema, state and acceptance criteria.
3. Use AI only for a small, clearly defined task.
4. Review AI-generated code before accepting it.
5. Run lint, build, tests and relevant manual verification.
6. Record genuine AI-generated failures in `AI_FAILURE_AUDIT.md`.
7. Create an atomic Git commit after completing and verifying each task.

Do not generate an entire exercise using a single AI prompt.

## 3. React 19 Rules

- Use functional components and React Hooks.
- Use `createRoot` from `react-dom/client`.
- Enable `StrictMode` in development.
- Use ES6 default parameters for optional props.
- Keep component rendering pure.
- Use immutable updates for arrays and objects.
- Use stable entity IDs for list keys.

### Forbidden Patterns

- `ReactDOM.render()`
- `class extends React.Component`
- `Component.defaultProps`
- `window.alert()`
- `event.keyCode`
- Index-based keys for dynamic lists
- Direct state mutation
- `dangerouslySetInnerHTML` for ordinary text rendering

## 4. Semantic HTML and Accessibility

- Prefer semantic HTML elements over unnecessary `<div>` wrappers.
- Use `<main>`, `<section>`, `<article>`, `<header>`, `<figure>`, `<ul>`, `<li>` and `<dl>` appropriately.
- Maintain a logical heading hierarchy.
- Use `<dl>`, `<dt>` and `<dd>` for key-value metadata.
- Every meaningful image must have appropriate alternative text.
- Every form control must have an accessible label.
- Use React `useId()` when stable form label associations are required.
- Interactive elements must support keyboard access.
- Use appropriate live regions for asynchronous status updates.

### Exercise 1 Special Rule

`DeveloperCard.jsx` must contain zero `<div>` elements.

## 5. Styling Rules

- Use CSS Modules for component-level styling.
- Use CSS Custom Properties for reusable design tokens.
- Avoid unnecessary inline styles.
- Ensure responsive behavior from 375px to 1440px.
- Avoid horizontal overflow at 375px.
- Use HTTPS for external image resources.
- Specify image dimensions to minimize layout shift.
- Provide an appropriate avatar fallback.

## 6. State Management Rules

- Store only independent state in `useState`.
- Compute derived data during rendering.
- Do not use `useEffect` to synchronize filtered or sorted lists.
- Prefer immutable `.toSorted()` over mutating `.sort()`.
- Never mutate React state directly.

## 7. Effects and Asynchronous Operations

- Use `useEffect` to synchronize with external systems.
- Clean up timers, subscriptions and event listeners.
- Use `AbortController` for abortable network requests.
- Ignore intentional `AbortError` exceptions.
- Prevent stale asynchronous responses from overwriting current state.
- Model asynchronous UI with explicit states: IDLE, LOADING, SUCCESS and ERROR.

## 8. Testing and Verification

Before committing a completed feature:

- Run `npm run lint`.
- Run `npm run build`.
- Run applicable automated tests.
- Verify the feature manually in the browser.
- Check browser console errors.
- Verify accessibility and semantic structure.
- Verify responsive behavior at 375px.
- Capture evidence when required.

## 9. Git Commit Policy

- Each exercise must contain at least 10 meaningful commits.
- Each commit should represent one coherent, verifiable change.
- Use Conventional Commit-style messages.
- Prefer prefixes such as `feat(ex1)`, `style(ex1)`, `test(ex1)`, `fix(ex1)` and `docs(ex1)`.
- Do not create empty commits to satisfy the commit count.
- Do not commit `node_modules`, build output or secrets.

## 10. AI Failure Audit

Record genuine AI-generated mistakes, including:

- Original task and prompt
- AI-generated incorrect code
- Expected behavior
- Observed failure
- Root cause
- Manual engineering correction
- Verification evidence
- Related Git commit

Do not fabricate failures or claim that an AI error occurred without supporting evidence.

## 11. Exercise Boundaries

- Exercise 1: Semantic Developer Profile Card
- Exercise 2: Interactive Scientist Directory
- Exercise 3: PUBG Vietnam Live Telemetry

Each exercise must have independently testable components and functionality.

Shared components and utilities may be extracted when there is a genuine reuse requirement.