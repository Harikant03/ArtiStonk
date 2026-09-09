import { useTicketStore } from "../store/ticketStore.js";
import PriorityBadge from "./PriorityBadge.jsx";
import StatusSelect from "./StatusSelect.jsx";
import { formatDate } from "../utils/format.js";

export default function TicketRow({ ticket, isSelected }) {
  const selectTicket = useTicketStore((s) => s.selectTicket);

  return (
    <button
      onClick={() => selectTicket(ticket.id)}
      className={`w-full border-l-2 px-4 py-3 text-left transition-colors ${
        isSelected
          ? "border-accent bg-accent-soft"
          : "border-transparent hover:bg-paper"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">{ticket.customer.name}</p>
          <p className="mt-0.5 truncate text-sm text-ink-muted">{ticket.subject}</p>
        </div>
        <span className="shrink-0 font-mono text-xs text-ink-muted">{ticket.id}</span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <PriorityBadge priority={ticket.priority} />
          <span className="text-xs text-ink-muted">{formatDate(ticket.createdAt)}</span>
        </div>
        <StatusSelect ticketId={ticket.id} status={ticket.status} />
      </div>
    </button>
  );
}
