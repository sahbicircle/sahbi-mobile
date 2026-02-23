import { api } from "./api";

export const listEvents = async () => {
  const { data } = await api.get("/events");
  return data;
};

export const getEventById = async (id) => {
  const { data } = await api.get(`/events/${id}`);
  return data;
};
