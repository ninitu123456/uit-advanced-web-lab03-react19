import { DeveloperCard } from "./components/DeveloperCard";
import { developerProfile } from "./data/developer";

function App() {
  return (
    <main>
      <h1>Lab 03 – Exercise 1</h1>
      <DeveloperCard {...developerProfile} />
    </main>
  );
}

export default App;