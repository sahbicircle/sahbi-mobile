import { api } from "./api";

export const listChats = async () => {
  const { data } = await api.get("/chats");
  return data;
};

export const getChat = async (chatId) => {
  const { data } = await api.get(`/chats/${chatId}`);
  return data;
};

export const getMessages = async (chatId) => {
  const { data } = await api.get(`/chats/${chatId}/messages`);
  return data;
};

export const sendMessage = async (chatId, text) => {
  const { data } = await api.post(`/chats/${chatId}/messages`, { text });
  return data;
};
