// Simulated REST API.
// In a real project this would be `fetch("https://api.example.com/tickets")`.
// It's kept local here so the task is self-contained and reviewable offline,
// but it deliberately behaves like a real endpoint: it's async, it can be
// slow, and it can fail — so the store has to handle all three states for real.

const CUSTOMERS = [
  "Amara Osei",
  "Liam Chen",
  "Priya Nair",
  "Diego Fernandez",
  "Sofia Kowalski",
  "Noah Williams",
  "Hana Sato",
  "Ethan Brooks",
  "Ines Moreau",
  "Tariq Rahman",
  "Grace Kim",
  "Mateo Rossi",
];

const SUBJECTS = [
  "Can't reset my account password",
  "Invoice #4021 was charged twice",
  "App crashes when uploading a photo",
  "How do I export my data?",
  "Refund request for cancelled order",
  "Login page stuck on loading spinner",
  "Feature request: dark mode",
  "Shipment marked delivered but never arrived",
  "API key stopped working after update",
  "Unable to downgrade subscription plan",
  "Email notifications not arriving",
  "Team member can't be added to workspace",
  "Payment declined despite valid card",
  "Mobile app shows outdated ticket status",
];

const PRIORITIES = ["Low", "Medium", "High"];
const STATUSES = ["Open", "In Progress", "Resolved"];

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomDate(daysBack) {
  const now = Date.now();
  const past = now - Math.random() * daysBack * 24 * 60 * 60 * 1000;
  return new Date(past).toISOString();
}

function buildThread(seed) {
  const messages = [
    {
      author: "customer",
      text: "Hi, I'm running into this issue and it's blocking my work. Could someone help?",
      timestamp: randomDate(6),
    },
  ];
  if (seed % 2 === 0) {
    messages.push({
      author: "agent",
      text: "Thanks for reaching out — I can see the issue on our end. Looking into it now.",
      timestamp: randomDate(4),
    });
  }
  if (seed % 3 === 0) {
    messages.push({
      author: "customer",
      text: "Appreciate the quick reply. Let me know if you need anything else from me.",
      timestamp: randomDate(2),
    });
  }
  return messages;
}

function generateTickets(count = 16) {
  return Array.from({ length: count }, (_, i) => {
    const id = `TCK-${String(1000 + i)}`;
    return {
      id,
      customer: {
        name: randomFrom(CUSTOMERS),
        email: `customer${i}@example.com`,
      },
      subject: randomFrom(SUBJECTS),
      priority: randomFrom(PRIORITIES),
      status: randomFrom(STATUSES),
      createdAt: randomDate(21),
      messages: buildThread(i),
    };
  });
}

const MOCK_TICKETS = generateTickets();

/**
 * Fetches all tickets.
 * @param {{ simulateError?: boolean }} options
 * @returns {Promise<Array>}
 */
export function fetchTickets({ simulateError = false } = {}) {
  const delay = 500 + Math.random() * 500;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateError) {
        reject(new Error("Failed to load tickets. The server did not respond."));
        return;
      }
      resolve(structuredClone(MOCK_TICKETS));
    }, delay);
  });
}

/**
 * Updates a ticket's status.
 * @param {string} ticketId
 * @param {string} status
 * @returns {Promise<{id: string, status: string}>}
 */
export function updateTicketStatus(ticketId, status) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: ticketId, status }), 250);
  });
}
