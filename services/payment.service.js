import { api } from "./api";

export const subscribe = async (plan) => {
  const { data } = await api.post("/payments/subscribe", { plan });
  return data;
};

export const getSubscription = async () => {
  const { data } = await api.get("/payments/subscription");
  return data;
};
