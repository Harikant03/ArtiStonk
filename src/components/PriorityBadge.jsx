const STYLES = {
  Low: "text-priority-low border-priority-low/30",
  Medium: "text-priority-medium border-priority-medium/30",
  High: "text-priority-high border-priority-high/30",
};

export default function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${STYLES[priority] ?? "text-ink-muted border-border"}`}
    >
      {priority}
    </span>
  );
}
