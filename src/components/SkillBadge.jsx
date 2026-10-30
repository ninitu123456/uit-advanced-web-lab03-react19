import styles from "./SkillBadge.module.css";
export function SkillBadge({
  name = "Unknown Skill",
  tier = "Unspecified",
}) {
  return (
    <span
      className={styles.badge}
      data-tier={tier.toLowerCase()}
    >
      <strong>{name}</strong>
      <span> — {tier}</span>
    </span>
  );
}
