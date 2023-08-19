import Banner from "../Banner/Banner";
import CategoryArts from "../CategoryArts/CategoryArts";
import PopularArts from "../PopularArts/PopularArts";
import TopArtists from "../TopArtists.jsx/TopArtists";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <CategoryArts></CategoryArts>
      <PopularArts></PopularArts>
      <TopArtists></TopArtists>
    </div>
  );
};

export default Home;
