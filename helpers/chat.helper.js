/** Normalize API list payload: [] or { chats: [] } */
export function normalizeChatsPayload(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.chats)) return data.chats;
  return [];
}

export function chatDocumentId(chat) {
  if (!chat) return "";
  return String(chat._id ?? chat.id ?? "");
}

/** Group chat for everyone who booked the same (past) event */
export function isEventGroupChat(chat) {
  const t = (chat?.type || "").toLowerCase();
  return t === "event" || t === "group";
}

/** 1:1 chat after mutual like */
export function isPrivateChat(chat) {
  const t = (chat?.type || "").toLowerCase();
  return (
    t === "direct" ||
    t === "private" ||
    t === "dm" ||
    t === "match" ||
    t === "user"
  );
}

export function eventIdFromChat(chat) {
  const ev = chat?.event;
  if (!ev) return chat?.eventId ? String(chat.eventId) : "";
  return String(ev._id ?? ev.id ?? "");
}

export function findGroupChatForEvent(chats, eventId) {
  if (!eventId || !Array.isArray(chats)) return null;
  const eid = String(eventId);
  return (
    chats.find((c) => isEventGroupChat(c) && eventIdFromChat(c) === eid) ||
    null
  );
}

export function getMessageSenderId(msg) {
  if (!msg) return "";
  const s = msg.sender;
  if (s && typeof s === "object")
    return String(s._id ?? s.id ?? "");
  return String(
    msg.senderId ?? msg.userId ?? msg.from?._id ?? msg.from?.id ?? ""
  );
}

export function getMessageSenderName(msg) {
  if (!msg) return "";
  if (msg.senderName) return msg.senderName;
  const s = msg.sender;
  if (s && typeof s === "object") {
    const fn = s.firstName || "";
    const ln = s.lastName || "";
    const name = `${fn} ${ln}`.trim();
    if (name) return name;
  }
  return "Member";
}

export function isPastEventDate(dateIso) {
  if (!dateIso) return false;
  const d = new Date(dateIso);
  return !Number.isNaN(d.getTime()) && d.getTime() < Date.now();
}

export function bookingsArrayFromMyBookingsResponse(data) {
  if (!data) return [];
  if (Array.isArray(data.bookings)) return data.bookings;
  if (Array.isArray(data)) return data;
  return [];
}

export function normalizeMessagesPayload(data) {
  if (!data) return [];
  let list = [];
  if (Array.isArray(data)) list = data;
  else if (Array.isArray(data.messages)) list = data.messages;
  return [...list].sort((a, b) => {
    const ta = new Date(
      a.createdAt ?? a.created_at ?? a.timestamp ?? 0
    ).getTime();
    const tb = new Date(
      b.createdAt ?? b.created_at ?? b.timestamp ?? 0
    ).getTime();
    return ta - tb;
  });
}
