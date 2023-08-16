import { useQuery } from "@tanstack/react-query";
const useAllUsers = () => {
  const { data: allUsers = [], isLoading: isLoadingUsers } = useQuery(
    ["allUsers"],
    async () => {
      const response = await fetch("http://localhost:5000/allUsers");
      return response.json();
    }
  );
  return [allUsers, isLoadingUsers];
};

export default useAllUsers;
