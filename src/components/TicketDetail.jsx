import { useTicketStore } from "../store/ticketStore.js";
import PriorityBadge from "./PriorityBadge.jsx";
import StatusBadge from "./StatusBadge.jsx";
import StatusSelect from "./StatusSelect.jsx";
import { formatDate, formatDateTime } from "../utils/format.js";

function Placeholder() {
  return (
    <div className="hidden flex-1 flex-col items-center justify-center gap-1 p-10 text-center md:flex">
      <p className="text-sm font-medium text-ink">No ticket selected</p>
      <p className="text-sm text-ink-muted">Choose a ticket from the list to see its details.</p>
    </div>
  );
}

function Message({ message }) {
  const isAgent = message.author === "agent";
  return (
    <div className={`flex flex-col gap-1 ${isAgent ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[85%] rounded px-3 py-2 text-sm ${
          isAgent ? "bg-accent-soft text-ink" : "bg-paper text-ink"
        }`}
      >
        {message.text}
      </div>
      <span className="font-mono text-xs text-ink-muted">
        {isAgent ? "Agent" : "Customer"} · {formatDateTime(message.timestamp)}
      </span>
    </div>
  );
}

export default function TicketDetail({ ticket, onClose, asOverlay }) {
  const clearSelectedTicket = useTicketStore((s) => s.clearSelectedTicket);

  if (!ticket) return <Placeholder />;

  const handleClose = onClose ?? clearSelectedTicket;

  const content = (
    <>
      <div className="flex items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="font-mono text-xs text-ink-muted">{ticket.id}</p>
          <h2 className="mt-0.5 text-base font-semibold text-ink">{ticket.subject}</h2>
        </div>
        {asOverlay && (
          <button
            onClick={handleClose}
            aria-label="Close ticket details"
            className="rounded p-1 text-ink-muted hover:bg-paper hover:text-ink"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="thin-scroll flex-1 overflow-y-auto p-4">
        <section>
          <h3 className="text-sm font-medium text-ink">Customer</h3>
          <p className="mt-1 text-sm text-ink">{ticket.customer.name}</p>
          <p className="text-sm text-ink-muted">{ticket.customer.email}</p>
        </section>

        <section className="mt-4 flex flex-wrap items-center gap-3">
          <div>
            <p className="text-xs text-ink-muted">Status</p>
            <div className="mt-1 flex items-center gap-2">
              <StatusBadge status={ticket.status} />
              <StatusSelect ticketId={ticket.id} status={ticket.status} size="md" />
            </div>
          </div>
          <div>
            <p className="text-xs text-ink-muted">Priority</p>
            <div className="mt-1">
              <PriorityBadge priority={ticket.priority} />
            </div>
          </div>
          <div>
            <p className="text-xs text-ink-muted">Created</p>
            <p className="mt-1 font-mono text-sm text-ink">{formatDate(ticket.createdAt)}</p>
          </div>
        </section>

        <section className="mt-6">
          <h3 className="text-sm font-medium text-ink">Conversation</h3>
          <div className="mt-3 flex flex-col gap-3">
            {ticket.messages.map((message, i) => (
              <Message key={i} message={message} />
            ))}
          </div>
        </section>
      </div>
    </>
  );

  if (asOverlay) {
    return (
      <div className="fixed inset-0 z-20 flex flex-col bg-surface md:hidden">
        {content}
      </div>
    );
  }

  return <div className="hidden min-h-0 flex-1 flex-col md:flex">{content}</div>;
}
