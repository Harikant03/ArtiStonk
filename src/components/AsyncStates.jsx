export function LoadingState() {
  return (
    <div className="flex flex-col gap-2 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-16 animate-pulse rounded border border-border bg-border/30"
        />
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center">
      <p className="text-sm font-medium text-priority-high">{message}</p>
      <p className="max-w-xs text-sm text-ink-muted">
        The ticket list couldn't be loaded. Check the connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="rounded bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
      >
        Retry
      </button>
    </div>
  );
}

export function EmptyState({ hasFilters, onClearFilters }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 p-10 text-center">
      <p className="text-sm font-medium text-ink">No tickets match</p>
      <p className="max-w-xs text-sm text-ink-muted">
        {hasFilters
          ? "Try a different search term or clear the filters."
          : "There are no support tickets yet."}
      </p>
      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="mt-1 text-sm font-medium text-accent hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
