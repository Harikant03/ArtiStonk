import { useTicketStore, selectFilteredTickets } from "../store/ticketStore.js";
import TicketRow from "./TicketRow.jsx";
import { LoadingState, ErrorState, EmptyState } from "./AsyncStates.jsx";

export default function TicketList() {
  const status = useTicketStore((s) => s.status);
  const error = useTicketStore((s) => s.error);
  const loadTickets = useTicketStore((s) => s.loadTickets);
  const selectedTicketId = useTicketStore((s) => s.selectedTicketId);
  const filteredTickets = useTicketStore(selectFilteredTickets);

  const search = useTicketStore((s) => s.search);
  const statusFilter = useTicketStore((s) => s.statusFilter);
  const priorityFilter = useTicketStore((s) => s.priorityFilter);
  const setSearch = useTicketStore((s) => s.setSearch);
  const setStatusFilter = useTicketStore((s) => s.setStatusFilter);
  const setPriorityFilter = useTicketStore((s) => s.setPriorityFilter);

  const hasFilters = Boolean(search) || statusFilter !== "All" || priorityFilter !== "All";

  if (status === "loading") return <LoadingState />;

  if (status === "error") {
    return <ErrorState message={error} onRetry={() => loadTickets()} />;
  }

  if (filteredTickets.length === 0) {
    return (
      <EmptyState
        hasFilters={hasFilters}
        onClearFilters={() => {
          setSearch("");
          setStatusFilter("All");
          setPriorityFilter("All");
        }}
      />
    );
  }

  return (
    <div className="thin-scroll flex-1 divide-y divide-border overflow-y-auto">
      {filteredTickets.map((ticket) => (
        <TicketRow
          key={ticket.id}
          ticket={ticket}
          isSelected={ticket.id === selectedTicketId}
        />
      ))}
    </div>
  );
}
