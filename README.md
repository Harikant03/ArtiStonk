# Support Desk — Customer Support Dashboard

A small dashboard for a support team to view, filter, and manage customer
support tickets. Built with React, Tailwind CSS, and Zustand.

## Stack

- **React 18 + Vite** — app shell and dev server
- **Tailwind CSS** — styling, fully responsive (mobile → desktop)
- **Zustand** — global state (tickets, filters, search, selected ticket)
- **Mock REST API** (`src/api/mockApi.js`) — simulates a real backend: async,
  with network delay, and can simulate a failed request

No backend is required — ticket data is generated in-memory and served
through functions that behave like real `fetch` calls (they're `async`, they
take time to resolve, and they can reject), so the loading/error/empty
states in the UI are exercising real code paths, not just hard-coded markup.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Features implemented

- **Stats bar**: total / open / in progress / resolved counts, derived live
  from ticket state.
- **Search**: matches customer name, subject, or ticket ID.
- **Filters**: by status and by priority, combinable with search.
- **Status change**: from the ticket list row and from the detail panel
  (optimistic update, rolled back if the mock request fails).
- **Ticket detail**: customer info, subject, status, priority, created
  date, and the message thread. Shown as a persistent side panel on
  desktop and a full-screen sheet on mobile (so nothing is squeezed on a
  small screen).
- **Loading / error / empty states**: skeleton rows while fetching, a retry
  button on failure, and a distinct empty state when filters return nothing.
- **Responsive layout**: 2-column stat grid on mobile, 4-column on desktop;
  list + detail side-by-side on desktop, single-column with an overlay
  detail view on mobile.

## Trying the error state

`loadTickets` accepts `{ simulateError: true }`. To see the error/retry UI
without editing the mock data, open the browser console and run:

```js
useTicketStore.getState().loadTickets({ simulateError: true })
```

(This is exposed for review convenience — in a real app this would instead
be driven by an actual failed network request.)

## Project structure

```
src/
  api/mockApi.js          mock REST layer (fetch + update status)
  store/ticketStore.js    Zustand store + derived selectors
  components/             UI pieces (list, detail, badges, filters, states)
  utils/format.js         date formatting helpers
  App.jsx                 layout + data loading on mount
```

## Design notes

Ticket status and priority are shown with separate color systems (status:
blue/amber/green, priority: grey/amber/red) so the two are visually
distinguishable at a glance. Layout is a list + persistent detail pane
(similar to a mail client), since that's the pattern support agents are
already used to and it avoids an extra click to open a modal for every
ticket on desktop; on mobile the detail view becomes a full-screen sheet
since there isn't room for two columns.

## What's not included / possible next steps

- No persistence — refreshing regenerates a new random ticket set. A real
  backend or `localStorage` sync would fix this.
- No pagination/virtualization — fine for a mock list of ~16 tickets, would
  matter at real scale.
- No automated tests.
- No agent/reply composer in the conversation thread (read-only history).

## AI usage

This project was built with the help of Claude (Anthropic). Claude was used
to scaffold the component structure, Zustand store, mock API layer, and
Tailwind styling. All code was reviewed and is understood — happy to walk
through, explain, or modify any part of it.
