import { useTicketStore } from "../store/ticketStore.js";

const OPTIONS = ["Open", "In Progress", "Resolved"];

export default function StatusSelect({ ticketId, status, size = "sm" }) {
  const changeTicketStatus = useTicketStore((s) => s.changeTicketStatus);

  const sizing =
    size === "sm" ? "py-1 px-1.5 text-xs" : "py-2 px-2.5 text-sm";

  return (
    <select
      value={status}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => changeTicketStatus(ticketId, e.target.value)}
      aria-label={`Change status for ticket ${ticketId}`}
      className={`rounded border border-border bg-surface text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent ${sizing}`}
    >
      {OPTIONS.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
