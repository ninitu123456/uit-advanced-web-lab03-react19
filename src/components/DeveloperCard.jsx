import { Fragment, useId } from "react";
import { SkillBadge } from "./SkillBadge";

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

      <section aria-label="Developer performance metrics">
        <h3>Performance Metrics</h3>
        <dl>
          {Object.entries(metrics).map(([key, value]) => (
            <Fragment key={key}>
              <dt>{metricLabels[key] ?? key}</dt>
              <dd>{key === "a11yScore" ? `${value}/100` : value}</dd>
            </Fragment>
          ))}
        </dl>
      </section>

      <section aria-label="Developer technical skills">
        <h3>Technical Skills</h3>
        <ul>
          {skills.map((skill) => (
            <li key={skill.id}>
              <SkillBadge name={skill.name} tier={skill.tier} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}