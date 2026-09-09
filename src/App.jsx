import { useEffect } from "react";
import { useTicketStore } from "./store/ticketStore.js";
import StatsBar from "./components/StatsBar.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TicketList from "./components/TicketList.jsx";
import TicketDetail from "./components/TicketDetail.jsx";

export default function App() {
  const loadTickets = useTicketStore((s) => s.loadTickets);
  const tickets = useTicketStore((s) => s.tickets);
  const selectedTicketId = useTicketStore((s) => s.selectedTicketId);
  const clearSelectedTicket = useTicketStore((s) => s.clearSelectedTicket);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) ?? null;

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="shrink-0 border-b border-border bg-surface px-4 py-3 sm:px-6">
        <h1 className="text-lg font-semibold text-ink">Support Desk</h1>
        <p className="text-sm text-ink-muted">Review and manage customer support tickets</p>
      </header>

      <main className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-4 py-4 sm:px-6">
        <div className="shrink-0">
          <StatsBar />
        </div>
        <div className="shrink-0">
          <FilterBar />
        </div>

        <div className="flex min-h-0 flex-1 overflow-hidden rounded border border-border bg-surface">
          <div className="flex min-h-0 w-full flex-col border-r border-border md:w-[380px] md:shrink-0">
            <TicketList />
          </div>
          <TicketDetail ticket={selectedTicket} />
        </div>
      </main>

      {selectedTicket && (
        <TicketDetail ticket={selectedTicket} onClose={clearSelectedTicket} asOverlay />
      )}
    </div>
  );
}
