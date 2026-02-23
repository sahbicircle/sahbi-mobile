import { useCallback, useEffect, useState } from "react";
import { listChats } from "../services/chat.service";

export function useChats() {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await listChats();
      setChats(Array.isArray(data) ? data : []);
    } catch {
      setChats([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { chats, refresh, isLoading };
}
