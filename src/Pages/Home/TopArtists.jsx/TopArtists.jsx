import { useEffect, useState } from "react";
import useAllUsers from "../../../Hooks/useAllUsers";
import SectionTitle from "../../../Components/Shared/SectionTitle/SectionTitle";
import Container from "../../../Components/Container/Container";
import TopArtistSlider from "./TopArtistSlider";

const TopArtists = () => {
  const [allUsers, isLoadingUsers, refetch] = useAllUsers();
  const [topArtists, setTopArtists] = useState([]);
  useEffect(() => {
    if (!isLoadingUsers && allUsers) {
      const sortedArtists = allUsers
        .filter(
          (artist) => artist?.role !== "admin" && artist?.role !== "client"
        )
        .sort(
          (artist1, artist2) =>
            artist2?.followers?.length - artist1?.followers?.length
        )
        .slice(0, 10);

      setTopArtists(sortedArtists);
    }
  }, [allUsers, isLoadingUsers]);

  return (
    <div className="mb-16">
      <SectionTitle heading={"Our Top Artists"}></SectionTitle>
      <Container>
        <TopArtistSlider topArtists={topArtists}></TopArtistSlider>
      </Container>
    </div>
  );
};

export default TopArtists;
