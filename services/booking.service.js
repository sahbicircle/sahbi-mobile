import { api } from "./api";

export const createBooking = async (eventId, paymentIntentId = null) => {
  const { data } = await api.post("/bookings", {
    eventId,
    ...(paymentIntentId && { paymentIntentId }),
  });
  return data;
};

export const getBookingUsers = async (eventId) => {
  const { data } = await api.get(`/bookings/event-users/${eventId}`);
  return data;
};

export const getMyBookings = async () => {
  const { data } = await api.get("/bookings/my-bookings");
  return data;
};

export const cancelBooking = async (bookingId) => {
  const { data } = await api.post(`/bookings/${bookingId}/cancel`);
  return data;
};
