import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import Container from "../../Components/Container/Container";
import useAllArtWorks from "../../Hooks/useAllArtWorks";
import Loader from "../../Components/Loader/Loader";
import PaintingItem from "./PaintingItem";

const AllPaintings = () => {
  const [allArtWorks, isLoading] = useAllArtWorks();

  if (isLoading) {
    return <Loader></Loader>;
  }

  const renderedPaintings = allArtWorks?.filter(
    (item) => item.category == "paintings"
  );
  //   console.log(renderedPaintings);
  return (
    <div>
      <Helmet>
        {" "}
        <title>ArtSell | Paintings</title>{" "}
      </Helmet>
      <SectionTitle heading={"All Paintings"}></SectionTitle>
      <Container>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10    mb-20  ">
          {renderedPaintings.map((item) => (
            <PaintingItem key={item._id} item={item}></PaintingItem>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPaintings;
