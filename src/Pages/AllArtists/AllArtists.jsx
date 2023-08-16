import { Helmet } from "react-helmet-async";
import useAllUsers from "../../Hooks/useAllUsers";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import Loader from "../../Components/Loader/Loader";
import Container from "../../Components/Container/Container";
import ArtistItem from "./ArtistItem";

const AllArtists = () => {
  const [allUsers, isLoadingUsers] = useAllUsers();
  if (isLoadingUsers) {
    return <Loader></Loader>;
  }
  const renderedArtists = allUsers.filter(
    (item) => item.role !== "client" && item.role !== "admin"
  );
  console.log(renderedArtists);
  return (
    <div>
      <Helmet>
        <title>ArtSell | Artists</title>
      </Helmet>
      <SectionTitle heading={"All Artists"}></SectionTitle>
      <Container>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10    mb-20  ">
          {renderedArtists.map((item) => (
            <ArtistItem key={item._id} item={item}></ArtistItem>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllArtists;
