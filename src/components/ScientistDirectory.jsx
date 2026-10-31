
import { useId, useState } from "react";
import { SMART_PEOPLE } from "../data/scientists";

export function ScientistDirectory() {
  // Unique IDs for accessible form controls
  const searchId = useId();
  const minIqId = useId();
  const sortId = useId();

  // Source of truth
  const [people, setPeople] = useState(SMART_PEOPLE);

  // Independent UI states
  const [query, setQuery] = useState("");
  const [minIq, setMinIq] = useState(0);
  const [sortBy, setSortBy] = useState("iq-desc");

  // Derived state: filtering and immutable sorting
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

  // Immutable deletion using stable ID
  function handleDelete(id) {
    setPeople((previousPeople) =>
      previousPeople.filter((person) => person.id !== id)
    );
  }

  // Restore original data and default controls
  function handleReset() {
    setPeople([...SMART_PEOPLE]);
    setQuery("");
    setMinIq(0);
    setSortBy("iq-desc");
  }

  return (
    <section aria-label="Pioneer Directory">
      <header>
        <h2>Scientist & Pioneer Directory</h2>
        <p>
          Explore, filter, sort and manage famous pioneers.
        </p>
      </header>

      {/* Search and filtering controls */}
      <div>
        <div>
          <label htmlFor={searchId}>
            Search by name:
          </label>

          <input
            id={searchId}
            type="search"
            placeholder="Enter scientist name..."
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor={minIqId}>
            Minimum IQ:
          </label>

          <input
            id={minIqId}
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

        <div>
          <label htmlFor={sortId}>
            Sort by:
          </label>

          <select
            id={sortId}
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

        <button
          type="button"
          onClick={handleReset}
        >
          Reset Directory
        </button>
      </div>

      {/* Accessible live result counter */}
      <output role="status" aria-live="polite">
        Found {visiblePeople.length} pioneers
      </output>

      {/* Empty state or scientist list */}
      {visiblePeople.length === 0 ? (
        <p>No matching scientists found.</p>
      ) : (
        <ul>
          {visiblePeople.map((person) => (
            <li key={person.id}>
              <span>
                <strong>{person.name}</strong>
                {" — "}IQ: {person.iq}
                {" — "}Age: {person.age}
              </span>

              <button
                type="button"
                onClick={() =>
                  handleDelete(person.id)
                }
                aria-label={`Delete ${person.name}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
