import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { calculateProfileCompletion } from "../helpers/functions.helper";
import { getAuth } from "../store/auth.store";

const fetchEventsWithStatus = async () => {
  return getAuth() || {};
};

export function useAuth() {
  const [profileCompletion, setProfileCompletion] = useState(null);

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: fetchEventsWithStatus,
  });

  useEffect(() => {
    setProfileCompletion(calculateProfileCompletion(data?.user));
  }, [data?.user?._id]);

  return {
    user: data?.user,
    profileCompletion,
    refresh: refetch,
    isLoading,
    error,
  };
}
