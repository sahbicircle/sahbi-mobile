import axios from "axios";
import * as Storage from "../store/storage";

export const api = axios.create({
  // baseURL: "https://sahbi-backend.onrender.com/",
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(async (config) => {
  const token = await Storage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
