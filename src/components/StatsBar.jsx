import { useTicketStore, selectStats } from "../store/ticketStore.js";

const CARDS = [
  { key: "total", label: "Total tickets", accent: "text-ink" },
  { key: "open", label: "Open", accent: "text-status-open" },
  { key: "inProgress", label: "In progress", accent: "text-status-progress" },
  { key: "resolved", label: "Resolved", accent: "text-status-resolved" },
];

export default function StatsBar() {
  const stats = useTicketStore(selectStats);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {CARDS.map((card) => (
        <div
          key={card.key}
          className="rounded border border-border bg-surface px-4 py-3"
        >
          <p className="text-xs font-medium text-ink-muted">{card.label}</p>
          <p className={`mt-1 font-mono text-2xl font-medium ${card.accent}`}>
            {stats[card.key]}
          </p>
        </div>
      ))}
    </div>
  );
}
