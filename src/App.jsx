
import { DeveloperCard } from "./components/DeveloperCard";
import { developerProfile } from "./data/developer";

function App() {
  return (
    <main>
      <h1>Lab 03 – Exercise 1</h1>

      <DeveloperCard
        fullName={developerProfile.fullName}
        role={developerProfile.role}
        avatarUrl={developerProfile.avatarUrl}
      />
    </main>
  );
}

export default App;
