const STYLES = {
  Open: "bg-status-open/10 text-status-open",
  "In Progress": "bg-status-progress/10 text-status-progress",
  Resolved: "bg-status-resolved/10 text-status-resolved",
};

const DOT = {
  Open: "bg-status-open",
  "In Progress": "bg-status-progress",
  Resolved: "bg-status-resolved",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium ${STYLES[status] ?? "bg-ink-muted/10 text-ink-muted"}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[status] ?? "bg-ink-muted"}`} />
      {status}
    </span>
  );
}
