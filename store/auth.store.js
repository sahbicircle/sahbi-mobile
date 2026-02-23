import * as Storage from "./storage";

export const setAuth = async (user, token) => {
  await Storage.setItem("token", token);
  await Storage.setItem("user", JSON.stringify(user));
};

export const getAuth = async () => {
  const token = await Storage.getItem("token");
  const userStr = await Storage.getItem("user");
  return {
    token,
    user: userStr ? JSON.parse(userStr) : null,
  };
};

export const clearAuth = async () => {
  await Storage.deleteItem("token");
  await Storage.deleteItem("user");
};
