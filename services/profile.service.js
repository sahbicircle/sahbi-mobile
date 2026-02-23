import { api } from "./api";

export const submitQuiz = async (answers) => {
  const { data } = await api.post("/profile/quiz", { answers });
  return data;
};

export const getProfile = async () => {
  const { data } = await api.get("/profile/me");
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await api.put("/profile/me", payload);
  return data;
};

/**
 * Like a user. On mutual like, returns { match: true, chat: { id } }.
 */
export const likeProfile = async (profileId) => {
  const { data } = await api.put(`/users/${profileId}/like`);
  return data;
};

export const getUserBasic = async (userId) => {
  const { data } = await api.get(`/users/${userId}/basic`);
  return data;
};
