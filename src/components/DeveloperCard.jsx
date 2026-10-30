
import { useId } from "react";

export function DeveloperCard({
  fullName = "Unknown Developer",
  role = "Software Developer",
  avatarUrl = "",
}) {
  const headingId = useId();

  return (
    <article aria-labelledby={headingId}>
      <header>
        <img
          src={avatarUrl}
          alt={`Portrait of ${fullName}`}
          width={80}
          height={80}
        />

        <hgroup>
          <h2 id={headingId}>{fullName}</h2>
          <p>{role}</p>
        </hgroup>
      </header>
    </article>
  );
}
