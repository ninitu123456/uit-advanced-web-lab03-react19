
export function SkillBadge({
  name = "Unknown Skill",
  tier = "Unspecified",
}) {
  return (
    <span
      className="skill-badge"
      data-tier={tier.toLowerCase()}
    >
      <strong>{name}</strong>
      <span> — {tier}</span>
    </span>
  );
}
