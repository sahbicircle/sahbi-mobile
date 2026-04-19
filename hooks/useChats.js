import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { isStaticDemo } from "../config/static-demo";
import { getMyBookings } from "../services/booking.service";
import {
  ensureGroupChatsForPastBookings,
  listChats,
} from "../services/chat.service";

export function useChats() {
  const [chats, setChats] = useState([]);
  const [booting, setBooting] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const hasLoadedOnce = useRef(false);

  const refresh = useCallback(async (options = {}) => {
    const { syncPastEventGroups = false, isUserPull = false } = options;
    const firstEver = !hasLoadedOnce.current;

    if (firstEver) setBooting(true);
    else if (isUserPull) setRefreshing(true);

    try {
      if (syncPastEventGroups && !isStaticDemo()) {
        try {
          const bookingPayload = await getMyBookings();
          await ensureGroupChatsForPastBookings(bookingPayload);
        } catch (_) {
          /* bookings optional for chat list */
        }
      }
      const data = await listChats();
      setChats(Array.isArray(data) ? data : []);
    } catch {
      setChats([]);
    } finally {
      hasLoadedOnce.current = true;
      setBooting(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh({ syncPastEventGroups: true });
    }, [refresh])
  );

  return {
    chats,
    refresh,
    /** True only on the first load (cold start). */
    isLoading: booting,
    /** True while user pulled to refresh. */
    refreshing,
  };
}
