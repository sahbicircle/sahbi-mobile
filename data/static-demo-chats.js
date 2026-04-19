import { isStaticDemo } from "../config/static-demo";

export const DEMO_CHAT_IDS = {
  group: "demo-static-group-marrakech",
  private: "demo-static-private-sara",
};

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

const baseGroupChat = {
  _id: DEMO_CHAT_IDS.group,
  type: "event",
  title: "Marrakech rooftop dinner",
  event: {
    _id: "demo-event-marrakech",
    title: "Rooftop dinner — Medina",
    date: daysAgo(5),
  },
  lastMessage: "Can't wait to see everyone Saturday!",
  lastMessageAt: hoursAgo(2),
};

const basePrivateChat = {
  _id: DEMO_CHAT_IDS.private,
  type: "direct",
  title: "Sara",
  lastMessage: "Thanks again for such a fun night ✨",
  lastMessageAt: hoursAgo(6),
};

const initialMessages = {
  [DEMO_CHAT_IDS.group]: [
    {
      _id: "dm-g1",
      text: "Hi everyone — first time with Sahbi, excited!",
      senderName: "Youssef",
      senderId: "demo-u1",
      createdAt: daysAgo(4),
    },
    {
      _id: "dm-g2",
      text: "Same here. Does anyone know if there's parking nearby?",
      senderName: "Lina",
      senderId: "demo-u2",
      createdAt: daysAgo(4),
    },
    {
      _id: "dm-g3",
      text: "Yes, there's a lot on Rue Kennaria — 5 min walk.",
      senderName: "Omar",
      senderId: "demo-u3",
      createdAt: daysAgo(3),
    },
    {
      _id: "dm-g4",
      text: "Perfect, see you all there 🙌",
      senderName: "Sara",
      senderId: "demo-u4",
      createdAt: hoursAgo(3),
    },
    {
      _id: "dm-g5",
      text: "Can't wait to see everyone Saturday!",
      senderName: "You",
      senderId: "demo-self",
      demoAsCurrentUser: true,
      createdAt: hoursAgo(2),
    },
  ],
  [DEMO_CHAT_IDS.private]: [
    {
      _id: "dm-p1",
      text: "Hey! Really enjoyed our table tonight.",
      senderName: "Sara",
      senderId: "demo-u4",
      createdAt: hoursAgo(8),
    },
    {
      _id: "dm-p2",
      text: "Me too — great vibe. We should grab coffee sometime.",
      demoAsCurrentUser: true,
      senderName: "You",
      senderId: "demo-self",
      createdAt: hoursAgo(7),
    },
    {
      _id: "dm-p3",
      text: "I'd love that. How about next week?",
      senderName: "Sara",
      senderId: "demo-u4",
      createdAt: hoursAgo(6),
    },
    {
      _id: "dm-p4",
      text: "Thanks again for such a fun night ✨",
      senderName: "Sara",
      senderId: "demo-u4",
      createdAt: hoursAgo(6),
    },
  ],
};

/** Deep copy so consumers can't mutate seeds */
function cloneMessages() {
  const out = {};
  for (const key of Object.keys(initialMessages)) {
    out[key] = initialMessages[key].map((m) => ({ ...m }));
  }
  return out;
}

let messageStore = cloneMessages();

export function getStaticDemoChats() {
  if (!isStaticDemo()) return [];
  return [
    { ...baseGroupChat },
    { ...basePrivateChat },
  ];
}

export function getStaticDemoChat(chatId) {
  if (!isStaticDemo()) return null;
  const id = String(chatId);
  if (id === DEMO_CHAT_IDS.group) return { ...baseGroupChat };
  if (id === DEMO_CHAT_IDS.private) return { ...basePrivateChat };
  return { _id: id, type: "direct", title: "Demo chat" };
}

export function getStaticDemoMessages(chatId) {
  if (!isStaticDemo()) return [];
  const id = String(chatId);
  const list = messageStore[id];
  if (!list) return [];
  return list.map((m) => ({ ...m }));
}

export function appendStaticDemoMessage(chatId, text) {
  if (!isStaticDemo()) return null;
  const id = String(chatId);
  if (!messageStore[id]) messageStore[id] = [];
  const msg = {
    _id: `demo-${Date.now()}`,
    text,
    createdAt: new Date().toISOString(),
    senderName: "You",
    senderId: "demo-self",
    demoAsCurrentUser: true,
  };
  messageStore[id] = [...messageStore[id], msg];
  return { ...msg };
}

export function resetStaticDemoChats() {
  messageStore = cloneMessages();
}
