import { useQuery } from "@tanstack/react-query";

const useAllArtWorks = () => {
  const {
    data: allArtWorks = [],
    isLoading,
    refetch,
  } = useQuery(["allArtWorks"], async () => {
    const response = await fetch(
      "https://artsell-server-siamcsejnu.vercel.app/allArtWorks"
    );
    return response.json();
  });
  return [allArtWorks, isLoading, refetch];
};

export default useAllArtWorks;
