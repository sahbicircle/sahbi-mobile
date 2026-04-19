import { api } from "./api";

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await api.post("/auth/forgot-password", { email });
  return data;
};

export const resetPassword = async (email, code, newPassword) => {
  const { data } = await api.post("/auth/reset-password", {
    email,
    code,
    newPassword,
  });
  return data;
};

export const sendOtp = async (phoneNumber) => {
  const { data } = await api.post("/auth/send-otp", { phoneNumber });
  return data;
};

export const verifyOtp = async (phoneNumber, code) => {
  const { data } = await api.post("/auth/verify-otp", { phoneNumber, code });
  return data;
};

/** Normalize OTP verify response to `{ user, token }` when backend signs in an existing account. */
export const pickSessionFromOtpResponse = (payload) => {
  if (!payload || typeof payload !== "object") return null;
  const data =
    payload.user && (payload.token || payload.accessToken)
      ? payload
      : payload.data;
  if (!data || typeof data !== "object") return null;
  const token = data.token || data.accessToken || data.jwt;
  const user = data.user;
  if (token && user) return { token, user };
  return null;
};

export const register = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const loginWithGoogle = async (idToken) => {
  const { data } = await api.post("/auth/google", { idToken });
  return data;
};

export const loginWithApple = async (identityToken, { email, firstName, lastName } = {}) => {
  const { data } = await api.post("/auth/apple", {
    identityToken,
    email,
    firstName,
    lastName,
  });
  return data;
};

export const refreshToken = async (refreshToken) => {
  const { data } = await api.post("/auth/refresh", { refreshToken });
  return data;
};
