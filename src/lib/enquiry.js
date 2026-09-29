export const GOALS = [
  "I need a new website",
  "I want to improve my existing website",
  "I want to sell online",
  "I want to make something in my business digital",
  "I want to make things easier for my customers",
  "I want to save time on repetitive work",
  "I'm not sure yet",
];

const GOAL_FRAGMENTS = {
  "I need a new website": "get a new website",
  "I want to improve my existing website": "improve my existing website",
  "I want to sell online": "start selling online",
  "I want to make something in my business digital": "digitize part of my business",
  "I want to make things easier for my customers": "make things easier for my customers",
  "I want to save time on repetitive work": "save time on repetitive work",
  "I'm not sure yet": "figure out what I actually need",
};

export const CURRENCIES = [
  { code: "NGN", symbol: "₦" },
  { code: "USD", symbol: "$" },
  { code: "GBP", symbol: "£" },
  { code: "EUR", symbol: "€" },
];

export const TIMELINES = [
  "As soon as possible",
  "Within the next month",
  "1–3 months",
  "3+ months",
  "I'm just exploring for now",
];

const TIMELINE_SENTENCE = {
  "As soon as possible": "I'd like to begin as soon as possible.",
  "Within the next month": "I'd like to begin within the next month.",
  "1–3 months": "I'd like to begin in the next 1–3 months.",
  "3+ months": "I'd like to begin in 3+ months.",
  "I'm just exploring for now": "I'm just exploring for now, so no rush.",
};

export const WHATSAPP_NUMBER = "2349069136332";
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function joinNatural(items) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export function formatBudget(currency, amount) {
  const symbol = CURRENCIES.find((c) => c.code === currency)?.symbol ?? "";
  const n = Number(amount);
  const formatted = Number.isFinite(n) && amount !== "" ? n.toLocaleString("en-US") : amount;
  return `${symbol}${formatted} (${currency})`;
}

export function buildWhatsAppMessage(data, { alreadySubmitted = false } = {}) {
  const lines = [];
  const name = data.name.trim();

  if (alreadySubmitted) {
    lines.push(
      `Hi Anna${
        name ? `, I'm ${name}` : ""
      }. I just submitted a project enquiry on your website, but wanted to send you the details here on WhatsApp too, in case that's easier.`
    );
  } else {
    const intro = name ? `Hi Anna, I'm ${name}.` : "Hi Anna,";
    lines.push(`${intro} I'd like to discuss a project for my business.`);
  }

  if (data.goals.length) {
    lines.push(
      `I'm looking to ${joinNatural(data.goals.map((g) => GOAL_FRAGMENTS[g] || g))}.`
    );
  }

  if (data.description.trim()) {
    lines.push(`I'd like the site/system to: ${data.description.trim()}`);
  }

  if (data.amount.trim()) {
    lines.push(`My approximate budget is ${formatBudget(data.currency, data.amount.trim())}.`);
  }

  if (data.timeline) {
    lines.push(TIMELINE_SENTENCE[data.timeline]);
  }

  if (data.website.trim()) {
    lines.push(`My current website is ${data.website.trim()}.`);
  }

  const contact = [data.phone.trim(), data.email.trim()].filter(Boolean);
  if (contact.length) {
    lines.push(`You can reach me on ${contact.join(" or ")}.`);
  }

  return lines.join("\n\n");
}

export function buildEnquirySubject(data) {
  const name = data.name.trim();
  return name ? `New Project Inquiry — ${name}` : "New Project Inquiry";
}

// Plain, labeled key/value lines — deliberately not prose, so this is easy
// for a human to scan in ten seconds and just as easy for an assistant to
// parse back out later.
export function buildEnquiryText(data) {
  const lines = [
    "NEW PROJECT INQUIRY",
    "",
    `Name: ${data.name.trim() || "—"}`,
    `Email: ${data.email.trim() || "—"}`,
    `Phone: ${data.phone.trim() || "—"}`,
    `Current website: ${data.website.trim() || "Not provided"}`,
    "",
    `Goals: ${data.goals.length ? data.goals.join("; ") : "Not specified"}`,
    `Project description: ${data.description.trim() || "Not provided"}`,
    "",
    `Budget: ${data.amount.trim() ? formatBudget(data.currency, data.amount.trim()) : "Not provided"}`,
    `Timeline: ${data.timeline || "Not specified"}`,
  ];
  return lines.join("\n");
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function row(label, value) {
  return `<tr><td style="padding:6px 16px 6px 0;color:#6B6B6B;font-weight:600;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:6px 0;color:#0A0A0A;">${escapeHtml(
    value
  )}</td></tr>`;
}

export function buildEnquiryHtml(data) {
  const rows = [
    row("Name", data.name.trim() || "—"),
    row("Email", data.email.trim() || "—"),
    row("Phone", data.phone.trim() || "—"),
    row("Current website", data.website.trim() || "Not provided"),
    row("Goals", data.goals.length ? data.goals.join(", ") : "Not specified"),
    row("Project description", data.description.trim() || "Not provided"),
    row(
      "Budget",
      data.amount.trim() ? formatBudget(data.currency, data.amount.trim()) : "Not provided"
    ),
    row("Timeline", data.timeline || "Not specified"),
  ].join("");

  return `<div style="font-family:Arial,sans-serif;max-width:560px;">
    <h2 style="margin:0 0 16px;color:#0A0A0A;">New Project Inquiry</h2>
    <table style="border-collapse:collapse;font-size:14px;">${rows}</table>
  </div>`;
}
