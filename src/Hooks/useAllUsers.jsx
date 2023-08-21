import { useQuery } from "@tanstack/react-query";
const useAllUsers = () => {
  const {
    data: allUsers = [],
    isLoading: isLoadingUsers,
    refetch,
  } = useQuery(["allUsers"], async () => {
    const response = await fetch(
      "https://artsell-server-siamcsejnu.vercel.app/allUsers"
    );
    return response.json();
  });
  return [allUsers, isLoadingUsers, refetch];
};

export default useAllUsers;
