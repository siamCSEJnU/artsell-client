import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `https://artsell-server-siamcsejnu.vercel.app/users/admin/${user?.email}`
      );
      const data = await res.json();
      return data.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
