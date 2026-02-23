import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "../services/booking.service";

const fetchEventsWithStatus = async () => {
  return getMyBookings() || [];
};

export function useBookings() {
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchEventsWithStatus,
  });

  return { bookings: data?.bookings, isLoading, error, refetch };
}
