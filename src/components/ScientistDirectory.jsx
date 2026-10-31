
import { useId, useState } from "react";
import { SMART_PEOPLE } from "../data/scientists";
import styles from "./ScientistDirectory.module.css";

export function ScientistDirectory() {
  const searchId = useId();
  const minIqId = useId();
  const sortId = useId();

  const [people, setPeople] = useState(SMART_PEOPLE);
  const [query, setQuery] = useState("");
  const [minIq, setMinIq] = useState(0);
  const [sortBy, setSortBy] = useState("iq-desc");

  // Derived state: filter and sort without mutation
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

  function handleDelete(id) {
    setPeople((previousPeople) =>
      previousPeople.filter((person) => person.id !== id)
    );
  }

  function handleReset() {
    setPeople([...SMART_PEOPLE]);
    setQuery("");
    setMinIq(0);
    setSortBy("iq-desc");
  }

  return (
    <section
      className={styles.directory}
      aria-label="Pioneer Directory"
    >
      <header className={styles.header}>
        <h2 className={styles.title}>
          Scientist & Pioneer Directory
        </h2>

        <p className={styles.description}>
          Explore, filter, sort and manage famous pioneers.
        </p>
      </header>

      <div className={styles.controls}>
        {/* Search by name */}
        <div className={styles.field}>
          <label
            className={styles.label}
            htmlFor={searchId}
          >
            Search by name:
          </label>

          <input
            className={styles.input}
            id={searchId}
            type="search"
            placeholder="Enter scientist name..."
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
          />
        </div>

        {/* Minimum IQ filter */}
        <div className={styles.field}>
          <label
            className={styles.label}
            htmlFor={minIqId}
          >
            Minimum IQ:
          </label>

          <input
            className={styles.input}
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

        {/* Sorting */}
        <div className={styles.field}>
          <label
            className={styles.label}
            htmlFor={sortId}
          >
            Sort by:
          </label>

          <select
            className={styles.select}
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

        {/* Reset */}
        <button
          className={styles.resetButton}
          type="button"
          onClick={handleReset}
        >
          Reset Directory
        </button>
      </div>

      {/* Accessible result counter */}
      <div className={styles.results}>
        <output
          className={styles.counter}
          role="status"
          aria-live="polite"
        >
          Found {visiblePeople.length} pioneers
        </output>
      </div>

      {/* Empty state or scientist list */}
      {visiblePeople.length === 0 ? (
        <p className={styles.emptyState}>
          No matching scientists found.
        </p>
      ) : (
        <ul className={styles.list}>
          {visiblePeople.map((person) => (
            <li
              key={person.id}
              className={styles.listItem}
            >
              <div className={styles.personInfo}>
                <strong className={styles.personName}>
                  {person.name}
                </strong>

                <span className={styles.personDetails}>
                  IQ: {person.iq} | Age: {person.age}
                </span>
              </div>

              <button
                className={styles.deleteButton}
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
