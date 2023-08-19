import { useEffect, useState } from "react";
import useAllArtWorks from "../../../Hooks/useAllArtWorks";
import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";
import PopularArtSlider from "./PopularArtSlider";
import Container from "../../../Components/Container/Container";
import Loader from "../../../Components/Loader/Loader";

const PopularArts = () => {
  const [allArtWorks, isLoading, refetch] = useAllArtWorks();
  const [popularArtWorks, setPopularArtWorks] = useState([]);

  useEffect(() => {
    if (isLoading && !allArtWorks) return <Loader></Loader>;
    else {
      const sortedArtWorks = allArtWorks
        ?.sort(
          (art1, art2) =>
            art1?.bidding_info?.length - art2?.bidding_info?.length
        )
        .slice(0, 10);
      setPopularArtWorks(sortedArtWorks);
    }
  }, [allArtWorks, isLoading]);
  return (
    <div className="mb-20">
      <SectionTitle heading={"Popular Artworks"}></SectionTitle>
      <Container>
        <PopularArtSlider popularArtWorks={popularArtWorks}></PopularArtSlider>
      </Container>
    </div>
  );
};

export default PopularArts;
