import { isStaticDemo } from "../config/static-demo";

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

const hoursAgo = (n) => {
  const d = new Date();
  d.setHours(d.getHours() - n);
  return d.toISOString();
};

const seed = [
  {
    _id: "demo-notif-1",
    type: "global",
    title: "New dinner spots this week",
    body: "We added two new rooftops in Gueliz — book before they fill up.",
    createdAt: hoursAgo(3),
    readAt: null,
  },
  {
    _id: "demo-notif-2",
    type: "match",
    title: "It's a match with Sara",
    body: "You both liked each other after your last dinner. Say hello!",
    createdAt: hoursAgo(8),
    readAt: null,
  },
  {
    _id: "demo-notif-3",
    type: "global",
    title: "Reminder: venue details",
    body: "Location for your Medina dinner unlocks 24h before the event.",
    createdAt: daysAgo(1),
    readAt: daysAgo(1),
  },
  {
    _id: "demo-notif-4",
    type: "person",
    title: "Feedback window open",
    body: "How was your group? Tap to rate your table from last Wednesday.",
    createdAt: daysAgo(2),
    readAt: null,
  },
];

let notifications = seed.map((n) => ({ ...n }));

export function getStaticDemoNotifications() {
  if (!isStaticDemo()) return [];
  return notifications.map((n) => ({ ...n }));
}

export function markStaticDemoNotificationRead(id) {
  const now = new Date().toISOString();
  notifications = notifications.map((n) =>
    n._id === id ? { ...n, readAt: n.readAt || now } : n
  );
}

export function markStaticDemoNotificationsAllRead() {
  const now = new Date().toISOString();
  notifications = notifications.map((n) => ({
    ...n,
    readAt: n.readAt || now,
  }));
}

export function resetStaticDemoNotifications() {
  notifications = seed.map((n) => ({ ...n }));
}
