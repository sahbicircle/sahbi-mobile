import { useQuery } from "@tanstack/react-query";
import { listEvents } from "../services/event.service";

const fetchEventsWithStatus = async () => {
  return listEvents();
};

export function useEvents() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEventsWithStatus,
  });

  const highlightedEvents = data.filter((ev) => ev.isHighlighted);

  return {
    events: data,
    highlightedEvents,
    isLoading,
    error,
  };
}
