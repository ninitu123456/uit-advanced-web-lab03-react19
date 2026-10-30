
import { SkillBadge } from "./components/SkillBadge";
import { developerProfile } from "./data/developer";

function App() {
  return (
    <main>
      <h1>Lab 03 – Exercise 1</h1>
      <h2>SkillBadge Component Preview</h2>

      <ul aria-label="Developer skills">
        {developerProfile.skills.map((skill) => (
          <li key={skill.id}>
            <SkillBadge
              name={skill.name}
              tier={skill.tier}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
