import { api } from "./api";

export const getBookingById = async (bookingId) => {
  const { data } = await api.get(`/bookings/${bookingId}`);
  return data;
};

export const createBooking = async (eventId, paymentIntentId = null, options = {}) => {
  const { data } = await api.post("/bookings", {
    eventId,
    ...(paymentIntentId && { paymentIntentId }),
    ...(options.withPlusOne && { withPlusOne: true }),
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
