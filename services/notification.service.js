import { isStaticDemo } from "../config/static-demo";
import {
  getStaticDemoNotifications,
  markStaticDemoNotificationRead,
  markStaticDemoNotificationsAllRead,
} from "../data/static-demo-notifications";
import { api } from "./api";

export const getNotifications = () => {
  if (isStaticDemo()) {
    return Promise.resolve({ data: getStaticDemoNotifications() });
  }
  return api.get("/notifications");
};

export const markNotificationRead = (id) => {
  if (isStaticDemo()) {
    markStaticDemoNotificationRead(id);
    return Promise.resolve({ data: {} });
  }
  return api.patch(`/notifications/${id}/read`);
};

export const markAllNotificationsRead = () => {
  if (isStaticDemo()) {
    markStaticDemoNotificationsAllRead();
    return Promise.resolve({ data: {} });
  }
  return api.patch(`/notifications/read-all`);
};

export const savePushToken = (token) =>
  api.post("/profile/push-token", { token });
