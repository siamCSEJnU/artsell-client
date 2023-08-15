import { useQuery } from "@tanstack/react-query";

const useAllArtWorks = () => {
  const { data: allArtWorks = [], isLoading } = useQuery(
    ["allArtWorks"],
    async () => {
      const response = await fetch("http://localhost:5000/allArtWorks");
      return response.json();
    }
  );
  return [allArtWorks, isLoading];
};

export default useAllArtWorks;
