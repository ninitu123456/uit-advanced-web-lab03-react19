
import { useState } from "react";
import { SMART_PEOPLE } from "../data/scientists";

export function ScientistDirectory() {
  const [people] = useState(SMART_PEOPLE);

  // Independent input states
  const [query, setQuery] = useState("");
  const [minIq, setMinIq] = useState(0);
  const [sortBy, setSortBy] = useState("iq-desc");

  // Derived state: filtering + immutable sorting
  const visiblePeople = people
    .filter((person) => {
      const matchesName = person.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());

      const matchesIq = person.iq >= minIq;

      return matchesName && matchesIq;
    })
    .toSorted((a, b) => {
      switch (sortBy) {
        case "iq-asc":
          return a.iq - b.iq;

        case "age-desc":
          return b.age - a.age;

        case "age-asc":
          return a.age - b.age;

        case "iq-desc":
        default:
          return b.iq - a.iq;
      }
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

      {/* Sorting dropdown */}
      <div>
        <label htmlFor="scientist-sort">
          Sort by:
        </label>

        <select
          id="scientist-sort"
          value={sortBy}
          onChange={(event) =>
            setSortBy(event.target.value)
          }
        >
          <option value="iq-desc">
            IQ: High to Low
          </option>

          <option value="iq-asc">
            IQ: Low to High
          </option>

          <option value="age-desc">
            Age: Oldest First
          </option>

          <option value="age-asc">
            Age: Youngest First
          </option>
        </select>
      </div>

      {/* Filtered and sorted scientist list */}
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
