import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isStaticDemo } from "../config/static-demo";
import { getNotifications } from "../services/notification.service";

export function useNotifications() {
  const queryClient = useQueryClient();
  const demo = isStaticDemo();
  const { data, isLoading } = useQuery({
    queryKey: ["notifications", demo ? "static" : "live"],
    queryFn: async () => {
      const res = await getNotifications();
      return res.data;
    },
  });

  const refetch = () => queryClient.invalidateQueries({ queryKey: ["notifications"] });

  const unreadCount = Array.isArray(data)
    ? data.filter((n) => !n.readAt).length
    : 0;

  return {
    notifications: Array.isArray(data) ? data : [],
    unreadCount,
    isLoading,
    refetch,
  };
}
