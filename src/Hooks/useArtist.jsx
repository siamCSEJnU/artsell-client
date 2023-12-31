import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useArtist = () => {
  const { user, loading } = useAuth();
  const { data: isArtist, isLoading: isArtistLoading } = useQuery({
    queryKey: ["isArtist"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `https://artsell-server-siamcsejnu.vercel.app/users/artist/${user?.email}`
      );
      const data = await res.json();
      return data.artist;
    },
  });

  return [isArtist, isArtistLoading];
};

export default useArtist;
