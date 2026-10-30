## 4. Exercise 1 – Semantic Developer Profile Card

### Audit Checkpoint AF-01: Legacy React API

**Task:** EX1-T05 – Implement SkillBadge

**Potential issue:** AI uses legacy `defaultProps` instead of JavaScript default parameters.

**Expected implementation:**

```jsx
export function SkillBadge({
  name = "Unknown Skill",
  tier = "Unspecified",
}) {
  return (
    <span
      className="skill-badge"
      data-tier={tier.toLowerCase()}
    >
      <strong>{name}</strong>
      <span> — {tier}</span>
    </span>
  );
}
```

**Verification method:**
- Inspected `src/components/SkillBadge.jsx`.
- Checked for legacy `defaultProps`.
- Verified JavaScript default parameters.

**Current status:** Checked - Not observed.

**Verification result:** PASS. The component uses JavaScript default parameters instead of legacy `defaultProps`.

**Evidence:** `src/components/SkillBadge.jsx`

---

### Audit Checkpoint AF-02: Unstable React Keys

**Task:** EX1-T05 – Render SkillBadge Collection

**Potential issue:** AI uses array indices as React keys.

**Expected implementation:**

```jsx
{developerProfile.skills.map((skill) => (
  <li key={skill.id}>
    <SkillBadge
      name={skill.name}
      tier={skill.tier}
    />
  </li>
))}
```

**Verification method:**
- Inspected the skills collection in `src/App.jsx`.
- Verified that `key={skill.id}` is used.
- Checked that each skill has a unique identifier.

**Current status:** Checked - Not observed.

**Verification result:** PASS. All skill elements use stable identifiers instead of array indices.

**Evidence:**
- `src/App.jsx`
- `src/data/developer.js`

---

### Audit Checkpoint AF-03: Unnecessary React State

**Task:** EX1-T05 – Implement SkillBadge

**Potential issue:** AI introduces unnecessary `useState` or `useEffect` for values already available through props.

**Expected behavior:**
- SkillBadge remains a pure functional component.
- Name and tier are read directly from props.
- No unnecessary state or effects are introduced.

**Verification method:**
- Inspected `src/components/SkillBadge.jsx`.
- Checked for unnecessary `useState` and `useEffect`.
- Verified that the component renders directly from props.

**Current status:** Checked - Not observed.

**Verification result:** PASS. SkillBadge is implemented as a stateless functional component and does not introduce unnecessary React Hooks.

**Evidence:** `src/components/SkillBadge.jsx`

---

### Exercise 1 – EX1-T05 Audit Summary

| Checkpoint | Verification | Result |
|---|---|---|
| AF-01 | JavaScript default parameters | PASS |
| AF-02 | Stable React list keys | PASS |
| AF-03 | Stateless functional component | PASS |

**Total checkpoints reviewed:** 3

**Passed checkpoints:** 3

**Confirmed AI failures:** 0

**Conclusion:** All three audit checkpoints for EX1-T05 passed source code inspection. No confirmed AI-generated failures were observed during this review. Further audits will continue throughout the remaining Exercise 1 tasks.

