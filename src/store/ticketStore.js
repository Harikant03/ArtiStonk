import { create } from "zustand";
import { fetchTickets, updateTicketStatus } from "../api/mockApi.js";

export const useTicketStore = create((set, get) => ({
  // --- server data ---
  tickets: [],
  status: "idle", // idle | loading | success | error
  error: null,

  // --- ui state ---
  search: "",
  statusFilter: "All",
  priorityFilter: "All",
  selectedTicketId: null,

  // --- actions ---
  loadTickets: async ({ simulateError = false } = {}) => {
    set({ status: "loading", error: null });
    try {
      const tickets = await fetchTickets({ simulateError });
      set({ tickets, status: "success" });
    } catch (err) {
      set({ status: "error", error: err.message });
    }
  },

  setSearch: (search) => set({ search }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setPriorityFilter: (priorityFilter) => set({ priorityFilter }),

  selectTicket: (ticketId) => set({ selectedTicketId: ticketId }),
  clearSelectedTicket: () => set({ selectedTicketId: null }),

  changeTicketStatus: async (ticketId, newStatus) => {
    // Optimistic update so the UI feels immediate; the mock API call
    // stands in for the real PATCH request.
    const previous = get().tickets;
    set({
      tickets: previous.map((t) =>
        t.id === ticketId ? { ...t, status: newStatus } : t
      ),
    });
    try {
      await updateTicketStatus(ticketId, newStatus);
    } catch {
      // roll back on failure
      set({ tickets: previous });
    }
  },
}));

// --- derived selectors (kept outside the store so they stay pure) ---

export function selectFilteredTickets(state) {
  const { tickets, search, statusFilter, priorityFilter } = state;
  const query = search.trim().toLowerCase();

  return tickets.filter((ticket) => {
    const matchesSearch =
      !query ||
      ticket.customer.name.toLowerCase().includes(query) ||
      ticket.subject.toLowerCase().includes(query) ||
      ticket.id.toLowerCase().includes(query);

    const matchesStatus = statusFilter === "All" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}

export function selectStats(state) {
  const { tickets } = state;
  return {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "Open").length,
    inProgress: tickets.filter((t) => t.status === "In Progress").length,
    resolved: tickets.filter((t) => t.status === "Resolved").length,
  };
}
