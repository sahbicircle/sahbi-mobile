import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { savePushToken } from "../services/notification.service";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function NotificationProvider({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (!user) return;

    const registerForPush = async () => {
      if (!Device.isDevice) return;
      if (Platform.OS === "web") return;

      const { status: existing } = await Notifications.getPermissionsAsync();
      let finalStatus = existing;
      if (existing !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") return;

      const projectId = Constants.expoConfig?.extra?.eas?.projectId;
      const token = (
        await Notifications.getExpoPushTokenAsync(
          projectId ? { projectId } : undefined
        )
      ).data;
      try {
        await savePushToken(token);
      } catch (err) {
        console.error("Failed to save push token:", err);
      }
    };

    registerForPush();
  }, [user]);

  useEffect(() => {
    const notifSub = Notifications.addNotificationReceivedListener(() => {});
    const responseSub =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        if (data?.chatId) {
          try {
            router.push(`/chats/${data.chatId}`);
          } catch (_) {}
        } else if (data?.notificationId || data?.userId) {
          try {
            router.push("/(tabs)/notifications");
          } catch (_) {}
        }
      });

    notificationListener.current = notifSub;
    responseListener.current = responseSub;

    return () => {
      try {
        notifSub?.remove?.();
      } catch (_) {}
      try {
        responseSub?.remove?.();
      } catch (_) {}
    };
  }, [router]);

  return children;
}
