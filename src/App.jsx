import { DeveloperCard } from "./components/DeveloperCard";
import { ScientistDirectory } from "./components/ScientistDirectory";
import { developerProfile } from "./data/developer";

function App() {
  return (
    <main>
      <section aria-label="Exercise 1">
        <h1>Lab 03 - Exercise 1</h1>
        <DeveloperCard {...developerProfile} />
      </section>

      <section aria-label="Exercise 2">
        <h2>Lab 03 - Exercise 2</h2>
        <ScientistDirectory />
      </section>
    </main>
  );
}

export default App;
