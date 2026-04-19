import { isStaticDemo } from "../config/static-demo";
import {
  appendStaticDemoMessage,
  getStaticDemoChat,
  getStaticDemoChats,
  getStaticDemoMessages,
} from "../data/static-demo-chats";
import {
  bookingsArrayFromMyBookingsResponse,
  isPastEventDate,
  normalizeChatsPayload,
  normalizeMessagesPayload,
} from "../helpers/chat.helper";
import { api } from "./api";

/**
 * Backend contract (implement on API):
 * - POST /chats/ensure-event-group { eventId } — idempotent. Creates or returns the group chat for
 *   all users who booked this event. Should no-op or 400 until event.date is in the past.
 * - PUT /users/:profileId/like — on mutual like, create private chat; return { match, chat: { _id } }.
 */

export const listChats = async () => {
  if (isStaticDemo()) return getStaticDemoChats();
  const { data } = await api.get("/chats");
  return normalizeChatsPayload(data);
};

/** Ask the server to ensure the post-event group chat exists (past events only). */
export const ensureEventGroupChat = async (eventId) => {
  if (!eventId) return null;
  if (isStaticDemo()) return { ok: true };
  try {
    const { data } = await api.post("/chats/ensure-event-group", {
      eventId,
    });
    return data ?? null;
  } catch (err) {
    const status = err?.response?.status;
    if (status === 404 || status === 501) return null;
    console.warn(
      "ensureEventGroupChat:",
      status,
      err?.response?.data?.message || err?.message
    );
    return null;
  }
};

/** For each past booking, ask the API to ensure the dinner group chat exists. */
export const ensureGroupChatsForPastBookings = async (myBookingsResponse) => {
  if (isStaticDemo()) return;
  const bookings = bookingsArrayFromMyBookingsResponse(myBookingsResponse);
  for (const b of bookings) {
    const ev = b?.event;
    if (!ev?._id && !ev?.id) continue;
    const eid = ev._id ?? ev.id;
    if (!isPastEventDate(ev.date)) continue;
    await ensureEventGroupChat(eid);
  }
};

export const getChat = async (chatId) => {
  if (isStaticDemo()) return getStaticDemoChat(chatId);
  const { data } = await api.get(`/chats/${chatId}`);
  return data?.chat ?? data;
};

export const getMessages = async (chatId) => {
  if (isStaticDemo()) return normalizeMessagesPayload(getStaticDemoMessages(chatId));
  const { data } = await api.get(`/chats/${chatId}/messages`);
  return normalizeMessagesPayload(data);
};

export const sendMessage = async (chatId, text) => {
  if (isStaticDemo()) return appendStaticDemoMessage(chatId, text);
  const { data } = await api.post(`/chats/${chatId}/messages`, { text });
  return data;
};
