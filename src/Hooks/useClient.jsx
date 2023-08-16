import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useClient = () => {
  const { user, loading } = useAuth();
  const { data: isClient, isLoading: isClientLoading } = useQuery({
    queryKey: ["isClient"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/users/client/${user?.email}`
      );
      const data = await res.json();
      return data.client;
    },
  });

  return [isClient, isClientLoading];
};

export default useClient;
