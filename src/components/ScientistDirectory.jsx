
import { useState } from "react";
import { SMART_PEOPLE } from "../data/scientists";

export function ScientistDirectory() {
  // Original scientist data
  const [people] = useState(SMART_PEOPLE);

  // Search input state
  const [query, setQuery] = useState("");

  // Derived state: filter scientists during render
  const visiblePeople = people.filter((person) =>
    person.name
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  return (
    <section aria-label="Pioneer Directory">
      <h2>Scientist & Pioneer Directory</h2>

      <p>Explore famous scientists and pioneers.</p>

      {/* Search input */}
      <div>
        <label htmlFor="scientist-search">
          Search by name:
        </label>

        <input
          id="scientist-search"
          type="search"
          placeholder="Enter scientist name..."
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
        />
      </div>

      {/* Scientist list */}
      <ul>
        {visiblePeople.map((person) => (
          <li key={person.id}>
            <strong>{person.name}</strong>
            {" — "}IQ: {person.iq}
            {" — "}Age: {person.age}
          </li>
        ))}
      </ul>
    </section>
  );
}
