
import { useState } from "react";
import { SMART_PEOPLE } from "../data/scientists";

export function ScientistDirectory() {
  const [people] = useState(SMART_PEOPLE);

  return (
    <section aria-label="Pioneer Directory">
      <h2>Scientist & Pioneer Directory</h2>
      <p>Explore famous scientists and pioneers.</p>

      <ul>
        {people.map((person) => (
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
