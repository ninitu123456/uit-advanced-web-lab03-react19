
import { DeveloperCard } from "./components/DeveloperCard";
import { ScientistDirectory } from "./components/ScientistDirectory";
import { PubgMatchTelemetry } from "./components/PubgMatchTelemetry";
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

      <section aria-label="Exercise 3">
        <h2>Lab 03 - Exercise 3</h2>
        <PubgMatchTelemetry />
      </section>
    </main>
  );
}

export default App;
