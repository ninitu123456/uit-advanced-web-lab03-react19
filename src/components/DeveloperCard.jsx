
import { Fragment, useId, useState } from "react";
import { SkillBadge } from "./SkillBadge";
import styles from "./DeveloperCard.module.css";

const metricLabels = {
  commits: "Total Commits",
  vdomNodes: "VDOM Nodes",
  a11yScore: "Accessibility Score",
};

export function DeveloperCard({
  fullName = "Unknown Developer",
  role = "Software Developer",
  avatarUrl = "",
  metrics = {},
  skills = [],
}) {
  const headingId = useId();
  const [failedAvatarUrl, setFailedAvatarUrl] = useState(null);

  const initials = fullName
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const validAvatarUrl =
    typeof avatarUrl === "string" &&
    avatarUrl.startsWith("https://");

  const showAvatar =
    validAvatarUrl && failedAvatarUrl !== avatarUrl;

  return (
    <article
      className={styles.card}
      aria-labelledby={headingId}
    >
      <header className={styles.header}>
        {showAvatar ? (
          <img
            key={avatarUrl}
            className={styles.avatar}
            src={avatarUrl}
            alt={`Portrait of ${fullName}`}
            width={80}
            height={80}
            onError={() => setFailedAvatarUrl(avatarUrl)}
          />
        ) : (
          <span
            className={styles.avatarFallback}
            role="img"
            aria-label={`Avatar initials for ${fullName}`}
          >
            {initials || "?"}
          </span>
        )}

        <hgroup className={styles.identity}>
          <h2 id={headingId}>{fullName}</h2>
          <p>{role}</p>
        </hgroup>
      </header>

      <section
        className={styles.section}
        aria-label="Developer performance metrics"
      >
        <h3>Performance Metrics</h3>

        <dl className={styles.metrics}>
          {Object.entries(metrics).map(([key, value]) => (
            <Fragment key={key}>
              <dt>{metricLabels[key] ?? key}</dt>
              <dd>
                {key === "a11yScore"
                  ? `${value}/100`
                  : value}
              </dd>
            </Fragment>
          ))}
        </dl>
      </section>

      <section
        className={styles.section}
        aria-label="Developer technical skills"
      >
        <h3>Technical Skills</h3>

        <ul className={styles.skills}>
          {skills.map((skill) => (
            <li key={skill.id}>
              <SkillBadge
                name={skill.name}
                tier={skill.tier}
              />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
