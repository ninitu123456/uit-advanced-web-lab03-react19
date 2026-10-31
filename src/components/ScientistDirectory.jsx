
import { useState } from "react";
import { SMART_PEOPLE } from "../data/scientists";

export function ScientistDirectory() {
  // Original scientist data
  const [people] = useState(SMART_PEOPLE);

  // Independent input states
  const [query, setQuery] = useState("");
  const [minIq, setMinIq] = useState(0);

  // Derived state: search + minimum IQ filtering
  const visiblePeople = people.filter((person) => {
    const matchesName = person.name
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    const matchesIq = person.iq >= minIq;

    return matchesName && matchesIq;
  });

  return (
    <section aria-label="Pioneer Directory">
      <h2>Scientist & Pioneer Directory</h2>

      <p>Explore famous scientists and pioneers.</p>

      {/* Search by name */}
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

      {/* Minimum IQ filter */}
      <div>
        <label htmlFor="scientist-min-iq">
          Minimum IQ:
        </label>

        <input
          id="scientist-min-iq"
          type="number"
          min="0"
          value={minIq}
          onChange={(event) => {
            const value = event.target.valueAsNumber;

            setMinIq(
              Number.isNaN(value)
                ? 0
                : Math.max(0, value)
            );
          }}
        />
      </div>

      {/* Filtered scientist list */}
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
