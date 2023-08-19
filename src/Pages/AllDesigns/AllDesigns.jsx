import { Helmet } from "react-helmet-async";
import Loader from "../../Components/Loader/Loader";
import useAllArtWorks from "../../Hooks/useAllArtWorks";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import Container from "../../Components/Container/Container";
import DesignItem from "./DesignItem";

const AllDesigns = () => {
  const [allArtWorks, isLoading] = useAllArtWorks();

  if (isLoading) {
    return <Loader></Loader>;
  }

  const renderedDesigns = allArtWorks
    ?.filter((art) => art.status == "accepted")
    ?.filter((item) => item.category == "designs");
  return (
    <div>
      <Helmet>
        {" "}
        <title>ArtSell | Designs</title>{" "}
      </Helmet>
      <SectionTitle heading={"All Designs"}></SectionTitle>
      <Container>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10    mb-20  ">
          {renderedDesigns.map((item) => (
            <DesignItem key={item._id} item={item}></DesignItem>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllDesigns;
