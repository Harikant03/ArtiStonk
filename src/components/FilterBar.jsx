import { useTicketStore } from "../store/ticketStore.js";
import SearchBar from "./SearchBar.jsx";

const STATUS_OPTIONS = ["All", "Open", "In Progress", "Resolved"];
const PRIORITY_OPTIONS = ["All", "Low", "Medium", "High"];

function Select({ label, value, options, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink-muted">
      <span className="hidden sm:inline">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded border border-border bg-surface py-2 px-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function FilterBar() {
  const statusFilter = useTicketStore((s) => s.statusFilter);
  const priorityFilter = useTicketStore((s) => s.priorityFilter);
  const setStatusFilter = useTicketStore((s) => s.setStatusFilter);
  const setPriorityFilter = useTicketStore((s) => s.setPriorityFilter);

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <SearchBar />
      <div className="flex gap-2">
        <Select
          label="Status"
          value={statusFilter}
          options={STATUS_OPTIONS}
          onChange={setStatusFilter}
        />
        <Select
          label="Priority"
          value={priorityFilter}
          options={PRIORITY_OPTIONS}
          onChange={setPriorityFilter}
        />
      </div>
    </div>
  );
}
